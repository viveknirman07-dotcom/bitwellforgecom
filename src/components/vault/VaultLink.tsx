import { AnchorHTMLAttributes, MouseEvent, ReactNode, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  DEPART_MS,
  beginDeparture,
  endDeparture,
  markVaultIntent,
  prefersReducedMotion,
} from "./vault-entry";

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
  children: ReactNode;
}

/**
 * The single entry point used by every intentional Forge Vault link. It gives
 * the activated element a near-imperceptible response, lets the current page
 * recede, then navigates. Modified clicks and middle clicks stay native.
 */
const VaultLink = ({ to, children, className = "", onClick, ...rest }: Props) => {
  const navigate = useNavigate();
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handle = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;

    event.preventDefault();
    markVaultIntent();

    if (prefersReducedMotion()) {
      navigate(to);
      return;
    }

    beginDeparture();
    timer.current = window.setTimeout(() => {
      navigate(to);
      // Safety net in case the destination never mounts.
      timer.current = window.setTimeout(endDeparture, 1200);
    }, DEPART_MS);
  };

  return (
    <a href={to} onClick={handle} className={`vault-activate ${className}`} {...rest}>
      {children}
    </a>
  );
};

export default VaultLink;
