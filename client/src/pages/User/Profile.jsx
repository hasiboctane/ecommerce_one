import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useProfileMutation } from '../../redux/api/userApiSlice';
const Profile = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { userInfo } = useSelector((state) => state.auth);
    const [updateProfile, { isLoading }] = useProfileMutation();
    useEffect(() => {
        setUserName(userInfo?.data?.username);
        setEmail(userInfo?.data?.email);
    }, [userInfo]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            try {
                const res = await updateProfile({ _id: userInfo.data._id, username, email, password }).unwrap();
                await dispatch(setCredentials({ ...res }));
                toast.success("Profile updated successfully");
                navigate('/');
            } catch (error) {
                toast.error(error?.data?.message || error.message);
            }
        }
    }
    return (
        <div className="container mx-auto p-4 mt-[4rem]">
            <div className="flex justify-center items-center md:flex md:space-x-4">
                <div className="md:w-1/3">
                    <h2 className=" text-center text-2xl font-semibold mb-4 underline">Update Profile</h2>
                    <form onSubmit={submitHandler} >
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-white mb-2">Name</label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter Name"
                                className="p-4 rounded-sm w-full"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-white mb-2">Name</label>
                            <input
                                type="text"
                                id="email"
                                placeholder="Enter email"
                                className="p-4 rounded-sm w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-white mb-2">Name</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter Password"
                                className="p-4 rounded-sm w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-white mb-2">Name</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm Your Password"
                                className="p-4 rounded-sm w-full"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className=" flex justify-between mb-4">
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="bg-purple-700 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded"
                            >
                                {isLoading ? "Updating..." : "Update"}
                            </button>
                            <Link
                                to="/user-orders"
                                className="bg-purple-700 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded"
                            >
                                My Orders
                            </Link>
                        </div>
                    </form>
                </div>
                {isLoading && <Loader />}
            </div>
        </div>
    )

}


export default Profile;