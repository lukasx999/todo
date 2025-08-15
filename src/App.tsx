import { useState } from 'react'
import { FaPencilAlt, FaRegTrashAlt, FaArrowUp, FaArrowDown } from "react-icons/fa";
import './App.css'

interface Item {
  name: string,
}

interface Data {
  items: Item[],
}

interface EntryProps {
  item: Item,
  onRemove: () => void,
  onRename: (newName: string) => void,
  onMove: (up_else_down: boolean) => void,
}

function Entry({ item, onRemove, onRename, onMove }: EntryProps) {

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
            <span className="control_buttons">
              <button className="button" onClick={finishRename}>Ok</button>
              <button className="button" onClick={cancelRename}>Cancel</button>
            </span>
          </> : <>
            <span className="control_buttons">
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

interface ListProps {
  items: Item[],
  onItemRemove: (idx: number) => void,
  onRename: (idx: number, newName: string) => void,
  onMove: (idx: number, up_else_down: boolean) => void,
}

function List({ items, onItemRemove, onRename, onMove }: ListProps) {

  return (
    <div className="list">
      <ul>
        {
          items.map((item, idx) =>
            <Entry
              key={idx}
              item={item}
              onRemove={() => onItemRemove(idx)}
              onRename={newName => onRename(idx, newName)}
              onMove={up_else_down => onMove(idx, up_else_down)}
            />
          )
        }
      </ul>
    </div>
  );
}

function App() {

  const [data, setData] = useState<Data>({
    items: [
      { name: "foo", },
      { name: "bar", },
      { name: "baz", },
      { name: "qux", },
      { name: "quux", },
    ],
  });

  function onItemRemove(idx: number) {
    const nextData = { ...data };
    nextData.items.splice(idx, 1);
    setData(nextData);
  }

  function addItem() {
    const nextData = { ...data };
    nextData.items.push({
      name: "newItem",
    });
    setData(nextData);
  }

  function onItemRename(idx: number, newName: string) {
    const nextData = { ...data };
    nextData.items[idx].name = newName;
    setData(nextData);
  }

  function onMove(idx: number, up_else_down: boolean) {
    const nextData = { ...data };
    const xs = nextData.items;

    if (up_else_down) {
      const isFirstElem = idx === 0;
      if (isFirstElem) return;
      [xs[idx], xs[idx - 1]] = [xs[idx - 1], xs[idx]];

    } else {
      const isLastElem = idx + 1 >= xs.length;
      if (isLastElem) return;
      [xs[idx], xs[idx + 1]] = [xs[idx + 1], xs[idx]];

    }

    setData(nextData);
  }

  function clearItems() {
    const nextData = { ...data };
    nextData.items = [];
    setData(nextData);
  }

  return (
    <>
      <div>
        <List
          items={data.items}
          onItemRemove={onItemRemove}
          onRename={onItemRename}
          onMove={onMove}
        />
        <button className="button" onClick={addItem}>Add</button>
        <button className="button" onClick={clearItems}>Clear</button>
      </div>
    </>
  )
}

export default App