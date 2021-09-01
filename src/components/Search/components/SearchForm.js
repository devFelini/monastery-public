import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {searchPosts} from 'actions/posts'

class SearchForm extends Component {
  constructor(props, context) {
    super(props, context)
    
    this.validateSearchField = this.validateSearchField.bind(this)
    this.setQuery = this.setQuery.bind(this)

    this.state = {
      query: '',
      status: '',
    }
  }

  setQuery(input) {
    this.setState({
      query: input.target.value,
      status: ''
    })
    
  }

  validateSearchField() {
    if(this.state.query != '') {
      this.props.searchPosts(this.state.query) 
    } else {
      this.setState({
        status: 'error'
      })
    }
  }

  componentDidMount() {
    // this.setState({
    //   query: this.props.query
    // })
  }

  render() {
    return (
      <div className={"search__form "+this.state.status}>
        <input type="text" className="search__field" placeholder="Введите запрос..." value={this.state.query} onChange={(e) => this.setQuery(e)}/>
        <button className="search__btn" onClick={() => this.validateSearchField()}></button> 
      </div>
    )
  }
}

function mapStateToProp(state) {
  return {
    query: state.app.search_query
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    searchPosts : searchPosts
  }, dispatch)
}

export default connect(mapStateToProp, matchDispatchToProps) (SearchForm);
