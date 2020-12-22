import React from "react";
import { DailyGoals, Food, FoodTotals } from "../core/solver";

class Results extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      show: false,
      foods: [],
      totals: {} as FoodTotals,
      goals: {} as DailyGoals,
      carbDisplay: {},
      fatDisplay: {},
      proteinDisplay: {},
      calorieDisplay: {}
    };
  }

  private getRows: () => JSX.Element[] = () => {
    console.log(this.state.foods);
    const elems = this.state.foods.map(food => {
      return (
        <tr key={food.name}>
          <td>{food.name}</td>
          <td>{food.servings} {food.uom}</td>
          <td>{food.totalCarbs}g</td>
          <td>{food.totalFat}g</td>
          <td>{food.totalProtein}g</td>
          <td>{food.totalCalories} kCal</td>
        </tr>
      )
    });
    return elems;
  }

  private errorDisplay(calculated: number, expected: number, warningBound = 3, dangerBound = 6): any {
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

  public setData(foods: Food[], totals: FoodTotals, goals: DailyGoals): void {
    this.setState({
      totals,
      goals,
      foods,
      carbDisplay: this.errorDisplay(totals.totalCarbs, goals.carbs),
      fatDisplay: this.errorDisplay(totals.totalFat, goals.fat),
      proteinDisplay: this.errorDisplay(totals.totalProtein, goals.protein),
      calorieDisplay: this.errorDisplay(totals.totalCalories, goals.calories, 50, 100),
      show: true
    });
  }

  public render(): JSX.Element {
    return (
      <>
        <div id="resultsSection" className={"row " + (this.state.show ? "" : "d-none")}>
          <div className="col">
            <hr />
            <div className="row">
              <div className="col">
                <h5>Daily Servings</h5>
              </div>
            </div>
            <table className="table table-bordered table-hover">
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
                {this.getRows()}
              </tbody>
            </table>
          </div>
        </div>
        <div className={"row " + (this.state.show ? "" : "d-none")}>
          <div className="col">
            <br />
            <div className="row">
              <div className="col">
                <h5>Totals</h5>
              </div>
            </div>
            <table className="table table-hover table-bordered">
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
                  <td>{this.state.totals.totalCarbs}g</td>
                  <td>{this.state.goals.carbs}g</td>
                  <td className={this.state.carbDisplay.class}>{this.state.carbDisplay.diffDisplay}</td>
                </tr>
                <tr>
                  <td>Fat</td>
                  <td>{this.state.totals.totalFat}g</td>
                  <td>{this.state.goals.fat}g</td>
                  <td className={this.state.fatDisplay.class}>{this.state.fatDisplay.diffDisplay}</td>
                </tr>
                <tr>
                  <td>Protein</td>
                  <td>{this.state.totals.totalProtein}g</td>
                  <td>{this.state.goals.protein}g</td>
                  <td className={this.state.proteinDisplay.class}>{this.state.proteinDisplay.diffDisplay}</td>
                </tr>
                <tr>
                  <td>Calories</td>
                  <td>{this.state.totals.totalCalories}</td>
                  <td>{this.state.goals.calories}</td>
                  <td className={this.state.calorieDisplay.class}>{this.state.calorieDisplay.diffDisplay}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default Results;

export interface IProps {
}

export interface IState {
  totals: FoodTotals;
  goals: DailyGoals;
  foods: Food[];
  carbDisplay: any;
  fatDisplay: any;
  proteinDisplay: any;
  calorieDisplay: any;
  show: boolean;
}