import Link from "next/link";
import React from "react";
// import { permanentRedirect } from "next/navigation";

const page = () => {
  return (
    // permanentRedirect("/dashboard/earn");
    <div className="bg-red-500">
      <p>Second body</p>
      <Link href="/dashboard/earn">go to earn</Link>
    </div>
  );
};

export default page;
