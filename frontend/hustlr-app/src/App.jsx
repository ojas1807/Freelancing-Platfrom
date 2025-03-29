
import Navbar from './Navbar'
import Home from './Home'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
// import Freelancer_level from './pages/profile/Freelancer_level'
import FreelancerProfileBuilder from './pages/profile/FreelancerProfileBuilder'
import ClientProfileBuilder from './pages/profile/ClientProfileBuilder'
import FreelancerProfile from './pages/profile/FreelancerProfile'
import Footer from './pages/Footer'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/LoginModal'
import ClientDashboard from './pages/ClientDashboard'
import FreelancerDashboard from './dashboards/FreelancerDashboard'
import ClientProgress from './pages/ClientProgress'
import Dashboard from './dashboards/Dashboard'

function App() {
  return (
    <>
    <AuthProvider>
      <Navbar />
      <div className="min-h-screen bg-base-200">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/client_dashboard' element={<ClientDashboard/>} />
          <Route path='/freelancer_dashboard' element={<FreelancerDashboard/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login_page' element={<Login/>} />
          <Route path='/findwork' element={<Home />} />
          <Route path='/freelancer_level' element={<FreelancerProfileBuilder />} />
          <Route path='/freelancer_profile' element={<FreelancerProfile />} />
          <Route path='/client_level' element={<ClientProfileBuilder />} />
          <Route path='/client_progress' element={<ClientProgress />} />
        </Routes>
      </div>
      <Footer />
    </AuthProvider>
    </>
  );
}

export default App;
