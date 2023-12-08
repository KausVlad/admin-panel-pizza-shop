type UniversalProductCardProps = {
  id: number;
  productName: string;
  price: number;
  productImage: string;
  portion: number;
};

export default function UniversalProductCard({
  id,
  productName,
  productImage,
  price,
  portion,
}: UniversalProductCardProps) {
  return (
    <tr>
      <td>{id}</td>
      <td>{productName}</td>
      <td>{productImage}</td>
      <td>{price}</td>
      <td>{portion}</td>
    </tr>
  );
}
