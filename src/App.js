import { 
  Route, 
  Routes,
} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './pages/home/Homepage';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
