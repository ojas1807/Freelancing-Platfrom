import {  Route, Routes } from "react-router-dom";
import Dashboard_Layout  from "./Dashboard_Layout.jsx";
import ProjectManagement from "./ProjectManagement";
import MessagingSystem from "./MessagingSystem";
import PaymentsTransactions from "./Payment-transactions";
import AccountSettings from "./AccountSettings";
import DashboardOverview from "./Dashboard_Overview.jsx";
import Analytics from "./Analytics.jsx";

 function Client() {
  return (
    <Routes >
        <Route path="/" element={<Dashboard_Layout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="projects" element={<ProjectManagement />} />
          <Route path="messages" element={<MessagingSystem />} />
          <Route path="payments" element={<PaymentsTransactions />} />
          <Route path="settings" element={<AccountSettings />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
  )
}
export default Client;