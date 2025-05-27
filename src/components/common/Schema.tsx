import Script from "next/script";
import React from "react";

const SchemaScript = ({ jsonLd, id }: { jsonLd: any; id: string }) => {
  return (
    <Script
      defer
      id={id}
      strategy="lazyOnload"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
};

export default SchemaScript;
