import React, {Component} from 'react'
import Clock from 'react-clock'
import {getMonthLabel} from 'functions'

class AddTime extends Component {
  constructor(props, context) {
    super(props, context)

    this.changeHours = this.changeHours.bind(this)
    this.changeMinutes = this.changeMinutes.bind(this)

    this.state = {
      date: new Date()
    }
  }

  changeHours(input) {
    this.state.date.setHours(input.target.value)
    this.props.changePostDate(this.state.date.valueOf())
  }

  changeMinutes(input) {
    this.state.date.setMinutes(input.target.value)
    this.props.changePostDate(this.state.date.valueOf())
  }

  componentDidMount() {
    this.state.date = new Date(this.props.date.valueOf())
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.date.valueOf() != this.props.date.valueOf()) {
      this.state.date = new Date(this.props.date.valueOf())
    }
  }

  render() {
    let date_label = this.state.date.getDate() +' '+ getMonthLabel(this.state.date.getMonth(), 2) +' '+ this.state.date.getFullYear()

    let hour = this.state.date.getHours() 

    let timeblockClass = ''

    if(hour > 18) {
      timeblockClass = 'night'
    }

    return (
      <div className={"add__item add__item_time "+timeblockClass}>
        <div className="add__time">
          <div className="add__time__date">{date_label}</div>
          <div className="add__time__clock">
            <Clock value={this.state.date} size={220} />
          </div>
          <div className="add__time__field">
            <input type="number" value={hour} onChange={(e) => this.changeHours(e)}/>
            <span>:</span> 
            <input type="number" value={this.state.date.getMinutes()} onChange={(e) => this.changeMinutes(e)}/>
          </div>
        </div>
      </div>
    )
  }
}

export default AddTime;