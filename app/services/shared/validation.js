/**
 * Express validator schema
 */
const locations = require('../../seed/service/locations');

const Strings = require('./Strings');

const clientValidationErrors = Strings.clientValidationErrors;
const bussinessValidationErrors = Strings.bussinessValidationErrors;
const visitorValidationErrors = Strings.visitorValidationErrors;
const adminValidationErrors = Strings.adminValidationErrors;
const reviewErrors = Strings.reviewErrors;

/**
 * Client validation
 */

const clientSignupValidation = {
  email: {
    notEmpty: {
      errorMessage: clientValidationErrors.emailEmpty,
    },
    isEmail: {
      errorMessage: clientValidationErrors.invalidEmail,
    },
  },
  password: {
    notEmpty: {
      errorMessage: clientValidationErrors.emptyPassword,
    },
    matches: {
      options: [/^(?=.*\d).{8,15}$/],
      errorMessage: clientValidationErrors.invalidPassword,
    },
  },
  confirmPassword: {
    notEmpty: {
      errorMessage: clientValidationErrors.emptyConfirmation,
    },
  },
  firstName: {
    notEmpty: {
      errorMessage: clientValidationErrors.emptyFirstName,
    },
  },
  lastName: {
    notEmpty: {
      errorMessage: clientValidationErrors.emptyLastName,
    },
  },
  mobile: {
    notEmpty: {
      errorMessage: clientValidationErrors.emptyMobile,
    },
    matches: {
      options: [/^01[0-2]{1}[0-9]{8}/], // Egyptian Mobile phone
      errorMessage: clientValidationErrors.invalidMobile,
    },
  },
  gender: {
    notEmpty: {
      errorMessage: clientValidationErrors.emptyGender,
    },
    matches: {
      options: [/^(Male|Female)$/],
      errorMessage: clientValidationErrors.invalidGender,
    },
  },
  birthdate: {
    isDate: {
      errorMessage: clientValidationErrors.invalidBirthdate,
    },
  },
};

const clientConfirmEmailValidation = {
  email: {
    notEmpty: {
      errorMessage: clientValidationErrors.emailEmpty,
    },
    isEmail: {
      errorMessage: clientValidationErrors.invalidEmail,
    },
  },
};


const clientLoginValidation = {
  email: {
    notEmpty: {
      errorMessage: clientValidationErrors.emptyEmail,
    },
    isEmail: {
      errorMessage: clientValidationErrors.invalidEmail,
    },
  },
  password: {
    notEmpty: {
      errorMessage: clientValidationErrors.emptyPassword,
    },
    matches: {
      options: [/^(?=.*\d).{8,15}$/],
      errorMessage: clientValidationErrors.invalidPassword,
    },
  },
};

/**
 * Business validation
 */

const businessSignupValidation = {
  email: {
    notEmpty: {
      errorMessage: bussinessValidationErrors.emptyEmail,
    },
    isEmail: {
      errorMessage: bussinessValidationErrors.invalidEmail,
    },
  },
  name: {
    notEmpty: {
      errorMessage: bussinessValidationErrors.emptyName,
    },
  },
  mobile: {
    notEmpty: {
      errorMessage: bussinessValidationErrors.emptyMobile,
    },
    matches: {
      options: [/^01[0-2]{1}[0-9]{8}/], // Egyptian Mobile phone
      errorMessage: bussinessValidationErrors.invalidMobile,
    },
  },
  shortDescription: {
    notEmpty: {
      errorMessage: bussinessValidationErrors.emptyDescription,
    },
  },
};

const clientResetPasswordValidation = {
  password: {
    notEmpty: {
      errorMessage: clientValidationErrors.emptyPassword,
    },
    matches: {
      options: [/^(?=.*\d).{8,15}$/],
      errorMessage: clientValidationErrors.emptyPassword,
    },
  },
  confirmPassword: {
    notEmpty: {
      errorMessage: clientValidationErrors.emptyConfirmation,
    },
  },
};

const businessLoginValidation = {
  email: {
    notEmpty: {
      errorMessage: bussinessValidationErrors.emptyEmail,
    },
    isEmail: {
      errorMessage: bussinessValidationErrors.invalidEmail,
    },
  },
  password: {
    notEmpty: {
      errorMessage: bussinessValidationErrors.emptyPassword,
    },
    matches: {
      options: [/^(?=.*\d).{8,15}$/],
      errorMessage: bussinessValidationErrors.invalidPassword,
    },
  },
};

const businessResetPasswordValidation = {
  password: {
    notEmpty: {
      errorMessage: clientValidationErrors.emptyPassword,
    },
    matches: {
      options: [/^(?=.*\d).{8,15}$/],
      errorMessage: clientValidationErrors.emptyPassword,
    },
  },
  confirmPassword: {
    notEmpty: {
      errorMessage: clientValidationErrors.emptyConfirmation,
    },
  },
};

