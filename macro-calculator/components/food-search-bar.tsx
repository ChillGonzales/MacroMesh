import React from "react";
import { FoodService, SearchResult } from "../services/food-service";


class FoodSearchBar extends React.Component<IFoodSearchProps, IState> {
  private searchService: FoodService;
  private lastTyped: number = 0;

  constructor(props: any) {
    super(props);

    this.onSearchChange = this.onSearchChange.bind(this);
    this.searchService = new FoodService();
    this.state = { searchResults: [], selected: { name: "", id: "", possibleUnits: [] } };
  }

  private async onSearchTimeout(text: string): Promise<void> {
    // Only search when typing has stopped for 900 ms
    if ((Date.now() - this.lastTyped) < 1000) {
      return;
    }

    let foods: SearchResult[] = [];
    // Don't search for tiny strings
    if (text.length > 2) {
      foods = await this.searchService.searchFood(text);
      console.log(foods);
      this.setState({ searchResults: foods });
    }

    // Don't trigger a search if our input is already in the result list.
    const selected = foods.find(x => x.name.toUpperCase() === text.toUpperCase());
    if (selected) {
      this.setState({ selected });
      this.props.onSelectionChanged(selected);
      return;
    }
  }

  private async onSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    // TODO: Fix this, this logic is buggy
    this.lastTyped = Date.now();
    const text = event.target.value;

    console.log(text);
    setTimeout(() => this.onSearchTimeout(text), 1000);
  }

  private getFoods: () => JSX.Element[] = () => {
    const elems = this.state.searchResults.map(x => {
      return (
        <option key={x.id} value={x.name} />
      );
    });
    return elems;
  };

  public render(): JSX.Element {
    return (
      <div className="card card-body">
        <div className="row pt-2">
          <div className="col-lg-5 col-sm-12">
            <input className="form-control" list={"foods" + this.props.id} type="text" onInput={this.onSearchChange} placeholder="Enter name of food" />
            <datalist id={"foods" + this.props.id}>
              {this.getFoods()}
            </datalist>
          </div>
          <div className="col-lg-1 col-sm-12">
            <p>or</p>
          </div>
          <div className="col-lg-3 col-sm-12">
            <button type="button" className="btn btn-secondary">Create a Food</button>
            <button type="button" className="btn btn-danger" onClick={this.props.onSelectionCleared}>Remove</button>
          </div>
        </div>
      </div>
    );
  }
}

export interface IFoodSearchProps {
  id: number;
  onSelectionChanged(selected: SearchResult): void;
  onSelectionCleared(): void;
}
interface IState {
  searchResults: SearchResult[];
  selected: SearchResult;
}
export default FoodSearchBar;