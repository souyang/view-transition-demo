"use client";

import { useCallback, useRef, type KeyboardEvent, type ReactNode } from "react";

export interface AccessibleTab {
  id: string;
  label: string;
  content: ReactNode;
}

interface AccessibleTabsProps {
  tabs: AccessibleTab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  tabListClassName?: string;
  tabClassName?: string;
  tabActiveClassName?: string;
  tabPanelClassName?: string;
}

/**
 * Accessible tabs component following ARIA Authoring Practices.
 * Supports keyboard navigation: Arrow Left/Right, Home/End.
 */
export default function AccessibleTabs({
  tabs,
  activeTabId,
  onTabChange,
  tabListClassName = "",
  tabClassName = "",
  tabActiveClassName = "",
  tabPanelClassName = "",
}: AccessibleTabsProps) {
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
      let newIndex = currentIndex;

      switch (e.key) {
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
          break;
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
          break;
        case "Home":
          e.preventDefault();
          newIndex = 0;
          break;
        case "End":
          e.preventDefault();
          newIndex = tabs.length - 1;
          break;
        default:
          return;
      }

      onTabChange(tabs[newIndex].id);
      const buttons = tabListRef.current?.querySelectorAll('[role="tab"]');
      (buttons?.[newIndex] as HTMLElement)?.focus();
    },
    [tabs, onTabChange]
  );

  const activeIndex = tabs.findIndex((t) => t.id === activeTabId);

  return (
    <>
      <div
        ref={tabListRef}
        role="tablist"
        className={tabListClassName}
        aria-label="Documentation sections"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            tabIndex={activeTabId === tab.id ? 0 : -1}
            aria-selected={activeTabId === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`${tabClassName} ${activeTabId === tab.id ? tabActiveClassName : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          aria-hidden={activeTabId !== tab.id}
          hidden={activeTabId !== tab.id}
          className={tabPanelClassName}
        >
          {activeTabId === tab.id ? tab.content : null}
        </div>
      ))}
    </>
  );
}
