import { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { markVaultIntent, runVaultOpening } from "./vault-entry";

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
  children: ReactNode;
}

/**
 * The single entry point used by every intentional Forge Vault link, so the
 * canonical opening transition plays no matter where the user came from.
 * Modified clicks and middle clicks stay native.
 */
const VaultLink = ({ to, children, className = "", onClick, ...rest }: Props) => {
  const navigate = useNavigate();

  const handle = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;

    event.preventDefault();
    markVaultIntent();
    runVaultOpening(() => navigate(to));
  };

  return (
    <a href={to} onClick={handle} className={`vault-activate ${className}`} {...rest}>
      {children}
    </a>
  );
};

export default VaultLink;
