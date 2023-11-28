const dbs = require('../services/DashboardService');

class DashboardController {

  async getDasboardForUser(userEmail: string) {
    try {
      const dashboardService = new dbs();
      const reviews = await dashboardService.getAllReviews(userEmail);

      return reviews;
    } catch (error) {
      // TODO maybe find better way to handle error?
      console.log(error);
    }
  }

}

module.exports = DashboardController;