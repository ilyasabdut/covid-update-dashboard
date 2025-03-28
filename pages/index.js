import React, { useEffect, useRef } from "react";
import { useGetData } from "../components/api";
import { ExportReactCSV } from "../components/ExportReactCSV";
import Chart from "../components/Charts";
import Table from "../components/Table";
import $ from "jquery";
import DataTable from "datatables.net";
import MetricCard from "../components/Cards";

$.DataTable = DataTable;

export default function IndexPage() {
  const tableRef = useRef(null);
  const { covids, error } = useGetData(); // Removed unused path argument

  useEffect(() => {
    if (covids?.regions?.length > 0 && tableRef.current) {
      if (!$.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable({
          paging: false,
          destroy: true, // Ensures reinitialization doesn't break things
        });
      }
    }
  }, [covids]);

  if (error) return <h1>Something went wrong: {error.message}</h1>;
  if (!covids) return <h1>Loading...</h1>;

  return (
    <div className="container">
      <div className="card">
        <div className="card-header d-flex">
          <h2>Covid Update Indonesia</h2>
          <div className="ml-auto p-2">
            <ExportReactCSV csvData={covids?.regions || []} fileName={"covid.csv"} />
          </div>
        </div>
        <div className="card-body">
          <MetricCard metric={covids?.numbers} />
        </div>
      </div>

      <table
        ref={tableRef}
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
          {covids?.regions?.map((covid, index) => (
            <Table covid={covid} key={index} />
          ))}
        </tbody>
      </table>

      {covids?.regions?.map((covid, index) => (
        <Chart covid={covid} key={index} />
      ))}
    </div>
  );
}
