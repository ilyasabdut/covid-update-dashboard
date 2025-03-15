import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

export const useGetData = () => {
  const { data: covids, error } = useSWR("https://wallet-transaction-backend.onrender.com/api/external/covid", fetcher);

  console.log("Fetched data:", covids || "Loading...");
  
  return { covids, error };
};

export default useGetData;
