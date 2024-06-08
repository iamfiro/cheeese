import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/global.scss";
import ProfilePage from "./pages/profile";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ModalRouter from "./components/Modal/router";
import PhotoUpload from "./components/Modal/PhotoUpload.tsx";
import DetailPage from "./pages/detail.tsx";

function App() {
	return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/photoupload" element={<PhotoUpload/>}/>
                <Route path="/image/:id" element={<DetailPage/>}/>
            </Routes>
            <ModalRouter />
        </BrowserRouter>
        </>
    );
}

export default App;
