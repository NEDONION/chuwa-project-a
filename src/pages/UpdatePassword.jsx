import AuthForm from "../components/AuthForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const UpdatePassword = () => {
    const buttonText = 'Update Password';
    
    const [isUpdate, setIsUpdate] = useState(false)

    const handleSubmit = async (e, formData) => {
        e.preventDefault();
        console.log('submit update password form', formData.email);
        //--------------------------------
        // TODO: handle update password logic here, email sent
        //--------------------------------
        setIsUpdate(!isUpdate);
    }

    return(
        <>
            {!isUpdate? (
                <div className="auth-form-container">
                    <AuthForm  buttonText = {buttonText} handleSubmit={handleSubmit}/>
                </div>):(
                    <div className="success-message" >
                        <p>Password update link sent to your email</p>
                        <p>Please check your email for the link.</p>
                    </div>
                )}
        </>
        
    )
}

export default UpdatePassword;