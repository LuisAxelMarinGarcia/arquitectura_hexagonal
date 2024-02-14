
class UserRepository {
    async save(user) {
      throw new Error('save method must be implemented');
    }
  
    async findByEmail(email) {
      throw new Error('findByEmail method must be implemented');
    }
  
    async findByActivationToken(token) {
      throw new Error('findByActivationToken method must be implemented');
    }
  
    async update(user) {
      throw new Error('update method must be implemented');
    }
  
    generateActivationToken() {
      throw new Error('generateActivationToken method must be implemented');
    }
  }
  
  module.exports = UserRepository;
  