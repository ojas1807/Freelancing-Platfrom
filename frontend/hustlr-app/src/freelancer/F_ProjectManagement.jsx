import { useState, useEffect } from "react";
import {
  Briefcase,
  CheckCircle,
  Clock,
  Filter,
  Search,
  Star,
} from "lucide-react";
import PropTypes from "prop-types";
import { ProjectServices, JobServices } from "../services/projectServices";

function FreelancerProjectManagement({
  initialTab = "ongoing",
  ongoingProjects = [],
  completedProjects = [],
  availableJobs = [],
  // onApplyForJob = () => {},
  onMessageClient = () => {},
  onViewJobDetails = () => {},
  onViewFiles = () => {},
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });
  const [appliedJobIds, setAppliedJobIds] = useState([]);

  // State for projects and jobs
  const [ongoing, setOngoing] = useState(ongoingProjects);
  const [completed, setCompleted] = useState(completedProjects);
  const [jobs, setJobs] = useState(availableJobs);

  const [loading, setLoading] = useState({
    jobs: false,
    projects: false,
  });
  const [error, setError] = useState(null);

  // Then update your useEffect:
  useEffect(() => {
    const fetchData = async () => {
      setLoading({ jobs: true, projects: true });
      setError(null);

      try {
        // Fetch jobs
        const jobsData = await JobServices.getAvailableJobs();
        setJobs(Array.isArray(jobsData) ? jobsData : []);
        setLoading((prev) => ({ ...prev, jobs: false }));

        // Fetch projects
        const projects = await ProjectServices.getFreelancerProjects();
        setOngoing(projects.ongoingProjects || []);
        setCompleted(projects.completedProjects || []);
        setLoading((prev) => ({ ...prev, projects: false }));
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading({ jobs: false, projects: false });
        setJobs([]);
        setOngoing([]);
        setCompleted([]);
      }
    };

    fetchData();
  }, []);

  // Handle job application submission
  const handleApplyForJob = async (applicationData) => {
    setApplicationStatus({
      submitting: true,
      success: false,
      error: null,
    });

    try {
      // Submit proposal using ProjectServices
      await JobServices.submitProposal(selectedJob.id, {
        message: applicationData.message,
        bid: parseFloat(applicationData.bid),
        timeline: applicationData.timeline,
      });

      // Track the applied job ID
    setAppliedJobIds(prev => [...prev, selectedJob.id]);

      setApplicationStatus({
        submitting: false,
        success: true,
        error: null,
      });

      // Refresh jobs list to reflect the new proposal
      const updatedJobs = await JobServices.getAvailableJobs();
      setJobs(updatedJobs);

      // Close dialog after 1.5 seconds
      setTimeout(() => {
        setShowApplicationDialog(false);
        setApplicationStatus({
          submitting: false,
          success: false,
          error: null,
        });
      }, 1500);
    } catch (err) {
      console.error("Proposal submission error:", err);
      setApplicationStatus({
        submitting: false,
        success: false,
        error: err.message || "Failed to submit proposal",
      });
    }
  };

  // Dialog component
  const ApplicationDialog = ({ isOpen, onClose, job }) => {
    if (!isOpen || !job) return null;

    return (
      <div
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Apply for {job.name}</h2>
              <p className="text-sm text-gray-500">
                Submit your proposal for this job opportunity.
              </p>
            </div>

            {applicationStatus.success ? (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">
                  Application Submitted!
                </h3>
                <p className="text-sm text-gray-500">
                  Your proposal has been sent to the client.
                </p>
              </div>
            ) : (
              <>
                {applicationStatus.error && (
                  <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                    {applicationStatus.error}
                  </div>
                )}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="proposal-message"
                      className="text-sm font-medium"
                    >
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
                    <label
                      htmlFor="proposal-bid"
                      className="text-sm font-medium"
                    >
                      Your Bid
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">₹</span>
                      <input
                        id="proposal-bid"
                        type="number"
                        placeholder="Amount"
                        min="1"
                        step="0.01"
                        className="w-full py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="proposal-timeline"
                      className="text-sm font-medium"
                    >
                      Estimated Timeline
                    </label>
                    <input
                      id="proposal-timeline"
                      placeholder="E.g., 2 weeks, 1 month"
                      className="w-full py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="proposal-attachments"
                      className="text-sm font-medium"
                    >
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
                    type="button"
                    className="py-2 px-4 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none"
                    onClick={onClose}
                    disabled={applicationStatus.submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none disabled:opacity-70"
                    onClick={() => {
                      const message =
                        document.getElementById("proposal-message").value;
                      const bid = document.getElementById("proposal-bid").value;
                      const timeline =
                        document.getElementById("proposal-timeline").value;

                      if (!message || !bid || !timeline) {
                        setApplicationStatus({
                          submitting: false,
                          success: false,
                          error: "Please fill all required fields",
                        });
                        return;
                      }

                      handleApplyForJob({
                        message,
                        bid,
                        timeline,
                      });
                    }}
                    disabled={applicationStatus.submitting}
                  >
                    {applicationStatus.submitting
                      ? "Submitting..."
                      : "Submit Proposal"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  ApplicationDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    job: PropTypes.object,
  };

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
                                "%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {project.client}
                          </p>
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
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Crect width='32' height='32' fill='%23d1d5db'/%3E%3Ctext x='50%25' y='50%25' dominant Baseline='middle' textAnchor='middle' fontFamily='system-ui' fontSize='12' fill='%236b7280'%3E" +
                                project.client
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("") +
                                "%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {project.client}
                          </p>
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
              {loading.jobs ? (
                <div className="col-span-2 flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                  <span className="ml-2">Loading jobs...</span>
                </div>
              ) : error ? (
                <div className="col-span-2 text-red-500 p-4 text-center">
                  Error loading jobs: {error}
                </div>
              ) : jobs.length > 0 ? (
                jobs.map((job) => (
                  <div
                    key={job.id || job._id}
                    className="rounded-lg bg-white shadow-sm overflow-hidden"
                  >
                    <div className="p-4 border-b-gray-300 border-b">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">{job.name}</h3>
                          <p className="text-sm text-gray-500 mt-2">
                            {job.description}
                          </p>
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
                                  "%3C/text%3E%3C/svg%3E";
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
                        className="py-1 px-3 rounded-md text-gray-700 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        onClick={() => onViewJobDetails(job)}
                      >
                        View Details
                      </button>
                      <button 
  className={`py-1 px-3 rounded-md text-sm focus:outline-none ${
    job.hasApplied || appliedJobIds.includes(job.id)
      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
      : "bg-primary text-white hover:bg-primary/90"
  }`}
  onClick={() => {
    if (!job.hasApplied && !appliedJobIds.includes(job.id)) {
      setSelectedJob(job);
      setShowApplicationDialog(true);
    }
  }}
  disabled={job.hasApplied || appliedJobIds.includes(job.id)}
>
  {job.hasApplied || appliedJobIds.includes(job.id) ? 'Applied' : 'Apply Now'}
</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center p-8">
                  <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">
                    No jobs available
                  </h3>
                  <p className="text-sm text-gray-500">
                    Check back later for new postings
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Dialog for applying to a job */}
      <ApplicationDialog
        isOpen={showApplicationDialog}
        onClose={() => {
          setShowApplicationDialog(false);
          setApplicationStatus({
            submitting: false,
            success: false,
            error: null,
          });
        }}
        job={selectedJob}
      />
    </div>
  );
}

// PropTypes validation for the FreelancerProjectManagement component
FreelancerProjectManagement.propTypes = {
  initialTab: PropTypes.oneOf(["ongoing", "completed", "jobs"]),
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
      hasApplied: PropTypes.bool,
    })
  ),
  onMessageClient: PropTypes.func,
  onViewJobDetails: PropTypes.func,
  onViewFiles: PropTypes.func,
};

export default FreelancerProjectManagement;
