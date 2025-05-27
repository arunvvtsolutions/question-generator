import { PRICING_TITLES } from '@/service/enums/texts';
import { IPaymentProducts } from '@/types/payment';
import React, { FC } from 'react';

interface ICardPricingCards {
  plan: IPaymentProducts;
  colorData: { bgColor: string; btnColor: string };
  inputCoupen: string;
  handleEnterCoupen: (e: any) => void;
  onSubmit: (
    amout: number,
    coupon: { id: number; amount: number },
    productId: number
  ) => void;
}

const PricingCard: FC<ICardPricingCards> = ({
  plan,
  colorData,
  inputCoupen,
  handleEnterCoupen,
  onSubmit,
}) => {
  const newTokens = plan.tokens * 2;
  return (
    <div
      data-id={`pricing-card-${plan.id}`}
      className={`${colorData.bgColor} p-[20px] lg:p-[30px] rounded-[25px] lg:h-[345px] h-[325px] relative`}
    >
      <div className="flex items-center justify-between mb-[20px]">
        <h2 className="text-xl font-semibold !text-[#101010] dark:!text-[#101010]">
          {plan.productName}
        </h2>
        {/* <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <Tag size={12} />
          Limited Offer
        </span> */}
      </div>

      <div className="flex flex-col mb-[25px]">
        <div className="flex items-center">
          <p className="text-4xl font-bold mb-1 text-[#101010] dark:text-[#101010] me-1">
            {`₹ ${plan.amount}`}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-md font-medium text-gray-500 line-through">
            /{plan.discounts} {PRICING_TITLES.DOUBTS}
          </p>
          <div className="flex items-center gap-2">
            <p className="text-md font-medium text-green-600">
              /{plan.tokens} {PRICING_TITLES.DOUBTS}
            </p>
            <span className="bg-white text-green-700 text-xs px-2 py-0.5 rounded-full">
              2x More
            </span>
          </div>
        </div>
      </div>

      {/* Coupon section - commented out as in original */}
      {/* <div>
        <p className="text-[16px] font-normal text-[#101010] mb-[10px]">
          {PRICING_TITLES.APPLY}
        </p>
        <div className="flex py-1 h-[42px] px-[1px] justify-center items-center mb-4 bg-white rounded-[12px] relative pr-[70px]">
          <input
            type="text"
            value={inputCoupen}
            placeholder={plan.inputPlaceholder}
            className="bg-white text-[#101010] text-sm focus:outline-none w-full px-[10px]"
            onChange={(e) => handleEnterCoupen(e)}
          />
          <button
            className={`${colorData.btnColor} rounded-tl-[0px] rounded-tr-[10px] rounded-br-[10px] rounded-bl-[0px] text-white p-2 text-sm absolute right-[3px] top-2/4 -translate-y-1/2`}
          >
            {PRICING_TITLES.APPLY}
          </button>
        </div>
      </div> */}

      <button
        className="bg-[#000] p-[14px] text-white mt-[24px] rounded-[15px] text-[16px] font-semibold absolute lg:w-[84%] w-[87%] bottom-[20px] -translate-x-1/2 left-2/4 hover:bg-[#000000ea] tracking-[0.40px]"
        onClick={() => onSubmit(plan.amount, { id: 0, amount: 0 }, plan.id)}
      >
        {PRICING_TITLES.BUYNOW}
      </button>
    </div>
  );
};

export default PricingCard;
