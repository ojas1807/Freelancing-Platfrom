import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Gem, Glasses, ScanSearch, Telescope, PlusCircle, X } from "lucide-react";
import * as freelancerProfileServices from "../../services/freelancerProfileServices";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../animations/LoadingSpinner";

function FreelancerProfileBuilder() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Main form state
  const [formData, setFormData] = useState({
    freelancerLevel: "",
    workExperience: [],
    currentExperience: {
      title: "",
      company: "",
      location: "",
      currentlyWorking: false,
      startDate: { month: "", year: "" },
      endDate: { month: "", year: "" },
      description: ""
    },
    profileTitle: "",
    skills: [],
    inputSkill: "",
    category: "",
    specialties: []
  });

  // Load existing profile
  // Load existing profile
useEffect(() => {
  const loadProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get token from your auth context or localStorage
      const token = localStorage.getItem('token'); // or from your auth context
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const profileData = await freelancerProfileServices.getMyProfile(token);
      
      setFormData(prev => ({
        ...prev,
        ...profileData, // Directly use profileData since we modified the service to return the data directly
        currentExperience: {
          title: "",
          company: "",
          location: "",
          currentlyWorking: false,
          startDate: { month: "", year: "" },
          endDate: { month: "", year: "" },
          description: ""
        },
        inputSkill: "",
        // Ensure arrays are initialized if they might be undefined
        skills: profileData.skills || [],
        workExperience: profileData.workExperience || [],
        specialties: profileData.specialties || []
      }));

    } catch (err) {
      console.error('Failed to load profile:', err);
      setError(err.message || 'Failed to load profile data');
      
      // Initialize empty form if it's a 404 (profile doesn't exist yet)
      if (err.message.includes('404')) {
        setFormData(prev => ({
          ...prev,
          freelancerLevel: '',
          profileTitle: '',
          skills: [],
          workExperience: [],
          category: '',
          specialties: []
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (user?.id) { // Check if user exists and has an ID
    loadProfile();
  } else {
    setIsLoading(false); // No user logged in
  }
}, [user]); // Add any other dependencies if needed

  // Field handlers
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleExperienceChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      currentExperience: { ...prev.currentExperience, [field]: value }
    }));
  };

  const handleDateChange = (dateType, field, value) => {
    setFormData(prev => ({
      ...prev,
      currentExperience: {
        ...prev.currentExperience,
        [dateType]: { ...prev.currentExperience[dateType], [field]: value }
      }
    }));
  };
  const handleAddExperience = () => {
    const { title, company, currentlyWorking, startDate, endDate } = formData.currentExperience;
  
    // Validate required fields
    if (!title || !company) {
      setError("Title and company are required");
      return;
    }
  
    // Validate start date
    if (!startDate.month || !startDate.year) {
      setError("Start date is required");
      return;
    }
  
    // Validate end date if not currently working
    if (!currentlyWorking && (!endDate.month || !endDate.year)) {
      setError("End date is required when not currently working");
      return;
    }
  
    // Prepare the experience object
    const newExperience = {
      title,
      company,
      location: formData.currentExperience.location,
      currentlyWorking,
      startDate: {
        month: startDate.month,
        year: parseInt(startDate.year) // Ensure it's a number
      },
      description: formData.currentExperience.description
    };
  
    // Only add endDate if not currently working
    if (!currentlyWorking) {
      newExperience.endDate = {
        month: endDate.month,
        year: parseInt(endDate.year) // Ensure it's a number
      };
    }
  
    setFormData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, newExperience],
      currentExperience: {
        title: "",
        company: "",
        location: "",
        currentlyWorking: false,
        startDate: { month: "", year: "" },
        endDate: { month: "", year: "" },
        description: ""
      }
    }));
  };

  

  // Skills management
  const handleAddSkill = () => {
    if (formData.inputSkill && formData.skills.length < 15 && !formData.skills.includes(formData.inputSkill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, prev.inputSkill],
        inputSkill: ""
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  // Specialties management
  const handleToggleSpecialty = (specialty) => {
    setFormData(prev => {
      if (prev.specialties.includes(specialty)) {
        return { ...prev, specialties: prev.specialties.filter(s => s !== specialty) };
      } else if (prev.specialties.length < 3) {
        return { ...prev, specialties: [...prev.specialties, specialty] };
      }
      return prev;
    });
  };

  // Get suggested skills based on category
  const getSuggestedSkills = () => {
    const suggestions = {
      "Web, Mobile & Software Dev": [
        "Web Development", "Web Application", "Mobile Development",
        "React", "JavaScript", "Node.js", "UI/UX Design"
      ],
      "Design & Creative": [
        "Graphic Design", "Logo Design", "Illustration", "Photoshop", "Figma"
      ],
      "IT & Networking": [
        "Cloud Solutions", "Network Administration", "DevOps", "Cybersecurity"
      ],
      "Writing": [
        "Content Writing", "Copywriting", "Technical Writing", "Editing"
      ],
      "Accounting & Consulting": [
        "Bookkeeping", "Financial Analysis", "Tax Preparation", "Business Consulting"
      ]
    };
    return suggestions[formData.category] || ["Web Development", "Content Writing", "Graphic Design"];
  };

  // Get specialties based on category
  const getSpecialties = () => {
    // Use the service function if the category is available
    if (formData.category) {
      return freelancerProfileServices.getSpecialties(formData.category);
    }
    
    // Fallback to existing logic if needed
    const specialtiesMap = {
      "Accounting & Consulting": [
        "Personal & Professional Coaching",
        "Accounting & Bookkeeping",
        "Financial Planning",
        "Recruiting & Human Resources",
        "Management Consulting & Analysis",
        "Other - Accounting & Consulting"
      ],
      "Web, Mobile & Software Dev": [
        "Web Development",
        "Mobile Development",
        "Desktop Software Development",
        "E-commerce Development",
        "Game Development",
        "CMS Development"
      ],
      "Design & Creative": [
        "Graphic Design",
        "Web Design",
        "Logo Design",
        "Animation",
        "Illustration",
        "Video Production"
      ]
    };
    return specialtiesMap[formData.category] || [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError('Please login first');
        return;
      }
  
      // Validate all required fields
      if (!formData.freelancerLevel) {
        throw new Error("Freelancer level is required");
      }
      if (!formData.profileTitle) {
        throw new Error("Profile title is required");
      }
      if (!formData.category) {
        throw new Error("Category is required");
      }
      if (formData.specialties.length === 0) {
        throw new Error("At least one specialty is required");
      }

      // Debug: Check user object structure
    console.log('User object structure:', user);
    if (!user?.id) {
      throw new Error("User authentication failed - missing user ID");
    }

    const userId = user.id || user._id || user.userId;
    console.log('Using userID:', userId);


    
    if (!user?.id && !user?._id) {
      throw new Error("User authentication failed - no ID found");
    }
  
      // Ensure workExperience doesn't have empty endDates when currentlyWorking is false
      const validatedWorkExperience = formData.workExperience.map(exp => {
        if (!exp.currentlyWorking && (!exp.endDate?.month || !exp.endDate?.year)) {
          throw new Error(`Please provide end date for ${exp.title} at ${exp.company}`);
        }
        return exp;
      });
  
      const profileData = {
        userId:userId.toString(), // Make sure this is included
        freelancerLevel: formData.freelancerLevel,
        workExperience: validatedWorkExperience, // Use validated array
        profileTitle: formData.profileTitle,
        skills: formData.skills,
        category: formData.category,
        specialties: formData.specialties,
        completedSteps: 5 // Mark as completed
      };

      console.log('Final payload:', profileData); // DEBUG
  
      await freelancerProfileServices.createProfile(token, profileData);
      alert("Profile Created Successfully!");
      navigate("/freelancer_dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Navigation
  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Validation
  const validateStep = (step) => {
    switch(step) {
      case 1: return !!formData.freelancerLevel;
      case 2: return true; // Experience is optional
      case 3: return !!formData.profileTitle;
      case 4: return formData.skills.length > 0;
      case 5: return !!formData.category && formData.specialties.length > 0;
      default: return false;
    }
  };

  if (isLoading) return <LoadingSpinner fullPage />;

  return (
    <div className="relative isolate bg-white px-6 py-16 sm:py-24 lg:px-8">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="mx-auto aspect-1155/678 w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>Close</button>
        </div>
      )}

      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base/7 font-semibold text-indigo-600 mb-2">
          {currentStep}/{totalSteps}
        </h2>

        {/* Step 1: Freelancer Level */}
        {currentStep === 1 && (
          <>
            <p className="text-4xl mb-4 font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl">
              A few quick questions: <br />
              Have you freelanced before?
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
              This lets us know how much help to give you along the way. We won't share your answer with anyone else,
              including potential clients.
            </p>
            <div className="mx-auto mt-16 grid max-w-lg grid-rows-1 items-center justify-items-center gap-y-0 sm:mt-20 sm:gap-y-4 lg:max-w-4xl lg:grid-cols-3">
              <div 
                className="card bg-base-100 w-70 shadow-sm hover:shadow-md cursor-pointer" 
                onClick={() => handleChange("freelancerLevel", "beginner")}
              >
                <div className="card-body">
                  <div className="card-actions justify-start">
                    <Telescope className="w-6 h-6 mr-2" />
                    <input
                      type="radio"
                      className="radio radio-md radio-primary"
                      checked={formData.freelancerLevel === "beginner"}
                      onChange={() => handleChange("freelancerLevel", "beginner")}
                    />
                  </div>
                  <p className="mt-2 text-l font-semibold tracking-tight text-balance text-gray-900 sm:text-xl">
                    I'm a Beginner.
                  </p>
                </div>
              </div>
              <div 
                className="card bg-base-100 w-70 shadow-sm hover:shadow-md cursor-pointer"
                onClick={() => handleChange("freelancerLevel", "experienced")}
              >
                <div className="card-body">
                  <div className="card-actions justify-start">
                    <Glasses className="w-6 h-6 mr-2" />
                    <input
                      type="radio"
                      className="radio radio-md radio-primary"
                      checked={formData.freelancerLevel === "experienced"}
                      onChange={() => handleChange("freelancerLevel", "experienced")}
                    />
                  </div>
                  <p className="mt-2 text-l font-semibold tracking-tight text-balance text-gray-900 sm:text-xl">
                    I've some Experience.
                  </p>
                </div>
              </div>
              <div 
                className="card bg-base-100 w-70 shadow-sm hover:shadow-md cursor-pointer"
                onClick={() => handleChange("freelancerLevel", "expert")}
              >
                <div className="card-body">
                  <div className="card-actions justify-start">
                    <Gem className="w-6 h-6 mr-2" />
                    <input
                      type="radio"
                      className="radio radio-md radio-primary"
                      checked={formData.freelancerLevel === "expert"}
                      onChange={() => handleChange("freelancerLevel", "expert")}
                    />
                  </div>
                  <p className="mt-2 text-l font-semibold tracking-tight text-balance text-gray-900 sm:text-xl">
                    I'm an Expert.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Step 2: Work Experience */}
        {currentStep === 2 && (
          <>
            <p className="text-4xl mb-4 font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl">
              If you have relevant experience, add it here
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
              Freelancers who add their experience are twice as likely to win work. But if you're just starting out, don't worry — you can still create a great profile.
            </p>
            
            {formData.workExperience.length > 0 ? (
              <div className="mt-6 max-w-2xl mx-auto">
                {formData.workExperience.map((exp, index) => (
                  <div key={index} className="card bg-base-100 shadow-sm mb-4 text-left p-4">
                    <h3 className="font-bold">{exp.title}</h3>
                    <p>{exp.company} • {exp.location}</p>
                    <p className="text-sm text-gray-600">
                      {exp.startDate.month}/{exp.startDate.year} - 
                      {exp.currentlyWorking ? " Present" : ` ${exp.endDate.month}/${exp.endDate.year}`}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card bg-base-100 w-full max-w-2xl mx-auto mt-8 shadow-sm border border-dashed border-gray-300 hover:border-gray-400 cursor-pointer">
                <div className="card-body items-center justify-center py-16">
                  <PlusCircle className="w-10 h-10 text-gray-400" />
                  <p className="mt-4 text-lg font-medium text-gray-600">Add experience</p>
                </div>
              </div>
            )}
            
            <div className="mt-8 max-w-2xl mx-auto text-left">
              <h3 className="text-xl font-semibold mb-4">Add Work Experience</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Software Engineer" 
                    className="input input-bordered w-full" 
                    value={formData.currentExperience.title}
                    onChange={(e) => handleExperienceChange("title", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Microsoft" 
                    className="input input-bordered w-full" 
                    value={formData.currentExperience.company}
                    onChange={(e) => handleExperienceChange("company", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input 
                    type="text" 
                    placeholder="Ex: London" 
                    className="input input-bordered w-full" 
                    value={formData.currentExperience.location}
                    onChange={(e) => handleExperienceChange("location", e.target.value)}
                  />
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="checkbox checkbox-primary mr-2" 
                    checked={formData.currentExperience.currentlyWorking}
                    onChange={(e) => handleExperienceChange("currentlyWorking", e.target.checked)}
                  />
                  <label>I am currently working in this role</label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <div className="grid grid-cols-2 gap-2">
                      <select 
                        className="select select-bordered" 
                        value={formData.currentExperience.startDate.month}
                        onChange={(e) => handleDateChange("startDate", "month", e.target.value)}
                      >
                        <option value="">Month</option>
                        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(month => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                      <select 
                        className="select select-bordered" 
                        value={formData.currentExperience.startDate.year}
                        onChange={(e) => handleDateChange("startDate", "year", e.target.value)}
                      >
                        <option value="">Year</option>
                        {Array.from({ length: 30 }, (_, i) => 2025 - i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {!formData.currentExperience.currentlyWorking && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <div className="grid grid-cols-2 gap-2">
                        <select 
                          className="select select-bordered" 
                          value={formData.currentExperience.endDate.month}
                          onChange={(e) => handleDateChange("endDate", "month", e.target.value)}
                        >
                          <option value="">Month</option>
                          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(month => (
                            <option key={month} value={month}>{month}</option>
                          ))}
                        </select>
                        <select 
                          className="select select-bordered" 
                          value={formData.currentExperience.endDate.year}
                          onChange={(e) => handleDateChange("endDate", "year", e.target.value)}
                        >
                          <option value="">Year</option>
                          {Array.from({ length: 30 }, (_, i) => 2025 - i).map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    className="textarea textarea-bordered w-full h-32" 
                    placeholder="Describe your responsibilities and achievements" 
                    value={formData.currentExperience.description}
                    onChange={(e) => handleExperienceChange("description", e.target.value)}
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-2">
                  <button 
                    className="btn btn-primary" 
                    onClick={handleAddExperience}
                    disabled={!formData.currentExperience.title || !formData.currentExperience.company}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Step 3: Profile Title */}
        {currentStep === 3 && (
          <>
            <p className="text-4xl mb-4 font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl">
              Got it. Now, add a title to tell the world what you do.
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
              It's the very first thing clients see, so make it count. Stand out by describing your expertise in your own words.
            </p>
            <div className="max-w-2xl mx-auto mt-8">
              <div className="text-left mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Your professional role</label>
              </div>
              <input 
                type="text" 
                placeholder="Web Developer" 
                className="input input-bordered w-full text-lg" 
                value={formData.profileTitle}
                onChange={(e) => handleChange("profileTitle", e.target.value)}
              />
            </div>
          </>
        )}

        {/* Step 4: Skills */}
        {currentStep === 4 && (
          <>
            <p className="text-4xl mb-4 font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl">
              Nearly there! What work are you here to do?
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
              Your skills show clients what you can offer, and help us choose which jobs to recommend to you.
              Add or remove the ones we've suggested, or start typing to pick more. It's up to you.
            </p>
            <div className="max-w-2xl mx-auto mt-8 text-left flex flex-col space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your skills</label>
                <div className="flex items-center">
                  <input 
                    type="text" 
                    placeholder="Enter skills here" 
                    className="input input-bordered flex-grow" 
                    value={formData.inputSkill}
                    onChange={(e) => handleChange("inputSkill", e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                  />
                  <button 
                    className="btn btn-primary ml-2" 
                    onClick={handleAddSkill}
                    disabled={!formData.inputSkill || formData.skills.includes(formData.inputSkill)}
                  >
                    Add
                  </button>
                </div>
                <div className="text-sm text-gray-500 mt-1">Max 15 skills</div>
              </div>
              
              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="badge badge-lg badge-primary gap-2">
                      {skill}
                      <button onClick={() => handleRemoveSkill(skill)}>
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-6">
                <h3 className="text-md font-medium mb-2">Suggested skills</h3>
                <div className="flex flex-wrap gap-2">
                  {getSuggestedSkills().map((skill, index) => (
                    <button 
                      key={index} 
                      className="btn btn-outline btn-sm"
                      onClick={() => {
                        if (!formData.skills.includes(skill)) {
                          handleChange("inputSkill", skill);
                          handleAddSkill();
                        }
                      }}
                      disabled={formData.skills.includes(skill) || formData.skills.length >= 15}
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-lg bg-base-200 p-4">
                <div className="flex items-start">
                  <div className="flex-1">
                    <p className="text-lg font-medium">
                      "Our algorithm will recommend specific job posts to you based on your skills. So choose them carefully to get the best match!"
                    </p>
                    <p className="text-sm mt-1">Upwork Pro Tip</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Step 5: Categories */}
        {currentStep === 5 && (
          <>
            <p className="text-4xl mb-4 font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl">
              Great, so what kind of work are you here to do?
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
              Don't worry, you can change these choices later on.
            </p>
            <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-medium mb-2 text-left">Select 1 category</h3>
                <div className="space-y-2 text-left">
                  {freelancerProfileServices.getCategories().map((cat, index) => (
                    <div key={index} className="flex items-center">
                      <input 
                        type="radio" 
                        className="radio radio-primary mr-2" 
                        checked={formData.category === cat}
                        onChange={() => handleChange("category", cat)}
                        id={`category-${index}`}
                      />
                      <label htmlFor={`category-${index}`} className="cursor-pointer">{cat}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              {formData.category && (
                <div>
                  <h3 className="text-sm font-medium mb-2 text-left">Now, select 1 to 3 specialties</h3>
                  <div className="space-y-2 text-left">
                    {getSpecialties().map((specialty, index) => (
                      <div key={index} className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="checkbox checkbox-primary mr-2" 
                          checked={formData.specialties.includes(specialty)}
                          onChange={() => handleToggleSpecialty(specialty)}
                          id={`specialty-${index}`}
                          disabled={!formData.specialties.includes(specialty) && formData.specialties.length >= 3}
                        />
                        <label htmlFor={`specialty-${index}`} className="cursor-pointer">{specialty}</label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-12 max-w-4xl mx-auto">
          {currentStep > 1 ? (
            <button className="btn btn-outline" onClick={handlePrevStep}>
              Back
            </button>
          ) : (
            <div></div>
          )}
          
          {currentStep < totalSteps ? (
            <button 
              className="btn btn-success" 
              onClick={handleNextStep}
              disabled={!validateStep(currentStep)}
            >
              Next
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={handleSubmit}
              disabled={isLoading || !validateStep(currentStep)}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Saving...
                </>
              ) : (
                'Complete profile'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FreelancerProfileBuilder;