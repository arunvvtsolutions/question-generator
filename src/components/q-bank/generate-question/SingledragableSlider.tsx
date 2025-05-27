import React, { memo } from 'react'
import { cn } from '@/lib/utils'
import { Slider } from '@/components/ui/slider'

interface CumulativeExamInfoProps {
  value: number
  maxValue?: number
  className?: string
  error?: string
  step?: number
  setValue: (value: number) => void
}

const SingledragableSlider: React.FC<CumulativeExamInfoProps> = ({
  value,
  maxValue = 100,
  className,
  error,
  step = 5,
  setValue,
}) => {
  // Determine color and label based on the value
  const getColorAndLabel = (value: number) => {
    if (value <= 49)
      return { colorClass: '!bg-green-500 dark:!bg-green-300', label: 'Easy' }
    if (value <= 75)
      return { colorClass: '!bg-yellow-500 dark:!bg-yellow-300', label: 'Medium' }
    return { colorClass: '!bg-red-500 dark:!bg-red-500', label: 'Hard' }
  }

  const { colorClass, label } = getColorAndLabel(value)

  return (
    <div className={`w-full max-w-[450px] mx-auto lg:mb-5 mb-3 ${className}`}>
      {/* <div className="flex items-center lg:mb-4 mb-2">
        <span
          className={`w-[10px] h-[10px] rounded-full mr-2 flex-shrink-0 ${colorClass}`}
        ></span>
        <span className="lg:text-[15px] text-[14px] tracking-[0.40px]">
          {label}
        </span>
      </div> */}

      <div className="w-full  items-center">
        <Slider
          value={[value ?? 0]}
          max={maxValue}
          step={step}
          className={cn('w-full h-2')}
          rangeClassName={colorClass}
          onValueChange={(val) => setValue(val[0])}
        />
        {/* <p className="flex lg:text-[14px] text-[13px] text-[#101010]/[80%] dark:text-[#fff]/[80%] font-semibold ml-2 w-[40px]">
          {Math.round(value)}
          <span className="mx-[0.5px]">/</span> {maxValue}
        </p> */}
      </div>
      {error && (
        <p className="text-[#f04749] font-[500] text-[14px] mx-2 mt-0">
          {error}
        </p>
      )}
    </div>
  )
}

export default memo(SingledragableSlider)
