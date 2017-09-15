import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: ''
        };
    }

    getResturantGradeData(){
        axios.get('https://data.austintexas.gov/resource/nguv-n54k.json').then((res) => {
            console.log(res);
            this.setState({
                data: res.data
            });
        }).catch(error => {
            console.log(error.response);
        });
    }

    componentWillMount(){
        this.getResturantGradeData();
    }

    render() {
        return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Restaurant Grades</h2>
            </div>
            <p className="App-intro">
                {JSON.stringify(this.state.data)}
            </p>
        </div>
        );
        }
    }

export default App;
