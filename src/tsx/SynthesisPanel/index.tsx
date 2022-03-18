import axios from "axios"
import { useSelector } from "react-redux"
import { State } from "../../state"

const SynthesisPanel = () => {
    const code = useSelector((state: State) => state.code)

    return (
        <div className="synthesis-panel">
            <button className="synthesis-button" onClick={() => axios.post('https://localhost:5001/synthesis', code)}>
                СИНТЕЗИРОВАТЬ
                </button>
        </div>
    )
}

export default SynthesisPanel