import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Themes from './components/Themes';
import Recipes from './components/Recipes';
import { RecipeProvider } from './RecipeContext';


export default function App() {
  return (
    <RecipeProvider>
      <Router>
        <div className="flex flex-col justify-items-stretch h-screen">
          <Navbar/>
          <main className='container mx-auto px-3 pb-12'>
            <Routes>
              <Route path='/' element={<Themes/>}/>
              <Route path='/recipes' element={<Recipes/>}/>
            </Routes>
          </main>
        </div>
      </Router>
    </RecipeProvider>
  )
}
