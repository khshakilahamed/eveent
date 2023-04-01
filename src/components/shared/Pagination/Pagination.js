import React from 'react';
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md';

const Pagination = ({ collectionArray, selectPageHandler, page, numberOfElementPerPage }) => {
    return (
        <div>
            {
                collectionArray?.length > 0 && <div className='flex justify-center py-5'>
                    <div className="btn-group">
                        <button
                            onClick={() => selectPageHandler(page - 1)}
                            className="btn btn-sm btn-outline btn-accent"
                        >
                            <MdOutlineArrowBackIos size={20} />
                        </button>
                        {
                            [...Array(Math.ceil(collectionArray?.length / numberOfElementPerPage))]?.map((_, i) => {
                                return <button
                                    key={i}
                                    onClick={() => selectPageHandler(i + 1)}
                                    className={`btn btn-sm btn-outline btn-accent ${page === i + 1 ? "btn-active" : ""}`}
                                >
                                    {i + 1}
                                </button>
                            })
                        }
                        <button
                            onClick={() => selectPageHandler(page + 1)}
                            className="btn btn-sm btn-outline btn-accent"
                        >
                            <MdOutlineArrowForwardIos size={20} />
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};

export default Pagination;