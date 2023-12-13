import React from 'react';
import { createContext, useReducer } from "react";
import recipeReducer from './RecipeReducer';

const RecipeContext = createContext()

export const RecipeProvider = ({children}) => {
    const initialState = {
        themes: [],
        loading: false,
        selectedThemes: [],
        meals: [],
        sessionToken: ""
    }
 
function sleep(ms) {
    console.log("sleeping")
    return new Promise(resolve => setTimeout(resolve, ms));
}   

 const fetchRetry = async (...args) => {
        let count = 5;
        while(count > 0) {
          try {
            const response = await fetch(...args);
            console.log(response)
            if (response.status >= 500 ) { throw new Error("Unnexpected error")}
            return response
          } catch(error) {
            console.log(error)
          }
          await sleep(500)
          count -= 1;
        }
      
        throw new Error(`Too many retries`);
      }

    const [state, dispatch] = useReducer(recipeReducer, initialState)

    const fetchThemes = async () => {
        setLoading()
        let response = undefined
        try {
            response = await fetchRetry('https://webappgenai.azurewebsites.net/themes', { method: "GET", headers: {}})
        } catch {
            stopLoading()
            return []
        }
        const data = await response.json()
        setSessionId(data["aiSessionId"])
        dispatch({type: 'GET_THEMES', payload: data["themes"]})
    }

    const fetchMeals = async () => {
        setLoading()
        let response = undefined
        try {
            response = await fetchRetry('https://webappgenai.azurewebsites.net/meals', { method: "POST", headers: {"ai-session-id": state.sessionToken, 'Content-Type':'application/json'}, body: JSON.stringify({"themes": state.selectedThemes})})
        } catch {
            stopLoading()
            return []
        }
        const data = await response.json()
        if (data["message"]) {
            stopLoading()
            return []
        }
        console.log(data)
        const meals = Object.keys(data["meals"]).map(function (key) {
            return data["meals"][key];
        }).flat()
        console.log(meals)
        dispatch({type: 'GET_MEALS', payload: meals})
        console.log("Meals set in state")
    }

    const setLoading = () => {
        dispatch({type: 'SET_LOADING'})
    }

    const stopLoading = () => {
        dispatch({type: 'STOP_LOADING'})
    }

    const setSelectedThemes = (selectedThemes) => {
        dispatch({type: 'SELECT_THEMES', payload: selectedThemes })
    }

    const setSessionId = (sessionId) => {
        dispatch({type: "SET_SESSION", payload: sessionId})
    }

    return <RecipeContext.Provider value={{themes: state.themes, loading: state.loading, selectedThemes: state.selectedThemes, meals: state.meals, fetchThemes, setSelectedThemes, fetchMeals, setLoading}}>{children}</RecipeContext.Provider>
}

export default RecipeContext