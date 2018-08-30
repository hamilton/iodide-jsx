/**
 * The main bootstrap script for loading pyodide.
 */
let SOURCE_URL = ''
var jsxPluginLoader = new Promise((resolve, reject) => {
    fetch(SOURCE_URL)
    let script = document.createElement('script');
    script.src = SOURCE_URL
    script.onerror = (e) => { reject(e) }
    document.body.appendChild(script)
    ////////////////////////////////////////////////////////////
    if (window.iodide !== undefined) {
        // Load the custom CSS for Pyodide
        window.iodide.addOutputHandler({
        shouldHandle : (val) => {
            return false
        },

        render : (val) => {
            return document.createElement('div')
        }
        })
    }
});
jsxPluginLoader
