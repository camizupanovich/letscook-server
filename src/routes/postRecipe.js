//import extern modules
const express = require('express');
const route = express.Router();
//import intern modules
const {Recipe, Diet} = require('../db');

route.post('/', async(req,res)=>{
//guardo la info que traigo por body
    const {title, summary, score, healthScore,steps,diets,image} = req.body;
    try{
//creo una receta con los atributos del modelo recipe
        let newRecipe = await Recipe.create({title, summary, score, healthScore,steps,image});
//busco las dietas que traje por body
        let allTypes = diets.map(t=>t.toLowerCase());
        let types = await Diet.findAll({
            where:{ name: allTypes}
        })
        //let id = newRecipe.id;
        newRecipe.addDiet(types);
        return res.json({message:'Recipe created successfully'})
    }catch(error){
        res.status(404).send(error)
    }
});

module.exports= route;