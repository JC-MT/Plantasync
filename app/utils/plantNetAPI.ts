const { VITE_PLANT_NET_KEY, VITE_PLANT_NET_URL } = import.meta.env;

export async function getScannerResults(formData: FormData) {
  if (!formData.get("images"))
    return { ok: false, error: "No image file provided." };

  try {
    const res = await fetch(
      `${VITE_PLANT_NET_URL}?api-key=${VITE_PLANT_NET_KEY}`,
      {
        method: "POST",
        body: formData
      }
    );

    if (res.ok) {
      const data = await res.json();
      return { ok: true, data };
    } else {
      return { ok: false, error: `API Error: ${res.status}` };
    }
  } catch (error) {
    return { ok: false, error: (error as Error).message };
  }
}
