export const Tab = ({
  selectedTab,
  setSelectedTab,
  TabList,
}: {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  TabList: { title: string; value: string }[];
}) => {
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <ul className="flex justify-between items-center">
      {TabList.map((tab) => (
        <li style={{ width: `${100 / TabList.length}%` }} className={`text-center w-full`} key={tab.value}>
          <button
            className={`text-sm py-4 w-full ${
              selectedTab === tab.value
                ? "border-b-2 border-blue-500 text-blue-500 font-bold"
                : "border-b border-gray-200 text-gray-500"
            }`}
            onClick={() => handleTabClick(tab.value)}
          >
            {tab.title}
          </button>
        </li>
      ))}
    </ul>
  );
};
