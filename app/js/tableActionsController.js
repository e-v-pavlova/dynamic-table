export default class TableActionsController {
  constructor(tableId) {
    this.tableId = tableId;
    this.sortedColumnIndex = undefined;
    this.columnSortDesc = false;
    this.createColumnActions();
  }

  static create(tableId) {
    return new TableActionsController(tableId);
  }

  getTable() {
    return document.getElementById(this.tableId);
  }

  createColumnActions() {
    Array.from(this.getTable().rows[0].cells)
      .forEach((cell) => {
        const actions = document.createElement('div');
        // create search field element
        const searchField = document.createElement('input');
        searchField.type = 'text';
        actions.append(searchField);
        // create sort button element
        const sortButton = document.createElement('button');
        sortButton.innerText = 'Sort';
        actions.append(sortButton);

        cell.prepend(actions);
      });
  }
}
