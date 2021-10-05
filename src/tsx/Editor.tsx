import React from 'react'
import AceEditor from 'react-ace'
import { useResizeDetector } from 'react-resize-detector';

import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-textmate";

type EditorSize = {
    width: number,
    height: number
}

const Editor = () => {
    const [ editorSize, setEditorSize ] = React.useState<EditorSize>({width: 0, height: 0})
    const editorWrapper = useResizeDetector<HTMLDivElement>({
        onResize: () => {
            setEditorSize({
                width: editorWrapper.ref.current?.clientWidth || 0,
                height:  editorWrapper.ref.current?.clientHeight || 0
            })
        }
    })

    React.useEffect(() => {
        console.log(editorWrapper.ref.current?.clientWidth)
        setEditorSize({
            width: editorWrapper.ref.current?.clientWidth || 0,
            height: editorWrapper.ref.current?.clientHeight || 0
        })
    }, [editorWrapper.ref])

    return (
        <div ref={editorWrapper.ref} style={{width: '100%', height: '100%'}}>
            <AceEditor
                mode="text"
                theme="textmate"
                onChange={() => { }}
                name="editor"
                fontSize="14px"
                width={`${editorSize.width}px`}
                height={`${editorSize.height}px`}
                editorProps={{ $blockScrolling: true }
                }
            />
        </div>
    )
}

export default Editor