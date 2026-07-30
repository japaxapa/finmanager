import { FinIconType, finIcons } from './FinIcons.data';

export default function FinIcon(icon: FinIconType | string) {
  if (icon in finIcons) {
    return finIcons[icon as keyof typeof finIcons];
  }
  return finIcons.money;
}
