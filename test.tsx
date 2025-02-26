import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomAutoComplete from "./CustomAutoComplete"; // Adjust the import path as needed

function ApplicationSelector() {
  // State for selected application
  const [newapplication, setNewApplication] = useState("");

  // State for dropdown options
  const [options, setOptions] = useState([]);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});

  // Fetch data on component mount
  useEffect(() => {
    fetchApplicationData();
  }, []);

  const fetchApplicationData = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.get(
        "https://your-api-endpoint/applications"
      );

      // Extract unique application names from the API response
      const applicationOptions = extractUniqueApplications(response.data);
      setOptions(applicationOptions);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching application data:", err);
      setLoading(false);
      setError((prev) => ({
        ...prev,
        application:
          "Failed to fetch application data. Please try again later.",
      }));
    }
  };

  // Extract unique Application values from the API response
  const extractUniqueApplications = (responseData) => {
    try {
      // Check if the data property exists and is an array
      if (responseData.data && Array.isArray(responseData.data)) {
        // Extract all Application values
        const applications = responseData.data.map((item) => item.Application);

        // Remove duplicates using Set
        const uniqueApplications = [...new Set(applications)];

        // Filter out any undefined or null values
        return uniqueApplications.filter((app) => app);
      }

      // Fallback
      console.warn("Unexpected data format", responseData);
      return [];
    } catch (err) {
      console.error("Error extracting application options:", err);
      return [];
    }
  };

  return (
    <div>
      <label className="">
        <div className="">
          <span>
            Application <span style={{ color: "red" }}>*</span>
          </span>
          <span></span>
        </div>

        <CustomAutoComplete
          id="application"
          limitTags={1}
          options={options}
          value={newapplication}
          onChange={(e, newValue) => {
            setNewApplication(newValue);
            if (e.application) {
              setError((prevError) => ({ ...prevError, application: "" }));
            }
          }}
          placeholder={
            loading ? "Loading applications..." : "Select Application"
          }
          error={!!error.application || !!error.api}
        />

        {/* Display error message if any */}
        {(error.api || error.application) && (
          <div style={{ color: "red", fontSize: "0.75rem", marginTop: "4px" }}>
            {error.api || error.application}
          </div>
        )}
      </label>
    </div>
  );
}

export default ApplicationSelector;
