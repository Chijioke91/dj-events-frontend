import Link from 'next/link';
import { PER_PAGE } from '@/config/index';

const Pagination = ({ page, eventTotal }) => {
  const lastPage = Math.ceil(eventTotal / PER_PAGE);
  return (
    <>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className="btn-secondary">Prev</a>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className="btn-secondary">Next</a>
        </Link>
      )}
    </>
  );
};

export default Pagination;
