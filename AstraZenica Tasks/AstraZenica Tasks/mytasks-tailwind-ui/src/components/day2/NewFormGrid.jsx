import { useState } from 'react';
import { CiEraser } from "react-icons/ci";

function NewFormGrid() {
    const initialFormData = {
        name: '',
        email: '',
        gender: '',
        employeeNumber: '',
        department: '',
        dob: '',
        skills: [],
    };
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [submittedData, setSubmittedData] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue = value;

        if (type === 'checkbox') {
            if (checked) {
                newValue = [...formData[name], value];
            } else {
                newValue = formData[name].filter((skill) => skill !== value);
            }
        }

        setFormData({
            ...formData,
            [name]: newValue,
        });

        validateField(name, newValue);
    };

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'name':
                error = value.length < 5 ? 'Name must be at least 5 characters long' : '';
                break;
            case 'email':
                error = !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{3,7}$/.test(value) ? 'Invalid email address' : '';
                break;
            case 'dob':
                error = !value ? 'Please select a date of birth' : '';
                break;
            case 'skills':
                error = value.length === 0 ? 'Please select at least one skill' : '';
                break;
            case 'employeeNumber':
                error = !/^\d{6}$/.test(value) ? 'Employee number must be a 6-digit number' : '';
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form submission logic here
        console.log(formData);
        setSubmittedData(formData);
    };

    const handleReset = () => {
        setFormData(initialFormData);
        setErrors({});
        setSubmittedData(null);
    };

    const handleClearSkills = () => {
        setFormData({ ...formData, skills: [] });
    };

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit} onReset={handleReset} className="mt-4 max-w-screen-lg mx-1 bg-blue-100 rounded-lg shadow-2xl p-6 grid grid-cols-2 gap-7">
                <div className="grid grid-rows-auto gap-2">
                    <label className="text-sm font-medium text-gray-700">Name:</label>
                    <label className="text-sm font-medium text-gray-700">Email:</label>
                    <label className="text-sm font-medium text-gray-700">Gender:</label>
                    <label className="text-sm font-medium text-gray-700">Employee Number:</label>
                    <label className="text-sm font-medium text-gray-700">Department:</label>
                    <label className="text-sm font-medium text-gray-700">Date of Birth:</label>
                    <label className="text-sm font-medium text-gray-700">Skills:</label>
                </div>
                <div className="grid grid-rows-auto gap-2">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        required
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        required
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    <select name="gender" value={formData.gender} onChange={handleChange} className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md ${errors.gender ? 'border-red-500' : 'border-gray-300'}`} required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
                    <input
                        type="number"
                        name="employeeNumber"
                        value={formData.employeeNumber}
                        onChange={handleChange}
                        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md ${errors.employeeNumber ? 'border-red-500' : 'border-gray-300'}`}
                        required
                    />
                    {errors.employeeNumber && <p className="text-sm text-red-500">{errors.employeeNumber}</p>}
                    <select name="department" value={formData.department} onChange={handleChange} className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md ${errors.department ? 'border-red-500' : 'border-gray-300'}`} required>
                        <option value="">Select Department</option>
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                    </select>
                    {errors.department && <p className="text-sm text-red-500">{errors.department}</p>}
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md ${errors.dob ? 'border-red-500' : 'border-gray-300'}`}
                        required
                    />
                    {errors.dob && <p className="text-sm text-red-500">{errors.dob}</p>}
                    <div className="mt-1 flex flex-wrap">
                        <div className="mr-2">
                            <input
                                type="checkbox"
                                name="skills"
                                value="HTML"
                                checked={formData.skills.includes('HTML')}
                                onChange={handleChange}
                                className="mr-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <label className="block text-sm font-medium text-gray-700">HTML</label>
                        </div>
                        <div className="mr-2">
                            <input
                                type="checkbox"
                                name="skills"
                                value="CSS"
                                checked={formData.skills.includes('CSS')}
                                onChange={handleChange}
                                className="mr-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <label className="block text-sm font-medium text-gray-700">CSS</label>
                        </div>
                        <div className="mr-2">
                            <input
                                type="checkbox"
                                name="skills"
                                value="JavaScript"
                                checked={formData.skills.includes('JavaScript')}
                                onChange={handleChange}
                                className="mr-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <label className="block text-sm font-medium text-gray-700">JavaScript</label>
                        </div>
                        <div className="mr-2">
                            <input
                                type="checkbox"
                                name="skills"
                                value="React"
                                checked={formData.skills.includes('React')}
                                onChange={handleChange}
                                className="mr-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <label className="block text-sm font-medium text-gray-700">React</label>
                        </div>
                        <div className="mr-2">
                            <input
                                type="checkbox"
                                name="skills"
                                value="Node.js"
                                checked={formData.skills.includes('Node.js')}
                                onChange={handleChange}
                                className="mr-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <label className="block text-sm font-medium text-gray-700">Node.js</label>
                        </div>
                        <button type="button" onClick={handleClearSkills} className="ml-2 inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"><CiEraser/></button>
                    </div>
                    {errors.skills && <p className="text-sm text-red-500">{errors.skills}</p>}
                </div>
                <div className="col-span-2 flex justify-center">
                    <button type="reset" className="m-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Reset</button>
                    <button type="submit" className="m-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
                </div>
            </form>
            {submittedData && (
                <div className="mt-4 max-w-md mx-auto">
                    <h2 className="text-lg font-medium text-gray-900">Submitted Data:</h2>
                    <p>Name: {submittedData.name}</p>
                    <p>Email: {submittedData.email}</p>
                    <p>Gender: {submittedData.gender}</p>
                    <p>Employee Number: {submittedData.employeeNumber}</p>
                    <p>Department: {submittedData.department}</p>
                    <p>Date of Birth: {submittedData.dob}</p>
                    <p>Skills: {submittedData.skills.join(', ')}</p>
                </div>
            )}
        </div>
    );
}

export default NewFormGrid;
