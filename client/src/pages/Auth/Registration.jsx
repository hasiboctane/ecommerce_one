import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
const Registration = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
    }
    return (
        <section className="pl-[15rem] flex flex-wrap">
            <div className="mr-[4rem] mt-[5rem]">
                <h1 className="text-2xl font-semibold mb-4 underline "> Sign up</h1>
                <form onSubmit={submitHandler} className="container w-[40rem]">
                    <div className="my-[2rem]">
                        <label
                            htmlFor="name"
                            className="block text-sm text-white font-medium"
                        >Name</label>
                        <input
                            type="name"
                            id="name"
                            className="mt-1 p-2 border rounded w-full"
                            placeholder="Enter your Name"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="my-[2rem]">
                        <label
                            htmlFor="email"
                            className="block text-sm text-white font-medium"
                        >Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 p-2 border rounded w-full"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="my-[2rem]">
                        <label
                            htmlFor="password"
                            className="block text-sm text-white font-medium"
                        >Password</label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 p-2 border rounded w-full"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="my-[2rem]">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm text-white font-medium"
                        >Confirm Password</label>
                        <input
                            type="confirmPassword"
                            id="confirmPassword"
                            className="mt-1 p-2 border rounded w-full"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="bg-purple-700 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded "
                    >
                        {isLoading ? "Signing Up..." : "Sign Up"}
                    </button>
                    {isLoading && <Loader />}
                </form>
                <div className="mt-4">
                    <p className="text-sm text-white">
                        Already have an account?{' '}
                        <Link
                            to={redirect ? `/login?redirect=${redirect}` : '/login'}
                            className="text-purple-500 hover:text-purple-700 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )

}


export default Registration;