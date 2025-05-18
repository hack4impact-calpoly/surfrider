"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function IvanTorriani() {
  const [numState, setNumState] = useState(0);

  const add = () => {
    setNumState(numState + 1);
  };

  const subtract = () => {
    setNumState(numState - 1);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="counter">{numState}</p>
      <div className="ml-12">
        <Button variant="outline" onClick={add}>
          +1
        </Button>
      </div>
      <div className="ml-12">
        <Button variant="outline" onClick={subtract}>
          -1
        </Button>
      </div>
    </div>
  );
}
