
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
import Dashboard from './dashboards/Dashboard'
import Client from './client/Client'
import FindWorkPage from './pages/FindWorkPage'
import FindTalentPage from './pages/FindTalentPage'
import WhyUsPage from './pages/WhyUsPage'
import Freelancer from './freelancer/Freelancer'

function App() {
  return (
    <>
    <AuthProvider>
      <Navbar />
      <div className="min-h-screen bg-base-200">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/client_dashboard/*' element={<Client/>} />
          <Route path='/freelancer_dashboard/*' element={<Freelancer/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/whyus' element={<WhyUsPage/>} />
          <Route path='/login_page' element={<Login/>} />
          <Route path='/findwork' element={<FindWorkPage />} />
          <Route path='/findtalent' element={<FindTalentPage />} />
          <Route path='/freelancer_level' element={<FreelancerProfileBuilder />} />
          <Route path='/freelancer_profile' element={<FreelancerProfile />} />
          <Route path='/client_level' element={<ClientProfileBuilder />} />
        </Routes>
      </div>
      <Footer />
    </AuthProvider>
    </>
  )
}

export default App