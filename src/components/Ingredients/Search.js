import React, { useState, useEffect } from "react";

import Card from "../UI/Card";
import "./Search.css";
import UseHttp from "../hooks/Use-http";

const Search = React.memo((props) => {
  const [enteredFilter, setEnteredFilterd] = useState("");
  const { onLoadedIngridients } = props;
  const { sendRequest } = UseHttp();

  useEffect(() => {
    const loadIngridient = (data) => {
      const loadedIngridients = [];

      for (const key in data) {
        loadedIngridients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        });
      }

      onLoadedIngridients(loadedIngridients);
    };

    const query =
      enteredFilter.length === 0
        ? ""
        : `?orderBy="title"&equalTo="${enteredFilter}"`;

    sendRequest(
      {
        url:
          "https://react-hooks-687cb-default-rtdb.firebaseio.com/ingredients.json" +
          query,
      },
      loadIngridient
    );
  }, [onLoadedIngridients, sendRequest, enteredFilter]);

  // const fetchData = useCallback(async () => {
  //   const query =
  //     enteredFilter.length === 0
  //       ? ""
  //       : `?orderBy="title&equalTo="${enteredFilter}`;
  //   try {
  //     const response = await fetch(
  //       "https://react-hooks-687cb-default-rtdb.firebaseio.com/ingredients.json" +
  //         query
  //     );
  //     if (!response.ok) {
  //       throw new Error("request failed");
  //     }
  //     const data = await response.json();
  //     const loadedIngridients = [];
  //     for (const key in data) {
  //       loadedIngridients.push({
  //         id: key,
  //         title: data[key].title,
  //         amount: data[key].amount,
  //       });
  //     }
  //     onLoadedIngridients(loadedIngridients);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }, [onLoadedIngridients, enteredFilter]);

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  const filterHandler = (e) => {
    setEnteredFilterd(e.target.value);
  };

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={enteredFilter} onChange={filterHandler} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
