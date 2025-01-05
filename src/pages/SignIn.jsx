import AuthForm from "../components/AuthForm";
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate();
    const buttonText = "Sign In";

    const handleSubmit = async (e, formData) => {
        e.preventDefault(); 

        const { email, password } = formData; 

        const url = "http://localhost:5001/api/users/signin"; 

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), 
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message); 
                console.log("Login Token:", result.token);

                localStorage.setItem('authToken', result.token);

                navigate('/dashboard');
            } else {
                const error = await response.json();
                alert(error.message || "Login failed"); 
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred. Please try again."); 
        }
    };

    return (
        <div className="auth-form-container">
            <AuthForm buttonText={buttonText} handleSubmit={handleSubmit} />
        </div>
    );
};

export default SignIn;