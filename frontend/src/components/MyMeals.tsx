import React, { useEffect } from "react";
import { useState } from "react";
import { getMeals } from "../store/features/mealsSlice";
import { useAppSelector, useAppDispatch } from "../store/store";
import { refresh } from "../store/features/authSlice";

const MyMeals = () => {
  const dispatch = useAppDispatch();
  const meals = useAppSelector((state) => state.meals).meal_list;
  const error = useAppSelector((state) => state.meals).error;

  const fetchMeals = async () => {
    try {
      await dispatch(getMeals()).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // MELHORIA: ao inves de sempre chamar a API, validar se faz sentido chamar:
    // Chamar apenas na 1a vez e, se usuario adicionar nova comida, apenas salvar no state?
    fetchMeals();
  }, []);

  return (
    <div>
      {meals &&
        meals.map((meal) => {
          return <li key={meal.id}>{meal.body}</li>;
        })}
      <ul>{error}</ul>
    </div>
  );
};

export default MyMeals;
