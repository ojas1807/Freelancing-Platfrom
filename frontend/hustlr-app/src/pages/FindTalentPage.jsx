import { useState, useEffect } from "react";
import { Search, Filter, X, DollarSign, Star, Clock, MapPin, ChevronDown } from "lucide-react";

function FindTalentPage() {
  // Freelancer data
  const [freelancers, setFreelancers] = useState([
    {
      id: 1,
      name: "Pritam Ningnaik",
      title: "Senior Frontend Developer",
      description: "Specialized in building responsive web applications with React and TypeScript. 5+ years of experience working with startups and enterprises.",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux"],
      rate: "$50-$80/hr",
      experience: "5 years",
      location: "San Francisco, CA",
      availability: "Available now",
      rating: 4.9,
      projects: 42,
      isBookmarked: false,
      profilePic: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      name: "Chinmayee Sadalgekar",
      title: "UI/UX Designer",
      description: "Passionate about creating intuitive user experiences. Expert in user research, wireframing, and prototyping.",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "UI Design"],
      rate: "$40-$70/hr",
      experience: "3 years",
      location: "Remote",
      availability: "Available in 2 weeks",
      rating: 4.7,
      projects: 28,
      isBookmarked: true,
      profilePic: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      name: "Ojas Patrikar",
      title: "Full Stack Developer",
      description: "Building scalable web applications with Node.js and React. Experience with AWS and database optimization.",
      skills: ["Node.js", "React", "AWS", "MongoDB", "PostgreSQL"],
      rate: "$60-$90/hr",
      experience: "6 years",
      location: "New York, NY",
      availability: "Part-time",
      rating: 4.8,
      projects: 57,
      isBookmarked: false,
      profilePic: "https://randomuser.me/api/portraits/men/75.jpg"
    },
    {
      id: 4,
      name: "Radhika Lakhani",
      title: "Content Writer & SEO Specialist",
      description: "Tech-savvy writer with expertise in creating engaging content for SaaS and IT companies.",
      skills: ["Content Writing", "SEO", "Blogging", "Technical Writing", "Copywriting"],
      rate: "$30-$50/hr",
      experience: "4 years",
      location: "Remote",
      availability: "Available now",
      rating: 4.6,
      projects: 35,
      isBookmarked: false,
      profilePic: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      id: 5,
      name: "Shreyash Narvekar",
      title: "DevOps Engineer",
      description: "Helping companies build robust CI/CD pipelines and cloud infrastructure.",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
      rate: "$70-$100/hr",
      experience: "7 years",
      location: "Austin, TX",
      availability: "Full-time",
      rating: 4.9,
      projects: 63,
      isBookmarked: false,
      profilePic: "https://randomuser.me/api/portraits/men/81.jpg"
    },
    {
      id: 6,
      name: "Shravani Sawant",
      title: "Mobile App Developer",
      description: "Building beautiful cross-platform mobile applications with React Native and Flutter.",
      skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
      rate: "$45-$75/hr",
      experience: "4 years",
      location: "Remote",
      availability: "Available now",
      rating: 4.7,
      projects: 39,
      isBookmarked: false,
      profilePic: "https://randomuser.me/api/portraits/women/33.jpg"
    }
  ]);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [rateRange, setRateRange] = useState([20, 100]);
  const [experienceLevel, setExperienceLevel] = useState("");
  const [availability, setAvailability] = useState("");
  const [filteredFreelancers, setFilteredFreelancers] = useState(freelancers);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [freelancersPerPage] = useState(4);

  // Get current freelancers
  const indexOfLastFreelancer = currentPage * freelancersPerPage;
  const indexOfFirstFreelancer = indexOfLastFreelancer - freelancersPerPage;
  const currentFreelancers = filteredFreelancers.slice(indexOfFirstFreelancer, indexOfLastFreelancer);
  const totalPages = Math.ceil(filteredFreelancers.length / freelancersPerPage);

  // All available skills from freelancers
  const allSkills = Array.from(new Set(freelancers.flatMap((f) => f.skills))).sort();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Filter logic
  useEffect(() => {
    let result = [...freelancers];
    
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(f => 
        f.name.toLowerCase().includes(query) ||
        f.title.toLowerCase().includes(query) ||
        f.description.toLowerCase().includes(query) ||
        f.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }

    // Skills filter
    if (selectedSkills.length > 0) {
      result = result.filter(f => 
        selectedSkills.some(skill => f.skills.includes(skill))
      );
    }

    // Rate filter
    result = result.filter(f => {
      const [min, max] = f.rate.replace(/[^\d-]/g, "").split("-").map(Number);
      return (min >= rateRange[0] && min <= rateRange[1]) || 
             (max >= rateRange[0] && max <= rateRange[1]);
    });

    // Experience filter
    if (experienceLevel) {
      result = result.filter(f => {
        const years = parseInt(f.experience);
        if (experienceLevel === "junior") return years <= 2;
        if (experienceLevel === "mid") return years > 2 && years <= 5;
        if (experienceLevel === "senior") return years > 5;
        return true;
      });
    }

    // Availability filter
    if (availability) {
      result = result.filter(f => {
        if (availability === "available") return f.availability.toLowerCase().includes("available now");
        if (availability === "part-time") return f.availability.toLowerCase().includes("part-time");
        if (availability === "full-time") return f.availability.toLowerCase().includes("full-time");
        return true;
      });
    }

    setFilteredFreelancers(result);
    setCurrentPage(1);
  }, [searchQuery, selectedSkills, rateRange, experienceLevel, availability, freelancers]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSkills([]);
    setRateRange([20, 100]);
    setExperienceLevel("");
    setAvailability("");
  };

  // Toggle bookmark
  const toggleBookmark = (id) => {
    setFreelancers(freelancers.map(f => 
      f.id === id ? { ...f, isBookmarked: !f.isBookmarked } : f
    ));
  };

  // Toggle skill selection
  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Format rate for display
  const formatRate = (value) => {
    return `$${value}/hr`;
  };

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
                  {/* Skills Filter */}
                  <div className="space-y-2">
                    <h3 className="font-medium">Skills</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                      {allSkills.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`mobile-skill-${skill}`}
                            checked={selectedSkills.includes(skill)}
                            onChange={() => toggleSkill(skill)}
                            className="h-4 w-4 rounded border-gray-300 text-[#422AD5] focus:ring-[#422AD5]"
                          />
                          <label htmlFor={`mobile-skill-${skill}`} className="text-sm cursor-pointer">
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

          {/* Freelancer Listings */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {filteredFreelancers.length} {filteredFreelancers.length === 1 ? "Freelancer" : "Freelancers"} Found
              </h2>
              <div className="relative">
                <select
                  defaultValue="rating"
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

            {currentFreelancers.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col items-center justify-center p-8 text-center">
                <div className="rounded-full bg-gray-100 p-3 mb-4">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No freelancers found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
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
                    key={freelancer.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-6 pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-4">
                          <img 
                            src={freelancer.profilePic} 
                            alt={freelancer.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="text-xl font-semibold hover:text-[#422AD5] transition-colors">
                              {freelancer.name}
                            </h3>
                            <p className="text-gray-600">{freelancer.title}</p>
                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                {freelancer.rating} ({freelancer.projects} projects)
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {freelancer.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {freelancer.availability}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          className={`p-1 rounded-md hover:bg-gray-100 ${
                            freelancer.isBookmarked ? "text-[#422AD5]" : "text-gray-400"
                          }`}
                          onClick={() => toggleBookmark(freelancer.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={freelancer.isBookmarked ? "currentColor" : "none"}
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
                      <p className="text-gray-500 mb-4">{freelancer.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {freelancer.skills.map((skill, index) => (
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
                            <p className="text-sm font-medium">{freelancer.rate}</p>
                            <p className="text-xs text-gray-500">Hourly Rate</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-blue-100 p-1.5">
                            <Clock className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{freelancer.experience}</p>
                            <p className="text-xs text-gray-500">Experience</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200"></div>
                    <div className="flex justify-between py-3 px-6">
                      <button className="text-sm text-[#422AD5] hover:underline">
                        View Portfolio
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
            {filteredFreelancers.length > freelancersPerPage && (
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