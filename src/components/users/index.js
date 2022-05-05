import React, { useEffect, useState} from "react";
import { connect } from 'react-redux';
import  * as usersActions from '../../actions/usersActions';
import Fatal from "../layout/Fatal";
import Spinner from "../layout/Spinner";
import Table from './Table';

const Users = (props) => {
  useEffect(()=>{
    if(!props.users.length){
      props.getAllUsers();
    }
  }, [])

  const usersTable = () => {
    if(props.loading) { 
      return <Spinner/>
      
    }
    if(props.error) {
      return <Fatal message={props.error.message}/>
    }
    return <Table></Table>
  }
  return (
    <>
      <h1>Users</h1>
      {usersTable()}
    </>
    
  );
}

const mapStateToProps = ( reducers)  => {
  return reducers.usersReducer;
}
export default connect(mapStateToProps, usersActions)(Users);
