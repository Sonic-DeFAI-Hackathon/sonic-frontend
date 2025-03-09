import { toast as sonnerToast } from "sonner";

type ToastType = "default" | "success" | "error" | "warning" | "info";

export interface ToastProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: ToastType;
  duration?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
  onDismiss?: () => void;
  onAutoClose?: () => void;
}

/**
 * Custom hook for consistent toast notifications using Sonner
 */
export const useToast = () => {
  const toast = ({ 
    title, 
    description, 
    variant = "default",
    action,
    duration,
    position,
    onDismiss,
    onAutoClose
  }: ToastProps) => {
    const options = {
      action,
      duration,
      position,
      onDismiss,
      onAutoClose
    };

    switch (variant) {
      case "success":
        sonnerToast.success(title, {
          description,
          ...options
        });
        break;
      case "error":
        sonnerToast.error(title, {
          description,
          ...options
        });
        break;
      case "warning":
        sonnerToast.warning(title, {
          description,
          ...options
        });
        break;
      case "info":
        sonnerToast.info(title, {
          description,
          ...options
        });
        break;
      default:
        sonnerToast(title, {
          description,
          ...options
        });
        break;
    }
  };

  return { toast };
};
