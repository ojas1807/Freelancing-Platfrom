import { useState } from "react";

const projectsData = [
  { id: 1, name: "Website Redesign", status: "Ongoing", deadline: "April 15, 2025", payment: "Paid" },
  { id: 2, name: "Mobile App UI", status: "Completed", deadline: "March 20, 2025", payment: "Paid" },
  { id: 3, name: "Marketing Campaign", status: "Pending Payment", deadline: "April 5, 2025", payment: "Pending" },
  { id: 4, name: "E-commerce Platform", status: "Ongoing", deadline: "May 10, 2025", payment: "Paid" },
  { id: 5, name: "Branding & Logo Design", status: "Completed", deadline: "March 1, 2025", payment: "Paid" },
  { id: 6, name: "Social Media Strategy", status: "Pending Payment", deadline: "April 25, 2025", payment: "Pending" },
  { id: 7, name: "SEO Optimization", status: "Ongoing", deadline: "June 5, 2025", payment: "Paid" },
  { id: 8, name: "Custom CRM Development", status: "Completed", deadline: "February 15, 2025", payment: "Paid" },
  { id: 9, name: "AI Chatbot Integration", status: "Pending Payment", deadline: "May 20, 2025", payment: "Pending" },
];

const Projects = () => {
  const [activeTab, setActiveTab] = useState("Ongoing");

  const filteredProjects = projectsData.filter((project) => project.status === activeTab);

  return (
    <div className="card bg-white shadow-xl rounded-2xl border border-gray-300 p-8">
      <div className="card-body">
        <h2 className="text-3xl font-bold text-[#422AD5] mb-6">Manage Your Projects</h2>
        
        <div className="tabs mb-6">
          <a className={`tab tab-bordered text-lg ${activeTab === "Ongoing" ? "tab-active text-[#422AD5]" : ""}`} onClick={() => setActiveTab("Ongoing")}>
            Ongoing
          </a>
          <a className={`tab tab-bordered text-lg ${activeTab === "Completed" ? "tab-active text-[#422AD5]" : ""}`} onClick={() => setActiveTab("Completed")}>
            Completed
          </a>
          <a className={`tab tab-bordered text-lg ${activeTab === "Pending Payment" ? "tab-active text-[#422AD5]" : ""}`} onClick={() => setActiveTab("Pending Payment")}>
            Pending Payment
          </a>
        </div>

        <div className="space-y-5">
          {filteredProjects.map((project) => (
            <div key={project.id} className="card border rounded-xl shadow-md transition-all hover:shadow-lg bg-gray-50 p-6">
              <div className="card-body">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
                  <span className={`badge ${project.payment === "Paid" ? "badge-success" : "badge-error"}`}>
                    {project.payment}
                  </span>
                </div>
                <p className="text-gray-600">Deadline: <span className="font-medium text-gray-900">{project.deadline}</span></p>
                <div className="mt-4 flex gap-3">
                  <button className="btn btn-primary bg-[#422AD5] text-white">Chat</button>
                  <button className="btn btn-outline border-[#422AD5] text-[#422AD5] hover:bg-[#422AD5] hover:text-white">Share Files</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
