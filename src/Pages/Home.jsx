import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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


  return (

    <div>

      <Row>
        <Col lg={2}>

          <div className="wrapper" tabIndex="0">

            <h3>Categoryes</h3>
            {
              categories.map(category => (

                <button className="menu-item" key={category.id} onClick={() => dispatch(filterproductsCategoryThunk(category.id))}>  <h4> {category.name} </h4>  </button>

              ))

            }
          </div>
        </Col>


        <Col lg={10}>

          <h1>Home</h1>

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
              variant="outline-secondary"
              id="button-addon2">

              Button
            </Button>
          </InputGroup>






          <Row xs={2} md={3} lg={4} className="g-3">

            {
              productsList.map(products => (


                <Col key={products.id} onClick={() => navigate(`/prducts/${products.id}`)} >
                    <Card style={{height:"100%"}}>
                      <Card.Body style={{display: "flex", flexDirection: "column", justifyContent: "flex-end" , alignItems:"flex-start"}}>
                        <Card.Img
                          variant="top"
                          src={products.images?.[0].url}
                          style={{ height:200,objectFit: "contain" }}
                      />
                        
                          <Card.Title>{products.title}</Card.Title>
                            <Card.Text>
                              $ {products.price}
                             </Card.Text>
                        <Button variant="danger"><i className="fa-solid fa-cart-shopping"></i></Button>
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