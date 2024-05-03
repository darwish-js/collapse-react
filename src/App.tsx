import { Collapse, ItemsType } from "../lib/main";
import { Collapse as AntdCollapse } from "antd";

const items: ItemsType[] = [
  {
    key: "1",
    label: "Item 1",
    disabled: true,
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
      <div className="mt-20 mx-40">
        <Collapse
          defaultActiveKey={["2", "3"]}
          items={items}
          onChange={(keys: string[]) => {
            console.log(keys);
          }}
        />
        <AntdCollapse
          defaultActiveKey={["2", "3"]}
          activeKey={["2", "1"]}
          items={items}
          onChange={(keys) => {
            console.log(keys);
          }}
        />
      </div>
    </>
  );
}

export default App;
