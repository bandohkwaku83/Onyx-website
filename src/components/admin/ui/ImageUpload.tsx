"use client";

import {
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import Image from "next/image";
import { AdminButton } from "./AdminButton";

type Props = {
  value?: string;
  onChange: (url: string | undefined) => void;
  label?: string;
};

async function compressImage(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file);
  const max = 1600;
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not process this image.");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/jpeg", 0.82);
  });
  if (!blob) throw new Error("Could not process this image.");
  if (blob.size > 4 * 1024 * 1024) {
    throw new Error("Image is still too large. Try a smaller photo.");
  }
  return new File([blob], "upload.jpg", { type: "image/jpeg" });
}

export function ImageUpload({
  value,
  onChange,
  label = "Upload Image",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      setUploading(true);
      setError(null);
      try {
        const prepared = await compressImage(file);
        const body = new FormData();
        body.append("file", prepared, "upload.jpg");
        const res = await fetch("/api/upload", { method: "POST", body });
        const data = (await res.json()) as { url?: string; error?: string };
        if (!res.ok || !data.url) {
          throw new Error(data.error || "Upload failed");
        }
        onChange(data.url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [onChange],
  );

  const handleFiles = useCallback(
    (files: FileList | null) => {
      const file = files?.[0];
      if (!file || !file.type.startsWith("image/")) return;
      void uploadFile(file);
    },
    [uploadFile],
  );

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const onBrowse = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = "";
  };

  const saved = Boolean(value && !value.startsWith("blob:"));

  return (
    <div className="space-y-2">
      <p className="text-[11px] tracking-[0.14em] text-charcoal/70 uppercase">
        {label}
      </p>

      {saved && value ? (
        <div className="overflow-hidden border border-charcoal/10 bg-white">
          <div className="relative aspect-[16/10] bg-ivory">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex flex-wrap gap-2 border-t border-charcoal/8 p-3">
            <AdminButton
              type="button"
              variant="outline"
              size="sm"
              onClick={() => inputRef.current?.click()}
            >
              Replace image
            </AdminButton>
            <AdminButton
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onChange(undefined)}
            >
              Remove
            </AdminButton>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`flex min-h-[220px] flex-col items-center justify-center border border-dashed px-6 py-10 text-center transition ${
            dragging
              ? "border-primary bg-primary/5"
              : "border-charcoal/20 bg-white hover:border-charcoal/35"
          }`}
        >
          {uploading ? (
            <p className="text-[11px] tracking-[0.14em] text-charcoal uppercase">
              Uploading…
            </p>
          ) : (
            <>
              <div className="mb-3 flex h-12 w-12 items-center justify-center bg-ivory text-stone">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 16V4M8 8l4-4 4 4" />
                  <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                </svg>
              </div>
              <p className="text-sm font-medium text-charcoal">
                Drag & drop an image here
              </p>
              <p className="mt-1 text-xs font-light text-stone">
                PNG or JPG. Large photos are resized before saving.
              </p>
              <AdminButton
                type="button"
                variant="outline"
                size="sm"
                className="mt-5"
                onClick={() => inputRef.current?.click()}
              >
                Browse files
              </AdminButton>
            </>
          )}
        </div>
      )}

      {value?.startsWith("blob:") ? (
        <p className="text-xs text-stone">
          This image was not saved. Upload it again so it stays on the live site.
        </p>
      ) : null}
      {error ? (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onBrowse}
      />
    </div>
  );
}
