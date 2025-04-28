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