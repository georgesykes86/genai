const recipeReducer = (state, action) => {
    switch(action.type) {
        case 'GET_THEMES':
            return {
                ...state,
                themes: action.payload,
                loading: false
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: true
            }
        case 'STOP_LOADING':
            return {
                ...state,
                loading: false
            } 
        case 'SELECT_THEMES':
            return {
                ...state,
                selectedThemes: action.payload
            }   
        case 'GET_MEALS':
            return {
                ...state,
                meals: action.payload,
                loading: false
            }
        case 'SET_SESSION':
            return {
                ...state,
                sessionToken: action.payload
            }              
        default:
            return state    
    }
}

export default recipeReducer