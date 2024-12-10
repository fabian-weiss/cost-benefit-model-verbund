import React from "react";

function TableContainer(props: { children: React.ReactNode; id: string }) {
  return <table id={props.id}>{props.children}</table>;
}

export default TableContainer;
