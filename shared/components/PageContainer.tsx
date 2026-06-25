import { ComponentPropsWithRef } from 'react';
import { cn } from '../lib/utils';

export default function PageContainer({
  className,
  children,
  ...props
}: ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn('flex min-h-svh w-full items-center justify-center p-6 md:p-10', className)}
      {...props}
    >
      {children}
    </div>
  );
}
