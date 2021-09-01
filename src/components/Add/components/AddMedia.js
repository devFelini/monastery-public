import React, {Component} from 'react'
import {GridContextProvider, GridDropZone, GridItem, swap} from "react-grid-dnd"

import $ from 'jquery'

import Media from 'components/Media'


class AddMedia extends Component {
  constructor(props, context) {
    super(props, context)

    this.renderPopupMedia = this.renderPopupMedia.bind(this)
    this.renderBasket     = this.renderBasket.bind(this)
    this.openMediaPopup   = this.openMediaPopup.bind(this)
    this.closeMediaPopup  = this.closeMediaPopup.bind(this)
    this.chooseImage      = this.chooseImage.bind(this)
    this.changeOrder      = this.changeOrder.bind(this)
    this.lisetnerDnd      = this.lisetnerDnd.bind(this)

    this.state = {
      popup_open: false,
      popup_media_num: 0,
    }
  }

  openMediaPopup(media_num) {
    this.setState({
      popup_open: true,
      popup_media_num: media_num
    })
  }

  closeMediaPopup() {
    this.setState({
      popup_open: false
    })
  }

  chooseImage(value) {
    let media = this.props.media.slice()

    media[this.state.popup_media_num] = value

    this.setState({
      popup_open: false,
      popup_media_num: 0
    })

    this.props.changePostMedia(media)
  }

  changeOrder(sourceId, sourceIndex, targetIndex, targetId) {
    if(sourceIndex < this.props.media.length) {
      
      let media = this.props.media.slice()
      let removed = media.splice(sourceIndex, 1)
      
      if( targetId !== 'remove') {
        media.splice(targetIndex, 0, removed[0])
      }

      this.props.changePostMedia(media)
    }
  }
  
  renderPopupMedia() {
    if(this.state.popup_open) {
      return (
        <Media selected={this.props.media} closeMediaPopup={this.closeMediaPopup} chooseImage={this.chooseImage}/>
      )
    }
  }

  renderBasket() {
    if(this.props.media.length > 0) {
      return (
        <GridDropZone className="add__media__basket"
          id="remove"
          boxesPerRow={2} rowHeight={($(window).width() - 16) / 2}
        > 
        </GridDropZone>
      )
    }
  }

  lisetnerDnd() {
    setInterval(function() {
      let active = false;
      $('.add__media__dnd').children('div').each(function(i, elem) {
        if(Number($(elem).css('z-index')) == 1) {
          active = true
          return false
        }
      })

      if(active) {
        $('.add__media__basket').addClass('active')
      } else {
        $('.add__media__basket').removeClass('active')
      }
    }.bind(this), 200)
  }

  componentDidMount() {
    this.lisetnerDnd()
	} 

	// componentWillUnmount() {
	// 	$(".media__popup__content").off('scroll', this.lisetnerDnd);
	// }

	// componentDidUpdate(prevProps, prevState, snapshot) {
	// 	$(".media__popup__content").off('scroll', this.lisetnerDnd);
	// 	$(".media__popup__content").on('scroll', this.lisetnerDnd);
	// } 

  render() {
    let item_height = ($(window).width() - 16) / 2,
        wrap_height = item_height * Math.ceil((this.props.media.length + 1) / 2)
    return (
      <>
        <div className="add__item">
          <div className="add__media">
              <GridContextProvider onChange={this.changeOrder} onTraverse={this.itemChange} >
                {this.renderBasket()}
                <GridDropZone id="items" className="add__media__dnd" boxesPerRow={2} rowHeight={item_height} style={{ height: wrap_height+"px" }}>
                  {this.props.media.map((item, i) => (
                    <GridItem key={item.id} >
                      <div className="media__item__inner">
                        <div className="media__item"><img src={item.url} /></div>
                      </div>
                    </GridItem>
                  ))}
                    <GridItem>
                      <div className="media__item__inner">
                        <button className="media__item" onClick={() => this.openMediaPopup(this.props.media.length)}></button>
                      </div>
                    </GridItem>
                </GridDropZone>
              </GridContextProvider>
            </div>
        </div>
        {this.renderPopupMedia()}
      </>
    )
  }
}

export default AddMedia;