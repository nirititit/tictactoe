import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-flex/index.css';

class Cube extends React.Component{
    constructor(props){
      super(props);
      this.state ={order : props.order, row: props.row, col: props.col};
    }
    changeOrder(emptyCellPos,setOrderCallback){
        let cubePos = this.state;
        let direction = getDirection();

        if(direction){
            performSwitch.call(this);
        }

        function performSwitch(){
            let delta= cubePos[direction] - emptyCellPos[direction];
            cubePos[direction] -= delta;
            cubePos.order -=  direction==='row'?delta*this.props.size:delta;

            emptyCellPos[direction] += delta;
            emptyCellPos.order += direction==='row'?delta*this.props.size:delta;

            this.setState(cubePos);
            setOrderCallback(emptyCellPos);
        }

        function getDirection() {
            if(cubePos.row === emptyCellPos.row && Math.abs(cubePos.col - emptyCellPos.col) === 1){
                return 'col';

            }else if(cubePos.col === emptyCellPos.col && Math.abs(cubePos.row - emptyCellPos.row) === 1){
                return 'row';
            }
        }

    }
    myOrder(){
        return this.state.order;
    }
    render(){
        return(
            <button className='cube'  style={{order:this.myOrder(),flexBasis:this.props.flexSize}}
                    onClick={this.changeOrder.bind(this,this.props.emptyPos,this.props.setOrder)}>

            </button>
        );
    }
}


class Board extends React.Component {
    constructor(props) {
        super();
        this.state = {emptyPos: {order: props.size * props.size, row: props.size - 1, col: props.size - 1}};
    }

    setPosition(pos) {
        this.setState({emptyPos: pos});
    }
    render() {
        const flexSize = `${100 / this.props.size}%`;
        let cells = [];
        for (let i = 0; i < this.props.size; i++) {
            for (let j = 0; j < this.props.size - +(i === this.props.size - 1); j++) {
                cells.push(<Cube
                    order={i * this.props.size + j + 1}
                    row={i}
                    col={j}
                    setOrder={this.setPosition.bind(this)}
                    size={this.props.size}
                    flexSize={flexSize}
                    emptyPos={this.state.emptyPos}
                />);
            }
        }
        return <div className="board">
            <div className="empty" style={{order: this.state.emptyPos.order, flexBasis: flexSize}}></div>
            {cells} </div>;

    }
}
 ReactDOM.render(<Board size="10"/>, document.getElementById('root'));


/*class Board extends React.Component{
    constructor(props){
        super();
        let minDimension = Math.floor(Math.min(window.innerHeight,window.innerWidth)/50);
        this.state ={emptyPos :{order: minDimension*minDimension,row:minDimension-1,col:minDimension-1},size:minDimension};
    }

    updateDimensions(){
        let minDimension = Math.floor(Math.min(window.innerHeight,window.innerWidth)/50);
        this.setState({emptyPos :{order: minDimension*minDimension,row:minDimension-1,col:minDimension-1},size:minDimension});
    }
    componentWillMount() {
        this.updateDimensions();
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    setPosition(pos){
        this.setState({emptyPos: pos});
    }
    getPosition(){
        return this.state.emptyPos;
    }
    render(){
      //  const flexSize = `${100/this.state.emptyPos.order}%`;
        let cells = [];
        for(let i=0; i < this.state.size; i++) {
            for(let j=0 ;j<this.state.size - +(i==this.state.size-1);j++){
                cells.push(<Cube
                    order={i*this.state.size + j + 1}
                    row={i}
                    col={j}
                    getOrder={this.getPosition.bind(this)}
                    setOrder={this.setPosition.bind(this)}
                    size={this.state.size}
                  //  flexSize={flexSize}
                />);
            }
        }
        return <div className="board"><div className="empty" style={{order:this.state.emptyPos.order}}></div> {cells}
           </div>;

    }

}
ReactDOM.render(<Board />, document.getElementById('root'));*/







