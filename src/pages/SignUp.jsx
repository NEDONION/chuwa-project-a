import AuthForm from "../components/AuthForm";

const SignUp = () => {
    const buttonText = "Sign Up";

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const email = event.target[0].value;
        const password = event.target[1].value;
    
        const data = { email, password };
    
        try {
            const response = await fetch("http://localhost:5001/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
    
            if (response.ok) {
                const result = await response.json();
                alert("User registered successfully!");
                console.log("User registered:", result);
            } else {
                const error = await response.json();
                alert(error.message || "Registration failed");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="auth-form-container">
            <AuthForm buttonText={buttonText} onSubmit={handleSubmit} />
        </div>
    );
};

export default SignUp;