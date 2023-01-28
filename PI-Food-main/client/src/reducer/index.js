

const initialState = {
    recipes : [],
    allRecipes: [],
    diets:[],
    detail:[],
    pages: 1

}

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case 'GET_RECIPES':
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }

            case 'GET_DIETS':
            return{
                ...state,
                diets: action.payload,
                
            }

            case "FILTER_DIETS":
                const allRecipes = state.allRecipes
                console.log(allRecipes)
                const dietsFilter = action.payload === "all" ? allRecipes : allRecipes.filter(e=> e.diets.includes( action.payload) )
                return {
                    ...state,
                    recipes: dietsFilter
                }

            // case "FILTER_BY_CREATE":
            //     const lasRecetas = state.allRecipes

            //     if (action.payload === all){
            //         return lasRecetas
            //     }
            //     if(action.payload === "db"){
            //       lasRecetas.filter(e=>e.createdIndb)
            //     }
            //       return{
            //         ...state,
            //         recipe:action.payload
            //       }
                   
            //     }
                

            case "GET_NAME_RECIPES":
                return{
                    ...state,
                    recipes: action.payload
                }

            case "POST_RECIPES":
                return{
                    ...state
                }    

            case "ORDER_BY_NAME":
                let sortedArr = action.payload === "asc" ? state.recipes.sort(function(a, b){
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase()> a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                }) :
                
                state.recipes.sort(function(a,b){
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase()> a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
                return{
                    ...state,
                    recipes: sortedArr
                }
                
                case "GET_DETAIL":
                    return{
                        ...state,
                        detail: action.payload
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

                    case "SAVE_PAGE":
                        return {
                          ...state,
                          pages: action.payload
                        }

                        case "CLEAN_FILTER":
                            return {
                              ...state,
                              recipes: action.payload,
                              detail: action.payload
                            }

            default:
                return state;
    }      

}

export default rootReducer;