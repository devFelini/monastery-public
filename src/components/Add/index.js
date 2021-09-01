import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {loadMedia} from 'actions/media'
import {changePage} from 'actions/app'

import AddText    from './components/AddText';
import AddMedia   from './components/AddMedia';
import AddPreview from './components/AddPreview';
import AddDate    from './components/AddDate';
import AddTime    from './components/AddTime';
import AddSocials from './components/AddSocials';

class Add extends Component {
  constructor(props, context) {
    super(props, context)
    
    this.changePostText    = this.changePostText.bind(this)
    this.changePostDesc    = this.changePostDesc.bind(this)
    this.changePostMedia   = this.changePostMedia.bind(this)
    this.changePostPreview = this.changePostPreview.bind(this)
    this.changePostDate    = this.changePostDate.bind(this)

    this.changeStep        = this.changeStep.bind(this)
    this.renderStep        = this.renderStep.bind(this)
    this.renderButton      = this.renderButton.bind(this)
    
    this.state = {
      step: 1,
      steps: ['text', 'media', 'preview', 'date', 'time', 'socials'],
      post: {
        text: '',
        desc: '',
        desc_custom: false,
        media: [],
        preview: 0,
        preview_custom: false,
        date: false,
        time: false,
      }
    }
  }

  changePostText(value = '') {
    let new_post = {}
    Object.assign(new_post, this.state.post)

    new_post.text = value

    if(!new_post.desc_custom) {
      new_post.desc = value.substr(0, 150)
      if(value.length > 150) {
        new_post.desc += '...'
      }
    }

    this.setState({
      post: new_post
    })
  }

  changePostDesc(value) {
    let new_post = {}
    Object.assign(new_post, this.state.post)

    new_post.desc = value
    new_post.desc_custom = true

    this.setState({
      post: new_post,
    })
  }

  changePostMedia(value = []) {
    let new_post = {}
    Object.assign(new_post, this.state.post)

    new_post.media = value

    new_post.preview = 0

    if(value.length > 0 && !this.state.preview_custom) {
      new_post.preview = value[0].id
    }

    this.setState({
      post: new_post
    })
  }

  changePostPreview(value) {
    let new_post = {}
    Object.assign(new_post, this.state.post)

    new_post.preview = value
    new_post.preview_custom = true

    this.setState({
      post: new_post,
    })
  }

  changePostDate(value) {
    let new_post = {}
    Object.assign(new_post, this.state.post)

    new_post.date = new Date(value)

    this.setState({
      post: new_post,
    })
  }

  changeStep(subpage) {
    this.props.changePage(['add', this.props.page_data.subpages[subpage].slug])
  }

  renderStep() {
    switch(this.props.app.active_page[1]) {
      case "text":
        return (
          <AddText text={this.state.post.text} changePostText={this.changePostText} />
        )
        break;
      case "media":
        return (
          <AddMedia media={this.state.post.media} changePostMedia={this.changePostMedia} />
        )
        break;
      case "preview":
        return (
          <AddPreview media={this.state.post.media} preview={this.state.post.preview} desc={this.state.post.desc} changePostPreview={this.changePostPreview} changePostDesc={this.changePostDesc} />
        )
        break;
      case "date":
        return (
          <AddDate date={this.state.post.date} changePostDate={this.changePostDate} />
        ) 
        break;
      case "time":
        return (
          <AddTime date={this.state.post.date} changePostDate={this.changePostDate} />
        )
        break;
      case "socials":
        return (
          <AddSocials />
        )
        break;
    }
  }

  renderButton() {
    if(this.props.next_subpage) {
      return (
        <button className="btn-action btn-action_next" onClick={() => this.changeStep(this.props.next_subpage)}></button>
      )
    }
  }

  componentDidMount() {
    this.props.loadMedia(true);
  }

  render() {
    return (
      <>
        <div className="add__inner">
          <div className="add__list">
            {this.renderStep()}
          </div>
        </div>
        {this.renderButton()}
      </>
    )
  }
}

function mapStateToProp(state) {
  let page_data    = state.app.pages.find(elem => elem.slug == 'add'),
      curr_subpage = page_data.subpages.findIndex(elem => elem.slug == state.app.active_page[1]),
      next_subpage = false

  if(curr_subpage < page_data.subpages.length - 1) {
    next_subpage = curr_subpage + 1
  }

  return {
    page_data    : page_data,
    next_subpage : next_subpage,
    app          : state.app
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    loadMedia  : loadMedia,
    changePage : changePage
  }, dispatch)
}

export default connect(mapStateToProp, matchDispatchToProps)(Add);