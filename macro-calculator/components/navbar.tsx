import React from 'react';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="https://twitter.com/monroethedev" target="_blank"><span
                className="fab fa-twitter"></span> Follow</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://github.com/ChillGonzales/MacroMesh" target="_blank"><span
                className="fab fa-github"></span> Contribute</a>
            </li>
          </ul>
        </div>
        <div className="mx-auto order-0">
          <a className="navbar-brand mx-auto" href="#">Macro Mesh</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#" data-toggle="modal" data-target="#requestFeatureModal">Request a Feature</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Navbar;