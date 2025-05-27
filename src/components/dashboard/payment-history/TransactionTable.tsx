import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { TransactionTitles } from '@/service/enums/texts';

export interface Transaction {
  totalAmount: string;
  paidAmount: string;
  orderId: string;
  trackingId: string;
  orderStatus: string;
  paymentMode: string | null;
  updatedDate: string;
  products: {
    productName: string;
    tokens: number;
  };
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}
const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
}) => {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-between items-center w-full  lg:mb-[30px] mb-[15px]">
        <h1 className="lg:text-[40px] dark:text-[#fff] text-[#000] text-[20px]">
          {TransactionTitles.TRANSACTION_HISTORY}
        </h1>

        <div title="Back To Home">
          <Button
            ariaLabel=""
            dataTestId=""
            onClick={() => router.push('/')}
            text="Home"
            startIcon={<ChevronLeftIcon />}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          {/* <TableCaption className='dark:text-[#fff]/50  text-[#000]/50 text-[13px]'>{TransactionTitles.A_LIST_RECENT_TRANSACTION}</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold lg:text-[19px] text-[16px] text-[#101010] dark:text-[#fff]">
                {TransactionTitles.S_N}
              </TableHead>

              <TableHead className="text-left whitespace-nowrap font-bold lg:text-[19px] text-[16px] text-[#101010] dark:text-[#fff]">
                {TransactionTitles.TRACKING_ID}
              </TableHead>
              <TableHead className="text-left whitespace-nowrap font-bold lg:text-[19px] text-[16px] text-[#101010]  dark:text-[#fff]">
                {TransactionTitles.PACKAGE}
              </TableHead>
              <TableHead className="text-left whitespace-nowrap font-bold lg:text-[19px] text-[16px] text-[#101010] dark:text-[#fff] ">
                {TransactionTitles.PAYMENT_TYPE}
              </TableHead>
              <TableHead className="text-center whitespace-nowrap font-bold lg:text-[19px] text-[16px] text-[#101010] dark:text-[#fff]">
                {TransactionTitles.AMOUNT}
              </TableHead>
              <TableHead className="text-center whitespace-nowrap font-bold lg:text-[19px] text-[16px] text-[#101010] dark:text-[#fff]">
                {TransactionTitles.DATE}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 ? (
              transactions?.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell className="lg:py-[12px] py-[8px] whitespace-nowrap  font-medium lg:text-[15px] text-[13px] text-[#101010] text-opacity-60 dark:text-[#fff]">
                    {index + 1}
                  </TableCell>

                  <TableCell className="lg:py-[12px] py-[8px] text-left whitespace-nowrap font-medium lg:text-[15px] text-[13px] text-[#101010] text-opacity-60 dark:text-[#fff]">
                    {transaction.trackingId || 'NA'}
                  </TableCell>
                  <TableCell className="lg:py-[12px] py-[8px] text-left  whitespace-nowrap font-medium lg:text-[15px] text-[13px] text-[#101010] text-opacity-60 dark:text-[#fff]">
                    {transaction.products.productName || 'NA'}
                  </TableCell>
                  <TableCell className="lg:py-[12px] py-[8px] text-left whitespace-nowrap font-medium lg:text-[15px] text-[13px] text-[#101010] text-opacity-60 dark:text-[#fff]">
                    {transaction.paymentMode || 'NA'}
                  </TableCell>
                  <TableCell className="lg:py-[12px] py-[8px] text-center whitespace-nowrap font-medium lg:text-[15px] text-[13px] text-[#101010] text-opacity-60 dark:text-[#fff]">
                    ₹{transaction.paidAmount || 'NA'}
                  </TableCell>
                  <TableCell className="lg:py-[12px] py-[8px] text-center whitespace-nowrap font-medium lg:text-[15px] text-[13px] text-[#101010] text-opacity-60 dark:text-[#fff]">
                    {new Date(transaction.updatedDate).toLocaleDateString() ||
                      'NA'}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <>
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="lg:pb-[12px] py-[8px] !pt-[40px] whitespace-nowrap  font-medium lg:text-[15px] text-[13px] text-[#101010] text-opacity-60 dark:text-[#fff] text-center mt-5"
                  >
                    {TransactionTitles.NO_DATA_FOUND}
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionHistory;
