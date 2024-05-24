import NavBar from "./NavBar.tsx";
import { ReactNode } from "react";

interface IContainerProps {
  children: ReactNode;
}

/**
 * @param 하위 컴포넌트, HTML-tag
 * @returns HTML default setting
 */
export default function Container({ children }:IContainerProps) {
  return (
    <div className="flex flex-col relative">
      <NavBar />
      <div className="bg-white min-h-[100vh] overflow-hidden">
        {/* BODY */}
        {children}
      </div>
    </div>
  );
}