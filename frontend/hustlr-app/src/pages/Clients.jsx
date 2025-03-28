"use client";

import { useState } from "react";

const NewProject = () => {
  const [projectName, setProjectName] = useState("");
  const [milestones, setMilestones] = useState("");
  const [client, setClient] = useState("");
  const [rate, setRate] = useState("");
  const [hours, setHours] = useState("");
  const [estimatedEarnings, setEstimatedEarnings] = useState(0);

  const calculateEarnings = () => {
    const earnings = parseFloat(rate) * parseFloat(hours) || 0;
    setEstimatedEarnings(earnings.toFixed(2));
  };

  return (
    <div className="p-10 bg-white shadow-2xl rounded-3xl border border-gray-200 max-w-3xl mx-auto">
      <div className="card-body">
        <h2 className="text-4xl font-extrabold text-[#422AD5] mb-8 text-center">Create New Project</h2>
        
        <div className="space-y-6">
          <div>
            <label className="font-semibold text-gray-800 text-lg">Project Name</label>
            <input className="mt-2 px-4 py-3 rounded-xl border-gray-300 focus:ring-[#422AD5] w-full" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Enter project name" />
          </div>
          
          <div>
            <label className="font-semibold text-gray-800 text-lg">Milestones</label>
            <textarea className="mt-2 px-4 py-3 rounded-xl border-gray-300 focus:ring-[#422AD5] w-full" value={milestones} onChange={(e) => setMilestones(e.target.value)} placeholder="Define project milestones" rows={4} />
          </div>
          
          <div>
            <label className="font-semibold text-gray-800 text-lg">Client</label>
            <select className="mt-2 px-4 py-3 rounded-xl border-gray-300 focus:ring-[#422AD5] w-full" value={client} onChange={(e) => setClient(e.target.value)}>
              <option value="new">Create New Client</option>
              <option value="existing">Link to Existing Client</option>
            </select>
          </div>

          <div className="my-6 border-t border-gray-300"></div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="font-semibold text-gray-800 text-lg">Hourly Rate ($)</label>
              <input className="mt-2 px-4 py-3 rounded-xl border-gray-300 focus:ring-[#422AD5] w-full" type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="Enter hourly rate" onBlur={calculateEarnings} />
            </div>
            <div>
              <label className="font-semibold text-gray-800 text-lg">Estimated Hours</label>
              <input className="mt-2 px-4 py-3 rounded-xl border-gray-300 focus:ring-[#422AD5] w-full" type="number" value={hours} onChange={(e) => setHours(e.target.value)} placeholder="Enter estimated hours" onBlur={calculateEarnings} />
            </div>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-xl flex justify-between items-center text-lg font-semibold">
            <p className="text-gray-800">Estimated Earnings:</p>
            <span className="text-[#422AD5] text-2xl">${estimatedEarnings}</span>
          </div>
          
          <button className="w-full bg-[#422AD5] text-white text-lg font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-[#321AB0] transition-all">Create Project</button>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
