import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";
class App extends React.Component {
    render () {
        return (
            <main>
                <div className="selectionMenu"></div>
                <Container/>
            </main>
        );
    }
}  
class Container extends React.Component {
    render () {
        return (
            <div className="container">
                <SortContainer length={20}/>
            </div>
        );
    }
}
class SortContainer extends React.Component {
    constructor(props) {
        super(props);
        this.length = props.length; 
    }
    renderColumns(length) {
        let arr = Array(length).fill(null);
        return arr.map((item, index) => 
            {
                const divStyle = {
                    height: "50%",
                }
                return <div className="column" style={divStyle} key={"column" + index}></div>
            });
    }
    render () {
        return (
            <div className="sortContainer">
                {this.renderColumns(this.length)}
            </div>
        );
    }
}
ReactDOM.render(
    <App/>,
    document.getElementById("root"));
