const express = require('express');
//const { Router } = require('express')
// importar las funciones controladoras 
const { getAllRecipes } = require("../controllers/recipes");
//const router = Router();
//const {Recipe, Dieta} = require("../db")
const router = express();

router.get("/", async (req, res) => { 
    const { title } = req.query;
    const recipesTotal = await getAllRecipes()
    if(title){
        const filtro = await recipesTotal.filter(e => e.title.toLowerCase().includes(title.toLowerCase()));
        filtro.length ? res.status(200).send(filtro) : res.status(400).send("NO se encontró la Receta")
    }else{
        res.status(200).send(recipesTotal)
    }
})
   
   

module.exports = router;


