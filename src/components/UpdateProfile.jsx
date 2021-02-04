import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../Contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('password do not match');
    }

    const promises = [];

    setError('');
    setLoading(true);

    if (currentUser.email !== emailRef.current.value) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (currentUser.password !== passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push('/');
      })
      .catch(() => {
        setError('can not update profile');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Update profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                ref={emailRef}
                defaultValue={currentUser.enail}
                required
              />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Leave Blank if you dont want to update'
                ref={passwordRef}
              />
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label>Password Confirm</Form.Label>
              <Form.Control
                type='password'
                placeholder='Leave Blank if you dont want to update'
                ref={passwordConfirmRef}
              />
            </Form.Group>
            <Button disabled={loading} className='w-100' type='submit'>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='text-center w-100 mt-2'>
        <Link to='/'>Cancel</Link>
      </div>
    </>
  );
};

export default UpdateProfile;
