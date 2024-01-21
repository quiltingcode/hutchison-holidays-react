import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Outlet } from 'react-router-dom';
import styles from './footer.module.scss';

const Footer = () => {
    return (
      <>
      <Container fluid className={styles.Footer}>
        <Row>
          <Col lg={4} className={styles.FooterContacts}>
            <p>
              <i className="fa-solid fa-at"></i> kellyhutchison@hotmail.com
            </p>
          </Col>
          <Col lg={4} className={styles.FooterContacts}>
            <p>
              <i className="fa-solid fa-phone"></i> +34 674 659 228
            </p>
          </Col>
          <Col lg={4}>
            <a 
              href="https://es.linkedin.com/"
              target='_blank'
              rel="noopener"
              aria-label='Link to Linkedin company page'
            >
              <i className="fa-brands fa-linkedin me-2" />
               Follow us
            </a>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <span>&copy; </span>A Kreations Product 2024
          </Col>
        </Row>
      </Container>
      <Outlet />
      </>
    );
}

export default Footer
