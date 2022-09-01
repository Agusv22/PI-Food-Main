import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getDiets } from "../actions/index";
import { Link, useHistory } from "react-router-dom";
import "./RecipeCreate.css";
//useHistory es un metodo del router que lo que hace es redirigirme a la ruta que yo le diga

export default function RecipeCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets);
  const [errors, setError] = useState({})

  const [input, setInput] = useState({
    title: "",
    resumenPlato: "",
    healthScore: "",
    stepByStep: "",
    img: "",
    diet: [],
  });

  function validate(input){
    let errors = {};
    if (!/^[A-Z]+$/i.test(input.title)) {
        errors.title = "Insertar un titulo para la receta";
    }else if(input.title.length > 20){
      errors.title = "Inserte un titulo menor a 20 caracteres";

    }else if(!input.resumenPlato){
        errors.resumenPlato = "Redactar un resumen para la receta";

    }else if(input.healthScore < 0 || input.healthScore > 100 || !input.healthScore || (!/^[0-9]+$/.test(input.healthScore))){
        errors.healthScore = "Declarar un valor entero entre 0 y 100";

    }else if(!input.stepByStep){
        errors.stepByStep = "Redactar los pasos a seguir!";

    }else if (!input.img.length > 0 || !input.img.match(/^(ftp|http|https):\/\/[^ "]+$/)){
        errors.img = "Inserte una Dirección de imágen"
    }
    return errors
  
}

  //cada vez que ejecutes esta funcion a mi estado input ademas de lo q tiene agregale el target value de lo que este modificando
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(validate({
        ...input,
        [e.target.name]: e.target.value,
    }))
  }

  function handleSelect(e) {
    let { value } = e.target;
        if(value && !input.diet.includes(value)){
    setInput({
      ...input,
      //Cada vez que haces un click en el select, se va concatenando en diet
      //diet: [...input.diet, e.target.value],
      diet: [...input.diet, e.target.value],
    });
  }
}

  function handleSubmit(e) {
    e.preventDefault()
    if(errors.title || errors.resumenPlato || errors.healthScore || errors.stepByStep || errors.diet || errors.img || input.title === "" 
        || input.healthScore === "" || input.diet.length === 0 || input.img === "" || input.resumenPlato === "" || input.stepByStep === "" )
    {
    alert(" Error: Receta no creada, porfavor rellene los campos especificados y/o corriga los errores")
            
    }else{
    //console.log(input);
    dispatch(postRecipe(input));
    alert("Receta creada!!");
    setInput({
      title: "",
      resumenPlato: "",
      healthScore: "",
      stepByStep: "",
      img: "",
      diet: [],
    });
    history.push("/home");
  }
}

  function handleDelete(e) {
    let { value } = e.target;
    if(value && input.diet.includes(value)){
    setInput({
      ...input,
      diet: input.diet.filter((dieta) => dieta !== value),
    });
  }
  }

  //Necesito renderizar las dietas
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className="container2">
      <Link to="/Home">
        <button className="volverboton1">Atrás</button>
      </Link>
      <h1>Creá tu RECETA!</h1>
      <div className="cartita1">
      <form className="cssform" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className="cuadraditos">Title:</label>
          <input
            type="text"
            value={input.title}
            name="title"
            onChange={(e) => handleChange(e)}
          />
          {errors.title&& (
          <p className="error" >{errors.title}</p>)}
        </div>
        <div>
          <label className="cuadraditos">Summary:</label>
          <input
            type="text"
            value={input.resumenPlato}
            name="resumenPlato"
            onChange={(e) => handleChange(e)}
          />
          {errors.resumenPlato&& (
          <p className="error">{errors.resumenPlato}</p>)}
        </div>
        <div>
          <label className="cuadraditos">Health Score:</label>
          <input
            type="number"
            value={input.healthScore}
            name="healthScore"
            onChange={(e) => handleChange(e)}
          />
          {errors.healthScore&& (
          <p className="error">{errors.healthScore}</p>)}
        </div>
        <div>
          <label className="cuadraditos">Img:</label>
          <input
            type="text"
            value={input.img}
            name="img"
            onChange={(e) => handleChange(e)}
          />
          {errors.img&& (
          <p className="error">{errors.img}</p>)}
        </div>
        <div>
            <label className="cuadraditos">Steps</label>
            <input
              type="text"
              value={input.stepByStep}
              name="stepByStep"
              onChange={(e) => handleChange(e)}
            />
            {errors.stepByStep&& (
            <p className="error">{errors.stepByStep}</p>)}
          </div>
          <select onChange={(e) => handleSelect(e)}>
            {diets.map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>
          <button className="botoncito" type="submit">Crear Receta</button>
        
      </form>
      <div className="pruebadivsito">
      {input.diet.map((e) => (
        <div className="label-selected anim-opacity">
          <div className="selected-text">{e}</div>
          <button className="selected-button" value={e} onClick={(e) => handleDelete(e)}>
            x
          </button>
        </div>
      ))}
      </div>
    </div>
    </div>
  );
}

     
