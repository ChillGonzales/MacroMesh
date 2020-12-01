"use strict";

export function getFoodSelect(index) {
  return `
    <div id="select${index}" class="card card-body">
      <div class="row pt-2">
        <div class="col-lg-5 col-sm-12">
          <select id="foodSelect${index}" class="form-control foodSelect">
          </select>
        </div>
        <div class="col-lg-1 col-sm-12">
          <p>or</p>
        </div>
        <div class="col-lg-3 col-sm-12">
          <button id="create${index}" type="button" class="btn btn-secondary">Create a Food</button>
          <button id="remove${index}" type="button" class="btn btn-danger">Remove</button>
        </div>
      </div>
    </div>
  `;
}

export function getCustomFoodEditorRow(index) {
  return `
    <div id="select${index}" class="selectContainer">
      <div id="foodRow${index}" class="form-row pt-3 foodRow">
        <div class="form-group col-lg-4 col-sm-12">
          <label for="nameInput${index}">Name</label>
          <input type="text" class="form-control" id="nameInput${index}" placeholder="Enter food name" />
        </div>
        <div class="form-group col-lg-4 col-sm-12">
          <label for="uomInput${index}">Servings Unit</label>
          <input type="text" class="form-control" id="uomInput${index}" placeholder="Enter servings unit" />
        </div>
        <div class="form-group col-lg-4 col-sm-12">
          <label for="carbInput${index}">Carbs (g)</label>
          <input type="number" class="form-control" id="carbInput${index}" placeholder="Enter carbs (g)" />
        </div>
        <div class="form-group col-lg-4 col-sm-12">
          <label for="fatInput${index}">Fat (g)</label>
          <input type="number" class="form-control" id="fatInput${index}" placeholder="Enter fat (g)" />
        </div>
        <div class="form-group col-lg-4 col-sm-12">
          <label for="proteinInput${index}">Protein (g)</label>
          <input type="number" class="form-control" id="proteinInput${index}" placeholder="Enter protein (g)" />
        </div>
        <div class="form-group col-lg-12 col-sm-12">
          <button type="button" class="btn btn-success" id="saveFood${index}">Save Food</button>
          <button type="button" class="btn btn-danger" id="clearFood${index}">Back</button>
        </div>
      </div>
    </div>
  `;
}

export function getCreatedFoodRow(index, food) {
  return `
    <div id="select${index}">
      <div class="row pt-2">
        <div class="col-3">
          <p class="customFoodName" id="createdName${index}"><span class="badge badge-primary">created</span> <strong>${food.name}</strong></p>
        </div>
        <div class="col">
          <p class="">Serving: 1 ${food.uom}</p>
        </div>
        <div class="col">
          <p>Carbs: ${food.carbsPerServing}g</p>
        </div>
        <div class="col">
          <p>Fat: ${food.fatPerServing}g</p>
        </div>
        <div class="col">
          <p>Protein: ${food.proteinPerServing}g</p>
        </div>
        <div class="col">
          <p>Calories: ${food.caloriesPerServing}</p>
        </div>
        <div class="col">
          <button id="remove${index}" type="button" class="btn btn-danger">Remove</button>
        </div>
      </div>
    </div>
  `;
}

export function getResultDisplay(foods) {
  let rows = "";
  foods.forEach(food => {
    rows += `
      <tr>
      <td>${food.name}</td>
      <td>${food.servings} ${food.uom}</td>
      <td>${food.totalCarbs}g</td>
      <td>${food.totalFat}g</td>
      <td>${food.totalProtein}g</td>
      <td>${food.totalCalories} kCal</td>
    </tr>
    `;
  });
  return `
  <div class="col">
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Servings</th>
          <th>Carbs</th>
          <th>Fat</th>
          <th>Protein</th>
          <th>Calories</th>
        </tr>
      </thead>  
      <tbody>
        ${rows}
      </tbody>
    </table>
  </div>
`;
}

export function getTotalDisplay(totals, goals) {
  let carbDisplay = errorDisplay(totals.totalCarbs, goals.carbs);
  let fatDisplay = errorDisplay(totals.totalFat, goals.fat);
  let proteinDisplay = errorDisplay(totals.totalProtein, goals.protein);
  let calorieDisplay = errorDisplay(totals.totalCalories, goals.calories, 50, 100);
  return `
    <div class="col">
      <br />
      <div class="row">
        <div class="col">
          <h5>Totals</h5>
        </div>
      </div>
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th>Macro</th>
            <th>Calculated</th>
            <th>Goal</th>
            <th>Difference</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Carbs</td>
            <td>${totals.totalCarbs}g</td>
            <td>${goals.carbs}g</td>
            <td class="${carbDisplay.class}">${carbDisplay.diffDisplay}</td>
          </tr>
          <tr>
            <td>Fat</td>
            <td>${totals.totalFat}g</td>
            <td>${goals.fat}g</td>
            <td class="${fatDisplay.class}">${fatDisplay.diffDisplay}</td>
          </tr>
          <tr>
            <td>Protein</td>
            <td>${totals.totalProtein}g</td>
            <td>${goals.protein}g</td>
            <td class="${proteinDisplay.class}">${proteinDisplay.diffDisplay}</td>
          </tr>
          <tr>
            <td>Calories</td>
            <td>${totals.totalCalories}</td>
            <td>${goals.calories}</td>
            <td class="${calorieDisplay.class}">${calorieDisplay.diffDisplay}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function errorDisplay(calculated, expected, warningBound = 3, dangerBound = 6) {
  let display = { diffDisplay: "", "class": "" };
  let diff = calculated - expected;
  if (diff <= 0) {
    display.diffDisplay = diff.toString();
  } else {
    display.diffDisplay = "+" + diff;
  }
  if (Math.abs(diff) <= warningBound) {
    display.class = "table-success";
  } else if (Math.abs(diff) <= dangerBound) {
    display.class = "table-warning";
  } else {
    display.class = "table-danger";
  }
  return display;
}