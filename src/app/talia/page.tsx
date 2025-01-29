"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Click</h1>
      <Button
        className="text-lg px-4 py-2 bg-lavender hover:bg-purple-300 text-white rounded-md shadow-lg"
        onClick={() => setCount(count + 1)}
      >
        {count}
      </Button>
    </div>
  );
}
