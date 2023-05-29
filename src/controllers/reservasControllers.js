const reservasData = require('../../data/reservas.json');
const vehiculosData = require('../../data/vehiculos.json');
const httpStatusCodes = require('http2').constants;

const getAllReservas = (req, res) => {
  res.json(reservasData);
};

const getReservaById = (req, res) => {
  const { id } = req.params;
  const reserva = reservasData.find(r => r.id == id);

  if (reserva) {
    res.json(reserva);
  } else {
    res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'Reserva no encontrada' });
  }
};

const deleteReservaById = (req, res) => {
  const { id } = req.params;
  const index = reservasData.findIndex(r => r.id == id);

  if (index !== -1) {
    reservasData.splice(index, 1);
    res.sendStatus(httpStatusCodes.HTTP_STATUS_NO_CONTENT);
  } else {
    res.status(404).json({ error: 'Reserva no encontrada' });
  }
};

const createReserva = (req, res) => {
  const { cliente, cantPersonas, distancia, fecha } = req.body;

  if (cantPersonas < 1 || cantPersonas > 10) {
    res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({ error: 'Cantidad de personas inválida' });
    return;
  }

  if (distancia <= 0 || distancia > 500) {
    res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({ error: 'Distancia inválida' });
    return;
  }

  const year = fecha.substr(0, 4);
  const month = fecha.substr(4, 2);
  const day = fecha.substr(6, 2);

  const vehiculo = vehiculosData.find(
    (v) => v.habilitado && v.capacidad >= cantPersonas && v.autonomiaKms >= distancia
  );

  if (!vehiculo) {
    res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({ error: 'No hay vehículos disponibles que cumplan con las condiciones' });
    return;
  }

  const newId = reservasData.map(e => e.id).reduce((e1, e2) => e1 > e2 ? e1 : e2, 0) + 1;
  delete vehiculo.habilitado
  const nuevaReserva = {
    id: newId,
    cliente,
    cantPersonas,
    distancia,
    fecha,
    vehiculo,
  };

  reservasData.push(nuevaReserva)

  res.status(httpStatusCodes.HTTP_STATUS_CREATED).json(nuevaReserva)
};

const searchUltimaReserva = (req, res) => {
  const { cliente } = req.query;
 
  const reservasCliente = reservasData.filter(reserva => reserva.cliente === cliente);

  if (reservasCliente.length > 0) {
    const ultimaReserva = reservasCliente.reduce((maxReserva, reserva) => {
      const fechaReserva = parseInt(reserva.fecha);
      const fechaMaxReserva = parseInt(maxReserva.fecha);
      return fechaReserva > fechaMaxReserva ? reserva : maxReserva;
    });

    res.json(ultimaReserva);
  } else {
    res.status(404).json({ message: 'No encontrado' });
  }
};

  module.exports = {
    getAllReservas,
    getReservaById,
    deleteReservaById,
    createReserva,
    searchUltimaReserva
  };  