import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Briefcase, GraduationCap, Star, Clock, DollarSign, PenTool } from "lucide-react";

export default function FreelancerProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    title: "",
    location: "",
    hourlyRate: "",
    availability: "Full-time",
    bio: "",
    skills: [],
    education: [],
    experience: [],
    portfolio: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user is logged in and is a freelancer
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    if (!token) {
      navigate("/login");
      return;
    }

    if (userRole !== "freelancer") {
      navigate("/unauthorized");
      return;
    }

    // Fetch freelancer profile data
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/freelancer/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          // If profile doesn't exist yet, we'll use the empty state
          console.log("No profile found or error fetching profile");
        }
      } catch (err) {
        setError("Failed to load profile. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() !== "" && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addEducation = () => {
    setProfile(prev => ({
      ...prev,
      education: [...prev.education, { institution: "", degree: "", fieldOfStudy: "", yearCompleted: "" }]
    }));
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...profile.education];
    updatedEducation[index][field] = value;
    setProfile(prev => ({
      ...prev,
      education: updatedEducation
    }));
  };

  const removeEducation = (index) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addExperience = () => {
    setProfile(prev => ({
      ...prev,
      experience: [...prev.experience, { 
        title: "", 
        company: "", 
        location: "", 
        startDate: "", 
        endDate: "", 
        current: false,
        description: "" 
      }]
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...profile.experience];
    updatedExperience[index][field] = value;
    setProfile(prev => ({
      ...prev,
      experience: updatedExperience
    }));
  };

  const removeExperience = (index) => {
    setProfile(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    try {
      const response = await fetch("http://localhost:5000/api/freelancer/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });

      if (response.ok) {
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to update profile");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-6 px-8 relative">
          <h1 className="text-2xl font-bold text-white">Freelancer Profile</h1>
          <button 
            onClick={() => setIsEditing(!isEditing)} 
            className="absolute right-8 top-6 bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {error && <div className="bg-red-100 text-red-700 p-4 border-l-4 border-red-500">{error}</div>}

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="mb-6 flex justify-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-4xl overflow-hidden">
                    {profile.profileImage ? (
                      <img src={profile.profileImage} alt={profile.name} className="w-full h-full object-cover" />
                    ) : (
                      <span>{profile.name.charAt(0)}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                      />
                    ) : (
                      <p className="mt-1 text-lg font-semibold">{profile.name || "Not specified"}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Professional Title</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="title"
                        value={profile.title}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    ) : (
                      <p className="mt-1">{profile.title || "Not specified"}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={profile.location}
                        onChange={handleChange}
                        placeholder="Location"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    ) : (
                      <span>{profile.location || "Location not specified"}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    {isEditing ? (
                      <div className="flex w-full">
                        <input
                          type="number"
                          name="hourlyRate"
                          value={profile.hourlyRate}
                          onChange={handleChange}
                          placeholder="Hourly Rate"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <span className="ml-2 mt-1">₹/hr</span>
                      </div>
                    ) : (
                      <span>{profile.hourlyRate ? `₹${profile.hourlyRate}/hr` : "Hourly rate not specified"}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    {isEditing ? (
                      <select
                        name="availability"
                        value={profile.availability}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Occasional">Occasional</option>
                      </select>
                    ) : (
                      <span>{profile.availability || "Availability not specified"}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold border-b pb-2">About Me</h2>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={profile.bio}
                      onChange={handleChange}
                      rows="4"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    ></textarea>
                  ) : (
                    <p className="mt-4 text-gray-700">{profile.bio || "No bio provided"}</p>
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-semibold border-b pb-2 flex items-center">
                    <PenTool className="w-5 h-5 mr-2" />
                    Skills
                  </h2>
                  {isEditing && (
                    <div className="mt-4 flex gap-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <button
                        type="button"
                        onClick={addSkill}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Add
                      </button>
                    </div>
                  )}
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {profile.skills.length > 0 ? (
                      profile.skills.map((skill, index) => (
                        <div key={index} className={`px-3 py-1 rounded-full text-sm ${isEditing ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800'} flex items-center gap-1`}>
                          {skill}
                          {isEditing && (
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="ml-1 text-gray-500 hover:text-gray-700"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No skills added yet</p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-xl font-semibold flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      Education
                    </h2>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={addEducation}
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        + Add Education
                      </button>
                    )}
                  </div>
                  
                  {profile.education.length > 0 ? (
                    <div className="mt-4 space-y-6">
                      {profile.education.map((edu, index) => (
                        <div key={index} className={`p-4 ${isEditing ? 'border rounded-lg' : ''}`}>
                          {isEditing ? (
                            <>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Institution</label>
                                  <input
                                    type="text"
                                    value={edu.institution}
                                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Degree</label>
                                  <input
                                    type="text"
                                    value={edu.degree}
                                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Field of Study</label>
                                  <input
                                    type="text"
                                    value={edu.fieldOfStudy}
                                    onChange={(e) => handleEducationChange(index, 'fieldOfStudy', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Year Completed</label>
                                  <input
                                    type="text"
                                    value={edu.yearCompleted}
                                    onChange={(e) => handleEducationChange(index, 'yearCompleted', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeEducation(index)}
                                className="text-red-600 hover:text-red-800 text-sm"
                              >
                                Remove
                              </button>
                            </>
                          ) : (
                            <>
                              <p className="font-medium text-lg">{edu.institution}</p>
                              <p className="text-gray-700">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</p>
                              <p className="text-gray-500">{edu.yearCompleted}</p>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 text-gray-500">No education history added</p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-xl font-semibold flex items-center">
                      <Briefcase className="w-5 h-5 mr-2" />
                      Work Experience
                    </h2>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={addExperience}
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        + Add Experience
                      </button>
                    )}
                  </div>
                  
                  {profile.experience.length > 0 ? (
                    <div className="mt-4 space-y-6">
                      {profile.experience.map((exp, index) => (
                        <div key={index} className={`p-4 ${isEditing ? 'border rounded-lg' : ''}`}>
                          {isEditing ? (
                            <>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Job Title</label>
                                  <input
                                    type="text"
                                    value={exp.title}
                                    onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Company</label>
                                  <input
                                    type="text"
                                    value={exp.company}
                                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Location</label>
                                  <input
                                    type="text"
                                    value={exp.location}
                                    onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                                <div className="flex items-center mt-6">
                                  <input
                                    type="checkbox"
                                    checked={exp.current}
                                    onChange={(e) => handleExperienceChange(index, 'current', e.target.checked)}
                                    className="mr-2"
                                  />
                                  <label className="text-sm font-medium text-gray-700">I am currently working here</label>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                  <input
                                    type="text"
                                    value={exp.startDate}
                                    onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                                    placeholder="MM/YYYY"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                                {!exp.current && (
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                                    <input
                                      type="text"
                                      value={exp.endDate}
                                      onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                                      placeholder="MM/YYYY"
                                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                  value={exp.description}
                                  onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                                  rows="3"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                ></textarea>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeExperience(index)}
                                className="mt-3 text-red-600 hover:text-red-800 text-sm"
                              >
                                Remove
                              </button>
                            </>
                          ) : (
                            <>
                              <p className="font-medium text-lg">{exp.title}</p>
                              <p className="text-gray-700">{exp.company}{exp.location ? ` • ${exp.location}` : ''}</p>
                              <p className="text-gray-500">
                                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                              </p>
                              <p className="mt-2">{exp.description}</p>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 text-gray-500">No work experience added</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="mr-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Profile
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}