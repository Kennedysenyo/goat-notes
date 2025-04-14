"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { setToast } from "@/lib/toast";
import { useRouter } from "next/navigation";
import { logOutAction } from "@/actions/users";

export const LogOutButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogOut = async () => {
    setLoading(true);

    // await new Promise(resolve => setTimeout(resolve, 2000))

    setLoading(false);

    const errorMessage = await logOutAction();

    if (!errorMessage) {
      setToast("success", "Logged Out!", "You have successfully logged out.");
      router.replace("/");
    } else {
      setToast("error", "Error!", errorMessage);
    }
  };

  return (
    <Button
      className="w-24"
      variant="outline"
      onClick={handleLogOut}
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
    </Button>
  );
};
