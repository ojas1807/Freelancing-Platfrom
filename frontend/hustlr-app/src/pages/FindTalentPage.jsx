import { useState, useEffect } from "react";
import { Search, Filter, X, DollarSign, Star, Clock, MapPin, ChevronDown } from "lucide-react";
import axios from "axios";

function FindTalentPage() {
  // Freelancer data states
  const [freelancers, setFreelancers] = useState([]);
  const [recommendedFreelancers, setRecommendedFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendationsLoading, setRecommendationsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [rateRange, setRateRange] = useState([20, 100]);
  const [experienceLevel, setExperienceLevel] = useState("");
  const [availability, setAvailability] = useState("");
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState("rating");
  const [showRecommended, setShowRecommended] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [freelancersPerPage] = useState(4);
  const currentUserId = localStorage.getItem("userID") || null; // Replace with actual user ID from auth context

  // Fetch all freelancers on component mount
  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/freelancers');
        
        const processedData = response.data.map(freelancer => ({
          ...freelancer,
          name: freelancer.name || `User ${freelancer.userId?.slice(-4) || '0000'}`,
          bio: freelancer.description || `Experienced ${freelancer.profileTitle || 'freelancer'}`,
          hourlyRate: freelancer.hourlyRate || Math.floor(Math.random() * 50) + 30,
          rating: freelancer.rating || (Math.random() * 2 + 3).toFixed(1),
          projects: freelancer.completedProjects || Math.floor(Math.random() * 5) + 1,
          freelancerLevel: freelancer.freelancerLevel || ['beginner', 'intermediate', 'experienced'][Math.floor(Math.random() * 3)],
          workExperience: freelancer.workExperience || []
        }));
        
        setFreelancers(processedData);
        setFilteredFreelancers(processedData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch freelancers:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, []);

  // Fetch recommended freelancers
  const fetchRecommendedFreelancers = async () => {
    try {
      setRecommendationsLoading(true);
      // In a real app, get current user ID from auth context
      const currentUserId = localStorage.getItem("userID");
      // Remove any quotes that might be present
    const cleanUserId = currentUserId.replace(/"/g, '');
      console.log("This is userID: ",cleanUserId) // Replace with actual user ID
      const response = await axios.get(`http://127.0.0.1:5000/api/recommended-freelancers/${cleanUserId}`
      );
      
      const processedData = response.data.map(freelancer => ({
        ...freelancer,
        name: freelancer.name || `User ${freelancer.userId?.slice(-4) || '0000'}`,
        bio: freelancer.description || `Recommended ${freelancer.profileTitle || 'freelancer'}`,
        hourlyRate: freelancer.hourlyRate || Math.floor(Math.random() * 50) + 30,
        rating: freelancer.rating || (Math.random() * 2 + 3).toFixed(1),
        projects: freelancer.completedProjects || Math.floor(Math.random() * 5) + 1,
        freelancerLevel: freelancer.freelancerLevel || ['beginner', 'intermediate', 'experienced'][Math.floor(Math.random() * 3)],
        workExperience: freelancer.workExperience || []
      }));
      
      setRecommendedFreelancers(processedData);
      setRecommendationsLoading(false);
    } catch (err) {
      console.error("Failed to fetch recommended freelancers:", err);
      setRecommendationsLoading(false);
    }
  };

  // Toggle between all and recommended freelancers
  const toggleView = () => {
    if (!showRecommended) {
      fetchRecommendedFreelancers();
    }
    setShowRecommended(!showRecommended);
    setCurrentPage(1);
  };

  // Get current freelancers for pagination
  const displayFreelancers = showRecommended ? recommendedFreelancers : filteredFreelancers;
  const indexOfLastFreelancer = currentPage * freelancersPerPage;
  const indexOfFirstFreelancer = indexOfLastFreelancer - freelancersPerPage;
  const currentFreelancers = displayFreelancers.slice(indexOfFirstFreelancer, indexOfLastFreelancer);
  const totalPages = Math.ceil(displayFreelancers.length / freelancersPerPage);

  // All available skills from freelancers
  const allSkills = Array.from(new Set(
    freelancers.flatMap(f => Array.isArray(f.skills) ? f.skills : [])
  )).sort();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Filter logic
  useEffect(() => {
    if (loading) return;
    
    let result = [...freelancers];
    
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(f => 
        (f.name?.toLowerCase().includes(query)) ||
        (f.profileTitle?.toLowerCase().includes(query)) ||
        (Array.isArray(f.skills) && f.skills.some(skill => 
          typeof skill === 'string' && skill.toLowerCase().includes(query)))
      );
    }

    // Skills filter
    if (selectedSkills.length > 0) {
      result = result.filter(f => 
        Array.isArray(f.skills) && 
        selectedSkills.some(skill => f.skills.includes(skill))
      );
    }

    // Price range filter
    if (rateRange[0] !== 20 || rateRange[1] !== 100) {
      result = result.filter(f => {
        const rate = f.hourlyRate || 0;
        return rate >= rateRange[0] && rate <= rateRange[1];
      });
    }

    // Experience level filter
    if (experienceLevel) {
      result = result.filter(f => {
        if (experienceLevel === "junior" && f.freelancerLevel === "beginner") return true;
        if (experienceLevel === "mid" && f.freelancerLevel === "intermediate") return true;
        if (experienceLevel === "senior" && f.freelancerLevel === "experienced") return true;
        
        if (!Array.isArray(f.workExperience) || f.workExperience.length === 0) return false;
        
        const yearsOfExperience = calculateTotalYearsExperience(f.workExperience);
        
        if (experienceLevel === "junior") return yearsOfExperience <= 2;
        if (experienceLevel === "mid") return yearsOfExperience > 2 && yearsOfExperience <= 5;
        if (experienceLevel === "senior") return yearsOfExperience > 5;
        
        return true;
      });
    }

    // Availability filter
    if (availability) {
      // Placeholder for availability filtering
    }

    // Apply sorting
    if (sortBy === "rating") {
      result.sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0));
    } else if (sortBy === "rate-low") {
      result.sort((a, b) => (a.hourlyRate || 0) - (b.hourlyRate || 0));
    } else if (sortBy === "rate-high") {
      result.sort((a, b) => (b.hourlyRate || 0) - (a.hourlyRate || 0));
    } else if (sortBy === "experience") {
      result.sort((a, b) => {
        const aExp = Array.isArray(a.workExperience) ? calculateTotalYearsExperience(a.workExperience) : 0;
        const bExp = Array.isArray(b.workExperience) ? calculateTotalYearsExperience(b.workExperience) : 0;
        return bExp - aExp;
      });
    }

    setFilteredFreelancers(result);
    setCurrentPage(1);
  }, [searchQuery, selectedSkills, experienceLevel, availability, freelancers, loading, rateRange, sortBy]);

  // Helper functions
  const calculateTotalYearsExperience = (workExperience) => {
    if (!Array.isArray(workExperience) || workExperience.length === 0) return 0;
    const currentYear = new Date().getFullYear();
    return workExperience.reduce((total, exp) => {
      const startYear = exp.startDate?.year || 0;
      const endYear = exp.currentlyWorking 
        ? currentYear
        : exp.endDate?.year || currentYear;
      return total + (endYear - startYear);
    }, 0);
  };

  const calculateExperience = (workExperience) => {
    const totalYears = calculateTotalYearsExperience(workExperience);
    return `${totalYears} ${totalYears === 1 ? 'year' : 'years'}`;
  };

  const formatRate = (value) => `₹${value}/hr`;

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSkills([]);
    setRateRange([20, 100]);
    setExperienceLevel("");
    setAvailability("");
  };

  const toggleBookmark = (id) => {
    console.log("Bookmark toggled for freelancer:", id);
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
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">Error loading freelancers: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-[#422AD5]">Find Talent</h1>
          <p className="text-gray-500">Browse and connect with skilled freelancers</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                placeholder="Search for freelancers, skills, or keywords"
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
                  searchQuery ||
                  selectedSkills.length > 0 ||
                  rateRange[0] !== 20 ||
                  rateRange[1] !== 100 ||
                  experienceLevel ||
                  availability
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
          {(searchQuery || selectedSkills.length > 0 || experienceLevel || availability) && (
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <span className="flex items-center gap-1 pl-2 pr-1 py-1 rounded-full bg-gray-100 text-sm">
                  Search: {searchQuery}
                  <button className="ml-1 rounded-full hover:bg-gray-200 p-0.5" onClick={() => setSearchQuery("")}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {experienceLevel && (
                <span className="flex items-center gap-1 pl-2 pr-1 py-1 rounded-full bg-gray-100 text-sm">
                  Experience: {experienceLevel}
                  <button
                    className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                    onClick={() => setExperienceLevel("")}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {availability && (
                <span className="flex items-center gap-1 pl-2 pr-1 py-1 rounded-full bg-gray-100 text-sm">
                  Availability: {availability}
                  <button
                    className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                    onClick={() => setAvailability("")}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedSkills.map((skill) => (
                <span key={skill} className="flex items-center gap-1 pl-2 pr-1 py-1 rounded-full bg-gray-100 text-sm">
                  Skill: {skill}
                  <button className="ml-1 rounded-full hover:bg-gray-200 p-0.5" onClick={() => toggleSkill(skill)}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {(searchQuery || selectedSkills.length > 0 || experienceLevel || availability) && (
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
                        <label htmlFor={`skill-${skill}`} className="text-sm cursor-pointer">
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rate Range Filter */}
                <div className="space-y-4">
                  <h3 className="font-medium">Hourly Rate</h3>
                  <div className="px-2">
                    <input
                      type="range"
                      min="20"
                      max="100"
                      step="5"
                      value={rateRange[0]}
                      onChange={(e) => setRateRange([Number(e.target.value), rateRange[1]])}
                      className="w-full my-6 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      type="range"
                      min="20"
                      max="100"
                      step="5"
                      value={rateRange[1]}
                      onChange={(e) => setRateRange([rateRange[0], Number(e.target.value)])}
                      className="w-full my-6 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{formatRate(rateRange[0])}</span>
                      <span className="text-sm">{formatRate(rateRange[1])}</span>
                    </div>
                  </div>
                </div>

                {/* Experience Level Filter */}
                <div className="space-y-2">
                  <h3 className="font-medium">Experience Level</h3>
                  <div className="relative">
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#422AD5] focus:border-transparent appearance-none"
                    >
                      <option value="">All Levels</option>
                      <option value="junior">Junior (0-2 years)</option>
                      <option value="mid">Mid-level (2-5 years)</option>
                      <option value="senior">Senior (5+ years)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Availability Filter */}
                <div className="space-y-2">
                  <h3 className="font-medium">Availability</h3>
                  <div className="relative">
                    <select
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#422AD5] focus:border-transparent appearance-none"
                    >
                      <option value="">Any Availability</option>
                      <option value="available">Available Now</option>
                      <option value="part-time">Part-time</option>
                      <option value="full-time">Full-time</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Freelancer Listings */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {displayFreelancers.length} {displayFreelancers.length === 1 ? "Freelancer" : "Freelancers"} Found
                {showRecommended && " (Recommended)"}
              </h2>
              <div className="flex gap-4">
                <button
                  onClick={toggleView}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    showRecommended 
                      ? "bg-[#422AD5] text-white" 
                      : "border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {showRecommended ? "Show All" : "Show Recommended"}
                </button>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-[180px] rounded-md border border-gray-300 py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#422AD5] focus:border-transparent appearance-none"
                  >
                    <option value="rating">Highest Rating</option>
                    <option value="rate-low">Rate: Low to High</option>
                    <option value="rate-high">Rate: High to Low</option>
                    <option value="experience">Most Experience</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {recommendationsLoading && showRecommended ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#422AD5]"></div>
              </div>
            ) : currentFreelancers.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col items-center justify-center p-8 text-center">
                <div className="rounded-full bg-gray-100 p-3 mb-4">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  {showRecommended ? "No recommended freelancers found" : "No freelancers found"}
                </h3>
                <p className="text-gray-500 mb-4">
                  {showRecommended 
                    ? "We couldn't find any recommendations based on your profile" 
                    : "Try adjusting your search or filter criteria"}
                </p>
                {showRecommended && (
                  <button
                    className="rounded-md border border-gray-300 py-2 px-4 text-sm font-medium hover:bg-gray-50 mb-2"
                    onClick={toggleView}
                  >
                    Show All Freelancers
                  </button>
                )}
                <button
                  className="rounded-md border border-gray-300 py-2 px-4 text-sm font-medium hover:bg-gray-50"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {currentFreelancers.map((freelancer) => (
                  <div
                    key={freelancer._id || Math.random()}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-6 pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-4">
                          <img 
                            src={freelancer.profilePic || "https://randomuser.me/api/portraits/lego/1.jpg"} 
                            alt={freelancer.name || "Freelancer"}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="text-xl font-semibold hover:text-[#422AD5] transition-colors">
                              {freelancer.name || `User ${freelancer.userId?.slice(-4) || '0000'}`}
                            </h3>
                            <p className="text-gray-600">{freelancer.profileTitle || "Freelancer"}</p>
                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                {freelancer.rating || "4.5"} ({freelancer.projects || 0} projects)
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {calculateExperience(freelancer.workExperience)}
                              </span>
                              {showRecommended && (
                                <span className="flex items-center gap-1 bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs">
                                  Match: {Math.round((freelancer.similarityScore || 0) * 100)}%
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          className={`p-1 rounded-md hover:bg-gray-100 ${false ? "text-[#422AD5]" : "text-gray-400"}`}
                          onClick={() => toggleBookmark(freelancer._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={false ? "currentColor" : "none"}
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
                      <p className="text-gray-500 mb-4">{freelancer.bio}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {Array.isArray(freelancer.skills) && freelancer.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="rounded-sm border border-gray-300 px-2 py-0.5 text-sm font-normal bg-gray-50"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-green-100 p-1.5">
                            <DollarSign className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">₹{freelancer.hourlyRate || "50"}/hr</p>
                            <p className="text-xs text-gray-500">Hourly Rate</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-blue-100 p-1.5">
                            <Clock className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{calculateExperience(freelancer.workExperience)}</p>
                            <p className="text-xs text-gray-500">Experience</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200"></div>
                    <div className="flex justify-between py-3 px-6">
                      <button 
                        className="text-sm text-[#422AD5] hover:underline"
                        onClick={() => {
                          if (freelancer._id) {
                            window.location.href = `/freelancers/${freelancer._id}`;
                          }
                        }}
                      >
                        View Profile
                      </button>
                      <button className="rounded-md bg-[#422AD5] py-2 px-4 text-sm font-medium text-white hover:bg-[#3620b1]">
                        Contact
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {displayFreelancers.length > freelancersPerPage && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
                        currentPage === i + 1 ? "bg-[#422AD5] text-white" : "hover:bg-gray-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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

export default FindTalentPage;