import React, { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const MyGridComponent = ({ columnDefs, rowData }: any) => {
  const defaultPageSize = 10; // Set the default page size

  const gridApiRef = useRef<any>(null);

  const gridOptions = {
    pagination: true,
    paginationPageSize: defaultPageSize,
  };

  function onGridReady(params: any) {
    gridApiRef.current = params.api;
  }

  return (
    <div
      className="ag-theme-alpine myAG_table"
      style={{ height: "470px", width: "100%" }}
    >
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        gridOptions={gridOptions}
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default MyGridComponent;
