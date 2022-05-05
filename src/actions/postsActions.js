import { GET_POST, UPDATE_POSTS, LOADING, ERROR, UPDATE_COMMENTS,LOADING_COMMENTS, ERROR_COMMENTS } from '../types/postTypes';

export const getAllPost = () => (dispatch) =>{
  dispatch({
    type: LOADING,
  })    
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then(manageErrors) 
  .then(response => response.json())
  .then(data => {
    dispatch({
      type: GET_POST,
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

export const getByUser = (key) => (dispatch, getState) =>{
  const { posts } = getState().postsReducer;
  dispatch({
    type: LOADING,
  })    
  if ((posts.length > 0 && posts.filter(p=> p.userId === parseInt(key)).length === 0) || posts.length === 0){
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${key}`)
    .then(manageErrors) 
    .then(response => response.json())
    .then(data => {
      const newPosts = data.map( post => {
        return {
          ...post,
          comments: [],
          open: false
        }
      })
      
      const updatedPosts = [...posts, ...newPosts]

      dispatch({
        type: UPDATE_POSTS,
        payload: updatedPosts
      })
    })
    .catch(e=>{
      dispatch({
        type: ERROR,
        payload: e
      })
    })
  }
}

export const getComments = (postId) => (dispatch, getState) => { 
  const { posts } = getState().postsReducer;
  dispatch({
    type: LOADING_COMMENTS,
  })    
  var selectedPost = posts.filter(p => p.id === parseInt(postId));
  
  dispatch({
    type: UPDATE_COMMENTS,
    payload: posts
  })
  if(selectedPost.length > 0 && selectedPost[0].comments.length === 0){
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then(manageErrors) 
    .then(response => response.json())
    .then(data => {
      selectedPost = {
          ...selectedPost[0],
          comments: data,
          open: true
      }
      var foundIndex = posts.findIndex(p => p.id === selectedPost.id);
      posts[foundIndex] = selectedPost;

      dispatch({
        type: UPDATE_COMMENTS,
        payload: posts
      })
    })
    .catch(e=>{
      selectedPost = {
        ...selectedPost[0],
        comments: [],
        open: true
      }
      var foundIndex = posts.findIndex(p => p.id === selectedPost.id);
      posts[foundIndex] = selectedPost;

      dispatch({
        type: ERROR_COMMENTS,
        payload: [e, posts]
      })
    })
  }
  if(selectedPost.length > 0 && selectedPost[0].comments.length > 0){
    posts.forEach(p => {
      if(p.id === parseInt(postId)){p.open = !p.open}
    });
  
    dispatch({
      type: UPDATE_COMMENTS,
      payload: posts
    })
  }
    
}



function manageErrors(response) { 
  if (!response.ok) { 
    throw Error('Failed request. Status ' + response.status + ' Try latter.');
  }
  return response;
}
