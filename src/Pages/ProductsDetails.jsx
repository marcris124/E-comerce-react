import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { filterproductsCategoryThunk } from '../store/slices/products.slice';
import { addPurchaseThunk } from '../store/slices/cartAdd.slice';

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

  const [rate, setrate] =useState(1)

  const addToFavorites = () => {
    const cartShopAdd = {
      quantity: rate,
      productId:products.id
    }
    
    dispatch(addPurchaseThunk(cartShopAdd))
  }
  console.log(products);

 

  return (
    <div>
     


      
      <Container className='my-1' fluid="xl">
        <h1>Product Detail</h1>
    <Row className='me-5' style={{marginBottom:"7rem"}} >

      {/* Descripcion */ }
        <Col lg={5}>

        <Carousel fade className='m-5' style={{padding:"2rem"  }}>
      <Carousel.Item >
        <img
          className="d-block w-100 img-fluid"
          src={products.images?.[0].url}
          alt="First slide"
          style={{objectFit:"contain",width:"600px" ,height:"400px" }}
        />
       
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-fluid "
          src={products.images?.[1].url}
          alt="Second slide"
          style={{objectFit:"contain",width:"600px" ,height:"400px" }}
        />

       
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-fluid"
          src={products.images?.[2].url}
          alt="Third slide"
          style={{objectFit:"contain",width:"600px" ,height:"400px" }}
        />

  
      </Carousel.Item>
      
    </Carousel>




        </Col>
          
        <Col lg={7} style={{display:"flex", alignItems:"flex-star", flexDirection:"column", justifyContent:"center", gap:"1rem" }}>
        
       <h4 style={{color:'gray'}}> {products.brand} </h4> 
        <h2> {products.title} </h2>
       <p> {products.description} </p>



      <Col style={{display:"flex" , justifyContent:"space-between" , alignItems:"center"}}>
        <h2 style={{fontFamily:"'Roboto', sans-serif"}} > Price: <br /> {products.price} </h2>
       
     
            
            <Button 
                disabled={rate === 1}
                onClick={() => setrate(rate-1) }> -</Button>           
             <h4> {rate} </h4>
            <Button onClick={() => setrate(rate+1) }> +</Button>
     
      </Col>

        <Button onClick={addToFavorites} variant="danger" style={{display:"flex",alignItems:"center", justifyContent:"center"}} ><h3>Add to cart <i className="fa-solid fa-cart-shopping"></i> </h3></Button>

        </Col>


    </Row>



  <Row xs={2} md={3} lg={4} className="g-3" >


    
{
          productsSugggested.map(products => (
<Col lg={3} key={products.id}  >
    <Card style={{ width: '100%' }} onClick={() => navigate(`/prducts/${products.id}`)}>
      <Card.Img variant="top" src={ products.images?.[0].url} style={{height:300,objectFit:"contain"}}  />
      <Card.Body>
        <Card.Title>{products.title}</Card.Title>
        <Card.Text style={{fontFamily:"'Roboto', sans-serif"}}>
           ${products.price} 
        </Card.Text>
        <Button variant="danger"><i className="fa-solid fa-cart-shopping"></i></Button>
      </Card.Body>
    </Card>

      </Col>
          ))
        }
    
</Row>
    </Container>
    </div>
  );
};

export default ProductsDetails;