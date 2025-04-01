import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  X,
  DollarSign,
  Star,
  Clock,
  MapPin,
  ChevronDown,
} from "lucide-react";

function FindWorkPage() {
  // Sample job data
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer for E-commerce Website",
      description:
        "Looking for an experienced frontend developer to build a responsive e-commerce website with modern UI/UX design. Must have experience with React and payment gateway integration.",
      category: "Web Development",
      skills: ["React", "JavaScript", "CSS", "Tailwind", "Redux"],
      budget: "$3,000 - $5,000",
      experience: "Intermediate",
      location: "Remote",
      postedDate: "2 days ago",
      proposals: 12,
      isBookmarked: false,
      rating: 4.8,
      client: {
        name: "TechSolutions Inc.",
        country: "United States",
        jobsPosted: 24,
        memberSince: "Jan 2020",
      },
    },
    {
      id: 2,
      title: "Mobile App UI/UX Designer",
      description:
        "Need a talented UI/UX designer for a fitness tracking mobile application. Experience with Figma and mobile design patterns required. Portfolio required for consideration.",
      category: "UI/UX Design",
      skills: ["Figma", "UI/UX", "Mobile Design", "Prototyping", "Adobe XD"],
      budget: "$1,500 - $3,000",
      experience: "Expert",
      location: "Remote",
      postedDate: "5 hours ago",
      proposals: 8,
      isBookmarked: true,
      rating: 4.9,
      client: {
        name: "HealthTrack",
        country: "Canada",
        jobsPosted: 8,
        memberSince: "Mar 2021",
      },
    },
    {
      id: 3,
      title: "WordPress Website Migration",
      description:
        "Looking for someone to migrate our WordPress website to a new hosting provider and optimize performance. Must have experience with cPanel and WP-CLI.",
      category: "WordPress",
      skills: ["WordPress", "PHP", "MySQL", "Server Management", "cPanel"],
      budget: "$500 - $1,000",
      experience: "Beginner",
      location: "Remote",
      postedDate: "1 week ago",
      proposals: 24,
      isBookmarked: false,
      rating: 4.5,
      client: {
        name: "SmallBiz Marketing",
        country: "United Kingdom",
        jobsPosted: 15,
        memberSince: "Nov 2019",
      },
    },
    {
      id: 4,
      title: "Full-Stack Developer for SaaS Platform",
      description:
        "We're building a SaaS platform for project management and need a full-stack developer to join our team for a 3-month contract. Experience with cloud services preferred.",
      category: "Full-Stack Development",
      skills: ["React", "Node.js", "MongoDB", "Express", "AWS"],
      budget: "$8,000 - $12,000",
      experience: "Expert",
      location: "Remote",
      postedDate: "3 days ago",
      proposals: 18,
      isBookmarked: false,
      rating: 4.7,
      client: {
        name: "SaaS Innovations",
        country: "Germany",
        jobsPosted: 32,
        memberSince: "Feb 2018",
      },
    },
    {
      id: 5,
      title: "Logo and Brand Identity Design",
      description:
        "Startup looking for a creative designer to create our logo and brand identity. We're in the tech education space. Looking for modern, clean designs with a tech feel.",
      category: "Graphic Design",
      skills: [
        "Logo Design",
        "Branding",
        "Illustrator",
        "Photoshop",
        "Typography",
      ],
      budget: "$1,000 - $2,000",
      experience: "Intermediate",
      location: "Remote",
      postedDate: "4 days ago",
      proposals: 32,
      isBookmarked: false,
      rating: 4.6,
      client: {
        name: "EduTech Startup",
        country: "Australia",
        jobsPosted: 3,
        memberSince: "Jun 2022",
      },
    },
    {
      id: 6,
      title: "Database Optimization Specialist",
      description:
        "Need an expert to optimize our PostgreSQL database for better performance and scalability. Must have experience with query optimization and indexing strategies.",
      category: "Database Administration",
      skills: [
        "PostgreSQL",
        "Database Optimization",
        "SQL",
        "Performance Tuning",
        "Indexing",
      ],
      budget: "$2,000 - $4,000",
      experience: "Expert",
      location: "Remote",
      postedDate: "1 day ago",
      proposals: 7,
      isBookmarked: false,
      rating: 4.9,
      client: {
        name: "DataSystems Corp",
        country: "Singapore",
        jobsPosted: 45,
        memberSince: "Sep 2017",
      },
    },
    {
      id: 7,
      title: "Content Writer for Tech Blog",
      description:
        "Looking for a skilled content writer to create articles about web development trends. Must have technical knowledge and ability to explain complex concepts simply.",
      category: "Content Writing",
      skills: [
        "Content Writing",
        "Technical Writing",
        "SEO",
        "Blogging",
        "Research",
      ],
      budget: "$800 - $1,500",
      experience: "Intermediate",
      location: "Remote",
      postedDate: "Just now",
      proposals: 3,
      isBookmarked: false,
      rating: 4.4,
      client: {
        name: "DevInsights",
        country: "India",
        jobsPosted: 12,
        memberSince: "Apr 2021",
      },
    },
    {
      id: 8,
      title: "Social Media Manager",
      description:
        "Need a social media manager to handle our Instagram and LinkedIn accounts. Must have experience growing B2B tech audiences and creating engaging content.",
      category: "Social Media Marketing",
      skills: [
        "Social Media",
        "Content Creation",
        "Community Management",
        "Analytics",
        "Scheduling",
      ],
      budget: "$1,200 - $2,500",
      experience: "Intermediate",
      location: "Remote",
      postedDate: "8 hours ago",
      proposals: 15,
      isBookmarked: true,
      rating: 4.7,
      client: {
        name: "GrowthHack Marketing",
        country: "United States",
        jobsPosted: 28,
        memberSince: "May 2020",
      },
    },
  ]);

  // Filter states
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [budgetRange, setBudgetRange] = useState([500, 12000]);
  const [filteredJobs, setFilteredJobs] = useState([...jobs]); // Make a copy of jobs array
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(3); // Number of jobs to show per page

  // Get current jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // All available skills from jobs
  const allSkills = Array.from(
    new Set(jobs.flatMap((job) => job.skills))
  ).sort();

  // All available categories from jobs
  const allCategories = Array.from(
    new Set(jobs.map((job) => job.category))
  ).sort();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Apply filters
  useEffect(() => {
    let result = [...jobs];

    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.skills.some((skill) => skill.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((job) => job.category === selectedCategory);
    }

    // Experience filter
    if (selectedExperience) {
      result = result.filter((job) => job.experience === selectedExperience);
    }

    // Skills filter
    if (selectedSkills.length > 0) {
      result = result.filter((job) =>
        selectedSkills.some((skill) => job.skills.includes(skill))
      );
    }

    // Budget range filter
    result = result.filter((job) => {
      const jobBudget = job.budget.replace(/[^\d,-]/g, ""); // Better regex to remove all non-digit characters except comma and dash
      const [minStr, maxStr] = jobBudget.split("-").map((str) => str.trim());

      const min = parseInt(minStr.replace(/,/g, "")) || 0;
      const max = parseInt(maxStr?.replace(/,/g, "") || min); // Handle cases where there's no max

      return (
        (min >= budgetRange[0] && min <= budgetRange[1]) ||
        (max >= budgetRange[0] && max <= budgetRange[1])
      );
    });

    setFilteredJobs(result);
  }, [
    searchQuery,
    selectedCategory,
    selectedExperience,
    selectedSkills,
    budgetRange,
    jobs,
  ]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedExperience("");
    setSelectedSkills([]);
    setBudgetRange([500, 12000]);
  };

  // Toggle bookmark
  const toggleBookmark = (id) => {
    setJobs(
      jobs.map((job) =>
        job.id === id ? { ...job, isBookmarked: !job.isBookmarked } : job
      )
    );
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

  return (
    <div className="container mx-auto py-8 px-4">
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
                  selectedCategory ||
                  selectedExperience ||
                  selectedSkills.length > 0 ||
                  budgetRange[0] !== 500 ||
                  budgetRange[1] !== 12000
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
          {(selectedCategory ||
            selectedExperience ||
            selectedSkills.length > 0) && (
            <div className="flex flex-wrap gap-2">
              {selectedCategory && (
                <span className="flex items-center gap-1 pl-2 pr-1 py-1 rounded-full bg-gray-100 text-sm">
                  Category: {selectedCategory}
                  <button
                    className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                    onClick={() => setSelectedCategory("")}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedExperience && (
                <span className="flex items-center gap-1 pl-2 pr-1 py-1 rounded-full bg-gray-100 text-sm">
                  Experience: {selectedExperience}
                  <button
                    className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                    onClick={() => setSelectedExperience("")}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
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
              {(selectedCategory ||
                selectedExperience ||
                selectedSkills.length > 0) && (
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
                {/* Category Filter */}
                <div className="space-y-2">
                  <h3 className="font-medium">Category</h3>
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#422AD5] focus:border-transparent appearance-none"
                    >
                      <option value="">Select category</option>
                      {allCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Experience Level Filter */}
                <div className="space-y-2">
                  <h3 className="font-medium">Experience Level</h3>
                  <div className="relative">
                    <select
                      value={selectedExperience}
                      onChange={(e) => setSelectedExperience(e.target.value)}
                      className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#422AD5] focus:border-transparent appearance-none"
                    >
                      <option value="">Select experience</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Budget Range Filter */}
                <div className="space-y-4">
                  <h3 className="font-medium">Budget Range</h3>
                  <div className="px-2">
                    <input
                      type="range"
                      min="500"
                      max="12000"
                      step="500"
                      value={budgetRange[0]}
                      onChange={(e) =>
                        setBudgetRange([Number(e.target.value), budgetRange[1]])
                      }
                      className="w-full my-6 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      type="range"
                      min="500"
                      max="12000"
                      step="500"
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
                  {/* Category Filter */}
                  <div className="space-y-2">
                    <h3 className="font-medium">Category</h3>
                    <div className="relative">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#422AD5] focus:border-transparent appearance-none"
                      >
                        <option value="">All Categories</option>
                        {allCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Experience Level Filter */}
                  <div className="space-y-2">
                    <h3 className="font-medium">Experience Level</h3>
                    <div className="relative">
                      <select
                        value={selectedExperience}
                        onChange={(e) => setSelectedExperience(e.target.value)}
                        className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#422AD5] focus:border-transparent appearance-none"
                      >
                        <option value="all">All Levels</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Budget Range Filter */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Budget Range</h3>
                    <div className="px-2">
                      <input
                        type="range"
                        min="500"
                        max="12000"
                        step="500"
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
                        max="12000"
                        step="500"
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
                  defaultValue="newest"
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
                {currentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-6 pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold hover:text-[#422AD5] transition-colors">
                            <a href="#">{job.title}</a>
                          </h3>
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                            <span className="rounded-sm border border-gray-300 px-2 py-0.5 font-normal">
                              {job.category}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {job.postedDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {job.location}
                            </span>
                          </div>
                        </div>
                        <button
                          className={`p-1 rounded-md hover:bg-gray-100 ${
                            job.isBookmarked
                              ? "text-[#422AD5]"
                              : "text-gray-400"
                          }`}
                          onClick={() => toggleBookmark(job.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={job.isBookmarked ? "currentColor" : "none"}
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
                        {job.skills.map((skill, index) => (
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
                            <p className="text-sm font-medium">{job.budget}</p>
                            <p className="text-xs text-gray-500">Budget</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-blue-100 p-1.5">
                            <Star className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {job.experience}
                            </p>
                            <p className="text-xs text-gray-500">Experience</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200"></div>
                    <div className="flex justify-between py-3 px-6">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium text-gray-900">
                          {job.proposals}
                        </span>{" "}
                        proposals so far
                      </div>
                      <button className="rounded-md bg-[#422AD5] py-2 px-4 text-sm font-medium text-white hover:bg-[#3620b1]">
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

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
