import React, {Component} from 'react'

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class PostMedia extends Component {
  constructor(props, context) {
    super(props, context)

    this.openPopup = this.openPopup.bind(this)
    this.changePopupImg = this.changePopupImg.bind(this)

    this.state = {
      popup_open : false,
      popup_img  : 0,
    }
  }

  openPopup(id) {
    let img_index = this.props.media.findIndex(elem => elem.id == id)

    this.setState({
      popup_open: true,
      popup_img  : img_index,
    })
  }

  changePopupImg(img) {
    if(img !== false) {
      this.setState({
        popup_img  : img,
      })
    }
  }

  renderPopup() {
    if(this.state.popup_open) {
      let next = this.props.media.length - 1,
          prev = 0

      if(this.state.popup_img > 0) {
        next = this.state.popup_img - 1
      } 

      if(this.state.popup_img < this.props.media.length - 1) {
        prev = this.state.popup_img + 1
      }

      let next_url = this.props.media[next].url,
          prev_url = this.props.media[prev].url

      return(
        <Lightbox
            mainSrc={this.props.media[this.state.popup_img].url}
            nextSrc={next_url}
            prevSrc={prev_url}

            onCloseRequest={() => this.setState({popup_open: false })}

            onMovePrevRequest={() => this.changePopupImg(next)}
            onMoveNextRequest={() => this.changePopupImg(prev)}
        />
      )
    }
  }

  render() {
    return (
      <div className="post__media">
        <div className="post__media__title"><span>Медиа файлы</span><span>({this.props.media.length})</span></div>
        <div className="media__list">
          {this.props.media.map(function(elem) {
            return (
              <button key={elem.id} className="media__item" onClick={() => this.openPopup(elem.id)}>
                <img src={elem.url} />
              </button>
            )
          }.bind(this))}
        </div>
        {this.renderPopup()}
      </div>
    )
  }
}

export default PostMedia;