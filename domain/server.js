const express = require('express');
const authRoutes = require('../routes/authRoutes'); 

const app = express();

app.use(express.json()); 

app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
