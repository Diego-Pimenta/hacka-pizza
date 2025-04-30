import { tv, VariantProps } from 'tailwind-variants';

const loading = tv({
  base: 'animate-spin rounded-full',

  variants: {
    variant: {
      default: 'size-8 border-4 border-black border-l-transparent',
      small: 'size-5 border-2 border-white border-l-transparent',
    },
    size: {
      default: '',
      button: 'my-0.5',
    },
  },

  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

interface LoadingProps extends VariantProps<typeof loading> {}

export const Loading = ({ variant, size }: LoadingProps) => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className={loading({ variant, size })} />
    </div>
  );
};