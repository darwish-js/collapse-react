import { useEffect, useState, useRef } from "react";
import IconRightArrow from "./right-arrow.svg?react";
import "./collapse.css";

export interface ItemsType {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
  showArrow?: boolean;
  forceRender?: boolean;
}
export interface CollapseProps {
  size?: "small" | "default" | "large";
  defaultActiveKey?: string[];
  activeKeys?: string[];
  items?: ItemsType[];
  accordion?: boolean;
  collapsible?: "header" | "icon" | "disabled";
  onChange?: (activeKey: string[]) => void;
}
interface KeysType {
  key: string;
  isCollapsed: boolean;
}
export function Collapse(props: CollapseProps) {
  const {
    defaultActiveKey,
    collapsible = "header",
    size = "default",
    activeKeys,
    accordion,
    items = [],
    onChange,
  } = props;
  const [keys, setKeys] = useState<KeysType[]>(() =>
    // const ks =
    items.map((item) => ({
      key: item.key,
      isCollapsed: defaultActiveKey?.includes(item.key) ?? false,
    }))
  );

  const handleToggle = (key: string) => {
    setKeys((prevKeys) => {
      const prevKS = prevKeys.map((item) =>
        item.key === key
          ? { key: item.key, isCollapsed: !item.isCollapsed }
          : { key: item.key, isCollapsed: accordion ? false : item.isCollapsed }
      );
      onChange?.(
        prevKS
          .map((item) => item.key)
          .filter((_, index) => prevKS[index].isCollapsed)
      );
      return prevKS;
    });
  };

  return (
    <div className="dar-collapse">
      {items.map((item, index) => (
        <Panel
          order={item.key}
          key={item.key}
          size={size}
          collapsible={collapsible}
          isCollapsed={keys[index].isCollapsed}
          handleToggle={handleToggle}
          header={item.label}
          forceRender={true}
          children={item.children}
        />
      ))}
    </div>
  );
}
export interface PanelProps {
  // collapsible	是否可折叠或指定可折叠触发区域	header | icon | disabled	-	4.9.0 (icon: 4.24.0)
  order: string;
  /**
   * @default false
   */
  isCollapsed: boolean;
  size: "small" | "default" | "large";
  collapsible: "header" | "icon" | "disabled";
  handleToggle: (key: string) => void;
  headerStyle?: React.CSSProperties;
  boderStyle?: React.CSSProperties;
  // extra?: React.ReactNode;
  forceRender?: boolean;
  header?: React.ReactNode;
  /**
   * control states of the expand icon and collapse icon
   * @default true
   */
  showArrow?: boolean;
}
const headerMap = {
  small: "8px 12px",
  default: "12px 16px",
  large: "16px 20px",
};
const contentMap = {
  small: "12px",
  default: "16px",
  large: "24px",
};
export function Panel(props: React.PropsWithChildren<PanelProps>) {
  const {
    order,
    isCollapsed,
    header,
    showArrow = true,
    size,
    collapsible,
    forceRender = false,
    handleToggle,
    children,
  } = props;
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(contentRef.current?.offsetHeight);
    if (contentRef.current) {
      setHeight(contentRef.current.offsetHeight);
    }
  }, [children, contentRef.current?.offsetHeight, isCollapsed, header, size]);

  let headerCursor = "default";
  if (collapsible === "disabled") {
    headerCursor = "not-allowed";
  } else if (collapsible === "header") {
    headerCursor = "pointer";
  }

  return (
    <div
      className="dar-collapse-item"
      style={{
        height:
          isCollapsed && headerRef.current
            ? `${height + headerRef.current.offsetHeight}px`
            : `${headerRef.current?.offsetHeight ?? 0}px`,
        overflow: "hidden",
        transition: "height 0.3s ease",
        fontSize: size === "large" ? "16px" : "14px",
      }}
    >
      <div
        ref={headerRef}
        className={`dar-collapse-header ${
          isCollapsed ? "dar-collapse-header-active" : ""
        }`}
        onClick={
          collapsible === "header" ? () => handleToggle(order) : undefined
        }
        style={{
          cursor: headerCursor,
          color: collapsible === "disabled" ? "rgba(0,0,0,0.25)" : "black",
          padding: `${headerMap[size]}`,
          backgroundColor: "rgba(0,0,0,0.02)",
        }}
      >
        {showArrow && (
          <IconRightArrow
            onClick={
              collapsible === "icon" ? () => handleToggle(order) : undefined
            }
            style={{
              height: 16,
              width: 16,
              marginRight: 10,
              cursor: collapsible === "disabled" ? "not-allowed" : "pointer",
              opacity: collapsible === "disabled" ? "0.25" : "1",
              rotate: isCollapsed ? `90deg` : `0deg`,
              transition: "rotate 0.3s ease",
            }}
          />
        )}
        {header}
      </div>
      <div
        ref={contentRef}
        className="dar-collapse-content"
        style={{
          padding: `${contentMap[size]}`,
        }}
      >
        {/*
         * 被隐藏时是否渲染 DOM 结构
         * 当 forceRender 为 true 时，始终渲染 DOM 结构，否则根据 isCollapsed 决定是否渲染
         */}
        <div>{children}</div>
      </div>
    </div>
  );
}
