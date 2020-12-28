import React from "react";
import { FoodService, SearchResult } from "../services/food-service";


class FoodSearchBar extends React.Component<IFoodSearchProps, IState> {
  private searchService: FoodService;

  constructor(props: any) {
    super(props);

    this.onSearchChange = this.onSearchChange.bind(this);
    this.searchService = new FoodService();
    this.state = { searchResults: [], selected: "" };
  }

  private async onSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    // TODO: Add debounce
    const text = event.target.value;
    console.log(text);
    if (this.state.searchResults.some(x => x.name.toUpperCase() === text.toUpperCase())) {
      // Don't trigger a search if our input is already in the result list.
      return;
    }
    if (text.length > 2) {
      const foods = await this.searchService.SearchFood(text);
      console.log(foods);
      this.setState({ searchResults: foods });
    }
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
            <button type="button" className="btn btn-danger">Remove</button>
          </div>
        </div>
      </div>
    );
  }
}

export interface IFoodSearchProps {
  id: number;
}
interface IState {
  searchResults: SearchResult[];
  selected: string;
}
export default FoodSearchBar;