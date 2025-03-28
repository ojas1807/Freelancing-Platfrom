import { Gem, Glasses, ScanSearch, Telescope, PlusCircle, X } from "lucide-react";
import React, { useState } from "react";

function FreelancerProfileBuilder() {
  // States for all form steps
  const [currentStep, setCurrentStep] = useState(1);
  const [freelancerLevel, setFreelancerLevel] = useState("");
  const [workExperience, setWorkExperience] = useState([]);
  const [currentExperience, setCurrentExperience] = useState({
    title: "",
    company: "",
    location: "",
    currentlyWorking: false,
    startDate: { month: "", year: "" },
    endDate: { month: "", year: "" },
    description: ""
  });
  const [profileTitle, setProfileTitle] = useState("");
  const [skills, setSkills] = useState([]);
  const [inputSkill, setInputSkill] = useState("");
  const [category, setCategory] = useState("");
  const [specialties, setSpecialties] = useState([]);

  // Progress tracking
  const totalSteps = 5;
  
  // Method to handle next step navigation
  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  // Method to handle previous step navigation
  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Method to add work experience
  const handleAddExperience = () => {
    setWorkExperience(prev => [...prev, currentExperience]);
    setCurrentExperience({
      title: "",
      company: "",
      location: "",
      currentlyWorking: false,
      startDate: { month: "", year: "" },
      endDate: { month: "", year: "" },
      description: ""
    });
  };

  // Method to add skills
  const handleAddSkill = () => {
    if (inputSkill && skills.length < 15 && !skills.includes(inputSkill)) {
      setSkills(prev => [...prev, inputSkill]);
      setInputSkill("");
    }
  };

  // Method to remove a skill
  const handleRemoveSkill = (skillToRemove) => {
    setSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };

  // Method to toggle a specialty
  const handleToggleSpecialty = (specialty) => {
    if (specialties.includes(specialty)) {
      setSpecialties(prev => prev.filter(s => s !== specialty));
    } else if (specialties.length < 3) {
      setSpecialties(prev => [...prev, specialty]);
    }
  };

  // Helper function to get suggested skills based on the category
  const getSuggestedSkills = () => {
    const suggestions = {
      "Web, Mobile & Software Dev": [
        "Web Development", 
        "Web Application", 
        "Mobile Development",
        "React", 
        "JavaScript", 
        "Node.js", 
        "UI/UX Design"
      ],
      "Design & Creative": [
        "Graphic Design", 
        "Logo Design", 
        "Illustration", 
        "Photoshop", 
        "Figma"
      ],
      "IT & Networking": [
        "Cloud Solutions", 
        "Network Administration", 
        "DevOps", 
        "Cybersecurity"
      ],
      "Writing": [
        "Content Writing", 
        "Copywriting", 
        "Technical Writing", 
        "Editing"
      ],
      "Accounting & Consulting": [
        "Bookkeeping", 
        "Financial Analysis", 
        "Tax Preparation", 
        "Business Consulting"
      ]
    };
    
    return suggestions[category] || ["Web Development", "Content Writing", "Graphic Design"];
  };

  // Helper function to get specialties based on the category
  const getSpecialties = () => {
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
    
    return specialtiesMap[category] || [];
  };

  return (
    <div>
      <div className="relative isolate bg-white px-6 py-16 sm:py-24 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
        
        {/* Progress indicator */}
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600 mb-2">{currentStep}/{totalSteps}</h2>
          
          {/* Step 1: Freelancer Level */}
          {currentStep === 1 && (
            <>
              <p className="text-4xl mb-4 font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl">
                A few quick questions: <br></br>
                Have you freelanced before?
              </p>
              <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
                This lets us know how much help to give you along the way. We won&apos;t share your answer with anyone else,
                including potential clients.
              </p>
              <div className="mx-auto mt-16 grid max-w-lg grid-rows-1 items-center justify-items-center gap-y-0 sm:mt-20 sm:gap-y-4 lg:max-w-4xl lg:grid-cols-3">
                <div className="card bg-base-100 w-70 shadow-sm hover:shadow-md cursor-pointer" onClick={() => setFreelancerLevel("beginner")}>
                  <div className="card-body">
                    <div className="card-actions justify-start">
                      <Telescope className="w-6 h-6 mr-2" />
                      <input
                        type="radio"
                        className="radio radio-md radio-primary"
                        checked={freelancerLevel === "beginner"}
                        onChange={() => setFreelancerLevel("beginner")}
                      />
                    </div>
                    <p className="mt-2 text-l font-semibold tracking-tight text-balance text-gray-900 sm:text-xl">
                      I&apos;m a Beginner.
                    </p>
                  </div>
                </div>
                <div className="card bg-base-100 w-70 shadow-sm hover:shadow-md cursor-pointer" onClick={() => setFreelancerLevel("experienced")}>
                  <div className="card-body">
                    <div className="card-actions justify-start">
                      <Glasses className="w-6 h-6 mr-2" />
                      <input
                        type="radio"
                        className="radio radio-md radio-primary"
                        checked={freelancerLevel === "experienced"}
                        onChange={() => setFreelancerLevel("experienced")}
                      />
                    </div>
                    <p className="mt-2 text-l font-semibold tracking-tight text-balance text-gray-900 sm:text-xl">
                      I&apos;ve some Experience.
                    </p>
                  </div>
                </div>
                <div className="card bg-base-100 w-70 shadow-sm hover:shadow-md cursor-pointer" onClick={() => setFreelancerLevel("expert")}>
                  <div className="card-body">
                    <div className="card-actions justify-start">
                      <Gem className="w-6 h-6 mr-2" />
                      <input
                        type="radio"
                        className="radio radio-md radio-primary"
                        checked={freelancerLevel === "expert"}
                        onChange={() => setFreelancerLevel("expert")}
                      />
                    </div>
                    <p className="mt-2 text-l font-semibold tracking-tight text-balance text-gray-900 sm:text-xl">
                      I&apos;m an Expert.
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
              
              {workExperience.length > 0 ? (
                <div className="mt-6 max-w-2xl mx-auto">
                  {workExperience.map((exp, index) => (
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
              
              {/* Work Experience Form Modal - In a real implementation, you'd use a modal component */}
              <div className="mt-8 max-w-2xl mx-auto text-left">
                <h3 className="text-xl font-semibold mb-4">Add Work Experience</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Software Engineer" 
                      className="input input-bordered w-full" 
                      value={currentExperience.title}
                      onChange={(e) => setCurrentExperience({...currentExperience, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Microsoft" 
                      className="input input-bordered w-full" 
                      value={currentExperience.company}
                      onChange={(e) => setCurrentExperience({...currentExperience, company: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input 
                      type="text" 
                      placeholder="Ex: London" 
                      className="input input-bordered w-full" 
                      value={currentExperience.location}
                      onChange={(e) => setCurrentExperience({...currentExperience, location: e.target.value})}
                    />
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="checkbox checkbox-primary mr-2" 
                      checked={currentExperience.currentlyWorking}
                      onChange={(e) => setCurrentExperience({...currentExperience, currentlyWorking: e.target.checked})}
                    />
                    <label>I am currently working in this role</label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <div className="grid grid-cols-2 gap-2">
                        <select 
                          className="select select-bordered" 
                          value={currentExperience.startDate.month}
                          onChange={(e) => setCurrentExperience({
                            ...currentExperience, 
                            startDate: {...currentExperience.startDate, month: e.target.value}
                          })}
                        >
                          <option value="">Month</option>
                          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(month => (
                            <option key={month} value={month}>{month}</option>
                          ))}
                        </select>
                        <select 
                          className="select select-bordered" 
                          value={currentExperience.startDate.year}
                          onChange={(e) => setCurrentExperience({
                            ...currentExperience, 
                            startDate: {...currentExperience.startDate, year: e.target.value}
                          })}
                        >
                          <option value="">Year</option>
                          {Array.from({ length: 30 }, (_, i) => 2025 - i).map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {!currentExperience.currentlyWorking && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <div className="grid grid-cols-2 gap-2">
                          <select 
                            className="select select-bordered" 
                            value={currentExperience.endDate.month}
                            onChange={(e) => setCurrentExperience({
                              ...currentExperience, 
                              endDate: {...currentExperience.endDate, month: e.target.value}
                            })}
                          >
                            <option value="">Month</option>
                            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(month => (
                              <option key={month} value={month}>{month}</option>
                            ))}
                          </select>
                          <select 
                            className="select select-bordered" 
                            value={currentExperience.endDate.year}
                            onChange={(e) => setCurrentExperience({
                              ...currentExperience, 
                              endDate: {...currentExperience.endDate, year: e.target.value}
                            })}
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
                      value={currentExperience.description}
                      onChange={(e) => setCurrentExperience({...currentExperience, description: e.target.value})}
                    ></textarea>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button className="btn btn-primary" onClick={handleAddExperience}>Save</button>
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
                  value={profileTitle}
                  onChange={(e) => setProfileTitle(e.target.value)}
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
                      value={inputSkill}
                      onChange={(e) => setInputSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                    />
                    <button className="btn btn-primary ml-2" onClick={handleAddSkill}>Add</button>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Max 15 skills</div>
                </div>
                
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill, index) => (
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
                          if (!skills.includes(skill) && skills.length < 15) {
                            setSkills(prev => [...prev, skill]);
                          }
                        }}
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
                    {[
                      "Accounting & Consulting",
                      "Admin Support",
                      "Customer Service",
                      "Data Science & Analytics",
                      "Design & Creative",
                      "Engineering & Architecture",
                      "IT & Networking",
                      "Legal",
                      "Sales & Marketing",
                      "Translation",
                      "Web, Mobile & Software Dev",
                      "Writing"
                    ].map((cat, index) => (
                      <div key={index} className="flex items-center">
                        <input 
                          type="radio" 
                          className="radio radio-primary mr-2" 
                          checked={category === cat}
                          onChange={() => setCategory(cat)}
                          id={`category-${index}`}
                        />
                        <label htmlFor={`category-${index}`} className="cursor-pointer">{cat}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {category && (
                  <div>
                    <h3 className="text-sm font-medium mb-2 text-left">Now, select 1 to 3 specialties</h3>
                    <div className="space-y-2 text-left">
                      {getSpecialties().map((specialty, index) => (
                        <div key={index} className="flex items-center">
                          <input 
                            type="checkbox" 
                            className="checkbox checkbox-primary mr-2" 
                            checked={specialties.includes(specialty)}
                            onChange={() => handleToggleSpecialty(specialty)}
                            id={`specialty-${index}`}
                            disabled={!specialties.includes(specialty) && specialties.length >= 3}
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
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-12 max-w-4xl mx-auto">
          {currentStep > 1 ? (
            <button
              className="btn btn-outline"
              onClick={handlePrevStep}
            >
              Back
            </button>
          ) : (
            <div></div> // Empty div for spacing when back button is not needed
          )}
          
          {currentStep < totalSteps ? (
            <button
              className="btn btn-success"
              onClick={handleNextStep}
            >
              Next
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={() => alert("Profile completed!")}
            >
              Complete profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FreelancerProfileBuilder;