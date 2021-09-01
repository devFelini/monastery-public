import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {toggleMenu, changePage} from 'actions/app'

class Header extends Component {
  constructor(props, context) {
    super(props, context)

    this.displayRightBtn = this.displayRightBtn.bind(this)
  }

  displayRightBtn() {
    let pages = this.props.app.active_page

    if(pages) {
      switch(pages[0]) {
        case 'timeline':
          if(pages[1] == 'list') {
            return (
              <button className="header__search-btn" onClick={() => this.props.changePage(['search', 'list'])}></button>
            )
          } else {
            return (
              <button className="header__back" onClick={() => this.props.changePage(['timeline', 'list'])}></button>
            )
          }
          break;
        case 'search': 
          if(pages[1] == 'post') {
            return (
              <button className="header__back" onClick={() => this.props.changePage(['search', 'list'])}></button>
            )
          } else {
            return (
              <button className="header__back" onClick={() => this.props.changePage(['timeline', 'list'])}></button>
            )
          }
          break;
        case 'add': 
          if(pages[1] == 'text') {
            return (
              <button className="header__close" onClick={() => this.props.changePage(['timeline', 'list'])}></button>
            )
          } else {
            let page_data  = this.props.app.pages.find(page => page.slug == 'add'),
                prev_index = page_data.subpages.findIndex(page => page.slug == pages[1]) - 1,
                prev_page  = page_data.subpages[prev_index].slug

            return (
              <button className="header__back" onClick={() => this.props.changePage(['add', prev_page])}></button>
            )
          }
          break;
        default:
          return (
            <button className="header__back" onClick={() => this.props.changePage(['timeline', 'list'])}></button>
          )
          break;  
      }
    }
  }

  render() {
    let menu_class = ''
    if(this.props.app.open_menu) {
      menu_class = 'active'
    }

    return (
      <header className="header">
        <div className="header__left">
          <button className={"header__menu-btn "+menu_class} onClick={() => this.props.toggleMenu(!this.props.app.open_menu)}>
            <span></span>  
          </button>
        </div>
        <div className="header__center"><div className="header__label">{this.props.page.title}</div></div>
        <div className="header__right">
          {this.displayRightBtn()}
        </div>
      </header>
    )
  }
}


function mapStateToProp(state) {
  let page = {}
  let pages = state.app.pages

  if(!pages) {
    pages = []
  }

  page = pages.find(page => page.slug == state.app.active_page[0])

  if(!page) {
    page = {}
  } else if(state.app.active_page[1]) {
    page = page.subpages.find(elem => elem.slug == state.app.active_page[1])
  }
  return {
    app  : state.app,
    page : page
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleMenu: toggleMenu,
    changePage: changePage
  }, dispatch)
}

export default connect(mapStateToProp, matchDispatchToProps)(Header);