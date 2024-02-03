import { permanentRedirect } from "next/navigation";

// export default function Profile() {
//   // permanentRedirect("/dashboard/earn");
//   <div className="border bg-red-300">
//     <p>Hello</p>
//   </div>
// }

// import Link from "next/link";
// import React from "react";

const page = () => {
  permanentRedirect("/dashboard/earn");
  // return (
  //   <div className="border bg-red-300">
  //     <p>Hello</p>
  //     <Link href='/dashboard'>
  //       go to dashboard
  //     </Link>
  //   </div>
  // );
};

export default page;
