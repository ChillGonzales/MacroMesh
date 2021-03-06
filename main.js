// Enable strict mode
"use strict";

export class Food {
  constructor(name, uom, carbsPerServing, proteinPerServing, fatPerServing, minServing = 1, maxServing = 99) {
    this.name = name;
    this.uom = uom;
    this.carbsPerServing = carbsPerServing;
    this.proteinPerServing = proteinPerServing;
    this.fatPerServing = fatPerServing;
    this.minServing = minServing;
    this.maxServing = maxServing;
    this.servings = 1;
  }

  clone() {
    let temp = new Food(this.name, this.uom, this.carbsPerServing, this.proteinPerServing, this.fatPerServing, this.minServing, this.maxServing, this.servings);
    temp.servings = this.servings;
    return temp;
  }
  get totalFat() {
    return this.servings * this.fatPerServing;
  }
  get totalCarbs() {
    return this.servings * this.carbsPerServing;
  }
  get totalProtein() {
    return this.servings * this.proteinPerServing;
  }
  get totalCalories() {
    return this.servings * (4 * this.carbsPerServing + 4 * this.proteinPerServing + 9 * this.fatPerServing);
  }
  get caloriesPerServing() {
    return (this.carbsPerServing * 4) + (this.proteinPerServing * 4) + (this.fatPerServing * 9);
  }
}

export class FoodTotals {
  constructor(foods) {
    let sums = foods.reduce((acc, cur) => {
      acc.totalCarbs += cur.totalCarbs;
      acc.totalFat += cur.totalFat;
      acc.totalProtein += cur.totalProtein;
      acc.totalCalories += cur.totalCalories;
      return acc;
    }, { totalCarbs: 0, totalFat: 0, totalCalories: 0, totalProtein: 0 }); 
    this.totalCarbs = sums.totalCarbs;
    this.totalFat = sums.totalFat;
    this.totalProtein = sums.totalProtein;
    this.totalCalories = sums.totalCalories;
  }
}

export class DailyGoals {
  constructor(calories, carbs, protein, fat) {
    this.calories = calories;
    this.carbs = carbs;
    this.protein = protein;
    this.fat = fat;
  }
}

export class Differences {
  constructor(carbDiff, fatDiff, proteinDiff, calDiff, carbImportance = 0.25, fatImportance = 0.25, proteinImportance = 0.25, calImportance = 0.25) {
    this.carbDiff = carbDiff;
    this.carbImportance = carbImportance;
    this.fatDiff = fatDiff;
    this.fatImportance = fatImportance;
    this.proteinDiff = proteinDiff;
    this.proteinImportance = proteinImportance;
    this.calDiff = calDiff;
    this.calImportance = calImportance;
  }

  get overallDiffScore() {
    // Calories are discounted so they don't dominate diff score
    // TODO: Play with that discount factor
    return (this.carbDiff * this.carbImportance) + (this.fatDiff * this.fatImportance) + (this.proteinDiff * this.proteinImportance) + (this.calDiff * 0.2 * this.calImportance);
  }
}

/**
 * Calculates servings of each type of food given the macro goals.
 * @param {Food[]} foods An array of Food objects to calculate servings for.
 * @param {DailyGoals} goals An object containing information about macro goals.
 * @return {Food[]} Array of food objects with optimized servings set.
 */
export function calculateServings(foods, goals) {
  // TODO: Might need higher than 50 iteration cap
  for (let i = 0; i < 1000; i++) {
    let diffs = getDifferences(foods, goals);

    if (diffsWithinTolerance(diffs)) {
      console.log("We've reached our goal in " + (i + 1) + " steps!");
      break;
    }

    let changes = getPossibleChanges(foods);
    let optimalChange = findBestChange(foods, goals, changes);
    if (!optimalChange) {
      console.log("No further optimal changes found. We've reached our goal in " + (i + 1) + " steps!");
      break;
    }
    applyChange(optimalChange, foods);
  }

  printSummary(foods, goals);
  return foods;
}

/**
 * @param {Food[]} foods Array of foods
 */
function printSummary(foods, goals) {
  let sums = foods.reduce((acc, cur) => {
    acc.totalCarbs += cur.totalCarbs;
    acc.totalFat += cur.totalFat;
    acc.totalProtein += cur.totalProtein;
    acc.totalCalories += cur.totalCalories;
    return acc;
  }, { totalCarbs: 0, totalFat: 0, totalCalories: 0, totalProtein: 0 });

  console.log(`Carbs ended at ${sums.totalCarbs}g with a goal of ${goals.carbs}g`);
  console.log(`Fat ended at ${sums.totalFat}g with a goal of ${goals.fat}g`);
  console.log(`Protein ended at ${sums.totalProtein}g with a goal of ${goals.protein}`);
  console.log(`Calories ended at ${sums.totalCalories} with a goal of ${goals.calories}`);
}


/**
 * @param {Differences} diffs A diffs object to evaluate.
 * @return {boolean} True if the diffs are within tolerance
 */
