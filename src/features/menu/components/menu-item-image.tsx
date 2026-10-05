import { cn } from '@/lib/utils'

interface MenuItemImageProps {
  src: string | null
  alt: string
  /** Rendered size in px; also the placeholder label ("height x width"). */
  height: number
  width: number
  className?: string
}

export function MenuItemImage({ src, alt, height, width, className }: MenuItemImageProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className={cn('shrink-0 rounded-lg object-cover', className)}
        style={{ width, height }}
      />
    )
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        'flex shrink-0 items-center justify-center rounded-lg bg-muted text-xs text-muted-foreground',
        className,
      )}
      style={{ width, height }}
    >
      {height}x{width}
    </div>
  )
}
