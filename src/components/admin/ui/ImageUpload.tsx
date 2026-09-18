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

export function ImageUpload({
  value,
  onChange,
  label = "Upload Image",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const simulateUpload = useCallback(
    async (file: File) => {
      setUploading(true);
      setProgress(0);
      for (let i = 1; i <= 5; i++) {
        await new Promise((r) => setTimeout(r, 120));
        setProgress(i * 20);
      }
      const url = URL.createObjectURL(file);
      onChange(url);
      setUploading(false);
      setProgress(0);
    },
    [onChange],
  );

  const handleFiles = useCallback(
    (files: FileList | null) => {
      const file = files?.[0];
      if (!file || !file.type.startsWith("image/")) return;
      void simulateUpload(file);
    },
    [simulateUpload],
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

  return (
    <div className="space-y-2">
      <p className="text-[11px] tracking-[0.14em] text-charcoal/70 uppercase">
        {label}
      </p>

      {value ? (
        <div className="overflow-hidden border border-charcoal/10 bg-white">
          <div className="relative aspect-[16/10] bg-ivory">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized={value.startsWith("blob:")}
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
            <div className="w-full max-w-xs space-y-3">
              <p className="text-[11px] tracking-[0.14em] text-charcoal uppercase">
                Uploading…
              </p>
              <div className="h-px overflow-hidden bg-charcoal/10">
                <div
                  className="h-full bg-primary transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-stone">{progress}%</p>
            </div>
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
                PNG, JPG up to 5MB
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
