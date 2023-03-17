import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/Home";
import Notfound from "../pages/Notfound";
import Service from "../pages/Service";
import ListContact from "../components/crud/ListContact";
import Create from "../components/crud/Create";
import Edit from "../components/crud/Edit";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<Service />} />
        {/* CRUD REFULL */}
        <Route path="/contacts" element={<ListContact />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
