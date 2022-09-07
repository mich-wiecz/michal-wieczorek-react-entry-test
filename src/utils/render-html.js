import React from 'react'

class Element extends React.Component {
  render() {
    const Tag = this.props.tag
    return <Tag>{this.props.children}</Tag>
  }
}

function mapElements(elements) {
  return elements.map((elem, index) => (
    <React.Fragment key={index}>{elem}</React.Fragment>
  ))
}

function escapeHTML(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function renderDeep(content, re) {
  const elements = []
  let result = re.exec(content)

  while (result) {
    if (re.lastIndex === content.length) {
      return mapElements(elements)
    }

    const { startingTag, closingTag, text } = result.groups

    if (startingTag) {
      elements.push(
        <Element tag={startingTag}>{renderDeep(content, re)}</Element>
      )
    } else if (text) {
      elements.push(escapeHTML(text))
    } else if (closingTag) {
      return mapElements(elements)
    }

    if (re.lastIndex !== content.length) {
      result = re.exec(content)
    }
  }

  return mapElements(elements)
}

export function renderHTML(content) {
  const re = new RegExp(
    /(?:<(?<startingTag>[a-z\d]+)\s?.*?>)|(?<text>[^<]+)|(?:<\/(?<closingTag>[a-z\d]+)>\s*)/,
    'g'
  )

  return renderDeep(content, re)
}
