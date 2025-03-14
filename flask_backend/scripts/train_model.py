import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from surprise import Dataset, Reader, SVD
from surprise.model_selection import train_test_split

# 📌 Load Freelancer Dataset (for Content-Based Filtering)
DATA_PATH = "data/freelancers_dataset_final_4.csv"
df = pd.read_csv(DATA_PATH)

if 'Id' not in df.columns or 'Skills' not in df.columns:
    raise ValueError("Dataset must contain 'Id' and 'Skills' columns.")

# ✅ Content-Based Filtering: TF-IDF + Cosine Similarity
df['Skills'] = df['Skills'].astype(str).str.lower()
vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = vectorizer.fit_transform(df['Skills'])
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

# Save content-based model
with open("models/content_based_model.pkl", "wb") as f:
    pickle.dump((df, cosine_sim, vectorizer), f)

print("✅ Content-based model trained and saved!")

# 📌 Load Freelancer Ratings Dataset (for Collaborative Filtering)
RATINGS_PATH = "data/freelancer_ratings.csv"
df_ratings = pd.read_csv(RATINGS_PATH)

if 'Freelancer ID' not in df_ratings.columns or 'Job ID' not in df_ratings.columns or 'Rating' not in df_ratings.columns:
    raise ValueError("Dataset must contain 'Freelancer ID', 'Job ID', and 'Rating' columns.")

# ✅ Collaborative Filtering: SVD Algorithm
reader = Reader(rating_scale=(1, 5))
data = Dataset.load_from_df(df_ratings[['Freelancer ID', 'Job ID', 'Rating']], reader)
trainset, testset = train_test_split(data, test_size=0.2)

model = SVD()
model.fit(trainset)

# Save collaborative model
with open("models/collaborative_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Collaborative filtering model trained and saved!")
