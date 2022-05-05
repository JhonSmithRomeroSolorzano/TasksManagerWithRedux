import React from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Fatal from "../layout/Fatal";

const Comments = (props) => { 
  if(props.error_comments) return <Fatal message={props.error_comments.message}></Fatal>
  if(props.loading_comments && !props.comments.length) return <Spinner></Spinner>

  function showComments (){
    return props.comments.map(comment =>{
      return <li key={comment.id}>
        <b><u>{comment.email}</u></b>
        <br/>
        {comment.body}
      </li>
    })

  }
  return(
    <ul>
      {showComments()}
    </ul>
  )
}

const mapStateToProps = ({ postsReducer}) => postsReducer;

export default connect(mapStateToProps)(Comments);