import {
    displayMessage,
    processData, 
    parseArrayToObjectArray, 
    groupSalariesByUser, 
    calcFinancialReports
} from './financialReportUtils.js';
import TableGenerator from './tableGenerator.js';

const fileInput = document.querySelector('#file-upload');
const tableContainer = document.querySelector('#table-container');

fileInput.addEventListener('change', function(e){
    displayMessage('');
    let file = this.files[0];
    
    if(file){
        let reader = new FileReader();

        reader.readAsText(file);

        reader.onload = function(){
            let text = reader.result;
            let proccesedData = processData(text);

            if(!proccesedData) return;

            let objectArray = parseArrayToObjectArray(proccesedData);
            let userYearly = groupSalariesByUser(objectArray)
            let financialReports = calcFinancialReports(userYearly);
            if(financialReports.length) {
                new TableGenerator(financialReports, tableContainer);
            } else {
                displayMessage('No entries found');
            }
        }

        reader.onerror = function(){
            let error = reader.error;
            console.log(error);
        }
    } else {
        displayMessage('Please upload a file')
    }

})

// fetch('https://raw.githubusercontent.com/vega/vega/master/docs/data/movies.json')
//   .then(response => response.json())
//   .then(json => new TableGenerator(json, tableContainer))

const showModalBtn = document.querySelector('#show-modal');
const modalDialog = document.querySelector('.modal-dialog');

showModalBtn.addEventListener('click', function(e){
    e.preventDefault();
    modalDialog.style.display = 'block';
})

modalDialog.addEventListener('click', function(e){
    if(e.target === modalDialog || e.target.dataset.close) {
        modalDialog.style.display = 'none';
    }
})


// modal-header
// modal-body

const modalHeader = modalDialog.querySelector('.modal-header');
const modalBody = modalDialog.querySelector('.modal-body');

modalHeader.innerHTML = 'Time to go';
modalBody.innerHTML = 'End!';