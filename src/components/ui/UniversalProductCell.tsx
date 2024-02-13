import { Link } from "react-router-dom";
import { DeleteModal } from "./DeleteModal";

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
        <DeleteModal productName={productName} />
      </td>
    </tr>
  );
}
