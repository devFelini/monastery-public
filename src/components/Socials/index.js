import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {loadSocials} from 'actions/socials'

import SocialItem from './components/SocialItem'

class Socials extends Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    this.props.loadSocials()
  }

  render() {
    return (
      <div className="socials">
        <div className="socials__tabs">
          <button className="socials__tabs__item active">Боевые</button>
          <button className="socials__tabs__item">Тестовые</button>
        </div>
        <div className="add__socials">
          <div className="add__socials__list">
            {this.props.socials.map(elem => {
              return (
                <SocialItem key={elem.id} data={elem} />
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}


function mapStateToProp(state) {
  return {
    socials : state.socials,
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    loadSocials: loadSocials,
  }, dispatch)
}

export default connect(mapStateToProp, matchDispatchToProps)(Socials);