import { useState } from "react";
import { Briefcase, Clock, CheckCircle, XCircle, Search, Filter, Plus } from "lucide-react";
import PropTypes from "prop-types";

function FreelancerProposals() {
  const [activeTab, setActiveTab] = useState("active");
  const [showDialog, setShowDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const activeProposals = [
    {
      id: "PR-001",
      project: "E-commerce Website Development",
      client: "TechCorp Inc.",
      date: "May 10, 2025",
      budget: "$3,500",
      status: "Submitted",
      proposalAmount: "$3,200",
      timeline: "6 weeks"
    },
    {
      id: "PR-002",
      project: "Mobile App UI/UX Design",
      client: "MobileSolutions LLC",
      date: "May 8, 2025",
      budget: "$2,800",
      status: "Under Review",
      proposalAmount: "$2,500",
      timeline: "4 weeks"
    },
    {
      id: "PR-003",
      project: "Content Marketing Strategy",
      client: "Digital Growth Agency",
      date: "May 5, 2025",
      budget: "$1,500",
      status: "Interview Stage",
      proposalAmount: "$1,800",
      timeline: "3 weeks"
    }
  ];

  const archivedProposals = [
    {
      id: "PR-004",
      project: "Logo Design Project",
      client: "StartUp Ventures",
      date: "April 20, 2025",
      budget: "$500",
      status: "Accepted",
      proposalAmount: "$500",
      timeline: "2 weeks"
    },
    {
      id: "PR-005",
      project: "SEO Optimization",
      client: "Online Retailer",
      date: "April 15, 2025",
      budget: "$1,200",
      status: "Rejected",
      proposalAmount: "$1,000",
      timeline: "4 weeks"
    }
  ];

  const availableJobs = [
    {
      id: "JB-001",
      title: "Website Redesign",
      client: "Creative Agency",
      budget: "$2,000 - $3,000",
      posted: "2 days ago",
      proposals: 12,
      skills: ["UI/UX Design", "React", "Responsive Design"]
    },
    {
      id: "JB-002",
      title: "Social Media Management",
      client: "Fashion Brand",
      budget: "$1,500/month",
      posted: "1 day ago",
      proposals: 8,
      skills: ["Social Media", "Content Creation", "Marketing"]
    }
  ];

  const Dialog = ({ isOpen, onClose, job }) => {
    if (!isOpen || !job) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
        <div
          className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold">Submit Proposal for {job.title}</h2>
              <p className="text-sm text-gray-500">Client: {job.client}</p>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Project Budget</label>
                  <p className="text-sm">{job.budget}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Required Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="proposal-rate" className="text-sm font-medium">
                  Your Proposed Rate
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input
                    id="proposal-rate"
                    type="number"
                    placeholder="Enter your rate"
                    className="w-full py-2 px-3 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="proposal-timeline" className="text-sm font-medium">
                  Estimated Timeline
                </label>
                <input
                  id="proposal-timeline"
                  placeholder="E.g., 2 weeks, 1 month"
                  className="w-full py-2 px-3 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="proposal-message" className="text-sm font-medium">
                  Cover Letter
                </label>
                <textarea
                  id="proposal-message"
                  rows={6}
                  placeholder="Explain why you're the best fit for this project..."
                  className="w-full py-2 px-3 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label htmlFor="proposal-attachments" className="text-sm font-medium">
                  Attachments (Optional)
                </label>
                <input
                  id="proposal-attachments"
                  type="file"
                  className="w-full py-2 px-3 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <p className="text-xs text-gray-500">Upload relevant work samples or documents (max 5MB)</p>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                className="py-2 px-4 rounded-md text-gray-700 hover:bg-gray-50 border focus:outline-none"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none"
                onClick={() => {
                  // Handle proposal submission
                  onClose();
                }}
              >
                Submit Proposal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  Dialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    job: PropTypes.object
  };

  return (
    <div className="space-y-6 mb-2 mr-2 ml-2">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold">My Proposals</h1>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="search"
              placeholder="Search proposals..."
              className="w-full sm:w-[200px] pl-8 py-2 px-3 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <button className="p-2 rounded-md text-gray-700 hover:bg-gray-50 border focus:outline-none">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full">
        <div className="flex w-full border-b">
          <button
            className={`flex items-center gap-2 px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === "active"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("active")}
          >
            <Clock className="h-4 w-4" />
            <span>Active Proposals</span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === "archived"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("archived")}
          >
            <Briefcase className="h-4 w-4" />
            <span>Archived</span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === "jobs"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("jobs")}
          >
            <Plus className="h-4 w-4" />
            <span>Available Jobs</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {/* Active Proposals Tab */}
          {activeTab === "active" && (
            <div className="rounded-lg bg-white shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Active Proposals</h3>
                <p className="text-sm text-gray-500">Your proposals currently under review by clients</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Proposal ID
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
                        Your Proposal
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
                    {activeProposals.map((proposal) => (
                      <tr key={proposal.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium">{proposal.id}</td>
                        <td className="px-4 py-3 text-sm">{proposal.project}</td>
                        <td className="px-4 py-3 text-sm">{proposal.client}</td>
                        <td className="px-4 py-3 text-sm">{proposal.date}</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex flex-col">
                            <span className="font-medium">{proposal.proposalAmount}</span>
                            <span className="text-xs text-gray-500">{proposal.timeline}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              proposal.status === "Submitted"
                                ? "bg-blue-100 text-blue-800"
                                : proposal.status === "Under Review"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {proposal.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          <button className="py-1 px-3 rounded-md text-gray-700 text-sm hover:bg-gray-50 border focus:outline-none">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Showing {activeProposals.length} of {activeProposals.length} active proposals
                </div>
                <div className="flex gap-2">
                  <button className="py-1 px-3 rounded-md text-gray-700 text-sm hover:bg-gray-50 border focus:outline-none">
                    Previous
                  </button>
                  <button className="py-1 px-3 rounded-md text-gray-700 text-sm hover:bg-gray-50 border focus:outline-none">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Archived Proposals Tab */}
          {activeTab === "archived" && (
            <div className="rounded-lg bg-white shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Archived Proposals</h3>
                <p className="text-sm text-gray-500">Your past proposals that have been accepted or rejected</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Proposal ID
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
                        Your Proposal
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
                    {archivedProposals.map((proposal) => (
                      <tr key={proposal.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium">{proposal.id}</td>
                        <td className="px-4 py-3 text-sm">{proposal.project}</td>
                        <td className="px-4 py-3 text-sm">{proposal.client}</td>
                        <td className="px-4 py-3 text-sm">{proposal.date}</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex flex-col">
                            <span className="font-medium">{proposal.proposalAmount}</span>
                            <span className="text-xs text-gray-500">{proposal.timeline}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${
                              proposal.status === "Accepted"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {proposal.status === "Accepted" ? (
                              <CheckCircle className="h-3 w-3" />
                            ) : (
                              <XCircle className="h-3 w-3" />
                            )}
                            {proposal.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          <button className="py-1 px-3 rounded-md text-gray-700 text-sm hover:bg-gray-50 border focus:outline-none">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Showing {archivedProposals.length} of {archivedProposals.length} archived proposals
                </div>
                <div className="flex gap-2">
                  <button className="py-1 px-3 rounded-md text-gray-700 text-sm hover:bg-gray-50 border focus:outline-none">
                    Previous
                  </button>
                  <button className="py-1 px-3 rounded-md text-gray-700 text-sm hover:bg-gray-50 border focus:outline-none">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Available Jobs Tab */}
          {activeTab === "jobs" && (
            <div className="rounded-lg bg-white shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Available Jobs</h3>
                <p className="text-sm text-gray-500">Find new projects to submit proposals for</p>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {availableJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">{job.title}</h3>
                          <p className="text-sm text-gray-500">Client: {job.client}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {job.posted} • {job.proposals} proposals
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {job.skills.map((skill, index) => (
                            <span key={index} className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{job.budget}</span>
                          <button
                            className="py-1 px-3 bg-primary text-white rounded-md text-sm hover:bg-primary/90 focus:outline-none"
                            onClick={() => {
                              setSelectedJob(job);
                              setShowDialog(true);
                            }}
                          >
                            Submit Proposal
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Showing {availableJobs.length} of {availableJobs.length} available jobs
                </div>
                <div className="flex gap-2">
                  <button className="py-1 px-3 rounded-md text-gray-700 text-sm hover:bg-gray-50 border focus:outline-none">
                    Previous
                  </button>
                  <button className="py-1 px-3 rounded-md text-gray-700 text-sm hover:bg-gray-50 border focus:outline-none">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Proposal Submission Dialog */}
      <Dialog isOpen={showDialog} onClose={() => setShowDialog(false)} job={selectedJob} />
    </div>
  );
}

FreelancerProposals.propTypes = {
  // Add PropTypes validation if needed
};

export default FreelancerProposals;