import React, { useState } from "react";
import { account } from "../services/appwriteConfig";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const ForgetPassword = () => {
  const [userEmail, setuserEmail] = useState("");
  
  const forgetPassword = async (e) => {
    e.preventDefault();
    if (userEmail && userEmail.includes("@")) {
      try {
        await account.createRecovery(userEmail, "http://localhost:3000/reset-password");
        toast.success("Email has been sent!");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Please enter a valid email!");
    }
  };

  return (
    <div className="container-xl p-3 my-5 border">
      <h2 className="text-center"> Password Recovery</h2>
      <form className="container">
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Enter your email
          </label>
          <input
            onChange={(e) => {
              setuserEmail(e.target.value);
            }}
            type="email"
            name="email"
            required
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button
          className="btn btn-primary"
          type="submit"
           onClick={(e) => forgetPassword(e)}
         
        >
          Reset password
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ForgetPassword;
