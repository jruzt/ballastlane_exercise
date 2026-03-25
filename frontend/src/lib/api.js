import { errorMessageFromDocument, deserializeResource } from "./jsonApiDeserializer";

export async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    credentials: "include",
    ...options
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json") ? await response.json() : null;

  if (!response.ok) {
    throw new Error(errorMessageFromDocument(payload));
  }

  return payload;
}

export async function requestResource(path, options = {}) {
  const payload = await apiRequest(path, options);
  return deserializeResource(payload).data;
}

export async function requestCollection(path, options = {}) {
  const payload = await apiRequest(path, options);
  return deserializeResource(payload);
}
