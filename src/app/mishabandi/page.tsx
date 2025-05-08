"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function MishaBandiPage() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold mb-4">Welcome to Misha’s Page</h1>
      <Button onClick={() => setCount(count + 1)}>{count}</Button>
    </div>
  );
}
