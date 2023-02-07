import React, { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {
  const purchases = useSelector(state => state.purchases)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPurchasesThunk())

  }, [])

  console.log(purchases);

  return (
    <div>
      
      <Container className='my-1' fluid="xl">
        <h1>purchases</h1>
        <Row xs={2} md={3} lg={1} className="g-3">

          {
            purchases.map(purchase => (

              <Col lg={15}  key={purchase.id}>
                <Card key={purchase.id} style={{ width: '100%', display: "flex", flexDirection: "row", justifyContent: "center" }}>
                  <Card.Img variant="top" src={purchase.product?.images?.[0].url} style={{ width: "150px", height: "150px", objectFit: "contain" }} />
                  <Card.Body style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <Link to={`/prducts/${purchase.product?.id}`}  >    <Card.Title style={{ width: "30rem", textDecoration: "none" }}> {purchase.product?.title} </Card.Title></Link>
                    <Card.Text style={{ fontFamily: "'Roboto', sans-serif", textAlign: "center", textDecorationLine: "none" }}>
                      quantity <br /> {purchase.quantity}

                    </Card.Text>

                    <Card.Text style={{ fontFamily: "'Roboto', sans-serif" }}>
                       Price <br />   $ {purchase.quantity * purchase.product?.price}
                    </Card.Text>
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

export default Purchases;