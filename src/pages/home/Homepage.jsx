import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import styles from './signin.module.scss';

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";



const SignInForm = () => {

    
    const navigateTo = useNavigate();

    
    const [signInData, setSignInData] = useState({
      email: '',
      password: '',
    });

    const {email, password} = signInData;
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
      setSignInData({
        ...signInData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const { data } = await axios.post('api/auth/login', signInData);
       
        
      } catch (err) {
        setErrors(err.response?.data)
        console.log(err.response?.data)
      }
    };

    return (
      <Row className={`${styles.Row}`}>
        <Col className="my-5">
          <Container className={`${styles.Content} p-4 `}>
            <h3 className={styles.Header}>Sign In</h3>
            <Form onSubmit={handleSubmit} className="mx-3">
              <Form.Group controlId="email">
                <Form.Control
                  className={`${styles.Input}`}
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors?.email?.map((message, idx) => (
                <Alert variant="warning" key={idx} className="mt-3">
                  {message}
                </Alert>
              ))}

              <Form.Group controlId="Enter your password">
                {/* <Form.Label className="text-center mt-3">Password</Form.Label> */}
                <Form.Control
                  className={`${styles.Input}`}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors?.password?.map((message, idx) => (
                <Alert variant="warning" key={idx} className="mt-3">
                  {message}
                </Alert>
              ))}

              <div className="text-center">
                <Button
                  type="submit"
                  className={`mt-3 btn text-center ${styles.LoginButton}`}
                  size="lg"
                  variant="info"
                  id="LoginButton"
                >
                  Sign in
                </Button>
                {errors?.non_field_errors?.map((message, idx) => (
                  <Alert variant="warning" key={idx} className="mt-3">
                    {message}
                  </Alert>
                ))}
                {errors?.message && (
                  <Alert variant="warning" className="mt-3">{errors?.message}</Alert>
                )}
              </div>
            </Form>
          </Container>

          <Container className={`mt-3 ${styles.Content}`}>
            <Link className={`${styles.Link}`} to="/signup">
              Don't have an account? <span>Sign up now!</span>
            </Link>
            <br></br>
            <div className="text-right">
              <Link className={`${styles.Link}`} to="/signin/forgotpassword">
              Forgotten your password? <span>Reset it here!</span>
            </Link>
            </div>
          </Container>
        </Col>
      </Row>
    );
}

export default SignInForm