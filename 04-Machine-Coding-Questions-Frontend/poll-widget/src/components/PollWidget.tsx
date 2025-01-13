import React, { CSSProperties, useEffect, useState } from "react";
import { Option } from "../types";

interface PollProps {
  pollId: number;
  title: string;
  options: Option[];
  isMultiple?: boolean;
  onVote: (pollId: number, selectedOptions: number[]) => Promise<Option[]>;
  onVoteRemove: (
    pollId: number,
    selectedOptions: number[]
  ) => Promise<Option[]>;
  styles?: PollStyles;
}

interface PollStyles {
  container?: CSSProperties;
  title?: CSSProperties;
  optionsContainer?: CSSProperties;
  optionLabel?: CSSProperties;
  optionInput?: CSSProperties;
  optionVotes?: CSSProperties;
  progressBar?: CSSProperties;
  progressBarFill?: CSSProperties;
  removeButton?: CSSProperties;
}

const PollWidget: React.FC<PollProps> = ({
  pollId,
  title,
  options,
  isMultiple = false,
  onVote,
  onVoteRemove,
  styles = {},
}) => {
  const [currentOptions, setCurrentOptions] = useState<Option[]>(options);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem(`poll-${pollId}`);
    if (storedItems) {
      setSelectedOptions(JSON.parse(storedItems));
    }
  }, [pollId]);

  const totalVotes = currentOptions.reduce(
    (acc, currVal) => acc + currVal.votes,
    0
  );

  const handleVote = async (optionId: number) => {
    let newSelectedOptions: number[];

    if (isMultiple) {
      //isMultiple selectedOptions

      if (selectedOptions.includes(optionId)) {
        //removeButton
        newSelectedOptions = selectedOptions.filter((id) => id !== optionId);
        const updatedOptions = await onVoteRemove(pollId, [optionId]);
        setCurrentOptions(updatedOptions);
      } else {
        newSelectedOptions = [...selectedOptions, optionId];
        const updatedOptions = await onVote(pollId, [optionId]);
        setCurrentOptions(updatedOptions);
      }
    } else {
      //change option
      if (selectedOptions.length > 0 && selectedOptions[0] != optionId) {
        const updatedOptions = await onVoteRemove(pollId, selectedOptions);
        setCurrentOptions(updatedOptions);
      }
      //selected options
      newSelectedOptions = [optionId];
      const updatedOptions = await onVote(pollId, newSelectedOptions);
      setCurrentOptions(updatedOptions);
    }

    setSelectedOptions(newSelectedOptions);
    localStorage.setItem(`poll-${pollId}`, JSON.stringify(newSelectedOptions));
  };

  const handleRemoveVote = async () => {
    const updatedOptions = await onVoteRemove(pollId, selectedOptions);
    setSelectedOptions([]);
    localStorage.removeItem(`poll-${pollId}`);
    setCurrentOptions(updatedOptions);
  };

  return (
    <fieldset
      className="p-4 border border-teal-900 rounded-lg max-w-md mx-auto text-black "
      role="group"
      aria-labelledby={`poll-${pollId}-title`}
      style={styles.container}
    >
      <legend className="text-lg font-semibold" style={styles.title}>
        {title}
      </legend>
      <div
        className="space-y-2 overflow-y-auto"
        style={{
          ...styles.optionsContainer,
          maxHeight: currentOptions.length > 4 ? "200px" : "auto",
        }}
      >
        {currentOptions.map((option) => {
          const percentage =
            totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
          return (
            <div key={option.id} className="space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor=""
                  style={styles.optionLabel}
                  className="flex items-center space-x-2"
                >
                  <input
                    id={`option-${option.id}`}
                    type={isMultiple ? "checkbox" : "radio"}
                    checked={selectedOptions.includes(option.id)}
                    aria-checked={selectedOptions.includes(option.id)}
                    aria-describedby={`option-${option.id}-info`}
                    onChange={() => handleVote(option.id)}
                    style={styles.optionInput}
                  />
                  <span id={`option-${option.id}-info`}>{option.title}</span>
                </label>
                {selectedOptions.length > 0 && (
                  <span>
                    {option.votes} votes ({percentage.toFixed(1)}%)
                  </span>
                )}
              </div>
              <div
                className="w-full bg-gray-500 rounded-full h-2"
                style={styles.progressBar}
              >
                {selectedOptions.length > 0 && (
                  <div
                    className="bg-blue-500 h-full rounded-full transform origin-left"
                    style={{
                      ...styles.progressBarFill,
                      transform: `scaleX(${percentage / 100})`,
                    }}
                  ></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {selectedOptions.length > 0 && (
        <button
          className="mt-4 bg-red-500 text-white py-1 px-3 rounded-xl"
          style={styles.removeButton}
          onClick={handleRemoveVote}
        >
          Remove Vote
        </button>
      )}
    </fieldset>
  );
};

export default PollWidget;
