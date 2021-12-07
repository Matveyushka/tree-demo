import { useSelector } from 'react-redux'
import '../../css/Editor.css'
import { State } from '../../state'
import { setM1Code } from '../../state/action-creators/codeActionCreators'
import Editor from '../Editor'

const M1Editor = () => {
    const code = useSelector((state: State) => state.code.m1code)

    return (
        <Editor initCode={code} setCodeAction={setM1Code} />
    )
}

export default M1Editor