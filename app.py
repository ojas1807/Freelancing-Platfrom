from flask import Flask, request, jsonify
import pandas as pd
import os
import logging

# Import recommendation functions
from model.content_based import recommend_freelancers_content_based
from model.collaborative import recommend_jobs_collaborative

app = Flask(__name__)

# ✅ Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# ✅ Define dataset path
DATA_PATH = os.path.join(os.getcwd(), "data", "freelancers_dataset_final_4.csv")

# ✅ Function to load the dataset
def load_dataset(filepath):
    if not os.path.exists(filepath):
        logging.error(f"❌ Error: Dataset not found at {filepath}")
        return None
    try:
        df = pd.read_csv(filepath)
        df.columns = df.columns.str.strip()  # Clean column names
        logging.info("✅ Dataset loaded successfully!")
        return df
    except Exception as e:
        logging.error(f"❌ Error loading dataset: {e}")
        return None

df = load_dataset(DATA_PATH)

# ✅ Home Route
@app.route('/')
def home():
    return jsonify({"message": "Freelancer Recommendation System is Running!"})

# ✅ Freelancer Recommendation Route
@app.route('/recommend/freelancers', methods=['GET'])
def recommend_freelancers():
    if df is None:
        return jsonify({"error": "Dataset failed to load"}), 500

    freelancer_id = request.args.get('freelancer_id')
    
    if not freelancer_id:
        return jsonify({"error": "freelancer_id parameter is required"}), 400
    
    try:
        freelancer_id = int(freelancer_id)
    except ValueError:
        return jsonify({"error": "freelancer_id must be an integer"}), 400

    if "Id" not in df.columns:
        return jsonify({"error": "Missing column: Id"}), 500

    if freelancer_id not in df["Id"].values:
        return jsonify({"error": f"Freelancer ID {freelancer_id} not found"}), 404

    try:
        recommendations = recommend_freelancers_content_based(freelancer_id, df)
        return jsonify(recommendations.to_dict(orient='records'))
    except Exception as e:
        logging.error(f"❌ Error in freelancer recommendation: {e}")
        return jsonify({"error": "Internal server error"}), 500

# ✅ Job Recommendation Route
@app.route('/recommend/jobs', methods=['GET'])
def recommend_jobs():
    if df is None:
        return jsonify({"error": "Dataset failed to load"}), 500

    freelancer_id = request.args.get('freelancer_id')
    
    if not freelancer_id:
        return jsonify({"error": "freelancer_id parameter is required"}), 400
    
    try:
        freelancer_id = int(freelancer_id)
    except ValueError:
        return jsonify({"error": "freelancer_id must be an integer"}), 400

    if "Id" not in df.columns:
        return jsonify({"error": "Missing column: Id"}), 500

    if freelancer_id not in df["Id"].values:
        return jsonify({"error": f"Freelancer ID {freelancer_id} not found"}), 404

    try:
        recommendations = recommend_jobs_collaborative(freelancer_id, df)
        return jsonify(recommendations)
    except Exception as e:
        logging.error(f"❌ Error in job recommendation: {e}")
        return jsonify({"error": "Internal server error"}), 500

# ✅ Run the Flask App
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)