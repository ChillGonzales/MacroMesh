import React from 'react';
import $ from 'jquery';

class MacroInput extends React.Component<IMacroProps, IState> {

  constructor(props: IMacroProps, state: IState) {
    super(props);
    this.state = { showTooltip: false };

    this.onInputChanged = this.onInputChanged.bind(this);
    this.calculateCalories = this.calculateCalories.bind(this);
    this.toggleTooltip = this.toggleTooltip.bind(this);
  }

  public componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  private toggleTooltip(): void {
    this.setState({ showTooltip: !this.state.showTooltip });
  }

  private calculateCalories(): void {
    if (!this.state.carbs || !this.state.protein || !this.state.fat) {
      return;
    }
    this.setState({ calories: 4 * this.state.carbs + 9 * this.state.fat + 4 * this.state.protein });
  }

  private onInputChanged(event: React.ChangeEvent<HTMLInputElement>): void {
    switch (event.target.name) {
      case "carbs":
        this.setState({ carbs: parseFloat(event.target.value) });
        break;
      case "fat":
        this.setState({ fat: parseFloat(event.target.value) });
        break;
      case "protein":
        this.setState({ protein: parseFloat(event.target.value) });
        break;
    }
  }

  public render(): JSX.Element {
    return (
      <>
        <div className="row">
          <div className="col">
            <h3>Enter Daily Macro Goals</h3>
          </div>
        </div>
        <div className="form">
          <div className="form-group row">
            <div className="col-lg-3 col-sm-12">
              <label htmlFor="carbs">Carbs (g)</label>
              <input type="number" className="form-control" name="carbs" onChange={this.onInputChanged} placeholder="Enter carbs (g)" />
            </div>
            <div className="col-lg-3 col-sm-12">
              <label htmlFor="fat">Fat (g)</label>
              <input type="number" className="form-control" name="fat" onChange={this.onInputChanged} placeholder="Enter fat (g)" />
            </div>
            <div className="col-lg-3 col-sm-12">
              <label htmlFor="protein">Protein (g)</label>
              <input type="number" className="form-control" name="protein" onChange={this.onInputChanged} placeholder="Enter protein (g)" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-12">
              <p className="lead" id="calculatedCals">Total Calories: {(this.state.calories === 0 ? "" : this.state.calories)}</p>
            </div>
          </div>
          <div className="form-group row">
            <div className="col">
              <button id="calculateBtn" onClick={this.calculateCalories} className="btn btn-primary">Calculate Calories</button>
              <i data-toggle="tooltip" data-html="true" data-trigger="hover" data-placement="bottom" onClick={this.toggleTooltip}
                title="Calculates your calories from your macro goals. <b>If you change your macros after calculating, you must recalculate for the changes to take effect.</b>"
                className="fas fa-lg fa-info-circle text-dark"></i>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default MacroInput;
export interface IMacroProps {
  onGoalsSet(): MacroGoals;
}
export interface MacroGoals {
  carbGoal: number;
  fatGoal: number;
  proteinGoal: number;
  calorieGoal: number;
}
interface IState {
  carbs?: number;
  protein?: number;
  fat?: number;
  calories?: number
  showTooltip: boolean;
}