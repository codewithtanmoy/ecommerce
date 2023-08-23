//import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Add this line to import Bootstrap CSS
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Registration from "./pages/Registration";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Product from "./pages/Product";

const App = () => {
  return (
    <BrowserRouter>
     <div className="container-fluid">
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route exact index element={<Home />} />
          <Route exact path="About" element={<About />} />
          <Route exact path="Registration" element={<Registration />} />
          <Route exact path="Product" element={<Product />} />
          <Route exact path="Contact" element={<Contact />} />
          <Route exact path="*" element={<NoPage />} />
        </Route>
      </Routes>
     </div>
    </BrowserRouter>
  );
}

export default App;

