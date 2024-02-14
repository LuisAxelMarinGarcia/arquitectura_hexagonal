const User = require('../domain/mongoModels/User');
const bcrypt = require('bcrypt');
const IUserRepository = require('../ports/IUserRepository');

class MongoUserRepository extends IUserRepository {
  async save(user) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const mongoUser = new User(user);
    return mongoUser.save();
  }

  async findByEmail(email) {
    return User.findOne({ email });
  }

  async findByActivationToken(activationToken) {
    return User.findOne({ activationToken });
  }

  async update(user) {
    return User.findByIdAndUpdate(user._id, user, { new: true });
  }
}

module.exports = MongoUserRepository;
