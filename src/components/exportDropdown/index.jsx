import { useRef } from "react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useReactToPrint } from "react-to-print";
import { GoDownload } from "react-icons/go";
import { IoPrintOutline } from "react-icons/io5";
import { PiNewspaperLight } from "react-icons/pi";
import { HiOutlineNewspaper } from "react-icons/hi2";
// import PrintTable from "../table/printTable";
import Dropdown from "../dropdown";

const ExportDropDown = ({ exportData, title, filename }) => {
  const componentRefPDF = useRef();
  const excelRef = useRef();

  const exportDropdownItems = [
    { label: "Print", action: "print", icon: <IoPrintOutline size="1.1rem" /> },
    { label: "Cvs", action: "cvs", icon: <PiNewspaperLight size="1.1rem" /> },
    // { label: "Pdf", action: "pdf", icon: <HiOutlineNewspaper size="1.1rem" /> },
  ];

  // console.log({ exportData });

  const handleDropdownExport = (action) => {
    if (action === "print") {
      handleExportPrint();
    } else if (action === "cvs") {
      handleExportCVS();
    }
  };

  //   const handleExportPDF = () => {
  //     const pdf = new jsPDF();
  //     pdf.text({ title }, 9.5, 10);
  //     pdf.autoTable({ html: "#mytable" });
  //     pdf.save("order_list_data.pdf");
  //   };

  //   const handleExportPrint = useReactToPrint({
  //     content: () => componentRefPDF.current,
  //     documentTitle: "Order List",
  //     onAfterPrint: () => console.log("SUCCESS...."),
  //   });

  const handleExportPrint = () => {
    const pdf = new jsPDF();
    // pdf.setProperties({ title: 'test' });
    pdf.setFontSize(18);
    pdf.setFont("Helvetica", "normal");
    pdf.setTextColor(64, 64, 64);
    pdf.text(`${title}`, pdf.internal.pageSize.width / 2, 10, {
      align: "center",
    });
    pdf.autoTable({ html: "#mytable", theme: "grid" });
    // Get total number of pages
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(10);
      pdf.setTextColor(64, 64, 64);
      //Print page number
      pdf.text(
        `Page ${i} of ${totalPages}`,
        pdf.internal.pageSize.width / 2,
        pdf.internal.pageSize.height - 10,
        {
          align: "center",
        }
      );
    }
    pdf.autoPrint();
    pdf.output("dataurlnewwindow");
  };

  const handleExportCVS = () => {
    excelRef.current.link.click();
  };

  return (
    <>
      <Dropdown
        title="Export"
        items={exportDropdownItems}
        icon={<GoDownload size="1rem" className="mr-2" />}
        titleClass="text-sm relative w-full justify-center bg-gray-300 flex items-center py-2 px-6 rounded-md text-gray-600"
        menuItemsClass="absolute left-0 w-full"
        handleOnClick={handleDropdownExport}
      />
      <div className="hidden">
        <span ref={componentRefPDF}>
          {/* <PrintTable data={exportData} title={title} id="mytable" /> */}
          {/* May be some of them are useless in this component, become i want to remove only column, but i have data in array also */}
        </span>
        <CSVLink data={exportData} ref={excelRef} filename={filename} />
      </div>
    </>
  );
};

export default ExportDropDown;
