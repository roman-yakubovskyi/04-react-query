import React from 'react';

type PaginationProps = {
  pageCount: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  onPageChange: (args: { selected: number }) => void;
  forcePage?: number;
  containerClassName?: string;
  activeClassName?: string;
  previousLabel?: React.ReactNode;
  nextLabel?: React.ReactNode;
};

type PageItem = number | '...';

const buildPages = (
  total: number,
  current: number,
  range: number,
  margin: number
): PageItem[] => {
  if (total <= 0) return [];

  const safeRange = Math.max(1, range);
  const safeMargin = Math.max(0, margin);
  const pages: PageItem[] = [];
  const maxVisible = safeMargin * 2 + safeRange;

  if (total <= maxVisible) {
    for (let i = 0; i < total; i += 1) pages.push(i);
    return pages;
  }

  const left = Math.max(current - Math.floor(safeRange / 2), safeMargin);
  const right = Math.min(
    current + Math.ceil(safeRange / 2) - 1,
    total - safeMargin - 1
  );

  for (let i = 0; i < safeMargin; i += 1) pages.push(i);
  if (left > safeMargin) pages.push('...');
  for (let i = left; i <= right; i += 1) pages.push(i);
  if (right < total - safeMargin - 1) pages.push('...');
  for (let i = total - safeMargin; i < total; i += 1) pages.push(i);

  return pages;
};

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  pageRangeDisplayed = 2,
  marginPagesDisplayed = 1,
  onPageChange,
  forcePage = 0,
  containerClassName,
  activeClassName,
  previousLabel = 'Previous',
  nextLabel = 'Next',
}) => {
  const total = Math.max(0, Math.floor(pageCount));
  if (total <= 1) return null;

  const current = Math.min(Math.max(Math.floor(forcePage), 0), total - 1);
  const pages = buildPages(
    total,
    current,
    pageRangeDisplayed,
    marginPagesDisplayed
  );

  const goTo = (page: number) => {
    if (page < 0 || page >= total || page === current) return;
    onPageChange({ selected: page });
  };

  return (
    <ul
      className={containerClassName}
      role="navigation"
      aria-label="Pagination"
    >
      <li>
        <button
          type="button"
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          aria-disabled={current === 0 ? 'true' : 'false'}
        >
          {previousLabel}
        </button>
      </li>
      {pages.map((item, idx) =>
        item === '...' ? (
          <li key={`ellipsis-${idx}`} aria-hidden="true">
            <button type="button" disabled aria-hidden="true">
              …
            </button>
          </li>
        ) : (
          <li
            key={item}
            className={item === current ? activeClassName : undefined}
          >
            <button
              type="button"
              onClick={() => goTo(item)}
              aria-current={item === current ? 'page' : undefined}
            >
              {item + 1}
            </button>
          </li>
        )
      )}
      <li>
        <button
          type="button"
          onClick={() => goTo(current + 1)}
          disabled={current === total - 1}
          aria-disabled={current === total - 1 ? 'true' : 'false'}
        >
          {nextLabel}
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
