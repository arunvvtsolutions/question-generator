"use client";

import React from 'react';
import { Skeleton } from './skeleton';
import { cn } from '@/lib/utils';

export interface ISkeletonConfig {
  id?: number;
  spaceY?: number;
  spaceX?: number;
  height?: number;
  width?: string;
  rounded?: string;
  marginTop?: string;
}

export interface IRowConfig {
    rowId?: number;
    cols?: number;
    colsSm?: number;
    colsMd?: number;
    colsLg?: number;
    marginTop?: string;
    skeletonGroups?: ISkeletonConfig[][];
    showRowsOn?: {
      sm?: number; // Number of rows to show on small screens
      md?: number; // Number of rows to show on medium screens
      lg?: number; // Number of rows to show on large screens
    };
  }
  
export interface IDynamicSkeletonUi {
  id?: number;
  rowConfigs?: IRowConfig[];
  marginTop?: string;
}

export interface DynamicSkeletonUiProps {
  data: IDynamicSkeletonUi[];
}

const DynamicSkeletonUi: React.FC<DynamicSkeletonUiProps> = ({ data }) => {
  const [screenWidth, setScreenWidth] = React.useState<number>(0); // Start with 0 (no window access)

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth); // Set width only on client
      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  React.useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getRowsToShow = (showRowsOn: { sm?: number; md?: number; lg?: number }) => {
    if (screenWidth <= 640) return showRowsOn.sm || 0; // sm screens: width <= 640px
    if (screenWidth <= 768) return showRowsOn.md || 0; // md screens: width <= 768px
    return showRowsOn.lg || 0; // lg screens: width > 768px
  };

  return (
    <>
      {data.map((item) => (
        <div
          key={item.id}
          style={{ marginTop: item.marginTop || '10px' }}
          className="space-y-6"
        >
          {item?.rowConfigs?.map((row , index) => {
            const rowsToShow = getRowsToShow(row.showRowsOn || {});
            const rowsToRender = row.skeletonGroups?.slice(0, rowsToShow) || [];

            return (
              <div
                style={{ marginTop: row.marginTop || '0px' }}
                key={index}
                className={cn(
                    'grid gap-4',
                    row.cols ? `grid-cols-${row.cols}` : 'grid-cols-6',
                    row.colsSm && `sm:grid-cols-${row.colsSm}`,
                    row.colsMd && `md:grid-cols-${row.colsMd}`,
                    row.colsLg && `lg:grid-cols-${row.colsLg}`
                  )}
              >
                {rowsToRender.map((skeletonGroup, colIndex ) => (
                  <div key={colIndex} className="space-y-4">
                    {skeletonGroup.map((skeleton , index) => (
                      <Skeleton
                      key={`skeleton-${colIndex}-${index}`}
                        style={{ marginTop: skeleton.marginTop || '10px' }}
                        className={`h-[${skeleton.height}px] w-${skeleton.width} ${skeleton.rounded} space-x-${skeleton.spaceX} mt-[${skeleton.marginTop}px]`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};

export default DynamicSkeletonUi;
