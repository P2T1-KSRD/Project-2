import { VoteData } from "../interfaces/VoteData.tsx";
import Auth from "../utils/auth";

const createVote = async (voteData: VoteData) => {
  try {
    const response = await fetch("/api/votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
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

const deleteVote = async (voteData: VoteData) => {
  try {
    const response = await fetch("/api/votes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
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
    console.error("Error deleting vote:", error);
    return Promise.reject("Could not delete vote");
  }
};

export { createVote, deleteVote };
