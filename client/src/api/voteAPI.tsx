// Import the VoteData interface for typing Vote info
import { VoteData } from "../interfaces/VoteData.tsx";

const createVote = async (voteData: VoteData) => {
  try {
    const response = await fetch("/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(voteData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating vote:", error);
    return Promise.reject("Could not create vote");
  }
};

export { createVote };
