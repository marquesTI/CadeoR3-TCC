import { useState } from "react"; // useState(Hook nada menos que uma função)
import { BsSearch } from "react-icons/bs";
import "./SearchBar.css";

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <form className="search-bar">
      <input
        type="search"
        value={searchValue}
        placeholder="Buscar Produtos"
        className="search_input"
        onChange={({ target }) => setSearchValue(target.value)} //
        required
      />
      {searchValue}
      <button type="submit" className="search_button">
        <BsSearch />
      </button>
    </form>
  );
}

export default SearchBar;
