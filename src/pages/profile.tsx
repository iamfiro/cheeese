import { Header } from "../components";
import style from '../styles/profile.module.scss';
import SampleImage from '../assets/sample_image.jpg';
import SampleImage_2 from '../assets/sample_image_2.jpg';

function ProfilePage() {
    return (
        <main>
           <Header>
                <Header.Logo />
                <button className={style.headerButton}>로그인 및 가입</button>
            </Header>
            <section className={style.container}>
                <div className={style.top}>
                    <span className={style.lastPostDate}>마지막 포스팅 - 2024 / 03 / 28</span>
                    <span className={style.lastPostDate}>23개의 작업물</span>
                </div>
                <div className={style.imageContainer}>
                    <img src={SampleImage} alt="Profile" className={style.image} />
                    <img src={SampleImage_2} alt="Profile" className={style.image} />
                    <img src={SampleImage_2} alt="Profile" className={style.image} />
                    <img src={SampleImage} alt="Profile" className={style.image} />
                    <img src={SampleImage} alt="Profile" className={style.image} />
                    <img src={SampleImage_2} alt="Profile" className={style.image} />
                    <img src={SampleImage} alt="Profile" className={style.image} />
                    <img src={SampleImage_2} alt="Profile" className={style.image} />
                </div>
            </section>
        </main>
    );
}

export default ProfilePage;