import React, { Component, PropTypes } from 'react'
import { InputTypes } from '../../'

export class GlobalInput extends Component {
  _getInputType() {
    const {
      byId,
      current
    } = this.props
    return byId[current].inputType
  }

  mapInputToHandler(inputText) {
    const {
      onAddDashboardSubmit
    } = this.props
    const inputType = this._getInputType()

    switch(inputType) {
      case 'dashboard':
        return onAddDashboardSubmit(inputText)
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const node = this.refs.input
    const inputText = node.value.trim()
    if (inputText) {
      // this.props.onGlobalInputSubmit(inputText)
      this.mapInputToHandler(inputText)
      node.value = ''
    }
  }

  render() {
    const {
      byId,
      current,
      setCurrentInputType
    } = this.props

    return (
      <div>
        <InputTypes
          byId={ byId }
          current={ current }
          onClick={ setCurrentInputType }
        />
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="text" ref="input" />
          <button>
            { 'Add ' + this._getInputType() }
          </button>
        </form>
      </div>
    )
  }
}

GlobalInput.propTypes = {
  byId: PropTypes.object.isRequired,
  current: PropTypes.string.isRequired,
  setCurrentInputType: PropTypes.func.isRequired,
  onAddDashboardSubmit: PropTypes.func.isRequired
}
