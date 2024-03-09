import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import { Card, CardBody, ListGroup } from 'react-bootstrap';
import Row from "react-bootstrap/Row";
import { useCurrentUser } from '../../../contexts/CurrentUserContext';
import { useLocation } from 'react-router-dom';
import { axiosRes } from '../../../api/axiosDefaults';
import styles from './latest-bookings.module.scss';
import NoResults from '../../../assets/images/no-results.jpg';
import Asset from '../../../components/spinner/Asset';

const LatestBookings = () => {

    const [latestBookings, setLatestBookings] = useState({results: []})
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const currentUser = useCurrentUser();

    useEffect(() => {
        const fetchBookings = async () => {
          try {
            const { data } = await axiosRes.get(`/bookings/?ordering=-date_created`);
            console.log('bookings', data)
            setLatestBookings(data);
            setHasLoaded(true);
          } catch (err) {
            console.log(err);
          }
        };
    
        setHasLoaded(false);
        const timer = setTimeout(() => {
          fetchBookings();
        }, 1000)
        return () => {
          clearTimeout(timer)
        }
        
      }, [pathname, currentUser]);

  return (
    <Card className={`${styles.Content} mt-3`}>
        <Row>
          <h4 className="text-center">Latest Bookings</h4>
        </Row>
        <div className={styles.ScrollContainer}>
        {hasLoaded ? (
<>
{latestBookings?.results.length ? (
            
  <ListGroup variant="flush">
    {latestBookings.results.slice(0, 6).map((booking) => (
      <ListGroup.Item as="li" className={styles.ErrorLogItem} key={booking.id}>
        <p>
          <strong>Booked By: </strong>  - {booking.owner}

        </p>
        <p>
          <strong>Booking Details:</strong> {booking.booking_start_date} - {booking.booking_end_date}
          {booking.error_message}
        </p>
      </ListGroup.Item>
    ))}
  </ListGroup>
) : (
  <Asset
    src={NoResults}
    message="Oh good! No errors found today"
  />
)}
</>
) : (
<Asset spinner/>
)}
          
        </div>
      </Card>
  );
}

export default LatestBookings
