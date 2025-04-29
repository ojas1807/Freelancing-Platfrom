import { useState, useEffect } from "react";
import { ArrowDownUp, Calendar, CreditCard, Download, Filter, Search } from "lucide-react";
import useAuth from "../hooks/useAuth"; // Assuming you have a custom hook to get the user context
// import PropTypes from "prop-types";

function FreelancerPaymentsTransactions() {
  const {user} = useAuth(); // Assuming you have a custom hook to get the user context
  const [transactions, setTransactions] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
      try {
        const response = await fetch(`http://localhost:5000/api/payments/freelancer/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token as Bearer
          },
        });
        if (!response.ok) throw new Error('Failed to fetch payments');
        
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error('Payments data is not an array');
        }
        
        setTransactions(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setTransactions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user.id]); // Add user.token to dependency array

  const filteredTransactions = transactions.filter(t => {
    const matchesStatus = statusFilter === "all" || 
                         t.status?.toLowerCase() === statusFilter;
    const matchesSearch = t.id?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         t.project?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6 mb-2 mr-2 ml-2">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold">Earnings & Payments</h1>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="search"
              placeholder="Search payments..."
              className="w-full sm:w-[200px] pl-8 py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-2 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Payments Table */}
      <div className="rounded-lg bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Payment History</h3>
          <div className="flex items-center gap-2">
            <select
              className="py-1 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Payments</option>
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
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{transaction.invoiceId}</td>
                  <td className="px-4 py-3 text-sm">{transaction.project}</td>
                  <td className="px-4 py-3 text-sm">{transaction.client?.name || transaction.client}</td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    ₹{typeof transaction.amount === 'number' ? transaction.amount.toFixed(2) : transaction.amount}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        transaction.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : transaction.status === "Processing"
                          ? "bg-blue-100 text-blue-800"
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
            Showing {filteredTransactions.length} of {transactions.length} payments
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
    </div>
  );
}

export default FreelancerPaymentsTransactions;