import { GET_POST, UPDATE_POSTS, LOADING, ERROR, UPDATE_COMMENTS, LOADING_COMMENTS, ERROR_COMMENTS } from '../types/postTypes';

const INITIAL_STATE = {
  posts: [],
  loading: false,
  error: '',
  loading_comments: false,
  error_comments: ''
}

const reducer = (state = INITIAL_STATE, action ) => {
  switch (action.type){
    case GET_POST:
      return {...state, posts: action.payload, loading: false, error: ''};
    case UPDATE_POSTS:
      return {...state, posts: action.payload, loading: false, error: ''};
    case LOADING: 
      return {...state, loading: true}
    case ERROR:
      return {...state, error: action.payload, loading: false}
    case UPDATE_COMMENTS:
        return {...state, posts: action.payload, loading_comments: false, error_comments: ''};
    case LOADING_COMMENTS:
      return {...state, loading_comments: true}
    case ERROR_COMMENTS:
      return {...state, post:action.payload[1], error_comments: action.payload[0], loading: false}
    default: return state;
  }
} 

export default reducer;