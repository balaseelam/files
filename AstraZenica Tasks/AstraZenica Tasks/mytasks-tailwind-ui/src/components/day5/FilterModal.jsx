import React from 'react';

function FilterModal({ filterOptions, filterValue, setFilterValue, handleClearFilter, handleApplyFilter }) {
    return (
        <>
            <div className="fixed top-5 left-5 absolute bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-4 rounded shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
                    {filterOptions.length > 0 ? (
                        <select
                            className="block w-full px-4 py-2 border border-gray-300 rounded mb-4"
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                        >
                            {filterOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type="text"
                            className="block w-full px-4 py-2 border border-gray-300 rounded mb-4"
                            placeholder="Enter filter value..."
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                        />
                    )}
                    <div className="flex justify-end">
                        <button
                            className="px-4 py-2 mr-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            onClick={handleClearFilter}
                        >
                            Clear Filter
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={handleApplyFilter}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FilterModal;
