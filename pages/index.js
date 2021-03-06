import React, { useEffect } from "react";
import { useGetData } from "../components/api";
import { ExportReactCSV } from "../components/ExportReactCSV";
import Chart from "../components/Charts";
import Table from "../components/Table";
import $ from "jquery";
import DataTable from "datatables.net";
import MetricCard from "../components/cards";

$.DataTable = DataTable;

export default function IndexPage() {
  useEffect(() => {
    $(document).ready(function ($) {
      $("#tableCovid").DataTable({
        paging: false,
      });
    });
  });

  const { covids, error } = useGetData("/");

  if (error) return <h1>Something went wrong!</h1>;
  if (!covids) return <h1>Loading...</h1>;

  return (
    <div className="container">
      <div className="card">
        <div className="card-header d-flex">
          <h2>Covid Update Indonesia</h2>
          <div className="ml-auto p-2">
            <ExportReactCSV csvData={covids.regions} fileName={"covid.csv"} />
          </div>
        </div>
        <div className="card-body">
          <MetricCard metric={covids.numbers} />
        </div>
      </div>

      <table
        id="tableCovid"
        className="table table-striped table-border"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            <th>Province</th>
            <th>Positive Cases</th>
            <th>Recovered Cases</th>
            <th>Death Cases</th>
          </tr>
        </thead>
        <tbody>
          <>
            {covids.regions.map((covid, index) => (
              <Table covid={covid} key={index} />
            ))}
          </>
        </tbody>
      </table>
      {covids.regions.map((covid, index) => (
              <Chart covid={covid} key={index} />
            ))}
    </div>
  );
}
