import React, { ReactNode } from 'react';

interface TabProps {
  children: ReactNode;
  active?: boolean;
}

interface TabListProps {
  children: ReactNode;
}

interface TabPanelProps {
  children: ReactNode;
  active?: boolean;
}

interface TabsProps {
  children: ReactNode;
  activeTab: number;
  onChange: (index: number) => void;
}

export const Tab = ({ children }: TabProps) => {
  return <>{children}</>;
};

export const TabList = ({ children }: TabListProps) => {
  return <div className="flex border-b border-gray-200">{children}</div>;
};

export const TabPanel = ({ children, active }: TabPanelProps) => {
  if (!active) return null;
  return <>{children}</>;
};

export const Tabs = ({ children, activeTab, onChange }: TabsProps) => {
  const tabs: ReactNode[] = [];
  const panels: ReactNode[] = [];

  let tabList: ReactNode | null = null;

  // Separate tabs and panels
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    if (child.type === TabList) {
      // Get tabs from TabList
      const tabElements = React.Children.toArray(child.props.children)
        .filter(React.isValidElement)
        .filter((element) => element.type === Tab);

      // Clone TabList with modified tabs
      tabList = React.cloneElement(
        child,
        {},
        tabElements.map((tab, index) => {
          const isActive = index === activeTab;
          return (
            <button
              key={index}
              onClick={() => onChange(index)}
              className={`px-4 py-2 border-b-2 text-sm font-medium flex items-center ${
                isActive
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.props.children}
            </button>
          );
        })
      );
    } else if (child.type === TabPanel) {
      panels.push(
        React.cloneElement(child, {
          key: panels.length,
          active: panels.length === activeTab,
        })
      );
    }
  });

  return (
    <div>
      {tabList}
      <div>{panels}</div>
    </div>
  );
};