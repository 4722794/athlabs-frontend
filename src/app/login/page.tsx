import LandingLayout from "../layout/LandingLayout";

const Login = () => {
  const footerClass = "!relative";

  return (
    <LandingLayout showButton={false} footerClass={footerClass}>
      <div className="bg-[#04080f] flex items-center justify-center pt-40 pb-20 h-screen ">
        <div className="bg-black p-8 rounded-lg shadow-lg max-w-sm w-full border-[3px]  border-gray-400">
          <h2 className="text-2xl font-semibold text-center mb-4 text-white">
            Login
          </h2>
          <p className="text-white/90 text-center mb-10">
            Login to use Athlabs
          </p>
          <form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-white/70  text-sm font-semibold mb-2"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                className="form-input w-full px-4 py-2 border rounded-lg  border-gray-400 text-white/90  bg-transparent"
                placeholder="hello@alignui.com"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-white/70  text-sm font-semibold mb-2"
              >
                Password *
              </label>
              <input
                type="password"
                id="password"
                className="form-input w-full px-4 py-2 border rounded-lg  border-gray-400 text-white/90  bg-transparent"
                placeholder="••••••••"
              />
              <p className="text-white/70 text-xs mt-1">
                Must contain 1 uppercase letter, 1 number, min. 8 characters.
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Login
            </button>
            <p className="text-white/70 text-xs text-center mt-4">
              Don&apos;t have an account?
              <a className="text-blue-500 hover:underline ml-1" target="_blank">
                Request for access
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </LandingLayout>
  );
};

export default Login;
