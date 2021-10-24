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
      .forEach((cell, index) => {
        const actions = document.createElement('div');
        actions.className = 'actions';
        // create search field element
        const searchField = document.createElement('input');
        searchField.className = 'actions-search';
        searchField.type = 'text';
        searchField.placeholder = 'Type for search';
        searchField.addEventListener('input', (e) => this.searchInColumn(e.target.value, index));
        actions.append(searchField);
        // create sort button element
        const sortButton = document.createElement('div');
        sortButton.className = 'actions-sort';
        sortButton.innerText = 'Sort';
        sortButton.addEventListener('click', () => this.sortOnColumn(index));
        actions.append(sortButton);

        cell.prepend(actions);
      });
  }

  sortOnColumn(columnIndex) {
    if (this.sortedColumnIndex !== columnIndex) {
      this.columnSortDesc = false;
    }
    this.sortedColumnIndex = columnIndex;
    const sortedRows = Array.from(this.getTable().rows)
      .slice(1)
      .sort((a, b) => (
        a.cells[columnIndex].innerHTML > b.cells[columnIndex].innerHTML ? 1 : -1
      ));
    if (this.columnSortDesc) {
      sortedRows.reverse();
    }
    this.getTable().tBodies[0].append(...sortedRows);
    this.columnSortDesc = !this.columnSortDesc;
  }

  searchInColumn(subStr, columnIndex) {
    const rows = Array.from(this.getTable().rows).slice(1);
    const columnCells = rows.map((row) => row.cells[columnIndex]);
    columnCells.forEach((cell) => {
      const content = cell.textContent;
      const reg = new RegExp(subStr, 'g');
      const newContent = content
        .replace(reg, `<span class="marked">${subStr}</span>`);
      // eslint-disable-next-line no-param-reassign
      cell.innerHTML = newContent;
    });
  }
}
