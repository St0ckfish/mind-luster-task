"use client";

import { useRouter } from "next/navigation";
import Loader from "~/components/Loader";

export default function JQueryListPage() {
  const router = useRouter();

  router.push("/jquery-list.html");

  return <Loader message="Redirecting to jQuery Dynamic List..." fullScreen />;
}
