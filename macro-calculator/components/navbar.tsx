import React from 'react';

class Navbar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      menu: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  private toggleMenu(): void {
    this.setState((state) => {
      const newShow = !state.menu;
      this.show = newShow ? " show" : "";
      return {
        menu: newShow
      };
    });
  }

  private show = "";

  public render(): JSX.Element {
    return (
      <>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className={"navbar-collapse collapse w-100 order-1 order-md-0 " + this.show}>
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
            <button className="navbar-toggler" type="button" onClick={this.toggleMenu}>
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className={"navbar-collapse collapse w-100 order-3 " + this.show}>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#" data-toggle="modal" data-target="#requestFeatureModal">Request a Feature</a>
              </li>
            </ul>
          </div>
        </nav>
        {/* Modal */}
        {/* TODO: Need to figure out how to do modals in react. */}
        <div className="modal fade" id="requestFeatureModal" tabIndex={-1} role="dialog" aria-labelledby="requestFeatureModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="requestFeatureModalLabel">Requesting a Feature</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>To request a new feature, please use the chat button in the bottom right corner of your screen. This allows
                      you to send a message directly to me, the developer!</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Navbar;

interface IProps { }
interface IState {
  menu?: boolean;
}