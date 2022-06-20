const axios = require('axios');
const e = require('express');
const {Recipe,Diet}=require('../db')
const {API_KEY}= process.env;
const URL = 'https://api.spoonacular.com/recipes';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase().concat(string.slice(1))
}

//llamado a la api para buscar todas las recetas

const apiRecipes = async()=>{
    try{
        const apiInfo = await axios.get(`${URL}/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
        const response = await apiInfo.data.results.map((e)=>{
            return{
                id: e.id,
                title: e.title,
                score: e.spoonacularScore,
                diets: e.diets,
                image: e.image,
            }
        });
        return response;
    }
    catch(error){
        console.log('error in controllers/apiRecipes',error);
    }
}
//busco todas las recetas en la base de datos
const dbRecipes = async()=>{
    let dbInfo = await Recipe.findAll({
        attributes:['id','title','summary','score','healthScore','steps','image','createInDb'],
        include:{
            model: Diet,
            attributes:['name'],
            through:{
                attributes:[]
            }
        },
    });
    let normalizedData = [];
    let responseDb = dbInfo;
    responseDb.forEach((el)=>{
        let normal ={
            id: el.id,
            title: capitalizeFirstLetter(el.title),
            summary:el.summary,
            score:el.score,
            diets: el.diets.map((d)=>d.name),
            steps:el.steps,
            image: el.image,
            createInDb: el.createInDb
        };
        normalizedData.push(normal);
    });
    return normalizedData;
}
//concateno todas las recetas
const allRecipes = async()=>{
    const resApi = await apiRecipes();
    const resDb = await dbRecipes();
    const resAllRecipes = resApi.concat(resDb);
    return resAllRecipes;
}

module.exports= {allRecipes,capitalizeFirstLetter}