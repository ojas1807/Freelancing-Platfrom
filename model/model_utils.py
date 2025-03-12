import pandas as pd
import numpy as np
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def load_dataset(filepath="data/freelancers_dataset_final.csv"):
    """Load dataset from CSV file."""
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"Dataset not found at {filepath}")
    
    df = pd.read_csv(filepath)
    return df

def preprocess_text(df, text_columns):
    """Combine multiple text-based columns into a single feature for vectorization."""
    df.fillna("", inplace=True)  # Handle missing values
    
    df["combined_text"] = df[text_columns].apply(lambda x: " ".join(x), axis=1)
    return df

def compute_tfidf_similarity(df, column="combined_text"):
    """Compute TF-IDF similarity scores based on textual descriptions."""
    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform(df[column])
    
    # Compute cosine similarity
    similarity_matrix = cosine_similarity(tfidf_matrix, tfidf_matrix)
    
    return similarity_matrix

def get_top_n_similar(similarity_matrix, index, n=5):
    """Retrieve top N similar freelancers based on cosine similarity."""
    similar_indices = np.argsort(similarity_matrix[index])[::-1][1:n+1]  # Exclude self-match
    return similar_indices
