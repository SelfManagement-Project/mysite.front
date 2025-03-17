// TransactionList.tsx
import { useTransactionList } from "@/hooks/finance/modal/useTransactionList";

const TransactionList = ({ onClose }: { onClose: () => void }) => {
  const {

  } = useTransactionList();

  return (
    <div >
      내용용
      <button onClick={onClose}>X</button>
    </div>
  );
};

export default TransactionList;