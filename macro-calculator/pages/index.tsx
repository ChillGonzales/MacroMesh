import Head from 'next/head'
import HeadComponent from '../components/head-component';
import styles from '../styles/Home.module.css'
import MacroInput from '../components/macro-input'
import FoodSelector from '../components/food-selector';

export default function Home() {
  return (
    <div className="container my-3">
      <HeadComponent />
      <main>
        <MacroInput />
        <FoodSelector />
        <div id="resultsSection" className="d-none row">
          <div className="col">
            <hr />
            <div className="row">
              <div className="col">
                <h5>Daily Servings</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <div className="modal fade" id="requestFeatureModal" tabIndex={-1} role="dialog"
          aria-labelledby="requestFeatureModalLabel" aria-hidden="true">
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
      </main>
    </div>
  );
}
