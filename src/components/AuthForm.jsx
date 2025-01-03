// import PropTypes from 'prop-types';
import './AuthForm.css';
const AuthForm = ({buttonText, onSubmit}) => {
    return (
        <form onSubmit={onSubmit}>
            <h3>{buttonText === 'Sign Up' ? 'Sign up an account': 'Sign in to your account'}</h3>
            <div className='mb-3'>
                <label>Email</label>
                <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Enter email"
                    required
                />
            </div>
            <div className='mb-3'>
                <label>Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Enter password"
                    required
                />
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">{buttonText}</button>
            </div>
            <div className='bottomText'>
                {buttonText === 'Sign Up' && <p>Already have an account? <a href="#">Sign in</a></p>}
                {buttonText === 'Sign In' && <p>Don&apos;t have an account? <a href="#">Sign up</a></p>} 
                {buttonText === 'Sign In' && <p><a href="#">Forget password?</a></p>}
            </div>
        </form>
    )
}

// AuthForm.propTypes = {
//     buttonText: PropTypes.string.isRequired, // Required prop
//     onSubmit: PropTypes.func.isRequired,    // Required function prop
//   };
export default AuthForm;