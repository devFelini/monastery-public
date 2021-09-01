import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {openPost} from 'actions/posts'

import {getMonthLabel} from 'functions'

class SearchItem extends Component {
  constructor(props, context) {
    super(props, context)
    
    this.displayVideoIcon = this.displayVideoIcon.bind(this)
  }

  displayVideoIcon() {
    if(this.props.data.post_type == 'video') {
      return (
        <div className="timeline__item__video"></div>
      )
    }
  }

  render() {
    let date = new Date(this.props.data.date)
    let date_label = date.getDate() +' '+ getMonthLabel(date.getMonth(), 2) +' '+ date.getFullYear()

    return (
      <div className="search__result__item">   
        <div className="timeline__item__inner post-item" onClick={() => this.props.openPost('search', this.props.data.id)}>
          <div className="timeline__item__image post-item__image">
            <img src={this.props.data.picture.link}/> 
          </div>
          {this.displayVideoIcon()}
          <div className="timeline__item__info post-item__info">
            <div className="timeline__item__datetime post-item__datetime">{date_label}</div>
            <div className="timeline__item__desc post-item__datetime" dangerouslySetInnerHTML={{__html: this.props.data.search}}></div>
          </div>
        </div> 
      </div>
    )
  }
}

function mapStateToProp(state) {
  return {}
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    openPost: openPost
  }, dispatch)
}

export default connect(mapStateToProp, matchDispatchToProps)(SearchItem);