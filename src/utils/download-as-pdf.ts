// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { RefObject } from "react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// export const downloadAsPdf = async (
//   dialogContainerRef: RefObject<HTMLDivElement>,
//   fileName: string
// ) => {
//   const inputData = dialogContainerRef.current;
//   try {
//     const canvas = await html2canvas(inputData as HTMLElement);
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "px",
//       format: "a4",
//     });

//     const width = pdf.internal.pageSize.getWidth();
//     const height = (canvas.height * width) / canvas.width;

//     pdf.addImage(imgData, "PNG", 0, 0, width, height);
//     pdf.save(`${fileName}.pdf`);
//   } catch (err) {
//     console.error(err);
//   }
// };

export const downloadAsPdf = async (htmlId: string, fileName: string) => {
  const doc = new jsPDF();
  autoTable(doc, {
    html: `#${htmlId}`,
    useCss: true,
    tableWidth: "auto",
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 25 },
      2: { cellWidth: 20 },
      3: { cellWidth: 20 },
      4: { cellWidth: 20 },
      5: { cellWidth: "auto" },
    },
    styles: {
      overflow: "linebreak",
      cellWidth: "wrap",
      fontSize: 10,
    },
  });
  doc.save(`${fileName}.pdf`);
};
