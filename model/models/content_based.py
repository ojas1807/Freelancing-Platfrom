# models/content_based.py

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def recommend_freelancers(client, freelancers):
    # Get the client description and skills
    client_skills = client.get("preferredSkills", [])
    client_description = client.get("companyInfo", {}).get("description", "")

    # Combine skills and description for content-based filtering
    client_data = " ".join(client_skills) + " " + client_description

    # Extract freelancer data (skills + description)
    freelancer_data = []
    for freelancer in freelancers:
        freelancer_skills = freelancer.get("skills", [])
        freelancer_description = freelancer.get("description", "")
        freelancer_data.append(" ".join(freelancer_skills) + " " + freelancer_description)

    # Use TF-IDF vectorizer to convert text data to numerical features
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform([client_data] + freelancer_data)  # Include client data as the first element

    # Calculate cosine similarity between client and freelancers
    cosine_sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:])  # Compare client with freelancers

    # Get the top recommended freelancers based on similarity scores
    recommendations = [(i, score) for i, score in enumerate(cosine_sim[0]) if score > 0.1]  # filter by score threshold
    recommendations = sorted(recommendations, key=lambda x: x[1], reverse=True)  # Sort by highest similarity

    # Return the recommended freelancers
    recommended_freelancers = [(freelancers[i], score) for i, score in recommendations]
    return recommended_freelancers

#recommend work based on job skills and freelancer skill only  matching to get job recommeadtion using content  based filtering

def recommend_jobs(freelancer, jobskills):
    # Get the freelancer skills
    freelancer_skills = freelancer.get("skills", [])
    freelancer_description = freelancer.get("description", "")

    # Combine skills and description for content-based filtering
    freelancer_data = " ".join(freelancer_skills) + " " + freelancer_description

    # Extract job data (skills + description)
    job_data = []
    for job in jobskills:
        job_skills = job.get("skills", [])
        job_description = job.get("description", "")
        job_data.append(" ".join(job_skills) + " " + job_description)

    # Use TF-IDF vectorizer to convert text data to numerical features
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform([freelancer_data] + job_data)  # Include freelancer data as the first element

    # Calculate cosine similarity between freelancer and jobs
    cosine_sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:])  # Compare freelancer with jobs

    # Get the top recommended jobs based on similarity scores
    recommendations = [(i, score) for i, score in enumerate(cosine_sim[0]) if score > 0.1]  # filter by score threshold
    recommendations = sorted(recommendations, key=lambda x: x[1], reverse=True)  # Sort by highest similarity

    # Return the recommended jobs
    recommended_jobs = [(jobskills[i], score) for i, score in recommendations]
    return recommended_jobs

