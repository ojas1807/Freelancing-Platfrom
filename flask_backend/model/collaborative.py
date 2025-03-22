import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

def recommend_jobs_collaborative(freelancer_id, df):
    # Ensure column names are clean
    df.columns = df.columns.str.strip()

    # Check if 'Id' exists
    if "Id" not in df.columns:
        print("❌ Error: 'Id' column not found in dataset.")
        return []

    # Create a dummy ratings matrix (Freelancers × Jobs)
    rating_matrix = df.pivot(index="Id", columns="Jobs_Title", values="Rating").fillna(0)

    # Compute similarity
    cosine_sim = cosine_similarity(rating_matrix)

    # Find index of freelancer
    if freelancer_id not in rating_matrix.index:
        return []

    idx = rating_matrix.index.get_loc(freelancer_id)

    # Get similarity scores
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[1:6]  # Top 5

    # Recommended jobs
    freelancer_indices = [i[0] for i in sim_scores]
    recommended_freelancers = rating_matrix.iloc[freelancer_indices].index.tolist()
    
    return {"recommended_freelancers": recommended_freelancers}
# import pandas as pd
# import numpy as np
# from sklearn.metrics.pairwise import cosine_similarity

# def recommend_jobs_collaborative(freelancer_id, df):
#     try:
#         # Ensure column names are clean
#         df.columns = df.columns.str.strip()

#         # Validate dataset
#         if "Id" not in df.columns or "Job_Title" not in df.columns or "Rating" not in df.columns:
#             print("❌ Error: Required columns ('Id', 'Job_Title', 'Rating') are missing.")
#             return {"error": "Invalid dataset structure"}

#         # Create a ratings matrix (Freelancers × Jobs)
#         rating_matrix = df.pivot(index="Id", columns="Job_Title", values="Rating").fillna(0)

#         # Compute cosine similarity
#         cosine_sim = cosine_similarity(rating_matrix)

#         # Ensure freelancer exists
#         if freelancer_id not in rating_matrix.index:
#             return {"error": f"Freelancer ID {freelancer_id} not found"}

#         idx = rating_matrix.index.get_loc(freelancer_id)

#         # Get similarity scores (excluding self)
#         sim_scores = np.argsort(-cosine_sim[idx])[1:6]  # Top 5

#         # Recommended job titles
#         recommended_jobs = rating_matrix.iloc[sim_scores].columns.tolist()

#         return {"recommended_jobs": recommended_jobs}

#     except Exception as e:
#         return {"error": f"Unexpected error: {e}"}
