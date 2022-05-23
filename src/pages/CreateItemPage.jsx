import { React, useState } from "react";

import {
  MdDriveFileRenameOutline,
  MdCloudUpload,
  MdAttachMoney,
  MdDelete,
} from "react-icons/md";

import Spinner from "../components/Spinner/Spinner";

import { storage } from "../firebase.config";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import "./CreateItemPage.css";
import { AnimatePresence, motion } from "framer-motion";
import { categories } from "../utils/data";
import { saveItem } from "../utils/firebaseFunctions";

const CreateItemPage = () => {
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [fields, setFields] = useState();
  const [alertStatus, setAlertStatus] = useState();
  const [msg, setMsg] = useState();
  const [isLoading, setIsLoading] = useState();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    console.log(imageFile);

    const storageRef = ref(
      storage,
      `images/ ${Date.now()} - ${imageFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        setMsg("something went wrong while uploading, try again!");
        setFields(true);
        setAlertStatus("danger");

        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setMsg("Successfuly uploaded image");
          setFields(true);
          setAlertStatus("success");

          setTimeout(() => {
            setFields(false);
            setIsLoading(false);
          }, 4000);
        });
      }
    );
  };
  const deleteImage = () => {
    const imageRef = ref(storage, imageAsset);

    // Delete the file
    deleteObject(imageRef)
      .then(() => {
        setFields(true);
        setImageAsset("");
        setAlertStatus("success");
        setMsg("Successfuly deleted image,choose another one");
        setIsLoading(true);

        setTimeout(() => {
          setIsLoading(false);
          setFields(false);
        }, 4000);
      })
      .catch((error) => {
        console.log(error);
        setMsg("error ,try again!");
        setFields(true);
        setAlertStatus("danger");

        setTimeout(() => {
          setFields(false);
        }, 4000);
      });
  };

  const clearInputs = () => {
    setCategory("");
    setPrice("");
    setImageAsset("");
    setTitle("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(category, price, imageAsset, title);

    if (!category || !price || !imageAsset || !title) {
      setMsg("fill in all inputs!");
      setFields(true);
      setAlertStatus("danger");

      setTimeout(() => {
        setFields(false);
      }, 4000);

      clearInputs();
    } else {
      const data = {
        category,
        price,
        imageUrl: imageAsset,
        name: title,
        qty: 1,
      };
      saveItem(data);

      setIsLoading(false);
      setFields(true);
      setMsg("Data uploaded successfully 😊");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);

      clearInputs();
    }
  };

  return (
    <AnimatePresence>
      <div className="create-item ">
        {fields && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className={`create-item__alert ${alertStatus}`}
          >
            <p>{msg}</p>
          </motion.div>
        )}
        <div className="inputs">
          <div className="inputs__input-container">
            <MdDriveFileRenameOutline className="input__icon " />
            <input
              type="text"
              required
              placeholder="Your title..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="inputs__select-container">
            <select
              name="categories"
              id="categories"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="">select category</option>
              {categories &&
                categories.map((item) => (
                  <option value={item.urlParamName} key={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="inputs__input-container__image">
            {isLoading ? (
              <Spinner />
            ) : !imageAsset ? (
              <label>
                <MdCloudUpload className="image__upload-icon" />
                <p> click here to upload</p>
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={uploadImage}
                />
              </label>
            ) : (
              <>
                <img src={imageAsset} alt="" />
                <button type="button" onClick={deleteImage}>
                  <MdDelete className="input__icon " />
                  Delete Image
                </button>
              </>
            )}
          </div>
          <div className="inputs__input-container">
            <MdAttachMoney className="input__icon " />
            <input
              type="text"
              required
              placeholder="price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <button
            className="inputs__button"
            type="submit"
            onClick={submitHandler}
          >
            Create
          </button>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default CreateItemPage;
