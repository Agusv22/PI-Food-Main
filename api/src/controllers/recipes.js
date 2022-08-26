require('dotenv').config();
const axios = require ("axios");
const { API_KEY }= process.env;
//const { DETAIL_URL }= addRecipeInformation=true;
const {Recipe, Dieta} = require("../db")
//const BRING_ONLY_100 = number=100;

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const apiInfo = await apiUrl.data.results.map (e => {
        return {
            id: e.id,
            title: e.title,
            img: e.image,
            resumenPlato: e.summary,
            dietTypes: e.diets,
            healthScore: e.healthScore,
            stepByStep: e.analyzedInstructions[0]?.steps.map(e => {
                return {
                    number: e.number,
                    step: e.step
                 }
            })
        }
    })
    console.log(apiInfo)
    return apiInfo;
};

const getDbInfo = async () => {
    const recipeDb = await Recipe.findAll({
        include:{
            model: Dieta,
            attributes: ["dietName"],
            through:{
                attributes: [],
            }
        }
    })
    return recipeDb
    // return recipeDb.map(e => {
    //     return{
    //         id: e.id,
    //         title: e.title,
    //         img: e.img,
    //         summary: e.resumenPlato,
    //         healthScore: e.healthScore,
    //         dietTypes: e.diets.map(e => e.dietName),
    //         stepByStep: e.stepByStep,
    //         createdInDb: e.createdInDb,
    //     }
    // })
};

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = await apiInfo.concat(dbInfo);
    return infoTotal;
}



module.exports ={
    getApiInfo,
    getDbInfo,
    getAllRecipes,
}
