"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Filter,
  Mail,
  PlusCircle,
  Search,
  Star,
} from "lucide-react";
import PropTypes from "prop-types";
import { JobServices, ProjectServices } from "../services/projectServices.jsx";
import HireDialog from "./HireDialog.jsx";
import useAuth from "../hooks/useAuth.jsx";
import ProjectManagementModal from "./ProjectManagementModal.jsx";

function C_ProjectManagement({
  initialTab = "ongoing",
  onMessageFreelancer = () => {},
  onViewDetails = () => {},
  onViewFiles = () => {},
  // onViewProposals = () => {},
  // onEditJob = () => {},
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showDialog, setShowDialog] = useState(false);
  const [showProposalsDialog, setShowProposalsDialog] = useState(false);
  const [currentJobProposals, setCurrentJobProposals] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState({
    ongoing: false,
    completed: false,
    proposals: false,
    jobProposals: false,
  });
  const [error, setError] = useState({
    ongoing: null,
    completed: null,
    proposals: null,
    jobProposals: null,
  });

  // Add this state
const [files, setFiles] = useState([]);

// Add this handler
const handleFetchFiles = async (projectId) => {
  try {
    const fetchedFiles = await ProjectServices.getFiles(projectId);
    setFiles(fetchedFiles);
    return fetchedFiles;
  } catch (error) {
    console.error("Error fetching files:", error);
    toast.error("Failed to fetch files");
    return [];
  }
};

// Add this handler function
const handleCompleteProject = async (projectId,rating) => {
  try {
    await ProjectServices.updateProjectStatus(projectId,rating, "completed");
    
    
    // Update local state
    setOngoing(prev => prev.filter(p => p.id !== projectId));
    const completedProject = ongoing.find(p => p.id === projectId);
    if (completedProject) {
      setCompleted(prev => [...prev, { ...completedProject, status: 'completed', completedDate: new Date(), rating: rating }]);
    }
    
    toast.success("Project marked as completed!");
    setShowManagementModal(false);
  } catch (error) {
    console.error("Error completing project:", error);
    toast.error("Failed to mark project as complete");
  }
};


  // Add to your existing state
const [selectedProject, setSelectedProject] = useState(null);
const [showManagementModal, setShowManagementModal] = useState(false);
const [projects, setProjects] = useState([]);

// Add these handler functions
const handleViewDetails = (project) => {
  setSelectedProject(project);
  setShowManagementModal(true);
};

const handleMilestoneAdded = (updatedProject) => {
  setSelectedProject(updatedProject);
  setProjects(projects.map(p => 
    p.id === updatedProject.id ? updatedProject : p
  ));
};

const handleUpdateProgress = async (projectId, newProgress) => {
  try {
    await ProjectServices.updateProgress(projectId, newProgress);
    // Update local state
    setOngoing(prev => prev.map(p => 
      p.id === projectId ? { ...p, progress: newProgress } : p
    ));
    toast.success("Progress updated successfully");
  } catch (error) {
    console.error("Error updating progress:", error);
    toast.error("Failed to update progress");
  }
};

const handleUploadFile = async (projectId, file) => {
  try {
    const response = await ProjectServices.uploadFile(projectId, file);
    // Update local state
    setOngoing(prev => prev.map(p => 
      p.id === projectId ? { 
        ...p, 
        files: [...(p.files || []), response.data] 
      } : p
    ));
    toast.success("File uploaded successfully");
  } catch (error) {
    console.error("Error uploading file:", error);
    toast.error("Failed to upload file");
  }
};

const handleSendMessage = async (projectId, content) => {
  try {
    await ProjectServices.addMessage(projectId, content);
    toast.success("Message sent successfully");
  } catch (error) {
    console.error("Error sending message:", error);
    toast.error("Failed to send message");
  }
};



  // Fetch projects based on active tab
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (activeTab === "ongoing" && !ongoing.length) {
          setLoading((prev) => ({ ...prev, ongoing: true }));
          const { ongoingProjects } = await ProjectServices.getClientProjects();
          setOngoing(ongoingProjects || []);
          setError((prev) => ({ ...prev, ongoing: null }));
        } else if (activeTab === "completed" && !completed.length) {
          setLoading((prev) => ({ ...prev, completed: true }));
          const { completedProjects } = await ProjectServices.getClientProjects();
          setCompleted(completedProjects || []);
          setError((prev) => ({ ...prev, completed: null }));
        } else if (activeTab === "proposals" && !proposals.length) {
          setLoading((prev) => ({ ...prev, proposals: true }));
          const data = await JobServices.getAvailableJobs();
          // Format the jobs data to ensure we have all required fields

          // Debug: Log the raw data to see what we're getting
          console.log("Raw jobs data:", data);

          const formattedJobs = data.map((job) => ({
            ...job,
            id: job._id || job.id, // Handle both _id and id
            proposalCount:
              job.proposals ||
              job.bid?.length ||
              job.applications?.length ||
              job.proposalCount ||
              0, // Ensure proposals exists
            createdAt:
              job.createdAt || job.postedDate || new Date().toISOString(), // Fallback dates
            deadline: job.deadline || job.endDate, // Fallback deadline
          }));

          setProposals(formattedJobs);
          setError((prev) => ({ ...prev, proposals: null }));
        }
      } catch (err) {
        console.error(`Error fetching ${activeTab} projects:`, err);
        setError((prev) => ({ ...prev, [activeTab]: err.message }));
      } finally {
        setLoading((prev) => ({ ...prev, [activeTab]: false }));
      }
    };

    fetchProjects();
  }, [activeTab, ongoing.length, completed.length, proposals.length]);

  // Function to fetch proposals for a specific job
  const fetchJobProposals = async (jobId) => {
    try {
      setLoading((prev) => ({ ...prev, jobProposals: true }));
      const data = await JobServices.getJobProposals(jobId);
      setCurrentJobProposals(data);
      setError((prev) => ({ ...prev, jobProposals: null }));
    } catch (err) {
      console.error("Error fetching job proposals:", err);
      setError((prev) => ({ ...prev, jobProposals: err.message }));
    } finally {
      setLoading((prev) => ({ ...prev, jobProposals: false }));
    }
  };

  // Function to handle view proposals button click
  const handleViewProposals = async (job) => {
    setCurrentJob(job);
    await fetchJobProposals(job.id);
    setShowProposalsDialog(true);
  };

  // Function to handle job posting
  const handlePostJob = async (jobData) => {
    try {
      await JobServices.createJob(jobData);
      // Refresh proposals after posting
      const data = await JobServices.getAvailableJobs();
      setProposals(data);
      alert("Job posted successfully!");
      setShowDialog(false);
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job.");
    }
  };

  // // Function to update project progress
  // const handleUpdateProgress = async (projectId, newProgress) => {
  //   try {
  //     await ProjectServices.updateProgress(projectId, newProgress);
  //     // Refresh ongoing projects after update
  //     const data = await ProjectServices.getProjects("in-progress");
  //     setOngoing(data);
  //   } catch (error) {
  //     console.error("Error updating progress:", error);
  //     alert("Failed to update progress");
  //   }
  // };

  // // Function to add message to project
  // const handleAddMessage = async (projectId, message) => {
  //   try {
  //     await ProjectServices.addMessage(projectId, message);
  //     // Optionally refresh project data or update UI
  //   } catch (error) {
  //     console.error("Error adding message:", error);
  //     alert("Failed to send message");
  //   }
  // };

  // // Function to upload file to project
  // const handleUploadFile = async (projectId, file) => {
  //   try {
  //     await ProjectServices.uploadFile(projectId, file);
  //     // Optionally refresh project data or update UI
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //     alert("Failed to upload file");
  //   }
  // };

  // Dialog component
  const Dialog = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    );
  };
  // Proposals Dialog component
  const ProposalsDialog = ({
    isOpen,
    onClose,
    job,
    proposals,
    loading,
    error,
  }) => {
    if (!isOpen) return null;
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [showHireDialog, setShowHireDialog] = useState(false);

    const handleHire = async (hireData) => {
      try {
        console.log('Hiring data:', {
          jobId: currentJob.id,
          proposalId: selectedProposal.id,
          hireData
        });
    
        const result = await JobServices.hireFreelancer(
          currentJob.id, 
          selectedProposal.id, 
          hireData
        );
    
        if (!result) {
          throw new Error('No response from server');
        }
    
        alert('Freelancer hired successfully! Project created.');
        setShowHireDialog(false);
        setShowProposalsDialog(false);
        
        // Refresh the job list
        const data = await JobServices.getAvailableJobs();
        setProposals(data.map(job => ({
          ...job,
          id: job._id || job.id,
          proposalCount: job.proposals?.length || 0
        })));
      } catch (error) {
        console.error('Full hiring error:', error);
        alert(`Hiring failed: ${error.message}`);
      }
    };

    return (
      <div
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Proposals for {job?.name || "Job"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {loading && (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-md mb-4">
                <p>Error: {error}</p>
                <button
                  onClick={() => fetchJobProposals(job.id)}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Try again
                </button>
              </div>
            )}

            {!loading && !error && (
              <div className="space-y-4">
                {proposals.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    No proposals found for this job
                  </div>
                ) : (
                  proposals.map((proposal) => (
                    <div
                      key={proposal.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden">
                          <img
                            src={
                              proposal.freelancer?.avatar || "/placeholder.svg"
                            }
                            alt={proposal.freelancer?.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Crect width='32' height='32' fill='%23d1d5db'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fontFamily='system-ui' fontSize='12' fill='%236b7280'%3E" +
                                (proposal.freelancer?.name || "")
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("") +
                                "%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {proposal.freelancer?.name ||
                                  "Unknown Freelancer"}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {proposal.freelancer?.title || "Freelancer"}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              <span className="text-sm font-medium">
                                {proposal.freelancer?.rating?.toFixed(1) ||
                                  "N/A"}
                              </span>
                            </div>
                          </div>

                          <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-gray-500" />
                              <span>
                                ₹
                                {proposal.bidAmount ||
                                  proposal.price ||
                                  "Not specified"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span>
                                {proposal.estimatedTime || "Not specified"}
                              </span>
                            </div>
                          </div>

                          <div className="mt-3">
                            <h4 className="text-sm font-medium text-gray-700 mb-1">
                              Proposal
                            </h4>
                            <p className="text-sm text-gray-600">
                              {proposal.message ||
                                proposal.description ||
                                "No proposal message provided"}
                            </p>
                          </div>

                          <div className="mt-4 flex justify-end gap-2">
                            <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                              <Mail className="h-4 w-4 inline mr-1" />
                              Message
                            </button>
                            <button
                              onClick={() => {
                                setSelectedProposal(proposal);
                                setShowHireDialog(true);
                              }}
                              className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary/90"
                            >
                              Hire
                            </button>
                            {/* Add HireDialog */}
                            {showHireDialog && selectedProposal && (
                              <HireDialog
                                job={job}
                                proposal={selectedProposal}
                                onClose={() => setShowHireDialog(false)}
                                onHire={handleHire}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  Dialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  ProposalsDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    job: PropTypes.object,
    proposals: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
  };

  const { user } = useAuth();

  // Loading state component
  const LoadingState = () => (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );

  // Error state component
  const ErrorState = ({ message }) => (
    <div className="p-4 bg-red-50 text-red-600 rounded-md">
      <p>Error: {message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-2 text-sm text-red-600 hover:text-red-800"
      >
        Try again
      </button>
    </div>
  );

  ErrorState.propTypes = {
    message: PropTypes.string.isRequired,
  };

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
          {/* Loading state */}
          {(loading.ongoing || loading.completed || loading.proposals) && (
            <LoadingState />
          )}

          {/* Error states */}
          {error.ongoing && activeTab === "ongoing" && (
            <ErrorState message={error.ongoing} />
          )}
          {error.completed && activeTab === "completed" && (
            <ErrorState message={error.completed} />
          )}
          {error.proposals && activeTab === "proposals" && (
            <ErrorState message={error.proposals} />
          )}

          {/* Ongoing Projects Tab */}
          {activeTab === "ongoing" && !loading.ongoing && !error.ongoing && (
            <div className="grid gap-6 md:grid-cols-2">
              {ongoing.length > 0 ? (
                ongoing.map((project) => (
                  <div
                    key={project.id}
                    className="rounded-lg bg-white shadow-sm overflow-hidden"
                  >
                    <div className="p-4 border-b-gray-300 border-b">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {project.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-2">
                            {project.description}
                          </p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border-primary/20">
                          {project.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="relative h-8 w-8 rounded-full overflow-hidden">
                            <img
                              src={
                                project.freelancer?.avatar || "/placeholder.svg"
                              }
                              alt={project.freelancer?.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.src =
                                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Crect width='32' height='32' fill='%23d1d5db'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fontFamily='system-ui' fontSize='12' fill='%236b7280'%3E" +
                                  (project.freelancer?.name || "")
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("") +
                                  "%3C/text%3E%3C/svg%3E";
                              }}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {project.freelancer?.name}
                            </p>
                            <p className="text-xs text-gray-500">Freelancer</p>
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
                            <p className="font-medium">
                              {new Date(project.deadline).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Budget</p>
                            <p className="font-medium">${project.budget}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t-gray-300 border-t flex justify-between">
                      <button
                        className="py-1 px-3 rounded-md text-gray-700 text-sm hover:bg-gray-50 focus:outline-none"
                        onClick={() => onMessageFreelancer(project)}
                      >
                        Message
                      </button>
                      <button
                        className="py-1 px-3 bg-primary text-white rounded-md text-sm hover:bg-primary/90 focus:outline-none"
                        onClick={() => handleViewDetails(project)}
                      >
                        Manage Project
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-10 text-gray-500">
                  No ongoing projects found
                </div>
              )}
            </div>
          )}

          {/* Completed Projects Tab */}
          {activeTab === "completed" &&
            !loading.completed &&
            !error.completed && (
              <div className="grid gap-6 md:grid-cols-2">
                {completed.length > 0 ? (
                  completed.map((project) => (
                    <div
                      key={project.id}
                      className="rounded-lg bg-white shadow-sm overflow-hidden"
                    >
                      <div className="p-4 border-b-gray-300 border-b">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">
                              {project.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                              {project.description}
                            </p>
                          </div>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < (project.rating || 0)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300 "
                                }`}
                              />
                            ))}
                            <span className="text-xs text-gray-500 ml-1">
        ({project.rating?.toFixed(1)})
      </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <div className="relative h-8 w-8 rounded-full overflow-hidden">
                              <img
                                src={
                                  project.freelancer?.avatar ||
                                  "/placeholder.svg"
                                }
                                alt={project.freelancer?.name}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  e.target.src =
                                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Crect width='32' height='32' fill='%23d1d5db'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fontFamily='system-ui' fontSize='12' fill='%236b7280'%3E" +
                                    (project.freelancer?.name || "")
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("") +
                                    "%3C/text%3E%3C/svg%3E";
                                }}
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {project.freelancer?.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                Freelancer
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500 text-xs">
                                Completed On
                              </p>
                              <p className="font-medium">
                                {new Date(
                                  project.completedDate
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">Budget</p>
                              <p className="font-medium">${project.budget}</p>
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
                          onClick={() => handleViewDetails(project)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-10 text-gray-500">
                    No completed projects found
                  </div>
                )}
              </div>
            )}

          {/* Job Postings Tab */}
          {activeTab === "proposals" &&
            !loading.proposals &&
            !error.proposals && (
              <div className="grid gap-6 md:grid-cols-2">
                {proposals.length > 0 ? (
                  proposals.map((job) => {
                    // Calculate number of proposals
                    const proposalCount = job.proposalCount;

                    // Format dates
                    const postedDate = job.createdAt
                      ? new Date(job.createdAt).toLocaleDateString()
                      : "Not specified";
                    const deadlineDate = job.deadline
                      ? new Date(job.deadline).toLocaleDateString()
                      : "Not specified";

                    // Format budget
                    let budgetDisplay = "Not specified";
                    if (job.budget) {
                      if (typeof job.budget === "object") {
                        budgetDisplay = `$${job.budget.min || "0"} - $${
                          job.budget.max || "0"
                        }`;
                      } else if (typeof job.budget === "string") {
                        budgetDisplay = job.budget;
                      } else if (typeof job.budget === "number") {
                        budgetDisplay = `$${job.budget}`;
                      }
                    }

                    return (
                      <div
                        key={job.id}
                        className="rounded-lg bg-white shadow-sm overflow-hidden"
                      >
                        <div className="p-4 border-b-gray-300 border-b">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold">
                                {job.name || "Untitled Project"}
                              </h3>
                              <p className="text-sm text-gray-500 mt-2">
                                {job.description || "No description provided"}
                              </p>
                            </div>
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                              {proposalCount}{" "}
                              {proposalCount === 1 ? "Proposal" : "Proposals"}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500 text-xs">Budget</p>
                                <p className="font-medium">{budgetDisplay}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs">
                                  Deadline
                                </p>
                                <p className="font-medium">{deadlineDate}</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">Posted</p>
                              <p className="text-sm">{postedDate}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 border-t-gray-300 border-t flex justify-between">
                          {/* <button
                            className="py-1 px-3 rounded-md text-gray-700 text-sm hover:bg-gray-50 focus:outline-none"
                            onClick={() => onEditJob(job)}
                          >
                            Edit Job
                          </button> */}
                          <button
                            className="py-1 px-3 bg-primary text-white rounded-md text-sm hover:bg-primary/90 focus:outline-none"
                            onClick={() => handleViewProposals(job)}
                          >
                            View Proposals
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="rounded-lg bg-white shadow-sm flex flex-col items-center justify-center p-6 col-span-2">
                    <div className="rounded-full bg-primary/10 p-3 mb-4">
                      <PlusCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      No Job Postings Found
                    </h3>
                    <p className="text-center text-gray-500 mb-4">
                      Create a new project to find the perfect freelancer for
                      your needs.
                    </p>
                    <button
                      className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 font-medium"
                      onClick={() => setShowDialog(true)}
                    >
                      Post a Job
                    </button>
                  </div>
                )}
                {proposals.length > 0 && (
                  <div className="rounded-lg bg-white shadow-sm flex flex-col items-center justify-center p-6">
                    <div className="rounded-full bg-primary/10 p-3 mb-4">
                      <PlusCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      Post a New Job
                    </h3>
                    <p className="text-center text-gray-500 mb-4">
                      Create a new project to find the perfect freelancer for
                      your needs.
                    </p>
                    <button
                      className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 font-medium"
                      onClick={() => setShowDialog(true)}
                    >
                      Post a Job
                    </button>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>

      {/* Enhanced Dialog for posting a new job */}
      <Dialog isOpen={showDialog} onClose={() => setShowDialog(false)}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Post a New Job</h2>
            <button
              onClick={() => setShowDialog(false)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              const jobData = {
                name: e.target.name.value,
                description: e.target.description.value,
                client: user.id,
                budget: {
                  min: parseFloat(e.target.budgetMin.value),
                  max: parseFloat(e.target.budgetMax.value),
                },
                deadline: e.target.deadline.value,
                skills: e.target.skills.value
                  .split(",")
                  .map((skill) => skill.trim()),
              };
              handlePostJob(jobData);
            }}
          >
            <div className="space-y-4">
              {/* Job Title */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Job Title*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g. Website Redesign"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Job Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Describe the job requirements in detail..."
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget Range*
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="number"
                      id="budgetMin"
                      name="budgetMin"
                      placeholder="Minimum ($)"
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      id="budgetMax"
                      name="budgetMax"
                      placeholder="Maximum ($)"
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Deadline */}
              <div>
                <label
                  htmlFor="deadline"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Deadline*
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Required Skills */}
              <div>
                <label
                  htmlFor="skills"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Required Skills
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  placeholder="e.g. React, Node.js, UI Design (comma separated)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Form Actions */}
              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowDialog(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                >
                  Post Job
                </button>
              </div>
            </div>
          </form>
        </div>
      </Dialog>

      <ProposalsDialog
        isOpen={showProposalsDialog}
        onClose={() => setShowProposalsDialog(false)}
        job={currentJob}
        proposals={currentJobProposals}
        loading={loading.jobProposals}
        error={error.jobProposals}
      />

{showManagementModal && selectedProject && (
  <ProjectManagementModal
  project={selectedProject}
  milestones={selectedProject?.milestones || []}
  onClose={() => setShowManagementModal(false)}
  onMilestoneAdded={handleMilestoneAdded}
  onUpdateProgress={handleUpdateProgress}
  files={files} // Pass files as prop
  onUploadFile={handleUploadFile}
  onSendMessage={handleSendMessage}
  onFetchFiles={handleFetchFiles} // Pass the fetch function
  onCompleteProject={handleCompleteProject} // Add this prop
/>
)}
    </div>
  );
}

// PropTypes validation for the ProjectManagement component
C_ProjectManagement.propTypes = {
  initialTab: PropTypes.oneOf(["ongoing", "completed", "proposals"]),
  onMessageFreelancer: PropTypes.func,
  onViewDetails: PropTypes.func,
  onViewFiles: PropTypes.func,
  onViewProposals: PropTypes.func,
  onEditJob: PropTypes.func,
};

export default C_ProjectManagement;
