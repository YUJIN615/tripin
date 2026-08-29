/**
 * 1px 간격으로 묶인 흰 행 목록
 * 행 사이의 1px은 배경(hairline)이 비쳐 보이는 방식입니다.
 */
export const ListGroup = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <ul className={`flex flex-col gap-px bg-hairline rounded-group overflow-hidden ${className}`}>
      {children}
    </ul>
  );
};

/** ListGroup 안의 흰 행 */
export const ListRow = ({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <li className={`bg-white px-4 py-3.5 ${className}`} onClick={onClick}>
      {children}
    </li>
  );
};
