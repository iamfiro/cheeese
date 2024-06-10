import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../lib/firebase";
import Modal from "./common";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import style from './modal.module.scss';
import { MdPhotoSizeSelectActual } from "react-icons/md";

function ModalPhotoDetail() {
    const [param] = useSearchParams();
    const id = param.get('id');
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const imageRef = ref(storage, `images/${id}`);
        getDownloadURL(imageRef)
            .then((url) => {
                setImageUrl(url);
            })
            .catch((error) => {
                console.error("Error fetching image URL: ", error);
            });
    }, [id]);
    return (
        <Modal.Backdrop>
            <div className={style.modal}>
                <Modal.Top color="#3284ff" icon={<MdPhotoSizeSelectActual />}>사진 자세히 보기</Modal.Top>
                <img src={imageUrl || ''} alt="사진 불러오는 중..." />
            </div>
        </Modal.Backdrop>
    );
}

export default ModalPhotoDetail;