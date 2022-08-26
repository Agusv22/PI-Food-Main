require('dotenv').config();
const axios = require('axios');
const express = require('express');
//const { DETAIL_URL }= "addRecipeInformation=true";
const { API_KEY }= process.env;
const router = express();
const {Recipe, Dieta} = require("../db")

router.get("/", async (req, res) => {

    const dietsApi = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const diets = dietsApi.data.results.map(e => e.diets)
    console.log(diets)
    const dietsEach = diets.forEach(e => {
        for (let i = 0; i < e.length ; i++) 
        Dieta.findOrCreate({
            where: {
                dietName: e[i]
            }
        })
    })
    const allDiets = await Dieta.findAll();
    res.status(200).send(allDiets);
});

module.exports = router;