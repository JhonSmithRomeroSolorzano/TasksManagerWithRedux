import { GET_USERS, LOADING, ERROR } from '../types/usersTypes';

export const getAllUsers = () => (dispatch) =>{
  dispatch({
    type: LOADING,
  })    
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(manageErrors) 
  .then(response => response.json())
  .then(data => {
    dispatch({
      type: GET_USERS,
      payload: data
    })
  })
  .catch(e=>{
    dispatch({
      type: ERROR,
      payload: e
    })
  })
  
  
  
}

function manageErrors(response) { 
  if (!response.ok) { 
    throw Error('Failed request. Status ' + response.status + ' Try latter.');
  }
  return response;
}