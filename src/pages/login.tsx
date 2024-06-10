import style from '../styles/auth.module.scss';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../lib/firebase";
import { useState, useEffect } from 'react';
import { Logo } from '../components/Header';
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth(app);
    const navigate = useNavigate();

    useEffect(() => {
        // 로그인 상태 확인 및 유저 설정
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                navigate('/');
            }
        });
        return () => unsubscribe();
    }, [auth]);

    const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const credential = await signInWithEmailAndPassword(auth, email, password);
            
            const token = await credential.user.getIdToken();
            localStorage.setItem('authToken', token);

            navigate(`/`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <>
            <div className={style.container}>
                <form onSubmit={onSubmit} className={style.left}>
                    <Logo />
                    <label htmlFor="email" className={style.label}>Email</label>
                    <input value={email} onChange={emailChange} className={style.input} type="email" id="_email" required />

                    <label htmlFor="password" className={style.label}>Password</label>
                    <input value={password} onChange={passwordChange} className={style.input} type="password" id="_password" required />

                    <button type="submit" className={style.submit}>Login</button>
                </form>
                <img src="https://i.ibb.co/mN23SKw/pawel-czerwinski-A3-Dy-YLGO0k-Q-unsplash.jpg" className={style.right} />
            </div>
        </>
    );
}

export default LoginPage;
