import React, { useState, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
import UseHttp from "../hooks/Use-http";

const Ingredients = () => {
  const [userIngredient, setUserIngrediant] = useState([]);
  const { sendRequest: sendIngredients } = UseHttp();

  const filterIngredientsHandler = useCallback((filterIngredients) => {
    setUserIngrediant(filterIngredients);
  }, []);

  const addIngredients = (ingredientText, ingredientData) => {
    const generateId = ingredientData.name;
    setUserIngrediant((prev) => {
      return [...prev, { id: generateId, ...ingredientText }];
    });
  };

  const ingredientHandler = async (ingredientText) => {
    sendIngredients(
      {
        url: "https://react-hooks-687cb-default-rtdb.firebaseio.com/ingredients.json",
        method: "POST",
        body: ingredientText,
        headers: { "Content-Type": "application/json" },
      },
      addIngredients.bind(null, ingredientText)
    );
  };

  const onRemoveHandler = (id) => {
    const deleteIngridient = () => {
      setUserIngrediant((prev) => {
        return prev.filter((item) => item.id !== id);
      });
    };
    sendIngredients(
      {
        url: `https://react-hooks-687cb-default-rtdb.firebaseio.com/ingredients/${id}.json`,
        method: "DELETE",
      },
      deleteIngridient
    );
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredients={ingredientHandler} />

      <section>
        <Search onLoadedIngridients={filterIngredientsHandler} />
        <IngredientList
          ingredients={userIngredient}
          onRemoveItem={onRemoveHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
