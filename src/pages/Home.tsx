// import { useState } from "react";
import Container from "../components/Container.tsx";

/**
 * @returns 메인페이지
 */

export default function Home() {

  return (
    <Container>
      {/* 마진 임의로 넣음 */}
      <div className="mx-auto">
        <div className="flex my-[77px] mr-[443px] ml-[95px]">
          <h1>Project</h1>
        </div>
      </div>
    </Container>
  );
}