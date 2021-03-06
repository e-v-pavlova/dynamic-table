import tableToHtml from './js/tableToHtml';
import TableActionsController from './js/TableActionsController';

function loadTable() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'demo.json');
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = () => {
      if (xhr.status !== 200) {
        reject(new Error(`Error: ${xhr.status}`));
      }
      resolve(xhr.response);
    };
    xhr.onerror = () => {
      reject(new Error('Error: no connection'));
    };
  });
}

function renderTable(tableData) {
  const htmlTable = tableToHtml(tableData, 'spaceX-history');
  const tableContainer = document.createElement('div');
  tableContainer.classList.add('table-container');
  tableContainer.innerHTML = htmlTable;
  document.body.append(tableContainer);
  TableActionsController.create('spaceX-history');
}

loadTable()
  .then(renderTable)
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error.message);
  });
