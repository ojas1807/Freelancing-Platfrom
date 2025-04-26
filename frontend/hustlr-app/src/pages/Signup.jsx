import { BriefcaseBusiness, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [selectedRole, setSelectedRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!selectedRole) {
      setError("Please select a role (Freelancer or Client).");
      return;
    }

    if (password !== rePassword) {
      setError("Passwords do not match.");
      return;
    }

    const userData = { name, email, password, role: selectedRole };

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user)); // Store user data for future referen
        localStorage.setItem("userRole", selectedRole); // Store user role for future reference
        alert("Signup Successful!");
        document.getElementById("my_modal_signup").close();
        
        // Redirect based on user role
        if (selectedRole === "freelancer") {
          navigate("/freelancer_level");
        } else if (selectedRole === "client") {
          navigate("/client_level");
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };
  
  return (
    <div>
      <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">Roles</h2>
          <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
            Choose your side
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
          We will curate the experience accordingly specially for you !!
        </p>
        <div className="mx-auto mt-16 grid max-w-lg grid-rows-1 items-center justify-items-center gap-y-0 sm:mt-20 sm:gap-y-4 lg:max-w-4xl lg:grid-cols-2 ">
          <div className={`card bg-base-100 w-96 shadow-sm ${selectedRole === "freelancer" ? "border-2 border-indigo-500" : ""}`}>
            <div className="card-body">
              <div className="card-actions justify-start">
                <User className="w-6 h-6 mr-2 " />
                <input
                  type="radio"
                  className="radio radio-md radio-primary"
                  checked={selectedRole === "freelancer"}
                  onChange={() => setSelectedRole("freelancer")}
                />
              </div>
              <p className="mt-2 text-l font-semibold tracking-tight text-balance text-gray-900 sm:text-xl">
                I&apos;m a Freelancer.<br></br>Looking for work!{" "}
              </p>
            </div>
          </div>
          <div className={`card bg-base-100 w-96 shadow-sm ${selectedRole === "client" ? "border-2 border-indigo-500" : ""}`}>
            <div className="card-body">
              <div className="card-actions justify-start">
                <BriefcaseBusiness className="w-6 h-6 mr-2" />
                <input
                  type="radio"
                  className="radio radio-md radio-primary"
                  checked={selectedRole === "client"}
                  onChange={() => setSelectedRole("client")}
                />
              </div>
              <p className="mt-2 text-l font-semibold tracking-tight text-balance text-gray-900 sm:text-xl">
                I&apos;m a Client.<br></br>Looking for a Freelancer!
              </p>
            </div>
          </div>
        </div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn btn-success mx-auto flex flex-3 mt-10"
          onClick={() => document.getElementById("my_modal_signup").showModal()}
        >
          Continue
        </button>
        <dialog id="my_modal_signup" className="modal backdrop-blur">
          <div className="modal-box pt-10 pb-10 pl-15 pr-15 ">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-0 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                
                <h2 className="mt-10 text-center text-xl normal-case">
                  Create your account
                </h2>
              </div>

              {error && <p className="text-red-500 text-center mt-2">{error}</p>}

              <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSignup} className="space-y-6">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      First Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
        
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                         type="email"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                         type="password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="re-password"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Re-enter Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        type="password"
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      CREATE
                    </button>
                  </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                  Already have an account ?{" "}
                  <Link to="/login"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Login now
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}