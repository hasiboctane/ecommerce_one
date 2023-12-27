import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
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
        e.preventDefault()
        try {
            const res = await login({ email, password }).unwrap();
            await dispatch(setCredentials({ ...res }));
            toast.success("User logged in successfully");
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    }
    return (
        <div className="">
            <section className="pl-[15rem] flex flex-wrap">
                <div className="mr-[4rem] mt-[5rem]">
                    <h1 className="text-2xl font-semibold mb-4 underline"> Log in</h1>
                    <form onSubmit={submitHandler} className="container w-[40rem]">
                        <div className="my-[2rem]">
                            <label
                                htmlFor="email"
                                className="block text-sm text-white font-medium"
                            >Email Address</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="mt-1 p-2 border rounded w-full"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="my-[2rem] relative">
                            <label
                                htmlFor="password"
                                className="block text-sm text-white font-medium"
                            >Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    className="mt-1 p-2 border rounded w-full "
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {
                                    showPassword ?
                                        <FaEyeSlash
                                            className="absolute right-4 top-4 cursor-pointer"
                                            onClick={() => setShowPassword(!showPassword)}
                                        /> :

                                        <FaEye
                                            className="absolute right-4 top-4 cursor-pointer"
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
                                }
                            </div>

                        </div>
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="bg-purple-700 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded "
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                        </button>
                        {isLoading && <Loader />}
                    </form>
                    <div className="mt-4">
                        <p className="text-sm text-white">
                            Don't have an account?{' '}
                            <Link
                                to={redirect ? `/register?redirect=${redirect}` : '/register'}
                                className="text-purple-500 hover:text-purple-700 hover:underline"
                            >
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )

}


export default Login;