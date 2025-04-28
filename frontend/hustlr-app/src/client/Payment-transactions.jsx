import { useState, useEffect } from "react";
import { ArrowDownUp, Calendar, CreditCard, Download, Filter, Plus, Search } from "lucide-react";
import PropTypes from "prop-types";
import  useAuth from "../hooks/useAuth.jsx"; // Assuming you have a custom hook for authentication

function PaymentsTransactions() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  
      try {
        const [paymentsRes, freelancersRes] = await Promise.all([
          fetch('http://localhost:5000/api/payments', {
            headers: {
              Authorization: `Bearer ${token}`, // Add Authorization header
            },
          }),
          fetch('http://localhost:5000/api/users?role=freelancer', {
            headers: {
              Authorization: `Bearer ${token}`, // Add Authorization header
            },
          }),
        ]);
  
        const paymentsData = await paymentsRes.json();
        const freelancersData = await freelancersRes.json();
  
        // Convert response to array if it's not already an array
        const paymentsArray = Array.isArray(paymentsData) ? paymentsData : [paymentsData];
        const freelancersArray = Array.isArray(freelancersData) ? freelancersData : [freelancersData];
        console.log(paymentsArray, freelancersArray);
  
        setTransactions(paymentsArray);
        setFreelancers(freelancersArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const Dialog = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={handleBackdropClick}>
        <div
          className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    );
  };

  Dialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node
  };

  const handleAddPayment = async (paymentData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/payments', { // Use full URL
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...paymentData,
          client: user?.id
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed to add payment: ${response.status} ${response.statusText} ${JSON.stringify(errorData)}`);
      }
  
      const newPayment = await response.json();
      setTransactions([...transactions, newPayment]);
      setShowDialog(false);
    } catch (error) {
      console.error("Error adding payment:", error);
      alert("Failed to add payment: " + error.message);
    }
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchesStatus = statusFilter === "all" || t.status?.toLowerCase() === statusFilter;
    const matchesSearch =
      (t.invoiceId?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (t.project?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6 mb-2 mr-2 ml-2">
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
              className="w-full sm:w-[200px] pl-8 py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
            Add Payment
          </button>
        </div>
      </div>

      {/* Payments Table */}
      <div className="rounded-lg bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <div className="flex items-center gap-2">
            <select
              className="py-1 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Transactions</option>
              <option value="paid">Paid</option>
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
                  Invoice
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
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
                <tr key={transaction._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{transaction.invoiceId}</td>
                  <td className="px-4 py-3 text-sm">{transaction.project}</td>
                  <td className="px-4 py-3 text-sm">{transaction.client?.name}</td>
                  <td className="px-4 py-3 text-sm">{transaction.freelancer?.name}</td>
                  <td className="px-4 py-3 text-sm">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-sm">$${transaction.amount ? transaction.amount.toFixed(2) : '0.00'}</td>
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
        <div className="p-4 border-t flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {filteredTransactions.length} of {transactions.length} transactions
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

      {/* Add Payment Dialog */}
      <Dialog isOpen={showDialog} onClose={() => setShowDialog(false)}>
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Add New Payment</h2>
            <p className="text-sm text-gray-500">Add a new payment transaction to the system.</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddPayment({
                invoiceId: e.target.invoiceId.value,
                project: e.target.project.value,
                freelancer: e.target.freelancer.value,
                date: e.target.date.value,
                amount: e.target.amount.value,
                status: e.target.status.value
              });
            }}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="invoiceId" className="text-sm font-medium">
                  Invoice ID
                </label>
                <input
                  id="invoiceId"
                  name="invoiceId"
                  placeholder="INV-001"
                  className="w-full py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="project" className="text-sm font-medium">
                  Project
                </label>
                <input
                  id="project"
                  name="project"
                  placeholder="Project Name"
                  className="w-full py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="freelancer" className="text-sm font-medium">
                  Freelancer
                </label>
                <select
                  id="freelancer"
                  name="freelancer"
                  className="w-full py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select Freelancer</option>
                  {freelancers.map(freelancer => (
                    <option key={freelancer._id} value={freelancer._id}>
                      {freelancer.name} ({freelancer.email})
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="w-full py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium">
                  Amount ($)
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  step="0.01"
                  min="0"
                  placeholder="1200.00"
                  className="w-full py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="w-full py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                className="py-2 px-4 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none"
              >
                Add Payment
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
}

export default PaymentsTransactions;