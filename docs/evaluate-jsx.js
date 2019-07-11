const REACT = 'https://cdnjs.cloudflare.com/ajax/libs/react/16.4.2/umd/react.production.min.js'
const REACT_DOM = 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js'
const BABEL_STANDALONE = 'https://unpkg.com/babel-standalone@6/babel.min.js'

const loadResource = url => new Promise((resolve) => {
  const head = document.getElementsByTagName('head')[0];
  const theScript = document.createElement('script');
  theScript.src = url;
  theScript.crossorigin = true;
  theScript.onload = () => {
    resolve();
  };
  head.appendChild(theScript);
})
console.log('THIS IS BZROKEN')
Promise.all([loadResource(REACT), loadResource(REACT_DOM), loadResource(BABEL_STANDALONE)])
  .then(() => {
    console.log(window)
    window.jsx = {}
    window.jsx.transpile = input => window.Babel.transform(input, {
      presets: [['es2015', { loose: true, modules: false }], 'react'],
    }).code
    window.jsx.evaluateJSX = input => eval(window.jsx.transpile(input))  // eslint-disable-line
    window.iodide.exportJSX = (variableName, variable) => {
      const out = variable
      window[variableName] = out;
    }
    window.iodide.addOutputHandler({
      shouldHandle: val => window.React.isValidElement(val),
      render: (val) => {
        const elem = document.createElement('div')
        window.ReactDOM.render(val, elem)
        return elem
      },
    });
  })
