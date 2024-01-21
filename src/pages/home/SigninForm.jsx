import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styles from './signin.module.scss';
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";


const Signin = () => {

    const navigateTo = useNavigate();

    const [signInData, setSignInData] = useState({
      username: '',
      password: '',
    });

    const {username, password} = signInData;
    const [errors, setErrors] = useState({});


    const handleChange = (e) => {
      setSignInData({
        ...signInData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSignin = async (event) => {
      event.preventDefault();
      try {
        await axios.post('dj-rest-auth/login/', signInData)
        const { data } = await axios.post('/api/token/', signInData)
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        // setIsAuthenticated(true);
        navigateTo('/labels')
      } catch(err){
          setErrors(err.response?.data)
      }
    };

    return (
      <>
        <Form onSubmit={handleSignin} className={`${styles.SigninForm}`}>
          <Form.Group controlId="username">
            <Form.Control
              className={`${styles.Input}`}
              type="text"
              name="username"
              placeholder="username"
              value={username}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.username?.map((message, idx) => (
            <Alert variant="warning" className="mt-3" key={idx}>
              {message}
            </Alert>
          ))}

          <Form.Group controlId="password" className="mt-2">
            <Form.Control
              className={`${styles.Input}`}
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.password?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <div className="text-center">
            <Button
              type="submit"
              className={`mt-3 btn text-center ${styles.LoginButton}`}
              size="md"
              variant="info"
              id="LoginButton"
            >
              Sign in
            </Button>
            {errors?.non_field_errors?.map((message, idx) => (
            <Alert variant="warning" key={idx} className="mt-2">
              {message}
            </Alert>
          ))}
          </div>
        </Form>
      </>
    );
}
export default Signin