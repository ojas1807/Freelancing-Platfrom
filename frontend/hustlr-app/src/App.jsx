// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { useState } from 'react';


// import Home from './Home';
// import Signup from './pages/Signup';
// import FreelancerDashboard from './dashboards/FreelancerDashboard';
// import './App.css';
// import Navbar from './Navbar';

// function App() {
//   return (
//     <>
//       <Navbar/>
//       <div className="min-h-screen bg-base-200">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/findwork" element={<Home />} />
//           <Route path="/freelancerdashboard" element={<FreelancerDashboard />} />
//         </Routes>
//       </div>
//     </>
//   );
// }

// export default App;
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Signup from './pages/Signup';
import FreelancerDashboard from './dashboards/FreelancerDashboard';
import Clients from './pages/Clients';

import NewClients from './pages/NewClients';
import Projects from './pages/Projects';
import NewProjects from './pages/NewProjects';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import './App.css';
import Navbar from './Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-base-200">
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/findwork" element={<Home />} />
          <Route path="/freelancerdashboard" element={<FreelancerDashboard />} />

          {/* Freelancer Dashboard Sub-Routes */}
          <Route path="/freelancerdashboard/Clients" element={<Clients />} />
          <Route path="/freelancerdashboard/NewClients" element={<NewClients />} />
          <Route path="/freelancerdashboard/Projects" element={<Projects />} />
          <Route path="/freelancerdashboard/NewProjects" element={<NewProjects />} />
          <Route path="/freelancerdashboard/Analytics" element={<Analytics />} />
          <Route path="/freelancerdashboard/Settings" element={<Settings />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
