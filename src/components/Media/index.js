import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {loadMedia} from 'actions/media'

import $ from 'jquery'
import app from 'reducers/app'

class Media extends Component {
  constructor(props, context) {
    super(props, context)

    this.renderMediaList = this.renderMediaList.bind(this)
    this.lisetnerScroll  = this.lisetnerScroll.bind(this)

  }

  lisetnerScroll() {
		if(!this.props.app.loading) {
			let list_block = $(document).find(".media__popup__content")
			let to_top = list_block.scrollTop()
			let inner_height = list_block.height()
			let list_height = $(document).find(".media__popup__list").height()

			if(to_top > list_height - (inner_height + 1)) {
        this.props.loadMedia(false, this.props.media.length);
			}
		}
	}
  

  renderMediaList() {
    let selected = this.props.selected.map(item => item.id)

    if(this.props.media.length > 0) {
      return (
        <div className="media__popup__list">
          {this.props.media.map(function(elem) {
            let selected_index = selected.findIndex((item) => item == elem.id)
            if(selected_index < 0) {
              return (
                <div key={elem.id} className="media__popup__item">
                  <button className="media__popup__image" onClick={() => this.props.chooseImage(elem)}>
                    <img src={elem.thumb} />
                  </button>
                </div>
              )
            } else {
              return (
                <div key={elem.id} className="media__popup__item selected">
                  <button className="media__popup__image">
                    <img src={elem.thumb} />
                    <div className="media__popup__sel-num">{selected_index+1}</div>
                  </button>
                </div>
              )
            }
          }.bind(this))}
        </div>
      )
    }
  }

  componentDidMount() {
		$(".media__popup__content").on('scroll', this.lisetnerScroll);
	} 

	componentWillUnmount() {
		$(".media__popup__content").off('scroll', this.lisetnerScroll);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		$(".media__popup__content").off('scroll', this.lisetnerScroll);
		$(".media__popup__content").on('scroll', this.lisetnerScroll);
	} 

  render() {
    return (
      <div className="media__popup">
        <div className="media__popup__inner">
          <div className="media__popup__head">
            <button className="media__popup__upload">Загрузить картинку</button>
            <button className="media__popup__close" onClick={() => this.props.closeMediaPopup()}><div></div></button>
          </div>
          <div className="media__popup__content">
            {this.renderMediaList()}
            <div className="media__popup__bottom">
              <div className="loading"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProp(state) {
  return {
    media : state.media,
    app   : state.app
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    loadMedia: loadMedia
  }, dispatch)
}

export default connect(mapStateToProp, matchDispatchToProps)(Media);