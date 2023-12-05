import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Routes and Components
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';
import Signup from './routes/Signup';

// Routes
import Home from './routes/Home';
import UserDashboard from './routes/UserDashboard';
import Login from './routes/Login';
import NewReview from './routes/NewReview';
import Landlord from './routes/Landlord';
import AboutUs from './routes/AboutUs';

const App = () => {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<UserDashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/reviews/new' element={<NewReview />} />
        <Route path='/reviews/:reviewId' element={<NewReview />} />
        <Route path='/landlords/:landlordId' element={<Landlord />} />
        <Route path='/about' element={<AboutUs />}></Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;