// Array to store calculation history
let calculationHistory = [];

// Function to perform calculations
function performCalculations() {
    let continueCalculations = true;
    
    while (continueCalculations) {
        // Get first number
        let x = prompt("Enter the first number (x):");
        if (x === null) break; // User clicked Cancel
        
        // Get second number
        let y = prompt("Enter the second number (y):");
        if (y === null) break; // User clicked Cancel
        
        // Get operator
        let operator = prompt("Enter an operator (+, -, *, /, %):");
        if (operator === null) break; // User clicked Cancel
        
        // Convert to numbers
        x = parseFloat(x);
        y = parseFloat(y);
        
        // Validate inputs and calculate result
        let result;
        let isValid = true;
        let errorMessage = "";
        
        if (isNaN(x) || isNaN(y)) {
            isValid = false;
            errorMessage = "Invalid number input";
        } else if (!['+', '-', '*', '/', '%'].includes(operator)) {
            isValid = false;
            errorMessage = "Invalid operator";
        } else if (operator === '/' && y === 0) {
            isValid = false;
            errorMessage = "Division by zero";
        } else {
            // Perform calculation
            switch (operator) {
                case '+':
                    result = x + y;
                    break;
                case '-':
                    result = x - y;
                    break;
                case '*':
                    result = x * y;
                    break;
                case '/':
                    result = x / y;
                    break;
                case '%':
                    result = x % y;
                    break;
            }
        }
        
        // Store calculation in history
        calculationHistory.push({
            x: x,
            y: y,
            operator: operator,
            result: isValid ? result : errorMessage,
            isValid: isValid
        });
        
        // Ask if user wants to continue
        continueCalculations = confirm("Do you want to perform another calculation?");
    }
    
    // Display calculations table
    displayCalculationsTable();
    
    // Display summary table
    displaySummaryTable();
}

// Function to display calculations table
function displayCalculationsTable() {
    let tableHTML = `
        <table>
            <tr>
                <th>Number 1</th>
                <th>Operator</th>
                <th>Number 2</th>
                <th>Result</th>
            </tr>
    `;
    
    calculationHistory.forEach(calc => {
        tableHTML += `
            <tr>
                <td>${calc.x}</td>
                <td>${calc.operator}</td>
                <td>${calc.y}</td>
                <td class="${calc.isValid ? '' : 'error'}">
                    ${calc.isValid ? calc.result : calc.result}
                </td>
            </tr>
        `;
    });
    
    tableHTML += `</table>`;
    
    document.getElementById('results').innerHTML += tableHTML;
}

// Function to display summary table
function displaySummaryTable() {
    // Filter valid results
    const validResults = calculationHistory
        .filter(calc => calc.isValid)
        .map(calc => calc.result);
    
    if (validResults.length === 0) {
        document.getElementById('results').innerHTML += "<p>No valid calculations to summarize.</p>";
        return;
    }
    
    // Calculate statistics
    const min = Math.min(...validResults);
    const max = Math.max(...validResults);
    const total = validResults.reduce((sum, value) => sum + value, 0);
    const avg = total / validResults.length;
    
    let tableHTML = `
        <h2>Summary of Valid Calculations</h2>
        <table>
            <tr>
                <th>Minimum</th>
                <th>Maximum</th>
                <th>Average</th>
                <th>Total</th>
            </tr>
            <tr>
                <td>${min.toFixed(2)}</td>
                <td>${max.toFixed(2)}</td>
                <td>${avg.toFixed(2)}</td>
                <td>${total.toFixed(2)}</td>
            </tr>
        </table>
    `;
    
    document.getElementById('results').innerHTML += tableHTML;
}

// Start the calculator when the page loads
performCalculations();
