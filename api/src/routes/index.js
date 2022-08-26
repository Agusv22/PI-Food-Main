const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const recipesRouter = require('../routes/recipes');
const dietsRouter = require('../routes/diets');
const recipesPostRouter = require('./recipesPost')
const recipesDetailRouter = require('./recipesDetail.js')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recetas', recipesRouter);
router.use('/diets', dietsRouter);
router.use('/postRecipe', recipesPostRouter);
router.use('/recetas', recipesDetailRouter);

module.exports = router;
