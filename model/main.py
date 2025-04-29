from flask import Flask, jsonify, request
from data.data_loader import load_client_descriptions, load_freelancer_skills, load_job_skills
from models.content_based import recommend_freelancers, recommend_jobs
from bson import ObjectId
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load data from the database
clients = load_client_descriptions()
freelancers = load_freelancer_skills()
jobs = load_job_skills()  # Load job data

@app.route("/")
def homepage():
    """
    Simple homepage route to check if the server is running.
    """
    return jsonify({"message": "Welcome to the Freelancer Recommendation API!"}), 200

from bson import ObjectId  # Import ObjectId for MongoDB ID comparison

@app.route("/api/recommended-jobs/<user_id>", methods=["GET"])
def get_recommended_jobs(user_id):
    """
    Get recommended jobs for a specific freelancer.
    """
    try:
        if not user_id:
            return jsonify({"error": "User ID is required"}), 400

        # Convert user_id to ObjectId
        try:
            freelancer_object_id = ObjectId(user_id)
        except Exception as e:
            return jsonify({"error": "Invalid user ID format"}), 400

        # Debugging: Log the type of freelancer_object_id
        print("freelancer_object_id:", type(freelancer_object_id))

        # Find the freelancer by userId
        freelancer = next(
            (f for f in freelancers if f["userId"] == freelancer_object_id),
            None,
        )
        if not freelancer:
            return jsonify({"error": "Freelancer not found"}), 404

        # Get job recommendations
        recommended_jobs = recommend_jobs(freelancer, jobs)

        # Format the response
        formatted_recommendations = []
        for job, score in recommended_jobs:
            # Debugging: Log the job data
            print("Job data:", job)

            # Handle client field
            client_name = "Unknown"
            client_user_id = None
            if isinstance(job.get("client"), ObjectId):
                # Fetch client details if job["client"] is an ObjectId
                client = next((c for c in clients if c["_id"] == job["client"]), None)
                if client:
                    client_name = client.get("name", "Unknown")
                    client_user_id = str(client.get("userId", ""))
            elif isinstance(job.get("client"), dict):
                # If job["client"] is already a dictionary
                client_name = job["client"].get("name", "Unknown")
                client_user_id = str(job["client"].get("userId", ""))

            formatted = {
                "_id": str(job["_id"]),  # Convert ObjectId to string
                "title": job.get("title", "Job Title"),
                "description": job.get("description", ""),
                "skills": job.get("skills", []),
                "budget": job.get("budget", {}),
                "duration": job.get("duration", ""),
                "client": {
                    "userId": client_user_id,
                    "name": client_name,
                },
                "similarityScore": score,
            }
            formatted_recommendations.append(formatted)

        return jsonify(formatted_recommendations), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred while fetching job recommendations"}), 500


