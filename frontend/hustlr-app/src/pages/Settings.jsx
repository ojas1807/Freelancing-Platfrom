import { useState } from "react";

const Settings = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [notifications, setNotifications] = useState(true);
  
  return (
    <div className="card bg-white shadow-2xl rounded-3xl border border-gray-200 max-w-3xl mx-auto p-10">
      <div className="card-body">
        <h2 className="text-4xl font-extrabold text-[#422AD5] mb-8 text-center">Settings</h2>
        
        {/* Freelancer Profile Settings */}
        <div className="space-y-6 mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Freelancer Profile</h3>
          <div>
            <label className="label font-medium text-gray-700">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="input input-bordered w-full mt-2" />
          </div>
          
          <div>
            <label className="label font-medium text-gray-700">Bio</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself" className="textarea textarea-bordered w-full mt-2" rows={3}></textarea>
          </div>
          
          <div>
            <label className="label font-medium text-gray-700">Skills</label>
            <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g. React, Node.js, UI/UX" className="input input-bordered w-full mt-2" />
          </div>
          
          <div>
            <label className="label font-medium text-gray-700">Portfolio Link</label>
            <input type="text" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} placeholder="e.g. https://yourportfolio.com" className="input input-bordered w-full mt-2" />
          </div>
        </div>
        
        {/* Payment Settings */}
        <div className="space-y-6 mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Payment Settings</h3>
          <div>
            <label className="label font-medium text-gray-700">Preferred Payment Method</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="select select-bordered w-full mt-2">
              <option value="PayPal">PayPal</option>
              <option value="Stripe">Stripe</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
        </div>
        
        {/* Notification Preferences */}
        <div className="space-y-6 mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Notification Preferences</h3>
          <div className="flex justify-between items-center">
            <label className="label font-medium text-gray-700">Enable Email Alerts</label>
            <input type="checkbox" className="toggle toggle-primary" checked={notifications} onChange={() => setNotifications(!notifications)} />
          </div>
        </div>
        
        <button className="btn btn-primary w-full bg-[#422AD5] text-white text-lg font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-[#321AB0] transition-all">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
