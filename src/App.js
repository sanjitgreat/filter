import React, { Component } from 'react';
import './App.css';
import Filters from './components/Filters'

const cards =[
{name:'Sanjit', type:'male'},
{name:'Sushil', type:'male'},
{name:'Sachin', type:'male'},
{name:'Rachana', type:'female'},
{name:'Sneha', type:'female'},
{name:'Sakshi', type:'female'}
]

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {filter: 'all'}
  }

  onFilter = (str) => {
    this.setState({filter: str})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Filter</h1>
        </header>
        <Filters data={cards} filter={'type'} onFilter={this.onFilter} />
      </div>
    );
  }
}

export default App;
