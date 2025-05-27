import React, { useEffect } from 'react';
// math jax
import { MathJax } from 'better-react-mathjax';

const MathJaxRender = ({ data }: any) => {
    // const sanitizedData = data.trim().replace(/<br\s*\/?>/g, '');
    return (
        <>
            {data && (
                <MathJax dynamic inline>
                    <span className="mathjaxContent" dangerouslySetInnerHTML={{ __html: data }}></span>
                </MathJax>
            )}
        </>
    );
};

export default MathJaxRender;