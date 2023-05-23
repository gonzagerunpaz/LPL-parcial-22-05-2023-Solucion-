const reservas = require('../../data/reservas.json');
const vehiculos = require('../../data/vehiculos.json');

function getAllReservas(req, res) {
  res.json(reservas);
}

function getReservaById(req, res) {
  const id = parseInt(req.params.id);
  const reserva = reservas.find((r) => r.id === id);

  if (reserva) {
    res.json(reserva);
  } else {
    res.status(404).json({ error: 'Reserva no encontrada' });
  }
}

function deleteReservaById(req, res) {
  const id = parseInt(req.params.id);
  const index = reservas.findIndex((r) => r.id === id);

  if (index !== -1) {
    reservas.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'Reserva no encontrada' });
  }
}

function createReserva(req, res) {
  const { cliente, cantPersonas, distancia, fecha } = req.body;

  if (!cliente || !cantPersonas || !distancia || !fecha) {
    res.status(400).json({ error: 'Faltan datos obligatorios' });
    return;
  }

  if (isNaN(cantPersonas) || cantPersonas < 1 || cantPersonas > 10) {
    res.status(400).json({ error: 'Cantidad de personas inválida' });
    return;
  }

  if (isNaN(distancia) || distancia <= 0 || distancia > 500) {
    res.status(400).json({ error: 'Distancia inválida' });
    return;
  }

  const reserva = {
    id: reservas.length + 1,
    cliente,
    cantPersonas,
    distancia,
    fecha,
    vehiculo: null,
  };

  const vehiculo = vehiculos.find(
    (v) => v.habilitado && v.capacidad >= cantPersonas && v.autonomiaKms >= distancia
  );

  if (vehiculo) {
    reserva.vehiculo = {
      patente: vehiculo.patente,
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      capacidad: vehiculo.capacidad,
      autonomiaKms: vehiculo.autonomiaKms,
    };
  } else {
    res.status(400).json({ error: 'No hay vehículos disponibles que cumplan con las condiciones' });
    return;
  }

  reservas.push(reserva);

  res.status(201).json(reserva);
}

module.exports = {
  getAllReservas,
  getReservaById,
  deleteReservaById,
  createReserva,
};