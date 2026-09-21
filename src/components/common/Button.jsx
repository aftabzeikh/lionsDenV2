import React from 'react';
import { Loader2 } from 'lucide-react';

const primaryExactStyle = {
  borderRadius: '37px',
  borderWidth: '1.5px',
  borderStyle: 'solid',
  borderColor: 'transparent',
  background:
    'linear-gradient(95.84deg, #B77E15 4.79%, #F8C45E 51.55%, #B77E15 101.36%) padding-box, linear-gradient(96.73deg, #F8C457 7.78%, #A16600 52.2%, #F8C457 96.62%) border-box',
};

const variantStyles = {
  primary:
    'btn-primary-spec text-slate-950 font-black shadow-[0_0_20px_rgba(248,196,94,0.35)] hover:shadow-[0_0_30px_rgba(248,196,94,0.6)] hover:brightness-110 active:scale-[0.98]',
  gold:
    'btn-primary-spec text-slate-950 font-black shadow-[0_0_20px_rgba(248,196,94,0.35)] hover:shadow-[0_0_30px_rgba(248,196,94,0.6)] hover:brightness-110 active:scale-[0.98]',
  secondary:
    'bg-surface hover:bg-card text-text border border-border/80 hover:border-border active:scale-[0.98]',
  outline:
    'bg-transparent border-2 border-primary/80 hover:border-primary text-primary hover:bg-primary/10 active:scale-[0.98]',
  ghost:
    'bg-transparent text-muted hover:text-text hover:bg-surface/60 active:scale-[0.98]',
  danger:
    'bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold shadow-md shadow-red-500/20 hover:brightness-110 active:scale-[0.98]',
  accent:
    'bg-accent text-white font-bold hover:brightness-110 active:scale-[0.98]',
};

const sizeStyles = {
  xs: 'px-3 py-1 text-xs gap-1.5',
  sm: 'px-4 py-1.5 text-xs md:text-sm gap-2',
  md: 'px-6 py-2.5 text-sm md:text-base gap-2',
  lg: 'px-8 py-3.5 text-base md:text-lg gap-2.5',
  xl: 'px-9 py-4 text-lg md:text-xl gap-3 tracking-wide',
  icon: 'p-2.5',
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  iconLeft: IconLeft,
  iconRight: IconRight,
  children,
  onClick,
  type = 'button',
  pill = false,
  glow = false,
  style = {},
  ...props
}) => {
  const baseStyle =
    'relative inline-flex items-center justify-center select-none font-sans uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed cursor-pointer overflow-hidden';
  
  const vStyle = variantStyles[variant] || variantStyles.primary;
  const sStyle = sizeStyles[size] || sizeStyles.md;
  const roundedStyle = (variant === 'primary' || variant === 'gold' || pill) ? '!rounded-[37px]' : 'rounded-xl';
  const glowStyle = glow ? 'ring-2 ring-primary/40 shadow-xl shadow-primary/30 animate-pulse' : '';

  const combinedStyle =
    variant === 'primary' || variant === 'gold'
      ? { ...primaryExactStyle, ...style }
      : style;

  return (
    <button
      type={type}
      style={combinedStyle}
      className={`${baseStyle} ${vStyle} ${sStyle} ${roundedStyle} ${glowStyle} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {/* Subtle shine highlight effect */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-[shine_1s_ease-in-out] pointer-events-none" />

      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {IconLeft && <IconLeft className="w-4 h-4 shrink-0" />}
          {children && <span>{children}</span>}
          {IconRight && <IconRight className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
};
