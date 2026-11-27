"use client"

import { useAuth } from "./providers/AuthProvider/AuthProvider";

export default function Home() {
  const {userData, authenticated} = useAuth()

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-surface font-sans">
      <div className="text-lg ">
        {JSON.stringify(userData)}
        {authenticated}
      </div>
    </div>
  );
}
