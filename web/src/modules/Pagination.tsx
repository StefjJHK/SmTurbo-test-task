import {useMemo, useState} from "react";
import {Pagination as BsPagination} from "react-bootstrap";

export interface PaginationPagesProps {
  count: number;
  visiblePagesCount: number
  countPerPage: number;
  onPageChange(from: number, to: number):void
}

export function Pagination({count, countPerPage, visiblePagesCount, onPageChange}: PaginationPagesProps) {
  const pages = [];
  const maxPagesCount = useMemo(() => (count / countPerPage) - 1, [count, countPerPage]);
  const [currentPage, setCurrentPage] = useState(0);

  const onPageChangeWrapper = (page: number) => {
    setCurrentPage(page);
    onPageChange(page * countPerPage, (page + 1) * countPerPage);
  }

  const onNextPage = () => {
    const nextPage = currentPage + 1;

    if (nextPage < maxPagesCount) {
      onPageChangeWrapper(nextPage);
    }
  }

  const onPrevPage = () => {
    const prevPage = currentPage - 1;

    if (prevPage > 0) {
      onPageChangeWrapper(prevPage)
    }
  }

  for (let page = currentPage; page <= maxPagesCount && page < currentPage + visiblePagesCount; page++) {
    pages.push(
      <BsPagination.Item
        active={page === currentPage}
        onClick={() => onPageChangeWrapper(page)}
        key={page}
      >
        {page + 1}
      </BsPagination.Item>
    )
  }

  return (
    <BsPagination>
      <BsPagination.First onClick={() => onPageChangeWrapper(0)}/>
      <BsPagination.Prev onClick={onPrevPage}/>
      {pages}
      <BsPagination.Next onClick={onNextPage}/>
      <BsPagination.Last onClick={() => onPageChangeWrapper(maxPagesCount)}/>
    </BsPagination>
  );
}