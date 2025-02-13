import { useState, useEffect } from 'react';

const usePagination = (items: any[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentItems, setCurrentItems] = useState<any[]>([]);

  const totalPages = Math.ceil((items.length || 1) / itemsPerPage);

  useEffect(() => {
    setCurrentItems(
      items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    );
  }, [items, currentPage, itemsPerPage]);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return {
    currentItems,
    currentPage,
    handleNextPage,
    handlePrevPage,
    totalPages,
  };
};

export default usePagination;
