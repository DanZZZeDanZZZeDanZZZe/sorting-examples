import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";
class App extends React.Component {   
    constructor(props) {
        super(props)
    }
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
                <SortContainer length={30}/>
            </div>
        );
    }
}
class SortContainer extends React.Component {
    constructor(props) {
        super(props);
        this.length = props.length; 
        this.state = {
            columns: this.columns(this.length)
        }
    }
    columns(length) {
        let arr = Array(length).fill(null);
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
        this.setState({
            columns: columns
        });
    }
    render () {
        return (
            <div className="sortContainer">
                {this.state.columns}
            </div>
        );
    }
}
ReactDOM.render(
    <App/>,
    document.getElementById("root"));
