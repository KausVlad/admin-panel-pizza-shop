import { Link } from "react-router-dom";
import { DeleteModal } from "./DeleteModal";
import { useDeletePizzaMutation } from "../../store/pizzaShopApi/pizza.endpoints";

type UniversalProductCellProps = {
  id: number;
  productName: string;
  price: number;
  productImage: string;
  portion: number;
};

export default function UniversalProductCell({
  id,
  productName,
  productImage,
  price,
  portion,
}: UniversalProductCellProps) {
  const [deletePizza] = useDeletePizzaMutation();

  return (
    <tr>
      <td>{id}</td>
      <td>{productName}</td>
      <td>{productImage}</td>
      <td>{price}</td>
      <td>{portion}</td>
      <td>
        <Link to={`/pizza/${productName}`}>details</Link>
      </td>
      <td>
        <DeleteModal productName={productName} deleteMutation={deletePizza} />
      </td>
    </tr>
  );
}
