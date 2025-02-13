'use client';

import { ComponentProps, createContext, useContext } from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { tv, VariantProps } from 'tailwind-variants';

import { cn } from '@/lib/utils';
import { toggleVariants } from '@/ui/toggle';

const toggleGroupVariants = tv({
  extend: toggleVariants,
  slots: {
    root: 'group/toggle-group flex items-center justify-center rounded-md data-[variant=outline]:shadow-xs',
    item: 'cursor-pointer hover:opacity-75',
  },
  variants: {
    variant: {
      default: {
        item: 'min-w-0 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l',
      },
      spaced: {
        item: 'rounded-sm',
      },
    },
  },
});

const ToggleGroupContext = createContext<VariantProps<typeof toggleGroupVariants>>({
  size: 'default',
  variant: 'default',
});

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: ComponentProps<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleGroupVariants>) {
  const context = useContext(ToggleGroupContext);
  const { root } = toggleGroupVariants({ variant: context.variant || variant, size: context.size || size });

  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(root(), className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleGroupVariants>) {
  const context = useContext(ToggleGroupContext);
  const { item } = toggleGroupVariants({ variant: context.variant || variant, size: context.size || size });

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      className={cn(item(), className)}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
