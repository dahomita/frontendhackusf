import React from 'react';
import styled, { css } from 'styled-components';

// Styled Card components
const StyledCard = styled.div`
  background-color: white;
  border-radius: var(--radius-md);
  box-shadow: ${props => props.elevation === 'high' 
    ? 'var(--shadow-lg)' 
    : props.elevation === 'low' 
      ? 'var(--shadow-sm)' 
      : 'var(--shadow-md)'
  };
  overflow: hidden;
  transition: var(--transition-normal);
  border: ${props => props.bordered ? `1px solid var(--neutral-200)` : 'none'};

  ${props => props.interactive && css`
    cursor: pointer;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }
    
    &:active {
      transform: translateY(-2px);
    }
  `}
  
  ${props => props.fullWidth && css`
    width: 100%;
  `}
`;

const CardHeader = styled.div`
  padding: ${props => props.compact ? '1rem' : '1.5rem'};
  border-bottom: ${props => props.divider ? '1px solid var(--neutral-200)' : 'none'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: ${props => props.compact ? '1.1rem' : '1.25rem'};
  font-weight: 600;
  color: var(--neutral-900);
`;

const CardContent = styled.div`
  padding: ${props => props.compact ? '1rem' : '1.5rem'};
  ${props => props.noPadding && css`
    padding: 0;
  `}
`;

const CardFooter = styled.div`
  padding: ${props => props.compact ? '1rem' : '1.5rem'};
  border-top: 1px solid var(--neutral-200);
  display: flex;
  justify-content: ${props => props.align === 'right' 
    ? 'flex-end' 
    : props.align === 'center' 
      ? 'center' 
      : 'space-between'
  };
  align-items: center;
  gap: 1rem;
`;

/**
 * A versatile Card component that can be used for various content displays
 * @param {Object} props - Component props
 * @param {string} [props.elevation='medium'] - Shadow intensity ('low', 'medium', 'high')
 * @param {boolean} [props.interactive=false] - Whether the card has hover effects
 * @param {boolean} [props.bordered=false] - Whether the card has a border
 * @param {boolean} [props.fullWidth=false] - Whether the card takes full width
 * @param {Function} [props.onClick] - Click handler (also makes card interactive)
 * @param {ReactNode} [props.children] - Card content
 * @returns {JSX.Element} Card component
 */
const Card = ({ 
  elevation = 'medium',
  interactive = false,
  bordered = false,
  fullWidth = false,
  onClick,
  children,
  ...rest
}) => {
  // If onClick is provided, make the card interactive
  const isInteractive = interactive || !!onClick;
  
  return (
    <StyledCard
      elevation={elevation}
      interactive={isInteractive}
      bordered={bordered}
      fullWidth={fullWidth}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledCard>
  );
};

/**
 * Card Header component for titles and actions
 * @param {Object} props - Component props
 * @param {boolean} [props.divider=true] - Whether to show a divider below the header
 * @param {boolean} [props.compact=false] - Whether to use compact padding
 * @param {ReactNode} [props.title] - Header title
 * @param {ReactNode} [props.action] - Action elements (e.g., buttons)
 * @param {ReactNode} [props.children] - Header content (alternative to title/action)
 * @returns {JSX.Element} Card Header component
 */
Card.Header = ({ 
  divider = true, 
  compact = false, 
  title, 
  action, 
  children,
  ...rest
}) => {
  return (
    <CardHeader divider={divider} compact={compact} {...rest}>
      {children || (
        <>
          {title && <CardTitle compact={compact}>{title}</CardTitle>}
          {action}
        </>
      )}
    </CardHeader>
  );
};

/**
 * Card Content component for main content
 * @param {Object} props - Component props
 * @param {boolean} [props.compact=false] - Whether to use compact padding
 * @param {boolean} [props.noPadding=false] - Whether to remove padding entirely
 * @param {ReactNode} [props.children] - Content
 * @returns {JSX.Element} Card Content component
 */
Card.Content = ({ 
  compact = false, 
  noPadding = false,
  children,
  ...rest
}) => {
  return (
    <CardContent compact={compact} noPadding={noPadding} {...rest}>
      {children}
    </CardContent>
  );
};

/**
 * Card Footer component for actions or summary
 * @param {Object} props - Component props
 * @param {boolean} [props.compact=false] - Whether to use compact padding
 * @param {string} [props.align='between'] - Alignment of footer items ('between', 'center', 'right')
 * @param {ReactNode} [props.children] - Footer content
 * @returns {JSX.Element} Card Footer component
 */
Card.Footer = ({ 
  compact = false, 
  align = 'between',
  children,
  ...rest
}) => {
  return (
    <CardFooter compact={compact} align={align} {...rest}>
      {children}
    </CardFooter>
  );
};

export default Card; 