const visitorValidation = {
  id: {
    isMongoId: {
      errorMessage: visitorValidationErrors.InvalidID,
    },
  },
  offset: {
    isInt: {
      options: {
        min: 1,
      },
      errorMessage: visitorValidationErrors.InvalidOffset,
    },
  },
};

const businessEditInfoValidation = {
  workingHours: {
    notEmpty: {
      errorMessage: bussinessValidationErrors.workingHoursRequired,
    },
  },
  description: {
    notEmpty: {
      errorMessage: bussinessValidationErrors.emptyConfirmation,
    },
  },
  categories: {
    notEmpty: {
      errorMessage: bussinessValidationErrors.categoriesRequired,
    },
  },
};


const businessAddValidation = {
  branches: {
    notEmpty: {
      errorMessage: bussinessValidationErrors.branchesRequired,
    },
  },
};

const businessEditValidation = {
  'branch.location': {
    notEmpty: {
      errorMessage: bussinessValidationErrors.locationRequired,
    },
    isIn: {
      options: [locations],
      errorMessage: bussinessValidationErrors.locationInvalid,
    },
  },
  'branch.address': {
    notEmpty: {
      errorMessage: bussinessValidationErrors.addressRequired,
    },
  },
};

/**
 * Review Validation
 */

const createReviewValidation = {
  id: { in: 'params',
    isMongoId: {
      errorMessage: reviewErrors.invalidService,
    },
  },
  rating: { in: 'body',
    notEmpty: {
      errorMessage: reviewErrors.emptyRating,
    },
  },
};

const updateReviewValidation = {
  id: { in: 'params',
    isMongoId: {
      errorMessage: reviewErrors.invalidService,
    },
  },
  review_id: { in: 'params',
    isMongoId: {
      errorMessage: reviewErrors.invalidReview,
    },
  },
  rating: { in: 'body',
    notEmpty: {
      errorMessage: reviewErrors.emptyRating,
    },
  },
};

const deleteReviewValidation = {
  id: { in: 'params',
    isMongoId: {
      errorMessage: reviewErrors.invalidService,
    },
  },
  review_id: { in: 'params',
    isMongoId: {
      errorMessage: reviewErrors.invalidReview,
    },
  },
};

/**
 * Administrator validation
 */

const adminLoginValidation = {
  email: {
    notEmpty: {
      errorMessage: adminValidationErrors.emptyEmail,
    },
    isEmail: {
      errorMessage: adminValidationErrors.invalidEmail,
    },
  },
  password: {
    notEmpty: {
      errorMessage: adminValidationErrors.emptyPassword,
    },
    matches: {
      options: [/^(?=.*\d).{8,15}$/],
      errorMessage: adminValidationErrors.invalidPassword,
    },
  },
};
const businessAddImageValidation = {
  id: {
    isMongoId: {
      errorMessage: bussinessValidationErrors.invalidBusinessID,
    },
  },
};

const businessEditImageValidation = {
  ser_id: {
    isMongoId: {
      errorMessage: bussinessValidationErrors.invalidBusinessID,
    },
  },
  im_id: {
    isMongoId: {
      errorMessage: bussinessValidationErrors.invalidBusinessID,
    },
  },
};

const adminConfirmBusinessValidation = {
  id: {
    isMongoId: {
      errorMessage: adminValidationErrors.invalidBusinessID,
    },
  },
};

const adminCategoryValidation = {
  type: {
    notEmpty: {
      errorMessage: adminValidationErrors.categoryTypeRequired,
    },
  },
  title: {
    notEmpty: {
      errorMessage: adminValidationErrors.categoryTitleRequired,
    },
  },
};

const businessUpdateValidation = {
  name: {
    notEmpty: {
      errorMessage: bussinessValidationErrors.emptyName,
    },
  },
  shortDescription: {
    notEmpty: {
      errorMessage: bussinessValidationErrors.emptyDescription,
    },
  },
  phoneNumbers: {
    notEmpty: {
      errorMessage: bussinessValidationErrors.emptyMobile,
    },
  },
};

const validation = {
  clientResetPasswordValidation,
  clientSignupValidation,
  clientConfirmEmailValidation,
  clientLoginValidation,
  adminLoginValidation,
  businessSignupValidation,
  businessLoginValidation,
  businessResetPasswordValidation,
  visitorValidation,
  businessEditInfoValidation,
  adminConfirmBusinessValidation,
  businessAddValidation,
  businessEditValidation,
  createReviewValidation,
  updateReviewValidation,
  deleteReviewValidation,
  businessUpdateValidation,
  businessAddImageValidation,
  businessEditImageValidation,
  adminCategoryValidation,
};

module.exports = validation;
