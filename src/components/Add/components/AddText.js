import React, {Component} from 'react'


class AddText extends Component {
  constructor(props, context) {
    super(props, context)

    this.toggleField = this.toggleField.bind(this)
  }

  toggleField(e) {
    this.props.changePostText(e.target.value)
  }

  render() {
    let field_class = ''
    if(this.props.text.length > 0) {
      field_class = 'active'
    }

    return (
      <div className="add__inner">
        <div className="add__list">
          <div className="add__item">
            <div className={"add__text "+field_class}>
              <textarea placeholder="Текст записи..." value={this.props.text} onChange={(e) => this.toggleField(e)}></textarea>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddText;