"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { api } from "@/lib/api-client";
import { INITIAL_CONTENT } from "@/lib/admin/data";
import type { ContentUpdate, WebsiteContent } from "@/lib/admin/types";

type WebsiteContentContextValue = {
  content: WebsiteContent;
  contentUpdates: ContentUpdate[];
  ready: boolean;
  updateContent: (next: WebsiteContent, note?: string) => Promise<void>;
};

const WebsiteContentContext =
  createContext<WebsiteContentContextValue | null>(null);

export function WebsiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<WebsiteContent>(INITIAL_CONTENT);
  const [contentUpdates, setContentUpdates] = useState<ContentUpdate[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api.get<{
          content: WebsiteContent;
          contentUpdates: ContentUpdate[];
        }>("/api/content");
        if (!cancelled) {
          setContent(data.content);
          setContentUpdates(data.contentUpdates);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const updateContent = useCallback(
    async (next: WebsiteContent, note?: string) => {
      const data = await api.put<{
        content: WebsiteContent;
        contentUpdates: ContentUpdate[];
      }>("/api/content", { content: next, note });
      setContent(data.content);
      setContentUpdates(data.contentUpdates);
    },
    [],
  );

  const value = useMemo(
    () => ({ content, contentUpdates, ready, updateContent }),
    [content, contentUpdates, ready, updateContent],
  );

  return (
    <WebsiteContentContext.Provider value={value}>
      {children}
    </WebsiteContentContext.Provider>
  );
}

export function useWebsiteContent() {
  const ctx = useContext(WebsiteContentContext);
  if (!ctx) {
    throw new Error(
      "useWebsiteContent must be used within WebsiteContentProvider",
    );
  }
  return ctx;
}
