const express = require('express');
const AuthService = require('../services/authService');
const UserRepository = require('../adapters/SequelizeUserRepository');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await UserRepository.findByEmail(email);
  if (user && AuthService.verifyPassword(password, user.password)) {
    const token = AuthService.generateToken({ id: user.id, email: user.email });
    res.json({ token });
  } else {
    res.status(401).send('Credenciales no válidas');
  }
});
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Contenido protegido', user: req.user });
});
router.put('/users/:activationToken/activate', async (req, res) => {
  const { activationToken } = req.params;
  const user = await UserRepository.findByActivationToken(activationToken);

  if (!user) {
    return res.status(404).send('Usuario no encontrado o token inválido.');
  }
  user.verifiedAt = new Date();
  await UserRepository.update(user);

  return res.status(200).send('Cuenta activada con éxito.');
});

module.exports = router;
