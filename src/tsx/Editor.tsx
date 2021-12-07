import React from 'react'
import AceEditor from 'react-ace'
import { useResizeDetector } from 'react-resize-detector'

import "ace-builds/src-noconflict/mode-text"
import "ace-builds/src-noconflict/theme-textmate"
import { useDispatch } from 'react-redux'

import '../css/Editor.css'

type EditorSize = {
    width: number,
    height: number
}

interface EditorParams {
    initCode: string,
    setCodeAction: (code: string) => void
}

const Editor = (params: EditorParams) => {
    const [ initCode ] = React.useState(params.initCode)

    const [ editorSize, setEditorSize ] = React.useState<EditorSize>({width: 0, height: 0})

    const dispatch = useDispatch()

    const updateCode = (code: string) => {
        dispatch(params.setCodeAction(code))
    }

    const editorWrapper = useResizeDetector<HTMLDivElement>({
        onResize: () => {
            setEditorSize({
                width: editorWrapper.ref.current?.clientWidth || 0,
                height:  editorWrapper.ref.current?.clientHeight || 0
            })
        }
    })

    const editorRef = React.useRef(null)

    React.useEffect(() => {
        setEditorSize({
            width: editorWrapper.ref.current?.clientWidth || 0,
            height: editorWrapper.ref.current?.clientHeight || 0
        })
    }, [editorWrapper.ref])

    React.useEffect(() => {
        let anything: any = (editorRef?.current)
        anything.editor.setValue(initCode)
        anything.editor.clearSelection()
    }, [initCode])

    return (
        <div ref={editorWrapper.ref} style={{width: '100%', height: '100%'}}>
            <AceEditor
                ref={editorRef}
                mode="text"
                theme="textmate"
                onChange={(value) => { updateCode(value) }}
                name="editor"
                fontSize="20px"
                width={`${editorSize.width}px`}
                height={`${editorSize.height}px`}
                editorProps={{ $blockScrolling: true }
                }
            />
        </div>
    )
}

export default Editor