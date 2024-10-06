import { Container, Logo, LogoutBtn } from "./index.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
    const authStatus = useSelector((state) => state.auth.isLogin);
    const navigate = useNavigate();

    const navItems = [
        {
            name: "Home",
            url: "/",
            active: true,
        },
        {
            name: "Login",
            url: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            url: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            url: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            url: "/add-post",
            active: authStatus,
        },
    ];
    return (
        <header className="py-3 shadow bg-violet-900">
            <Container>
                <nav className="flex">
                    <Link to="/">
                        <Logo width="4rem" />
                    </Link>
                    <ul className="flex ml-auto">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button onClick={() => navigate(item.url)} className="rounded-lg mr-3 bg-violet-950 py-2 px-5 text-white hover:bg-violet-600 focus:ring-blue-900">
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn/>
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;
