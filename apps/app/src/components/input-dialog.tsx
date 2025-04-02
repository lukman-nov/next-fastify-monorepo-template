import React from 'react';

import { Button } from '@zx/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@zx/ui/components/dialog';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  confirmationAction: () => void;
  children: string | React.JSX.Element;
  title: string;
  description?: string;
  messageConfirm: string;
};

export default function InputDialog({
  open,
  setOpen,
  confirmationAction,
  title,
  description,
  children,
  messageConfirm,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button type="submit" onClick={confirmationAction}>
            {messageConfirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
