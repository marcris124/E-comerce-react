import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { filterproductsCategoryThunk } from '../store/slices/products.slice';

const ProductsDetails = () => {

  const { id } = useParams();
  const [products,setproducts] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productsSugggested = useSelector(state => state.products)

  useEffect(() => {
    axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
        .then(res =>{
            setproducts(res.data)
            console.log(res.data.category.id);
            dispatch(filterproductsCategoryThunk(res.data.category.id))
        } )
  },[ id ])
  


  return (
    <div>
      <h1>Products Details</h1>

    <Row className='me-5'>

      {/* Descripcion */ }
        <Col lg={5}>

        <Carousel fade className='m-5' style={{}}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={products.images?.[0].url}
          alt="First slide"
          style={{objectFit:"contain",height:400}}
        />
       
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-fluid "
          src={products.images?.[1].url}
          alt="Second slide"
          style={{objectFit:"contain",height:400}}
        />

       
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={products.images?.[2].url}
          alt="Third slide"
          style={{objectFit:"contain",height:400}}
        />

  
      </Carousel.Item>
      
    </Carousel>




        </Col>
          
        <Col lg={7} style={{display:"flex", alignItems:"flex-star", flexDirection:"column", justifyContent:"center" }}>
        <h2> {products.title} </h2>
       <p> {products.description} </p>
        
        <h2> {products.price} </h2>
        
        <Button variant="danger" style={{display:"flex",alignItems:"center", justifyContent:"center"}} ><h3>Add to cart <i className="fa-solid fa-cart-shopping"></i> </h3></Button>

        </Col>


    </Row>

  <Row xs={2} md={3} lg={4} className="g-3">


    
{
          productsSugggested.map(products => (
<Col lg={3}  >
    <Card style={{ width: '18rem' }} onClick={() => navigate(`/prducts/${products.id}`)}>
      <Card.Img variant="top" src={ products.images?.[0].url} style={{height:300,objectFit:"contain"}}  />
      <Card.Body>
        <Card.Title>{products.title}</Card.Title>
        <Card.Text>
           ${products.price} 
        </Card.Text>
        <Button variant="danger"><i className="fa-solid fa-cart-shopping"></i></Button>
      </Card.Body>
    </Card>

      </Col>
          ))
        }
    
</Row>
    
    </div>
  );
};

export default ProductsDetails;