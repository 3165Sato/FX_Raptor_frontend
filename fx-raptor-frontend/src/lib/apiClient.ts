type ApiClientOptions = Omit<RequestInit, "body"> & {
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
};

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

function buildUrl(path: string, query?: ApiClientOptions["query"]) {
  const normalizedBaseUrl = (baseUrl ?? "http://localhost:18080").replace(
    /\/+$/,
    "",
  );
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(normalizedPath, normalizedBaseUrl);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
}

export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(message: string, status: number, payload: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

export async function apiClient<T>(
  path: string,
  options: ApiClientOptions = {},
): Promise<T> {
  const { headers, body, query, ...init } = options;
  const response = await fetch(buildUrl(path, query), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type");
  const payload = contentType?.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new ApiError(
      `API request failed: ${response.status}`,
      response.status,
      payload,
    );
  }

  return payload as T;
}
