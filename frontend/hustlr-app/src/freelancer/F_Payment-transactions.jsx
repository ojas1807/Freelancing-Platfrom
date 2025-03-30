import { useState } from "react"
import { ArrowDownUp, Calendar, CreditCard, Download, Filter, Plus, Search } from "lucide-react"
import PropTypes from "prop-types"

function FreelancerPaymentsTransactions() {
  const [activeTab, setActiveTab] = useState("earnings")

  const earnings = [
    {
      id: "PAY-001",
      project: "E-commerce Website Redesign",
      client: "TechCorp Inc.",
      date: "May 5, 2025",
      amount: "$1,200.00",
      status: "Paid",
    },
    {
      id: "PAY-002",
      project: "Mobile App UI Design",
      client: "MobileSolutions LLC",
      date: "May 2, 2025",
      amount: "$800.00",
      status: "Paid",
    },
    {
      id: "PAY-003",
      project: "SEO Optimization",
      client: "Digital Marketing Co.",
      date: "April 28, 2025",
      amount: "$500.00",
      status: "Processing",
    },
    {
      id: "PAY-004",
      project: "Content Writing for Blog",
      client: "Content Creators Ltd.",
      date: "April 25, 2025",
      amount: "$350.00",
      status: "Pending",
    },
    {
      id: "PAY-005",
      project: "Logo Design",
      client: "StartUp Ventures",
      date: "April 15, 2025",
      amount: "$500.00",
      status: "Paid",
    },
  ]

  const invoices = [
    {
      id: "INV-001",
      project: "E-commerce Website Redesign",
      client: "TechCorp Inc.",
      date: "May 1, 2025",
      amount: "$1,200.00",
      status: "Paid",
    },
    {
      id: "INV-002",
      project: "Mobile App UI Design",
      client: "MobileSolutions LLC",
      date: "April 28, 2025",
      amount: "$800.00",
      status: "Paid",
    },
    {
      id: "INV-003",
      project: "SEO Optimization",
      client: "Digital Marketing Co.",
      date: "April 25, 2025",
      amount: "$500.00",
      status: "Sent",
    },
  ]

  const paymentMethods = [
    {
      id: 1,
      type: "Bank Account",
      name: "Chase Bank ending in 5678",
      isDefault: true,
    },
    {
      id: 2,
      type: "PayPal",
      name: "freelancer@example.com",
      isDefault: false,
    },
    {
      id: 3,
      type: "Wise",
      name: "freelancer@example.com",
      isDefault: false,
    },
  ]

  const [showDialog, setShowDialog] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")

  // Dialog component with PropTypes validation
  const Dialog = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null

    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose()
      }
    }

    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={handleBackdropClick}>
        <div
          className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    )
  }

  Dialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node
  }

  const filteredEarnings =
    statusFilter === "all" ? earnings : earnings.filter((t) => t.status.toLowerCase() === statusFilter)

  return (
    <div className="space-y-6 mb-2 mr-2 ml-2">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold">Payments & Earnings</h1>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="search"
              placeholder="Search payments..."
              className="w-full sm:w-[200px] pl-8 py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <button className="p-2 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none">
            <Filter className="h-4 w-4" />
          </button>
          <button
            className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 font-medium flex items-center"
            onClick={() => setShowDialog(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Withdraw Funds
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full">
        <div className="flex w-full border-b">
          <button
            className={`flex items-center gap-2 px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === "earnings"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("earnings")}
          >
            <Calendar className="h-4 w-4" />
            <span>Earnings</span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === "invoices"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("invoices")}
          >
            <CreditCard className="h-4 w-4" />
            <span>Invoices</span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === "methods"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("methods")}
          >
            <CreditCard className="h-4 w-4" />
            <span>Payment Methods</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {/* Earnings Tab */}
          {activeTab === "earnings" && (
            <div className="rounded-lg bg-white shadow-sm overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold">Earnings History</h3>
                <div className="flex items-center gap-2">
                  <select
                    className="py-1 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none bg-white"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Earnings</option>
                    <option value="paid">Paid</option>
                    <option value="processing">Processing</option>
                    <option value="pending">Pending</option>
                  </select>
                  <button className="py-1 px-3 rounded-md text-gray-700 text-sm hover:bg-gray-50 focus:outline-none flex items-center">
                    <ArrowDownUp className="mr-2 h-4 w-4" />
                    Sort
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredEarnings.map((earning) => (
                      <tr key={earning.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium">{earning.id}</td>
                        <td className="px-4 py-3 text-sm">{earning.project}</td>
                        <td className="px-4 py-3 text-sm">{earning.client}</td>
                        <td className="px-4 py-3 text-sm">{earning.date}</td>
                        <td className="px-4 py-3 text-sm">{earning.amount}</td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              earning.status === "Paid"
                                ? "bg-green-100 text-green-800"
                                : earning.status === "Processing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {earning.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          <button className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download Receipt</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Showing {filteredEarnings.length} of {earnings.length} payments
                </div>
                <div className="flex gap-2">
                  <button className="py-1 px-3 rounded-md text-gray-700 text-sm hover:bg-gray-50 focus:outline-none">
                    Previous
                  </button>
                  <button className="py-1 px-3 rounded-md text-gray-700 text-sm hover:bg-gray-50 focus:outline-none">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Invoices Tab */}
          {activeTab === "invoices" && (
            <div className="rounded-lg bg-white shadow-sm overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold">Invoice History</h3>
                <div className="flex items-center gap-2">
                  <select
                    className="py-1 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none bg-white"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Invoices</option>
                    <option value="paid">Paid</option>
                    <option value="sent">Sent</option>
                  </select>
                  <button className="py-1 px-3 rounded-md text-gray-700 text-sm hover:bg-gray-50 focus:outline-none flex items-center">
                    <ArrowDownUp className="mr-2 h-4 w-4" />
                    Sort
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium">{invoice.id}</td>
                        <td className="px-4 py-3 text-sm">{invoice.project}</td>
                        <td className="px-4 py-3 text-sm">{invoice.client}</td>
                        <td className="px-4 py-3 text-sm">{invoice.date}</td>
                        <td className="px-4 py-3 text-sm">{invoice.amount}</td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              invoice.status === "Paid"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {invoice.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          <button className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download Invoice</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Showing {invoices.length} of {invoices.length} invoices
                </div>
                <div className="flex gap-2">
                  <button className="py-1 px-3 rounded-md text-gray-700 text-sm hover:bg-gray-50 focus:outline-none">
                    Previous
                  </button>
                  <button className="py-1 px-3 rounded-md text-gray-700 text-sm hover:bg-gray-50 focus:outline-none">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Payment Methods Tab */}
          {activeTab === "methods" && (
            <div className="rounded-lg bg-white shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Payment Methods</h3>
                <p className="text-sm text-gray-500">Manage how you receive payments from clients.</p>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{method.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {method.isDefault && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                            Default
                          </span>
                        )}
                        <button className="py-1 px-3 text-gray-700 text-sm hover:bg-gray-50 rounded-md focus:outline-none">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t">
                <button
                  className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 font-medium flex items-center justify-center"
                  onClick={() => setShowDialog(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Payment Method
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dialog for adding payment method */}
      <Dialog isOpen={showDialog} onClose={() => setShowDialog(false)}>
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Add Withdrawal Method</h2>
            <p className="text-sm text-gray-500">Add a new method to receive your earnings.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="method-type" className="text-sm font-medium">
                Method Type
              </label>
              <select
                id="method-type"
                className="w-full py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none bg-white"
              >
                <option value="">Select method</option>
                <option value="bank">Bank Account</option>
                <option value="paypal">PayPal</option>
                <option value="wise">Wise</option>
                <option value="stripe">Stripe</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="account-name" className="text-sm font-medium">
                Account Holder Name
              </label>
              <input
                id="account-name"
                placeholder="Your full name"
                className="w-full py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="account-number" className="text-sm font-medium">
                Account Number
              </label>
              <input
                id="account-number"
                placeholder="1234567890"
                className="w-full py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="routing-number" className="text-sm font-medium">
                Routing Number (US only)
              </label>
              <input
                id="routing-number"
                placeholder="123456789"
                className="w-full py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                id="default-method"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="default-method" className="text-sm">
                Set as default payment method
              </label>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <button
              className="py-2 px-4 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none"
              onClick={() => setShowDialog(false)}
            >
              Cancel
            </button>
            <button className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none">
              Add Method
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

FreelancerPaymentsTransactions.propTypes = {
  // Add PropTypes validation if needed
}

export default FreelancerPaymentsTransactions