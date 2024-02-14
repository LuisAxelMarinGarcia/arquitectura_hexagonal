
const express = require('express');
const AuthService = require('../services/authService'); 
const { authenticateToken } = require('../middleware/authMiddleware'); 
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = { email }; 

  if (user) {
    const token = AuthService.generateToken({ email: user.email });
    res.json({ token });
  } else {
    res.status(401).send('Credenciales no válidas');
  }
});

router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Contenido protegido' });
});

module.exports = router;
