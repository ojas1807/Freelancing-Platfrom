"use client"

import { useState } from "react"
import { Briefcase, CheckCircle, Clock, Filter, Search, Star } from "lucide-react"
import PropTypes from "prop-types"

function FreelancerProjectManagement({
  initialTab = "ongoing",
  ongoingProjects = [],
  completedProjects = [],
  availableJobs = [],
  onApplyForJob = () => {},
  onMessageClient = () => {},
  onViewJobDetails = () => {},
  onViewFiles = () => {},
}) {
  const [activeTab, setActiveTab] = useState(initialTab)
  const [showApplicationDialog, setShowApplicationDialog] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)

  // Use the passed props with fallback to the default data
  const ongoing = ongoingProjects.length ? ongoingProjects : [
    {
      id: 1,
      name: "E-commerce Website Redesign",
      description: "Complete redesign of client's e-commerce platform with modern UI/UX and improved checkout flow.",
      client: "TechCorp Inc.",
      avatar: "/placeholder.svg?height=40&width=40",
      progress: 75,
      deadline: "May 15, 2025",
      budget: "$3,500",
      status: "In Progress",
    },
    {
      id: 2,
      name: "Mobile App UI Design",
      description: "Design a user-friendly interface for client's new mobile application with focus on accessibility.",
      client: "MobileSolutions LLC",
      avatar: "/placeholder.svg?height=40&width=40",
      progress: 60,
      deadline: "June 2, 2025",
      budget: "$2,800",
      status: "In Progress",
    },
  ]

  const completed = completedProjects.length ? completedProjects : [
    {
      id: 3,
      name: "Logo Design",
      description: "Created a modern, versatile logo that represents client's brand identity across all platforms.",
      client: "StartUp Ventures",
      avatar: "/placeholder.svg?height=40&width=40",
      completedDate: "April 10, 2025",
      budget: "$500",
      rating: 5,
    },
    {
      id: 4,
      name: "Social Media Marketing Campaign",
      description: "Developed and executed a comprehensive social media strategy to increase brand awareness.",
      client: "Fashion Boutique",
      avatar: "/placeholder.svg?height=40&width=40",
      completedDate: "March 25, 2025",
      budget: "$1,200",
      rating: 4,
    },
  ]

  const jobs = availableJobs.length ? availableJobs : [
    {
      id: 5,
      name: "Email Newsletter Design",
      description: "Design responsive email templates for monthly newsletter with focus on conversion.",
      proposals: 12,
      budget: "$300-$600",
      deadline: "May 20, 2025",
      posted: "2 days ago",
      client: "Marketing Agency",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      name: "Product Photography",
      description: "Professional photography for new product line including editing and optimization for web.",
      proposals: 8,
      budget: "$800-$1,200",
      deadline: "May 25, 2025",
      posted: "3 days ago",
      client: "E-commerce Store",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Dialog component
  const ApplicationDialog = ({ isOpen, onClose, job }) => {
    if (!isOpen || !job) return null

    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
        <div
          className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Apply for {job.name}</h2>
              <p className="text-sm text-gray-500">Submit your proposal for this job opportunity.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="proposal-message" className="text-sm font-medium">
                  Proposal Message
                </label>
                <textarea
                  id="proposal-message"
                  placeholder="Explain why you're the best fit for this project..."
                  rows={4}
                  className="w-full py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                ></textarea>
              </div>
              <div className="space-y-2">
                <label htmlFor="proposal-bid" className="text-sm font-medium">
                  Your Bid
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input
                    id="proposal-bid"
                    type="number"
                    placeholder="Amount"
                    className="w-full py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
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
                  className="w-full py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="proposal-attachments" className="text-sm font-medium">
                  Attachments (Optional)
                </label>
                <input
                  id="proposal-attachments"
                  type="file"
                  className="w-full py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                className="py-2 px-4 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none"
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none"
                onClick={() => {
                  onApplyForJob({
                    jobId: job.id,
                    message: document.getElementById('proposal-message').value,
                    bid: document.getElementById('proposal-bid').value,
                    timeline: document.getElementById('proposal-timeline').value
                  });
                  onClose();
                }}
              >
                Submit Proposal
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  ApplicationDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    job: PropTypes.object
  }

  return (
    <div className="space-y-6 mb-2 mr-2 ml-2">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold">My Projects</h1>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="search"
              placeholder="Search projects..."
              className="w-full sm:w-[200px] pl-8 py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <button className="p-2 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full">
        <div className="flex w-full">
          <button
            className={`flex items-center gap-2 px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === "ongoing"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("ongoing")}
          >
            <Clock className="h-4 w-4" />
            <span>Ongoing Projects</span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === "completed"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("completed")}
          >
            <CheckCircle className="h-4 w-4" />
            <span>Completed</span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === "jobs"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("jobs")}
          >
            <Briefcase className="h-4 w-4" />
            <span>Available Jobs</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {/* Ongoing Projects Tab */}
          {activeTab === "ongoing" && (
            <div className="grid gap-6 md:grid-cols-2">
              {ongoing.map((project) => (
                <div key={project.id} className="rounded-lg bg-white shadow-sm overflow-hidden">
                  <div className="p-4 border-b-gray-300 border-b">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{project.name}</h3>
                        <p className="text-sm text-gray-500 mt-2">{project.description}</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border-primary/20">
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        {/* Avatar component */}
                        <div className="relative h-8 w-8 rounded-full overflow-hidden">
                          <img
                            src={project.avatar || "/placeholder.svg"}
                            alt={project.client}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Crect width='32' height='32' fill='%23d1d5db'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fontFamily='system-ui' fontSize='12' fill='%236b7280'%3E" +
                                project.client
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("") +
                                "%3C/text%3E%3C/svg%3E"
                            }}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{project.client}</p>
                          <p className="text-xs text-gray-500">Client</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 text-xs">Deadline</p>
                          <p className="font-medium">{project.deadline}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Budget</p>
                          <p className="font-medium">{project.budget}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t-gray-300 border-t flex justify-between">
                    <button 
                      className="py-1 px-3 rounded-md text-gray-700 text-sm hover:bg-gray-50 focus:outline-none"
                      onClick={() => onMessageClient(project)}
                    >
                      Message Client
                    </button>
                    <button 
                      className="py-1 px-3 bg-primary text-white rounded-md text-sm hover:bg-primary/90 focus:outline-none"
                      onClick={() => onViewJobDetails(project)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Completed Projects Tab */}
          {activeTab === "completed" && (
            <div className="grid gap-6 md:grid-cols-2">
              {completed.map((project) => (
                <div key={project.id} className="rounded-lg bg-white shadow-sm overflow-hidden">
                  <div className="p-4 border-b-gray-300 border-b">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{project.name}</h3>
                        <p className="text-sm text-gray-500 mt-2">{project.description}</p>
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < project.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        {/* Avatar component */}
                        <div className="relative h-8 w-8 rounded-full overflow-hidden">
                          <img
                            src={project.avatar || "/placeholder.svg"}
                            alt={project.client}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Crect width='32' height='32' fill='%23d1d5db'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fontFamily='system-ui' fontSize='12' fill='%236b7280'%3E" +
                                project.client
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("") +
                                "%3C/text%3E%3C/svg%3E"
                            }}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{project.client}</p>
                          <p className="text-xs text-gray-500">Client</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 text-xs">Completed On</p>
                          <p className="font-medium">{project.completedDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Budget</p>
                          <p className="font-medium">{project.budget}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t-gray-300 border-t flex justify-between">
                    <button 
                      className="py-1 px-3 rounded-md text-gray-700 text-sm hover:bg-gray-50 focus:outline-none"
                      onClick={() => onViewFiles(project)}
                    >
                      View Files
                    </button>
                    <button 
                      className="py-1 px-3 bg-primary text-white rounded-md text-sm hover:bg-primary/90 focus:outline-none"
                      onClick={() => onViewJobDetails(project)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Available Jobs Tab */}
          {activeTab === "jobs" && (
            <div className="grid gap-6 md:grid-cols-2">
              {jobs.map((job) => (
                <div key={job.id} className="rounded-lg bg-white shadow-sm overflow-hidden">
                  <div className="p-4 border-b-gray-300 border-b">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{job.name}</h3>
                        <p className="text-sm text-gray-500 mt-2">{job.description}</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                        {job.proposals} Proposals
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        {/* Avatar component */}
                        <div className="relative h-8 w-8 rounded-full overflow-hidden">
                          <img
                            src={job.avatar || "/placeholder.svg"}
                            alt={job.client}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Crect width='32' height='32' fill='%23d1d5db'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fontFamily='system-ui' fontSize='12' fill='%236b7280'%3E" +
                                job.client
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("") +
                                "%3C/text%3E%3C/svg%3E"
                            }}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{job.client}</p>
                          <p className="text-xs text-gray-500">Client</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 text-xs">Budget</p>
                          <p className="font-medium">{job.budget}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Deadline</p>
                          <p className="font-medium">{job.deadline}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Posted</p>
                        <p className="text-sm">{job.posted}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t-gray-300 border-t flex justify-between">
                    <button 
                      className="py-1 px-3 rounded-md text-gray-700 text-sm hover:bg-gray-50 focus:outline-none"
                      onClick={() => onViewJobDetails(job)}
                    >
                      View Details
                    </button>
                    <button 
                      className="py-1 px-3 bg-primary text-white rounded-md text-sm hover:bg-primary/90 focus:outline-none"
                      onClick={() => {
                        setSelectedJob(job);
                        setShowApplicationDialog(true);
                      }}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dialog for applying to a job */}
      <ApplicationDialog 
        isOpen={showApplicationDialog} 
        onClose={() => setShowApplicationDialog(false)} 
        job={selectedJob}
      />
    </div>
  )
}

// PropTypes validation for the FreelancerProjectManagement component
FreelancerProjectManagement.propTypes = {
  // Initial active tab
  initialTab: PropTypes.oneOf(['ongoing', 'completed', 'jobs']),
  
  // Data arrays
  ongoingProjects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      client: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      progress: PropTypes.number.isRequired,
      deadline: PropTypes.string.isRequired,
      budget: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ),
  
  completedProjects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      client: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      completedDate: PropTypes.string.isRequired,
      budget: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })
  ),
  
  availableJobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      proposals: PropTypes.number.isRequired,
      budget: PropTypes.string.isRequired,
      deadline: PropTypes.string.isRequired,
      posted: PropTypes.string.isRequired,
      client: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    })
  ),
  
  // Callback functions
  onApplyForJob: PropTypes.func,
  onMessageClient: PropTypes.func,
  onViewJobDetails: PropTypes.func,
  onViewFiles: PropTypes.func,
  onSubmitWork: PropTypes.func,
}

export default FreelancerProjectManagement