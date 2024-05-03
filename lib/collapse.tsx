import { useEffect, useState, useRef } from "react";
import IconRightArrow from "./right-arrow.svg?react";
import "./collapse.css";

export interface ItemsType {
  key: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  showArrow?: boolean;
  forceRender?: boolean;
}
export interface CollapseProps {
  defaultActiveKey?: string[];
  activeKeys?: string[];
  items?: ItemsType[];
  accordion?: boolean;
  onChange?: (activeKey: string[]) => void;
}
interface KeysType {
  key: string;
  isCollapsed: boolean;
}
export function Collapse(props: CollapseProps) {
  const {
    defaultActiveKey,
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
          disabled={item.disabled}
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
  /**
   * @default false
   */
  isCollapsed: boolean;
  handleToggle: (key: string) => void;
  headerStyle?: React.CSSProperties;
  boderStyle?: React.CSSProperties;
  /**
   * @default false
   */
  disabled?: boolean;
  // extra?: React.ReactNode;
  forceRender?: boolean;
  header?: React.ReactNode;
  /**
   * control states of the expand icon and collapse icon
   * @default true
   */
  showArrow?: boolean;
}
export function Panel(props: React.PropsWithChildren<PanelProps>) {
  const {
    order,
    isCollapsed,
    header,
    disabled = false,
    showArrow = true,
    forceRender = false,
    handleToggle,
    children,
  } = props;
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.offsetHeight);
    }
  }, [contentRef.current, contentRef.current?.offsetHeight]);

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
      }}
    >
      <div
        ref={headerRef}
        className={`dar-collapse-header ${
          isCollapsed ? "dar-collapse-header-active" : ""
        }`}
        onClick={disabled ? undefined : () => handleToggle(order)}
        style={{
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          backgroundColor: "rgba(0,0,0,0.02)",
        }}
      >
        {showArrow && (
          <IconRightArrow
            style={{
              height: 20,
              width: 20,
              marginRight: 10,
              rotate: isCollapsed ? `90deg` : `0deg`,
              transition: "rotate 0.3s ease",
            }}
          />
        )}
        {header}
      </div>
      <div ref={contentRef} className="dar-collapse-content">
        {/*
         * 被隐藏时是否渲染 DOM 结构
         * 当 forceRender 为 true 时，始终渲染 DOM 结构，否则根据 isCollapsed 决定是否渲染
         */}
        <div>{forceRender ? children : isCollapsed ? children : null}</div>
      </div>
    </div>
  );
}
