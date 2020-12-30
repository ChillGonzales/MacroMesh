import React from 'react';
import { Food } from '../core/solver';
import { FoodService, SearchResult } from '../services/food-service';
import FoodSearchBar from './food-search-bar';

class FoodSelector extends React.Component<IProps, IState> {
  private results: Map<number, SearchResult> = new Map<number, SearchResult>();
  private foodService: FoodService;

  constructor(props: IProps) {
    super(props);

    this.state = { show: false, searchBarIds: [1, 2, 3] };
    this.foodService = new FoodService();
    this.onFoodAdded = this.onFoodAdded.bind(this);
  }

  private async saveFood(): Promise<void> {
    const foods = Array.from(this.results).map(([k, x]) => {
      return this.foodService.getInfo(x.id, x.possibleUnits[0]);
    });
    const all = await Promise.all(foods);
    console.log(all);
    this.props.onFoodSet(all);
  }

  private onFoodAdded(result: SearchResult | null, id: number): void {
    if (!result) {
      let index = this.state.searchBarIds.indexOf(id);
      if (index === -1) return;

      // Remove index from state
      const newArr = this.state.searchBarIds;
      newArr.splice(index, 1);
      this.setState({ searchBarIds: newArr });
      this.results.delete(id);
    } else {
      console.log(result);
      this.results.set(id, result);
    }
  }

  private addFood(): void {
    const newArr = this.state.searchBarIds;
    const highestId = Math.max(...newArr);
    newArr.push(highestId + 1);
    this.setState({ searchBarIds: newArr });
  }

  private getSearchBars(): JSX.Element[] {
    return this.state.searchBarIds.map(id => {
      return (
        <FoodSearchBar key={id} onSelectionCleared={() => this.onFoodAdded(null, id)} onSelectionChanged={x => this.onFoodAdded(x, id)} id={id} />
      );
    });
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
          {this.getSearchBars()}
          <div className="row py-3">
            <div className="col">
              <button id="addFoodBtn" type="button" onClick={() => this.addFood()} className="btn btn-outline-secondary btn-sm btn-block">Add Another
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
  searchBarIds: number[];
}