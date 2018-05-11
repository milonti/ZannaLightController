import React, {Component} from 'react';
import "./colorWheel.css";

class ColorWheel extends Component {
  constructor(props){
    super(props);
    this.previewBox = React.createRef();
    this.canvas = React.createRef();
    this.getColorByClick = this.getColorByClick.bind(this);
    this.state = {
      color: [255,255,255],
    }
  }
  componentDidMount(){
    this.ctx = this.canvas.current.getContext('2d');
    var CX = this.canvas.current.width / 2,
        CY = this.canvas.current.height / 2,
        sx = CX-10,
        sy = CY-10;

    this.ctx.beginPath();
    this.ctx.arc(CX,CY,sx+2,0,2*Math.PI);
    this.ctx.fill();
    for (var i = 0; i < 360; i += 0.1) {
        var rad = i * (2 * Math.PI) / 360;
        var grad = this.ctx.createLinearGradient(CX, CY, CX + sx * Math.cos(rad), CY + sy * Math.sin(rad));
        grad.addColorStop(0, "hsla(" + i + ", 0%, 100%, 1.0)");
        grad.addColorStop(0.25, "hsla(" + i + ", 100%, 87.5%, 1.0)");
        grad.addColorStop(0.5, "hsla(" + i + ", 100%, 75%, 1.0)");
        grad.addColorStop(0.90, "hsla(" + i + ", 100%, 50%, 1.0)");
        grad.addColorStop(0.95, "hsla(" + i + ", 100%, 50%, 1.0)");
        grad.addColorStop(1, "hsla(" + i + ", 100%, 0%, 1.0)");
        this.ctx.strokeStyle = grad;
        this.ctx.beginPath();
        this.ctx.moveTo(CX, CY);
        this.ctx.lineTo(CX + sx * Math.cos(rad), CY + sy * Math.sin(rad));
        this.ctx.stroke();
    }
  }
  static getDerivedStateFromProps(nextProps, prevState){
    return {color: nextProps.color};
  }
  getColorByClick(ev){
    let pix = this.ctx.getImageData(ev.nativeEvent.offsetX,ev.nativeEvent.offsetY,1,1).data;
    console.log(pix[0],pix[1],pix[2]);
    this.setState({color: pix});
    // sendColor(pix,'Click');
  }
  render(){
    let r,g,b;
    r = this.state.color[0];
    g = this.state.color[1];
    b = this.state.color[2];
    let preStyle = {
      backgroundColor : 'rgb(' + r + ',' + g + ',' + b + ')'
    }
    return (
      <div className="colorWheelContainer">
        <div ref={this.previewBox} className="previewBox" style={preStyle} ></div>
        <canvas ref={this.canvas} className="colorWheel" onClick={this.getColorByClick}
          width='300' height='300' style={preStyle}></canvas>
      </div>
    )
  }
}

export default ColorWheel;
