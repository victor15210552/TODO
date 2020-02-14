import axios from 'axios';
import { 
    GET_ITEMS, 
    ADD_ITEMS, 
    DELETE_ITEMS, 
    ITEMS_LOADING,
    UPDATE_ITEMS
} from '../actions/types';

const URL = 'http://localhost:4000/items'

export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios.get(`${URL}`)
    .then(res=> dispatch({
        type:GET_ITEMS,
        payload: res.data
    }))
    
};

export const addItem = item  => dispatch=> {
    axios.post(`${URL}/create`,item)
    .then(res=> dispatch({
        type: ADD_ITEMS,
        payload: res.data
    }))
};

export const deleteItem = id => dispatch => {
    axios.delete(`${URL}/delete/${id}`)
        .then(res => dispatch({
            type: DELETE_ITEMS,
            payload: id
        }))
};

export const updateItemDone = item => dispatch => {
    axios.put(`${URL}/update/${item._id}`)
        .then(res => dispatch({
            type: UPDATE_ITEMS,
            payload: res.data
        }))
};



export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};
