import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/global.scss";
import ProfilePage from "./pages/profile";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ModalRouter from "./components/Modal/router";
import LogoutPage from "./pages/logout";


function App() {
	return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/logout" element={<LogoutPage />} />
            </Routes>
            <ModalRouter />
        </BrowserRouter>
        </>
    );
}

export default App;
