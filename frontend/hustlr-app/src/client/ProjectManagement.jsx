"use client"

import { useState } from "react"
import { Briefcase, CheckCircle, Clock, Filter, PlusCircle, Search, Star } from "lucide-react"
import PropTypes from "prop-types"

function ProjectManagement({
  initialTab = "ongoing",
  ongoingProjects = [],
  completedProjects = [],
  pendingProposals = [],
  onPostJob = () => {},
  onMessageFreelancer = () => {},
  onViewDetails = () => {},
  onViewFiles = () => {},
  onViewProposals = () => {},
  onEditJob = () => {}
}) {
  const [activeTab, setActiveTab] = useState(initialTab)
  const [showDialog, setShowDialog] = useState(false)

  // Use the passed props with fallback to the default data
  const ongoing = ongoingProjects.length ? ongoingProjects : [
    {
      id: 1,
      name: "E-commerce Website Redesign",
      description: "Complete redesign of our e-commerce platform with modern UI/UX and improved checkout flow.",
      freelancer: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      progress: 75,
      deadline: "May 15, 2025",
      budget: "$3,500",
      status: "In Progress",
    },
    {
      id: 2,
      name: "Mobile App UI Design",
      description: "Design a user-friendly interface for our new mobile application with focus on accessibility.",
      freelancer: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      progress: 60,
      deadline: "June 2, 2025",
      budget: "$2,800",
      status: "In Progress",
    },
    {
      id: 3,
      name: "SEO Optimization",
      description: "Improve our website's search engine ranking through comprehensive SEO strategies.",
      freelancer: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      progress: 40,
      deadline: "May 30, 2025",
      budget: "$1,500",
      status: "In Progress",
    },
    {
      id: 4,
      name: "Content Writing for Blog",
      description: "Create engaging blog content focused on industry trends and best practices.",
      freelancer: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      progress: 25,
      deadline: "June 10, 2025",
      budget: "$800",
      status: "In Progress",
    },
  ]

  const completed = completedProjects.length ? completedProjects : [
    {
      id: 5,
      name: "Logo Design",
      description: "Created a modern, versatile logo that represents our brand identity across all platforms.",
      freelancer: "Jessica Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      completedDate: "April 10, 2025",
      budget: "$500",
      rating: 5,
    },
    {
      id: 6,
      name: "Social Media Marketing Campaign",
      description: "Developed and executed a comprehensive social media strategy to increase brand awareness.",
      freelancer: "Robert Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      completedDate: "March 25, 2025",
      budget: "$1,200",
      rating: 4,
    },
    {
      id: 7,
      name: "Website Performance Optimization",
      description: "Improved website loading speed and overall performance through code optimization.",
      freelancer: "Amanda Garcia",
      avatar: "/placeholder.svg?height=40&width=40",
      completedDate: "March 15, 2025",
      budget: "$900",
      rating: 5,
    },
  ]

  const proposals = pendingProposals.length ? pendingProposals : [
    {
      id: 8,
      name: "Email Newsletter Design",
      description: "Design responsive email templates for our monthly newsletter with focus on conversion.",
      proposals: 5,
      budget: "$300-$600",
      deadline: "May 20, 2025",
      posted: "2 days ago",
    },
    {
      id: 9,
      name: "Product Photography",
      description: "Professional photography for our new product line including editing and optimization for web.",
      proposals: 3,
      budget: "$800-$1,200",
      deadline: "May 25, 2025",
      posted: "3 days ago",
    },
  ]

  // Dialog component
  const Dialog = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null

    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
        <div
          className="bg-white  rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto"
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
    children: PropTypes.node.isRequired
  }

  return (
    <div className="space-y-6 mb-2 mr-2 ml-2">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold">Project Management</h1>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="search"
              placeholder="Search projects..."
              className="w-full sm:w-[200px] pl-8 py-2 px-3  rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <button className="p-2  rounded-md text-gray-700  hover:bg-gray-50  focus:outline-none">
            <Filter className="h-4 w-4" />
          </button>
          <button
            className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 font-medium flex items-center"
            onClick={() => setShowDialog(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Post a Job
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full">
        <div className="flex w-full ">
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
              activeTab === "proposals"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("proposals")}
          >
            <Briefcase className="h-4 w-4" />
            <span>Job Postings</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {/* Ongoing Projects Tab */}
          {activeTab === "ongoing" && (
            <div className="grid gap-6 md:grid-cols-2">
              {ongoing.map((project) => (
                <div key={project.id} className="rounded-lg  bg-white  shadow-sm overflow-hidden">
                  <div className="p-4 border-b-gray-300 border-b">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{project.name}</h3>
                        <p className="text-sm text-gray-500 mt-2">{project.description}</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary  border-primary/20">
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
                            alt={project.freelancer}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Crect width='32' height='32' fill='%23d1d5db'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fontFamily='system-ui' fontSize='12' fill='%236b7280'%3E" +
                                project.freelancer
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("") +
                                "%3C/text%3E%3C/svg%3E"
                            }}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{project.freelancer}</p>
                          <p className="text-xs text-gray-500">Freelancer</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200  rounded-full overflow-hidden">
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
                      className="py-1 px-3  rounded-md text-gray-700  text-sm hover:bg-gray-50 focus:outline-none"
                      onClick={() => onMessageFreelancer(project)}
                    >
                      Message
                    </button>
                    <button 
                      className="py-1 px-3 bg-primary text-white rounded-md text-sm hover:bg-primary/90 focus:outline-none"
                      onClick={() => onViewDetails(project)}
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
                <div key={project.id} className="rounded-lg  bg-white  shadow-sm overflow-hidden">
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
                                : "text-gray-300 "
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
                            alt={project.freelancer}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Crect width='32' height='32' fill='%23d1d5db'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fontFamily='system-ui' fontSize='12' fill='%236b7280'%3E" +
                                project.freelancer
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("") +
                                "%3C/text%3E%3C/svg%3E"
                            }}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{project.freelancer}</p>
                          <p className="text-xs text-gray-500">Freelancer</p>
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
                      className="py-1 px-3  rounded-md text-gray-700  text-sm hover:bg-gray-50  focus:outline-none"
                      onClick={() => onViewFiles(project)}
                    >
                      View Files
                    </button>
                    <button 
                      className="py-1 px-3 bg-primary text-white rounded-md text-sm hover:bg-primary/90 focus:outline-none"
                      onClick={() => onViewDetails(project)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Job Postings Tab */}
          {activeTab === "proposals" && (
            <div className="grid gap-6 md:grid-cols-2">
              {proposals.map((project) => (
                <div key={project.id} className="rounded-lg  bg-white  shadow-sm overflow-hidden">
                  <div className="p-4 border-b-gray-300 border-b">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{project.name}</h3>
                        <p className="text-sm text-gray-500 mt-2">{project.description}</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100  text-gray-800 ">
                        {project.proposals} Proposals
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 text-xs">Budget</p>
                          <p className="font-medium">{project.budget}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Deadline</p>
                          <p className="font-medium">{project.deadline}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Posted</p>
                        <p className="text-sm">{project.posted}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t-gray-300 border-t flex justify-between">
                    <button 
                      className="py-1 px-3  rounded-md text-gray-700  text-sm hover:bg-gray-50  focus:outline-none"
                      onClick={() => onEditJob(project)}
                    >
                      Edit Job
                    </button>
                    <button 
                      className="py-1 px-3 bg-primary text-white rounded-md text-sm hover:bg-primary/90 focus:outline-none"
                      onClick={() => onViewProposals(project)}
                    >
                      View Proposals
                    </button>
                  </div>
                </div>
              ))}
              <div className="rounded-lg  bg-white  shadow-sm flex flex-col items-center justify-center p-6">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <PlusCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Post a New Job</h3>
                <p className="text-center text-gray-500 mb-4">
                  Create a new project to find the perfect freelancer for your needs.
                </p>
                <button
                  className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 font-medium"
                  onClick={() => setShowDialog(true)}
                >
                  Post a Job
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dialog for posting a new job */}
      <Dialog isOpen={showDialog} onClose={() => setShowDialog(false)}>
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Post a New Job</h2>
            <p className="text-sm text-gray-500">Create a new project to find the perfect freelancer for your needs.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="project-title" className="text-sm font-medium">
                Project Title
              </label>
              <input
                id="project-title"
                placeholder="E.g., Website Redesign, Logo Design"
                className="w-full py-2 px-3  rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="project-description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="project-description"
                placeholder="Describe your project requirements in detail..."
                rows={4}
                className="w-full py-2 px-3  rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="project-budget" className="text-sm font-medium">
                  Budget
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input
                    id="project-budget"
                    type="number"
                    placeholder="Amount"
                    className="w-full py-2 px-3  rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="project-deadline" className="text-sm font-medium">
                  Deadline
                </label>
                <input
                  id="project-deadline"
                  type="date"
                  className="w-full py-2 px-3  rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="project-category" className="text-sm font-medium">
                Category
              </label>
              <select
                id="project-category"
                className="w-full py-2 px-3  rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none bg-white "
              >
                <option value="" disabled selected>
                  Select category
                </option>
                <option value="web-design">Web Design</option>
                <option value="graphic-design">Graphic Design</option>
                <option value="content-writing">Content Writing</option>
                <option value="marketing">Marketing</option>
                <option value="development">Development</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="project-skills" className="text-sm font-medium">
                Required Skills
              </label>
              <input
                id="project-skills"
                placeholder="E.g., JavaScript, Photoshop, SEO"
                className="w-full py-2 px-3  rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <button
              className="py-2 px-4  rounded-md text-gray-700  hover:bg-gray-50  focus:outline-none"
              onClick={() => setShowDialog(false)}
            >
              Cancel
            </button>
            <button 
              className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none"
              onClick={() => {
                onPostJob({
                  title: document.getElementById('project-title').value,
                  description: document.getElementById('project-description').value,
                  budget: document.getElementById('project-budget').value,
                  deadline: document.getElementById('project-deadline').value,
                  category: document.getElementById('project-category').value,
                  skills: document.getElementById('project-skills').value
                });
                setShowDialog(false);
              }}
            >
              Post Project
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

// PropTypes validation for the ProjectManagement component
ProjectManagement.propTypes = {
  // Initial active tab
  initialTab: PropTypes.oneOf(['ongoing', 'completed', 'proposals']),
  
  // Data arrays
  ongoingProjects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      freelancer: PropTypes.string.isRequired,
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
      freelancer: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      completedDate: PropTypes.string.isRequired,
      budget: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })
  ),
  
  pendingProposals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      proposals: PropTypes.number.isRequired,
      budget: PropTypes.string.isRequired,
      deadline: PropTypes.string.isRequired,
      posted: PropTypes.string.isRequired,
    })
  ),
  
  // Callback functions
  onPostJob: PropTypes.func,
  onMessageFreelancer: PropTypes.func,
  onViewDetails: PropTypes.func,
  onViewFiles: PropTypes.func,
  onViewProposals: PropTypes.func,
  onEditJob: PropTypes.func,
}

export default ProjectManagement;