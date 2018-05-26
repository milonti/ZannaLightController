import React, {Component} from 'react';
import './colorPickContainer.css'

class ColorSliders extends Component {
  constructor(props){
    super(props);
    this.state = {
      color: this.props.color;
    }
  }
  render() {

    return (
      <div>
        <label>R:</label>
        <input type="text" id="rVal" maxlength="3" size="3" class="smallText" value={this.state.color[0]} />
        <input type="range" min="0" max="255" step="1" value={this.state.color[0]} id="rSlide" /><br />
        <label>G:</label>
        <input type="text" id="gVal" maxlength="3" size="3" class="smallText" value={this.state.color[1]} />
        <input type="range" min="0" max="255" step="1" value={this.state.color[1]} id="gSlide" /><br />
        <label>B:</label>
        <input type="text" id="bVal" maxlength="3" size="3" class="smallText" value={this.state.color[2]} />
        <input type="range" min="0" max="255" step="1" value={this.state.color[2]} id="bSlide" />
      </div>
    )
  }
}
ColorSliders.defaultProps = {
  color: [255,255,255],
}

export default ColorSliders;
