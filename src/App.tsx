import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './App.css';
import Header from './components/header/Header';
import Auth from './pages/auth/Auth';
import Main from './pages/main/Main';
import LogOut from './pages/logout/LogOut';
import { authCheck } from './store/actionCreators/authActions';


function App() {

  const dispatch = useDispatch();

  React.useEffect( () => {
    dispatch(authCheck())
    // eslint-disable-next-line
  }, [] )


  return (
    <div className="App"> 
      <div className="Container">
        <Header />

        <Switch>
          <Route path="/logout" component={LogOut}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/" component={Main}/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
