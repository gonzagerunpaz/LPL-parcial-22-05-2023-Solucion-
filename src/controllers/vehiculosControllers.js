const vehiculosData = require('../../data/vehiculos.json');

const getAllVehiculos = (req, res) => {
  res.json(vehiculosData);
};

const getVehiculoByPatente = (req, res) => {
  const { patente } = req.params;
  const vehiculo = vehiculosData.find(v => v.patente === patente);

  if (vehiculo) {
    res.json(vehiculo);
  } else {
    res.status(404).json({ error: 'Vehículo no encontrado' });
  }
};

const deleteVehiculoByPatente = (req, res) => {
  const { patente } = req.params;
  const index = vehiculosData.findIndex(v => v.patente === patente);

  if (index !== -1) {
    vehiculosData.splice(index, 1);
    res.json({ message: 'Vehículo eliminado correctamente' });
  } else {
    res.status(404).json({ error: 'Vehículo no encontrado' });
  }
};

const createVehiculo = (req, res) => {
  const { patente, marca, modelo, habilitado, capacidad, autonomiaKms } = req.body;

  if (!patente || !marca || !modelo || habilitado === undefined || capacidad === undefined || autonomiaKms === undefined) {
    res.status(400).json({ error: 'Datos incompletos' });
    return;
  }

  const existingVehiculo = vehiculosData.find(v => v.patente === patente);
  if (existingVehiculo) {
    res.status(400).json({ error: 'El vehículo ya está registrado' });
    return;
  }

  const newVehiculo = {
    patente,
    marca,
    modelo,
    habilitado,
    capacidad,
    autonomiaKms
  };

  vehiculosData.push(newVehiculo);
  res.status(201).json({ message: 'Vehículo creado correctamente', vehiculo: newVehiculo });
};

const updateVehiculo = (req, res) => {
  const { patente } = req.params;
  const { habilitado, capacidad, autonomiaKms } = req.body;

  const vehiculo = vehiculosData.find(v => v.patente === patente);

  if (!vehiculo) {
    res.status(404).json({ error: 'Vehículo no encontrado' });
    return;
  }

  if (habilitado !== undefined) {
    vehiculo.habilitado = habilitado;
  }
  if (capacidad !== undefined) {
    vehiculo.capacidad = capacidad;
  }
  if (autonomiaKms !== undefined) {
    vehiculo.autonomiaKms = autonomiaKms;
  }

  res.json({ message: 'Vehículo actualizado correctamente', vehiculo });
};

module.exports = {
  getAllVehiculos,
  getVehiculoByPatente,
  deleteVehiculoByPatente,
  createVehiculo,
  updateVehiculo
};
