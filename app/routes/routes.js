const AdminAuthAPI = require('./api/v1/admin/auth');
const AdminConfirmAPI = require('./api/v1/admin/verify');
const AdminBusinessAPI = require('./api/v1/admin/businessRemoval');
const AdminClientAPI = require('./api/v1/admin/clientRemoval');
const ClientAuthAPI = require('./api/v1/client/auth');
const BusinessAuthAPI = require('./api/v1/business/auth');
const BusinessEditInformationAPI = require('./api/v1/business/editinformation');
const RelatedBusinessAPI = require('./api/v1/business/related');
const ClientProfileAPI = require('./api/v1/client/profile');
const ClientReviewAPI = require('./api/v1/client/review');
const ViewServiceAPI = require('./api/v1/service/index');
const RelatedServiceAPI = require('./api/v1/service/related');
const businessProfileAPI = require('./api/v1/business/profile');
const businessServiceAPI = require('./api/v1/business/serviceCRUD');
const ServiceGalleryAPI = require('./api/v1/service/gallery');
const ServiceCouponsAPI = require('./api/v1/service/coupons');
const ServiceBookingAPI = require('./api/v1/service/booking');
const ReviewCRUDAPI = require('./api/v1/service/review');
const AdminCatAPI = require('./api/v1/admin/category');
const BusinessGalleryAPI = require('./api/v1/business/gallery');
const VisitorSearchAPI = require('./api/v1/visitor/search');
const ViewBussinessAPI = require('./api/v1/business/index');
const BusinessCategoriesAPI = require('./api/v1/business/categories');
const fbBotAPI = require('./api/Bot/index');
const topRated = require('./api/v1/visitor/topRated');
const serviceStatsAPI = require('./api/v1/service/statistics');


/**
 * Configures the apps middlewares.
 * @param app - Express App
 */
module.exports = (app) => {
    /**
     * Facebook Bot Routes.
     */
  app.use('/bot', fbBotAPI);

    /**
     * Visitor API Routes.
     */
  app.use('/api/v1/visitor/search', VisitorSearchAPI);
  app.use('/api/v1/service', ViewServiceAPI);
  app.use('/api/v1/service/category', RelatedServiceAPI);
  app.use('/api/v1/business/category', RelatedBusinessAPI);
  app.use('/api/v1/business', ViewBussinessAPI);
  app.use('/api/v1/categories', BusinessCategoriesAPI);
  app.use('/api/v1/toprated', topRated);

    /**
     * Client API Routes.
     */

  app.use('/api/v1/client/auth', ClientAuthAPI);
  app.use('/api/v1/client/profile', ClientProfileAPI);
  app.use('/api/v1/client/review', ClientReviewAPI);

    /**
     * Business API Routes.
     */
  app.use('/api/v1/business/gallery', BusinessGalleryAPI);
  app.use('/api/v1/business/service', businessServiceAPI);
  app.use('/api/v1/business/auth', BusinessAuthAPI);
  app.use('/api/v1/business/profile', businessProfileAPI);
  app.use('/api/v1/business/info', BusinessEditInformationAPI);
  app.use('/api/v1/business/statistics', serviceStatsAPI);

    /**
     * Admin API Routes.
     */

  app.use('/api/v1/admin/business', AdminBusinessAPI);
  app.use('/api/v1/admin/client', AdminClientAPI);
  app.use('/api/v1/admin/auth', AdminAuthAPI);
  app.use('/api/v1/admin/general', AdminConfirmAPI);
  app.use('/api/v1/admin/category', AdminCatAPI);

    /**
     * Service API Routes.
     */
  app.use('/api/v1/service', ReviewCRUDAPI);
  app.use('/api/v1/service', ServiceGalleryAPI);
  app.use('/api/v1/service', ViewServiceAPI);
  app.use('/api/v1/service/book', ServiceBookingAPI);
  app.use('/api/v1/service', ServiceCouponsAPI);
};
