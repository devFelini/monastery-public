import {getMonthLabel} from 'functions'

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {openPost} from 'actions/posts'

import PostMedia from './components/PostMedia'


class Post extends Component {
  constructor(props, context) {
    super(props, context)

    this.showMediaBlock = this.showMediaBlock.bind(this)
    this.showPostContent = this.showPostContent.bind(this)
  }

  showMediaBlock() {
    if(this.props.data.media && this.props.data.media.length > 0) {
      return (
        <PostMedia media={this.props.data.media} />
      )
    }
  }

  showPostContent() {
    if(this.props.app.loading) {
      return (
        <div className="loading"></div>
      )
    } else {
      let date = new Date(this.props.data.date)
      let date_label = date.getDate() +' '+ getMonthLabel(date.getMonth(), 2) +' '+ date.getFullYear()

      return (
        <>
          <div className="post__head">
            <img src={this.props.data.picture.link}/>   
          </div>
          <div className="post__meta">
            <div className="post__date">{date_label}</div>
            <div className="post__like">{this.props.data.like}</div>
          </div>
          <div className="post__text">
            {this.props.data.text}
          </div>
          {this.showMediaBlock()}
          <div className="post__bottom">
            <button className="post__next" onClick={() => this.props.openPost(this.props.app.active_page[0], this.props.data.siblings.prev)}>Следующая запись</button>
          </div>
        </>
      )
    }
  }

  render() {
    let action_btn = ''
    if(!this.props.app.loading) {
      action_btn = <button className="btn-action btn-action_edit"></button> 
    }
    return (
      <>
        <div className="post">
          {this.showPostContent()}
        </div>
        {action_btn}
      </>
    )
  }
}

function mapStateToProp(state) {
  let post = {}
  let posts = state.posts

  if(!posts) {posts = []}

  post = posts.find(post => post.id == state.app.active_post)

  if(!post) { post = {}}
  return {
    app: state.app,
    data: post,
    posts: state.posts
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    openPost: openPost
  }, dispatch)
}

export default connect(mapStateToProp, matchDispatchToProps)(Post);