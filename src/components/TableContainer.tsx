import React from "react";

function TableContainer(props: { children: React.ReactNode; id: string }) {
  return (
    <table className="fw-table-container" id={props.id}>
      <tbody>{props.children}</tbody>
    </table>
  );
}

export default TableContainer;
