    <script>
        // Store all calculations
        let allCalculations = [];
        let validResults = [];
        
        // Main calculator function
        function startCalculator() {
            let keepGoing = true;
            
            while (keepGoing) {
                // Get first number
                let num1 = prompt("Enter the first number:");
                if (num1 === null) break;
                
                // Get second number
                let num2 = prompt("Enter the second number:");
                if (num2 === null) break;
                
                // Get operator
                let op = prompt("Enter an operator (+, -, *, /, %):");
                if (op === null) break;
                
                // Convert to numbers
                let x = parseFloat(num1);
                let y = parseFloat(num2);
                
                // Check if numbers are valid
                let numError = false;
                if (isNaN(x) || isNaN(y)) {
                    numError = true;
                }
                
                // Calculate result
                let result;
                let errorMsg = "";
                
                if (numError) {
                    errorMsg = "Invalid number";
                    result = errorMsg;
                } else {
                    switch (op) {
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
                            if (y === 0) {
                                errorMsg = "Division by zero";
                                result = errorMsg;
                            } else {
                                result = x / y;
                            }
                            break;
                        case '%':
                            result = x % y;
                            break;
                        default:
                            errorMsg = "Invalid operator";
                            result = errorMsg;
                    }
                }
                
                // Store calculation
                let calculation = {
                    x: num1,
                    y: num2,
                    op: op,
                    result: result,
                    isValid: !numError && !errorMsg
                };
                
                allCalculations.push(calculation);
                
                if (calculation.isValid) {
                    validResults.push(result);
                }
                
                // Ask to continue
                keepGoing = confirm("Click OK to do another calculation or Cancel to finish.");
            }
            
            // Show results
            showResults();
        }
        
        // Display results in tables
        function showResults() {
            const resultsDiv = document.getElementById('results');
            
            // Create calculations table
            if (allCalculations.length > 0) {
                let tableHTML = '<h2>Calculation Results</h2>';
                tableHTML += '<table>';
                tableHTML += '<tr><th>Number 1</th><th>Operator</th><th>Number 2</th><th>Result</th></tr>';
                
                for (let i = 0; i < allCalculations.length; i++) {
                    let calc = allCalculations[i];
                    tableHTML += '<tr>';
                    tableHTML += '<td>' + calc.x + '</td>';
                    tableHTML += '<td>' + calc.op + '</td>';
                    tableHTML += '<td>' + calc.y + '</td>';
                    
                    if (typeof calc.result === 'string') {
                        tableHTML += '<td class="error">' + calc.result + '</td>';
                    } else {
                        tableHTML += '<td>' + calc.result + '</td>';
                    }
                    
                    tableHTML += '</tr>';
                }
                
                tableHTML += '</table>';
                resultsDiv.innerHTML += tableHTML;
                
                // Create summary table
                if (validResults.length > 0) {
                    let min = validResults[0];
                    let max = validResults[0];
                    let total = 0;
                    
                    for (let i = 0; i < validResults.length; i++) {
                        if (validResults[i] < min) min = validResults[i];
                        if (validResults[i] > max) max = validResults[i];
                        total += validResults[i];
                    }
                    
                    let avg = total / validResults.length;
                    
                    let summaryHTML = '<div class="summary">';
                    summaryHTML += '<h2>Summary of Valid Results</h2>';
                    summaryHTML += '<table>';
                    summaryHTML += '<tr><th>Minimum</th><th>Maximum</th><th>Average</th><th>Total</th></tr>';
                    summaryHTML += '<tr><td>' + min + '</td><td>' + max + '</td><td>' + avg.toFixed(2) + '</td><td>' + total + '</td></tr>';
                    summaryHTML += '</table></div>';
                    
                    resultsDiv.innerHTML += summaryHTML;
                } else {
                    resultsDiv.innerHTML += '<p class="error">No valid calculations to summarize.</p>';
                }
            } else {
                resultsDiv.innerHTML = '<p>No calculations were performed.</p>';
            }
        }
        
        // Start the calculator when page loads
        window.onload = startCalculator;
    </script>
