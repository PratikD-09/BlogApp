import React, { useContext } from 'react';
import Navbar from './Components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

import Signin from './Pages/Signin/Signin.jsx';
import Home from './Pages/Home/Home.jsx';
import Setings from './Pages/setings/Setings.jsx'
import Single from './Pages/SingleBlog/Single.jsx'
import Addpages from './Pages/Addpages/Addpage.jsx'
import Login from './Pages/Login/Login.jsx';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Context } from './context/context.js';


function App() {
  const {user} = useContext(Context);
  return (
    <>
        <Router>
          <Navbar/>

            <Switch>

              <Route exact path='/'>
                <Home/>
              </Route>

              <Route exact path='/signin'>
                <Signin/>
              </Route>

              <Route exact path='/login'>
                {user ? <Home/>:  <Login/> }
              </Route>

              <Route exact path='/addpage'>
                {user ? <Addpages/>:<Login/>}
              </Route>

              <Route exact path='/single/:postId'>
                <Single/>
              </Route>

              <Route exact path='/setings'>
              {user ? <Setings/>:<Login/>}
              </Route>

            </Switch>
          </Router>
      
    </>
  );
}

export default App;
