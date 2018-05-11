import React, {Component} from 'react';
import ColorWheel from '../components/colorWheel.jsx';
import './colorPickContainer.css'

//This class holds all of the color picker controls
//as well as the color from said controls in its state
class cntr_ColorPicker extends Component {
  constructor(props){
    super(props);
    this.state = {
      color: [255,255,255],
    }
  }
  render(){
    return (
      <div className="container">
        <ColorWheel color={this.state.color} />
      </div>
    )
  }
}

export default cntr_ColorPicker;
