import { getAuth } from "firebase/auth";
import app from "../lib/firebase";
import { useNavigate } from "react-router-dom";

function LogoutPage() {
    const auth = getAuth(app);
    const navigate = useNavigate();
    
    auth.signOut().then(() => {
        navigate('/login');
    });

    return (
        <div>로그아웃 중</div>
    );
}

export default LogoutPage;