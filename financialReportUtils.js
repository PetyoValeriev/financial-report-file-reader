
function displayMessage(message){
    const messageField = document.querySelector('#message');
    messageField.innerText = message;
}

function processData(data){
    if(!data.length){
        displayMessage('The file is empty');
        return;
    }

    let arrFromData = data.split('\r\n').map(row => 
        row.split(',').map(data => 
            data.trim()
        )
    );

    let headers = arrFromData[0];
    let isHeader = headers.every(item => isNaN(item));
    if(isHeader){
        arrFromData.shift();
    }

    let faltyRows = [];
    let filteredArray = arrFromData.filter((row, index) => {
        if(row.length === 5){
            let isEmptyFields = row.every(rowItem => rowItem.length);
            if(isEmptyFields){
                return true;
            }
            
            faltyRows.push(index + 1);
            return false
        }

        faltyRows.push(index + 1);
        return false;
    }) 

    if(faltyRows.length){
        displayMessage(`The following rows were corrupted ${faltyRows.join(', ')}`)
    }
    
    return filteredArray;
}

function parseArrayToObjectArray(arr) {
    let usersArray = arr.map(row => {
        let [
            userId,  
            grossSalary, 
            taxesPercentage, 
            bonus, 
            expenses
        ] = row;

        // console.log(userId, grossSalary, taxesPercentage, bonus, expenses);
        return {
            userId: +userId,
            grossSalary: +grossSalary,
            taxesPercentage: +taxesPercentage,
            bonus: +bonus,
            expenses: +expenses,
            netSalary: +grossSalary - (+grossSalary * (+taxesPercentage / 100)),
            taxesPaid: +grossSalary * (+taxesPercentage / 100),
            monthlyModification: +bonus - +expenses,
        }
    })
    
    return usersArray;
}

function groupSalariesByUser(usersArray){
    let userYearly = {};

    usersArray.forEach(user => {
        if(userYearly.hasOwnProperty(user.userId)) {
            userYearly[user.userId] = [...userYearly[user.userId], user]
        } else {
            userYearly[user.userId] = [user]
        }
    })

    return userYearly
}

function calcFinancialReports(userYearly){
    return Object.keys(userYearly).map(key => {
        let userCombinedDataArray = userYearly[key];
        let grossTotal = 0;
        let netTotal = 0;
        let totalTaxes = 0;
        let totalBonus = 0;
        let totalExpenses = 0;
        userCombinedDataArray.forEach(user =>  {
            grossTotal += user.grossSalary;
            netTotal += user.netSalary;
            totalTaxes += user.taxesPaid;
            totalBonus += user.bonus;
            totalExpenses += user.expenses;
        })
        return {userId: key, grossTotal, netTotal, totalTaxes, totalBonus, totalExpenses};
    })
}

export {displayMessage, processData, parseArrayToObjectArray, groupSalariesByUser, calcFinancialReports};