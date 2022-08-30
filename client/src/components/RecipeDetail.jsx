import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, reload } from "../actions";
import { useEffect } from "react";
import "./RecipeDetail.css"

export default function Detail(props) {
  console.log(props);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id)); // asi accedo al id de ese detalle
    dispatch(reload([])) // para que se vacie el get detail y vuelva a cargar el gif
  }, [dispatch]);

  const myRecipe = useSelector((state) => state.recipesDetail);

  console.log(myRecipe, "recipe");
  return (
    <div> {myRecipe.length === 0 ? <div> <img src="https://www.menuelsharkia.com/static/images/loading-foods.gif" alt="img not found"/></div> :(
      <div>
      <div>
        <img
          src={myRecipe?.img}
          alt="img not found"
          width="200px"
          height="250px"
        />
      </div>
      <div>
        <h1>Title: {myRecipe?.title}</h1>
      </div>
      <h2>
        Diet Type:{" "}
        {myRecipe?.dietName
          ? myRecipe?.dietName?.map((e) => {
              return <div>{e}</div>;
            })
          : myRecipe?.dieta?.map((d) => {
              return <div>{d.dietName}</div>;
            })}
      </h2>
      <div>
        <p>Summary:</p>
        <div
          dangerouslySetInnerHTML={{
            __html: myRecipe.resumenPlato,
          }}
        />
      </div>
      <h2>HealthScore: {myRecipe?.healthScore}</h2>
      <div>
        <h3>Step: {myRecipe?.stepByStep || "not found"}</h3>
      </div>

      <Link to="/home">
        <button>Volver</button>
      </Link>
      </div>
)}
    </div>
  );
}
