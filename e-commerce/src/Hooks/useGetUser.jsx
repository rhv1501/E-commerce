import { useQuery } from "@tanstack/react-query";
const getUser = async () => {
  try {
    const result = fetch("https://loclhost:600/api/auth");
    const data = await result.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
export const useGetUser = () => {
  const query = useQuery({ queryKey: ["getuser"], queryFn: getUser });
  return query;
};
