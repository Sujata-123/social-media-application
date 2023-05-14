import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/social-media/login" element={<Login />} />
        <Route path="/social-media/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
