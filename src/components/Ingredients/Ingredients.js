import React, { useState, useCallback, useEffect } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";

const Ingredients = () => {
  const [userIngredient, setUserIngrediant] = useState([]);

  const request = useCallback(async () => {
    try {
      const response = await fetch(
        "https://react-hooks-687cb-default-rtdb.firebaseio.com/ingredients.json"
      );
      if (!response.ok) {
        throw new Error("request failed");
      }
      const loadedIngridients = [];
      const data = await response.json();
      for (const key in data) {
        loadedIngridients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        });
      }
      setUserIngrediant(loadedIngridients);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    request();
  }, [request]);

  const ingredientHandler = async (ingredients) => {
    try {
      const response = await fetch(
        "https://react-hooks-687cb-default-rtdb.firebaseio.com/ingredients.json",
        {
          method: "POST",
          body: JSON.stringify(ingredients),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("did'nt recieve the data");
      }

      const data = await response.json();

      setUserIngrediant((prev) => {
        return [...prev, { id: data.name, ...ingredients }];
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const onRemoveHandler = (id) => {
    setUserIngrediant((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredients={ingredientHandler} />

      <section>
        <Search />
        <IngredientList
          ingredients={userIngredient}
          onRemoveItem={onRemoveHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
