import useSWR from "swr"

const fetcher = url => fetch(url).then(res => res.json())
const urlCovid = "https://dekontaminasi.com/api/id/covid19/stats"

export const useGetData = path => {
  if (!path) {
    throw new Error("Path is required")
  }

  const url = urlCovid + path

  const { data: covids, error } = useSWR(url, fetcher)

  return { covids, error }
}

export default useGetData;
