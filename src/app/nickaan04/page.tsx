"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Page() {
  //initialize button count to 0
  const [count, setCount] = useState(0);
  //increment count on button press, with count displayed on button
  return (
    <div className="flex justify-center items-center h-screen">
      <Button onClick={() => setCount(count + 1)} className="bg-purple-500 hover:bg-purple-700 text-white font-bold">
        {count}
      </Button>
    </div>
  );
}
