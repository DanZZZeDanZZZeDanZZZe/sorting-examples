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
        this.state = {
            history: [{
                columns: this.columns()
            }],
            stepNumber: 0
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
                </div>
            });
    }
    setColumns(columns) {
        const history = this.state.history.slice();
        this.setState({
            history: history.concat([{
                columns: columns,
            }]),
            stepNumber: history.length,
        });
    }
    componentDidMount() {
        this.timerId = setInterval(() => {
            let arr = this.shuffle(this.state.history[this.state.stepNumber].columns);
            this.setColumns(arr);
            console.log(this.state);
        }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    render () {
        return (
            <div className="sortContainer">
                {this.state.history[this.state.stepNumber].columns}
            </div>
        );
    }
}
ReactDOM.render(
    <App/>,
    document.getElementById("root"));
