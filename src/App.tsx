import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Coin, getCoinData, MarketData } from './api';
import { AxisOptions, Chart } from "react-charts";
import PriceChart from './PriceChart';

type AppState = {
  coin?: Coin
}

class App extends React.Component<{}, AppState> {

  constructor(props: any) {
    super(props);

    this.state = {
      coin: undefined
    }
  }

  async componentDidMount() {
    var data = await getCoinData("bitcoin");
    this.setState({ coin: data })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        {this.state.coin != undefined && <PriceChart {...this.state.coin} />}
      </div>
    );
  }
}

export default App;
