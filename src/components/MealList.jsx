import React from 'react'
import { useContext, useEffect } from 'react'
import RecipeContext from '../RecipeContext'
import MealItem from './MealItem'
import Spinner from './Spinner'

function MealList() {
    const {themes, loading, selectedThemes, meals, fetchThemes, setSelectedThemes, fetchMeals, setLoading} = useContext(RecipeContext)
    useEffect(() => {
        (async () => {
          fetchMeals()
        })();
      }, [])

    if (!loading) {
        return (
            <div className='grid grid-cols-1 gap-8 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2'>
                {meals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
                ))}
            </div>
        )
    } else {
        return <Spinner />
    }
}

export default MealList
