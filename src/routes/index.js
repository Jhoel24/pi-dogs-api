const { Router } = require('express');
const { getDogs, createDog, getDogById } = require('../controllers/dog.controller');
const { getTemperaments } = require('../controllers/temperaments.controller');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//dogs
router.get('/dogs', getDogs)
router.get('/dogs/:id', getDogById)
router.post('/dogs', createDog)

//temperaments
router.get('/temperaments', getTemperaments)

module.exports = router;
