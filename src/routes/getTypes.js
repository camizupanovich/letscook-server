const express = require('express');
const route = express.Router();
const {Diet} = require('../db')

route.get('/',async(req,res)=>{
//guardo en un arreglo los tipos de dietas del json results.diets:[]
    const types =['gluten free', 'dairy free', 'lacto ovo vegetarian', 'vegan', 'pescatarian', 'paleolithic', 'primal', 'fodmap friendly', 'whole 30'];
//por cada uno lo busco o lo creo, en primer instancia se van a crear en la base de datos,  
    types.forEach(t=> Diet.findOrCreate({where:{name:t}}));
//luego los busco y retorno 
    const dietTypes = await Diet.findAll();
    res.send(dietTypes);
});

module.exports= route;