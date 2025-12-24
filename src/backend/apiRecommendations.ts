export const getRecommendations = async (userId : string ) => {
  const res = await fetch(
    `http://localhost:8000/ML?user_id=${userId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  return res.json();
};
