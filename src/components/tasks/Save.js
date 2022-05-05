import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Fatal from "../layout/Fatal";
import * as tasksActions from "../../actions/tasksActions";
import { Navigate  } from "react-router-dom";
import { useParams } from "react-router";



//Change to function component

function Save (props) {

  var {userId, taskId} = useParams();
  var {changeUserId, changeTitle, tasks} = props;

  useEffect(()=>{
    if(userId && taskId){
      let task = tasks[userId][taskId]
      changeUserId(task.userId)
      changeTitle(task.title)
    }else{
      changeUserId('')
      changeTitle('')
    }

  },[userId, taskId, changeUserId, changeTitle])

  var changeUserIdFunction = (event) =>{
    changeUserId(event.target.value)
  }

  var changeTitleFunction = (event) =>{
    changeTitle(event.target.value)
  }

  var saveTask = () => {
    const {user_id, title, addTask, editTask} = props;
    const newTask = {
      userId: user_id,
      title,
      completed: false
    }

    if(userId && taskId){
      let savedTask = props.tasks[userId][taskId]
      let editedTask = {
        ...newTask,
        completed: savedTask.completed,
        id: savedTask.id
      }
      editTask(editedTask)
    }else{
      addTask(newTask);
    }
  }

  var disabledButton = () => {
    const {user_id, title, loading} = props;
    if(loading) return true;
    if(!user_id || !title) return true;
    return false
  }

  var showAction = () => {
    const {error, loading} = props;
    if(loading) return <Spinner></Spinner>
    if(error) return<Fatal message={error}></Fatal>
  }

  
  return(
    <div>
      {props.go_back ? <Navigate to={'/tasks'}></Navigate> : ''}
      <h1>
        Save Task
      </h1>
      Usuario id
      <input 
        type='number' 
        value={props.user_id}
        onChange={changeUserIdFunction}
        ></input>
      <br/>
      <br/>
      Titulo:
      <input 
        value={props.title}
        onChange={changeTitleFunction}
        />
      <br/>
      <br/>
      <button 
        onClick={saveTask}
        disabled={disabledButton()}
        > Guardar </button>
      {showAction()}
    </div>
  )
  
}

const mapStateToProps = ({tasksReducer}) => tasksReducer;

export default connect(mapStateToProps, tasksActions)(Save);