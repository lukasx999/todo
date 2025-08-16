import Entry from './Entry.tsx';
import type { Item } from './common.ts';

interface ListProps {
  items: Item[],
  onItemRemove: (idx: number) => void,
  onRename: (idx: number, newName: string) => void,
  onMove: (idx: number, up_else_down: boolean) => void,
}

export default function List({ items, onItemRemove, onRename, onMove }: ListProps) {

  return (
    <div className="container">
      <ul className="list">
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