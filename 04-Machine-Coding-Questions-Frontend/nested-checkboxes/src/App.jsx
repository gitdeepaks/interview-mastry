import { useState } from 'react';
import './App.css';

const checkboxesData = [
  {
    id: 1,
    name: "Fruits",
    children: [
      {
        id: 2,
        name: "Citrus",
        children: [
          {
            id: 3,
            name: "Orange",
          },
          {
            id: 4,
            name: "Lemon",
          },
          {
            id: 7,
            name: "Grapefruit",
          },
        ],
      },
      {
        id: 5,
        name: "Berries",
        children: [
          {
            id: 6,
            name: "Strawberry",
          },
          {
            id: 8,
            name: "Blueberry",
          },
          {
            id: 9,
            name: "Raspberry",
          },
        ],
      },
      {
        id: 10,
        name: "Tropical",
        children: [
          {
            id: 11,
            name: "Mango",
          },
          {
            id: 12,
            name: "Pineapple",
          },
          {
            id: 13,
            name: "Papaya",
          },
        ],
      },
    ],
  },
  {
    id: 14,
    name: "Vegetables",
    children: [
      {
        id: 15,
        name: "Leafy Greens",
        children: [
          {
            id: 16,
            name: "Spinach",
          },
          {
            id: 17,
            name: "Lettuce",
          },
        ],
      },
      {
        id: 18,
        name: "Root Vegetables",
        children: [
          {
            id: 19,
            name: "Carrot",
          },
          {
            id: 20,
            name: "Beetroot",
          },
        ],
      },
    ],
  },
  {
    id: 21,
    name: "Grains",
    children: [
      {
        id: 22,
        name: "Cereals",
        children: [
          {
            id: 23,
            name: "Wheat",
          },
          {
            id: 24,
            name: "Rice",
          },
        ],
      },
      {
        id: 25,
        name: "Legumes",
        children: [
          {
            id: 26,
            name: "Lentils",
          },
          {
            id: 27,
            name: "Chickpeas",
          },
        ],
      },
    ],
  },
];


const CheckBoxes = ({ data, checked, setChecked }) => {
  const handleChange = (isChecked, node) => {
    setChecked(prev => {
      const newState = { ...prev, [node.id]: isChecked }

      const updateChildren = (node) => {

        node.children?.forEach((child) => {
          newState[child.id] = isChecked
          child.children && updateChildren(child)
        })

      }
      updateChildren(node)


      const verifyChecked = (node) => {
        if (!node.children) return newState[node.id] || false

        const allChildrenAreChecked = node.children.every(child => verifyChecked(child))

        newState[node.id] = allChildrenAreChecked
        return allChildrenAreChecked
      }
      checkboxesData.forEach(node => verifyChecked(node))


      return newState
    })

    console.log(checked);

  }
  return <div className="parent">
    {data.map((node) => <div key={node.id} className="">
      <input type="checkbox" checked={checked[node.id] || false} onChange={e => handleChange(e, node)} />
      <span>{node.name}</span>
      {node.children && <CheckBoxes data={node.children} checked={checked} setChecked={setChecked} />}
    </div>)}
  </div>
}


const App = () => {
  const [checked, setChecked] = useState({})
  return (
    <div className="content">

      <CheckBoxes data={checkboxesData} checked={checked} setChecked={setChecked} />
    </div>
  );
};

export default App;
