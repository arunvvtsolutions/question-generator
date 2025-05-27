import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export function MainModal({
  open,
  title,
  className,
  description,
  children,
  footer,
  titleClassName,
  onOpenChange,
}: {
  open: boolean;
  title?: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  children: React.ReactElement;
  footer?: React.ReactElement;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog  open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby=''  className={cn('sm:max-w-[425px] ', className)}>
        {
          <DialogHeader>
            {<DialogTitle className={cn(title ? '' : 'hidden', titleClassName)}>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        }
        <div className="grid gap-4 py-4">{children}</div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
