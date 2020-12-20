import React from 'react';

class FoodSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="foodSection" className="d-none row">
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
          <div className="row py-3">
            <div className="col">
              <button id="addFoodBtn" type="button" className="btn btn-outline-secondary btn-sm btn-block">Add Another
                    Food</button>
            </div>
          </div>
          <div className="row pt-3">
            <div className="col">
              <button id="servingsBtn" type="button" className="btn btn-success">Calculate Servings</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FoodSelector;