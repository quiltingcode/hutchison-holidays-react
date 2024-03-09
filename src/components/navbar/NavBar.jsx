import { Outlet, Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import styles from './navbar.module.scss';
import EdiLogo from '../../assets/images/bay1.jpg';
import axios from 'axios';
import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext';

const NavBar = () => {

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser()
  console.log('navbar user', currentUser)

  const navigateTo = useNavigate();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      localStorage.clear();
      setCurrentUser(null)
      navigateTo('/')
    } catch (err) {
      console.log(err);
    }
  };

  const loggedInIcons = (
    <>
      <NavLink 
        to="/bookings"
        className={`ms-auto ${styles.NavLink}`}
      >
        Bookings
      </NavLink>
      <NavLink 
        to="/profile"
        className={`ms-auto ${styles.NavLink}`}
      >
        My Profile
      </NavLink>
      
      
      <div className='d-block ms-auto me-0'>
      <Button
      as={Link}
      to="/"
      onClick={handleSignOut}
      variant="outline-secondary"
      size="md"
      className="ms-5"
    >
      Log out
    </Button>
      </div>
      
    </>
  
  )

  const loggedOutIcons = (
 
    <div className='d-block ms-auto me-0'>
        <Button
      as={Link}
      to="/"
      variant="outline-info"
      size="md"
      className="ms-5"
    >
      <i className="fa-solid fa-house"></i>
    </Button>
    </div>
  
  );

    return (
      <>
        <Navbar
          collapseOnSelect
          expand="md"
          className={`bg-body-tertiary ${styles.Navigation}`}
        >
          <Navbar.Brand as={Link} to="/" className={styles.Logo}>
            <img
              src={EdiLogo}
              alt="Hutchison logo"
              height="65"
              className="me-4 mb-1"
            />
            <span className={styles.Title}>Hutchison Escapes</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto text-right">
              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Outlet />
      </>
    );
}

export default NavBar
