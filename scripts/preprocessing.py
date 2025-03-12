import pandas as pd
from sklearn.preprocessing import LabelEncoder

def load_dataset(filepath):
    """
    Load dataset from a CSV file, handling incorrect delimiters.
    """
    try:
        # Load dataset with auto-detection of delimiter
        df = pd.read_csv(filepath, delimiter=",", engine="python")

        # Debugging: Print first row to check structure
        print("✅ Dataset loaded successfully!")
        print("📊 Raw Columns in dataset:", df.columns.tolist())

        # Clean column names: Remove extra spaces and convert to lowercase
        df.columns = df.columns.str.replace(r"[\t ]+", " ", regex=True).str.strip().str.lower()

        print("📊 Cleaned Columns in dataset:", df.columns.tolist())  # Debugging Step
        return df
    except FileNotFoundError:
        print("❌ Error: File not found. Check the file path.")
        exit()
    except Exception as e:
        print(f"❌ Unexpected error while loading dataset: {e}")
        exit()

def handle_missing_values(df):
    """
    Handle missing values by forward filling.
    """
    df.fillna("", inplace=True)  # Fill NaN with empty string to avoid KeyErrors
    print("✅ Missing values handled.")
    return df

def encode_categorical(df, categorical_columns):
    """
    Encode categorical features using Label Encoding.
    """
    label_encoders = {}
    for col in categorical_columns:
        if col in df.columns:
            le = LabelEncoder()
            df[col] = le.fit_transform(df[col].astype(str))
            label_encoders[col] = le
        else:
            print(f"⚠️ Warning: Column '{col}' not found in dataset. Skipping encoding.")
    return df, label_encoders

def preprocess_pipeline():
    """
    Main preprocessing pipeline function.
    """
    filepath = "C:/Users/hp/OneDrive/Desktop/PROJECTS/Freelancing-Platfrom/flask_backend/data/freelancers_dataset_final.csv"
    
    # Step 1: Load Dataset
    df = load_dataset(filepath)

    # Step 2: Handle Missing Values
    df = handle_missing_values(df)

    # Step 3: Ensure Required Columns Exist
    required_columns = ["skills", "tools", "description", "country"]  # Ensure lowercase
    missing_columns = [col for col in required_columns if col not in df.columns]

    if missing_columns:
        print(f"❌ Error: Missing columns in dataset: {missing_columns}")
        print("👉 Available columns:", df.columns.tolist())  # Extra Debugging
        exit()

    # Step 4: Encode Categorical Data
    categorical_columns = ["country"]  # Add more if needed
    df, _ = encode_categorical(df, categorical_columns)

    # Step 5: Save Preprocessed Data
    output_filepath = "C:/Users/hp/OneDrive/Desktop/PROJECTS/Freelancing-Platfrom/flask_backend/data/preprocessed_data.csv"
    df.to_csv(output_filepath, index=False)
    print(f"✅ Preprocessed data saved to {output_filepath}")

# Run the preprocessing pipeline
if __name__ == "__main__":
    preprocess_pipeline()
