import React, { Component } from 'react';
import styles from './ColorPickWheel.css';

export default class ColorPickWheel extends Component {
  constructor(props) {
    super(props);
    this.wheelCanvas = React.createRef();
  }
  componentWillMount() {
    let CX = this.wheelCanvas.width / 2,
        CY = this.wheelCanvas.height / 2,
        sx = CX-10,
        sy = CY-10;

    ctx.beginPath();
    ctx.arc(CX,CY,sx+2,0,2*Math.PI);
    ctx.fill();
    for (var i = 0; i < 360; i += 0.1) {
        var rad = i * (2 * Math.PI) / 360;
        var grad = ctx.createLinearGradient(CX, CY, CX + sx * Math.cos(rad), CY + sy * Math.sin(rad));
        grad.addColorStop(0, "hsla(" + i + ", 0%, 100%, 1.0)");
        grad.addColorStop(0.25, "hsla(" + i + ", 100%, 87.5%, 1.0)");
        grad.addColorStop(0.5, "hsla(" + i + ", 100%, 75%, 1.0)");
        grad.addColorStop(0.90, "hsla(" + i + ", 100%, 50%, 1.0)");
        grad.addColorStop(0.95, "hsla(" + i + ", 100%, 50%, 1.0)");
        grad.addColorStop(1, "hsla(" + i + ", 100%, 0%, 1.0)");
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(CX, CY);
        ctx.lineTo(CX + sx * Math.cos(rad), CY + sy * Math.sin(rad));
        ctx.stroke();
    }
  }
  render() {
    return <canvas ref={this.wheelCanvas} className={styles.colorwheel} onClick="getColorByClick(event);" />;
  }
}
