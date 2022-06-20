const { default: axios } = require('axios');
const express = require('express');
const route = express.Router();
require('dotenv').config();

const {allRecipes,capitalizeFirstLetter } = require('../controllers/BasicData');
const {API_KEY}= process.env;
const URL = 'https://api.spoonacular.com/recipes';
const {Recipe,Diet} = require('../db')

route.get('/', async(req,res)=>{
    try{
        const title = req.query.title;
        let recipes = await allRecipes();
        if(title){
            let recipeMatcher = await recipes.filter((e)=>
            e.title.toLowerCase().includes(title.toLowerCase()));
            if(recipeMatcher.length) return res.status(200).send(recipeMatcher);
            return res.status(404).send({message:'Recipe Not Found'})
        }else{
            res.status(200).send(recipes)
        }
    }catch(error){
        return res.send({message: 'Requests are over, try to access later!'})
    }
});

route.get('/:id',async(req,res)=>{
    const {id} = req.params;
    try{
        if(id.length>20){
            const dbInfo = await Recipe.findByPk(id,{
                include:{
                    model: Diet,
                    attributes:['name'],
                    through:{
                        attributes:[]
                    }
                }
            });
            let dataBd = await dbInfo;
            let normalized = {
                id: dataBd.id,
                title: capitalizeFirstLetter(dataBd.title),
                score: dataBd.score,
                healthScore: dataBd.healthScore,
                summary: dataBd.summary,
                steps: dataBd.steps,
                diets: dataBd.diets.map((d)=>d.name),
                image: dataBd.image,
                createInDb: dataBd.createInDb
            }
            return normalized? res.status(200).send(normalized) : res.status(400).send('recipe not found');
        }else{
            let apiInfo;
            try{
                const {data} = await axios.get(`${URL}/${id}/information?apiKey=${API_KEY}`);
                apiInfo ={
                    id:data.id,
                    title: data.title,
                    summary: data.summary.replace(/<[^>]*>?/gm, ""),
                    score: data.spoonacularScore,
                    healthScore: data.healthScore,
                    diets: data.diets,
                    image:data.image,
                    steps: data.instructions.replace(/<[^>]*>?/gm, ""),
                    time: data.readyInMinutes,
                    dishType:data.dishTypes
                }
            }catch(error){
                console.log('error in detailApi',error)
            }
            return apiInfo? res.status(200).json(apiInfo):res.status(400).send('recipe not found');
        }
    }
    catch(error){
        return res.status(400).send({message: 'Requests are over, try to access later!'})
    }
})

module.exports= route;