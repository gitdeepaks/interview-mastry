import { useState } from "react";
import "./App.css";
import json from "../public/data.json";
import List from "./components/List";

const App = () => {
  const [data, setdata] = useState(json);

  const addNodeToList = (parentId) => {
    const name = prompt("Enter folder name");
    const updateTree = (list) => {
      return list.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...node.children,
              {
                id: Math.floor(Math.random() * 10000),
                name: name,
                isFolder: true,
                children: [],
              },
            ],
          };
        }
        if (node.children) {
          return {
            ...node,
            children: updateTree(node.children),
          };
        }
        return node;
      });
    };
    setdata((prev) => updateTree(prev));
  };

  const deleteNodeList = (itemId) => {
    const updateTree = (list) => {
      return list
        .filter((node) => node.id !== itemId)
        .map((node) => {
          if (node.children) {
            return {
              ...node,
              children: updateTree(node.children),
            };
          }
          return node;
        });
    };
    setdata((prev) => updateTree(prev));
  };

  return (
    <div className="content">
      <h1>File Explorer</h1>
      <List
        list={data}
        addNodeToList={addNodeToList}
        deleteNodeList={deleteNodeList}
      />
    </div>
  );
};

export default App;