@app.route("/api/recommendjobs", methods=["POST"])
def get_recommend_jobs():
    """
    API endpoint to get job recommendations for a freelancer.
    Expects a JSON payload with the freelancer's `userId`.
    """
    try:
        # Get the freelancer ID from the request
        print("Request data:", request.json)  # Debugging
        data = request.json
        freelancer_id = data.get("userId")

        if not freelancer_id:
            return jsonify({"error": "Freelancer userId is required"}), 400

        print("Received freelancerId:", freelancer_id)  # Debugging

        # Convert freelancer_id to ObjectId
        try:
            freelancer_object_id = ObjectId(freelancer_id)
        except Exception as e:
            print(f"Error converting freelancerId to ObjectId: {e}")
            return jsonify({"error": "Invalid freelancer userId format"}), 400

        # Find the freelancer by userId
        freelancer = next((f for f in freelancers if f["userId"] == freelancer_object_id), None)
        if not freelancer:
            print("Freelancer not found. Available freelancers:", [str(f["userId"]) for f in freelancers])  # Debugging
            return jsonify({"error": "Freelancer not found"}), 404

        # Get job recommendations for the freelancer
        recommended_jobs = recommend_jobs(freelancer, jobs)

        # Format the response
        response = []
        for job, score in recommended_jobs:
            # Ensure job is a dictionary
            if isinstance(job, dict):
                
                formatted = {
                    "jobId": str(job["_id"]),  # Convert ObjectId to string
                    "similarityScore": score,
                    "jobTitle": job.get("name", "Unknown"),
                    "description": job.get("description", ""),
                    "skills": job.get("skills", []),
                    "budget": job.get("budget", {}),
                    "duration": job.get("duration", ""),
                    # "clientName": job["client"].get("name", "Unknown") if "client" in job else "Unknown",
                }
                response.append(formatted)
            else:
                print("Invalid job data:", job)  # Debugging

        return jsonify({"recommendations": response}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred while processing the request"}), 500




                
@app.route("/api/recommendations", methods=["POST"])  # Changed to POST
def get_recommendations():
    """
    API endpoint to get freelancer recommendations for a client.
    Expects a JSON payload with the client's `userId`.
    """
    try:
        # Get the client ID from the request
        print("Request data:", request.json)  # Debugging
        data = request.json
        client_id = data.get("userId")

        if not client_id:
            return jsonify({"error": "Client userId is required"}), 400

        print("Received clientId:", client_id)  # Debugging

        # Convert client_id to ObjectId
        try:
            client_object_id = ObjectId(client_id)
        except Exception as e:
            return jsonify({"error": "Invalid client userId format"}), 400

        # Find the client by userId
        client = next((c for c in clients if c["userId"] == client_object_id), None)
        if not client:
            print("Client not found. Available clients:", [str(c["userId"]) for c in clients])  # Debugging
            return jsonify({"error": "Client not found"}), 404

        # Get recommendations for the client
        recommended_freelancers = recommend_freelancers(client, freelancers)

        # Format the response
        response = [
            {
                "freelancerId": str(freelancer["userId"]),  # Convert ObjectId to string
                "similarityScore": score,
                "freelancerName": freelancer.get("name", "Unknown"),
                "skills": freelancer.get("skills", []),
                "description": freelancer.get("description", ""),
            }
            for freelancer, score in recommended_freelancers
        ]

        return jsonify({"recommendations": response}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred while processing the request"}), 500
    
@app.route("/api/recommended-freelancers/<user_id>", methods=["GET"])
def get_recommended_freelancers(user_id):
    """
    Get recommended freelancers for a specific user
    """
    try:
        if not user_id:
            return jsonify({"error": "User ID is required"}), 400

        try:
            client_object_id = ObjectId(user_id)
        except Exception as e:
            return jsonify({"error": "Invalid user ID format"}), 400

        # Find the client by userId
        client = next((c for c in clients if c["userId"] == client_object_id), None)
        if not client:
            return jsonify({"error": "User not found"}), 404

        # Get recommendations
        recommended = recommend_freelancers(client, freelancers)
        
        # Format the response to match frontend expectations
        formatted_recommendations = []
        for freelancer, score in recommended:
            formatted = {
                "_id": str(freelancer.get("userId", "")),
                "userId": str(freelancer.get("userId", "")),
                "name": freelancer.get("name", f"Freelancer {str(freelancer.get('userId', ''))[-4:]}"),
                "profileTitle": freelancer.get("profileTitle", "Freelancer"),
                "description": freelancer.get("description", ""),
                "skills": freelancer.get("skills", []),
                "specialties": freelancer.get("specialties", []),
                "hourlyRate": freelancer.get("hourlyRate", 50),
                "rating": freelancer.get("rating", 4.5),
                "completedProjects": freelancer.get("completedProjects", 5),
                "freelancerLevel": freelancer.get("level", "intermediate"),
                "workExperience": freelancer.get("workExperience", []),
                "profilePic": freelancer.get("profilePic", "https://randomuser.me/api/portraits/lego/1.jpg"),
                "similarityScore": score
            }
            formatted_recommendations.append(formatted)
        
        return jsonify(formatted_recommendations), 200
        
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred while fetching recommendations"}), 500    


if __name__ == "__main__":
    app.run(debug=True, port=5000)