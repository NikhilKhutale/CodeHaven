import React, { useState } from 'react'
import Swal from 'sweetalert2';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import Preloader from './PreLoader';

const ImageUploader = () => {
    const [urlImg, setUrlImg] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false)

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setSelectedImage(file);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };


    const handleClick = async (e) => {
        e.preventDefault();

        const fileName = new Date().getTime() + selectedImage.name;
        const storage = getStorage();
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, selectedImage);

        setLoading(true)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        setLoading(false)
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                }
            },
            (error) => {
                setLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Upload failed!',
                });
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUrlImg(downloadURL);
                    setLoading(false)
                    Swal.fire({
                        icon: 'success',
                        title: 'Upload Successful!',
                        showConfirmButton: false,
                        timer: 2500
                    })
                });
            }
        );
    };

    const handleCopyText = () => {
        navigator.clipboard.writeText(urlImg);
    };

    return (
        <>
            {loading && <Preloader />}
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3" >
                        <div
                            className="card"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            style={{ backgroundColor: "#e3f2fd" }}
                        >
                            <div className="card-body">
                                <h5 className="card-title">Image Uploader</h5>
                                <div className="form-group">
                                    <label htmlFor="imageInput" className="form-label">
                                        Select or Drag an Image
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control-file"
                                        id="imageInput"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                </div>
                                {selectedImage && (
                                    <>
                                        <img
                                            src={URL.createObjectURL(selectedImage)}
                                            alt="Uploaded"
                                            className="img-fluid mt-3"
                                        />
                                        <div className='text-center py-2'>
                                            <button className='secondary-button' onClick={handleClick}>Upload</button>
                                        </div>
                                    </>
                                )}
                                {urlImg && (
                                    <div className="mt-3">
                                        <h6>Image URL:</h6>
                                        <pre className="border rounded p-3 position-relative text-wrap">
                                            {urlImg}
                                            <span className='position-absolute top-0 end-0 p-3' onClick={handleCopyText} style={{ cursor: 'pointer' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
                                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                                                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                                                </svg>
                                            </span>
                                        </pre>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ImageUploader