import { Container } from "react-bootstrap";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Homescreen from "./Screens/Homescreen";

function App() {
  return (
    <>
      <Header />
      <Container>
        <main className="py-3">
          <Homescreen />
        </main>
      </Container>
      <Footer />
    </>
  );
}

export default App;
