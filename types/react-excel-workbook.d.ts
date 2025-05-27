declare module 'react-excel-workbook' {
  import * as React from 'react';

  interface WorkbookProps {
    filename: string;
    element: JSX.Element;
    children: React.ReactNode;
  }

  interface SheetProps<T = any> {
    name: string;
    data: T[];
    children: React.ReactNode;
  }

  interface ColumnProps<T = any> {
    label: string;
    value: keyof T | ((row: T) => string | number);
  }

  export class Workbook extends React.Component<WorkbookProps> {
    static Sheet: React.FC<SheetProps>;
    static Column: React.FC<ColumnProps>;
  }

  export default Workbook;
}
