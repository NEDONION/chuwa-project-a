import AuthForm from "../components/AuthForm";
import { baseUrl } from "../utils/service";

const SignUp = () => {
    const buttonText = "Sign Up";
    
    const handleSubmit = async (e, formData) => {
        e.preventDefault();
        console.log('successfully submit sign up form')

        const {email, password} = formData;

        const url = baseUrl + '/signup'

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

export default SignUp;