import React from 'react';
import logo from './logo.svg';
import '../css/App.css';
import SplitPairPane, { SplitPairPaneOrientation } from './SplitPairPane';
import TreeMonitor from './TreeMonitor';
import Editor from './Editor';
import CompilatorControlPanel from './CompilatorControlPanel';
import TreeControlPanel from './TreeControlPanel';

function App() {

  return (
    <div className="App">
      <SplitPairPane orientaion={SplitPairPaneOrientation.HORIZONTAL} position={50}>
        <SplitPairPane orientaion={SplitPairPaneOrientation.VERTICAL} position={80}>
          <Editor></Editor>
          <CompilatorControlPanel></CompilatorControlPanel>
        </SplitPairPane>
        <SplitPairPane orientaion={SplitPairPaneOrientation.VERTICAL} position={80}>
          <TreeMonitor></TreeMonitor>
          <TreeControlPanel></TreeControlPanel>
        </SplitPairPane>
      </SplitPairPane>
    </div>
  );
}

export default App;
