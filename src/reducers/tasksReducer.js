import { GET_TASKS, LOADING, ERROR, SAVE_TASK, CHANGE_USER_ID, CHANGE_TITLE, UPDATED} from '../types/tasksTypes';

const INITIAL_STATE = {
  tasks: {},
  loading: false,
  error: '',
  user_id: '',
  title: '',
  go_back: false
}

const reducer = (state = INITIAL_STATE, action ) => {
  switch (action.type){
    case GET_TASKS:
      return {...state, tasks: action.payload, loading: false, error: '', go_back: false};
    case LOADING:
      return {...state, loading: true}
    case ERROR:
      return {...state, error: action.payload, loading: false}
    case CHANGE_USER_ID:
      return {...state, user_id: action.payload, loading: false}
    case CHANGE_TITLE:
      return {...state, title: action.payload, loading: false}
    case SAVE_TASK:
      return {...state, tasks: {}, loading: false, error: '', go_back: true, user_id: '', title: ''}
    case UPDATED:
      return {...state, tasks: action.payload, loading: false}
    default: return state;
  }

} 

export default reducer;