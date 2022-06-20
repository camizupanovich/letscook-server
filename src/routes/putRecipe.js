//import extern modules
const express = require('express');
const route = express.Router();
//import intern modules
const {Recipe, Diet} = require('../db');

route.put('/:id',async(req,res)=>{
    try{
    let {id} = req.params;
    /* let {title, summary, score, healthScore,steps,image} = req.body;
    await Recipe.update({title, summary, score, healthScore,steps,image},{
        where:{
            id,
        }
    }); */
    let {title,summary,image} =req.body;
    await Recipe.update({title,image,summary},{
        where:{
            id,
        }
    });
    res.status(200).json({message: 'Recipe updated successfully'})
    }catch(error){
        console.log('error in putRecipe', error)
    }
});

module.exports= route;