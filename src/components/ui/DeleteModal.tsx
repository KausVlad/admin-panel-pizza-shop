import { FC, useRef } from "react";
import { useDeletePizzaMutation } from "../../store/pizzaShopApi/pizza.endpoints";

type DeleteModalProps = {
  productName: string;
};

export const DeleteModal: FC<DeleteModalProps> = ({ productName }) => {
  const [deletePizza, { isSuccess }] = useDeletePizzaMutation();
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
    deletePizza(productName);
    // isSuccess && toggleDialog();
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
