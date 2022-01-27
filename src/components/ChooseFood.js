import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

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
        console.log(data.meals[0])
        console.log(data.meals[0].strMeal)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }

    getSingleRecipe()
    

  }, [idMeal])
  
  return (
    <Container className="mt-4">
      {singleRecipe ?
        <div className='wine-show'>
          <h2>{singleRecipe.strMeal}</h2>
          <hr />
          <Row>
            <Col md="6" className='img-container'>
              <img className='img-wine' src={singleRecipe.strMealThumb} alt={singleRecipe.strMeal}/>
            </Col>
            <Col md="6">
              <h4><span>🍽</span> Tasting Notes</h4>
              <p>{singleRecipe.strIngredient1}</p>
              <hr />
              <h4><span>🌍</span> Origin</h4>
              <hr />
              <p className="lead">{singleRecipe.strArea}</p>
              <hr />
              <h4><span>🖐</span> Added By</h4>
              <hr />
              <hr />
            
            </Col>
          </Row>
          <div className='back-to-wines'>
            <Link to="/wines" className="btn btn-light">Back to all wines</Link>
          </div>
        </div>
        :
        <h2 className="text-center">
          {hasError.error ? 'Oh something went wrong, the sadness 😞' : 'Loading...'}
        </h2>
      }
    </Container>
  )
}
  
export default ChooseFood