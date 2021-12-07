import { useSelector } from 'react-redux'
import '../../css/Editor.css'
import { State } from '../../state'
import { setM2Code } from '../../state/action-creators/codeActionCreators'
import Editor from '../Editor'

const M2Editor = () => {
    const code = useSelector((state: State) => state.code.m2code)

    return (
        <Editor initCode={code} setCodeAction={setM2Code} />
    )
}

export default M2Editor