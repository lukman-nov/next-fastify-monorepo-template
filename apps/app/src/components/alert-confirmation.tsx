import React from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@zx/ui/components/alert-dialog';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  confirmationAction: () => void;
  cancleAction?: () => void;
  message: string;
  title: string;
  messageCancel: string;
  messageConfirm: string;
  container?: Element | DocumentFragment | null;
};

export function AlertConfirmation({
  open,
  setOpen,
  cancleAction,
  confirmationAction,
  title,
  message,
  messageCancel,
  messageConfirm,
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={cancleAction}>{messageCancel}</AlertDialogCancel>
          <AlertDialogAction onClick={confirmationAction}>{messageConfirm}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
