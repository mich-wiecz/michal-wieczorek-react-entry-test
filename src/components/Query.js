import React from 'react'
import Loader from '@Components/Loader'
import ErrorAlert from '@Components/ErrorAlert'
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
        this.setState(
          {
            ...this.state,
            loading: false,
            data:
              'transformer' in this.props
                ? this.props.transformer(result.data)
                : result.data,
          },
          () => {
            if (this.props.onLoaded) {
              this.props.onLoaded(this.state.data)
            }
          }
        )
      })
      .catch((error) => {
        console.error(error)
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
    const { loading, errors, data } = this.state
    const {
      loaderSize = 80,
      loaderClassName = '',
      errorClassName = '',
      errorMessage = 'Error!',
    } = this.props

    return (
      <>
        {loading && <Loader size={loaderSize} className={loaderClassName} />}
        {errors.length > 0 && (
          <ErrorAlert className={errorClassName}>{errorMessage}</ErrorAlert>
        )}
        {data && this.props.children(data)}
      </>
    )
  }
}

export default Query
