import { useForm } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database';
import app from "../lib/firebase";
import style from '../styles/auth.module.scss';
import { Logo } from "../components/Header";

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
        <div className={style.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={style.left}>
                <Logo />
                <label htmlFor="email" className={style.label}>Email</label>
                <input
                    type="email"
                    id="email"
                    className={style.input}
                    {...register('email', {
                        required: true,
                        pattern: /^\S+@\S+$/i
                    })}
                />
                {errors.email && <p>이메일이 잘못되었습니다!</p>}

                <label htmlFor="password" className={style.label}>Password</label>
                <input
                    type="password"
                    id="password"
                    className={style.input}
                    {...register('password', {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                    })}
                />
                {errors.password && errors.password.type === 'required' && <p>비밀번호가 필요합니다!</p>}
                {errors.password && errors.password.type === 'minLength' && <p>비밀번호는 최소 6자 이상이어야 합니다!</p>}
                {errors.password && errors.password.type === 'maxLength' && <p>비밀번호는 최대 20자 이하여야 합니다!</p>}

                <input type="submit" value="Register"  className={style.submit}/>
            </form>
            <img src="https://i.ibb.co/m6ChvKv/Snapinsta-app-447444002-431135383039644-5576725662747987961-n-1080.jpg" className={style.right} />
        </div>
    );
}

export default RegisterPage;
