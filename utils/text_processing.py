import nltk
from nltk.corpus import stopwords
nltk.download('stopwords')

# Function to clean text
def clean_text(text):
    stop_words = set(stopwords.words('english'))
    words = text.split()
    cleaned_words = [word for word in words if word.lower() not in stop_words]
    return " ".join(cleaned_words)
