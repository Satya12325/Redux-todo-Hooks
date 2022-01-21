import { useState } from "react";

export default function TodoInput({ onAdd }) {
  const [state, setState] = useState("");
  return (
    <div>
      <input
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="Add your text"
      />
      <button
        onClick={() => {
          onAdd(state);
          setState("");
        }}
      >
        Add
      </button>
    </div>
  );
}
