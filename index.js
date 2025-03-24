// Utility functions for mathematical operations
const styles = {
  container: {
    padding: "20px",
    margin: "10px",
    borderRadius: "4px",
    backgroundColor: "#f5f5f5",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  resultDisplay: {
    fontSize: "16px",
    color: "#333",
    fontFamily: "monospace",
    padding: "10px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#0056b3",
    },
  },
};

// Mathematical operation functions
const multiply = (a, b) => a * b;

// Higher-order function to apply operations
function applyOne(a, b, operation) {
  return operation(a, b);
}

// Component to display results
function OperationDisplay({ a, b, operation }) {
  const result = applyOne(a, b, operation);

  return (
    <div style={styles.container}>
      <div style={styles.resultDisplay}>Result: {result}</div>
      <button
        style={styles.button}
        onClick={() => console.log(`Operation result: ${result}`)}
      >
        Log Result
      </button>
    </div>
  );
}

// Example usage
const res = applyOne(2, 3, (a, b) => a + b);

// Export for use in other components
export { multiply, applyOne, OperationDisplay };
