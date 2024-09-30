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
        <header className="py-3 shadow bg-violet-300">
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link to="/">
                            <Logo width="4rem" />
                        </Link>
                    </div>
                    <ul className="flex ml-auto">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.url)}
                                        className="ml-2"
                                    >
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
