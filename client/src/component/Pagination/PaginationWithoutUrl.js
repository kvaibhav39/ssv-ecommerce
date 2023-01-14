import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ totalRecords, onPageChange, startValue }) => {
  const pages = Math.ceil(totalRecords / 10);

  const handleClick = (page) => {
    let pageNumber = page.selected + 1;
    if (onPageChange) {
      if (pageNumber === 1) {
        onPageChange(0);
      } else {
        onPageChange((pageNumber - 1) * 10);
      }
    }
  };

  return (
    <tr className="row" style={{ display: "block" }}>
      <td
        className="col footable-visible"
        style={{ display: "block", textAlign: "right" }}
      >
        {pages === 1 || pages === 0 ? null : (
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={1}
            onPageChange={handleClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
            forcePage={
              startValue && startValue === 0 ? startValue : startValue / 10
            }
          />
        )}
      </td>
    </tr>
  );
};

export default Pagination;
