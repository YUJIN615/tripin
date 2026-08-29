"use client";

export const Tab = ({
  selectedTab,
  setSelectedTab,
  TabList,
}: {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  TabList: { title: string; value: string }[];
}) => {
  return (
    <div className="flex gap-2">
      {TabList.map((tab) => {
        const isActive = selectedTab === tab.value;

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => setSelectedTab(tab.value)}
            className={`flex-1 py-2.5 rounded-chip font-mono text-[11px] font-semibold tracking-[0.08em] transition-colors ${
              isActive ? "bg-ink text-white" : "bg-white border border-line text-muted"
            }`}
          >
            {tab.title}
          </button>
        );
      })}
    </div>
  );
};
