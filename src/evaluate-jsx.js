import React from 'react'
import { render } from 'react-dom'

window.React = React
window.ReactDOM = {}
window.ReactDOM.render = render

const jsxLoader = new Promise((resolve, reject) => {
  const src = 'https://unpkg.com/babel-standalone@6/babel.min.js'
  const script = document.createElement('script')
  script.src = src;
  script.onerror = (e) => { reject(e); }
  script.onload = () => {
    window.jsx = {}
    window.jsx.transpile = input => window.Babel.transform(input, { presets: ['es2015', 'react'] }).code
    window.jsx.evaluateJSX = input => eval(window.jsx.transpile(input))  // eslint-disable-line

    window.iodide.addOutputHandler({
      shouldHandle: val => window.React.isValidElement(val),
      render: (val) => {
        const elem = document.createElement('div')
        window.ReactDOM.render(val, elem)
        return elem
      },
    });

    resolve()
  };
  document.body.appendChild(script);
})
jsxLoader // eslint-disable-line
