require('dotenv').config();
const axios = require('axios');
const express = require('express');
//const { DETAIL_URL }= "addRecipeInformation=true";
const { API_KEY }= process.env;
const router = express();
const {Recipe, Dieta} = require("../db")
const {dietTypes} = require ("../controllers/dietTypes.js")

router.get("/", async (req, res) => {

    try{
    dietTypes.forEach(async e => {
    await Dieta.findOrCreate({
            where: {
                dietName: e
            }
        })
    })
    const allDiets = await Dieta.findAll();
    res.send(allDiets);
    }catch(error){
        next(error);
    }
});

module.exports = router;