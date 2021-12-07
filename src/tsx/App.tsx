import '../css/App.css'
import SplitPairPane, { SplitPairPaneOrientation } from './SplitPairPane'
import TreeMonitor from './TreeMonitor'
import TreeControlPanel from './TreeControlPanel'
import Navigation from './Navigation'
import StructureIdMonitor from './StructureIdMonitor'
import { useSelector } from 'react-redux'
import { State } from '../state'
import M1CompilatorControlPanel from './M1CompilatorControlPanel'
import M1Editor from './M1Editor'
import M2Editor from './M2Editor'
import M2CompilatorControlPanel from './M2CompilatorControlPanel'
import StructureMonitor from './StructureMonitor'

function App() {
  const navigation = useSelector((state: State) => state.navigation)

  const renderByNavigation = (page: number) => {
    switch (page) {
      case 0:
        return (
          <SplitPairPane orientaion={SplitPairPaneOrientation.VERTICAL} position={80}>
            <M1Editor />
            <M1CompilatorControlPanel />
          </SplitPairPane>
        )
      case 1:
        return (
          <SplitPairPane orientaion={SplitPairPaneOrientation.VERTICAL} position={80}>
            <TreeMonitor></TreeMonitor>
            <TreeControlPanel></TreeControlPanel>
          </SplitPairPane>
        )
      case 2:
        return (
          <StructureIdMonitor></StructureIdMonitor>
        )
      case 3:
        return (
          <SplitPairPane orientaion={SplitPairPaneOrientation.VERTICAL} position={80}>
            <M2Editor />
            <M2CompilatorControlPanel />
          </SplitPairPane>
        )
      case 4:
        return (
          <div className='structure-monitor-wrapper'>
            <StructureMonitor />
          </div>
        )
    }
  }

  return (
    <div className="App">
      <Navigation></Navigation>
      <div className='workspace'>
        <SplitPairPane orientaion={SplitPairPaneOrientation.HORIZONTAL} position={50}>
          {renderByNavigation(navigation.left)}
          {renderByNavigation(navigation.right)}
        </SplitPairPane>
      </div>
    </div>
  )
}

export default App
