import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {clearSearchQuery} from 'actions/app'

import SearchForm    from './components/SearchForm'
import SearchResults from './components/SearchResults'

import Post from 'components/Post'

class Search extends Component {
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
    this.props.clearSearchQuery()
  }

  render() {
    return (
      <>
        <div className="search">
          <SearchForm />
          <div className="search__result">
            <SearchResults />
          </div>
        </div>
        {this.displayPostDetail()}
      </>
    )
  }
}

function mapStateToProp(state) {
  return {
    app: state.app
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    clearSearchQuery: clearSearchQuery
  }, dispatch)
}

export default connect(mapStateToProp, matchDispatchToProps)(Search);