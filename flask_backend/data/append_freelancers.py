import pandas as pd
import random

# Load existing dataset
file_path = "data/freelancers_dataset_final(4).csv"

try:
    df = pd.read_csv(file_path)
except FileNotFoundError:
    df = pd.DataFrame(columns=[
        "Id", "Name", "Country", "Description", "Profile picture", 
        "Skills", "Jobs completed", "Yrs of Experience", "Rating", 
        "Price per hr", "Availability", "LinkedIn prof", "Portfolio", "Tools"
    ])

# Generate 5000 new rows
new_data = []
for i in range(len(df), len(df) + 5000):
    new_data.append({
        "Id": i + 1,
        "Name": f"Freelancer_{i+1}",
        "Country": random.choice(["USA", "UK", "India", "Canada", "Germany"]),
        "Description": f"Expert in field {random.randint(1, 10)}",
        "Profile picture": f"profile_{i+1}.jpg",
        "Skills": random.choice(["Python, ML", "Java, Spring", "React, Node.js"]),
        "Jobs completed": random.randint(1, 100),
        "Yrs of Experience": random.randint(1, 15),
        "Rating": round(random.uniform(3.0, 5.0), 1),
        "Price per hr": random.randint(10, 100),
        "Availability": random.choice(["Full-time", "Part-time"]),
        "LinkedIn prof": f"https://linkedin.com/in/freelancer{i+1}",
        "Portfolio": f"https://portfolio.com/freelancer{i+1}",
        "Tools": random.choice(["VS Code", "Jupyter", "Figma", "Photoshop"])
    })

# Convert to DataFrame and append to CSV
new_df = pd.DataFrame(new_data)
new_df.to_csv(file_path, mode='a', header=False, index=False)

print("✅ 5000 rows appended successfully!")



# import pandas as pd

# file_path = "data/freelancers.csv"  # Update with your actual file path

# try:
#     df = pd.read_csv(file_path, delimiter=",", on_bad_lines="skip")  # Skip problematic lines
#     print("File loaded successfully!")
#     print(df.head())  # Display the first few rows
# except pd.errors.ParserError as e:
#     print("Error reading the CSV file:", e)

# # Optional: Save the cleaned dataset
# cleaned_file_path = "data/freelancers_dataset_final.csv"
# df.to_csv(cleaned_file_path, index=False)
# print(f"Cleaned file saved as {cleaned_file_path}")
