import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './calendarpage.module.scss';
import LatestBookings from './LatestBookings';
import Button from 'react-bootstrap/Button';
import BookingForm from './BookingForm';

const CalendarPage = () => {

    const [bookings, setBookings] = useState({results: []})
    const [value, onChange] = useState(new Date());

    return (
      <Container className={styles.PageContainer} fluid>
        <Row>
          <Col className="py-2 p-0 p-lg-2" lg={9}>
            <div className={styles.Calendar}>
              <header className='text-center'>
                <h1>Current Bookings</h1>
              </header>
              <div className={styles.Calendar__container}>
                <main className={styles.Calendar__container__content}>
                  <Calendar onChange={onChange} showWeekNumbers value={value} />
                </main>
              </div>
            </div>
            <Button className="my-3">Make a Booking</Button>
            <BookingForm />
          </Col>
          <Col md={3} className="py-2 p-0 p-lg-2">
            <LatestBookings />
          </Col>
        </Row>
      </Container>
    );
}

export default CalendarPage
