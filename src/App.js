import React, { useState, useEffect } from "react";
import PapaParse from "papaparse";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "./App.css";

function App() {
  const [auditLogData, setAuditLogData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        PapaParse.parse(fileContent, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            setAuditLogData(results.data);
          },
          error: (err) => {
            console.error("Error parsing CSV:", err);
          },
        });
      };
      reader.readAsText(selectedFile);
    }
  }, [selectedFile]);

  return (
    <div>
      <label htmlFor="csv-upload">Upload CSV File:</label>
      <input type="file" id="csv-upload" accept=".csv" onChange={handleFileChange} />
    <VerticalTimeline>
      {auditLogData.map((item, index) => (
        <VerticalTimelineElement
          key={index}
          date={item.TimeStamp}
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          icon={<div />}
        >
          <h3 className="vertical-timeline-element-title">{item["Audit Event"]}</h3>
          <h4 className="vertical-timeline-element-subtitle">{item.User}</h4>
          <div className="additional-data">
            {Object.keys(item).map((key) => {
              if (key !== "TimeStamp" && key !== "Audit Event" && key !== "User") {
                return (
                  <p key={key}>
                    <b>{key}:</b> {item[key]}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </VerticalTimelineElement>
      ))}
      <VerticalTimelineElement
        iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
        icon={<div />}
      />
    </VerticalTimeline>
    </div>
  );
}

export default App;