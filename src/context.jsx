import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'

const AppContext = React.createContext()
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const AppProvider = ({children}) => {
  const [loading, setLoading] = useState(false)
  const [meals, setMeals] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const fetchMeals = async(url) => {
    setLoading(true)
    try {
      const {data} = await axios(url)
      if(data.meals){
        setMeals(data.meals)
      } else {
        setMeals([])
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl)
  }

  useEffect(() => {
    fetchMeals(`${allMealsUrl}${searchTerm}`)
  },[searchTerm])
  
  return (
    <AppContext.Provider value={{meals, loading, setSearchTerm, fetchRandomMeal}}>
      {children}
    </AppContext.Provider>
  )
}

const useGlobalContext = () => {
  const context = useContext(AppContext)
  return context
}

export {AppContext, AppProvider, useGlobalContext}