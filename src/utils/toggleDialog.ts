export const toggleDialog = (
  dialogRef: React.RefObject<HTMLDialogElement> | HTMLDialogElement
) => {
  const currentDialog = "current" in dialogRef ? dialogRef.current : dialogRef;

  if (!currentDialog) {
    return;
  }

  currentDialog.hasAttribute("open")
    ? currentDialog.close()
    : currentDialog.showModal();
};
