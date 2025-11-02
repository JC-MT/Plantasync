const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const defaultHeaders = {
  apikey: supabaseKey,
  Authorization: `Bearer ${supabaseKey}`,
  "Content-Type": "application/json"
};

/**
 * Fetch data from Supabase
 * @param {string} query - The query string to fetch data
 * @returns {Promise<any>} - The fetched data
 * @throws {Response} - Throws an error if the request fails
 */
export const getData = async (query: string): Promise<any> => {
  return fetch(`${supabaseUrl}/rest/v1/${query}`, {
    headers: {
      ...defaultHeaders
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
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
 * @returns {Promise<any>} - The posted data
 * @throws {Response} - Throws an error if the request fails
 */
export const postData = async (
  query: string,
  body: Record<string, any>
): Promise<any> => {
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
