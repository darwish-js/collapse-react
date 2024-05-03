import React, { useEffect } from "react";

export interface ItemsType {
  key: string;
  label: React.ReactNode;
  content: React.ReactNode;
}
export interface CollapseProps {
  defaultActiveKey?: string[];
  activeKey?: string[];
  items?: ItemsType[];
  // disabled?: boolean;
  // className?: string;
  // style?: React.CSSProperties;
  // collapsedHeight?: number;
  // expandIcon?: React.ReactNode;
  // collapseIcon?: React.ReactNode;
  // onExpand?: () => void;
  // onCollapse?: () => void;
}
export function Collapse(props: CollapseProps) {
  const { defaultActiveKey, activeKey, items = [] } = props;
  return (
    <div>
      {items.map((item) => (
        <Panel
          key={item.key}
          header={item.label}
          forceRender={true}
          children={item.content}
        />
      ))}
    </div>
  );
}
export interface PanelProps {
  // collapsible	是否可折叠或指定可折叠触发区域	header | icon | disabled	-	4.9.0 (icon: 4.24.0)
  extra?: React.ReactNode;
  forceRender?: boolean;
  header?: React.ReactNode;
  key: string;
  showArrow?: boolean;
}
export function Panel(props: React.PropsWithChildren<PanelProps>) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [height, setHeight] = React.useState(0);
  const contentRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.offsetHeight + 10);
    }
  }, [contentRef.current]);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className="ant-collapse-item"
      style={{
        height: isCollapsed ? `${height + 40}px` : "40px",
        overflow: "hidden",
        transition: "height 0.3s ease",
      }}
    >
      <div
        ref={contentRef}
        onClick={handleToggle}
        style={{
          cursor: "pointer",
          height: "40px",
          backgroundColor: "#f5f5f5",
        }}
      >
        {props.header}
      </div>
      <div>
        <div className="ant-collapse-content">{props.children}</div>
      </div>
    </div>
  );
}
