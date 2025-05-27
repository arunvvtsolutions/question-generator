"use client";
import React, { useEffect, useState } from "react";
import TransactionHistory, { Transaction } from "./TransactionTable";
import { useSelector } from "@/store";
import { getTransactionHistory } from "@/utils/api/dashboard";

const PaymentHistory = () => {
  const { user, isAuthenticated, isInitialized } = useSelector(
    (state) => state.authReducer
  );
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);
  useEffect(() => {
    if (isInitialized && isAuthenticated && user) {
      const getData = async () => {
        const data = await getTransactionHistory(user.id);
        setTransactionData(data.data);
      };
      getData();
    }
  }, [isAuthenticated, isInitialized, user]);
  
  return (
    <div className="container lg:py-6 py-4">
      <TransactionHistory transactions={transactionData} />
    </div>
  );
};

export default PaymentHistory;
