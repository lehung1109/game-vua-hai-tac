"use client";

import dynamic from "next/dynamic";
import GameLoading from "./GameLoading";

const PhasreGameApp = dynamic(
  () => import("@/components/organisms/phasre/PhasreGame"),
  {
    ssr: false,
    loading: () => <GameLoading />,
  }
);

export default PhasreGameApp;
