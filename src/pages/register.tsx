// import { Header } from "../components";
// function RegisterPage() {
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

// export default RegisterPage;
import { useForm } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database';
import app from "../lib/firebase";

function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const auth = getAuth(app);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (data: any) => {
        try {
            const createdUser = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password,
            );
            console.log(createdUser);

            if(!auth.currentUser) return;
            await updateProfile(auth.currentUser , {
                displayName: data.name,
                photoURL:
                    'https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png',
            });
            console.log(auth.currentUser);

            console.log(createdUser.user.displayName);
            const db = getDatabase();

            await set(ref(db, `users/${createdUser.user.uid}`), {
                name: createdUser.user.displayName,
                email: createdUser.user.email,
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    {...register('email', {
                        required: true,
                        pattern: /^\S+@\S+$/i
                    })}
                />
                {errors.email && <p>이메일이 잘못되었습니다!</p>}

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    {...register('password', {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                    })}
                />
                {errors.password && errors.password.type === 'required' && <p>비밀번호가 필요합니다!</p>}
                {errors.password && errors.password.type === 'minLength' && <p>비밀번호는 최소 6자 이상이어야 합니다!</p>}
                {errors.password && errors.password.type === 'maxLength' && <p>비밀번호는 최대 20자 이하여야 합니다!</p>}

                <input type="submit" value="Register"/>
            </form>
        </div>
    );
}

export default RegisterPage;
