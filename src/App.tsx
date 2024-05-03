import { Collapse, ItemsType } from "../lib/main";
import { Collapse as AntdCollapse, CollapseProps } from "antd";

const itemsNest: any[] = [
  {
    key: "1",
    label: "This is panel nest panel",
    children: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam pariatur
        fugiat facere ducimus voluptatem itaque praesentium. Temporibus
        reprehenderit totam excepturi? Consectetur, nihil dignissimos architecto
        repellendus iure numquam nisi corporis eveniet!
      </p>
    ),
  },
];
const items: ItemsType[] = [
  {
    key: "1",
    label: "Item 1",
    children: <AntdCollapse defaultActiveKey={["1"]} items={itemsNest} />,
  },
  {
    key: "2",
    label: "Item 2",
    children: <Collapse defaultActiveKey={["1"]} items={itemsNest} />,
  },
  // {
  //   key: "3",
  //   label: "Item 3",
  //   children: (
  //     <div>
  //       Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, aliquam
  //       possimus doloribus nostrum nesciunt dolores quisquam sapiente veniam,
  //       cum voluptate odio, magnam pariatur atque obcaecati. Impedit velit
  //       consequuntur enim ullam.
  //     </div>
  //   ),
  // },
];
function App() {
  return (
    <>
      <div className="mt-20 mx-40">
        <Collapse
          size="large"
          items={items}
          defaultActiveKey={["2"]}
          onChange={(keys: string[]) => {
            console.log(keys);
          }}
        />
        <AntdCollapse
          size="large"
          defaultActiveKey={["2", "3"]}
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
