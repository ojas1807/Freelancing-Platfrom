"use client"

import { useState } from "react"
import { Bell, CreditCard, Globe, Lock, Save, Settings, Upload, User } from "lucide-react"

const AccountSettings = () => {
  // const [profileImage, setProfileImage] = useState("/placeholder.svg?height=100&width=100")
  const [activeTab, setActiveTab] = useState("profile")

  // Mock form state
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    company: "Acme Inc.",
    bio: "I'm a business owner looking for talented freelancers to help with various projects.",
    website: "https://example.com",
    location: "us",
    notifications: {
      newProposals: true,
      projectUpdates: true,
      messages: true,
      paymentConfirmations: true,
      marketingEmails: false,
      pushNotifications: true,
    },
    twoFactorEnabled: false,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSwitchToggle = (key) => {
    if (key === "twoFactorEnabled") {
      setFormData({
        ...formData,
        twoFactorEnabled: !formData.twoFactorEnabled,
      })
    } else {
      setFormData({
        ...formData,
        notifications: {
          ...formData.notifications,
          [key]: !formData.notifications[key],
        },
      })
    }
  }

  return (
    <div className="space-y-6 mb-2 mr-2 ml-2">
      <div className="flex items-center gap-2">
        <Settings className="h-5 w-5 text-primary" />
        <h1 className="text-xl font-bold">Account Settings</h1>
      </div>

      {/* Tabs */}
      <div className="w-full">
        <div className="flex w-full  border-b border-gray-300">
          <button
            className={`flex items-center gap-2 px-4 py-2 font-medium text-sm  border-b border-gray-300-2 ${
              activeTab === "profile"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 font-medium text-sm  border-b border-gray-300 ${
              activeTab === "security"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("security")}
          >
            <Lock className="h-4 w-4" />
            <span>Security</span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 font-medium text-sm  border-b border-gray-300 ${
              activeTab === "notifications"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 font-medium text-sm  border-b border-gray-300 ${
              activeTab === "billing"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("billing")}
          >
            <CreditCard className="h-4 w-4" />
            <span>Billing</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6 mb-2 mr-2 ml-2">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="rounded-lg  border border-gray-300 bg-white    shadow-sm overflow-hidden">
              <div className="p-4  border-b border-gray-300">
                <h3 className="text-lg font-semibold">Profile Information</h3>
                <p className="text-sm text-gray-500">
                  Update your profile information and how others see you on the platform.
                </p>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden">
                      <img
                        src={"/placeholder.svg"}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <button className="py-1 px-3  border border-gray-300 rounded-md text-gray-700  text-sm hover:bg-gray-50  focus:outline-none flex items-center">
                      <Upload className="mr-2 h-4 w-4" />
                      Change Photo
                    </button>
                  </div>
                  <div className="grid gap-4 flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="first-name" className="text-sm font-medium">
                          First Name
                        </label>
                        <input
                          id="first-name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full py-2 px-3  border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="last-name" className="text-sm font-medium">
                          Last Name
                        </label>
                        <input
                          id="last-name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full py-2 px-3  border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full py-2 px-3  border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full py-2 px-3  border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="bio" className="text-sm font-medium">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself or your business"
                    rows={4}
                    className="w-full py-2 px-3  border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <label htmlFor="website" className="text-sm font-medium">
                    Website
                  </label>
                  <div className="flex">
                    <span className="flex items-center px-3 rounded-l-md  border border-gray-300  border-r border-gray-300-0 bg-gray-100    text-gray-500">
                      <Globe className="h-4 w-4" />
                    </span>
                    <input
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full py-2 px-3  border border-gray-300 rounded-r-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    Location
                  </label>
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full py-2 px-3  border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none bg-white   "
                  >
                    <option value="us">United States</option>
                    <option value="ca">Canada</option>
                    <option value="uk">United Kingdom</option>
                    <option value="au">Australia</option>
                    <option value="de">Germany</option>
                  </select>
                </div>
              </div>
              <div className="p-4  border-t border-gray-300 flex justify-end">
                <button className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 font-medium flex items-center">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="rounded-lg  border border-gray-300 border-gray-300 bg-white    shadow-sm overflow-hidden">
              <div className="p-4  border-b border-gray-300">
                <h3 className="text-lg font-semibold">Password & Security</h3>
                <p className="text-sm text-gray-500">Manage your password and security settings.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <label htmlFor="current-password" className="text-sm font-medium">
                        Current Password
                      </label>
                      <input
                        id="current-password"
                        type="password"
                        placeholder="••••••••"
                        className="w-full py-2 px-3  border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="new-password" className="text-sm font-medium">
                        New Password
                      </label>
                      <input
                        id="new-password"
                        type="password"
                        placeholder="••••••••"
                        className="w-full py-2 px-3  border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="confirm-password" className="text-sm font-medium">
                        Confirm Password
                      </label>
                      <input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        className="w-full py-2 px-3  border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p>Protect your account with 2FA</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <button
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${formData.twoFactorEnabled ? "bg-primary" : "bg-gray-200   "}`}
                      onClick={() => handleSwitchToggle("twoFactorEnabled")}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${formData.twoFactorEnabled ? "translate-x-6" : "translate-x-1"}`}
                      />
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Login Sessions</h3>
                  <div className="rounded-lg  border border-gray-300 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-gray-500">New York, USA • Chrome on Windows</p>
                        <p className="text-xs text-gray-500 mt-1">Started: May 5, 2025 at 10:30 AM</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4  border-t border-gray-300flex justify-end">
                <button className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 font-medium flex items-center">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="rounded-lg  border border-gray-300 bg-white    shadow-sm overflow-hidden">
              <div className="p-4  border-b border-gray-300">
                <h3 className="text-lg font-semibold">Notification Preferences</h3>
                <p className="text-sm text-gray-500">Manage how and when you receive notifications.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p>New proposals</p>
                        <p className="text-sm text-gray-500">Receive emails when freelancers submit proposals</p>
                      </div>
                      <button
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${formData.notifications.newProposals ? "bg-primary" : "bg-gray-200   "}`}
                        onClick={() => handleSwitchToggle("newProposals")}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${formData.notifications.newProposals ? "translate-x-6" : "translate-x-1"}`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p>Project updates</p>
                        <p className="text-sm text-gray-500">Receive emails about project milestones and updates</p>
                      </div>
                      <button
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${formData.notifications.projectUpdates ? "bg-primary" : "bg-gray-200   "}`}
                        onClick={() => handleSwitchToggle("projectUpdates")}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${formData.notifications.projectUpdates ? "translate-x-6" : "translate-x-1"}`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p>Messages</p>
                        <p className="text-sm text-gray-500">Receive emails when you get new messages</p>
                      </div>
                      <button
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${formData.notifications.messages ? "bg-primary" : "bg-gray-200   "}`}
                        onClick={() => handleSwitchToggle("messages")}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${formData.notifications.messages ? "translate-x-6" : "translate-x-1"}`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p>Payment confirmations</p>
                        <p className="text-sm text-gray-500">Receive emails for payment confirmations</p>
                      </div>
                      <button
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${formData.notifications.paymentConfirmations ? "bg-primary" : "bg-gray-200   "}`}
                        onClick={() => handleSwitchToggle("paymentConfirmations")}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${formData.notifications.paymentConfirmations ? "translate-x-6" : "translate-x-1"}`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p>Marketing emails</p>
                        <p className="text-sm text-gray-500">Receive emails about new features and promotions</p>
                      </div>
                      <button
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${formData.notifications.marketingEmails ? "bg-primary" : "bg-gray-200   "}`}
                        onClick={() => handleSwitchToggle("marketingEmails")}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${formData.notifications.marketingEmails ? "translate-x-6" : "translate-x-1"}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Push Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p>Enable push notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications directly in your browser</p>
                      </div>
                      <button
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${formData.notifications.pushNotifications ? "bg-primary" : "bg-gray-200   "}`}
                        onClick={() => handleSwitchToggle("pushNotifications")}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${formData.notifications.pushNotifications ? "translate-x-6" : "translate-x-1"}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4  border-t border-gray-300flex justify-end">
                <button className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 font-medium flex items-center">
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === "billing" && (
            <div className="rounded-lg  border border-gray-300 bg-white    shadow-sm overflow-hidden">
              <div className="p-4  border-b border-gray-300">
                <h3 className="text-lg font-semibold">Billing Information</h3>
                <p className="text-sm text-gray-500">Manage your billing information and payment methods.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Billing Address</h3>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="billing-name" className="text-sm font-medium">
                          Full Name
                        </label>
                        <input
                          id="billing-name"
                          defaultValue="John Doe"
                          className="w-full py-2 px-3  border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="billing-company" className="text-sm font-medium">
                          Company
                        </label>
                        <input
                          id="billing-company"
                          defaultValue="Acme Inc."
                          className="w-full py-2 px-3  border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="billing-address" className="text-sm font-medium">
                        Address
                      </label>
                      <input
                        id="billing-address"
                        defaultValue="123 Main St, Suite 100"
                        className="w-full py-2 px-3  border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="billing-city" className="text-sm font-medium">
                          City
                        </label>
                        <input
                          id="billing-city"
                          defaultValue="New York"
                          className="w-full py-2 px-3  border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="billing-state" className="text-sm font-medium">
                          State
                        </label>
                        <input
                          id="billing-state"
                          defaultValue="NY"
                          className="w-full py-2 px-3  border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="billing-zip" className="text-sm font-medium">
                          ZIP Code
                        </label>
                        <input
                          id="billing-zip"
                          defaultValue="10001"
                          className="w-full py-2 px-3  border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="billing-country" className="text-sm font-medium">
                        Country
                      </label>
                      <select
                        id="billing-country"
                        defaultValue="us"
                        className="w-full py-2 px-3  border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none bg-white   "
                      >
                        <option value="us">United States</option>
                        <option value="ca">Canada</option>
                        <option value="uk">United Kingdom</option>
                        <option value="au">Australia</option>
                        <option value="de">Germany</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Payment Methods</h3>
                    <button className="py-1 px-3  border border-gray-300 rounded-md text-gray-700  text-sm hover:bg-gray-50  focus:outline-none flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Add Method
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg  border border-gray-300 p-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-gray-500">Expires 05/26</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full border">Default</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg  border border-gray-300 p-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Mastercard ending in 5678</p>
                          <p className="text-sm text-gray-500">Expires 08/25</p>
                        </div>
                      </div>
                      <button className="py-1 px-3 text-gray-700  text-sm hover:bg-gray-50  rounded-md focus:outline-none">
                        Make Default
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4  border-t border-gray-300flex justify-end">
                <button className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 font-medium flex items-center">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AccountSettings;