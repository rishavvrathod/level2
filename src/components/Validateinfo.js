import React from 'react';
import useForm from './useForm';

const JobApplicationForm = () => {
    const initialValues = {
        fullName: '',
        email: '',
        phoneNumber: '',
        position: '',
        relevantExperience: '',
        portfolioUrl: '',
        managementExperience: '',
        additionalSkills: [],
        interviewTime: ''
    };

    const validate = (values) => {
        const errors = {};
        if (!values.fullName) errors.fullName = 'Full Name is required';
        if (!values.email) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = 'Email is invalid';
        if (!values.phoneNumber) errors.phoneNumber = 'Phone Number is required';
        if (['Developer', 'Designer'].includes(values.position) && !values.relevantExperience) 
            errors.relevantExperience = 'Relevant Experience is required';
        if (values.position === 'Designer' && !values.portfolioUrl) 
            errors.portfolioUrl = 'Portfolio URL is required';
        if (values.position === 'Manager' && !values.managementExperience) 
            errors.managementExperience = 'Management Experience is required';
        if (values.additionalSkills.length === 0) 
            errors.additionalSkills = 'At least one skill must be selected';
        if (!values.interviewTime) errors.interviewTime = 'Preferred Interview Time is required';
        return errors;
    };

    const { values, errors, handleChange, handleSubmit } = useForm(initialValues, validate);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Full Name:</label>
                <input type="text" name="fullName" value={values.fullName} onChange={handleChange} />
                {errors.fullName && <span>{errors.fullName}</span>}
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={values.email} onChange={handleChange} />
                     {errors.email && <span>{errors.email}</span>}
                 </div>
                 <div>
                     <label>Phone Number:</label>
                     <input type="number" name="phoneNumber" value={values.phoneNumber} onChange={handleChange} />
                     {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
                 </div>
                 <div>
                     <label>Applying for Position:</label>
                     <select name="position" value={values.position} onChange={handleChange}>
                         <option value="">Select</option>
                         <option value="Developer">Developer</option>
                         <option value="Designer">Designer</option>
                         <option value="Manager">Manager</option>
                     </select>
                 </div>
                 {(values.position === 'Developer' || values.position === 'Designer') && (
                     <div>
                         <label>Relevant Experience (years):</label>
                         <input type="number" name="relevantExperience" value={values.relevantExperience} onChange={handleChange} />
                         {errors.relevantExperience && <span>{errors.relevantExperience}</span>}
                     </div>
                 )}
                 {values.position === 'Designer' && (
                     <div>
                         <label>Portfolio URL:</label>
                         <input type="text" name="portfolioUrl" value={values.portfolioUrl} onChange={handleChange} />
                         {errors.portfolioUrl && <span>{errors.portfolioUrl}</span>}
                     </div>
                 )}
                 {values.position === 'Manager' && (
                     <div>
                         <label>Management Experience:</label>
                         <input type="text" name="managementExperience" value={values.managementExperience} onChange={handleChange} />
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
                     <input type="datetime-local" name="interviewTime" value={values.interviewTime} onChange={handleChange} />
                     {errors.interviewTime && <span>{errors.interviewTime}</span>}
                 </div>
                 <button type="submit">Submit</button>
             </form>
         );
     };

     export default JobApplicationForm;

