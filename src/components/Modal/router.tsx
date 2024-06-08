import { useSearchParams } from "react-router-dom";
import PhotoUploadModal from "./PhotoUpload";

function ModalRouter() {
    const [param] = useSearchParams();

    switch (param.get('m')) {
        case 'upload':
            return <PhotoUploadModal />;
        default:
            return null;
    }
}

export default ModalRouter;