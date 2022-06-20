//import extern modules
const express = require('express');
const route = express.Router();
//import intern modules
const {Recipe, Diet} = require('../db');

route.delete('/:id', async(req,res)=>{
    try{
        let {id} = req.params;
        const toDelete = await Recipe.findOne({
            where:{
                id,
            },
        });
        if(toDelete){
            await toDelete.destroy();
        }
        res.status(200).json({message:'Recipe successfully deleted !'})
    }catch(error){
        console.log('error in deteleRecipe',error)
    }
})
module.exports= route;