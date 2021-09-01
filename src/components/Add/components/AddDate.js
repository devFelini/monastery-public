import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {changePage} from 'actions/app'

import Calendar from 'react-calendar'

class AddDate extends Component {
  constructor(props, context) {
    super(props, context)

  }

  render() {

    let calendar_val = new Date()

    if(this.props.date) {
      calendar_val = new Date(this.props.date.valueOf())
    }

    return (
      <div className="add__item">
        <div className="add__date">
          <div className="add__date__buttons">
            <button className="add__date__draft btn btn_grey" onClick={() => this.props.changePage(['add', 'socials'])}>Сохранить в черновик</button>
            <button className="add__date__now btn btn_pink" onClick={() => this.props.changePage(['add', 'socials'])}>Опубликовать ейчас</button>
          </div>
          <Calendar minDate={new Date()} value={calendar_val} onChange={this.props.changePostDate} />
        </div>
      </div>
    )
  }
}

function mapStateToProp(state) {
  return {}
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    changePage : changePage
  }, dispatch)
}

export default connect(mapStateToProp, matchDispatchToProps)(AddDate);