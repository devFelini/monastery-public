import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {loadSocials} from 'actions/socials'

import SocialItem from 'components/Socials/components/SocialItem';

class AddSocials extends Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    this.props.loadSocials()
  }

  render() {
    return (
      <div className="add__item">
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

export default connect(mapStateToProp, matchDispatchToProps)(AddSocials);