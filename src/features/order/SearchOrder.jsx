import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Order #"
        className="px-4 py-3 text-sm transition-all bg-yellow-100 rounded-full placeholder:text-stone-400 w-28 sm:focus:w-72 sm:w-64 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-yellow-700 "
      />
    </form>
  );
}
