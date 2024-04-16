import { Link } from "react-router-dom";
import { DeleteModal } from "./DeleteModal";

type UniversalProductCellProps = {
  id: number;
  productName: string;
  price: number;
  productImage: string;
  portion: number;
  rootProductPath: "pizza" | "otherProducts" | "ingredient";
  deleteMutation: (productName: string) => void;
};

export function UniversalProductCell({
  id,
  productName,
  productImage,
  price,
  portion,
  rootProductPath,
  deleteMutation,
}: UniversalProductCellProps) {
  return (
    <tr>
      <td>{id}</td>
      <td>{productName}</td>
      <td>{productImage}</td>
      <td>{price}</td>
      <td>{portion}</td>
      <td>
        <Link to={`/${rootProductPath}/${productName}`}>details</Link>
      </td>
      <td>
        <DeleteModal
          productName={productName}
          deleteMutation={deleteMutation}
        />
      </td>
    </tr>
  );
}
