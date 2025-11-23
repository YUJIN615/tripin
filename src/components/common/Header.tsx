type HeaderProps = {
  title?: string;
};

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center px-[16px] py-[12px]">
      <h1 className="w-full text-l font-bold text-center">{title}</h1>
    </header>
  );
};
