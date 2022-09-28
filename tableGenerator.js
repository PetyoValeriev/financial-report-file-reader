class TableGenerator {
    constructor(data, container) {
        this.data = data;
        this.container = container;
        
        const table = document.createElement('table');
        const tableHead = this.createHeader(Object.keys(data[0]));
        const tableBody = this.createBody(data);

        table.append(tableHead);
        table.append(tableBody);
        container.append(table);
    }

    createHeader(data){
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');

        for(let cell of data){
            const th = document.createElement('th');
            th.innerText = cell;
            tr.append(th)
        }

        thead.append(tr);
        return thead;
    }

    createBody(data){
        const tbody = document.createElement('tbody');

        for(let obj of data){
            const tr = document.createElement('tr');
            for(let key in obj){
                const td = document.createElement('td');
                td.textContent = `${obj[key]}`;
                tr.append(td);
            }
            tbody.append(tr);
        }


        return tbody;
    }

}

export default TableGenerator;


/**
 *  table > theader >  tr  > td
*                            th

 *          tbody   >  tr  > td
*                            th

 *          tfooter >  tr  > td
*                            th
 *          tr      >  td
 *                     th
 * 
 */