import { toast } from "sonner"

export const setToast = (type: "success" | "error", title: string, description: string) => {
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