"use strict";

export function getFoodSelect(index) {
  return `
    <div class="row pt-2">
      <div class="col-2">
        <p>Food ${index}</p>
      </div>
      <div class="col-10">
        <select id="foodSelect${index}" class="form-control foodSelect">
          <option value="Eggs">Eggs</option>
          <option value="Chicken">Chicken Breast</option>
          <option value="Beef">80/20 Ground Beef</option>
          <option value="Cheese">Cheese</option>
          <option value="Rice">White Rice</option>
        </select>
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
`;
}

export function getTotalDisplay(totals, goals) {
  return `
    <br />
    <div class="row">
      <h5>Totals</h5>
    </div>
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th>Macro</th>
          <th>Calculated</th>
          <th>Goal</th>
          <th>Error %</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Carbs</td>
          <td>${totals.totalCarbs}g</td>
          <td>${goals.carbs}g</td>
          <td>${errorPct(totals.totalCarbs, goals.carbs)}</td>
        </tr>
        <tr>
          <td>Fat</td>
          <td>${totals.totalFat}g</td>
          <td>${goals.fat}g</td>
          <td>${errorPct(totals.totalFat, goals.fat)}</td>
        </tr>
        <tr>
          <td>Protein</td>
          <td>${goals.protein}g</td>
          <td>${totals.totalProtein}g</td>
          <td>${errorPct(totals.totalProtein, goals.protein)}</td>
          <td></td>
        </tr>
        <tr>
          <td>Calories</td>
          <td>${goals.calories}</td>
          <td>${totals.totalCalories}</td>
          <td>${errorPct(totals.totalCalories, goals.calories)}</td>
        </tr>
      </tbody>
    </table>
  `;
}

function errorPct(calculated, expected) {
  return 100 * (Math.abs(calculated - expected) / expected);
}

// export function getResultDisplay(food) {
//   return `
//     <ul class="list-inline">
//       <li class="list-inline-item"><strong>Name:</strong> ${food.name}</li>
//       <li class="list-inline-item"><strong>Servings:</strong> ${food.servings} ${food.uom}</li>
//       <li class="list-inline-item"><strong>Carbs:</strong> ${food.totalCarbs}g</li>
//       <li class="list-inline-item"><strong>Fat:</strong> ${food.totalFat}g</li>
//       <li class="list-inline-item"><strong>Protein:</strong> ${food.totalProtein}g</li>
//       <li class="list-inline-item"><strong>Calories:</strong> ${food.totalCalories}</li>
//     </ul>
//   `;
//}