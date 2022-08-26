import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect} from "react";

export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(getDetail(props.match.params.id)); // asi accedo al id de ese detalle 
    },[dispatch])


    const myRecipe = useSelector((state) => state.recipesDetail)


    return (
        <div>
        <h1>{myRecipe.title}</h1>
        <img src={myRecipe.image} width='400px' height='500px'/>

            <h3>{myRecipe.healthScore}</h3>
            <h3>Diet Type</h3>
            {
	//Es importante el ? porque así el map no es undefined. Como que le da tiempo a la api a traer la info
			myRecipe.dietTypes?.map((e) => (
			<div key={e}>
			<h3 key={e}> {e} </h3>

		</div>
		))
		}
            <h3>Summary</h3>
            <div
			dangerouslySetInnerHTML={{
			__html: myRecipe.summary,
		}}
		    />

            <h3>Steps</h3>
            {Array.isArray(myRecipe.analyzedInstructions) ? (
			myRecipe.analyzedInstructions.map((e) => {
			return (
			<div className='step'>
			<p>
			<strong>{e.number + ') '}</strong>
		    </p>
			<li key={e.number}>{e.step}</li>
			</div>
			);
		})
		) : (
	//Si no tengo analyzedInstructions, renderizo los que contengan steps
	//myRecipe.steps
		    <li>{myRecipe.stepFromDb}</li>
		)}

            <Link to='/home'>
			<button>Volver</button>
			</Link>
         </div>
    )
}