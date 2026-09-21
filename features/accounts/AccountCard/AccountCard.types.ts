import { ReactNode } from 'react';

export interface InstitutionTagProps {
  /** Name of the bank or institution tag (e.g., "Nubank", "Banco Inter") */
  description: string;
  /** Hex color for branding (e.g., "#8A05BE") */
  color?: string;
}

export interface AccountInformationProps {
  /** Title or account label */
  accountName: string;
  /** Pre-rendered icon node or standard icon key */
  icon?: ReactNode;
  /** Slot for rendering branding tags or badges */
  tag?: ReactNode;
}

export interface BalanceDisplayProps {
  /** Pre-formatted balance text string (e.g., "R$ 1.250,00") */
  formattedBalance: string;
  /** Optional custom label above the balance (defaults to "Current Balance") */
  label?: string;
}

export interface AccountCardProps {
  accountName: string;
  description?: string;
  formattedBalance: string;
  icon?: ReactNode;
  color?: string;
  onClick?: () => void;
}
