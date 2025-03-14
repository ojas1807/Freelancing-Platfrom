import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def recommend_freelancers_content_based(freelancer_id, df):
    # Ensure column names are clean
    df.columns = df.columns.str.strip()

    # Check if 'Skills', 'Tools', and 'Description' exist
    required_columns = ['Skills', 'Tools', 'Description']
    for col in required_columns:
        if col not in df.columns:
            print(f"❌ Error: Column '{col}' not found in dataset.")
            return pd.DataFrame()  # Return empty DataFrame in case of error

    # Convert missing values to empty strings to prevent NaN issues
    df.fillna("", inplace=True)

    # Create text features
    df['combined_features'] = df['Skills'].astype(str) + " " + df['Tools'].astype(str) + " " + df['Description'].astype(str)

    # TF-IDF Vectorization
    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform(df['combined_features'])

    # Compute similarity matrix
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

    # Find index of the freelancer
    idx = df.index[df["Id"] == freelancer_id].tolist()
    if not idx:
        return pd.DataFrame()
    idx = idx[0]

    # Get similarity scores and sort
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[1:6]  # Top 5 recommendations

    # Get freelancer IDs of recommended freelancers
    freelancer_indices = [i[0] for i in sim_scores]
    return df.iloc[freelancer_indices][["Id", "Name", "Skills", "Tools", "Description"]]
# import pandas as pd
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity

# def recommend_freelancers_content_based(freelancer_id, df):
#     try:
#         # Ensure column names are clean
#         df.columns = df.columns.str.strip()

#         # Validate required columns
#         required_columns = ["Id", "Name", "Skills", "Tools", "Description"]
#         for col in required_columns:
#             if col not in df.columns:
#                 print(f"❌ Error: Column '{col}' not found in dataset.")
#                 return {"error": f"Missing column: {col}"}

#         # Convert missing values to empty strings
#         df.fillna("", inplace=True)

#         # Create text features
#         df["combined_features"] = df["Skills"].astype(str) + " " + df["Tools"].astype(str) + " " + df["Description"].astype(str)

#         # TF-IDF Vectorization
#         vectorizer = TfidfVectorizer(stop_words="english")
#         tfidf_matrix = vectorizer.fit_transform(df["combined_features"])

#         # Compute similarity matrix
#         cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

#         # Get freelancer index
#         idx = df.index[df["Id"] == freelancer_id].tolist()
#         if not idx:
#             return {"error": f"Freelancer ID {freelancer_id} not found"}
#         idx = idx[0]

#         # Get similarity scores (excluding self)
#         sim_scores = np.argsort(-cosine_sim[idx])[1:6]  # Top 5 recommendations

#         # Recommended freelancers
#         recommendations = df.iloc[sim_scores][["Id", "Name", "Skills", "Tools", "Description"]].to_dict(orient="records")

#         return {"recommended_freelancers": recommendations}

#     except Exception as e:
#         return {"error": f"Unexpected error: {e}"}
