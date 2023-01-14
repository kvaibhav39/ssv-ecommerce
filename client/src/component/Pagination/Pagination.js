import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate, useParams } from "react-router-dom";

const Pagination = ({ totalRecords, onPageChange }) => {
  const navigate = useNavigate();
  let { page_number } = useParams();
  const pages = Math.ceil(totalRecords / 10);

  useEffect(() => {
    if (onPageChange) {
      if (parseInt(page_number) === 1) {
        onPageChange(0);
      } else {
        onPageChange((parseInt(page_number) - 1) * 10);
      }
    }
  }, [page_number]);

  const handleClick = (page) => {
    let pageNumber = page.selected + 1;
    navigate(
      `${window.location.pathname.split("/page")[0]}/page/${pageNumber}`
    );
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
            forcePage={page_number && parseInt(page_number) - 1}
          />
        )}
      </td>
    </tr>
  );
};

export default Pagination;
