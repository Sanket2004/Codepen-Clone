import { useCallback, useEffect, useState } from "react"
import Editor from "./components/Editor"
import { javascript } from "@codemirror/lang-javascript";
import { html } from '@codemirror/lang-html'
import { css } from "@codemirror/lang-css";
import Preloader from "./components/Preloader"
import useLocalStorage from "./hooks/useLocalStorage";



function App() {

  const [htmlValue, sethtml] = useLocalStorage('html', '')
  const [cssValue, setcss] = useLocalStorage('css', '')
  const [jsValue, setjs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    setTimeout(() => {
      setLoaded(false);
    }, 1000);
  }, []);

  //* Html onchange handler 
  const onChangeHtml = useCallback((value) => {
    sethtml(value);
  }, []);

  //* Css onchange handler 
  const onChangeCss = useCallback((value) => {
    setcss(value);
  }, []);

  //* JavaScript onchange handler 
  const onChangeJavaScript = useCallback((value) => {
    setjs(value);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
        <body>${htmlValue}</body>
        <style>${cssValue}</style>
        <script>${jsValue}</script>
      </html>
      `)
    }, 250)
    return () => clearTimeout(timeout)
  }, [htmlValue, cssValue, jsValue])

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [open, setOpen] = useState(false)


  return (
    <>
      {
        loaded ? <Preloader /> :
          <div className="main flex">
            <button onClick={() => setIsCollapsed(!isCollapsed)} className="absolute right-4 bottom-4 bg-slate-950 h-12 w-12 text-white rounded-xl z-50">
              {isCollapsed ? <i className="fa-solid fa-bars"></i> : <i className="fa-solid fa-xmark"></i>}
            </button>
            {
              isCollapsed ? "" :
                <div className="pen top-pen w-[50vh] bg-zinc-800 text-white flex flex-col h-screen flex-0 resize-x ">
                  <Editor
                    extension={[html({ extraTags: true, autoCloseTags: true })]}
                    displayName="HTML"
                    value={htmlValue}
                    onChange={onChangeHtml}
                    theme="dark"
                    icon="fa-brands fa-html5"
                  />
                  <Editor
                    extension={[css({})]}
                    language="css"
                    displayName="CSS"
                    value={cssValue}
                    theme="dark"
                    onChange={onChangeCss}
                    icon="fa-brands fa-css3-alt"
                  />
                  <Editor
                    extension={[javascript({ jsx: true })]}
                    displayName="JS"
                    value={jsValue}
                    theme="dark"
                    onChange={onChangeJavaScript}
                    icon="fa-brands fa-square-js"
                  />
                </div>
            }

            <div className="pen flex-1">
              <iframe
                className="h-screen"
                srcDoc={srcDoc}
                title="output"
                sandbox="allow-scripts"
                frameBorder="0"
                width="100%"
                height="100%"
              />
            </div>
          </div>
      }
    </>
  )
}

export default App
