import { Header } from "../components";
import style from '../styles/profile.module.scss';
import { storage } from "../lib/firebase.ts";
import { useEffect, useState } from "react";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import app from "../lib/firebase";

function ProfilePage() {
    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
    const imageListRef = ref(storage, `images/`);
    const [imageList, setImageList] = useState<{ id: string, url: string }[]>([]);
    const navigate = useNavigate();
    const auth = getAuth(app);
    
    useEffect(() => {
        // 로그인 상태 확인 및 유저 설정
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (!currentUser) {
                navigate('/login')
            }
        });
        return () => unsubscribe();
    }, [auth]);

    useEffect(() => {
        if (!imagesLoaded) {
            listAll(imageListRef).then((response) => {
                console.log(response.items);
                const fetchUrls = response.items.map((item) => 
                    getDownloadURL(item).then((url) => ({
                        id: item.name,
                        url
                    }))
                );

                Promise.all(fetchUrls).then((urls) => {
                    setImageList(urls);
                    setImagesLoaded(true); // Mark images as loaded
                });
            });
        }
    }, [imagesLoaded, imageListRef]);

    const handleUploadClick = () => {
        navigate("/?m=u");
    };

    const handleImageClick = (id: string) => {
        navigate(`/?m=d&id=${id}`);
    };

    const handleLogoutClick = () => {
        navigate(`/logout`);
    };

    return (
        <main>
            <Header>
                <Header.Logo />
                <button className={style.headerButtonPrimary} onClick={() => handleUploadClick()}>이미지 업로드</button>
                <button className={style.headerButton} onClick={() => handleLogoutClick()}>로그아웃</button>
            </Header>
            <section className={style.container}>
                <div className={style.top}>
                    <span className={style.lastPostDate}>마지막 포스팅 - 2024 / 03 / 28</span>
                    <span className={style.lastPostDate}>{imageList.length}개의 작업물</span>
                </div>
                <div className={style.imageContainer}>
                    {imageList.map(({ id, url }) => (
                        <img
                            key={id}
                            src={url}
                            alt="uploaded"
                            className={style.image}
                            onClick={() => handleImageClick(id)}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default ProfilePage;
