import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./index.module.css";
export const Pagination = ({ itemsPerPage, pageNumber, total, fetchData }) => {
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(pageNumber);

  useEffect(() => {
    setPageCount(Math.ceil(total / itemsPerPage));
    setItemOffset(pageNumber);
  }, [itemOffset, itemsPerPage, total, pageNumber]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    setItemOffset(event.selected + 1);
    fetchData(event.selected + 1, itemsPerPage);
  };

  return (
    <div className="align-items-center d-flex justify-content-between p-3 row">
      <span>
        {`Showing `}
        <span className={styles.pageNumberStyle}>
          {(itemOffset - 1) * itemsPerPage + 1}
        </span>
        {` to `}
        <span className={styles.pageNumberStyle}>
          {itemOffset * itemsPerPage > total ? total : itemOffset * itemsPerPage}
        </span>
        {` of `}
        <span className={styles.pageNumberStyle}>{total}</span>
        {` results `}
      </span>
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        pageClassName={styles.paginationPrevNextStyle}
        pageLinkClassName={styles.paginationLinkStyle}
        previousClassName={styles.paginationPrevNextStyle}
        previousLinkClassName={styles.paginationPrevNextTextStyle}
        nextClassName={styles.paginationPrevNextStyle}
        nextLinkClassName={styles.paginationPrevNextTextStyle}
        breakLabel="..."
        breakClassName={styles.paginationDotStyle}
        breakLinkClassName={styles.paginationDotTextStyle}
        containerClassName={styles.pagination}
        activeClassName={styles.activePage}
        renderOnZeroPageCount={null}
        forcePage={pageNumber - 1}
      />
    </div>
  );
};
