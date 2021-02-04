import React, { useState } from 'react';
import { Card, Alert, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const DashBoard = () => {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const handleLogOut = async () => {
    try {
      await logout();
      history.push('/login');
    } catch {
      setError('Something Goes Wrong');
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>DashBoard</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <div className='text-center'>
            <strong className='text-center'>Email:</strong> {currentUser.email}
          </div>
          <Link to='/update-profile' className=' btn btn-primary w-100 mt-2'>
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Button variant='link' onClick={handleLogOut}>
          Log Out
        </Button>
      </div>
    </>
  );
};

export default DashBoard;
