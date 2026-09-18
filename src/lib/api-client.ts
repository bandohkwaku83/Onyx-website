type ApiError = { error?: string };

async function parse<T>(res: Response): Promise<T> {
  const data = (await res.json()) as T & ApiError;
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export const api = {
  get: async <T>(url: string) => parse<T>(await fetch(url)),
  post: async <T>(url: string, body?: unknown) =>
    parse<T>(
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body != null ? JSON.stringify(body) : undefined,
      }),
    ),
  put: async <T>(url: string, body: unknown) =>
    parse<T>(
      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    ),
  patch: async <T>(url: string, body: unknown) =>
    parse<T>(
      await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    ),
  delete: async <T>(url: string) =>
    parse<T>(await fetch(url, { method: "DELETE" })),
};
