import { FC, useRef } from "react";

type DeleteModalProps = {
  productName: string;
  deleteMutation: (productName: string) => void;
};

export const DeleteModal: FC<DeleteModalProps> = ({
  productName,
  deleteMutation,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function toggleDialog() {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  }

  const handleDelete = () => {
    deleteMutation(productName);
    toggleDialog();
  };

  return (
    <>
      <button onClick={toggleDialog}>Delete!</button>
      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            toggleDialog();
          }
        }}
      >
        <p>Are you sure you want to delete {productName}?</p>
        <button onClick={handleDelete}>Yes</button>
        <button onClick={toggleDialog}>No</button>
      </dialog>
    </>
  );
};
