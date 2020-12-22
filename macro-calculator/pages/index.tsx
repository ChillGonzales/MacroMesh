import HeadComponent from '../components/head-component';
import MacroInput from '../components/macro-input'
import FoodSelector from '../components/food-selector';
import React from 'react';
import solve, { DailyGoals, Food, FoodTotals } from '../core/solver';
import Results from '../components/results';

let goals: DailyGoals | null = null;
let foods: Food[] = [];
let totals: FoodTotals;
let foodSelector = React.createRef<FoodSelector>();
let results = React.createRef<Results>();

function saveGoals(newGoals: DailyGoals) {
  goals = newGoals;
  foodSelector.current?.setShow(true);
}

function saveFoods(newFoods: Food[]) {
  foods = newFoods;
  if (!goals) {
    return;
  }

  let eggs = new Food("Eggs", "egg(s)", 1, 6, 5, 1, 6);
  let chicken = new Food("Chicken", "oz", 0, 9, 1, 1, 24);
  let beef8020 = new Food("80/20 Ground Beef", "oz", 0, 7, 5, 1, 24);
  let beef9010 = new Food("90/10 Ground Beef", "oz", 0, 8, 3, 1, 24);
  let cheese = new Food("Cheese", "oz", 0, 7, 9, 1, 8);
  let turkey = new Food("Ground Turkey", "oz", 0, 7, 5, 1, 24);
  let broccoli = new Food("Broccoli", "oz", 2, 1, 0, 1, 24);
  foods = [eggs, chicken, beef8020, beef9010, cheese, turkey, broccoli];

  let solvedFoods = solve(foods, goals);
  let totals = new FoodTotals(solvedFoods);
  results.current?.setData(solvedFoods, totals, goals);
}

export default function Home() {
  return (
    <div className="container my-3">
      <HeadComponent />
      <main>
        <MacroInput onGoalsSet={goals => saveGoals(goals)} />
        <FoodSelector onFoodSet={foods => saveFoods(foods)} ref={foodSelector} />
        <Results ref={results} />
      </main>
    </div>
  );
}
