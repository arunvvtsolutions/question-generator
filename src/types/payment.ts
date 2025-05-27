export interface IPaymentInitializeProps {
  productId: number;
  type: number;
  planAmount: string;
  discountAmount: string;
  totalAmount: string;
  paidAmount: string;
  couponId: number | null;
  orderId: string;
  trackingId: string;
  bankReference?: string;
  orderStatus: string;
  paymentMode: string | null;
  billingName?: string;
  phoneNo?: number;
}

export interface IUpdatePaymentProps {
  bankReference: string;
  orderStatus: string;
  failureMessage: string;
  paymentMode: string;
  cancelMessage: string;
  paidAmount: string;
  otherDetails: string;
}

export interface IPaymentProducts {
  id: number;
  productName: string;
  shortDescription: string;
  amount: number;
  tokens: number;
  predictorType: number;
  description: string;
  deleteStatus: number;
  status: number;
  planStatus: number | null;
  discounts:number
}
