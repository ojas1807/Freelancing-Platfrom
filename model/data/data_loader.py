from pymongo import MongoClient

# MongoDB URI
MONGO_URI = "mongodb+srv://pritam:hustlr123@cluster1.xshmi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"

def load_client_descriptions():
    try:
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)  # 5 seconds timeout
        db = client['test']  # Replace with your actual database name
        collection = db.clientprofiles  # Client collection
        clients = list(collection.find())
        
        print(f"Found {len(clients)} clients in the database.")
        # print("Client data:", clients)  # Debugging
        return clients
    
    except Exception as e:
        print(f"Error: {e}")
        return []

def load_freelancer_skills():
    try:
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)  # 5 seconds timeout
        db = client['test']  # Replace with your actual database name
        collection = db.freelancerprofiles  # Freelancer collection
        freelancers = list(collection.find())
        
        print(f"Found {len(freelancers)} freelancers in the database.")
        return freelancers
    
    except Exception as e:
        print(f"Error: {e}")
        return []
    

def load_job_skills():
    try:
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)  # 5 seconds timeout
        db = client['test']  # Replace with your actual database name
        collection = db.jobs  # Job skills collection
        job_skills = list(collection.find())
        
        print(f"Found {len(job_skills)} job skills in the database.")
        return job_skills
    
    except Exception as e:
        print(f"Error: {e}")
        return []



# @app.route("/api/recommendations", methods=["POST"])  # Changed to POST
# def get_recommendations():
#     """
#     API endpoint to get freelancer recommendations for a client.
#     Expects a JSON payload with the client's `userId`.
#     """
#     try:
#         # Get the client ID from the request
#         print("Request data:", request.json)  # Debugging
#         data = request.json
#         client_id = data.get("userId")

#         if not client_id:
#             return jsonify({"error": "Client userId is required"}), 400

#         print("Received clientId:", client_id)  # Debugging

#         # Convert client_id to ObjectId
#         try:
#             client_object_id = ObjectId(client_id)
#         except Exception as e:
#             return jsonify({"error": "Invalid client userId format"}), 400

#         # Find the client by userId
#         client = next((c for c in clients if c["userId"] == client_object_id), None)
#         if not client:
#             print("Client not found. Available clients:", [str(c["userId"]) for c in clients])  # Debugging
#             return jsonify({"error": "Client not found"}), 404

#         # Get recommendations for the client
#         recommended_freelancers = recommend_freelancers(client, freelancers)

#         # Format the response
#         response = [
#             {
#                 "freelancerId": str(freelancer["userId"]),  # Convert ObjectId to string
#                 "similarityScore": score,
#                 "freelancerName": freelancer.get("name", "Unknown"),
#                 "skills": freelancer.get("skills", []),
#                 "description": freelancer.get("description", ""),
#             }
#             for freelancer, score in recommended_freelancers
#         ]

#         return jsonify({"recommendations": response}), 200

#     except Exception as e:
#         print(f"Error: {e}")
#         return jsonify({"error": "An error occurred while processing the request"}), 500