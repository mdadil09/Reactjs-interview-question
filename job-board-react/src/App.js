import { useEffect, useState } from "react";
import "./App.css";
import JobPosting from "./components/JobPosting";

const ITEMS_PER_PAGE = 6;
const API_ENDPOINT = "https://hacker-news.firebaseio.com/v0";

function App() {
  const [items, setItems] = useState([]);
  const [itemIds, setItemIds] = useState(null);
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchItems = async (currPage) => {
    setCurrentPage(currPage);
    setFetchingDetails(true);

    let itemsList = itemIds;
    if (itemsList === null) {
      const response = await fetch(`${API_ENDPOINT}/jobstories.json`);
      itemsList = await response.json();
      setItemIds(itemsList);
    }

    const itemIdsForPage = itemsList.slice(
      currPage * ITEMS_PER_PAGE,
      currPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    const itemsForPage = await Promise.all(
      itemIdsForPage.map((itemId) =>
        fetch(`${API_ENDPOINT}/item/${itemId}.json`).then((res) => res.json())
      )
    );

    setItems([...items, ...itemsForPage]);
    setFetchingDetails(false);
  };

  useEffect(() => {
    if (currentPage === 0) fetchItems(currentPage);
  }, [currentPage]);

  return (
    <div className="App">
      <h1 className="title">Hacker News Job Board</h1>
      {itemIds === null || items.length < 1 ? (
        <p className="loading">Loading...</p>
      ) : (
        <div>
          <div className="items" role="list">
            {items.map((item) => {
              return <JobPosting key={item.id} {...item} />;
            })}
          </div>
          <button
            className="load-more-button"
            onClick={() => fetchItems(currentPage + 1)}
            disabled={fetchingDetails}
          >
            {fetchingDetails ? "Loading..." : "Load More Jobs"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
