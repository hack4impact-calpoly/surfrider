"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Page() {
  //initialize button count to 0
  const [count, setCount] = useState(0);
  //increment count on button press, with count displayed on button
  return <Button onClick={() => setCount(count + 1)}>{count}</Button>;
}
