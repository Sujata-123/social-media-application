import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [state, setState] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const [loadImage, setLoadImage] = useState("");
  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const fileHandle = (e) => {
    if (e.target.files.length !== 0) {
      setState({
        ...state,
        [e.target.name]: e.target.files[0],
      });
    }
    const reader = new FileReader();
    reader.onload = () => {
      setLoadImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const register = async (e) => {
    const { userName, email, password, confirmPassword, image } = state;
    e.preventDefault();
    const formData = new FormData();
    // inside append we are having key and value
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("image", image);
    const baseUrl = "http://localhost:5000";
    const url = baseUrl + `/users`;
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("resultpost", response);
  };

  return (
    <div className="register bg-gray-100 flex justify-center items-center h-screen">
      <div className="card w-1/3 bg-white p-6 rounded-lg shadow-lg">
        <div className="card-header text-2xl font-bold mb-4">
          <h3>Register</h3>
        </div>
        <div className="card-body">
          <form onSubmit={register}>
            <div className="form-group">
              <label
                htmlFor="username"
                className="block text-gray-700 font-semibold mb-2"
              >
                User Name
              </label>
              <input
                type="text"
                placeholder="UserName"
                id="userName"
                name="userName"
                value={state.userName}
                onChange={handleInput}
                className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-400"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                value={state.email}
                onChange={handleInput}
                className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-400"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="password"
                id="password"
                name="password"
                value={state.password}
                onChange={handleInput}
                className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-400"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-semibold mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                value={state.confirmPassword}
                onChange={handleInput}
                className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-400"
              />
            </div>

            {/* upload images */}
            <div className="form-group">
              <div className="file-image">
                <div className="image">
                  {loadImage ? (
                    <img
                      src={loadImage}
                      alt="uploaded file preview"
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="file">
                  <label
                    htmlFor="image"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Select Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    onChange={fileHandle}
                  />
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <div className="form-group">
              <input
                type="submit"
                value="register"
                className="btn w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 mt-2 cursor-pointer"
              />
            </div>

            <div className="form-group text-center mt-3">
              <span>
                <Link
                  to="/social-media/login"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Login Your Account
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
