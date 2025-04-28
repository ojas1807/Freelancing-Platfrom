from data.data_loader import load_client_descriptions, load_freelancer_skills
from models.content_based import recommend_freelancers


def main():
    # Load data from the database
    clients = load_client_descriptions()
    freelancers = load_freelancer_skills()

    if not clients or not freelancers:
        print("No clients or freelancers found in the database.")
        return

    # Select the first client (you can modify this to choose a client dynamically)
    client = clients[0]

    # Get recommendations for the client
    recommended_freelancers = recommend_freelancers(client, freelancers)

    # Display recommended freelancers
    if recommended_freelancers:
        print(f"Recommended freelancers for Client {client['userId']}:")
        for freelancer, score in recommended_freelancers:
            print(f"Freelancer {freelancer['userId']} with similarity score: {score:.4f}")
    else:
        print("No recommendations found for the client.")

if __name__ == "__main__":
    main()