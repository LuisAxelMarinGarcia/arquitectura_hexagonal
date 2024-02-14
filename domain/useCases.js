class RegisterUser {
    constructor(userRepository, emailService) {
      this.userRepository = userRepository;
      this.emailService = emailService;
    }
  
    async execute(user) {
      user.activationToken = this.userRepository.generateActivationToken();
      await this.userRepository.save(user);
      await this.emailService.sendActivationEmail(user.email, user.activationToken);
    }
  }
  
  class ActivateUser {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async execute(activationToken) {
      const user = await this.userRepository.findByActivationToken(activationToken);
      if (user) {
        user.verifiedAt = new Date();
        await this.userRepository.update(user);
        return true;
      }
      return false;
    }
  }
  
  module.exports = { RegisterUser, ActivateUser };
  