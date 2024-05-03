import React, { useEffect } from "react";
import "./collapse.css";

export interface ItemsType {
  key: string;
  label: React.ReactNode;
  content: React.ReactNode;
}
export interface CollapseProps {
  defaultActiveKey?: string[];
  activeKey?: string[];
  items?: ItemsType[];
  accordion?: boolean;
  // disabled?: boolean;
  // className?: string;
  // style?: React.CSSProperties;
  // collapsedHeight?: number;
  // expandIcon?: React.ReactNode;
  // collapseIcon?: React.ReactNode;
  // onExpand?: () => void;
  // onCollapse?: () => void;
}
interface KeysType {
  key: string;
  isCollapsed: boolean;
}
export function Collapse(props: CollapseProps) {
  const { defaultActiveKey, activeKey, accordion, items = [] } = props;
  const [keys, setKeys] = React.useState<KeysType[]>(() =>
    items.map((item) => ({
      key: item.key,
      isCollapsed: defaultActiveKey?.includes(item.key) ?? false,
    }))
  );

  const handleToggle = (key: string) => {
    setKeys((prevKeys) =>
      prevKeys.map((item) =>
        item.key === key
          ? { key: item.key, isCollapsed: !item.isCollapsed }
          : item
      )
    );
  };

  return (
    <div className="dar-collapse">
      {items.map((item, index) => (
        <Panel
          order={item.key}
          key={item.key}
          isCollapsed={keys[index].isCollapsed}
          handleToggle={handleToggle}
          header={item.label}
          // forceRender={true}
          children={item.content}
        />
      ))}
    </div>
  );
}
export interface PanelProps {
  // collapsible	是否可折叠或指定可折叠触发区域	header | icon | disabled	-	4.9.0 (icon: 4.24.0)
  order: string;
  isCollapsed: boolean;
  handleToggle: (key: string) => void;
  headerStyle?: React.CSSProperties;
  boderStyle?: React.CSSProperties;
  // extra?: React.ReactNode;
  // forceRender?: boolean;
  header?: React.ReactNode;
  // showArrow?: boolean;
}
export function Panel(props: React.PropsWithChildren<PanelProps>) {
  const { order, isCollapsed, header, handleToggle, children } = props;
  const [height, setHeight] = React.useState(0);
  const contentRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.offsetHeight);
    }
  }, [contentRef.current]);

  return (
    <div
      className="dar-collapse-item"
      style={{
        height: isCollapsed ? `${height + 40}px` : "40px",
        overflow: "hidden",
        transition: "height 0.3s ease",
      }}
    >
      <div
        className={`dar-collapse-header ${
          isCollapsed ? "dar-collapse-header-active" : ""
        }`}
        onClick={() => handleToggle(order)}
        style={{
          height: "40px",
          backgroundColor: "rgba(0,0,0,0.02)",
        }}
      >
        {header}
      </div>
      <div ref={contentRef} className="dar-collapse-content">
        <div>{children}</div>
      </div>
    </div>
  );
}
