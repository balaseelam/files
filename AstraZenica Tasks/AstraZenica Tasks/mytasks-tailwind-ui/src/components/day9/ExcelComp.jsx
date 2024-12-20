import React, { useState, useRef, useEffect } from 'react';
import Select, { components } from 'react-select';
import { BsX, BsPlusCircleFill } from 'react-icons/bs';
import { FaMinusCircle } from 'react-icons/fa';
import { BsImageFill } from "react-icons/bs";
import { MdContentCopy } from 'react-icons/md';
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";

function ExcelComp() {
  const [selectedFiles, setSelectedFiles] = useState([null]);
  const [rows, setRows] = useState([{ rule: '', product: '' }]);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    if (selectRef.current) {
      const selectWidth = selectRef.current.clientWidth;
      const customStyles = {
        menu: (provided) => ({
          ...provided,
          width: selectWidth
        })
      };
      selectRef.current.select.select.props.styles = customStyles;
    }
  }, []);

  const handleUploadFile = (event, index) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.xlsx')) {
      const newSelectedFiles = [...selectedFiles];
      newSelectedFiles[index] = file;
      setSelectedFiles(newSelectedFiles);
    } else {
      setSelectedFiles(prevSelectedFiles => {
        const newSelectedFiles = [...prevSelectedFiles];
        newSelectedFiles[index] = null;
        return newSelectedFiles;
      });
      alert('Please select a valid Excel file.');
    }
  };

  const handleClearUploadedFile = (index) => {
    setSelectedFiles(prevSelectedFiles => {
      const newSelectedFiles = [...prevSelectedFiles];
      newSelectedFiles[index] = null;
      return newSelectedFiles;
    });
  };

  const addNewRow = () => {
    setSelectedFiles(prevSelectedFiles => [...prevSelectedFiles, null]);
    setRows([...rows, { rule: '', product: '' }]);
  };

  const cloneRow = (index) => {
    const clonedRow = { ...rows[index] }; 
    const clonedRows = [...rows];
    clonedRows.splice(index + 1, 0, clonedRow); 
    setRows(clonedRows);

    const clonedFiles = [...selectedFiles];
    clonedFiles.splice(index + 1, 0, selectedFiles[index]);
    setSelectedFiles(clonedFiles);
  };

  const removeRow = (index) => {
    if (rows.length === 1) {
      return; 
    }
    const updatedRows = rows.filter((_, idx) => idx !== index);
    setRows(updatedRows);

    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const handleRuleChange = (index, option) => {
    const updatedRows = [...rows];
    updatedRows[index].rule = option ? option.value : '';
    setRows(updatedRows);
  };

  const handleProductChange = (index, option) => {
    const updatedRows = [...rows];
    updatedRows[index].product = option ? option.value : '';
    setRows(updatedRows);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleOk = () => {
    setIsOpen(false); 
    // Perform action (e.g., save data)
  };

  const openModal = () => {
    setIsOpen(true); 
  };

  const DropdownIndicator = (props) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <CiSearch />
        </components.DropdownIndicator>
      )
    );
  };

  return (
    <>
      <button className='border-t-cyan-900 bg-green-400 m-2 rounded-xl p-2' onClick={openModal}>Click me</button>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white m-1 rounded-lg w-full max-w-3xl h-full overflow-y-auto">
            <div className="flex items-center m-1 bg-gray-200 justify-between">
              <h2 className="text-gray-700 p-1 text-lg font-semibold">Import IB File</h2>
              <button className="text-gray-600 p-1" onClick={handleCancel}>X</button>
            </div>
            <div>
              {rows.map((row, index) => (
                <div key={index} className="flex items-center mt-4">
                  <div className="flex flex-col ml-6 mt-4">
                    <h2 className="text-left text-lg ml-1 mb-2">Rule</h2>
                    <Select
                      ref={selectRef}
                      components={{ DropdownIndicator }}
                      value={{ value: row.rule, label: row.rule ? row.rule : 'Select Rule' }}
                      onChange={(option) => handleRuleChange(index, option)}
                      options={[
                        { value: '', label: 'Select Rule', isDisabled: false },
                        { value: 'IB PE', label: 'IB PE' },
                        { value: 'IB SNA', label: 'IB SNA' },
                        { value: 'IB DNS', label: 'IB DNS' }
                      ]}
                      
                    />
                  </div>
                  <div className="flex flex-col ml-6 mt-4">
                    <h2 className="text-left text-lg mb-2">Products</h2>
                    <Select
                      ref={selectRef}
                      components={{ DropdownIndicator }}
                      value={{ value: row.product, label: row.product ? row.product : 'Select Product' }}
                      onChange={(option) => handleProductChange(index, option)}
                      options={[
                        { value: '', label: 'Select Product', isDisabled: false },
                        { value: 'Andexxa', label: 'Andexxa' },
                        { value: 'Arimidex', label: 'Arimidex' },
                        { value: 'Atacand', label: 'Atacand' },
                        { value: 'Atacand Hct', label: 'Atacand Hct' },
                        { value: 'Brilinta', label: 'Brilinta' }
                      ]}
                    />
                  </div>
                  <div className="flex flex-col ml-6 mt-4">
                    <label style={{ width: "250px" }} className="flex mt-8 items-center border-dashed border-2 border-spacing-2 px-3 py-2 cursor-pointer">
                      <input
                        type="file"
                        onChange={(e) => handleUploadFile(e, index)}
                        accept=".xlsx"
                        className="hidden"
                      />
                      {selectedFiles[index] ? (
                        <>
                          <PiMicrosoftExcelLogoFill className="text-green-700 bg-gray-200 mr-0" />
                          <span className="text-sm mr-2 bg-gray-200">{selectedFiles[index].name}</span>
                          <BsX onClick={() => handleClearUploadedFile(index)} className="text-red-500 cursor-pointer" />
                        </>
                      ) : (
                        <>
                          <span className="text-sm text-gray-300">Drag &amp; Drop a file here, or click</span>
                          <BsImageFill className="ml-2 text-gray-300 cursor-pointer " />
                        </>
                      )}
                    </label>
                  </div>
                  <div className="flex items-center ml-6 mt-4">
                    {index === rows.length - 1 ? (
                      <BsPlusCircleFill style={{ height: '30px', width: '30px' }} onClick={addNewRow} className="text-blue-500 cursor-pointer mr-4 mt-8" />
                    ) : (
                      <FaMinusCircle style={{ height: '30px', width: '30px' }} onClick={() => removeRow(index)} className="text-red-500 cursor-pointer mr-4 mt-8" />
                    )}
                    <MdContentCopy style={{ height: '30px', width: '30px' }} onClick={() => cloneRow(index)} className="text-gray-400 cursor-pointer mr-2 mt-8" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end m-5">
              <button className="border-2 border-blue-400 text-blue-700 px-4 py-2 rounded-3xl mr-3" onClick={handleCancel}>Cancel</button>
              <button className="bg-blue-700 text-white px-4 py-2 rounded-3xl" onClick={handleOk}>OK</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ExcelComp;
