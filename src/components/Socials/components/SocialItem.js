import React, {Component} from 'react'

class SocialItem extends Component {
  constructor(props, context) {
    super(props, context)
  }
  render() {
    return (
      <div className="socials__item">
        <div className={"socials__logo socials__logo_"+this.props.data.type}></div>
        <div className="socials__info">
          <div className="socials__title">{this.props.data.title}</div>
          <div className="socials__link">{this.props.data.link}</div>
        </div>
        <a href={this.props.data.link} target="_blank" className="socials__btn"></a>
      </div>
    )
  }
}



export default SocialItem;