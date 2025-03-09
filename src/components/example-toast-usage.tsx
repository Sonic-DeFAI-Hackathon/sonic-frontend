"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
// Import the use-sonner hook instead of use-toast
import { useToast } from "@/lib/use-sonner";

export function ToastDemo() {
  // Use the sonner toast hook
  const { toast } = useToast();

  const showDefaultToast = () => {
    toast({
      title: "Default Toast",
      description: "This is a default toast notification",
    });
  };

  const showSuccessToast = () => {
    toast({
      title: "Success!",
      description: "Action completed successfully",
      variant: "success",
    });
  };

  const showErrorToast = () => {
    toast({
      title: "Error!",
      description: "Something went wrong",
      variant: "error",
    });
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <Button onClick={showDefaultToast}>Show Default Toast</Button>
      <Button onClick={showSuccessToast} className="bg-green-500 hover:bg-green-600">Show Success Toast</Button>
      <Button onClick={showErrorToast} className="bg-red-500 hover:bg-red-600">Show Error Toast</Button>
    </div>
  );
}
