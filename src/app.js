const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;

const { vehiculosRouter } = require('./routes/vehiculosRoutes');
const { reservasRouter } = require('./routes/reservasRoutes');

app.use(express.json())

app.use("/api/vehiculos", vehiculosRouter);
app.use("/api/reservas", reservasRouter);

app.listen(PORT, ()=>{console.log(`App lista escuhando en el puerto ${PORT}`)} )