import { useState, useEffect } from "react";
import { useAuthStore } from "@/app/stores/authStore";
import fetchWithAuth from "@/app/utils/fetchWithAuth";

const useFetchData = () => {
  const [roles, setRoles] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [sexes, setSexes] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [unions, setUnions] = useState([]);
  const [tshirts, setTshirts] = useState<Tshirt[]>([]);
  const [users, setUsers] = useState<User[]>([]);
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

      const rolesData = await fetchJson("http://localhost:8080/roles");
      const sizesData = await fetchJson(
        "http://localhost:8080/api/tshirt/sizes",
      );
      const sexesData = await fetchJson(
        "http://localhost:8080/api/tshirt/sexes",
      );
      const jobsData = await fetchJson("http://localhost:8080/api/tshirt/jobs");
      const tshirtData = await fetchJson(
        "http://localhost:8080/api/tshirt/counts",
      );
      const unionsData = await fetchJson("http://localhost:8080/api/union/all");
      const usersData = await fetchJson("http://localhost:8080/user/all");

      if (rolesData) setRoles(rolesData);
      if (sizesData) setSizes(sizesData);
      if (sexesData) setSexes(sexesData);
      if (jobsData) setJobs(jobsData);
      if (unionsData) setUnions(unionsData);
      if (tshirtData) setTshirts(tshirtData);

      if (usersData) {
        const usersWithoutPassword = usersData.map((user: User) => {
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        });
        setUsers(usersWithoutPassword);
      }
    };

    fetchData();
  }, [accessToken]);

  return { roles, sizes, sexes, jobs, unions, users };
};

export default useFetchData;
