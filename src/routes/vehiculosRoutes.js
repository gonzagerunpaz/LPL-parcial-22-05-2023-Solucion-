const express = require('express')
const { getAllVehiculos, 
        getVehiculoByPatente,
        createVehiculo, 
        updateVehiculo 
} = require('../controllers/vehiculosControllers')

const vehiculosRoutes = express.Router()

vehiculosRoutes.get('/', getAllVehiculos)
vehiculosRoutes.get('/:patente', getVehiculoByPatente)
vehiculosRoutes.post('/', createVehiculo)
vehiculosRoutes.put('/:patente', updateVehiculo)

module.exports = vehiculosRoutes 