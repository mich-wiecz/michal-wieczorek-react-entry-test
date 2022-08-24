import React from 'react'
import { areDeepEqual } from '@Utils'

class Query extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      errors: [],
      data: null,
    }
  }

  executeQuery() {
    this.props.apolloClient
      .query({
        query: this.props.query,
        variables: this.props.variables,
      })
      .then((result) => {
        this.setState({
          ...this.state,
          loading: false,
          data:
            'transformer' in this.props
              ? this.props.transformer(result.data)
              : result.data,
        })
      })
      .catch((error) => {
        this.setState({
          ...this.state,
          loading: false,
          errors: Array.isArray(error) ? error : [error],
        })
      })
  }

  componentDidMount() {
    this.executeQuery()
  }

  componentDidUpdate(prevProps) {
    if (
      ![typeof prevProps.variables, typeof this.props.variables].includes(
        'object'
      )
    ) {
      return
    }

    const hasVariablesChanged = !areDeepEqual(
      prevProps.variables,
      this.props.variables
    )
    if (hasVariablesChanged) {
      this.executeQuery()
    }
  }

  render() {
    return this.props.children(this.state)
  }
}

export default Query
