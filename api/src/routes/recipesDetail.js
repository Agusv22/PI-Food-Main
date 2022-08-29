require('dotenv').config();
const express = require('express');
const router = express();
const { getAllRecipes } = require("../controllers/recipes");

router.get("/:id", async(req, res) =>{
    const { id } = req.params;
    let totalRecipes = await getAllRecipes();
    let recipe = totalRecipes.filter((e) => e.id == id);
    let filterRecipe= recipe[0]
    recipe.length
    ? res.status(200).json(filterRecipe)
    : res.status(404).send("El id no coincide con ninguna receta");
})




module.exports = router;