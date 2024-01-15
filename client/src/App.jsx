import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Faq from "./pages/Faq";
import Services from "./pages/Services";
import Navbar from "./components/navigation/Navbar";
import CreateFaqForm from "./components/faq/CreateFaqForm";
import EditFaqForm from "./components/faq/EditFaqForm";
import ServiceForm from "./components/services/ServiceForm";
import EditServiceForm from "./components/services/EditServiceForm";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq/*" element={<Faq />} />
        <Route path="/faq/create" element={<CreateFaqForm />} />
        <Route path="/faq/edit/:id" element={<EditFaqForm />} />
        <Route path="/services/*" element={<Services />} />
        <Route path="/services/create" element={<ServiceForm />} />
        <Route path="/services/edit/:id" element={<EditServiceForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
