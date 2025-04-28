from pymongo import MongoClient

# Your MongoDB URI
MONGO_URI = "mongodb+srv://pritam:hustlr123@cluster1.xshmi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"

try:
    # Establishing a connection to the MongoDB cluster
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)  # 5 seconds timeout
    
    # Accessing the database (replace 'test' with your actual database name)
    db = client['test']
    
    # Accessing the clientprofiles collection (you can change this if you need a different collection)
    collection = db.clientprofiles  # Replace 'clientprofiles' with the actual collection name
    
    # Trying to fetch one document from the collection
    data = collection.find_one()
    
    # Output the data if found
    if data:
        print("MongoDB connection successful!")
        print(data)
    else:
        print("No data found in the collection.")

except Exception as e:
    print(f"Error: {e}")
