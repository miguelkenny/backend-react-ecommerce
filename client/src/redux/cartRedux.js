import { createSlice } from '@reduxjs/toolkit'
let index;
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += action.payload.quantity;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        descOneProduct: (state, action) => {
            state.quantity -= 1;
            let cant = (action.payload.cart.products.find(product => product._id === action.payload.id).quantity - 1);
            index = state.products.findIndex(product => product._id === action.payload.id);
            state.products[index].quantity = cant
            state.total = action.payload.total - action.payload.price;
        },
        incOneProduct: (state, action) => {
            state.quantity += 1
            let cant = (action.payload.cart.products.find(product => product._id === action.payload.id).quantity + 1);
            index = state.products.findIndex(product => product._id === action.payload.id);
            state.products[index].quantity = cant
            state.total = action.payload.total + action.payload.price;
        },
        deleteCart: (state, action) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        }
    }
})

export const { addProduct, descOneProduct, incOneProduct, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;