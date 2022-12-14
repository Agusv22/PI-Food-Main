import axios from "axios";

export function getRecipes(){
    return async function(dispatch){
        let json = await axios.get("/recetas");
        return dispatch({
            type: "GET_RECETAS",
            payload: json.data
        })
    }
}

export function filterByDiets(payload) {
	 console.log(payload); //All
	return {
		type: "FILTER_BY_DIETS",
		payload,
	};
}
export function orderByTitle(payload) {
	return {
		type: "ORDER_BY_TITLE",
		payload,
	};
}
export function orderByHealthScore(payload) {
	return {
		type: "ORDER_BY_HEALTHSCORE",
		payload,
	};
}

export function getRecipesByTitle(title){
	return async function(dispatch){
		try{
			let json = await axios.get(`/recetas?title=${title}`);
			return dispatch ({
				type: "GET_RECIPES_BY_TITLE",
				payload: json.data
			})
		}catch (error) {
			alert("Receta no encontrada")
		}
	}
}

export function getDiets() {
	return async function (dispatch) {
		let info = await axios.get("/diets");
		return dispatch({
			type: "GET_DIETS",
			payload: info.data.map(dietita => dietita.dietName),
		}); 
	};
}

export function postRecipe(payload) {
	return async function (dispatch) {
		try {
			let response = await axios.post("/postRecipe", payload);
			//console.log("postRecipe:" + response.data);
			return dispatch({
				type: "POST_RECIPE",
				payload: response.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getDetail(id){
	return async function(dispatch){
		try{
			let json = await axios.get(`/recetas/${id}`);
			return dispatch({
				type: "GET_RECIPE_DETAILS",
				payload: json.data
			})
		}catch(error){
		console.log(error)
		}
	}
}

export function reload(payload){
	return {
		type: "RELOAD",
		payload: payload,
	}
}


