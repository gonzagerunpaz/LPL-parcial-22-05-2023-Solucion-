const express = require('express')
const { getAllReservas, 
        getReservaById, 
        deleteReservaById, 
        createReserva,
        searchUltimaReserva 
} = require('../controllers/reservasControllers')

const reservasRoutes = express.Router();

reservasRoutes.get('/search/', searchUltimaReserva);
reservasRoutes.get('/', getAllReservas);
reservasRoutes.get('/:id', getReservaById);
reservasRoutes.delete('/:id', deleteReservaById);
reservasRoutes.post('/', createReserva);

module.exports = { reservasRoutes };