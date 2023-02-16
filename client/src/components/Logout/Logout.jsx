import React from "react";
import { useDispatch } from "react-redux";

import { getAuth, signOut } from "firebase/auth";
import { setUid } from "../../redux/actions/actions";

import "./Logout.css";

export default function () {
  const auth = getAuth();
  const dispatch = useDispatch();

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut(auth)
      .then((res) => {
        dispatch(setUid(false));
        setTimeout(() => {
          window.location.pathname = "/";
        }, 500);
      })
      .catch((error) => {
        console.log("ERROR DESLOGUEO: ", error);
      });
  };

  return (
    <button className="logout" onClick={(e) => handleSignOut(e)}>
      Log Out
    </button>
  );
}
