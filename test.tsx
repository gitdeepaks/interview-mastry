import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomAutoComplete from "./CustomAutoComplete";

function SystemIdSelector() {
  const [systemId, setSystemId] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});

  useEffect(() => {
    fetchSystemIdData();
  }, []);

  const fetchSystemIdData = async () => {
    try {
      // Authentication credentials
      const username = "your_username";
      const password = "your_password";

      // Use browser's built-in btoa for Base64 encoding
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

      // Use the browser's built-in XML parser
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "text/xml");

      // Extract sys_id values using the DOM API
      const systemIds = [];
      const resultNodes = xmlDoc.getElementsByTagName("result");

      for (let i = 0; i < resultNodes.length; i++) {
        const sysIdNode = resultNodes[i].getElementsByTagName("sys_id")[0];
        if (sysIdNode && sysIdNode.textContent) {
          systemIds.push(sysIdNode.textContent);
        }
      }

      setOptions(systemIds);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching system ID data:", err);
      setLoading(false);
      setError((prev) => ({ ...prev, api: "Failed to fetch system ID data" }));
    }
  };

  return (
    <div>
      <label className="">
        <div className="">
          <span>
            System ID <span style={{ color: "red" }}>*</span>
          </span>
          <span></span>
        </div>

        <CustomAutoComplete
          id="systemId"
          limitTags={1}
          options={options}
          value={systemId}
          onChange={(e, newValue) => {
            setSystemId(newValue);
            if (e.systemId) {
              setError((prevError) => ({ ...prevError, systemId: "" }));
            }
          }}
          placeholder={loading ? "Loading system IDs..." : "Select System ID"}
          error={!!error.systemId || !!error.api}
        />

        {(error.api || error.systemId) && (
          <div style={{ color: "red", fontSize: "0.75rem", marginTop: "4px" }}>
            {error.api || error.systemId}
          </div>
        )}
      </label>
    </div>
  );
}

export default SystemIdSelector;
