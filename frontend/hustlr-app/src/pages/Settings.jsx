const Settings = () => {
    return (
      <div className="p-6 bg-white shadow-md rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Change Username:</label>
            <input type="text" className="w-full p-2 border rounded-lg mt-2" placeholder="Enter new username" />
          </div>
  
          <div>
            <label className="block text-gray-700">Change Password:</label>
            <input type="password" className="w-full p-2 border rounded-lg mt-2" placeholder="Enter new password" />
          </div>
  
          <div>
            <label className="block text-gray-700">Notification Preferences:</label>
            <select className="w-full p-2 border rounded-lg mt-2">
              <option>Email Notifications</option>
              <option>Push Notifications</option>
              <option>None</option>
            </select>
          </div>
  
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4">Save Changes</button>
        </div>
      </div>
    );
  };
  
  export default Settings;
  