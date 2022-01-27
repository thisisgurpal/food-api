import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const Home = () => {

  const [ categories, setCategories ] = useState([]) 
  const [ areas, setAreas ] = useState([])
  const [ recipes, setRecipes ] = useState([])
  const [ filterRecipesDisplay, setFilterRecipesDisplay ] = useState([])



  // const [ categoryFilter, setCategoryFilter ] = useState([])
  // const [ areaFilter, setAreaFilter ] = useState([])

  const [ isError, setIsError ] = useState({
    error: false,
    message: '',
  })

  const [cuisineChosen, setCuisineChoosen] = useState('All Cuisines')
  const [typeChosen, setTypeChosen] = useState('All Types')

  let filterFoodArray
  
  // const [ isError, setIsError ] = useState({
  //   error: false,
  //   message: '',
  // })
  const navigate = useNavigate()

  // retrieve category and area data from API
  useEffect(() => {

    const getData = async () => {
      try {
        const catObj = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
        const filterCategories = []
        catObj.data.meals.forEach(category => {
          filterCategories.indexOf(category.strCategory) === -1 && filterCategories.push(category.strCategory)
        })
        setCategories(filterCategories) // State 1
        console.log(filterCategories)
        const areaObj = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        const filterAreas = []
        areaObj.data.meals.forEach(area => {
          filterAreas.indexOf(area.strArea) === -1 && filterAreas.push(area.strArea)
        })
        console.log(filterAreas)
        setAreas(filterAreas) // State 2
      } catch (err) {
        console.log('error', err.response)
        // setIsError({ error: true, message: err.message })
      }
    }
    getData()
  }, [])


  //* get all recipes
  useEffect(() => {
    if (categories.length) {

      const recipeList = []

      // FUNCTION 1: this function gets the meals for a single category
      categories.forEach(category => { // for each category
        const getIds = async () => { //search category api to get id's
          try {
            const mealObj = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)

            mealObj.data.meals.forEach(meal => { // for each id found get the recipe from the recipe api and push into recipe array

              const getRecipe = async () => {
                try {
                  const recipeObj = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
                  recipeList.push(recipeObj.data.meals[0]) // push recipe into recipeList array
                  // console.log(recipeObj.data.meals)
                } catch (err) {
                  setIsError({ error: true, message: err.message })
                }
              }
              getRecipe() // run getRicpe function to get recipe

            })

          } catch (err) {
            console.log('error', err.response)

          }
        }

        getIds()
      })
      // run id function to ge the id in order to get the recipe
      setRecipes(recipeList)
      console.log('recipe array', recipeList)
      console.log('recipe length', recipeList.length)
    }
  }, [categories])


  //* get array for options to filter recipes by
  function filterFood(e) {
    if (e.target.name === 'cuisine') {
      const cuisine = e.target.value
      setCuisineChoosen(cuisine)
      filterFoodArray = [cuisine, typeChosen]
      console.log(filterFoodArray)
    } else if (e.target.name === 'type') {
      const type = e.target.value //
      setTypeChosen(type)
      filterFoodArray = [cuisineChosen, type]
      console.log(filterFoodArray)
    }
  }
  useEffect(() => {
    let recipesFiltered

    if (cuisineChosen === 'All Cuisines' && typeChosen === 'All Types') {
      recipesFiltered = recipes
    } else if (cuisineChosen === 'All Cuisines') {
      recipesFiltered = recipes.filter(item => item.strCategory === typeChosen)
    } else if (typeChosen === 'All Types') {
      recipesFiltered = recipes.filter(item => item.strArea === cuisineChosen)
    } else {
      recipesFiltered = recipes.filter(item => (item.strCategory === typeChosen && item.strArea === cuisineChosen))
    }
    setFilterRecipesDisplay(recipesFiltered)
    console.log(recipesFiltered)

  }, [recipes, cuisineChosen, typeChosen])

  // useEffect(() => {
  //   if (cuisineChosen === 'All Cuisines' && typeChosen === 'All Types') {
  //     filteredCountries = recipes
  //   } else if (cuisineChosen === 'All Cuisines') {
  //     filteredCountries = recipes.filter(country => country.name.common.toLowerCase().includes(typeCountry.toLowerCase()))
  //   } else if (typeCountry === '') {
  //     filteredCountries = recipes.filter(country => country.region.toLowerCase().includes(countryRegion.toLowerCase()))
  //   } else {
  //     filteredCountries = recipes.filter(country => country.name.common.toLowerCase().includes(typeCountry.toLowerCase()) && country.region.toLowerCase().includes(countryRegion.toLowerCase()))
  //   }
  //   setFilterCountriesDisplay(filteredCountries)
  //   console.log(filteredCountries)

  // }, [recipes, countryRegion, typeCountry])



  function getRecipes(){
    // console.log(recipes.length)

    navigate('/recipes')
  }

  return (
    <>
      <div className='hero text-center'>
        <div className='hero-overlay'>
          <h1>Home</h1>
          <div className='select-boxes'>
            <select name='cuisine' onChange={filterFood}>
              <option>All Cuisines</option>
              {areas.map((type, index) => {
                return (
                  <>
                    <option value={type} key={index}>{type}</option>
                  </>
                )
              })}
            </select>
            <select name='type' onChange={filterFood}>
              <option>All Types</option>
              {categories.map((type, index) => {
                return (
                  <>
                    <option value={type} key={index}>{type}</option>
                  </>
                )
              })}
            </select>
          </div>
        </div>
      </div>
      <Container className='recipes-container'>
        {filterRecipesDisplay.length ? 
          <>
            {filterRecipesDisplay.map(recipe  => {
              const { idMeal, strMeal, strMealThumb, strCategory, strArea } = recipe
              return (
                <Col key={idMeal} className="mt-4">
                  <Link to={`/recipes/${idMeal}`}>
                    <Card className="h-100">
                      <div className="card-img m-auto">
                        <img src={strMealThumb} alt={strMeal} />
                      </div>
                      <Card.Footer>
                        <div className="card-txt">
                          {strMeal}<br />
                          <span>{strCategory}, {strArea}</span>
                        </div>
                      </Card.Footer>
                    </Card>
                  </Link>
                </Col>
              )
            })} 
          </>    
          :
          <p>{filterRecipesDisplay.length}</p>
        }
      </Container>
    </>
  )
}

export default Home