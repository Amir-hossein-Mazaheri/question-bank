function SearchBar(props) {
  return (
    <div {...props}>
      <form action="">
        <div className="relative pl-8 pr-5 py-2 rounded-full shadow-md shadow-gray-200">
          <button
            type="submit"
            className="absolute text-gray-500 top-1/2 left-3 -translate-y-1/2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <input
            placeholder="جستجو..."
            type="text"
            name="search-questions"
            id="search-questions"
            className="outline-none"
          />
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
