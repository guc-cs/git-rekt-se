const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const Strings = require('../../../../services/shared/Strings');
const Mailer = require('../../../../services/shared/Mailer');
const validationSchemas = require('../../../../services/shared/validation');
const Business = require('../../../../models/business/Business');
const Admin = require('../../../../models/admin/Admin');
const mongoose = require('mongoose');

const router = express.Router();
mongoose.Promise = Promise;

/**
 * Parsing Middleware(s)
 */

router.use(bodyParser.json());
router.use(expressValidator({}));

/**
 * Business signup route
 */

router.post('/create/admin', (req, res) => {
  new Admin({
    email: 'mohamedelzarei@gmail.com',
    password: 'helloworld',
  })
    .save()
    .then(() => res.json('Added'));
});

router.post('/unverified/signup', (req, res, next) => {
  /**
   * Body Inputs
   */

  const userInfo = {
    name: req.body.name,
    email: req.body.email,
    shortDescription: req.body.shortDescription,
    mobile: req.body.mobile, // Add to phone numbers array
  };

  /**
   * Form Validation.
   */

  req.checkBody(validationSchemas.businessSignupValidation);

  req.getValidationResult()
    .then((result) => {
      if (result.isEmpty()) {
        new Business({
          name: userInfo.name,
          email: userInfo.email,
          shortDescription: userInfo.shortDescription,
          phoneNumbers: [userInfo.mobile],
        })
          .save()
          .then(() => {
            Mailer.notifyAdminOfNewBusinessSignup()
              .then(() => {
                res.json({
                  message: Strings.businessSuccess.unverifiedSignup,
                });
              })
              .catch(e => next([e]));
          })
          .catch(() => next([Strings.bussinessValidationErrors.businessExists]));
      } else {
        next(result.array());
      }
    });
});

/**
 *  Error Handling Middlewares.
 */

router.use((err, req, res, next) => {
  res.status(400)
    .json({
      errors: err,
    });
});

module.exports = router;
