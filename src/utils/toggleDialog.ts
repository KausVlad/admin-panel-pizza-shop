export const toggleDialog = (dialogRef: React.RefObject<HTMLDialogElement>) => {
  if (!dialogRef.current) {
    return;
  }
  dialogRef.current.hasAttribute("open")
    ? dialogRef.current.close()
    : dialogRef.current.showModal();
};
