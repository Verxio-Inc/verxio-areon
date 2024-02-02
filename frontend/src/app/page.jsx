"use client";
import { permanentRedirect } from "next/navigation";
import { useNav } from "../context/nav_context";

export default function Profile() {
  permanentRedirect("/dashboard/earn");
}
