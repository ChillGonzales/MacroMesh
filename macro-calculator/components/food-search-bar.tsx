import React from "react";
import { FoodService } from "../services/food-service";


class FoodSearchBar extends React.Component {
  private searchService: FoodService;

  constructor(props: any) {
    super(props);

    this.onSearchChange = this.onSearchChange.bind(this);
    this.searchService = new FoodService();
  }

  private async onSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const text = event.target.value;
    console.log(text);
    if (text.length > 2) {
      const foods = await this.searchService.SearchFood(text);
      console.log(foods);
    }
  }

  public render(): JSX.Element {
    return (
      <div className="card card-body">
        <div className="row pt-2">
          <div className="col-lg-5 col-sm-12">
            <input className="form-control" type="text" onChange={this.onSearchChange} placeholder="Enter name of food" />
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

export default FoodSearchBar;