// import { Header } from "../components";
// function LoginPage() {
//     return (
//         <>
//         <Header>
//             <Header.Logo />
//             <button>로그인 및 가입</button>
//         </Header>
//         <main>
            
//         </main>
//         </>
//     );
// }

// export default LoginPage;
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../lib/firebase";
import { useState } from 'react';

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
        
            <form onSubmit={onSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={emailChange} type="email" id="_email" required />

                <label htmlFor="password">Password</label>
                <input value={password} onChange={passwordChange} type="password" id="_password" required />

                <button type="submit">Login</button>
            </form>
        </>
    );
}

export default LoginPage;