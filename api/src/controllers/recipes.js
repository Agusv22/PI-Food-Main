require('dotenv').config();
const axios = require ("axios");
const { API_KEY }= process.env;
//const { DETAIL_URL }= addRecipeInformation=true;
const {Recipe, Dieta} = require("../db")
//const BRING_ONLY_100 = number=100;

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const apiInfo = apiUrl.data.results.map (e => {
        return {
            id: e.id,
            title: e.title,
            img: e.image,
            resumenPlato: e.summary,
            dietName: e.diets,
            healthScore: e.healthScore,
            stepByStep: e.analyzedInstructions[0]?.steps.map(e => {
                return (
                    e.step
                )
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
