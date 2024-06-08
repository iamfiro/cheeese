import Modal from "./common";
import { FiUpload } from "react-icons/fi";

function PhotoUploadModal() {
    return (
        <Modal.Backdrop>
            <Modal>
            <Modal.Top icon={<FiUpload />} color="#2fcc88">사진 업로드</Modal.Top>
            </Modal>
        </Modal.Backdrop>
    );
}

export default PhotoUploadModal;