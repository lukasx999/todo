import { useState } from 'react'
import './App.css'

interface Item {
  name: string,
}

interface Data {
  items: Item[],
}

interface TodoItemProps {
 item: Item,
 onRemove: () => void,
 onRename: (newName: string) => void,
 onMoveDown: () => void,
 onMoveUp: () => void,
}

function TodoItem({ item, onRemove, onRename, onMoveDown, onMoveUp }: TodoItemProps) {

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

  return (
    <li>
      <span>{item.name}</span>

      {beingRenamed ?
        <>
          <button onClick={finishRename}>Ok</button>
          <input type="text" value={newName} onInput={textChanged}></input>
        </>
        :
        <>
          <button onClick={onRemove}>Remove</button>
          <button onClick={beginRename}>Rename</button>
          <button onClick={onMoveDown}>Down</button>
          <button onClick={onMoveUp}>Up</button>
        </>
      }

    </li>
  );
}

interface TodoListProps {
  items: Item[],
  onItemRemove: (idx: number) => void,
  onRename: (idx: number, newName: string) => void,
  onMoveDown: (idx: number) => void,
  onMoveUp: (idx: number) => void,
}

function TodoList({ items, onItemRemove, onRename, onMoveDown, onMoveUp }: TodoListProps) {

  return (
    <div>
      <ul className="bullet_list">
        {
          items.map((item, idx) =>
            <TodoItem
              item={item}
              onRemove={() => onItemRemove(idx)}
              onRename={newName => onRename(idx, newName)}
              onMoveDown={() => onMoveDown(idx)}
              onMoveUp={() => onMoveUp(idx)}
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

  function onMoveDown(idx: number) {
    const nextData = { ...data };
    const xs = nextData.items;
    const isLastElem = idx+1 >= xs.length;
    if (isLastElem) return;
    [xs[idx], xs[idx+1]] = [xs[idx+1], xs[idx]];
    setData(nextData);
  }

  function onMoveUp(idx: number) {
    const nextData = { ...data };
    const xs = nextData.items;
    const isFirstElem = idx === 0;
    if (isFirstElem) return;
    [xs[idx], xs[idx-1]] = [xs[idx-1], xs[idx]];
    setData(nextData);
  }

  return (
    <>
      <TodoList
        items={data.items}
        onItemRemove={onItemRemove}
        onRename={onItemRename}
        onMoveDown={onMoveDown}
        onMoveUp={onMoveUp}
      />
      <button onClick={addItem}>Add</button>
    </>
  )
}

export default App
