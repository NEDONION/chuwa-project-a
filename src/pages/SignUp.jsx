import AuthForm from "../components/AuthForm";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isSignedIn, setRole, setName } from "../actions/authAction";

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const buttonText = "Sign Up";
    
    const handleSubmit = async (e, formData) => {
        e.preventDefault();
        const { name, email, password } = formData;

        try {
            // Step 1: Register the user
            const registerResponse = await fetch("http://localhost:5001/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (registerResponse.ok) {
                // Step 2: If registration is successful, automatically log the user in
                const loginResponse = await fetch("http://localhost:5001/api/users/signin", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                if (loginResponse.ok) {
                    const result = await loginResponse.json();
                    
                    // Store token and user info
                    localStorage.setItem('authToken', result.token);
                    localStorage.setItem('userId', result.userId);
                    
                    // Dispatch actions to update Redux state
                    dispatch(setRole(result.role));
                    dispatch(setName(result.name));
                    dispatch(isSignedIn());
                    
                    // Navigate to homepage
                    navigate('/');
                } else {
                    const error = await loginResponse.json();
                    alert(error.message || "Login failed after registration. Please try logging in manually.");
                }

            } else {
                const error = await registerResponse.json();
                alert(error.message || "Registration failed");
            }
        } catch (error) {
            console.error("Error during registration/login:", error);
            alert("An error occurred. Please try again.");
        }
    }

    return (
        <div className="auth-form-container">
            <AuthForm buttonText={buttonText} handleSubmit={handleSubmit} />
        </div>
    );
};

export default SignUp;