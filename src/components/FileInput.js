import { useEffect, useRef, useState } from "react";

export default function FileInput({ name, value, onChange, initialPreview }) {
  const [preview, setPreview] = useState(initialPreview);
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;

    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(()=> {
    if(!value) return;

    const nextPrev = URL.createObjectURL(value);
    setPreview(nextPrev);

    return () => {
      setPreview(initialPreview);
      URL.revokeObjectURL(nextPrev);
    }
  }, [value, initialPreview])

  return (
    <div>
      <img src={preview} alt="이미지 미리보기"/>
      <input type="file" accept="image/png, image/jpeg" onChange={handleChange} ref={inputRef}></input>
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}
