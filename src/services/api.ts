const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") ?? "";

export type ApiRequestOptions = {
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  signal?: AbortSignal;
};

export type ApiResponse<T> = {
  status: number;
  ok: boolean;
  data: T | null;
};

function buildUrl(path: string, query?: ApiRequestOptions["query"]) {
  const url = path.startsWith("http")
    ? new URL(path)
    : new URL(`${API_BASE_URL}${path}`, window.location.origin);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
}

async function request<T>(
  method: string,
  path: string,
  options: ApiRequestOptions = {},
): Promise<ApiResponse<T>> {
  const { headers = {}, query, body, signal } = options;
  const url = buildUrl(path, query);

  const requestOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    signal,
  };

  if (body != null && method !== "GET" && method !== "HEAD") {
    requestOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url, requestOptions);
  const text = await response.text();

  let data: T | null = null;
  if (text) {
    try {
      data = JSON.parse(text) as T;
    } catch {
      data = text as unknown as T;
    }
  }

  if (!response.ok) {
    throw new Error(
      `API ${method} ${url} failed with ${response.status}: ${response.statusText}`,
    );
  }

  return {
    status: response.status,
    ok: response.ok,
    data,
  };
}

export const api = {
  get: <T>(path: string, options?: Omit<ApiRequestOptions, "body">) =>
    request<T>("GET", path, options),
  post: <T>(path: string, options?: ApiRequestOptions) =>
    request<T>("POST", path, options),
  put: <T>(path: string, options?: ApiRequestOptions) =>
    request<T>("PUT", path, options),
  patch: <T>(path: string, options?: ApiRequestOptions) =>
    request<T>("PATCH", path, options),
  delete: <T>(path: string, options?: Omit<ApiRequestOptions, "body">) =>
    request<T>("DELETE", path, options),
};

export default api;
