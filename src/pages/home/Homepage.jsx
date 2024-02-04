import React from 'react'
import styles from './home.module.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useRedirect } from '../../hooks/UseRedirect';
import Signin from './SigninForm';

const HomePage = () => {
    useRedirect ('loggedIn')

    return (
      <Container fluid className={styles.HomepageContainer}>
        <Row className="text-center">
          <Col className="my-auto p-0 p-md-2">
            <Container className={`${styles.Content} p-4 `}>
              <h2 className={styles.Header}>Welcome to </h2>
              <h1 className={styles.Header}>Hutchison Escapes</h1>
              <h5 className="mt-3">Sign in to make a booking:</h5>
              <Signin />
            </Container>
          </Col>
        </Row>
      </Container>
    );
}
export default HomePage