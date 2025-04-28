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
