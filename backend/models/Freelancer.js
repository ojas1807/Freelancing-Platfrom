class Freelancer {
    constructor(
      name,
      title,
      description,
      skills,
      rate,
      experience,
      location,
      availability,
      rating,
      projects,
      isBookmarked = false,
      profilePic
    ) {
      this.name = name;
      this.title = title;
      this.description = description;
      this.skills = skills;
      this.rate = rate;
      this.experience = experience;
      this.location = location;
      this.availability = availability;
      this.rating = rating;
      this.projects = projects;
      this.isBookmarked = isBookmarked;
      this.profilePic = profilePic;
    }
  
    // Toggle bookmark status
    toggleBookmark() {
      this.isBookmarked = !this.isBookmarked;
    }
  
    // Get freelancer details
    getDetails() {
      return {
        name: this.name,
        title: this.title,
        description: this.description,
        skills: this.skills,
        rate: this.rate,
        experience: this.experience,
        location: this.location,
        availability: this.availability,
        rating: this.rating,
        projects: this.projects,
        isBookmarked: this.isBookmarked,
        profilePic: this.profilePic,
      };
    }
  }
  
  export default Freelancer;