import { useNavigate } from "react-router-dom";

/**
 * @returns 네비게이션 바
 */
export default function NavBar() {
  // 나중에 로그인 정보 받아와서 띄우기
  const user = 'dev1';
  const nav = useNavigate();
  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    let destination = event.currentTarget.id.toLowerCase();
    nav(
      `${
        destination === "login"
          ? "/login"
          : destination === "main"
          ? "/"
          : `/${destination}`
      }`
    );
  };

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
          <p className="text-[15px]underline"> logged in as {user} </p>
          <div
            onClick={onMove}
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