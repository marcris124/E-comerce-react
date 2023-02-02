import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartAddSlice = createSlice({
    name: 'cartAdd',
    initialState: [],
    reducers: {
      setAddCart: (state, action) => {
        const cartAdd = action.payload
        return cartAdd
      }
    }
})

export const cartAddThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/cart", getConfig())
        .then(res=> dispatch(setAddCart(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addPurchaseThunk = (cartShopAdd) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.post("https://e-commerce-api-v2.academlo.tech/api/v1/cart" , cartShopAdd , getConfig())
      .then(res => dispatch(cartAddThunk()))
      .catch(() => alert("hubo un error"))
      .finally(() => dispatch(setIsLoading(false)));
}


export const purchaseCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://e-commerce-api-v2.academlo.tech/api/v1/purchases ", {} , getConfig())
        .then(res => dispatch(cartAddThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setAddCart } = cartAddSlice.actions;

export default cartAddSlice.reducer;
