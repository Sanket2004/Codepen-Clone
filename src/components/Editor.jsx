import React from 'react'
import CodeMirror from "@uiw/react-codemirror";



function Editor(props) {

    const {
        // language,
        extension,
        displayName,
        value,
        onChange,
        icon,
    } = props


    return (
        <div className="editor-container flex flex-col mb-2 p-2 overflow-hidden rounded h-screen">
            <div className="editor-title flex justify-start gap-2 w-full bg-zinc-900 rounded-t-lg px-2 py-1 items-center">
                <i className={icon}></i>
                <h1 className="font-[1000] text-l">{displayName}</h1>
                {/* <button className='bg-slate-800 text-white px-2 py-1 rounded text-l font-black'>O/C</button> */}
            </div>
            <CodeMirror
                onChange={onChange}
                value={value}
                className='code-mirror-wrapper grow text-wrap h-full'
                // lang={language}
                theme={'dark'}
                maxHeight='25vh'
                minHeight='25vh'
                spellCheck={true}
                extensions={extension}

            />
        </div>
    )
}

export default Editor
