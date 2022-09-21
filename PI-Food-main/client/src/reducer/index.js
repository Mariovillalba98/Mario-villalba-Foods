import { stat } from "fs"

const initialState = {
    recipes : [],
    allRecipes: []
}

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case 'GET_RECIPES':
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
            case "FILTER_DIETS":
                const allRecipes = state.allRecipes
                console.log(allRecipes)
                const dietsFilter = action.payload === "all" ? allRecipes : allRecipes.filter(e=> e.diets.includes( action.payload) )
                return {
                    ...state,
                    recipes: dietsFilter
                }

            case "ORDER_BY_NAME":
                let sortedArr = action.payload === "asc" ? state.recipes.sort(function(a, b){
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name> a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                
                state.recipes.sort(function(a,b){
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name> a.name) {
                        return 1;
                    }
                    return 0;
                })
                return{
                    ...state,
                    recipes: sortedArr
                }
                

                case "ORDER_BY_HEALTHSCORE":
                  let sortedArr1 = action.payload === "descendente" ?
                  state.recipes.sort(function(a, b){
                        if (Number(a.healthScore) > Number(b.healthScore)) {
                            return 1;
                        }
                        if (Number(b.healthScore)> Number(a.healthScore)) {
                            return -1;
                        }
                        return 0;
                    }) :
                    
                    state.recipes.sort(function(a,b){
                        if (Number(a.healthScore)>Number(b.healthScore)) {
                            return -1;
                        }
                        if (Number(b.healthScore)> Number(a.healthScore)) {
                            return 1;
                        }
                        return 0;
                    })
                    return{
                        ...state,
                        recipes: sortedArr1
                    }

            default:
                return state;
    }      

}

export default rootReducer;