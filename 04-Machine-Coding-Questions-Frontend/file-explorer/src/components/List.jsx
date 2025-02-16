import React from "react";
import "./styles.css";

export default function List({ list, addNodeToList, deleteNodeList }) {
  const [open, setOpen] = React.useState({});

  return (
    <div className="container">
      {list.map((item) => (
        <div key={item.id}>
          <span>
            {item.isFolder ? (
              <span
                onClick={() =>
                  setOpen({ ...open, [item.name]: !open[item.name] })
                }
              >
                {open[item.name] ? "📂" : "📁"}
              </span>
            ) : (
              <span>📄</span>
            )}
          </span>
          <span>{item.name}</span>
          {item.isFolder && (
            <span onClick={() => addNodeToList(item.id)} className="icon">
              ➕
            </span>
          )}
          <span onClick={() => deleteNodeList(item.id)} className="icon">
            ❌
          </span>
          {open?.[item.name] && item?.children && (
            <List
              list={item.children}
              addNodeToList={addNodeToList}
              deleteNodeList={deleteNodeList}
            />
          )}
        </div>
      ))}
    </div>
  );
}
