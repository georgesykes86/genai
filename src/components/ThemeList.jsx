import React from 'react'
import { Link } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import RecipeContext from '../RecipeContext'
import Spinner from './Spinner'

function ThemeList() {
    const [selected, setSelected] = useState([])
    const {themes, loading, fetchThemes, setSelectedThemes} = useContext(RecipeContext)
    
    useEffect(() => {
        (async () => {
          fetchThemes()
        })();
      })

    const setSelectedTheme = (id, checked) => {
        if (checked) {
            const st = [...selected, id]
            setSelected(st)
            setSelectedThemes(st)
        } else {
            const st = selected.filter((value) => value !== id)
            setSelected(selected.filter(st))
            setSelectedThemes(st)
        }
    }

  if (!loading) {
    return (
        <div>
            <ul className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-start pt-20">
            {themes.map((theme) => (
                <><li key={theme}>
                    <input type="checkbox" key={theme} id={theme} value="" className="hidden peer" onClick={(e) => setSelectedTheme(e.target.id, e.target.checked)} />
                    <label htmlFor={theme} className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer light:hover:text-gray-300 light:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 light:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 light:text-gray-400 light:bg-gray-800 light:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">{theme}</div>
                        </div>
                    </label>
                </li></>
            ))}
            </ul>
            <div className="flex justify-center items-center h-screen">
                <Link to='/recipes' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded'>
                    Get Recipes
                </Link>
            </div>
            
        </div>
      )
  } else {
    return <Spinner/>
  } 
  
}

export default ThemeList
