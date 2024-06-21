import React, { useState } from 'react';

const JobApplicationForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        position: '',
        relevantExperience: '',
        portfolioUrl: '',
        managementExperience: '',
        additionalSkills: [],
        interviewTime: ''
    });

    const [errors, setErrors] = useState({});
    
    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prevData) => ({
                ...prevData,
                additionalSkills: checked 
                    ? [...prevData.additionalSkills, value] 
                    : prevData.additionalSkills.filter(skill => skill !== value)
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform validation
        const newErrors = validateForm(formData);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        // Submit form data
        alert('Form submitted successfully!');
        console.log(formData);
    };

    // Validate form data
    const validateForm = (data) => {
        const errors = {};
        if (!data.fullName) errors.fullName = 'Full Name is required';
        if (!data.email) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Email is invalid';
        if (!data.phoneNumber) errors.phoneNumber = 'Phone Number is required';
        if (['Developer', 'Designer'].includes(data.position) && !data.relevantExperience) 
            errors.relevantExperience = 'Relevant Experience is required';
        if (data.position === 'Designer' && !data.portfolioUrl) 
            errors.portfolioUrl = 'Portfolio URL is required';
        if (data.position === 'Manager' && !data.managementExperience) 
            errors.managementExperience = 'Management Experience is required';
        if (data.additionalSkills.length === 0) 
            errors.additionalSkills = 'At least one skill must be selected';
        if (!data.interviewTime) errors.interviewTime = 'Preferred Interview Time is required';
        return errors;
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Full Name:</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
                {errors.fullName && <span>{errors.fullName}</span>}
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <span>{errors.email}</span>}
            </div>
            <div>
                <label>Phone Number:</label>
                <input type="number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
            </div>
            <div>
                <label>Applying for Position:</label>
                <select name="position" value={formData.position} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                    <option value="Manager">Manager</option>
                </select>
            </div>
            {(formData.position === 'Developer' || formData.position === 'Designer') && (
                <div>
                    <label>Relevant Experience (years):</label>
                    <input type="number" name="relevantExperience" value={formData.relevantExperience} onChange={handleChange} />
                    {errors.relevantExperience && <span>{errors.relevantExperience}</span>}
                </div>
            )}
            {formData.position === 'Designer' && (
                <div>
                    <label>Portfolio URL:</label>
                    <input type="text" name="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange} />
                    {errors.portfolioUrl && <span>{errors.portfolioUrl}</span>}
                </div>
            )}
            {formData.position === 'Manager' && (
                <div>
                    <label>Management Experience:</label>
                    <input type="text" name="managementExperience" value={formData.managementExperience} onChange={handleChange} />
                    {errors.managementExperience && <span>{errors.managementExperience}</span>}
                </div>
            )}
            <div>
                <label>Additional Skills:</label>
                <div>
                    <input type="checkbox" name="additionalSkills" value="JavaScript" onChange={handleChange} />
                    <label>JavaScript</label>
                </div>
                <div>
                    <input type="checkbox" name="additionalSkills" value="CSS" onChange={handleChange} />
                    <label>CSS</label>
                </div>
                <div>
                    <input type="checkbox" name="additionalSkills" value="Python" onChange={handleChange} />
                    <label>Python</label>
                </div>
                {errors.additionalSkills && <span>{errors.additionalSkills}</span>}
            </div>
            <div>
                <label>Preferred Interview Time:</label>
                <input type="datetime-local" name="interviewTime" value={formData.interviewTime} onChange={handleChange} />
                {errors.interviewTime && <span>{errors.interviewTime}</span>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default JobApplicationForm;
