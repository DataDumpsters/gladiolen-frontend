import { useState, useEffect } from "react";
import { useAuthStore } from "@/app/store/authStore";
import fetchWithAuth from "@/app/utils/fetchWithAuth";

const useFetchData = () => {
  const [sizes, setSizes] = useState([]);
  const [sexes, setSexes] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [tshirts, setTshirts] = useState<Tshirt[]>([]);
  const { accessToken } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      console.log("Weeral checken", accessToken);

      const fetchJson = async (url: string) => {
        try {
          const response = await fetchWithAuth(url);
          const text = await response.text();

          if (!text) {
            console.warn(`Empty response from ${url}`);
            return null;
          }

          return JSON.parse(text);
        } catch (error) {
          console.error(`Failed to fetch data from ${url}:`, error);
          return null;
        }
      };
      const tshirtData = await fetchJson(
        "http://localhost:8080/api/tshirt/counts",
      );
      const sizesData = await fetchJson(
        "http://localhost:8080/api/tshirt/sizes",
      );
      const sexesData = await fetchJson(
        "http://localhost:8080/api/tshirt/sexes",
      );
      const jobsData = await fetchJson("http://localhost:8080/api/tshirt/jobs");

      if (sizesData) setSizes(sizesData);
      if (sexesData) setSexes(sexesData);
      if (jobsData) setJobs(jobsData);
      if (tshirtData) setTshirts(tshirtData);
    };

    fetchData();
  }, [accessToken]);

  return { sizes, sexes, jobs, tshirts };
};

export default useFetchData;
