import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {setDefaultAppSettings} from 'actions/app'

import Header   from './components/Header'
import Menu     from './components/Menu'
import Timeline from './components/Timeline/index'
import Add      from './components/Add/index'
import Search   from './components/Search/index'
import Socials  from './components/Socials/index'

class App extends Component {
  constructor(props, context) {
    super(props, context)

    this.pageSelector = this.pageSelector.bind(this)
  }

  pageSelector() {
    if(this.props.app.active_page) {
      switch(this.props.app.active_page[0]) {
        case 'timeline':
          return (
            <Timeline />
          )
          break;
        case 'search':
          return (
            <Search />
          )
          break;
        case 'add':
          return (
            <Add />
          )
          break;
        case 'socials':
          return (
            <Socials />
          )
          break;
      }
    }
    
  }

  componentDidMount() {
    let data = {
      open_menu: false,
      active_page: ['timeline', 'list'],
      active_post: 0,
      search_query: '',
      loading: false,
      pages: [
        {
          slug: 'timeline',
          title: 'Лента записей',
          subpages: [
            {
              slug: 'list',
              title: 'Лента записей',
            },  
            {
              slug: 'post',
              title: 'Запись'
            },
          ]
        },
        {
          slug: 'search',
          title: 'Поиск',
          subpages: [
            {
              slug: 'list',
              title: 'Лента записей',
            },  
            {
              slug: 'post',
              title: 'Запись'
            },
          ]
        },
        {
          slug: 'add',
          title: 'Новая запись',
          subpages: [
            {
              slug: 'text',
              title: 'Новая запись',
            },  
            {
              slug: 'media',
              title: 'Медиа'
            },
            {
              slug: 'preview',
              title: 'Превью'
            },
            {
              slug: 'date',
              title: 'Дата публикации'
            },
            {
              slug: 'time',
              title: 'Вемя публикации'
            },
            {
              slug: 'socials',
              title: 'Соц. сети'
            },
          ]
        },
        {
          slug: 'edit',
          title: 'Редактирование'
        },  
        {
          slug: 'socials',
          title: 'Соц. сети'
        },
        {
          slug: 'settings',
          title: 'Настройки'
        },
      ],
      menu: ['timeline', 'add', 'search', 'socials', 'settings'],
    }

    this.props.setDefaultAppSettings(data)
  }

  render() {
    return (
      <div className="wrapper">
        <Header/>
        <Menu menu_state={this.props.app.open_menu}/>
        <div className="container">
          {this.pageSelector()}
        </div>
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
    setDefaultAppSettings: setDefaultAppSettings
  }, dispatch)
}

export default connect(mapStateToProp, matchDispatchToProps)(App);