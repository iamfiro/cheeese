import { useSearchParams } from "react-router-dom";
import PhotoUploadModal from "./PhotoUpload";
import ModalPhotoDetail from "./PhotoDetail";

function ModalRouter() {
    const [param] = useSearchParams();

    switch (param.get('m')) {
        case 'u':
            return <PhotoUploadModal />;
        case 'd':
            return <ModalPhotoDetail />;
        default:
            return null;
    }
}

export default ModalRouter;