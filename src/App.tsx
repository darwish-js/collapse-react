import "./App.css";
import { Collapse, ItemsType } from "../lib/main";

const items: ItemsType[] = [
  {
    key: "1",
    label: "Item 1",
    content: (
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, aliquam
        possimus doloribus nostrum nesciunt dolores quisquam sapiente veniam,
        cum voluptate odio, magnam pariatur atque obcaecati. Impedit velit
        consequuntur enim ullam.
      </div>
    ),
  },
  {
    key: "2",
    label: "Item 2",
    content: (
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, aliquam
        possimus doloribus nostrum nesciunt dolores quisquam sapiente veniam,
        cum voluptate odio, magnam pariatur atque obcaecati. Impedit velit
        consequuntur enim ullam.
      </div>
    ),
  },
  {
    key: "3",
    label: "Item 3",
    content: (
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, aliquam
        possimus doloribus nostrum nesciunt dolores quisquam sapiente veniam,
        cum voluptate odio, magnam pariatur atque obcaecati. Impedit velit
        consequuntur enim ullam.
      </div>
    ),
  },
];
function App() {
  return (
    <>
      <div>
        <Collapse items={items} />
      </div>
    </>
  );
}

export default App;
