import AuthForm from "../components/AuthForm";
import { baseUrl } from "../utils/service";
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate();
    const buttonText = "Sign In";
    
    const handleSubmit = async (e, formData) => {
        e.preventDefault();
        console.log('submit sign in form')

        const {email, password} = formData;

        const url = baseUrl + '/signin'

        try{
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });
            if (response.ok){
                // Handle successful submission, navigate to another page
                

            }else{
                // Handle error response
                console.error('Error submitting form');
            }
        }catch(error){
            console.error('Error:', error);

        };      
    }

    return (
        <div className="auth-form-container">
            <AuthForm  buttonText = {buttonText} handleSubmit={handleSubmit}/>
        </div>
    )
}

export default SignIn;