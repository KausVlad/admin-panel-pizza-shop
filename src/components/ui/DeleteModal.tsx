import { FC, useRef } from "react";
import { toggleDialog } from "../../utils/toggleDialog";

type DeleteModalProps = {
  productName: string;
  deleteMutation: (productName: string) => void;
};

export const DeleteModal: FC<DeleteModalProps> = ({
  productName,
  deleteMutation,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toggleDialogRef = () => toggleDialog(dialogRef);

  const handleDelete = () => {
    deleteMutation(productName);
    toggleDialogRef();
  };

  return (
    <>
      <button onClick={toggleDialogRef}>Delete!</button>
      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            toggleDialogRef();
          }
        }}
      >
        <p>Are you sure you want to delete {productName}?</p>
        <button onClick={handleDelete}>Yes</button>
        <button onClick={toggleDialogRef}>No</button>
      </dialog>
    </>
  );
};
