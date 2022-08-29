import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { postRecipe, getDiets } from "../actions/index";
import {Link, useHistory} from 'react-router-dom';
 //useHistory es un metodo del router que lo que hace es redirigirme a la ruta que yo le diga


export default function RecipeCreate(){
    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector((state) => state.diets);

    const [input, setInput]= useState({
        title: "",
        resumenPlato: "",
        healthScore: '',
        stepByStep: "",
        img: "",
        diet: [],
    })

    //cada vez que ejecutes esta funcion a mi estado input ademas de lo q tiene agregale el target value de lo que este modificando
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value,
    })
}

    function handleSelect(e){
        setInput({
            ...input,
                //Cada vez que haces un click en el select, se va concatenando en diet
                //diet: [...input.diet, e.target.value],
            diet : [...input.diet, e.target.value],
        })
    }

    function handleSubmit(e){
        e.preventDefault();
            console.log(input)
            dispatch(postRecipe(input))
            alert("Receta creada!!")
            setInput({
            title: "",
            resumenPlato: "",
            healthScore: '',
            stepByStep: "",
            img: "",
            diet: []
            })
            history.push('/home')
    }

    function handleDelete(e){
        setInput({
            ...input,
            diet: input.diet.filter(dieta => dieta !== e)
        })
    }

     //Necesito renderizar las dietas
     useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

    return (
        <div>
            <Link to= "/Home"><button>Atrás</button></Link>
            <h1>Creá tu RECETA!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                <label>Title:</label>
                <input
                type= "text"
                value={input.title}
                name="title"
                onChange={(e) => handleChange(e)}
                />
                </div>
                <div>
                <label>Summary:</label>
                <input
                type="text"
                value={input.resumenPlato}
                name="resumenPlato"
                onChange={(e) => handleChange(e)}
                />
                </div>
            <div>
                <label>Health Score:</label>
                <input
                type="number"
                value={input.healthScore}
                name="healthScore"
                onChange={(e) => handleChange(e)}
                />
            </div>
            <div>
                <label>Img:</label>
                <input
                type="text"
                value={input.img}
                name="img"
                onChange={(e) => handleChange(e)}
                />
                <div>
                <label>Steps</label>
                <input
                type="text"
                value={input.stepByStep}
                name="stepByStep"
                onChange={(e) => handleChange(e)}
                />
            </div>
            <select onChange={(e) => handleSelect(e)}>
                {diets.map((e) => (
                    <option value={e}>{e}</option>
                ))}
            </select>
            <button type ="submit">Crear Receta</button>
            </div>
            </form>
            {input.diet.map(e => 
                <div className="divDiet">
                    <p>{e}</p>
                    <button className="BotonX" onClick={() => handleDelete(e)}>x</button>
                    </div>
                )}
        </div>
    )
}