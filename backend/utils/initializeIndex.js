import { Client } from "@elastic/elasticsearch";

const client = new Client({ node: "http://localhost:9200" });

async function initializeIndex() {
  const indexName = "freelancers";

  try {
    const { body: exists } = await client.indices.exists({ index: indexName });

    if (exists) {
      console.log("Index already exists. Skipping initialization.");
      return;
    }

    await client.indices.create({
      index: indexName,
      body: {
        mappings: {
          properties: {
            name: { type: "text", analyzer: "standard" },
            title: { type: "text", analyzer: "standard" },
            description: { type: "text", analyzer: "standard" },
            skills: { type: "keyword" },
            rate: { type: "text" },
            experience: { type: "integer" },
            location: { type: "text", analyzer: "standard" },
            availability: { type: "text", analyzer: "standard" },
            rating: { type: "float" },
            projects: { type: "integer" },
            isBookmarked: { type: "boolean" },
            profilePic: { type: "text", index: false },
          },
        },
      },
    });

    console.log("Index initialized successfully.");
  } catch (error) {
    console.error("Error initializing index:", error);
  }
}

initializeIndex();