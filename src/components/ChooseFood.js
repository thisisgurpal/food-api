import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Spinner from './utilities/Spinner'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const ChooseFood = () => {

  // State
  const [ singleRecipe, setSingleRecipe ] = useState(null)
  const [ hasError, setHasError ] = useState({ error: false, message: '' })


  // Params
  const { idMeal } = useParams()
  console.log(idMeal)

  useEffect(() => {
    const getSingleRecipe = async () => {
      try {
        const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
        setSingleRecipe(data.meals[0])
        console.log(Object.entries(data.meals[0]))
        console.log(data.meals[0].strMeal)
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
                {Object.entries(singleRecipe).filter(item => item[0].includes('Ingredient') & item[1] !== '').map((ingredient, index) => {
                  return (
                    <div className='ingredient' key={index}>{ingredient[1]}</div>
                  )
                })}
              </div>
              <hr />
              <h4><span>🖐</span> Instructions</h4>
              <p >{singleRecipe.strInstructions}</p>
              <hr />
              <hr />
            
            </Col>
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