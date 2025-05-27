declare module 'html-docx-js' {
  const htmlDocx: {
    asBlob: (html: string, options?: any) => Blob;
    asBase64: (html: string, options?: any) => string;
    asArrayBuffer: (html: string, options?: any) => ArrayBuffer;
  };

  export default htmlDocx;
}
