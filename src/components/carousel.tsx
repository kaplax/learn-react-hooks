import React from 'react';


interface SilderState {
  activeIndex: number;
}

interface SilderProps {
  speed?: number;
  autoPlay: boolean;
}

export default class Silder extends React.Component<SilderProps, SilderState> {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    }
  }

  timer: any = null

  setIndex = (index: number) => {
    let children = React.Children.toArray(this.props.children);
    let ii = this.state.activeIndex + index;
    if (ii < 0) { // 如果已经是第一个则切换至末尾
      ii = index + children.length;
    }
    if (ii >= children.length) { // 如果是最后一个， 切换至第一个
      index = 0;
    }
    this.setState({ activeIndex: index });
  }

  // 开始轮播
  loop = () => {
    if (this.props.autoPlay) {
      this.timer = setInterval(() => {
        this.setIndex(1);
      }, this.props.speed || 100);
    }
  }

  // 暂停轮播
  pause = () => {
    clearInterval(this.timer);
  }

  render() {
    const state = this.state;
    let children = React.Children.toArray(this.props.children);
    return (
      <div onMouseOver={this.pause}>
        <div style={{
          width: children.length * 100 + '%',
          left: -100 * state.activeIndex + '%',
          transition: `left ${this.props.speed}s ease-out`,
        }}>
          {this.props.children}
        </div>
        <SliderDots onDotClick={this.setIndex} count={children.length} />
      </div>
    );
  }
}

interface SliderDotsProps {
  count: number;
  onDotClick: (index: number) => void;
}
class SliderDots extends React.Component<SliderDotsProps> {
  handleDotClick = (index: number) => {
   this.props.onDotClick(index);
  }

  render() {
    
    return (
      <div>
        {
          new Array(this.props.count).map(item => {
            return <span onClick={() => this.handleDotClick(item)} className="dot-item"></span>
          })
        }
      </div>
    );
  }
}