import React, {Component} from 'react'

class AddPreview extends Component {
  constructor(props, context) {
    super(props, context)

    this.toggleField = this.toggleField.bind(this)
    this.renderPreviewList = this.renderPreviewList.bind(this)
    
  }

  toggleField(e) {
    this.props.changePostDesc(e.target.value)
  }

  renderPreviewList() {
    if(this.props.media.length > 1) {
      return (
        <div className="add__preview__images">
          {this.props.media.map(function(elem) {
            let elem_class = ''
            if(elem.id == this.props.preview) {
              elem_class = 'active'
            } 
            return (
              <button className={"add__preview__images__btn "+elem_class} onClick={() => this.props.changePostPreview(elem.id)}>
                <img key={elem.id} src={elem.thumb} />
              </button>
            )
          }.bind(this))}
        </div>
      )
    } else if(this.props.media.length > 0) {
      return (
        <div className="add__preview__not-found">Добавьте дополнительные изображения для выбора превью записи.</div>
      )
    } else {
      return (
        <div className="add__preview__not-found">Добавьте изображения для выбора превью записи.</div>
      )
    }
  }

  render() {
    let preview_image = ''
    let image = this.props.media.find((elem) => elem.id == this.props.preview)
    if(this.props.media.length > 0) {
      preview_image = <img src={image.url} /> 
    }

    return (
      <div className="add__item">
        <div className="add__preview">
          <div className="timeline__item__inner">
            <div className="timeline__item__image">
              {preview_image}
            </div>
            <div className="timeline__item__info">
              <div className="timeline__item__desc">{this.props.desc}</div>
            </div>
          </div>
        </div>
        {this.renderPreviewList()}
        <div className="add__text">
          <textarea placeholder="Превью записи..." value={this.props.desc} onChange={(e) => this.toggleField(e)}></textarea>
        </div>
      </div>
    )
  }
}

export default AddPreview;