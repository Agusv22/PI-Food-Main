const express = require('express');
const router = express();
const { Recipe, Dieta } = require('../db')

router.post("/", async (req, res)=> {
    let {title, img, resumenPlato, healthScore, stepByStep, createdInDb, diet} = req.body

    let newRecipe = await Recipe.create({
        title,
        img,
        resumenPlato,
        healthScore,
        stepByStep,
        createdInDb,
        
    })
    let dietDb = await Dieta.findAll({
        where: { dietName : diet}
    })

    newRecipe.addDieta(dietDb)
    res.status(200).send(newRecipe);
})


module.exports = router;