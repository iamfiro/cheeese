import style from '../styles/auth.module.scss';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../lib/firebase";
import { useState } from 'react';
import { Logo } from '../components/Header';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth(app);

    const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signInWithEmailAndPassword(auth, email, password)
            .then((credential) => {
                console.log(credential);
                console.log("Login successful");
            })
            .catch((err) => {
                console.error(err);
            });
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