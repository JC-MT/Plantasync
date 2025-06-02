const { VITE_PLANT_NET_KEY, VITE_PLANT_NET_URL } = import.meta.env;

export async function getScannerResults(formData: FormData) {
  if (!formData.get("images"))
    return {
      ok: false,
      error: "No file provided. Please select an image file before scanning."
    };

  console.log("Sending request to PlantNet API...", formData);
  try {
    const response = await fetch(
      `${VITE_PLANT_NET_URL}?api-key=${VITE_PLANT_NET_KEY}`,
      {
        method: "POST",
        body: formData
      }
    );

    if (response.ok) {
      const data = await response.json();
      return { ok: true, data };
    } else {
      return { ok: false, error: `API Error: ${response.status}` };
    }
  } catch (error) {
    return { ok: false, error: (error as Error).message };
  }
}
