import React from 'react';
import { Food } from '../core/solver';
import FoodSearchBar from './food-search-bar';

class FoodSelector extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { show: false };
  }

  private saveFood(): void {
    this.props.onFoodSet([]);
  }

  public setShow(newState: boolean) {
    this.setState({ show: newState });
  }

  public render(): JSX.Element {
    return (
      <div id="foodSection" className={"row " + (this.state.show ? "" : "d-none")}>
        <div className="col">
          <hr />
          <div id="foodSectionHeader" className="row">
            <div className="col">
              <h3>Select Foods
                    <i data-toggle="tooltip" data-html="true" data-trigger="hover" data-placement="bottom"
                  title="Select the foods you want to eat in a day. Choose from the available options or create your own."
                  className="fas fa-xs fa-info-circle text-dark"></i>
              </h3>
            </div>
          </div>
          <FoodSearchBar />
          <FoodSearchBar />
          <FoodSearchBar />
          <div className="row py-3">
            <div className="col">
              <button id="addFoodBtn" type="button" className="btn btn-outline-secondary btn-sm btn-block">Add Another
                    Food</button>
            </div>
          </div>
          <div className="row pt-3">
            <div className="col">
              <button id="servingsBtn" type="button" onClick={() => this.saveFood()} className="btn btn-success">Calculate Servings</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FoodSelector;

export interface IProps {
  onFoodSet(foods: Food[]): void;
}
export interface IState {
  show: boolean;
}