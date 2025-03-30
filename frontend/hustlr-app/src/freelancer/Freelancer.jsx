import {  Route, Routes } from "react-router-dom";
import AccountSettings from "./AccountSettings.jsx";
import Analytics from "./Analytics.jsx";
import Freelancer_Dashboard_Layout from "./F_Dashboard_Layout.jsx";
import FreelancerDashboardOverview from "./F_Dashboard_Overview.jsx";
import FreelancerProjectManagement from "./F_ProjectManagement.jsx";
import FreelancerMessagingSystem from "./F_MessagingSystem.jsx";
import FreelancerPaymentsTransactions from "./F_Payment-transactions.jsx";
import FreelancerProposals from "./FreelancerProposals.jsx";
import FreelancerProgress from "../pages/FreelancerProgress.jsx";

 function Freelancer() {
  return (
    <Routes >
        <Route path="/" element={<Freelancer_Dashboard_Layout />}>
          <Route index element={<FreelancerDashboardOverview />} />
          <Route path="projects" element={<FreelancerProjectManagement />} />
          <Route path="messages" element={<FreelancerMessagingSystem />} />
          <Route path="earnings" element={<FreelancerPaymentsTransactions />} />
          <Route path="settings" element={<AccountSettings />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="proposals" element={<FreelancerProposals />} />
          <Route path="profile" element={<FreelancerProgress />} />
        </Route>
      </Routes>
  )
}
export default Freelancer;