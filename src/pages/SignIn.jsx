import AuthForm from "../components/AuthForm";
const SignIn = () => {
    const buttonText = "Sign In";
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submit sign in form')
        // submit form to sign up
    }

    return (
        <div className="auth-form-container">
            <AuthForm  buttonText = {buttonText} onSubmit={handleSubmit}/>
        </div>
    )
}

export default SignIn;