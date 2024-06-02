import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { postLogout } from "../apis/apis";

/**
 * @returns 네비게이션 바
 */
export default function NavBar() {
  // 나중에 로그인 정보 받아와서 띄우기
  const { loggedInUser, setLoggedInUser } = useAuth();
  const nav = useNavigate();

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    let destination = event.currentTarget.id.toLowerCase();
    nav(
      `${
        destination === "login"
          ? "/users/login"
          : destination === "main"
          ? "/"
          : `/${destination}`
      }`
    );
  };

  const handleLogout = async () => {
    try {
      const data = await postLogout();
      if (data === 200) {
        alert('logout');
        setLoggedInUser(""); // 로그아웃 시 사용자 상태 초기화
        nav("/users/login");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="sticky top-0 left-0 z-50 shadow-md">
      {/* Sticky Bar */}
      <div className="relative flex flex-row justif-center items-center bg-white px-4 sm:px-10 py-2">
        <div
          id={`main`}
          onClick={onMove}
          className="cursor-pointer"
        >
          <p className="font-semibold text-[48px]">ITS</p>
        </div>
      </div>
      <div className="relative flex flex-row justify-between items-center bg-white px-4 sm:px-10 py-2">
        <div className="flex-grow"/>
        <div className="flex flex-row justify-between items-center">
          {/* Navigation */}
          <p className="text-[15px] underline">logged in as {loggedInUser}</p>
          {/* <p className="text-[15px]underline"> logged in as {user} </p> */}
          <div
            onClick={handleLogout}
            className="px-4 cursor-pointer text-themeDark text-[15px] sm:text-sm font-semibold"
            id={`login`}
          >
            <p>logout</p>
          </div>
        </div>
      </div>
    </div>
  );
}