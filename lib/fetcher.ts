// // const BASE_URL = process.env.API_URL!;

// // type FetchOptions = {
// //   method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
// //   body?: any;
// //   headers?: HeadersInit;
// // };

// // export async function fetcher<T>(
// //   url: string,
// //   options: FetchOptions = {}
// // ): Promise<T> {
// //   const res = await fetch(`${BASE_URL}${url}`, {
// //     method: options.method ?? "GET",
// //     headers: {
// //       "Content-Type": "application/json",
// //       ...options.headers,
// //     },
// //     body: options.body ? JSON.stringify(options.body) : undefined,
// //   });

// //   if (!res.ok) {
// //     throw new Error("Request failed");
// //   }

// //   return res.json();
// // }

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

// type FetchOptions = {
//   method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
//   body?: any;
//   headers?: HeadersInit;
// };

// export async function fetcher<T>(
//   url: string,
//   options: FetchOptions = {}
// ): Promise<T> {
//   const fullUrl = `${BASE_URL}${url}`;
  
//   console.log("Fetching:", fullUrl); // Debug log
  
//   const res = await fetch(fullUrl, {
//     method: options.method ?? "GET",
//     headers: {
//       "Content-Type": "application/json",
//       ...options.headers,
//     },
//     body: options.body ? JSON.stringify(options.body) : undefined,
//   });

//   console.log("Response status:", res.status); // Debug log

//   if (!res.ok) {
//     const errorText = await res.text();
//     console.error("Error response:", errorText);
//     throw new Error(`Request failed with status ${res.status}: ${errorText}`);
//   }

//   return res.json();
// }


const BASE_URL = process.env.API_URL!;

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
  headers?: HeadersInit;
  timeout?: number;
};


export async function fetcher<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { timeout = 30000, body, headers, ...rest } = options;

  if (!BASE_URL) {
    throw new Error("API_URL environment variable is not set");
  }

  const fullUrl = `${BASE_URL}${url}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const isFormData = body instanceof FormData;

  try {
    const res = await fetch(fullUrl, {
      ...rest,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...headers,
      },
      body: isFormData ? body : body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Request failed: ${res.status} - ${errorText}`);
    }

    return res.json();
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    throw error;
  }
}
