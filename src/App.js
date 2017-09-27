import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: '',
            grade: '',
            filteredGradeData: '',
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

    handleGradeChange(e){
        const newGradeData = this.state.data.filter((item) => {
            console.log("item: ", item);
            switch(e.target.value){
                case "A":
                    console.log("A");
                    if(item.score <= 100 && item.score >= 90)
                        return item;
                    break;
                case "B":
                    console.log("B");
                    if(item.score <= 89 && item.score >= 80)
                        return item;
                    break;
                case "C":
                    console.log("C");
                    if(item.score <= 79 && item.score >= 70)
                        return item;
                    break;
                case "lessC":
                    console.log("Less than C");
                    if(item.score < 70)
                        return item;
                    break;
                default:
                    console.log("DO NOTHING");
                    break;
            }
        });
        this.setState({
            grade: e.target.value,
            filteredGradeData: newGradeData
        })
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Restaurant Grades</h2>
                </div>
                <label>Grade</label>
                <select
                    name="grade"
                    id=""
                    value={this.state.grade}
                    onChange={(e) => this.handleGradeChange(e)}
                >
                    <option value=""></option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="lessC">less than C</option>
                </select>
                 <p className="App-intro">
                    {JSON.stringify(this.state.filteredGradeData)}
                </p>
            </div>
            );
        }
    }

export default App;
