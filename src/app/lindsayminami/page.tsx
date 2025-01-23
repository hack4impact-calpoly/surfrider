"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function LindsayMinami() {
  const [counter, setCounterState] = useState(0);

  const clickAdd = () => {
    setCounterState(counter + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Click the Button!</h1>
      <Button variant="outline" onClick={clickAdd}>
        Button
      </Button>
      <br />
      <p>
        <b>Total Clicks:</b> {counter}
      </p>
    </div>
  );
}
