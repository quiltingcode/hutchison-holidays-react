import { 
  Route, 
  Routes,
} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './pages/home/Homepage';
import Footer from './components/footer/Footer';
import CalendarPage from './pages/booking/CalendarPage';
import NavBar from './components/navbar/NavBar';

function App() {
  return (
    <>
    <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/bookings" element={<CalendarPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
