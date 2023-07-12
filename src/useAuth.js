import { useEffect, useState } from "react";

function useAuth(onNavigate) {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      onNavigate('/login');
    } else {
      setIsAuth(true);
    }
  }, [onNavigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Execute your action here after the paint
      // For example, you can show the menu and footer
      // setMenuVisible(true);
      // setFooterVisible(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return isAuth;
}

export default useAuth;
