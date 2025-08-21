"use client";

import dynamic from "next/dynamic";

const PhasreGameApp = dynamic(
  () => import("@/components/organisms/phasre/PhasreGame"),
  {
    ssr: false,
  }
);

export default PhasreGameApp;
