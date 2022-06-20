const { Router } = require('express');

const getRecipes = require('./getRecipes');
const getTypes = require('./getTypes');
const postRecipe = require('./postRecipe');
const putRecipe = require('./putRecipe');
const deleteRecipe = require('./deleteRecipe');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', getRecipes);
router.use('/types', getTypes);
router.use('/recipe', postRecipe);
router.use('/edit',putRecipe);
router.use('/delete', deleteRecipe);


module.exports = router;