import { useState } from "react";
import { FaPencilAlt, FaRegTrashAlt, FaArrowUp, FaArrowDown } from "react-icons/fa";
import type { Item } from './common.ts';

interface EntryProps {
  item: Item,
  onRemove: () => void,
  onRename: (newName: string) => void,
  onMove: (up_else_down: boolean) => void,
}

export default function Entry({ item, onRemove, onRename, onMove }: EntryProps) {

  const [beingRenamed, setBeingRenamed] = useState(false);
  const [newName, setNewName] = useState("");

  function finishRename() {
    onRename(newName);
    setBeingRenamed(false);
  }

  function textChanged(event: any) {
    setNewName(event.target.value);
  }

  function beginRename() {
    setBeingRenamed(true);
  }

  function cancelRename() {
    setNewName("");
    setBeingRenamed(false);
  }

  return (
    <div className="entry">
      <li>
        <span>{item.name}</span>
        {beingRenamed ?
          <>
            <input type="text" value={newName} onInput={textChanged}></input>
            <span className="control_buttons button_group">
              <button className="button" onClick={finishRename}>Ok</button>
              <button className="button" onClick={cancelRename}>Cancel</button>
            </span>
          </> : <>
            <span className="control_buttons button_group">
              <button className="button" onClick={onRemove}><FaRegTrashAlt /></button>
              <button className="button" onClick={beginRename}><FaPencilAlt /></button>
              <button className="button" onClick={() => onMove(false)}><FaArrowDown /></button>
              <button className="button" onClick={() => onMove(true)}><FaArrowUp /></button>
            </span>
          </>
        }
      </li>
    </div>
  );
}