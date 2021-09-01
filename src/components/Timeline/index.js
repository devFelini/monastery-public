import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {loadPosts, openPost} from 'actions/posts'
import {changePage} from 'actions/app'

import TimelineItem from './components/TimelineItem'
import Post from 'components/Post'

class Timeline extends Component {
  constructor(props, context) {
    super(props, context)

    this.displayPostDetail = this.displayPostDetail.bind(this)
  }

  displayPostDetail() {
    if(this.props.app.active_page[1] == 'post') {
      return (
        <Post />
      )
    }
  }

  componentDidMount() {
    this.props.loadPosts()
  }

  render() {
    return (
      <>
        <div className="timeline">
          <div className="timeline__list">
            {this.props.posts.map((post, i) => { 
              return (
                <TimelineItem key={post.id} data={post} />
              )
            })}
          </div>
        </div>
        <button className="btn-action btn-action_add" onClick={(e) => this.props.changePage(['add', 'text'])}></button> 
        {this.displayPostDetail()}
      </>
    )
  }
}

function mapStateToProp(state) {
  return {
    app   : state.app,
    posts : state.posts
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    loadPosts: loadPosts,
    changePage: changePage,
    openPost: openPost
  }, dispatch)
}

export default connect(mapStateToProp, matchDispatchToProps)(Timeline);