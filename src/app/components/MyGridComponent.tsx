import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const MyGridComponent = ({ columnDefs, rowData }: any) => {
  return (
    <div
      className="ag-theme-alpine myAG_table"
      style={{ height: "300px", width: "100%" }}
    >
      <AgGridReact columnDefs={columnDefs} rowData={rowData} />
    </div>
  );
};

export default MyGridComponent;
