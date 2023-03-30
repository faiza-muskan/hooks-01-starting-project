import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";
import UseHttp from "../hooks/Use-http";

const Search = React.memo((props) => {
  const [enteredFilter, setEnteredFilterd] = useState("");
  const { onLoadedIngridients } = props;
  const { sendRequest } = UseHttp();
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
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
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [onLoadedIngridients, sendRequest, enteredFilter]);

  const filterHandler = (e) => {
    setEnteredFilterd(e.target.value);
  };

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={filterHandler}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
