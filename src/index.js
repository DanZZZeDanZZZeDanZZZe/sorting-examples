import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";
class App extends React.Component {   
    constructor(props) {
        super(props)
    }
    shuffle(arr) {
        let j, temp;
        for(let i = arr.length - 1; i > 0; i--){
            j = Math.floor(Math.random()*(i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }
    render () {
        return (
            <main>
                <div className="selectionMenu"></div>
                <Container shuffle={this.shuffle}/>
            </main>
        );
    }
}  
class Container extends React.Component {
    constructor(props) {
        super(props)
        this.shuffle = props.shuffle;
    }
    render () {
        return (
            <div className="container">
                <SortContainer length={30} shuffle={this.shuffle}/>
            </div>
        );
    }
}
class SortContainer extends React.Component {
    constructor(props) {
        super(props);
        this.shuffle = props.shuffle;
        this.length = props.length; 
        this.handleClick = this.handleClick.bind(this);
        /*this.setColumns = this.setColumns.bind(this);*/

        this.state = {
            history: [{
                columns: this.shuffle(this.columns())
            }],
            stepNumber: 0,
            palyback: true
        }
    }
    columns() {
        let arr = Array(this.length).fill(null);
        return arr.map((item, index) => 
            {
                const divStyle = {
                    
                }
                return <div 
                    className= {`column columnNum${index + 1}`} 
                    style={divStyle}
                    key={"column" + (index + 1)}
                > 
                {index+1}  
                </div>
            });
    }
    setColumns(columns) {
        const history = this.state.history.slice();
        const col = columns.slice();
      //  console.log(col);
        this.setState({
            history: history.concat([{
                columns: col,
            }]),
            stepNumber: history.length,
        });
    //    console.log(this.state.history);
    }
    bubbleSort(arr) {
        let y = true;
        for (let i = 0; i < arr.length - 1; i++) {
            let wasSwap = false;
            for (let j = 0; j < arr.length - 1; j++) {
                let [a, b] = [+arr[j].key.slice(6), +arr[j+1].key.slice(6)]
                if (a > b) {
                    [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                    if (y) {
                        console.log(y);
                        y = false;
                        let currentArr = arr;
                      /*  setTimeout(()=>{this.setColumns(currentArr)}, 1000);*/
                    }
                    wasSwap = true;
                }
            }
            if (!wasSwap) break;
        }
        return arr;
    }
/*    createTimer = () => {
        this.timerId = setInterval(() => {
            let arr = this.shuffle(this.state.history[this.state.stepNumber].columns);
            this.setColumns(arr);
            console.log(this.state.stepNumber);
        }, 1000)
    }*/
    componentDidMount() {
    //    console.log(this.state.history);
    }
  /*  componentWillUnmount() {
        clearInterval(this.timerID);
    }*/
/*handleClick() {
        const palyback = this.state.palyback;
        if (palyback) {
            clearInterval(this.timerId);
        } else {
            this.createTimer();
        }
        this.setState({
            palyback: !palyback
        })
    }*/
    handleClick() {
        let arr = this.state.history[this.state.stepNumber].columns.slice();
     //   console.log(arr);
        arr = this.bubbleSort(arr);
       /* arr = this.shuffle(this.state.history[this.state.stepNumber].columns);*/
        this.setColumns(arr);
    //    console.log(arr);
    }
    render () {
        return (
            <div className="sortContainer" onClick={this.handleClick}>
                {this.state.history[this.state.stepNumber].columns}
            </div>
        );
    }
}
ReactDOM.render(
    <App/>,
    document.getElementById("root"));
