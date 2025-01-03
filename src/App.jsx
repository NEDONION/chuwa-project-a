import {  BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Container from "react-bootstrap/Container";
import './App.css'
import Footer from './components/Foot.jsx'
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";

function App() {
  

  return (
    <>
      <Router>
        <div>this is header</div>
        <Container>
        <Routes>
          {/* <Route path = '/'/> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        </Container>

        <Footer />
      </Router>
      
    </>
  )
}

export default App
