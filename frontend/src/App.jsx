import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userStatus = useSelector(state => state.isLogin);

  useEffect(() => {
    authService.currentUser().then((userData) => {
      if (userData) {
        console.log(userData);
        dispatch(login(userData));
      } else {
        dispatch(logout());
      }
    }).finally(() => {
        console.log("finally");
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className='min-h-screen flex flex-col content-between bg-violet-300'>
        <div className='w-full block'>
          <Header />
        </div>
        <main className="mb-auto">
          <Outlet/>
        </main>
        <div className="bottom-0">
          <Footer />
        </div>
    </div>
  ) : (
    null
  );
};

export default App;
