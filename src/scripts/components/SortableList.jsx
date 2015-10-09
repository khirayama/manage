import { Component } from 'react';

export default class SortableList extends Component {
  constructor(props) {
    super(props);
    this._state = { from: 0, to: 0, created: true };
  }

  setPrivateState(key, value) {
    this._state[key] = value;
  }

  destroyItem(actions, data, id, order) {
    for (let index = 0; index < data.length; index++) {
      const todo = data[index];

      if (index === order) {
        actions.destroy(id);
      } else if (index > order) {
        actions.update(todo.id, {order: todo.order - 1});
      }
    }
  }

  sortItems(actions, data) {
    const from = this._state.from;
    const to = this._state.to;

    this._sortItems(actions, data, from, to);
  }

  _sortItems(actions, data, from, to) {
    if (from < to) { // top to bottom
      for (let index = from; index <= to; index++) {
        const item = data[index];

        if (index === from) {
          actions.update(item.id, { order: to });
        } else if (index <= to) {
          actions.update(item.id, { order: item.order - 1 });
        }
      }
    } else if (from > to) { // bottom to top
      for (let index = to; index <= from; index++) {
        const item = data[index];

        if (index === from) {
          actions.update(item.id, { order: to });
        } else if (index <= from) {
          actions.update(item.id, { order: item.order + 1 });
        }
      }
    }
  }
}
