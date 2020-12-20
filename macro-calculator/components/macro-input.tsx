import React from 'react';

class MacroInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
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
              <input type="number" className="form-control" id="carbs" placeholder="Enter carbs (g)" />
            </div>
            <div className="col-lg-3 col-sm-12">
              <label htmlFor="fat">Fat (g)</label>
              <input type="number" className="form-control" id="fat" placeholder="Enter fat (g)" />
            </div>
            <div className="col-lg-3 col-sm-12">
              <label htmlFor="protein">Protein (g)</label>
              <input type="number" className="form-control" id="protein" placeholder="Enter protein (g)" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-12">
              <p className="lead" id="calculatedCals">Total Calories: </p>
            </div>
          </div>
          <div className="form-group row">
            <div className="col">
              <button id="calculateBtn" type="submit" className="btn btn-primary">Calculate Calories</button>
              <i data-toggle="tooltip" data-html="true" data-trigger="hover" data-placement="bottom"
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