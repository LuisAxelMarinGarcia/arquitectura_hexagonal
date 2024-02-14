const { initializeUserModel } = require('../domain/models');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

class UserRepository {
  constructor(sequelize) {
    this.User = initializeUserModel(sequelize);
  }

  async save(user) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    await this.User.create(user);
  }

  async findByActivationToken(token) {
    return await this.User.findOne({ where: { activationToken: token } });
  }

  async update(user) {
    await user.save();
  }

  generateActivationToken() {
    return uuidv4();
  }

  async findByEmail(email) {
    return await this.User.findOne({ where: { email } });
  }
}

module.exports = UserRepository;
