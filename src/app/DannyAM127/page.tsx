"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function DannyAM127() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Count Value: {count}</h1>
      <Button onClick={handleClick}>{count}</Button>
    </div>
  );
}
