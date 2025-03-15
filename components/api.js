import useSWR from "swr";

const fetcher = url => fetch(url).then(res => res.json());
const baseURL = "/api/covid"; // Use local Next.js API route

export const useGetData = () => {
  const { data: covids, error } = useSWR(baseURL, fetcher);

  return { covids, error };
};

export default useGetData;
