export const insertMassage = async (row: any) => {
  const endpoint = import.meta.env.VITE_ai_endpoint;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to send message");
  }

  return res.json();
};
