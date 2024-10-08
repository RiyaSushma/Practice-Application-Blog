import { useDispatch, useSelector } from "react-redux";
import authService from "../../appwrite/auth.js";
import { logout } from '../../store/authSlice.js';

function LogoutBtn() {
    const dispatch = useDispatch();
    const authSession = useSelector((state) => state.auth.userData);
    const logoutHandler = () => {
        const currentUser = 'current';
        authService.logoutUser({ currentUser })
        .then(() => dispatch(logout()));
    }

    return (
        <button className='inline-bock px-6 py-2 duration-200 bg-red-500 text-white font-bold hover:bg-blue-100 rounded-full'
        onClick={logoutHandler}>
            Logout
        </button>
    );
}

export default LogoutBtn;