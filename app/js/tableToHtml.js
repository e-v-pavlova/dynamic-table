export default (tableData, tableId) => {
  const columns = Object.keys(tableData[0]);
  const headerRow = columns
    .map((column) => `<th>${column}</th>`)
    .join('');

  const rows = tableData
    .map((row) => {
      const cells = columns.map((column) => `<td>${row[column]}</td>`).join('');
      return `<tr>${cells}</tr>`;
    })
    .join('');

  const table = `
    <table id="${tableId}">
      <thead>
        <tr>${headerRow}</tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>`;
  return table;
};
