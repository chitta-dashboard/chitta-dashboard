import { useState } from "react";
import TableWrapper from "../../custom-tables/table";
import Header from "./header";
import Body from "./body";
import Footer from "./footer";

const FarmersDetailsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  return (
    <TableWrapper>
      <Header />
      <Body page={currentPage} />
      <Footer page={currentPage} handlePageCount={handleChange} />
    </TableWrapper>
  );
};

export default FarmersDetailsTable;
