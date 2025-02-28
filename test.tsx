import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomAutoComplete from "./CustomAutoComplete"; // Adjust import path

function ServerRequestForm() {
  // Form field states - using arrays
  const [selectedName, setSelectedName] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [purpose, setPurpose] = useState("");
  const [description, setDescription] = useState("");

  // Server data states
  const [nameOptions, setNameOptions] = useState([]);
  const [idOptions, setIdOptions] = useState([]);
  const [nameToIdMap, setNameToIdMap] = useState({});
  const [idToNameMap, setIdToNameMap] = useState({});

  // UI states
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch server data
  useEffect(() => {
    fetchServerData();
  }, []);

  const fetchServerData = async () => {
    try {
      const username = "your_username";
      const password = "your_password";
      const token = btoa(`${username}:${password}`);

      const response = await axios.get(
        "https://your-xml-api-endpoint/servers",
        {
          headers: {
            Authorization: `Basic ${token}`,
            Accept: "application/xml",
            "Content-Type": "application/xml",
          },
          responseType: "text",
        }
      );

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "text/xml");

      const names = [];
      const ids = [];
      const nameToId = {};
      const idToName = {};

      const resultNodes = xmlDoc.getElementsByTagName("result");

      for (let i = 0; i < resultNodes.length; i++) {
        const nameNode = resultNodes[i].getElementsByTagName("name")[0];
        const sysIdNode = resultNodes[i].getElementsByTagName("sys_id")[0];

        if (
          nameNode &&
          nameNode.textContent &&
          sysIdNode &&
          sysIdNode.textContent
        ) {
          const name = nameNode.textContent;
          const id = sysIdNode.textContent;

          names.push(name);
          ids.push(id);
          nameToId[name] = id;
          idToName[id] = name;
        }
      }

      setNameOptions(names);
      setIdOptions(ids);
      setNameToIdMap(nameToId);
      setIdToNameMap(idToName);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching server data:", err);
      setLoading(false);
    }
  };

  // Handle name selection change - updated for array values
  const handleNameChange = (e, newValue) => {
    // Ensure we're using an array
    const newName = Array.isArray(newValue)
      ? newValue
      : [newValue].filter(Boolean);
    setSelectedName(newName);

    // Update the ID based on name selection
    if (newName.length > 0 && nameToIdMap[newName[0]]) {
      setSelectedId([nameToIdMap[newName[0]]]);
    } else {
      setSelectedId([]);
    }
  };

  // Handle ID selection change - updated for array values
  const handleIdChange = (e, newValue) => {
    // Ensure we're using an array
    const newId = Array.isArray(newValue)
      ? newValue
      : [newValue].filter(Boolean);
    setSelectedId(newId);

    // Update the name based on ID selection
    if (newId.length > 0 && idToNameMap[newId[0]]) {
      setSelectedName([idToNameMap[newId[0]]]);
    } else {
      setSelectedName([]);
    }
  };

  // Handle form submission - simplified without validations
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setSubmitting(true);

    try {
      // Prepare the data for submission
      const formData = {
        serverName: selectedName.length > 0 ? selectedName[0] : "",
        serverId: selectedId.length > 0 ? selectedId[0] : "",
        purpose: purpose,
        description: description,
        // Add any other fields you need
      };

      // Make the POST request
      const response = await axios.post(
        "https://your-api-endpoint/submit",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle successful response
      console.log("Form submitted successfully:", response.data);
      setSuccessMessage("Server request submitted successfully!");

      // Optional: Reset form after successful submission
      resetForm();
    } catch (err) {
      console.error("Error submitting form:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Reset form to initial state - with empty arrays
  const resetForm = () => {
    setSelectedName([]);
    setSelectedId([]);
    setPurpose("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="server-request-form">
      <h2>Server Request Form</h2>

      {/* Success message */}
      {successMessage && (
        <div
          className="success-message"
          style={{ color: "green", marginBottom: "1rem" }}
        >
          {successMessage}
        </div>
      )}

      {/* Server Name Dropdown */}
      <div className="form-group" style={{ marginBottom: "1rem" }}>
        <label>
          <div>
            <span>
              Server Name <span style={{ color: "red" }}>*</span>
            </span>
          </div>

          <CustomAutoComplete
            id="serverName"
            limitTags={1}
            options={nameOptions}
            value={selectedName}
            onChange={handleNameChange}
            placeholder={loading ? "Loading servers..." : "Select Server Name"}
          />
        </label>
      </div>

      {/* System ID Dropdown */}
      <div className="form-group" style={{ marginBottom: "1rem" }}>
        <label>
          <div>
            <span>
              System ID <span style={{ color: "red" }}>*</span>
            </span>
          </div>

          <CustomAutoComplete
            id="systemId"
            limitTags={1}
            options={idOptions}
            value={selectedId}
            onChange={handleIdChange}
            placeholder={loading ? "Loading system IDs..." : "Select System ID"}
          />
        </label>
      </div>

      {/* Purpose Field */}
      <div className="form-group" style={{ marginBottom: "1rem" }}>
        <label>
          <div>
            <span>
              Purpose <span style={{ color: "red" }}>*</span>
            </span>
          </div>

          <input
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Enter purpose"
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
            }}
          />
        </label>
      </div>

      {/* Description Field */}
      <div className="form-group" style={{ marginBottom: "1rem" }}>
        <label>
          <div>
            <span>
              Description <span style={{ color: "red" }}>*</span>
            </span>
          </div>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            rows={4}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
            }}
          />
        </label>
      </div>

      {/* Form Buttons */}
      <div className="form-actions" style={{ display: "flex", gap: "0.5rem" }}>
        <button
          type="submit"
          disabled={submitting || loading}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: submitting ? "#cccccc" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: submitting ? "not-allowed" : "pointer",
          }}
        >
          {submitting ? "Submitting..." : "Submit Request"}
        </button>

        <button
          type="button"
          onClick={resetForm}
          disabled={submitting}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: submitting ? "not-allowed" : "pointer",
          }}
        >
          Reset
        </button>
      </div>
    </form>
  );
}

export default ServerRequestForm;
