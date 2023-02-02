import React, { useEffect } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { cartAddThunk } from '../store/slices/cartAdd.slice';

const PurchaseSidebar = ({show, handleClose}) => {

  const addCart = useSelector(state => state.cartAdd)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(cartAddThunk())
  },[])

  

console.log(addCart);



  return (
    <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart Shop</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{display:"flex", flexDirection:"column"}}>
         {
          addCart.map(cart => (
          <div className='cart-Add' key={cart.id}>
            
            

            <div className='quantity'>

              <img src={cart.product.images?.[0].url} alt="" />
              <div className='title-shop'>
              <p style={{fontFamily:"'Roboto', sans-serif"}}> {cart.product.title} </p> 

              <p> quantity <br />  <span>  {cart.quantity} </span>    </p>
                </div>
            </div>

          
            
            <div className='price-cart'>

           <h5> total:  ${cart.product.price  * cart.quantity}  </h5>  
            </div>
          </div>
          ))

         }
        </Offcanvas.Body>
      </Offcanvas>
  );
};

export default PurchaseSidebar;