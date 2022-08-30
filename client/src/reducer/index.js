//Armamos el estado inicial
const initialState = {
    recipes : [],
    allRecipes: [],
    diets: [],
    recipesDetail: []
}

function rootReducer (state = initialState, action){
switch(action.type) {
    case "GET_RECETAS":
        return{
            ...state,
            recipes: action.payload,
            allRecipes: action.payload
        }
        case "FILTER_BY_DIETS": 
            const allRecipes = state.allRecipes;
            console.log(allRecipes)
            function dietas(){
                let prueba1 =[]
                for (const key in allRecipes) {
                    allRecipes[key].dietName?.map(e => {
                        if(e === action.payload) {
                            prueba1.push(allRecipes[key])
                        }
                    })
                    allRecipes[key].dieta?.map(d=>{
                        if(d.dietName === action.payload)
                        prueba1.push(allRecipes[key])
                    })
                    }  
                return prueba1
                }

            const statusFiltered = action.payload === "All" ? allRecipes : dietas()
            return {
                ...state,
                recipes: statusFiltered
            }
            case "GET_RECIPES_BY_TITLE":
                return{
                ...state,
                recipes: action.payload
                }
            case "GET_DIETS":
            return{
                ...state,
                diets: action.payload
            }
            case "POST_RECIPE":
            return{
                ...state,
                recipe: [action.payload, ...state.recipes]
            }
            case "ORDER_BY_TITLE":
            let sortedTitle = action.payload === 'ascendente' ?
                state.recipes.sort(function (a, b) {
                    
                    if(a.title > b.title){
                        return 1;
                    }
                    if(b.title > a.title){
                        return -1;
                    }
                    return 0;
                }) :
                state.recipes.sort(function(a, b){
                    if(a.title > b.title){
                        return -1;
                    }
                    if(b.title > a.title){
                        return 1;
                    }
                    return 0;
                });
            return {
                ...state,
                recipes: sortedTitle
            }
            case "ORDER_BY_HEALTHSCORE":
            let sortedHealthScore = action.payload === 'mostHS' ?
                state.recipes.sort(function (a, b) {
                    if(a.healthScore > b.healthScore){
                        return -1;
                    }
                    if(b.healthScore > a.healthScore){
                        return 1;
                    }
                    return 0;
                }) :
                state.recipes.sort(function(a, b){
                    if(a.healthScore > b.healthScore){
                        return 1;
                    }
                    if(b.healthScore > a.healthScore){
                        return -1;
                    }
                    return 0;
                });
            return {
                ...state,
                recipes: sortedHealthScore
            }
            case "GET_RECIPE_DETAILS":
                return{
                    ...state,
                    recipesDetail: action.payload
                }

        case "RELOAD":
            return{
                ...state,
                recipesDetail: action.payload
            }
        default: return state;
    }
}






export default rootReducer;