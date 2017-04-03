const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const validationSchemas = require('../../../../services/shared/validation');
const Service = require('../../../../models/service/Service');
const Review = require('../../../../models/service/Review');
const Strings = require('../../../../services/shared/Strings');
const clientAuthMiddleware = require('../../../../services/shared/jwtConfig')
  .clientAuthMiddleware;

const router = express.Router();
mongoose.Promise = Promise;

/**
 * Body Parser Middleware
 */

router.use(bodyParser.json());

/**
 * Express Validator Middleware
 */

router.use(expressValidator({}));

/**
 * Create Review route
 */

router.post('/:id/review', clientAuthMiddleware, (req, res, next) => {
  // Validate form
  req.checkBody(validationSchemas.reviewValidation);
  req.getValidationResult()
    .then((result) => {
      if (result.isEmpty()) {
        const serviceId = req.params.id;
        Service.findOne({
          _id: serviceId,
        })
          .exec()
          .then((service) => {
            if (!service) {
              throw (Strings.reviewErrors.invalidService);
            }
            return service
              .populate({
                path: 'reviews',
                match: {
                  _deleted: false,
                },
              }).execPopulate();
          })
          .then((populatedService) => {
            const oldReview = populatedService.reviews.find(review => `${review._client}` === `${req.user._id}`);
            if (oldReview) {
              throw (Strings.reviewErrors.alreadyReviewedService);
            }
            const newReview = new Review({
              _client: req.user._id,
              rating: req.body.rating,
              description: req.body.description,
            });
            newReview.save()
              .then((savedReview) => {
                populatedService.reviews.push(savedReview._id);
                populatedService._totalRating += savedReview.rating;
                populatedService._reviewCount += 1;
                populatedService._avgRating =
                  populatedService._totalRating / populatedService._reviewCount;
                populatedService.save()
                  .then(() => {
                    res.json({
                      message: Strings.reviewSuccess.createSuccess,
                    });
                  });
              });
          })
          .catch(err => next([err]));
      } else {
        next(result.array());
      }
    });
});

/**
 * Update Review route
 */

router.post('/:id/review/:review_id/edit', clientAuthMiddleware, (req, res, next) => {
  // Validate form
  req.checkBody(validationSchemas.reviewValidation);
  req.getValidationResult()
    .then((result) => {
      if (result.isEmpty()) {
        const serviceId = req.params.id;
        const reviewId = req.params.review_id;
        Service.findOne({
          _id: serviceId,
        })
          .exec()
          .then((service) => {
            if (!service) {
              throw (Strings.reviewErrors.invalidService);
            }
            return service
              .populate({
                path: 'reviews',
                match: {
                  _deleted: false,
                },
              }).execPopulate();
          })
          .then((populatedService) => {
            const review = populatedService.reviews.find(element => `${element._id}` === reviewId);
            if (!review) {
              throw (Strings.reviewErrors.invalidReview);
            }
            if (`${review._client}` !== `${req.user._id}`) {
              throw (Strings.reviewErrors.userMismatch);
            }
            populatedService._totalRating -= review.rating;
            review.rating = req.body.rating;
            review.description = req.body.description;
            review.save()
              .then((savedReview) => {
                populatedService._totalRating += savedReview.rating;
                populatedService._avgRating =
                  populatedService._totalRating / populatedService._reviewCount;
                populatedService.save()
                  .then(() => {
                    res.json({
                      message: Strings.reviewSuccess.createSuccess,
                    });
                  });
              });
          })
          .catch(err => next([err]));
      } else {
        next(result.array());
      }
    });
});

/**
 * Delete Review route
 */
router.post('/:id/review/:review_id/delete', clientAuthMiddleware, (req, res, next) => {
  const serviceId = req.params.id;
  const reviewId = req.params.review_id;
  Service.findOne({
    _id: serviceId,
  })
    .exec()
    .then((service) => {
      if (!service) {
        throw (Strings.reviewErrors.invalidService);
      }
      return service
        .populate({
          path: 'reviews',
          match: {
            _deleted: false,
          },
        }).execPopulate();
    })
    .then((populatedService) => {
      const review = populatedService.reviews.find(element => `${element._id}` === reviewId);
      if (!review) {
        throw (Strings.reviewErrors.invalidReview);
      }
      if (review._client !== req.user._id) {
        throw (Strings.reviewErrors.userMismatch);
      }
      review._deleted = true;
      review.save()
        .then((savedReview) => {
          populatedService._totalRating -= savedReview.rating;
          populatedService._reviewCount -= 1;
          populatedService._avgRating =
            populatedService._totalRating / populatedService._reviewCount;
          populatedService.save()
            .then(() => {
              res.json({
                message: Strings.reviewSuccess.createSuccess,
              });
            });
        });
    })
    .catch(err => next([err]));
});

router.use((err, req, res, next) => {
  res.status(400)
    .json({
      errors: err,
    });
});

module.exports = router;
