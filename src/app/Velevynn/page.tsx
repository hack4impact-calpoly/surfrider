"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Velevynn() {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button variant="outline" onClick={incrementCounter}>
        {counter}
      </Button>

      <p>You must click the button.</p>
    </div>
  );
}
