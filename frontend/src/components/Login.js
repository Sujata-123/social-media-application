import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold">Login</h3>
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <input
              type="submit"
              value="login"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 cursor-pointer"
            />
          </div>

          <div className="text-center">
            <span>
              <Link
                to="/social-media/register"
                className="text-blue-600 font-semibold hover:underline"
              >
                Don't have any Account
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
