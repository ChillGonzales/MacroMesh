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
      </main>
    </div>
  );
}
