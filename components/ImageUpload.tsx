"use client";

import { useEffect, useState } from "react";
import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { ImagePlus, TrashIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  disabled: boolean;
  value: string[];
}

export default function ImageUpload({
  onChange,
  onRemove,
  disabled,
  value,
}: ImageUploadProps) {
  const onUpload = (results: CloudinaryUploadWidgetResults) => {
    if (
      results.info &&
      typeof results.info === "object" &&
      "secure_url" in results.info &&
      typeof results.info.secure_url === "string"
    ) {
      onChange(results.info.secure_url);
    }
  }

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div>
      <div className="mb-4 items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="absolute top-2 ring-2 z-10 ">
              <Button
                variant="destructive"
                size="icon"
                type="button"
                onClick={() => onRemove(url)}
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onSuccess={onUpload} uploadPreset="storesImages">
        {({ open }) => {
          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={() => open()}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
