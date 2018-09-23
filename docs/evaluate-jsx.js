const REACT = 'https://cdnjs.cloudflare.com/ajax/libs/react/16.4.2/umd/react.production.min.js'
const REACT_DOM = 'https://hamilton.github.io/iodide-jsx/react-dom-build.js'
const BABEL_STANDALONE = 'https://unpkg.com/babel-standalone@6/babel.min.js'

const loadResource = url => new Promise((resolve) => {
  const head = document.getElementsByTagName('head')[0];
  const theScript = document.createElement('script');
  theScript.src = url;
  theScript.onload = () => {
    resolve();
  };
  head.appendChild(theScript);
})

Promise.all([loadResource(REACT), loadResource(REACT_DOM), loadResource(BABEL_STANDALONE)])
  .then(() => {
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
  })
