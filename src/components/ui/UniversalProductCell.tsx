import { Link } from "react-router-dom";
import { DeleteModal } from "./DeleteModal";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage, lazyload } from "@cloudinary/react";

type UniversalProductCellProps = {
  id: number;
  productName: string;
  price: number;
  productImageUrl: string;
  portion: number | string;
  rootProductPath: "pizza" | "ingredient" | "otherProducts";
  deleteMutation: (productName: number) => void;
};

export function UniversalProductCell({
  id,
  productName,
  productImageUrl,
  price,
  portion,
  rootProductPath,
  deleteMutation,
}: UniversalProductCellProps) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const cld = new Cloudinary({ cloud: { cloudName: cloudName } });

  const productImage = cld.image(productImageUrl).resize(fill().width(50));

  return (
    <tr>
      <td>{id}</td>
      <td>{productName}</td>
      <td>
        <AdvancedImage
          cldImg={productImage}
          plugins={[lazyload()]}
          alt={productImageUrl || productName}
        />
      </td>
      <td>{price}</td>
      <td>{portion}</td>
      <td>
        <Link to={`/${rootProductPath}/${productName}`}>details</Link>
      </td>
      <td>
        <DeleteModal
          productId={id}
          deleteMutation={deleteMutation}
          productName={productName}
        />
      </td>
    </tr>
  );
}
