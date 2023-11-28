import Review from '../model/Review';
import User from '../model/User';

class DashboardService {
  async getAllReviews(userEmail: string) {
    try {

      // get user from email
      const user = await User.findOne({ email: userEmail }).exec();

      if (user) {
        return await Review.find({ userId: user._id }).exec();
      }

      // no reviews, return empty object
      return {};

    } catch (error) {
      // TODO find a better way to handle this?
      console.log(error);
    }
  }
}

module.exports = DashboardService;