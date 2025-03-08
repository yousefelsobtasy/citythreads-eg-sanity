'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Pagination = ({ currentPage, hasNext, hasPrev }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const createPageUrl = (pageNumber) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className='mt-8 flex justify-between items-center'>
            <button
                className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${hasPrev
                    ? 'bg-gray-200 text-black hover:bg-gray-300 focus:ring-gray-400'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                aria-label='Previous Page'
                disabled={!hasPrev}
                onClick={() => createPageUrl(currentPage - 1)}
            >
                Previous
            </button>
            <button
                className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${hasNext
                    ? 'bg-gray-200 text-black hover:bg-gray-300 focus:ring-gray-400'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                aria-label='Next Page'
                disabled={!hasNext}
                onClick={() => createPageUrl(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;