function diffsWithinTolerance(diffs) {
  return diffs.carbDiff < 3 && 
         diffs.fatDiff < 3 &&
         diffs.proteinDiff < 3 &&
         diffs.calDiff < 50;
}

/**
 * @param {Food[]} foods Array of foods.
 * @return {any} Array of change objects that contain mappings between food names and serving size change.
 */
function getPossibleChanges(foods) {
  // We're going to solve this using decimal to binary conversion.
  // This only works when we're considering only 0 or 1 for changes.
  // This method will have to be more complex if we are to consider more than that (like negative changes)

  // 0 or 1 for now
  // We can do base 3 now? HYPE.
  let numberOfChoices = 3;
  let count = foods.length;
  // This is how you compute the possibilities of 2 choices for x number of foods. 2^x
  let numPossibilities = Math.pow(numberOfChoices, count);
  let binaries = [];
  for (let i = 0; i < numPossibilities; i++) {
    // Convert each number to the base 2 or 3 and then pad that representation so it is in the form 0000 0100 or 2001 1020, etc.
    binaries.push(changeBase(i, numberOfChoices).padStart(count, "0"));
  }

  let list = [];
  binaries.forEach(binary => {
    let chars = [...binary];
    // Don't give an option of no change
    if (chars.every(x => x === "0")) {
      return;
    }

    var change = {};

    // Here we're using the values in the base 2 or 3 representation to correspond to the value of each food.
    // This should build us a full possibility space.
    for (let i = 0; i < count; i++) {
      let intRep = parseInt(chars[i].toString());
      if (intRep === 2) {
        // We want a base 3 '2' to represent a -1 change in our scheme
        intRep = -1;
      }
      change[foods[i].name] = intRep;
    }
    if (isValidChange(foods, change)) {
      list.push(change);
    }
  });

  return list;
}

function isValidChange(foods, change) {
  applyChange(change, foods);
  let valid = foods.every(x => x.servings >= x.minServing && x.servings <= x.maxServing);
  revertChange(change, foods);
  return valid;
}

/**
 * @param {Food[]} foods Array of food representing current state of servings.
 * @param {DailyGoals} goals The goals we're working towards.
 * @param {any} changes Array of mappings between food name and serving size change.
 */
function findBestChange(foods, goals, changes) {
  // Use one object to test each change as they're easy to apply/revert
  let tempFood = foods.map(x => x.clone());
  let bestChange = null;
  let bestFood = foods;
  changes.forEach(change => {
    applyChange(change, tempFood);
    if (compareFoodToGoals(tempFood, bestFood, goals)) {
      // Store current best
      bestFood = tempFood.map(x => x.clone());
      bestChange = change;
    }
    revertChange(change, tempFood);
  });
  return bestChange;
}

/**
 * Applies change to array of food.
 * @param {any} change Object containing mappings between food name and serving size change.
 * @param {Food[]} foods List of foods to apply change map to.
 */
function applyChange(change, foods) {
  foods.forEach(x => x.servings += change[x.name]);
}

/**
 * Reverts change on array of food.
 * @param {any} change Object containing mappings between food name and serving size change.
 * @param {Food[]} foods List of foods to revert change map from.
 */
function revertChange(change, foods) {
  foods.forEach(x => x.servings -= change[x.name]);
}

/**
 * Returns true if foodA is closer to our goal.
 * @param {Food[]} foodA Array of Food objects.
 * @param {Food[]} foodB Array of Food objects.
 * @param {DailyGoals} goals Daily goals we're trying to hit.
 * @return {boolean} True if foodA is closer to our goal.
 */
function compareFoodToGoals(foodA, foodB, goals) {
  if (!foodA && !foodB) {
    throw "You can't compare two undefined foods dummy.";
  }
  if (!foodA) {
    return false;
  }
  if (!foodB) {
    return true;
  }

  let diffA = getDifferences(foodA, goals);
  let diffB = getDifferences(foodB, goals);
  return diffA.overallDiffScore < diffB.overallDiffScore;
}

function getDifferences(foods, goals) {
  let totals = foods.reduce((acc, cur) => {
    acc.totalCalories += cur.totalCalories;
    acc.totalCarbs += cur.totalCarbs;
    acc.totalFat += cur.totalFat;
    acc.totalProtein += cur.totalProtein;
    return acc;
  }, { totalCarbs: 0, totalFat: 0, totalProtein: 0, totalCalories: 0 });

  return new Differences(Math.abs(goals.carbs - totals.totalCarbs),
    Math.abs(goals.fat - totals.totalFat),
    Math.abs(goals.protein - totals.totalProtein),
    Math.abs(goals.calories - totals.totalCalories));
}

/**
 * Deep clones an object. Can only be used on simple serializable types.
 * @param {any} obj An object to deep clone.
 * @return {any} Deep copy of obj
 */
function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Utility function for changing base of a number.
 * Source: https://stackoverflow.com/a/16155417
 * @param {number} num A number to change the base of.
 * @param {number} newBase The base to change the number to. Can be anywhere between 2 and 36.
 * @returns {string} String representation of number in new base.
 */
function changeBase(num, newBase) {
  return (num >>> 0).toString(newBase);
}
