import './App.css';
import Navbar from './components/Navbar/Navbar';
import Register from './components/RegisterComponent/Register';
import Login from './components/LoginComponent/login';
import Account from './components/AccountPage/Account';
import Dashboard from './components/Dashboard/dashboard';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/landingPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        
        
        <Navbar></Navbar>
        <Routes>   
            <Route path='/' element={<LandingPage></LandingPage>}></Route>
            <Route path="account" element={<Account></Account>}></Route>
            <Route path="dashboard" element={<Dashboard></Dashboard>}></Route>
        </Routes>
        </AuthProvider>
        </Router>
     
  );
}

export default App;
