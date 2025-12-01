const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
import type { Plant, Action } from "~/components/types/SharedTypes.js";

const defaultHeaders = {
  apikey: supabaseKey,
  Authorization: `Bearer ${supabaseKey}`,
  "Content-Type": "application/json"
};

/**
 * Fetch data from Supabase
 * @param {string} query - The query string to fetch data
 * @param {object} options - Additional options for the request
 * @returns {Promise<any>} - The fetched data
 * @throws {Response} - Throws an error if the request fails
 */
export const getData = async (
  query: string,
  options: { estimatedCount?: boolean } = {}
): Promise<any> => {
  const headers: Record<string, string> = { ...defaultHeaders };

  if (options.estimatedCount) {
    headers["Prefer"] = "count=estimated";
  }

  return fetch(`${supabaseUrl}/rest/v1/${query}`, {
    headers
  })
    .then((res) => {
      if (res.ok) {
        if (options.estimatedCount) {
          return res.json().then((data) => {
            const contentRange = res.headers.get("content-range");
            const totalCount = contentRange
              ? parseInt(contentRange.split("/")[1])
              : null;
            return { data, count: totalCount };
          });
        }
        return res.json();
      }
      throw new Response("Failed to get data:", {
        status: res.status
      });
    })
    .catch((error) => {
      throw new Response("Failed to get data:", {
        status: error.status || 500
      });
    });
};

/**
 * Post data to Supabase
 * @param {string} query - The query string to post data
 * @param {Record<string, any>} body - The data to post
 * @returns {Promise<Plant[] | Action[]>} - The posted data
 * @throws {Response} - Throws an error if the request fails
 */
export const postData = async (
  query: string,
  body: Record<string, any>
): Promise<Plant[] | Action[]> => {
  const res = await fetch(`${supabaseUrl}/rest/v1/${query}`, {
    method: "POST",
    headers: {
      ...defaultHeaders,
      Prefer: "return=representation"
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Response("Failed to create data:", { status: res.status });
  }

  return res.json();
};

/**
 * Update data in Supabase
 * @param {string} query - The query string to update data
 * @param {Record<string, any>} updates - The data to update
 * @returns {Promise<any>} - The updated data
 * @throws {Response} - Throws an error if the request fails
 */
export const updateData = async (
  query: string,
  updates: Record<string, any>
): Promise<any> => {
  const res = await fetch(`${supabaseUrl}/rest/v1/${query}`, {
    method: "PATCH",
    headers: {
      ...defaultHeaders,
      Prefer: "return=representation"
    },
    body: JSON.stringify(updates)
  });

  if (!res.ok) {
    throw new Response("Failed to update data:", { status: res.status });
  }

  return res.json();
};

/**
 * Delete data from Supabase
 * @param {string} query - The query string to delete data
 * @returns {Promise<boolean>} - True if the deletion was successful
 * @throws {Response} - Throws an error if the request fails
 */
export const deleteData = async (query: string): Promise<boolean> => {
  const res = await fetch(`${supabaseUrl}/rest/v1/${query}`, {
    method: "DELETE",
    headers: {
      ...defaultHeaders,
      Prefer: "return=minimal"
    }
  });

  if (!res.ok) {
    throw new Response("Failed to delete data:", { status: res.status });
  }

  return true;
};
