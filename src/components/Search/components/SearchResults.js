import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import SearchItem    from './SearchItem'

class SearchResults extends Component {
  constructor(props, context) {
    super(props, context)

    this.displayResult = this.displayResult.bind(this)
  }

  displayResult() {
    if(this.props.app.loading == 'search') {
      return (
        <div className="loading"></div>
      )
    } else if(this.props.app.search_query == '') {
      return (
        <div className="search__result__notification">Введите запрос для начала поиска.</div>
      )
    } else if(this.props.posts.length == 0) {
      return (
        <div className="search__result__notification">По вашему запросу ничего не найдено (</div>
      )
    } else {
      return (
        <>
          <div className="search__result__info">Найдено <span>{this.props.posts.length} записей</span></div>
          <div className="search__result__list">
            {this.props.posts.map((post, i) => { 
              return (
                <SearchItem key={post.id} data={post} />
              )
            })}
          </div>
        </>
      )
    }
  }

  render() {
    return (
      <div className="search__result">
        {this.displayResult()}
      </div>
    )
  }
}

function mapStateToProp(state) {
  return {
    app: state.app,
    posts: state.posts
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProp, matchDispatchToProps)(SearchResults);