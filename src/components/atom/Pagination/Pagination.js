import React from 'react';
import ResponsivePagination from 'react-responsive-pagination';

import styles from './Pagination.module.css';

const PaginationComponent = ({ currentPage, totalItems, itemsPerPage, handlePageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <div className={styles.paginationContainer}>
      <h6 className="text-end mr-2">
        Total {totalItems} Records
      </h6>

      <ResponsivePagination current={currentPage} total={totalPages} onPageChange={(page) => handlePageChange(page)} />
    </div>
  );
};

export default PaginationComponent;
