import "./App.css";
import React, { useEffect, useState, useCallback } from "react";
import BarChart from "./components/bar-chart";
import Table from "./components/table";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [url, setUrl] = useState(["https://swapi.dev/api/planets/"]);

  const sortPlanets = useCallback(async () => {
    setItems((item) => {
      const dataToSort = [...item];
      dataToSort.sort((a, b) => (a.name > b.name ? 1 : -1));
      return dataToSort;
    });
  }, []);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setItems((prevItems) => prevItems.concat(result.results));
        if (result.next) {
          setUrl(result.next);
        } else {
          sortPlanets().then(setIsLoaded(true));
        }
      })
      .catch((err) => {
        throw err;
      });
  }, [sortPlanets, url]);

  return (
    <div>
      <div className="center">
        <h1>Star Wars Planets</h1>
      </div>
      <div className="chart">
        <BarChart isLoaded={isLoaded} items={items} filter={"population"} />
      </div>
      <div className="table">
        <div>
          <Table isLoaded={isLoaded} items={items} />
        </div>
      </div>
    </div>
  );
};
export default App;
