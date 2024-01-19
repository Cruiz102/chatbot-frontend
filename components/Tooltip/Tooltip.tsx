
import React, { useState, useRef } from 'react';

interface TooltipProps {
  content: string; // The text to display in the tooltip
  children: React.ReactNode; // The element to hover over
  position?: 'top' | 'bottom' | 'left' | 'right'; // Tooltip position
}

const Tooltip = ({ content, children, position = 'top' }: TooltipProps) => {
  const [show, setShow] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => setShow(true);
  const hideTooltip = () => setShow(false);

  // Positioning logic here (optional)

  return (
    <div onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {show && (
        <div ref={tooltipRef} style={{ position: 'absolute' }}>
          {content}
          {/* Additional styling based on the 'position' prop */}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
