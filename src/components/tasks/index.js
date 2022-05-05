import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as tasksActions from "../../actions/tasksActions";
import Spinner from "../layout/Spinner";
import Fatal from "../layout/Fatal";

const Tasks = (props) => {
  var { tasks, getTasks } = props
  useEffect(()=>{
    if(!Object.keys(tasks).length){
      getTasks();
    }
  }, [tasks, getTasks])

  function showContent (){
    const {tasks, loading, error} = props;
    if(loading) return <Spinner></Spinner>
    if(error) return <Fatal message={error.message}></Fatal>

    return Object.keys(tasks).map((userId)=>{
      return (
        <div key={userId}>
          <h2>
            User {userId}
          </h2>
          <div className="task_container">
            {showTasks(userId)}
          </div>
        </div>
      )
    })
  }

  function showTasks(userId){
    const {tasks, changeCheck, deleteTask} = props;
    const tasksByUser = {
      ...tasks[userId]
    }
    return Object.keys(tasksByUser).map( taskId => {
      return (
        <div key={taskId}>
          <input 
            type='checkbox' 
            defaultChecked={tasksByUser[taskId].completed}
            onChange={()=>{changeCheck(userId, taskId)}}
          ></input>
          { tasksByUser[taskId].title }
          <button className="m_left">
            <Link to={`/tasks/save/${userId}/${taskId}`}>
              Edit
            </Link>
          </button>
          <button className="m_left" onClick={() => deleteTask(taskId)}>Delete</button>
        </div>
      )
    })
  }
  return (
    <div>
      <button> 
        <Link to='/tasks/save'>
          Agregar 
        </Link>
      </button>

      {showContent()}
    </div>
  );
}

const mapStateToProps = ({tasksReducer}) => tasksReducer;

export default connect(mapStateToProps, tasksActions)(Tasks);
