import NextLink from 'next/link';
import { Link as ViewTransitionLink } from 'next-view-transitions';
import { forwardRef } from 'react';

/**
 * Enhanced Link component with View Transitions API support
 * 
 * Usage:
 * - Use this component instead of next/link for smooth page transitions
 * - Supports all Next.js Link props (href, prefetch, etc.)
 * - Automatically applies View Transitions API when supported by the browser
 * 
 * @example
 * <Link href="/about">About</Link>
 * <Link href="/contact" className="btn">Contact</Link>
 */

type LinkProps = React.ComponentPropsWithoutRef<typeof NextLink>;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, ...props }, ref) => {
    return (
      <ViewTransitionLink ref={ref} {...props}>
        {children}
      </ViewTransitionLink>
    );
  }
);

Link.displayName = 'Link';
