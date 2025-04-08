"use client"
import { useState } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { errorMonitor } from 'events'


export const LogOutButton = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const handleLogOut = async() => {
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 2000))

    setLoading(false);
    console.log("Logging out...")

    const errorMessage = null;

    const setToast = (type: "success" | "error", title: string, description: string) => {
      const backgroundColors = {
        success: "#047857",
        error: "#B91C1C"
      }

      toast(title, {
        description,
        style: {
          backgroundColor: backgroundColors[type],
          color: "white"
        }
      })
    }

    if(!errorMessage) {
      setToast("success", "Logged Out!", "You have successfully logged out.")
      router.push("/")
    }else {
      setToast("error", "Error!", errorMessage)
    }
  }

  return (
    <Button 
      className="w-24"
      variant="outline"
      onClick={handleLogOut}
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : "Log Out" }
    </Button>
  )
}

