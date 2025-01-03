// import { Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Foot.jsx';

function App() {
  return (
    <>
      <Header /> 
      <div>hello</div>
      <Container>
        {/* <Route path="/home"></Route> */}
      </Container>
      <Footer /> 
    </>
  );
}

export default App;