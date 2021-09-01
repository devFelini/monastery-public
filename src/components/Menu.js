import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {changePage} from 'actions/app'

class Menu extends Component {
  constructor(props, context) {
    super(props, context)

    this.displayMenu = this.displayMenu.bind(this)
  }

  displayMenu() {
    let items = []


    if(this.props.app.menu) {
      let pages  = this.props.app.pages
      let active = this.props.app.active_page

      this.props.app.menu.map(function(elem) {
        let page = pages.find(page => page.slug == elem) 
        let elem_class = ''

        if(elem == active[0]) {
          elem_class = 'active'
        }

        items.push(<li key={elem}><button className={elem_class} onClick={() => this.props.changePage([elem])}>{page.title}</button></li>)
      }.bind(this))
    } 

    return items

  }

  render() {
    let menu_class = ''
    if(this.props.menu_state) {
      menu_class = 'active'
    }
    return (
      <div className={"menu "+menu_class}>
        <ul className="menu__nav">
          {this.displayMenu()}
        </ul>
      </div>
    )
  }
}

function mapStateToProp(state) {
  let page = {}
  let pages = state.app.pages

  if(!pages) {
    pages = []
  }

  page = pages.find(page => page.slug == state.app.active_page)

  if(!page) {
    page = {}
  }
  return {
    app  : state.app,
    page : page
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    changePage: changePage
  }, dispatch)
}

export default connect(mapStateToProp, matchDispatchToProps)(Menu);