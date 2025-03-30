import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const role = await login(email, password);
          if (role === 'freelancer') {
              navigate('/freelancer_dashboard');
          } else if (role === 'client') {
              navigate('/client_dashboard');
          }
      } catch (error) {
          console.error('Login failed:', error.message);
      }
  };

    return (
      <div className="pt-10 pb-10 pl-15 pr-15">
      
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8 border-1 border-gray-200 rounded-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <a className="btn btn-ghost normal-case text-4xl text-center ml-30">Hustlr.</a>
          <h2 className="mt-10 text-center text-xl normal-case">Sign in to your account</h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm ">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
              <div className="mt-2">
              <input type="email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm/6" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                </div>
              </div>
              <div className="mt-2">
              </div>
              <input type="password" required autoComplete="current-password" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm/6" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div>
              <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500">
                Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">Signup now</Link>
          </p>
        </div>
      </div>
    </div>
    );
};

export default Login;

