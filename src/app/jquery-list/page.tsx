"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "~/components/Loader";

export default function JQueryListPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/jquery-list.html");
  }, [router]);

  return <Loader message="Redirecting to jQuery Dynamic List..." fullScreen />;
}
