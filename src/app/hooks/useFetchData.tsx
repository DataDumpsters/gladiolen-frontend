import { useState, useEffect } from "react";
import { useAuthStore } from "@/app/store/authStore";

const useFetchData = () => {
  const [roles, setRoles] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [sexes, setSexes] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [unions, setUnions] = useState([]);
  const [users, setUsers] = useState([]);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const fetchJson = async (url: string) => {
        const response = await fetch(url, { headers });
        const text = await response.text();

        if (!text) {
          console.warn(`Empty response from ${url}`);
          return null;
        }

        try {
          return JSON.parse(text);
        } catch (error) {
          console.error(`Failed to parse JSON from ${url}:`, error);
          console.log(`Response causing the error: ${text}`);
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
      const unionsData = await fetchJson("http://localhost:8080/api/union/all");
      const usersData = await fetchJson("http://localhost:8080/user/all");

      if (rolesData) setRoles(rolesData);
      if (sizesData) setSizes(sizesData);
      if (sexesData) setSexes(sexesData);
      if (jobsData) setJobs(jobsData);
      if (unionsData) setUnions(unionsData);

      if (usersData) {
        const usersWithoutPassword = usersData.map((user: any) => {
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        });
        setUsers(usersWithoutPassword);
      }
    };

    fetchData();
  }, [token]);

  return { roles, sizes, sexes, jobs, unions, users };
};

export default useFetchData;
