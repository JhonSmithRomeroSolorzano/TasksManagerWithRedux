import React, { useEffect, useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./menu";
import Users from "./users";
import Posts from './posts';
import Tasks from "./tasks";
import SaveTasks from "./tasks/Save";

const App = () => {

  return (
    <BrowserRouter>
      <Menu />
      <div className="margin-content">
        <Routes>
          <Route exact path="/" element={<Users/>}> </Route>
          <Route exact path="/posts/:id" element={<Posts/>}> </Route>
          <Route exact path="/tasks" element={<Tasks/>}> </Route>
          <Route exact path="/tasks/save" element={<SaveTasks/>}> </Route>
          <Route exact path="/tasks/save/:userId/:taskId" element={<SaveTasks/>}> </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
