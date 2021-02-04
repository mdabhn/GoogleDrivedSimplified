import React from 'react';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../Contexts/AuthContext';
import Signup from './Signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DashBoard from './DashBoard';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import ForgetPassword from './ForgetPassword';
import UpdateProfile from './UpdateProfile';
const App = () => {
  const containerStyle = 'd-flex align-items-center justify-content-center';
  return (
    <Container className={containerStyle} style={{ minHeight: '100vh' }}>
      <div className='w-100' style={{ maxWidth: '400px' }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path='/' component={DashBoard} />
              <PrivateRoute
                exact
                path='/update-profile'
                component={UpdateProfile}
              />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/forget-password' component={ForgetPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
};

export default App;
