import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Spinner from './utilities/Spinner'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import YoutubeImg from ''

const ChooseFood = () => {

  // State
  const [ singleRecipe, setSingleRecipe ] = useState(null)
  const [ recipeMeasures, setRecipeMeasures ] = useState([])
  const [ recipeIngedients, setRecipeIngedients ] = useState([])
  const [ hasError, setHasError ] = useState({ error: false, message: '' })


  // Params
  const { idMeal } = useParams()
  console.log(idMeal)

  useEffect(() => {
    // const measureList = []
    // const ingredientList = []

    const getSingleRecipe = async () => {
      try {
        const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
        setSingleRecipe(data.meals[0])
        console.log(Object.entries(data.meals[0]))
        console.log(data.meals[0])
        const measureList = Object.entries(data.meals[0]).filter(item => item[0].includes('Measure') && (item[1] !== ' ') && (item[1] !== '') && (item[1] !== null))
        const measureListValue = measureList.map(item => item[1])
        console.log(measureListValue)
        setRecipeMeasures(measureListValue)
        const ingredientList = Object.entries(data.meals[0]).filter(item => item[0].includes('Ingredient') && (item[1] !== ' ') && (item[1] !== '') && (item[1] !== null))
        const ingredientListValue = ingredientList.map(item => item[1])
        console.log(ingredientList[1])
        setRecipeIngedients(ingredientListValue)
        console.log(!data.meals[0].strMeasure1)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    
    getSingleRecipe()
    

  }, [idMeal])
  
  return (
    <Container className="mt-4 individual-container">
      {singleRecipe ?
        <div className='meal-show'>
          <h2>{singleRecipe.strMeal}</h2>
          <hr />
          <div className='single-meal-container'>
            <Col md="6" className='img-container'>
              <img className='img-recipe' src={singleRecipe.strMealThumb} alt={singleRecipe.strMeal}/>
            </Col>
            <Col className='desciption' md="6">
              <h4><span>🍽</span> Meal Name</h4>
              <p>{singleRecipe.strIngredient1}</p>
              <hr />
              <h4><span>🌍</span> Origin</h4>
              <p className="lead">{singleRecipe.strArea}</p>
              <hr />
              <h4><span></span> Ingredients</h4>
              <div className='ingredients'>  
                {recipeMeasures.map((ingredient, index) => {
                  return (
                    <div key={index} id={ingredient} className='ingredient'>{recipeIngedients[index]}: {recipeMeasures[index]}</div>
                  )
                })}
              </div>
              <hr /> 
            </Col>

          </div>
          <div className='instructions-container'>
            <div className='instructions'>
              <h4><span>🍲</span> Instructions</h4>
              <p >{singleRecipe.strInstructions}</p>
              <hr />
            </div>
            <div className='find-out-more'>
              <h4><span></span>🔎 Find out more</h4>
              <div className='source-links'>
                <div className='source-link'><a href={singleRecipe.strYoutube}>Youtube video recipe</a></div>
                <div className='source-link'><a href={singleRecipe.strSource}>Source of recipe</a></div>
              </div>
              <hr />
            </div>
          </div>
          <div className='back-to-wines'>
            <Link to="/" className="btn btn-light">Back to home</Link>
          </div>
        </div>
        :
        <h2 className="text-center">
          {hasError.error ? 'Oh something went wrong, the sadness 😞' : <Spinner/>}
        </h2>
      }
    </Container>
  )
}
  
export default ChooseFood