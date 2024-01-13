import Image from "next/image";
import TodoList from "@/components/TodoList";
import axios from "axios";

// const fetchData = async () => {
//   const res = await axios.get("http://localhost:8080/api/todo");
//   return res.data;
// };

export default async function Home() {
  // const data = await fetchData();

  return (
    <main className="">
      <TodoList  />
    </main>
  );
}
