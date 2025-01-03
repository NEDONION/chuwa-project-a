import AuthForm from "../components/AuthForm";

const SignUp = () => {
    const buttonText = "Sign Up";
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submit sign up form')
        // submit form to sign up
    }

    return (
        <div className="auth-form-container">
            <AuthForm  buttonText = {buttonText} onSubmit={handleSubmit}/>
        </div>
    )
}

export default SignUp;