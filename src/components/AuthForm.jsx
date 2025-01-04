import React, { useState } from 'react';
import './AuthForm.css';
import { useNavigate } from 'react-router-dom';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const AuthForm = ({buttonText, handleSubmit}) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({});

    const [passwordVisible, setPasswordVisible] = useState(false);

    // collect input from form
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    
    // navigate to other pages (signin, signup, update-password)
    const handleNavigate = (path) => {
        navigate(path)
    }

    // Handle form submit (pass formData to parent handleSubmit function)
    // handle error on input fields
    const onSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!formData.email){
            newErrors.email = 'Invalid Email input!';
        }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)){
            newErrors.email = 'Enter a valid email address!';
        }

        if (!formData.password && buttonText !== 'Update Password'){
            newErrors.password = 'Password is required!';
        }else if (formData.password.length < 6 && buttonText !== 'Update Password'){
            newErrors.password = 'Password must be at least 6 characters long!';
        }

        if (Object.keys(newErrors).length > 0){
            setErrors(newErrors);
            
        }else{
            handleSubmit(e, formData)
        }

    };

    // Handle password visibility toggle
    const togglePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };


    return (
        <form onSubmit={onSubmit}>
            {buttonText === 'Sign Up' && <h3> Create an account</h3>}
            {buttonText === 'Sign In' && <h3> Sign in to your account</h3>}
            {buttonText === 'Update Password' && (
                <>
                    <h3> Update your password</h3>
                    <div className='smallText'>
                        <p>Enter your email link, we will send you the recovery link</p>
                    </div>
                    
                </>
                )}
            <div className='mb-3'>
                <label>Email</label>
                <input 
                    type="email" 
                    name = 'email'
                    className={`form-control ${errors.email? 'error': ''}`}
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}      
                />
                <div className="error-text">{errors.email || ''}</div> 
            </div>

            {buttonText !== 'Update Password' && (
                <div className='mb-3'>
                    <label>Password</label>
                    <div className='password-container'>
                        <input 
                            type={passwordVisible ? "text" : "password"}  
                            name = 'password'
                            className={`form-control ${errors.password? 'error': ''}`}
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                        
                        />
                        <button 
                            type="button" 
                            onClick={togglePasswordVisibility} 
                            className="password-toggle-btn"
                        >
                            
                            {passwordVisible ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                        </button>
                        <div className="error-text">{errors.password || ''}</div> 
                    </div>
                    
            </div>)}

            <div className="d-grid">
                <button type="submit" className="btn btn-primary">{buttonText}</button>
            </div>

            <div className='bottomText'>
                {buttonText === 'Sign Up' && (
                    <p>Already have an account? <a href="#" onClick = {()=>handleNavigate('/signin')}>Sign in</a></p>)}
                {buttonText === 'Sign In' && (
                    <>
                        <p>Don&apos;t have an account? <a href="#" onClick = {()=>handleNavigate('/signup')}>Sign up</a></p>
                        <p><a href="#" onClick = {()=>handleNavigate('/update-password')}>Forget password?</a></p>
                    </>
                )}
              
            </div>
        </form>
    )
}

export default AuthForm;