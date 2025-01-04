import AuthForm from "../components/AuthForm";
import { baseUrl } from "../utils/service";

const SignUp = () => {
    const buttonText = "Sign Up";
    
    const handleSubmit = async (e, formData) => {
        e.preventDefault();
        console.log('successfully submit sign up form')

        const {email, password} = formData;

        try {
              const response = await fetch("http://localhost:5001/api/users/register", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({email, password}),
              });

              if (response.ok) {
                  const result = await response.json();
                  alert("User registered successfully!");
                  console.log("User registered:", result);
                  // Handle successful submission, navigate to another page
              } else {
                  const error = await response.json();
                  alert(error.message || "Registration failed");
              }
          } catch (error) {
              console.error("Error during registration:", error);
              alert("An error occurred. Please try again.");
          }
    }

    return (
        <div className="auth-form-container">
            <AuthForm  buttonText = {buttonText} handleSubmit={handleSubmit}/>
        </div>
    );
};

export default SignUp;