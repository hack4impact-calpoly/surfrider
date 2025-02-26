"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function MishaBandi() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Clicks: {count}</h1>
      <Button onClick={handleClick}>Misha Bandi</Button>
    </div>
  );
}
