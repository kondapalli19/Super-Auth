import React, { useEffect, useState } from "react";
import { account } from "../services/appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Home = () => {
  const history = useNavigate();
  const [userDetails, setUserDetails] = useState();

  const fetchUser = async () => {
    try {
      const data = await account.get();
      setUserDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userDetails]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await account.deleteSession("current");
      history("/");
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    try {
      const endpoint = 'http://localhost/v1';
      const projectId = '6483c85ec8a66065e079';
      const apiKey = '01e94ab2777e521f823f83fdf963d92b41574a1ada4443d2d220cc9d691a32249f92734f733ef9d6a7e8d86dc30b21cf0dbc4158c478ca92473a81cbf9b9d9ab40641c8dc086b84780527a9ca7829d8e7c7915bfb8b6d9e08c23f9d3ffaee622d71c59122d0a1d693c3d4f6dd8c78996054add641542edff8fb9db07be2b7e9f'
      const id=userDetails.name;
      const data = await account.get();
      const response = await fetch(`${endpoint}/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Appwrite-Project': projectId,
          'X-Appwrite-Key': apiKey,},});
    console.log("Account deleted successfully");
     
      history("/");
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const secret = urlParams.get("secret");

  if (userId) {
    account
      .updateVerification(userId, secret)
      .then(() => {
        toast.success("User is verified!");
        history("/home");
      })
      .catch((e) => {
        toast.error("Verification failed");
        console.log(e);
      });
  }

  if (userDetails) {
    return (
      <div className="container-xxl border mt-5 p-3">
        <h3 className="text-center"> Super Auth </h3>
        <h6 className="d-flex justify-content-end">Welcome, {userDetails.name}</h6>
        <div className="d-flex justify-content-end align-items-center">
          <button
            className="btn btn-danger mx-1"
            onClick={(e) => handleLogout(e)}
          >
            Logout
          </button>
          <button
            className="btn btn-primary mx-1"
            onClick={() => {
              history("/forget-password");
            }}
          >
            Change Password
          </button>
        </div>

        <div className="my-3">
          <h6>UID : {userDetails.$id} </h6>
          <h6>Name : {userDetails.name} </h6>
          <h6>Email : {userDetails.email} </h6>
          <h6>
            Email Verified : {userDetails.emailVerification ? "Verified" : "Not-Verified"}
          </h6>

          <h6>
            Registered on : {new Date(userDetails.registration).toLocaleDateString()}
          </h6>
        </div>
        <div className="d-flex justify-content-end align-items-center">
          <button
            className="btn btn-outline-danger"
            onClick={(e) => handleDeleteAccount(e)}
          >
            Delete Account
          </button>
        </div>
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
  } else {
    return (
      <div>
        <h2 className="text-center my-3">
          Please login first to see the homepage
        </h2>
        <button
          className="btn btn-dark text-center "
          onClick={() => history("/")}
        >
          Login
        </button>
      </div>
    );
  }
};

export default Home;