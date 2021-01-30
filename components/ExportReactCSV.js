import React from "react";
import { CSVLink } from "react-csv";

export const ExportReactCSV = ({ csvData, fileName }) => {
  const headers = [
    { label: "Province", key: "name" },
    { label: "Positive Cases", key: "numbers.infected" },
    { label: "Recovered Cases", key: "numbers.recovered" },
    { label: "Death Cases", key: "numbers.fatal" },
  ];
  return (
    <button type="button" className="btn btn-outline-primary">
      <CSVLink data={csvData} filename={fileName} headers={headers}>
        Export to CSV
      </CSVLink>
    </button>
  );
};
