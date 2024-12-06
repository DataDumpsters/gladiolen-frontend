import { useState, useEffect } from "react";

const useFetchData = () => {
  const [roles, setRoles] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [sexes, setSexes] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [unions, setUnions] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const rolesResponse = await fetch("http://localhost:8080/api/user/roles");
      const sizesResponse = await fetch(
        "http://localhost:8080/api/tshirt/sizes",
      );
      const sexesResponse = await fetch(
        "http://localhost:8080/api/tshirt/sexes",
      );
      const jobsResponse = await fetch("http://localhost:8080/api/tshirt/jobs");
      const unionsResponse = await fetch("http://localhost:8080/api/union/all");
      const userResponse = await fetch("http://localhost:8080/api/user/all");

      setRoles(await rolesResponse.json());
      setSizes(await sizesResponse.json());
      setSexes(await sexesResponse.json());
      setJobs(await jobsResponse.json());
      setUnions(await unionsResponse.json());

      // Fetch users zonder paswoord:
      const usersData = await userResponse.json();
      const usersWithoutPassword = usersData.map((user: any) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      setUsers(usersWithoutPassword);
    };

    fetchData();
  }, []);

  return { roles, sizes, sexes, jobs, unions, users };
};

export default useFetchData;
