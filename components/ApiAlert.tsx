'use client'
import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Badge, BadgeProps } from "@/components/Badge";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

interface ApiAlertType {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertType["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertType["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export default function ApiAlert({
  title,
  description,
  variant,
}: ApiAlertType) {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("Api route copied to the clipboard");
  };
  return (
    <Alert>
      <Server className="w-4 h-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="flex items-center justify-between mt-4 ">
        <code className="relative rounded bg-muted p-1 font-semibold">
          {description}
        </code>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
}
