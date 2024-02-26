import React, { useRef } from "react";
import { useAppDispatch } from "../store/store";
import { addPerson } from "../store/features/personSlice";

const Add = () => {
  const name = useRef<string>("");
  const dispath = useAppDispatch();
  return (
    <form>
      <label>Person Name:</label>
      <input onChange={(e) => (name.current = e.target.value)} />
      <button
        onClick={(e) => {
          e.preventDefault();
          dispath(addPerson({ name: name.current }));
        }}
      >
        Add
      </button>
    </form>
  );
};

export default Add;
