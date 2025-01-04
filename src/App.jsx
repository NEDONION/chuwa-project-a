import {  BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Container from "react-bootstrap/Container";
import './App.css'
import Footer from './components/Foot.jsx'
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Header from './components/Header.jsx';
import UpdatePassword from "./pages/UpdatePassword.jsx";



function App() {
  return (
    <>
      <Router>
        <Header />
        <Container>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/update-password" element={<UpdatePassword />} />

        </Routes>
        </Container>
        <Footer />
      </Router>
      
    </>
  );
}

export default App;