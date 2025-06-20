import AuthForm from "../components/AuthForm";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isSignedIn, setRole, setName } from "../actions/authAction";

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                console.log("Login Result:", result);
        
                // Store the token in localStorage
                localStorage.setItem('authToken', result.token);  // 保存token到localStorage
        
                // Store userId in localStorage
                localStorage.setItem('userId', result.userId);  // 保存userId到localStorage
        
                // Store user role in Redux
                dispatch(setRole(result.role)); // Update Redux with role
        
                // Store user name in Redux
                dispatch(setName(result.name));
        
                dispatch(isSignedIn()); // Update signedIn state
        
                navigate('/'); // Redirect to the product page
        
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