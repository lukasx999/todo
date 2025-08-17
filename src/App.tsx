import { useState } from 'react'
import type { Data } from './common.ts';
import List from './List.tsx';
import './App.css'

export default function App() {

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
      <h1 className="title">TODO</h1>

      <span className="container button_group buttons_add_clear">
        <button className="button" onClick={addItem}>Add</button>
        <button className="button" onClick={clearItems}>Clear</button>
      </span>

      <List
        items={data.items}
        onItemRemove={onItemRemove}
        onRename={onItemRename}
        onMove={onMove}
      />

    </>
  )
}