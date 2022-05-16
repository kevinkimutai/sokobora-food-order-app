import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { app } from "../../firebase.config";

import { userSliceActions } from "../../app/userSlice";

import { motion } from "framer-motion";
import { MdShoppingBasket } from "react-icons/md";
import { MdLogout } from "react-icons/md";

import { MdAdd } from "react-icons/md";

import "./Navbar.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const signInHandler = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // // The signed-in user info.
        // const user = result.user;
        // // ...

        console.log(result);
        const { providerData } = result.user;

        dispatch(userSliceActions.login(providerData[0]));

        //persist user login
        localStorage.setItem("user", JSON.stringify(providerData[0]));
      })

      .catch((error) => {
        // // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // // ...

        console.log(error);
      });
  };

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        console.log("successfuly signed out");
      })
      .catch((error) => {
        console.log(error);
      });

    dispatch(userSliceActions.logout());
    localStorage.clear();
    setShowMenu(false);
  };

  const menuLinks = (
    <>
      <a href="#test">Home</a>
      <a href="#test">Menu</a>
      <a href="#test">About us</a>
      <a href="#test">Services</a>
    </>
  );

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <img src="/images/logo.png" alt="sokobora" />
        <p>sokobora</p>
      </div>
      <div className="navbar__menu">
        <div className="navbar__menu-links">{menuLinks}</div>
        <div className="navbar__menu-right">
          <div className="navbar__shopping-cart">
            <MdShoppingBasket className="navbar__shopping-cart-icon" />
            <span>2</span>
          </div>
          <div className="navbar__menu-right__avatar-container">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : "/images/avatar.png"}
              alt="avatar"
              onClick={
                !user
                  ? signInHandler
                  : () => {
                      setShowMenu((prevState) => !prevState);
                    }
              }
            />
            {showMenu && (
              <div>
                <a href="#test">
                  New Item <MdAdd className="navbar__avatar-container__icon" />
                </a>

                {menuLinks}

                <a onClick={logoutHandler}>
                  Logout <MdLogout className="navbar__avatar-container__icon" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
