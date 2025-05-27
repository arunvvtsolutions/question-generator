'use client';
import React, { useState } from 'react';
import PricingCard from './PricingCard';
import Slider, { Settings } from 'react-slick';
import { IPaymentProducts } from '@/types/payment';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { paymentInitialization, postPhonePePayment } from '@/utils/api/payment';
import { useSelector } from '@/store';
import { toast } from '@/components/ui/use-toast';
import { CS_BASE_URL } from '@/config';
import { encrypt } from '@/utils';
import { ERROR, PAYMENT } from '@/service/enums/texts';

// color data
const colorData: any = {
  0: {
    bgColor: 'bg-[#CCFDD0]',
    btnColor: 'bg-[#0B6049]',
  },
  1: {
    bgColor: 'bg-[#C2D6FF]',
    btnColor: 'bg-[#3b82f6]',
  },
  2: {
    bgColor: 'bg-[#FFE1C3]',
    btnColor: 'bg-[#f97316]',
  },
};

const Pricing = ({ products }: { products: IPaymentProducts[] }) => {
  const router = useRouter();
  const { user } = useSelector((state) => state.authReducer);

  const [inputCoupen, setInputCoupen] = useState<string>('');

  const handleEnterCoupen = (e: any) => {
    setInputCoupen(e.target.value);
  };

  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  const paymentHanlder = async (
    amount: number,
    coupon: { id: number; amount: number },
    productId: number
  ) => {
    try {
      const transactionId = `${uuidv4().substring(0, 35)}`;
      const orderId = Math.floor(Math.random() * 99999) + 10000;
      await paymentInitialization({
        orderId: String(orderId),
        trackingId: transactionId,
        billingName: user?.name,
        couponId: coupon.id || null,
        discountAmount: `${coupon.amount}`,
        orderStatus: PAYMENT.PAYMENT_INITIALIZED,
        paidAmount: "0",
        paymentMode: null,
        phoneNo: user?.phone,
        planAmount: `${amount}`,
        productId,
        totalAmount: `${amount - coupon.amount}`,
        type: 1,
      });

      const tokenData = {
        userId: user?.id,
        phone: user?.phone,
        amount,
        transactionId,
        orderId,
        coupon: {id: 0, amount: 0},
        paymentType : process.env.NEXT_PUBLIC_PAYMENT_MODE,
        platForm: process.env.NEXT_PUBLIC_EDU_PORTAL
      };
      const encrypted = await encrypt(
        JSON.stringify(tokenData),
        process.env.NEXT_PUBLIC_PHONE_PE_ENC_PASSWORD || ''
      );
      router.push(
        `${CS_BASE_URL}/payment/integrate?iv=${encrypted.iv}&enc=${encrypted.encrypted}`
      );
    } catch (error) {
      toast({
        title: ERROR.SOMETHING_WENT_WRONG,
        variant: 'destructive',
        description: ERROR.PAYMENT_FAILED,
      });
    }
  };

  return (
    <div className="max-w-[1100px] m-auto px-[10px] ">
      <Slider {...settings} className="mx-[-10px] mb-[10px">
        {products.map((plan, index) => (
          <div key={index} className="px-[10px]">
            <PricingCard
              plan={plan}
              colorData={colorData[index]}
              inputCoupen={inputCoupen}
              handleEnterCoupen={handleEnterCoupen}
              onSubmit={paymentHanlder}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Pricing;
