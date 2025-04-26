import { Client } from "@elastic/elasticsearch";
import Freelancer from "../models/Freelancer.js";

const client = new Client({ node: "http://localhost:9200" });
const indexName = "freelancers";

class FreelancerController {
  // Get all freelancers
  static async getAllFreelancers(req, res) {
    try {
      const { body } = await client.search({
        index: indexName,
        query: { match_all: {} },
        size: 100,
      });

      const freelancers = body.hits.hits.map((hit) => hit._source);
      res.status(200).json(freelancers);
    } catch (error) {
      console.error("Error fetching freelancers:", error);
      res.status(500).json({ message: "Error fetching freelancers" });
    }
  }

  // Search freelancers
  static async searchFreelancers(req, res) {
    const { searchQuery, selectedSkills, rateRange, experienceLevel, availability } = req.body;

    try {
      const boolQuery = { must: [] };

      // Search query
      if (searchQuery) {
        boolQuery.must.push({
          multi_match: {
            query: searchQuery,
            fields: ["name", "title", "description"],
          },
        });
      }

      // Filter by skills
      if (selectedSkills?.length > 0) {
        boolQuery.must.push({ terms: { skills: selectedSkills } });
      }

      // Filter by rate range
      if (rateRange) {
        boolQuery.must.push({
          regexp: { rate: `\\$${rateRange[0]}-\\$${rateRange[1]}.*` },
        });
      }

      // Filter by experience level
      if (experienceLevel) {
        boolQuery.must.push({
          range: {
            experience: {
              gte: experienceLevel === "junior" ? 0 : experienceLevel === "mid" ? 3 : 6,
              lte: experienceLevel === "junior" ? 2 : experienceLevel === "mid" ? 5 : null,
            },
          },
        });
      }

      // Filter by availability
      if (availability) {
        boolQuery.must.push({
          match: { availability },
        });
      }

      const { body } = await client.search({
        index: indexName,
        query: { bool: boolQuery },
        size: 100,
      });

      const freelancers = body.hits.hits.map((hit) => hit._source);
      res.status(200).json(freelancers);
    } catch (error) {
      console.error("Error searching freelancers:", error);
      res.status(500).json({ message: "Error searching freelancers" });
    }
  }

  // Add a new freelancer
  static async addFreelancer(req, res) {
    try {
      const freelancer = new Freelancer(
        req.body.name,
        req.body.title,
        req.body.description,
        req.body.skills,
        req.body.rate,
        req.body.experience,
        req.body.location,
        req.body.availability,
        req.body.rating,
        req.body.projects,
        req.body.isBookmarked,
        req.body.profilePic
      );

      const { body } = await client.index({
        index: indexName,
        document: freelancer.getDetails(),
        refresh: true,
      });

      res.status(201).json({ message: "Freelancer added", id: body._id });
    } catch (error) {
      console.error("Error adding freelancer:", error);
      res.status(500).json({ message: "Error adding freelancer" });
    }
  }

  // Toggle bookmark
  static async toggleBookmark(req, res) {
    const freelancerId = req.params.id;

    try {
      // Fetch the freelancer
      const { body: freelancer } = await client.get({
        index: indexName,
        id: freelancerId,
      });

      // Toggle bookmark
      const updatedFreelancer = {
        ...freelancer._source,
        isBookmarked: !freelancer._source.isBookmarked,
      };

      // Update the freelancer
      await client.index({
        index: indexName,
        id: freelancerId,
        document: updatedFreelancer,
        refresh: true,
      });

      res.status(200).json({ message: "Bookmark toggled", freelancer: updatedFreelancer });
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      res.status(500).json({ message: "Error toggling bookmark" });
    }
  }
}

export default FreelancerController;