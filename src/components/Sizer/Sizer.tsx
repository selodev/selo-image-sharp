import { FunctionalComponent, h } from '@stencil/core';
import { SizerProps } from '../../utils/models';

export const Sizer: FunctionalComponent<SizerProps> = ({ layout, width, height }) => {
  if (layout === `fullWidth`) {
    return <div aria-hidden style={{ paddingTop: `${(height / width) * 100}%` }} />;
  }
  if (layout === `constrained`) {
    return (
      <div style={{ maxWidth: width + 'px', display: `block` }}>
        <img
          alt=""
          role="presentation"
          aria-hidden="true"
          src={`data:image/svg+xml;charset=utf-8,%3Csvg height='${height}' width='${width}' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E`}
          style={{
            maxWidth: `100%`,
            display: `block`,
            position: `static`,
          }}
        />
      </div>
    );
  }

  return null;
};
