import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  X,
  DollarSign,
  Star,
  Clock,
  MapPin,
  ChevronDown,
  CheckCircle,
} from "lucide-react";
import PropTypes from "prop-types";
import {JobServices} from "../services/projectServices"; // Import your job services
import Breadcrumb from "../Breadcrumb";

function FindWorkPage() {
  // State for jobs and filtered jobs
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });
  const [appliedJobIds, setAppliedJobIds] = useState([]);

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
                      <span className="text-sm">$</span>
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


  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [budgetRange, setBudgetRange] = useState([500, 2000]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(3); // Number of jobs to show per page
  const [sortBy, setSortBy] = useState("newest"); // Default sorting option
  // Fetch jobs from API
  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        const jobsData = await JobServices.getAvailableJobs();
        // console.log("Jobs Data:", jobsData);
        setJobs(jobsData || []);
        setFilteredJobs(jobsData || []);
        setLoading(false);
        
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err.message || "Failed to load jobs");
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  // Get current jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  // console.log("Current Jobs:", currentJobs);

  // Extract all unique skills from jobs
  const allSkills = Array.from(
    new Set(jobs.flatMap(job => job.skills.split(',').map(skill => skill.trim())))
  ).sort();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Apply filters
  useEffect(() => {
    let result = [...jobs];
    // console.log("Jobs:", jobs);
    // console.log("Filtered Jobs:", filteredJobs);

    // Search query filter
    if (searchQuery) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter((job) => {
        const jobName = job.name ? job.name.toLowerCase() : "";
        const jobDescription = job.description ? job.description.toLowerCase() : "";
        const jobSkills = job.skills ? job.skills.toLowerCase() : "";
    
        return (
          jobName.includes(query) ||
          jobDescription.includes(query) ||
          jobSkills.includes(query)
        );
      });
    }

    // Skills filter
    if (selectedSkills.length > 0) {
      result = result.filter((job) =>
        selectedSkills.some(skill => 
          job.skills.split(',').map(s => s.trim()).includes(skill)
        )
      );
    }

    // Budget range filter
  result = result.filter((job) => {
    const jobBudget = job.budget.replace(/[^\d,-]/g, ""); // Remove non-digit characters except comma and dash
    const [minStr, maxStr] = jobBudget.split("-").map((str) => str.trim());

    const min = parseInt(minStr.replace(/,/g, "")) || 0;
    const max = parseInt(maxStr?.replace(/,/g, "") || min); // Handle cases where there's no max

    return (
      (min >= budgetRange[0] && min <= budgetRange[1]) ||
      (max >= budgetRange[0] && max <= budgetRange[1])
    );
  });

    // Sorting logic
  if (sortBy === "newest") {
    result.sort((a, b) => new Date(b.posted) - new Date(a.posted));
  } else if (sortBy === "oldest") {
    result.sort((a, b) => new Date(a.posted) - new Date(b.posted));
  } else if (sortBy === "budget-high") {
    result.sort((a, b) => {
      const budgetA = parseInt(a.budget.replace(/[^\d]/g, "")) || 0;
      const budgetB = parseInt(b.budget.replace(/[^\d]/g, "")) || 0;
      return budgetB - budgetA;
    });
  } else if (sortBy === "budget-low") {
    result.sort((a, b) => {
      const budgetA = parseInt(a.budget.replace(/[^\d]/g, "")) || 0;
      const budgetB = parseInt(b.budget.replace(/[^\d]/g, "")) || 0;
      return budgetA - budgetB;
    });
  }

    setFilteredJobs(result);
  }, [searchQuery, selectedSkills, budgetRange, jobs, sortBy, currentPage]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSkills([]);
    setBudgetRange([500, 2000]);
  };

  // Toggle bookmark (if you want to implement this later)
  const toggleBookmark = (id) => {
    // Implement bookmark functionality if needed
  };

  // Toggle skill selection
  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Format budget for display in slider
  const formatBudget = (value) => {
    return `$${value.toLocaleString()}`;
  };

  // Extract min and max budget from job
  const getBudgetValues = (budgetStr) => {
    const nums = budgetStr.replace(/[^\d,-]/g, "").split('-').map(num => parseInt(num.replace(/,/g, "")));
    return {
      min: nums[0] || 0,
      max: nums[1] || nums[0] || 0
    };
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#422AD5]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col items-center justify-center p-8 text-center">
          <div className="rounded-full bg-red-100 p-3 mb-4">
            <X className="h-6 w-6 text-red-500" />
          </div>
          <h3 className="text-lg font-medium mb-2">Error loading jobs</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            className="rounded-md border border-gray-300 py-2 px-4 text-sm font-medium hover:bg-gray-50"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Breadcrumb />
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-[#422AD5]">Find Work</h1>
          <p className="text-gray-500">
            Browse and apply to the latest freelance opportunities
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                placeholder="Search for jobs, skills, or keywords"
                className="pl-9 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#422AD5] focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <button
                className="md:hidden flex items-center gap-2 rounded-md border border-gray-300 py-2 px-4 text-sm font-medium hover:bg-gray-50"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>
              <button
                className={`hidden md:flex items-center gap-2 rounded-md py-2 px-4 text-sm font-medium ${
                  selectedSkills.length > 0 ||
                  budgetRange[0] !== 500 ||
                  budgetRange[1] !== 2000
                    ? "bg-[#422AD5] text-white hover:bg-[#3620b1]"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
                onClick={clearFilters}
              >
                <X className="h-4 w-4" />
                Clear Filters
              </button>
            </div>
          </div>

          {/* Applied Filters */}
          {selectedSkills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1 pl-2 pr-1 py-1 rounded-full bg-gray-100 text-sm"
                >
                  Skill: {skill}
                  <button
                    className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                    onClick={() => toggleSkill(skill)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {selectedSkills.length > 0 && (
                <button
                  className="h-7 px-2 text-sm text-[#422AD5] hover:bg-gray-100 rounded-md"
                  onClick={clearFilters}
                >
                  Clear All
                </button>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="text-lg font-semibold flex items-center justify-between">
                  <span>Filters</span>
                  <button
                    className="h-7 px-2 text-sm text-[#422AD5] hover:bg-gray-100 rounded-md"
                    onClick={clearFilters}
                  >
                    Clear All
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {/* Budget Range Filter */}
                <div className="space-y-4">
                  <h3 className="font-medium">Budget Range</h3>
                  <div className="px-2">
                    <input
                      type="range"
                      min="500"
                      max="2000"
                      step="100"
                      value={budgetRange[0]}
                      onChange={(e) =>
                        setBudgetRange([Number(e.target.value), budgetRange[1]])
                      }
                      className="w-full my-6 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      type="range"
                      min="500"
                      max="2000"
                      step="100"
                      value={budgetRange[1]}
                      onChange={(e) =>
                        setBudgetRange([budgetRange[0], Number(e.target.value)])
                      }
                      className="w-full my-6 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">
                        {formatBudget(budgetRange[0])}
                      </span>
                      <span className="text-sm">
                        {formatBudget(budgetRange[1])}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skills Filter */}
                <div className="space-y-2">
                  <h3 className="font-medium">Skills</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {allSkills.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`skill-${skill}`}
                          checked={selectedSkills.includes(skill)}
                          onChange={() => toggleSkill(skill)}
                          className="h-4 w-4 rounded border-gray-300 text-[#422AD5] focus:ring-[#422AD5]"
                        />
                        <label
                          htmlFor={`skill-${skill}`}
                          className="text-sm cursor-pointer"
                        >
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters Sidebar - Mobile */}
          {showMobileFilters && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden">
              <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white p-6 shadow-lg overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button
                    className="rounded-md p-1 hover:bg-gray-100"
                    onClick={() => setShowMobileFilters(false)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Budget Range Filter */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Budget Range</h3>
                    <div className="px-2">
                      <input
                        type="range"
                        min="500"
                        max="2000"
                        step="100"
                        value={budgetRange[0]}
                        onChange={(e) =>
                          setBudgetRange([
                            Number(e.target.value),
                            budgetRange[1],
                          ])
                        }
                        className="w-full my-6 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <input
                        type="range"
                        min="500"
                        max="2000"
                        step="100"
                        value={budgetRange[1]}
                        onChange={(e) =>
                          setBudgetRange([
                            budgetRange[0],
                            Number(e.target.value),
                          ])
                        }
                        className="w-full my-6 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          {formatBudget(budgetRange[0])}
                        </span>
                        <span className="text-sm">
                          {formatBudget(budgetRange[1])}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Skills Filter */}
                  <div className="space-y-2">
                    <h3 className="font-medium">Skills</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                      {allSkills.map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={`mobile-skill-${skill}`}
                            checked={selectedSkills.includes(skill)}
                            onChange={() => toggleSkill(skill)}
                            className="h-4 w-4 rounded border-gray-300 text-[#422AD5] focus:ring-[#422AD5]"
                          />
                          <label
                            htmlFor={`mobile-skill-${skill}`}
                            className="text-sm cursor-pointer"
                          >
                            {skill}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      className="flex-1 rounded-md border border-gray-300 py-2 text-sm font-medium hover:bg-gray-50"
                      onClick={clearFilters}
                    >
                      Clear All
                    </button>
                    <button
                      className="flex-1 rounded-md bg-[#422AD5] py-2 text-sm font-medium text-white hover:bg-[#3620b1]"
                      onClick={() => setShowMobileFilters(false)}
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Job Listings */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {filteredJobs.length}{" "}
                {filteredJobs.length === 1 ? "Job" : "Jobs"} Found
              </h2>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-[180px] rounded-md border border-gray-300 py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#422AD5] focus:border-transparent appearance-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="budget-high">Budget: High to Low</option>
                  <option value="budget-low">Budget: Low to High</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col items-center justify-center p-8 text-center">
                <div className="rounded-full bg-gray-100 p-3 mb-4">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  className="rounded-md border border-gray-300 py-2 px-4 text-sm font-medium hover:bg-gray-50"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {currentJobs.map((job) => {
                  const budgetValues = getBudgetValues(job.budget);
                  
                  return (
                    <div
                      key={job.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-6 pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold hover:text-[#422AD5] transition-colors">
                              <a href="#">{job.name}</a>
                            </h3>
                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {job.posted}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                Remote
                              </span>
                            </div>
                          </div>
                          <button
                            className={`p-1 rounded-md hover:bg-gray-100 text-gray-400`}
                            onClick={() => toggleBookmark(job.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-5 w-5"
                            >
                              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="px-6 pb-3">
                        <p className="text-gray-500 line-clamp-2 mb-4">
                          {job.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {job.skills.split(',').map((skill, index) => (
                            <span
                              key={index}
                              className="rounded-sm border border-gray-300 px-2 py-0.5 text-sm font-normal bg-gray-50"
                            >
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-green-100 p-1.5">
                              <DollarSign className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{job.budget}</p>
                              <p className="text-xs text-gray-500">Budget</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-blue-100 p-1.5">
                              <Clock className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {job.deadline}
                              </p>
                              <p className="text-xs text-gray-500">Deadline</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-gray-200"></div>
                      <div className="flex justify-between py-3 px-6">
                        <div className="text-sm text-gray-500">
                          <span className="font-medium text-gray-900">
                          {job.proposals || job.proposals === 0 ? job.proposals : "0"}
                          </span>{" "}
                          proposals so far
                        </div>
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
                    
                  );
                  
                })}

              </div>
            )}
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

            {/* Pagination */}
            {filteredJobs.length > jobsPerPage && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="rounded-md border border-gray-300 p-2 disabled:opacity-50"
                  >
                    <ChevronDown className="h-4 w-4 rotate-90" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`rounded-md border border-gray-300 py-1 px-3 text-sm font-medium ${
                        currentPage === i + 1
                          ? "bg-[#422AD5] text-white"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="rounded-md border border-gray-300 p-2 disabled:opacity-50"
                  >
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindWorkPage;