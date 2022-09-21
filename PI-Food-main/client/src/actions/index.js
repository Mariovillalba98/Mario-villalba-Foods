import axios from 'axios'


export function getRecipes() {
    return async function(dispatch) {
        var json = await axios.get  ("http://localhost:3001/recipes",{
            
        });
        return dispatch({
            type: 'GET_RECIPES',
            payload : json.data
        })
    }

}
export function filterDiets (payload){
    
    
    return{
        type: "FILTER_DIETS",
        payload

    }
}

export function OrderByName (payload){
    
    
    return{
        type: "ORDER_BY_NAME",
        payload

    }
}

export function OrderByHealthScore (payload){
    
    
    return{
        type: "ORDER_BY_HEALTHSCORE",
        payload

    }
}