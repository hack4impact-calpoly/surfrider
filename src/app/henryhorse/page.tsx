"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function HenryHorse() {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Hit me!</h1>
      <Button onClick={incrementCounter} className="bg-purple-400 hover:bg-purple-700">
        Current Count: {counter}
      </Button>
    </div>
  );
}
