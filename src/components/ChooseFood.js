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
                {/* <div className='ingredient'>{singleRecipe.strMeasure1} {singleRecipe.strIngredient1}</div>
                <div className='ingredient'>{singleRecipe.strMeasure2} {singleRecipe.strIngredient2}</div>
                <div className='ingredient'>{singleRecipe.strMeasure3} {singleRecipe.strIngredient3}</div>
                <div className='ingredient'>{singleRecipe.strMeasure4} {singleRecipe.strIngredient4}</div>
                <div className='ingredient'>{singleRecipe.strMeasure5} {singleRecipe.strIngredient5}</div>
                <div className='ingredient'>{singleRecipe.strMeasure6} {singleRecipe.strIngredient6}</div>
                <div className='ingredient'>{singleRecipe.strMeasure7} {singleRecipe.strIngredient7}</div>
                <div className='ingredient'>{singleRecipe.strMeasure8} {singleRecipe.strIngredient8}</div>
                <div className='ingredient'>{singleRecipe.strMeasure9} {singleRecipe.strIngredient9}</div>
                <div className='ingredient'>{singleRecipe.strMeasure10} {singleRecipe.strIngredient10}</div>
                <div className='ingredient'>{singleRecipe.strMeasure11} {singleRecipe.strIngredient11}</div>
                <div className='ingredient'>{singleRecipe.strMeasure12} {singleRecipe.strIngredient12}</div>
                <div className='ingredient'>{singleRecipe.strMeasure13} {singleRecipe.strIngredient13}</div>
                <div className='ingredient'>{singleRecipe.strMeasure14} {singleRecipe.strIngredient14}</div>
                <div className='ingredient'>{singleRecipe.strMeasure15} {singleRecipe.strIngredient15}</div>
                <div className='ingredient'>{singleRecipe.strMeasure16} {singleRecipe.strIngredient16}</div>
                <div className='ingredient'>{singleRecipe.strMeasure17} {singleRecipe.strIngredient17}</div>
                <div className='ingredient'>{singleRecipe.strMeasure18} {singleRecipe.strIngredient18}</div>
                <div className='ingredient'>{singleRecipe.strMeasure19} {singleRecipe.strIngredient19}</div>
                <div className='ingredient'>{singleRecipe.strMeasure20} {singleRecipe.strIngredient20}</div> */}
                {Object.entries(singleRecipe).filter(item => item[0].includes('Ingredient') & item[1] !== '').map((ingredient, index) => {
                  return (
                    <div key={ingredient} className='ingredient'>{`singleRecipe.strMeasure${index}`} {`singleRecipe.strIngredient${index}`}</div>
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