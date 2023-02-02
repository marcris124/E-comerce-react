import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPurchaseThunk } from '../store/slices/cartAdd.slice';
import { filterproductsCategoryThunk, filterProductsLineThunk, getProductsThunk } from '../store/slices/products.slice';

const Home = () => {

  const dispatch = useDispatch();
  const productsList = useSelector(state => state.products)
  const [categories, setcategories] = useState([])
  const [productSearch, setproductSearch] = useState("")


  const navigate = useNavigate()


  useEffect(() => {
    dispatch(getProductsThunk())

    axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
      .then(res => setcategories(res.data))

  }, [])


  const [rate, setrate] =useState(1)

  const addToFavorites = (products) => {
    const cartShopAdd = {
      quantity: rate,
      productId:products.id
    }
    
    dispatch(addPurchaseThunk(cartShopAdd))
  }
console.log(productsList);

  return (

    <div>

      <Row>
        <Col lg={2}>

          <div className="wrapper" tabIndex="0">

            <h3>Categories <i className="fa-solid fa-arrow-down"></i></h3>
            {
              categories.map(category => (
                    
                <button className="menu-item" key={category.id} onClick={() => dispatch(filterproductsCategoryThunk(category.id))}>{category.name} </button>

              ))

            }
          </div>
        </Col>


        <Col lg={10}>

          <h1>Home  <i className="fa-solid fa-house"></i></h1>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={productSearch}
              onChange={e => setproductSearch(e.target.value)}
            />
            <Button
              onClick={() => dispatch(filterProductsLineThunk(productSearch))}
              variant="info"
              id="button-addon2"
              
              >

                <i className="fa-solid fa-magnifying-glass"></i>  
            </Button>
          </InputGroup>






          <Row xs={2} md={3} lg={3} className="g-3">

            {
              productsList.map(products => (


                <Col key={products.id}  >
                    <Card style={{width:"80%",height:"100%",display:"flex", justifyContent:"center" , alignItems:"center" }}>
                     
                        <Card.Img
                          onClick={() => navigate(`/prducts/${products.id}`)}
                          src={products.images?.[0].url}
                          style={{ margin:"1rem" , width:"200",height:"200px",objectFit: "contain" }}
                      />
                         <Card.Body style={{borderTop:"1px solid #d1d1d1" ,width:"100%",   display: "flex", flexDirection: "column", justifyContent: "flex-end" , alignItems:"flex-start"}}>
                          <Card.Title  style={{fontSize:"1.2rem"  }}>  {products.title} </Card.Title>
                            <Card.Text style={{fontFamily:"'Roboto', sans-serif"}}>
                              $ {products.price}
                             </Card.Text>
                        <Button variant="danger" onClick={() => addToFavorites(products)}><i className="fa-solid fa-cart-shopping"></i></Button>
                        </Card.Body>
                    </Card>
                </Col>

              ))

            }
          </Row>


        </Col>
      </Row>

    </div>

  );
};

export default Home;