const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const vehiculosRoutes  = require('./routes/vehiculosRoutes');
const { reservasRoutes } = require('./routes/reservasRoutes');

app.use(express.json());

app.use("/api/vehiculos", vehiculosRoutes);
app.use("/api/reservas", reservasRoutes);

app.listen(PORT, () => {
  console.log(`App lista escuchando en el puerto ${PORT}`);
});