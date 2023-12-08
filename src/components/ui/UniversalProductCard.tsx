type UniversalProductCardProps = {
  productName: string;
  price: number;
  image: string;
  portion: number;
};
export default function UniversalProductCard({
  productName,
  image,
  price,
  portion,
}: UniversalProductCardProps) {
  return (
    <tr>
      <td>{productName}</td>
      <td>{image}</td>
      <td>{price}</td>
      <td>{portion}</td>
    </tr>
  );
}
