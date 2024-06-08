// import { Header } from "../components";
// import style from '../styles/profile.module.scss';
// import {storage} from "../lib/firebase.ts";
// import { useEffect, useState} from "react";
// import {getDownloadURL, listAll, ref} from "firebase/storage";
// import { useNavigate } from "react-router-dom";
//
// function ProfilePage() {
//     const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
//     const imageListRef = ref(storage, `images/`);
//     const [imageList, setImageList] = useState<string[]>([]);
//     useEffect(() => {
//         if (!imagesLoaded) {
//             listAll(imageListRef).then((response) => {
//                 const fetchUrls = response.items.map((item) =>
//                     getDownloadURL(item),
//                 );
//
//                 Promise.all(fetchUrls).then((urls) => {
//                     setImageList(urls);
//                     setImagesLoaded(true); // Mark images as loaded
//                 });
//             });
//         }
//     }, [imagesLoaded, imageListRef]);
//
//     const navigate = useNavigate();
//
//     const token = localStorage.getItem('token');
//     function writing(){
//         navigate("/photoUpload");
//     }
//
//     function detailpage(){
//         navigate(`/${token}`);
//     }
//
//     return (
//         <main>
//            <Header>
//                 <Header.Logo />
//                 <button className={style.headerButton}>로그인 및 가입</button>
//             </Header>
//             <section className={style.container}>
//                 <div className={style.top}>
//                     <span className={style.lastPostDate}>마지막 포스팅 - 2024 / 03 / 28</span>
//                     <span className={style.lastPostDate}>23개의 작업물</span>
//                 </div>
//                 <div className={style.imageContainer}>
//                     {imageList.map((el) => (
//                         <img key={el} src={el} alt="uploaded" className={style.image} onClick={detailpage}/>
//                     ))}
//                 </div>
//                 <div>
//                     <button onClick={writing}>+</button>
//                 </div>
//             </section>
//
//         </main>
//     );
// }
//
// export default ProfilePage;
import { Header } from "../components";
import style from '../styles/profile.module.scss';
import { storage } from "../lib/firebase.ts";
import { useEffect, useState } from "react";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
    const imageListRef = ref(storage, `images/`);
    const [imageList, setImageList] = useState<{ id: string, url: string }[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!imagesLoaded) {
            listAll(imageListRef).then((response) => {
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
        navigate("/photoUpload");
    };

    const handleImageClick = (id: string) => {
        navigate(`/image/${id}`);
    };

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
                <div>
                    <button onClick={handleUploadClick}>+</button>
                </div>
            </section>
        </main>
    );
}

export default ProfilePage;
