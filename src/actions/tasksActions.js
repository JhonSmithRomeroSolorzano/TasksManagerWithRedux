import { GET_TASKS, LOADING, ERROR, SAVE_TASK, CHANGE_USER_ID, CHANGE_TITLE, UPDATED } from '../types/tasksTypes';

export const getTasks = () => (dispatch) =>{
  console.log(1)
  dispatch({
    type: LOADING,
  })    
  fetch('https://jsonplaceholder.typicode.com/todos')
  .then(manageErrors) 
  .then(response => response.json())
  .then(data => {

    const tasks = {}
    data.map(taskItem => (
      tasks[taskItem.userId] = {
        ...tasks[taskItem.userId],
        [taskItem.id]:{
          ...taskItem
        }
      }
    ))
    dispatch({
      type: GET_TASKS,
      payload: tasks
    })
  })
  .catch(e=>{
    dispatch({
      type: ERROR,
      payload: e
    })
  })
  
  
  
}

export const changeUserId = (user_id) => (dispatch) =>{
  dispatch({
    type: CHANGE_USER_ID,
    payload: user_id
  })
}

export const changeTitle = (title) => (dispatch) =>{
  dispatch({
    type: CHANGE_TITLE,
    payload: title
  })
}

export const addTask = (newTask) => (dispatch) =>{
  dispatch({
    type: LOADING
  })
  fetch("https://jsonplaceholder.typicode.com/todos",
    { 
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
    }
  )
  .then(response => {
    if(response.ok)
      return response.json()
    else{
      dispatch({
        type: ERROR,
        payload: `Error ${response.status}`
      })  
      return false;
    }
  })
  .then(data => {
    if(data){
      dispatch({
        type: SAVE_TASK,
      })
    }
  })
  .catch(e=>{
    dispatch({
      type: ERROR,
      payload: e
    })
  })
}

export const editTask = (editedTask) => (dispatch) =>{
  dispatch({
    type: LOADING
  })
  fetch(`https://jsonplaceholder.typicode.com/todos/${editedTask.id}`,
    { 
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedTask)
    }
  )
  .then(response => {
    if(response.ok)
      return response.json()
    else{
      dispatch({
        type: ERROR,
        payload: `Error ${response.status}`
      })  
      return false;
    }
  })
  .then(data => {
    if(data){
      dispatch({
        type: SAVE_TASK,
      })
    }
  })
  .catch(e=>{
    dispatch({
      type: ERROR,
      payload: e
    })
  })
}

export const changeCheck = (userId, taskId) => (dispatch, getState) =>{
  const { tasks } = getState().tasksReducer
  const selected = tasks[userId][taskId];

  const updated = {
    ...tasks
  }
  updated[userId] = {
    ...tasks[userId]
  }
  updated[userId][taskId] ={
    ...tasks[userId][taskId],
    completed: !selected.completed
  }

  dispatch({
    type: UPDATED,
    payload: updated
  })
}


export const deleteTask = (taskId) => (dispatch) =>{
  dispatch({
    type: LOADING
  })
  fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`,
    { 
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json'
        },
    }
  )
  .then(response => {
    if(response.ok){
      dispatch({
        type: GET_TASKS,
        payload: {}
      })  
    }
    else{
      dispatch({
        type: ERROR,
        payload: `Error ${response.status}`
      })  

    }
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

