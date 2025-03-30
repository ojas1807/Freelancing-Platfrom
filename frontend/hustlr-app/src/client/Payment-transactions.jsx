import { useState } from "react"
import { ArrowDownUp, Calendar, CreditCard, Download, Filter, Plus, Search } from "lucide-react"
import PropTypes from "prop-types" // Import PropTypes for validation

function PaymentsTransactions() {
  const [activeTab, setActiveTab] = useState("invoices")

  const transactions = [
    {
      id: "INV-001",
      project: "E-commerce Website Redesign",
      freelancer: "Sarah Johnson",
      date: "May 5, 2025",
      amount: "$1,200.00",
      status: "Paid",
    },
    {
      id: "INV-002",
      project: "Mobile App UI Design",
      freelancer: "Michael Chen",
      date: "May 2, 2025",
      amount: "$800.00",
      status: "Paid",
    },
    {
      id: "INV-003",
      project: "SEO Optimization",
      freelancer: "Emily Rodriguez",
      date: "April 28, 2025",
      amount: "$500.00",
      status: "Pending",
    },
    {
      id: "INV-004",
      project: "Content Writing for Blog",
      freelancer: "David Wilson",
      date: "April 25, 2025",
      amount: "$350.00",
      status: "Pending",
    },
    {
      id: "INV-005",
      project: "Logo Design",
      freelancer: "Jessica Lee",
      date: "April 15, 2025",
      amount: "$500.00",
      status: "Paid",
    },
  ]

  const paymentMethods = [
    {
      id: 1,
      type: "Credit Card",
      name: "Visa ending in 4242",
      expiry: "05/26",
      isDefault: true,
    },
    {
      id: 2,
      type: "Credit Card",
      name: "Mastercard ending in 5678",
      expiry: "08/25",
      isDefault: false,
    },
    {
      id: 3,
      type: "PayPal",
      name: "john.doe@example.com",
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
          className="bg-white  rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    )
  }

  // Add PropTypes validation for Dialog component
  Dialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node
  }

  const filteredTransactions =
    statusFilter === "all" ? transactions : transactions.filter((t) => t.status.toLowerCase() === statusFilter)

  return (
    <div className="space-y-6  mb-2 mr-2 ml-2">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold">Payments & Transactions</h1>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="search"
              placeholder="Search invoices..."
              className="w-full sm:w-[200px] pl-8 py-2 px-3   rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus: -primary"
            />
          </div>
          <button className="p-2   rounded-md text-gray-700  hover:bg-gray-50  focus:outline-none">
            <Filter className="h-4 w-4" />
          </button>
          <button
            className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 font-medium flex items-center"
            onClick={() => setShowDialog(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Payment
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full">
        <div className="flex w-full  -b">
          <button
            className={`flex items-center gap-2 px-4 py-2 font-medium text-sm  -b-2 ${
              activeTab === "invoices"
                ? " -primary text-primary"
                : " -transparent text-gray-500 hover:text-gray-700 hover: -gray-300"
            }`}
            onClick={() => setActiveTab("invoices")}
          >
            <Calendar className="h-4 w-4" />
            <span>Invoices & Transactions</span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 font-medium text-sm  -b-2 ${
              activeTab === "methods"
                ? " -primary text-primary"
                : " -transparent text-gray-500 hover:text-gray-700 hover: -gray-300"
            }`}
            onClick={() => setActiveTab("methods")}
          >
            <CreditCard className="h-4 w-4" />
            <span>Payment Methods</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {/* Invoices Tab */}
          {activeTab === "invoices" && (
            <div className="rounded-lg   bg-white shadow-sm overflow-hidden">
              <div className="p-4  -b flex justify-between items-center">
                <h3 className="text-lg font-semibold">Recent Transactions</h3>
                <div className="flex items-center gap-2">
                  <select
                    className="py-1 px-3   rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus: -primary appearance-none bg-white"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Transactions</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                  </select>
                  <button className="py-1 px-3   rounded-md text-gray-700  text-sm hover:bg-gray-50 focus:outline-none flex items-center">
                    <ArrowDownUp className="mr-2 h-4 w-4" />
                    Sort
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className=" -b bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Freelancer
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
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium">{transaction.id}</td>
                        <td className="px-4 py-3 text-sm">{transaction.project}</td>
                        <td className="px-4 py-3 text-sm">{transaction.freelancer}</td>
                        <td className="px-4 py-3 text-sm">{transaction.date}</td>
                        <td className="px-4 py-3 text-sm">{transaction.amount}</td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              transaction.status === "Paid"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          <button className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4  -t flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Showing {filteredTransactions.length} of {transactions.length} transactions
                </div>
                <div className="flex gap-2">
                  <button className="py-1 px-3   rounded-md text-gray-700  text-sm hover:bg-gray-50  focus:outline-none">
                    Previous
                  </button>
                  <button className="py-1 px-3   rounded-md text-gray-700 text-sm hover:bg-gray-50  focus:outline-none">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Payment Methods Tab */}
          {activeTab === "methods" && (
            <div className="rounded-lg   bg-white shadow-sm overflow-hidden">
              <div className="p-4  -b">
                <h3 className="text-lg font-semibold">Payment Methods</h3>
                <p className="text-sm text-gray-500">Manage your payment methods for freelancer payments.</p>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between rounded-lg   p-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{method.type}</span>
                            {method.expiry && (
                              <>
                                <span>•</span>
                                <span>Expires {method.expiry}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {method.isDefault && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full  ">Default</span>
                        )}
                        <button className="py-1 px-3 text-gray-700  text-sm hover:bg-gray-50 rounded-md focus:outline-none">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4  -t">
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
            <h2 className="text-lg font-semibold">Add Payment Method</h2>
            <p className="text-sm text-gray-500">Add a new payment method to your account.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="card-number" className="text-sm font-medium">
                Card Number
              </label>
              <input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                className="w-full py-2 px-3   rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus: -primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="expiry" className="text-sm font-medium">
                  Expiry Date
                </label>
                <input
                  id="expiry"
                  placeholder="MM/YY"
                  className="w-full py-2 px-3   rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus: -primary"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="cvc" className="text-sm font-medium">
                  CVC
                </label>
                <input
                  id="cvc"
                  placeholder="123"
                  className="w-full py-2 px-3   rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus: -primary"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name on Card
              </label>
              <input
                id="name"
                placeholder="John Doe"
                className="w-full py-2 px-3   rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus: -primary"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <button
              className="py-2 px-4   rounded-md text-gray-700  hover:bg-gray-50 focus:outline-none"
              onClick={() => setShowDialog(false)}
            >
              Cancel
            </button>
            <button className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none">
              Add Payment Method
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default PaymentsTransactions