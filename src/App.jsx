import React, { useState } from "react";
import "./App.css";
import Tree from "./components/Tree/Tree";
import data from "./data.json";

function App() {
  const [treeData, setTreeData] = useState(data);

  return (
    <div className="App">
      <Tree parentNode={treeData} isFirstNode={true} />
    </div>
  );
}

export default App;
