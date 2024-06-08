import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase.ts";

function DetailPage() {
    const { id } = useParams();
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
        <div>
            {imageUrl ? (
                <img src={imageUrl} alt={`Image ${id}`} />
            ) : (
                <p>Loading image...</p>
            )}
        </div>
    );
}

export default DetailPage;
