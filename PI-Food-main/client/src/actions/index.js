import axios from 'axios'


export function getRecipes() {
    return async function(dispatch) {
        var json = await axios.get("http://localhost:3001/recipes",{
            
        });
        return dispatch({
            type: 'GET_RECIPES',
            payload : json.data
        })
    }

}


export function getNameRecipes(name) {

    return async function(dispatch) {
        var json = await axios.get("http://localhost:3001/recipes?name=" + name);
        return dispatch({
            type: 'GET_NAME_RECIPES',
            payload : json.data
        })
    }

}

export function getDiets() {
    return async function(dispatch) {
        var json = await axios.get("http://localhost:3001/diets",{
            
        });
        return dispatch({
            type: 'GET_DIETS',
            payload : json.data
        })
    }

}

export function postRecipes(payload) {
    return async function(dispatch) {
        const response = await axios.post("http://localhost:3001/recipes",payload);
        return response;
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

// export function orderByCreate(payload){
//     return{
//         type: "ORDER_BY-CREATE",
//         payload
//     }
// }

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/recipes/" + id);
            return dispatch ({
                type:"GET_DETAIL",
                payload:json.data
            })
        } catch(error){
            console.log(error)
        }
    }
}

export function savePage(payload){
    return ({
        type:"SAVE_PAGE",
        payload
    })
}

export function cleanFilter(){
    return {
        type:"CLEAN_FILTER",
        payload:[]
    }
}