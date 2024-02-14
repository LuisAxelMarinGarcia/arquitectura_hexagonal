const { User } = require('../domain/models');
const bcrypt = require('bcrypt');
const IUserRepository = require('../ports/IUserRepository');

class SequelizeUserRepository extends IUserRepository {
  async save(user) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    return User.create(user);
  }

  async findByEmail(email) {
    return User.findOne({ where: { email } });
  }

  async findByActivationToken(activationToken) {
    return User.findOne({ where: { activationToken } });
  }

  async update(user) {
    return user.save();
  }
}

module.exports = SequelizeUserRepository;
