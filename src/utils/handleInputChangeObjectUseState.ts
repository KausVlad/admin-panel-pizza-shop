export const handleInputChangeObjectUseState = <T>(
  e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  setFn: React.Dispatch<React.SetStateAction<T>>
) => {
  const { id, value } = e.target;
  setFn((prev) => ({
    ...prev,
    [id]: value,
  }));
};
