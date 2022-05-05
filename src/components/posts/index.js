import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import  * as usersActions from '../../actions/usersActions';
import  * as postsActions from '../../actions/postsActions';
import Spinner from "../layout/Spinner";
import Fatal from "../layout/Fatal";
import Comments from "./Comments";


const Index = (props) => {
  const { id } = useParams();
  
  useEffect(()=>{
    loadData();
  },[])  

  function loadData (){
    if(!props.usersReducer.users.length){
      props.getAllUsers();
    }
    props.getByUser(id);
  }

  function setUser () {
    if(!props.usersReducer.users.length || props.usersReducer.loading){
      return <Spinner></Spinner>
    }
    if(props.usersReducer.error){
      return <Fatal message='Users request error'></Fatal>
    }

    const userName = props.usersReducer.users[id].name
    return (
      <h1>{userName}'s posts</h1>
    )
  }

  function setPosts () {
    if(!props.usersReducer.users.length) return;
    if(props.usersReducer.error) return;
    if(props.postsReducer.loading) return <Spinner/>
    if(props.postsReducer.error) return <Fatal message={'Post request error'}/>
    if(!props.postsReducer.posts.length) return;
    
    let filteredPosts = props.postsReducer.posts.filter(p=> p.userId === parseInt(id))
    if(filteredPosts.length === 0) return;

    return showContent(filteredPosts)
  }

  function showContent (filteredPosts) {
    return filteredPosts.map((post) =>{
      return (
        <div key={post.id} className='post_title' onClick={()=> showComments(post.id)}>
          <h2>{post.title}</h2>
          <h3>{post.body}</h3>
          {post.open ? <Comments comments={post.comments}></Comments>: ''}
          
        </div>
      )
    })
  }

  function showComments (postId) {
    props.getComments(postId);
  }
  return (
    <div>
      {setUser()}
      {setPosts()}
    </div>
  );
}

const mapStateToProps = ({usersReducer, postsReducer}) => {
  return {usersReducer, postsReducer};
}

const mapDispatchToProps = {...usersActions, ...postsActions};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
