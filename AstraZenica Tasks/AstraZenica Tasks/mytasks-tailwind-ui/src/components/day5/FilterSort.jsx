import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { BiSortAlt2 } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { MdModeEdit } from "react-icons/md";
import { BsSortAlphaUpAlt } from "react-icons/bs";
import { tableDataState } from './tableDataState';
import FilterModal from './FilterModal';

function FilterSort() {
    const [tableData, setTableData] = useRecoilState(tableDataState);
    const [sortingState, setSortingState] = useState({ column: null, order: 'asc', active: false, clickCount: 0 });
    const [originalData, setOriginalData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [filterValue, setFilterValue] = useState('');
    const [filterOptions, setFilterOptions] = useState([]);
    const [activeState, setActiveState] = useState({}); // New state to store active filters
    const [currCol, setCurrCol] = useState("");


    useEffect(() => {
        fetch('http://localhost:8282/data')
            .then(response => response.json())
            .then(data => {
                setTableData(data);
                setOriginalData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSort = (key) => {

        let newOrder = 'asc';
        let newActiveState = true;
        let newClickCount = sortingState.clickCount + 1;
        let dataToSort = [...tableData]; // Use tableData as default

        if (sortingState.column === key) {
            if (newClickCount === 3) {
                // Reset sorting state and display initial data
                setSortingState({ column: null, order: 'asc', active: false, clickCount: 0 });
                setTableData(originalData);
                return;
            }
            newOrder = sortingState.order === 'asc' ? 'desc' : 'asc';
            newActiveState = !(sortingState.order === 'desc' && sortingState.active);
        } else {
            newClickCount = 1; // Reset click count if switching to a new column
        }

        // Check if a filter is applied
        if (filterValue.trim() !== '') {
            // Filter is applied, sort the filtered data
            dataToSort = [...tableData].sort((a, b) => {
                if (!isNaN(a[key]) && !isNaN(b[key])) {
                    // If both values are numeric, compare as numbers
                    return newOrder === 'asc' ? a[key] - b[key] : b[key] - a[key];
                } else {
                    // If any value is non-numeric, compare as strings
                    return newOrder === 'asc' ? String(a[key]).localeCompare(String(b[key])) : String(b[key]).localeCompare(String(a[key]));
                }
            });
        } else {
            // No filter applied, sort the original data
            dataToSort = [...originalData].sort((a, b) => {
                if (!isNaN(a[key]) && !isNaN(b[key])) {
                    // If both values are numeric, compare as numbers
                    return newOrder === 'asc' ? a[key] - b[key] : b[key] - a[key];
                } else {
                    // If any value is non-numeric, compare as strings
                    return newOrder === 'asc' ? String(a[key]).localeCompare(String(b[key])) : String(b[key]).localeCompare(String(a[key]));
                }
            });
        }

        setTableData(dataToSort);
        setSortingState({ column: key, order: newOrder, active: newActiveState, clickCount: newClickCount });
    };

    const handleFilterClick = (key) => {
        // If the current column is already the active filter column, close the modal
        if (modalOpen && key === currCol) {
            setModalOpen(false);
        } else {
            // Otherwise, open the modal and set filter options
            const columnData = originalData.map(row => row[key]);
            const uniqueData = [...new Set(columnData)];
            if (uniqueData.length === columnData.length) {
                // Data is unique, open modal with input text
                setFilterOptions([]);
                setFilterValue('');
            } else {
                // Data has duplicates, open modal with select options
                setFilterOptions(uniqueData);
                setFilterValue(uniqueData[0]); // Set default value
            }
            setCurrCol(key);
            setModalOpen(true);
        }
    };
    
    useEffect(() => {
        let filteredData = [...originalData];

        // Apply filters based on activeState
        Object.keys(activeState).forEach(colName => {
            const filterInputs = activeState[colName];
            filteredData = filteredData.filter(row => {
                const value = row[colName];
                return value.toLowerCase().startsWith(filterInputs.toLowerCase());
            });
        });

        // Update the table data with filtered data
        setTableData(filteredData.length > 0 ? filteredData : originalData);
    }, [activeState, originalData, setTableData]);

    const handleApplyFilter = () => {
        setActiveState(prevActiveState => {
            // Update active filters for the current column
            return { ...prevActiveState, [currCol]: filterValue };
        });

        setModalOpen(false);
    };
    const handleClearFilter = () => {
        setActiveState(prevActiveState => {
            // Remove filter for the current column
            const { [currCol]: deletedFilter, ...newActiveState } = prevActiveState;
            return newActiveState;
        });

        setFilterValue('');
        setModalOpen(false);
    };

    const globalSearchHandler = (event) => {
        const searchQuery = event.target.value.toLowerCase();

        // Iterate over each row and column to search for the query
        const updatedTableData = originalData.map(row => {
            const updatedRow = {};
            Object.entries(row).forEach(([colKey, value]) => {
                // Convert value to string for consistent comparison
                const stringValue = String(value);
                // Check if the cell value (as string) contains the search query
                const lowerCaseValue = stringValue.toLowerCase();
                const indexOfQuery = lowerCaseValue.indexOf(searchQuery);
                if (indexOfQuery !== -1) {
                    // If the query is found, update the value with highlighting
                    const highlightedValue = (
                        <>
                            {stringValue.substring(0, indexOfQuery)}
                            <span style={{ backgroundColor: 'yellow' }}>
                                {stringValue.substring(indexOfQuery, indexOfQuery + searchQuery.length)}
                            </span>
                            {stringValue.substring(indexOfQuery + searchQuery.length)}
                        </>
                    );
                    updatedRow[colKey] = highlightedValue;
                } else {
                    // If the query is not found, keep the original value
                    updatedRow[colKey] = value;
                }
            });
            return updatedRow;
        });

        // Update the table data with the updated values
        setTableData(updatedTableData);
    };


    return (
        <div className="m-1 relative overflow-auto h-[600px] w-[100%] shadow-md sm:rounded-lg border-2 border-black">
        <input className='sticky m-2 p-1 h-8 w-48 border-2 rounded-sm border-black' placeholder='Search' onChange={globalSearchHandler} />
            <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-400">
                
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-50">
                    <tr>
                        {tableData.length > 0 && Object.keys(tableData[0]).map((key, index) => (
                            <th key={index} className="px-6 py-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-sans">{key}</span>
                                    <div className="flex items-center relative">
                                        <button
                                            className="ml-2 bg-transparent border-none outline-none cursor-pointer"
                                            onClick={() => handleSort(key)}
                                        >
                                            {sortingState.column === key && sortingState.active ? (
                                                sortingState.order === 'asc' ? (
                                                    <BsSortAlphaUpAlt className="text-red-500 w-5 h-5" />
                                                ) : (
                                                    <BsSortAlphaUpAlt
                                                        className="text-red-500 w-5 h-5 transform rotate-180"
                                                    />
                                                )
                                            ) : (
                                                <BiSortAlt2 className="w-5 h-5" />
                                            )}
                                        </button>
                                        <FiFilter
                                            className={`ml-2 w-5 h-5 ${activeState[key] ? 'text-green-500' : 'text-gray-600'}`}
                                            onClick={() => handleFilterClick(key)}
                                        />
                                        {/* Filter Modal */}
                                        {(modalOpen && key === currCol) &&
                                            <FilterModal

                                                filterOptions={filterOptions}
                                                filterValue={filterValue}
                                                setFilterValue={setFilterValue}
                                                handleClearFilter={handleClearFilter}
                                                handleApplyFilter={handleApplyFilter}
                                                columnName={key}
                                            />
                                        }
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* Table body */}
                <tbody>
                    {tableData.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={`${rowIndex % 2 === 0 ? 'even:bg-gray-50 even:dark:bg-gray-800' : 'odd:bg-white odd:dark:bg-gray-900'} border-b dark:border-gray-700`}
                        >
                            {Object.entries(row).map(([colKey, value], colIndex) => (
                                <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                                    {value === "Edit" ? (
                                        <MdModeEdit className="text-blue-200 w-5 h-5" />
                                    ) : (
                                        value
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default FilterSort;




// import { useEffect, useState } from 'react';
// import { useRecoilState } from 'recoil';
// import { BiSortAlt2 } from "react-icons/bi";
// import { FiFilter } from "react-icons/fi";
// import { MdModeEdit } from "react-icons/md";
// import { setSortOrder1, tableDataState } from './tableDataState';

// function FilterSort() {
//     const [tableData, setTableData] = useRecoilState(tableDataState);
//     const [sortOrder, setSortOrder] = useRecoilState(setSortOrder1);
//     const [sortingState, setSortingState] = useState({ column: null, order: 'asc', active: false, clickCount: 0 });
//     const [originalData, setOriginalData] = useState([]);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [filterValue, setFilterValue] = useState('');
//     const [filterOptions, setFilterOptions] = useState([]);

//     useEffect(() => {
//         fetch('http://localhost:8282/data')
//             .then(response => response.json())
//             .then(data => {
//                 setTableData(data);
//                 setOriginalData(data);
//             })
//             .catch(error => console.error('Error fetching data:', error));
//     }, [setTableData]);

//     const handleSort = (key) => {
//         let newOrder = 'asc';
//         let newActiveState = true;
//         let newClickCount = sortingState.clickCount + 1;
//         let dataToSort = [...tableData]; // Use tableData as default
        
//         if (sortingState.column === key) {
//             if (newClickCount === 3) {
//                 // Reset sorting state and display initial data
//                 setSortingState({ column: null, order: 'asc', active: false, clickCount: 0 });
//                 setTableData(originalData);
//                 return;
//             }
//             newOrder = sortingState.order === 'asc' ? 'desc' : 'asc';
//             newActiveState = !(sortingState.order === 'desc' && sortingState.active);
//         } else {
//             newClickCount = 1; // Reset click count if switching to a new column
//         }
        
//         // Check if a filter is applied
//         if (filterValue.trim() !== '') {
//             // Filter is applied, sort the filtered data
//             dataToSort = [...tableData].sort((a, b) => {
//                 if (a[key] === b[key]) return 0;
//                 return newOrder === 'asc' ? (a[key] > b[key] ? 1 : -1) : (a[key] < b[key] ? 1 : -1);
//             });
//         } else {
//             // No filter applied, sort the original data
//             dataToSort = [...originalData].sort((a, b) => {
//                 if (a[key] === b[key]) return 0;
//                 return newOrder === 'asc' ? (a[key] > b[key] ? 1 : -1) : (a[key] < b[key] ? 1 : -1);
//             });
//         }
    
//         setSortOrder({ ...sortOrder, [key]: newOrder });
//         setTableData(dataToSort);
//         setSortingState({ column: key, order: newOrder, active: newActiveState, clickCount: newClickCount });
//     };
    
    

//     const handleFilterClick = (key) => {
//         const columnData = originalData.map(row => row[key]); // Use originalData instead of tableData
//         const uniqueData = [...new Set(columnData)];
//         if (uniqueData.length === columnData.length) {
//             // Data is unique, open modal with input text
//             setFilterOptions([]);
//             setFilterValue('');
//         } else {
//             // Data has duplicates, open modal with select options
//             setFilterOptions(uniqueData);
//             setFilterValue(uniqueData[0]); // Set default value
//         }
//         setModalOpen(true);
//     };
    

//     const handleApplyFilter = () => {
//         // Copy the original data to preserve it
//         let filteredData = [...originalData];
        
//         // Filter the data based on the selected value or input text
//         filteredData = filteredData.filter(row => {
//             // If the filter value is empty, return true for all rows
//             if (!filterValue.trim()) return true;
            
//             // Implement your filter logic here
//             // For example, check if the value in the current column matches the filter value
//             return Object.values(row).some(value => {
//                 // Check if the value contains the filter value (case insensitive)
//                 return String(value).toLowerCase().includes(filterValue.toLowerCase());
//             });
//         });
    
//         // Update the table data with the filtered data
//         setTableData(filteredData);
    
//         // If no matches found, display "No matches found" message for 1 second
//         if (filteredData.length === 0) {
//             setTableData([]);
//             setTimeout(() => {
//                 setTableData(originalData);
//             }, 1000);
//         }
    
//         // Close the modal
//         setModalOpen(false);
//     };
    
//     const handleCancelFilter = () => {
//         // Close the modal without applying the filter
//         setModalOpen(false);
//     };

//     return (
//         <div className="m-1 relative overflow-auto h-[600px] w-[100%] shadow-md sm:rounded-lg border-2 border-black">
//             <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-400">
//                 <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-50">
//                     <tr>
//                         {tableData.length > 0 && Object.keys(tableData[0]).map((key, index) => (
//                             <th key={index} className="px-6 py-3">
//                                 <div className="flex items-center justify-between">
//                                     <span className="text-sm font-sans">{key}</span>
//                                     <div className="flex items-center">
//                                         <button
//                                             className="ml-2 bg-transparent border-none outline-none cursor-pointer"
//                                             onClick={() => handleSort(key)}
//                                         >
//                                             {sortingState.column === key && sortingState.active ? (
//                                                 sortingState.order === '' ? (
//                                                     <BiSortAlt2 className="text-red-500 w-5 h-5" />
//                                                 ) : (
//                                                     <BiSortAlt2
//                                                         className="text-red-500 w-5 h-5 transform rotate-180"
//                                                     />
//                                                 )
//                                             ) : (
//                                                 <BiSortAlt2 className="w-5 h-5" />
//                                             )}
//                                         </button>
//                                         <FiFilter
//                                             className="ml-2 w-5 h-5 text-gray-600 cursor-pointer"
//                                             onClick={() => handleFilterClick(key)}
//                                         />
//                                     </div>
//                                 </div>
//                             </th>
//                         ))}
//                     </tr>
//                 </thead>

//                 {/* Table body */}
//                 <tbody>
//                     {tableData.map((row, rowIndex) => (
//                         <tr
//                             key={rowIndex}
//                             className={`${rowIndex % 2 === 0 ? 'even:bg-gray-50 even:dark:bg-gray-800' : 'odd:bg-white odd:dark:bg-gray-900'} border-b dark:border-gray-700`}
//                         >
//                             {Object.entries(row).map(([colKey, value], colIndex) => (
//                                 <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
//                                     {value === "Edit" ? (
//                                         <MdModeEdit className="text-blue-200 w-5 h-5" />
//                                     ) : (
//                                         value
//                                     )}
//                                 </td>
//                             ))}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Filter Modal */}
//             {modalOpen && (
//                 <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
//                     <div className="bg-white p-4 rounded shadow-md">
//                         <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
//                         {filterOptions.length > 0 ? (
//                             <select
//                                 className="block w-full px-4 py-2 border border-gray-300 rounded mb-4"
//                                 value={filterValue}
//                                 onChange={(e) => setFilterValue(e.target.value)}
//                             >
//                                 {filterOptions.map((option, index) => (
//                                     <option key={index} value={option}>{option}</option>
//                                 ))}
//                             </select>
//                         ) : (
//                             <input
//                                 type="text"
//                                 className="block w-full px-4 py-2 border border-gray-300 rounded mb-4"
//                                 placeholder="Enter filter value..."
//                                 value={filterValue}
//                                 onChange={(e) => setFilterValue(e.target.value)}
//                             />
//                         )}
//                         <div className="flex justify-end">
//                             <button
//                                 className="px-4 py-2 mr-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//                                 onClick={handleCancelFilter}
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                                 onClick={handleApplyFilter}
//                             >
//                                 Apply
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default FilterSort;
