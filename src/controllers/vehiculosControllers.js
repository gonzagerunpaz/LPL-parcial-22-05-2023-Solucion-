const vehiculosData = require('../../data/vehiculos.json')
const httpStatusCodes = require('http2').constants;

const getAllVehiculos = ( _ , res) => {
  res.status(httpStatusCodes.HTTP_STATUS_OK).json(vehiculosData)
}

const getVehiculoByPatente = (req, res) => {
  const { patente } = req.params
  const vehiculo = vehiculosData.find((v) => v.patente == patente)

  if (vehiculo) {
    res.json(vehiculo)
  } else {
    res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'Vehículo no encontrado' })
  }
}

const createVehiculo = (req, res) => {
  const { patente, marca, modelo, capacidad, autonomiaKms } = req.body

  const patenteRegex = /^[A-Z]{2}\d{3}[A-Z]{2}$/
  if (!patenteRegex.test(patente)) {
    res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({ error: 'La patente debe tener el formato XX999XX' })
    return;
  }

  const existingVehiculo = vehiculosData.find((v) => v.patente == patente)
  if (existingVehiculo) {
    res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({ error: 'El vehículo ya está registrado' })
    return;
  }

  const habilitado = false

  if (capacidad < 1 || capacidad > 10) {
    res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({ error: 'La capacidad debe ser un número entre 1 y 10' })
    return
  }

  if (autonomiaKms <= 0) {
    res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({ error: 'La autonomía debe ser un número mayor a 0' })
    return
  }

  const newVehiculo = {
    patente,
    marca,
    modelo,
    habilitado,
    capacidad,
    autonomiaKms,
  }

  vehiculosData.push(newVehiculo)
  res.status(httpStatusCodes.HTTP_STATUS_CREATED).json({ message: 'Vehículo creado correctamente', vehiculo: newVehiculo })
}
  
const updateVehiculo = (req, res) => {
  const { patente } = req.params
  const { habilitado, capacidad, autonomiaKms } = req.body

  const vehiculo = vehiculosData.find((v) => v.patente === patente)

  if (!vehiculo) {
    res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'Vehículo no encontrado' })
    return
  }

  if (habilitado !== undefined) {
    vehiculo.habilitado = habilitado
  }
  if (capacidad !== undefined) {
    vehiculo.capacidad = capacidad
  }
  if (autonomiaKms !== undefined) {
    vehiculo.autonomiaKms = autonomiaKms;
  }

  res.json({ message: 'Vehículo actualizado correctamente', vehiculo });
}

module.exports = {
  getAllVehiculos,
  getVehiculoByPatente,
  createVehiculo,
  updateVehiculo
}
