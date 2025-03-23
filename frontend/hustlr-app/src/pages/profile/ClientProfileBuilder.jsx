import { Building, Briefcase, ScanSearch, Target, PlusCircle, X, DollarSign } from "lucide-react";
import React, { useState } from "react";

function ClientProfileBuilder() {
  // States for all form steps
  const [currentStep, setCurrentStep] = useState(1);
  const [clientType, setClientType] = useState("");
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    website: "",
    size: "",
    industry: "",
    description: ""
  });
  const [hiringSummary, setHiringSummary] = useState("");
  const [hiringScopeInfo, setHiringScopeInfo] = useState({
    projectType: "",
    duration: "",
    expertise: "",
    teamSize: ""
  });
  const [budget, setBudget] = useState({
    range: "",
    paymentType: "",
    workHours: ""
  });
  const [preferredSkills, setPreferredSkills] = useState([]);
  const [inputSkill, setInputSkill] = useState("");
  
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

  // Method to add skills
  const handleAddSkill = () => {
    if (inputSkill && preferredSkills.length < 15 && !preferredSkills.includes(inputSkill)) {
      setPreferredSkills(prev => [...prev, inputSkill]);
      setInputSkill("");
    }
  };

  // Method to remove a skill
  const handleRemoveSkill = (skillToRemove) => {
    setPreferredSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };

  // Helper function to get suggested skills based on the industry
  const getSuggestedSkills = () => {
    const suggestions = {
      "Technology & Software": [
        "Web Development", 
        "Mobile Development",
        "DevOps",
        "Cloud Services", 
        "AI/Machine Learning", 
        "UI/UX Design"
      ],
      "Marketing & Creative": [
        "Content Marketing", 
        "Social Media", 
        "Graphic Design", 
        "SEO/SEM", 
        "Video Production"
      ],
      "Finance & Accounting": [
        "Bookkeeping", 
        "Financial Analysis", 
        "Tax Preparation", 
        "Financial Consulting"
      ],
      "E-commerce": [
        "Shopify", 
        "WooCommerce", 
        "Marketplace Management", 
        "Product Sourcing"
      ],
      "Healthcare": [
        "Medical Writing", 
        "Health Informatics", 
        "Telemedicine", 
        "Health Research"
      ]
    };
    
    return suggestions[companyInfo.industry] || ["Web Development", "Content Writing", "Graphic Design"];
  };

  // Project type options based on industry
  const getProjectTypes = () => {
    const projectTypes = {
      "Technology & Software": [
        "Web Application",
        "Mobile App Development",
        "Software Integration",
        "Bug Fixing",
        "System Architecture",
        "DevOps & CI/CD"
      ],
      "Marketing & Creative": [
        "Brand Identity",
        "Marketing Campaign",
        "Social Media Management",
        "Content Creation",
        "SEO Optimization"
      ],
      "Finance & Accounting": [
        "Financial Reporting",
        "Tax Preparation",
        "Bookkeeping",
        "Financial Consulting",
        "Audit Support"
      ],
      "E-commerce": [
        "Online Store Setup",
        "Product Catalog",
        "Payment Integration",
        "Marketplace Management",
        "Inventory System"
      ],
      "Healthcare": [
        "Medical Content",
        "Health Application",
        "Patient Management System",
        "Medical Research",
        "Healthcare Analytics"
      ]
    };
    
    return projectTypes[companyInfo.industry] || [
      "Web Development", 
      "Mobile App", 
      "Design Work",
      "Content Creation",
      "Consulting",
      "Research"
    ];
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
          
          {/* Step 1: Client Type */}
          {currentStep === 1 && (
            <>
              <p className="text-4xl mb-4 font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl">
                Let's create your client profile. <br></br>
                How will you be hiring on our platform?
              </p>
              <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
                This helps us tailor your hiring experience and match you with the right freelancers.
              </p>
              <div className="mx-auto mt-16 grid max-w-lg grid-rows-1 items-center justify-items-center gap-y-0 sm:mt-20 sm:gap-y-4 lg:max-w-4xl lg:grid-cols-3">
                <div className="card bg-base-100 w-70 shadow-sm hover:shadow-md cursor-pointer" onClick={() => setClientType("individual")}>
                  <div className="card-body">
                    <div className="card-actions justify-start">
                      <Briefcase className="w-6 h-6 mr-2" />
                      <input
                        type="radio"
                        className="radio radio-md radio-primary"
                        checked={clientType === "individual"}
                        onChange={() => setClientType("individual")}
                      />
                    </div>
                    <p className="mt-2 text-l font-semibold tracking-tight text-balance text-gray-900 sm:text-xl">
                      I&apos;m an Individual
                    </p>
                  </div>
                </div>
                <div className="card bg-base-100 w-70 shadow-sm hover:shadow-md cursor-pointer" onClick={() => setClientType("business")}>
                  <div className="card-body">
                    <div className="card-actions justify-start">
                      <Building className="w-6 h-6 mr-2" />
                      <input
                        type="radio"
                        className="radio radio-md radio-primary"
                        checked={clientType === "business"}
                        onChange={() => setClientType("business")}
                      />
                    </div>
                    <p className="mt-2 text-l font-semibold tracking-tight text-balance text-gray-900 sm:text-xl">
                      I represent a Business
                    </p>
                  </div>
                </div>
                <div className="card bg-base-100 w-70 shadow-sm hover:shadow-md cursor-pointer" onClick={() => setClientType("agency")}>
                  <div className="card-body">
                    <div className="card-actions justify-start">
                      <Target className="w-6 h-6 mr-2" />
                      <input
                        type="radio"
                        className="radio radio-md radio-primary"
                        checked={clientType === "agency"}
                        onChange={() => setClientType("agency")}
                      />
                    </div>
                    <p className="mt-2 text-l font-semibold tracking-tight text-balance text-gray-900 sm:text-xl">
                      I&apos;m an Agency
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Step 2: Company Information */}
          {currentStep === 2 && (
            <>
              <p className="text-4xl mb-4 font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl">
                Tell us about your {clientType === "individual" ? "work" : "company"}
              </p>
              <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
                This information helps freelancers understand who they're working with and makes your job postings more credible.
              </p>
              
              <div className="mt-8 max-w-2xl mx-auto text-left">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {clientType === "individual" ? "Your Name" : "Company Name"}
                    </label>
                    <input 
                      type="text" 
                      placeholder={clientType === "individual" ? "John Doe" : "Acme Corporation"} 
                      className="input input-bordered w-full" 
                      value={companyInfo.name}
                      onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {clientType === "individual" ? "Personal Website (Optional)" : "Company Website (Optional)"}
                    </label>
                    <input 
                      type="text" 
                      placeholder="https://www.example.com" 
                      className="input input-bordered w-full" 
                      value={companyInfo.website}
                      onChange={(e) => setCompanyInfo({...companyInfo, website: e.target.value})}
                    />
                  </div>
                  
                  {clientType !== "individual" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                      <select 
                        className="select select-bordered w-full"
                        value={companyInfo.size}
                        onChange={(e) => setCompanyInfo({...companyInfo, size: e.target.value})}
                      >
                        <option value="">Select company size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="500+">500+ employees</option>
                      </select>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                    <select 
                      className="select select-bordered w-full"
                      value={companyInfo.industry}
                      onChange={(e) => setCompanyInfo({...companyInfo, industry: e.target.value})}
                    >
                      <option value="">Select your industry</option>
                      <option value="Technology & Software">Technology & Software</option>
                      <option value="Marketing & Creative">Marketing & Creative</option>
                      <option value="Finance & Accounting">Finance & Accounting</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {clientType === "individual" ? "About You" : "About Your Company"}
                    </label>
                    <textarea 
                      className="textarea textarea-bordered w-full h-32" 
                      placeholder={clientType === "individual" ? "Tell freelancers about yourself and your work" : "Tell freelancers about your company's mission and values"} 
                      value={companyInfo.description}
                      onChange={(e) => setCompanyInfo({...companyInfo, description: e.target.value})}
                    ></textarea>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Step 3: Hiring Summary */}
          {currentStep === 3 && (
            <>
              <p className="text-4xl mb-4 font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl">
                How would you describe what you're looking to hire for?
              </p>
              <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
                This will help us understand your needs and match you with the right talent.
              </p>
              <div className="max-w-2xl mx-auto mt-8">
                <div className="text-left mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hiring Summary</label>
                </div>
                <textarea 
                  className="textarea textarea-bordered w-full h-40" 
                  placeholder="For example: Looking to build a small team of developers to help create our company's mobile app, or seeking a content writer to produce weekly blog articles..." 
                  value={hiringSummary}
                  onChange={(e) => setHiringSummary(e.target.value)}
                ></textarea>
              </div>
              
              <div className="mt-8 rounded-lg bg-base-200 p-4 max-w-2xl mx-auto">
                <div className="flex items-start">
                  <div className="flex-1">
                    <p className="text-lg font-medium">
                      "Be specific about your needs to attract better-qualified freelancers. Focus on the skills and experience you're looking for, rather than just job titles."
                    </p>
                    <p className="text-sm mt-1">Hiring Pro Tip</p>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Step 4: Hiring Scope */}
          {currentStep === 4 && (
            <>
              <p className="text-4xl mb-4 font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl">
                What type of projects are you planning to hire for?
              </p>
              <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
                This helps us tailor your experience and recommend the right talent.
              </p>
              <div className="max-w-2xl mx-auto mt-8 text-left">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                    <select 
                      className="select select-bordered w-full"
                      value={hiringScopeInfo.projectType}
                      onChange={(e) => setHiringScopeInfo({...hiringScopeInfo, projectType: e.target.value})}
                    >
                      <option value="">Select project type</option>
                      {getProjectTypes().map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Typical Project Duration</label>
                    <select 
                      className="select select-bordered w-full"
                      value={hiringScopeInfo.duration}
                      onChange={(e) => setHiringScopeInfo({...hiringScopeInfo, duration: e.target.value})}
                    >
                      <option value="">Select typical duration</option>
                      <option value="Less than 1 week">Less than 1 week</option>
                      <option value="1-4 weeks">1-4 weeks</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6+ months">6+ months</option>
                      <option value="Ongoing work">Ongoing work</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Required Expertise Level</label>
                    <select 
                      className="select select-bordered w-full"
                      value={hiringScopeInfo.expertise}
                      onChange={(e) => setHiringScopeInfo({...hiringScopeInfo, expertise: e.target.value})}
                    >
                      <option value="">Select expertise level</option>
                      <option value="Entry Level">Entry Level</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                      <option value="Specialist">Specialist</option>
                      <option value="Varies by project">Varies by project</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Team Size Needed</label>
                    <select 
                      className="select select-bordered w-full"
                      value={hiringScopeInfo.teamSize}
                      onChange={(e) => setHiringScopeInfo({...hiringScopeInfo, teamSize: e.target.value})}
                    >
                      <option value="">Select team size</option>
                      <option value="1 freelancer">1 freelancer</option>
                      <option value="2-5 freelancers">2-5 freelancers</option>
                      <option value="5+ freelancers">5+ freelancers</option>
                      <option value="Varies by project">Varies by project</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                    <select 
                      className="select select-bordered w-full"
                      value={budget.range}
                      onChange={(e) => setBudget({...budget, range: e.target.value})}
                    >
                      <option value="">Select budget range</option>
                      <option value="$0-$500">$0-$500</option>
                      <option value="$500-$1,000">$500-$1,000</option>
                      <option value="$1,000-$5,000">$1,000-$5,000</option>
                      <option value="$5,000-$10,000">$5,000-$10,000</option>
                      <option value="$10,000+">$10,000+</option>
                      <option value="Varies by project">Varies by project</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Payment Type</label>
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="hourly" 
                          className="radio radio-primary mr-2" 
                          checked={budget.paymentType === "hourly"}
                          onChange={() => setBudget({...budget, paymentType: "hourly"})}
                        />
                        <label htmlFor="hourly">Hourly rate</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="fixed" 
                          className="radio radio-primary mr-2" 
                          checked={budget.paymentType === "fixed"}
                          onChange={() => setBudget({...budget, paymentType: "fixed"})}
                        />
                        <label htmlFor="fixed">Fixed price</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="both" 
                          className="radio radio-primary mr-2" 
                          checked={budget.paymentType === "both"}
                          onChange={() => setBudget({...budget, paymentType: "both"})}
                        />
                        <label htmlFor="both">Both/Either</label>
                      </div>
                    </div>
                  </div>
                  
                  {budget.paymentType === "hourly" || budget.paymentType === "both" ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Work Hours</label>
                      <select 
                        className="select select-bordered w-full"
                        value={budget.workHours}
                        onChange={(e) => setBudget({...budget, workHours: e.target.value})}
                      >
                        <option value="">Select typical work hours</option>
                        <option value="Less than 10 hrs/week">Less than 10 hrs/week</option>
                        <option value="10-30 hrs/week">10-30 hrs/week</option>
                        <option value="30+ hrs/week">30+ hrs/week</option>
                        <option value="Full time">Full time</option>
                        <option value="Varies by project">Varies by project</option>
                      </select>
                    </div>
                  ) : null}
                </div>
              </div>
            </>
          )}
          
          {/* Step 5: Skills & Final */}
          {currentStep === 5 && (
            <>
              <p className="text-4xl mb-4 font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl">
                Almost done! What skills do you typically look for?
              </p>
              <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
                This helps us recommend freelancers with the right skills for your projects.
              </p>
              <div className="max-w-2xl mx-auto mt-8 text-left flex flex-col space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills you're looking for</label>
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
                
                {preferredSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {preferredSkills.map((skill, index) => (
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
                  <h3 className="text-md font-medium mb-2">Suggested skills for your industry</h3>
                  <div className="flex flex-wrap gap-2">
                    {getSuggestedSkills().map((skill, index) => (
                      <button 
                        key={index} 
                        className="btn btn-outline btn-sm"
                        onClick={() => {
                          if (!preferredSkills.includes(skill) && preferredSkills.length < 15) {
                            setPreferredSkills(prev => [...prev, skill]);
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
                        "Being specific about the skills you need helps our algorithm match you with the most qualified freelancers for your projects."
                      </p>
                      <p className="text-sm mt-1">Hiring Pro Tip</p>
                    </div>
                  </div>
                </div>
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
              className="btn btn-primary"
              onClick={handleNextStep}
            >
              Next
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={() => alert("Client profile completed!")}
            >
              Complete profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientProfileBuilder;