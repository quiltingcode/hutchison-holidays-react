import React from 'react'
import styles from './calendarpage.module.scss';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const BookingForm = () => {
  return (
    <Container className={`${styles.Content}`}>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>End Date</Form.Label>
            <Form.Control type="date" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Total number of Guests</Form.Label>
            <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Notes</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Button>
        Save Booking
      </Button>
      </Form>
    </Container>
  );
}

export default BookingForm
