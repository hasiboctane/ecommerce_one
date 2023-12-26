import { useState } from 'react'
import {
    AiOutlineHome,
    AiOutlineShopping,
    AiOutlineUserAdd,
    AiOutlineLogin,
    AiOutlineShoppingCart
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/api/userApiSlice';
import { logout } from '../../redux/features/auth/authSlice';
const Navigation = () => {
    const { userInfo } = useSelector(state => state.auth)
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const toggleDropDown = () => {
        setDropDownOpen(!dropDownOpen);
    }
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }
    const closeSidebar = () => {
        setShowSidebar(false);
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLoginMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            await dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div
            style={{ zIndex: 9999 }}
            className={`${showSidebar ? 'hidden' : 'flex'} xl:flex lg:flex flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] transition-width duration-300 delay-0 fixed`}
            id='navigation-container'
        >
            <div className="flex flex-col justify-center space-y-4 ">
                <Link
                    to="/"
                    className="flex items-center transition transform hover:translate-x-2"
                >
                    <AiOutlineHome
                        size={26}
                        className='mr-2 mt-[3rem]'
                    />
                    <span className='hidden nav-item-name mt-[3rem]'>HOME</span>
                </Link>
                <Link
                    to="/shop"
                    className="flex items-center transition transform hover:translate-x-2"
                >
                    <AiOutlineShopping
                        size={26}
                        className='mr-2 mt-[3rem]'
                    />
                    <span className='hidden nav-item-name mt-[3rem]'>SHOP</span>
                </Link>
                <Link
                    to="/cart"
                    className="flex items-center transition transform hover:translate-x-2"
                >
                    <AiOutlineShoppingCart
                        size={26}
                        className='mr-2 mt-[3rem]'
                    />
                    <span className='hidden nav-item-name mt-[3rem]'>CART</span>
                </Link>
                <Link
                    to="/favorite"
                    className="flex items-center transition transform hover:translate-x-2"
                >
                    <FaHeart
                        size={26}
                        className='mr-2 mt-[3rem] text-red-500'
                    />
                    <span className='hidden nav-item-name mt-[3rem]'>FAVORITE</span>
                </Link>
            </div>
            <div className="relative">
                <button
                    onClick={toggleDropDown}
                    className="flex items-center text-gray-800 focus:outline-none"
                >
                    {userInfo ? <span className='text-white'>{userInfo.data.username}</span> : (<></>)}
                </button>
            </div>

            <ul>
                <li>
                    <Link
                        to="/login"
                        className="flex items-center transition transform hover:translate-x-2"
                    >
                        <AiOutlineLogin
                            size={26}
                            className='mr-2 mt-[3rem] text-purple-700'
                        />
                        <span className='hidden nav-item-name mt-[3rem]'>LOGIN</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/register"
                        className="flex items-center transition transform hover:translate-x-2"
                    >
                        <AiOutlineUserAdd
                            size={26}
                            className='mr-2 mt-[3rem] text-purple-700'
                        />
                        <span className='hidden nav-item-name mt-[3rem]'>REGISTER</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navigation