import React, { useEffect, useState } from "react";
import "./App.css";
import PollWidget from "./components/PollWidget";
import { Poll as PollType } from "./types";
import { fetchPoll, removePoll, submitVote } from "./db/api";
import { PollSkeleton } from "./components/PollSkeleton";

function App() {
  const [pollData, setPollData] = useState<PollType | null>(null);

  useEffect(() => {
    const loadPoll = async () => {
      try {
        const data = await fetchPoll(41);
        setPollData(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    loadPoll();
  }, []);

  if (!pollData) {
    return (
      <div className="">
        <PollSkeleton />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start p-72 min-h-screen">
      <PollWidget
        pollId={pollData.id}
        title={pollData.question}
        options={pollData.options}
        onVote={submitVote}
        onVoteRemove={removePoll}
        styles={{}}
        isMultiple
      />
    </div>
  );
}

export default App;
