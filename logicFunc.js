function addRows() {
                        var table = document.getElementById("dataTable");

                        var processesInput = document.getElementById("processes").value;

                        for (var i = 0; i < processesInput; i++) {
                              var row = table.insertRow();
                              var processCell = row.insertCell();
                              processCell.textContent = "P" + (i + 1); // Assigning process number

                              for (var j = 0; j < 3; j++) { // Three more columns for Maximum, Allocation, and Available
                                    var cell = row.insertCell();
                                    var inputsContainer = document.createElement("div"); // Container for textboxes
                                    inputsContainer.className = "inputCell"; // Adding a class for easy selection

                                    // Adding five textboxes horizontally
                                    for (var k = 0; k < 5; k++) {
                                          var input = document.createElement("input");
                                          input.type = "number";
                                          input.style.width = "calc(15.33% - 16px)"; // Adjusting width
                                          input.style.marginRight = "5px"; // Add some space between textboxes
                                          inputsContainer.appendChild(input);
                                    }
                                    cell.appendChild(inputsContainer);
                              }
                        }
                  }

                  function done() {
                        var table = document.getElementById("dataTable");
                        var processesInput = document.getElementById("processes").value;
                        var rows = table.rows;
                        var labels = ['A', 'B', 'C', 'D', 'E'];

                        // Iterate through each set of corresponding input fields in the "Allocation" and "Available" columns
                        for (var j = 0; j < processesInput; j++) {
                              // Initialize the sum variable for the current set
                              var sum = 0;

                              // Calculate the sum for the current set of input fields
                              for (var i = 1; i < rows.length; i++) {
                                    var allocationInput = rows[i].cells[2].querySelectorAll("input")[j]; // Input field in the Allocation column
                                    var availableInput = rows[i].cells[3].querySelectorAll("input")[j]; // Input field in the Available column

                                    // Extract input fields and add their values to the sum
                                    if (allocationInput) {
                                          sum += parseInt(allocationInput.value || 0);
                                    }
                                    if (availableInput) {
                                          sum += parseInt(availableInput.value || 0);
                                    }
                              }

                              // Create a new element to display the sum
                              var sumElement = document.createElement("div");
                              sumElement.textContent = "Total instances of Allocation " + labels[j] + " : " + sum;
                              document.getElementById("firstInputSum").appendChild(sumElement); // Append the sum to the container
                        }


                        var table = document.getElementById("dataTable");
                        var rows = table.rows;
                        var processesInput = document.getElementById("processes").value;

                        var minus1 = 0;

                        for (var j = 0; j < processesInput; j++) {
                              var minus = 0;

                              for (var i = 1; i < rows.length; i++) {
                                    var maximumInput = rows[i].cells[1].querySelectorAll("input")[j]; // Input field in the Maximum column
                                    var allocationInput = rows[i].cells[2].querySelectorAll("input")[j]; // Input field in the Allocation column

                                    // Extract input fields and subtract their values
                                    if (maximumInput && allocationInput) {
                                          minus = parseInt(maximumInput.value || 0) - parseInt(allocationInput.value || 0);

                                          // Output the result to the console
                                          console.log("Need matrix for Process " + (i) + ": ", Math.abs(minus));

                                    }
                              }
                        }

                        var outputTable = document.getElementById("outputTable");

                        // Clear existing content
                        outputTable.innerHTML = "";

                        // Create header row for output table
                        var headerRow1 = outputTable.insertRow(); // First row for labels
                        var headerRow2 = outputTable.insertRow(); // Second row for column descriptions

                        var headerCells1 = ["Process", "Maximum", "Allocation", "Available", "Need Matrix"];
                        var headerCells2 = ["", "A B C D E", "A B C D E", "A B C D E", "A B C D E"];

                        // Insert cells for the labels
                        headerCells1.forEach(function (cellText) {
                              var headerCell = headerRow1.insertCell();
                              headerCell.textContent = cellText;
                        });

                        // Insert cells for the column descriptions
                        headerCells2.forEach(function (cellText) {
                              var headerCell = headerRow2.insertCell();
                              headerCell.textContent = cellText;
                        });


                        // Calculate and display the subtraction values
                        for (var i = 1; i < rows.length; i++) {
                              var dataRow = outputTable.insertRow();
                              var processCell = dataRow.insertCell();
                              processCell.textContent = rows[i].cells[0].textContent;

                              for (var j = 0; j < 3; j++) {
                                    var cell = dataRow.insertCell();
                                    var inputs = rows[i].cells[j + 1].querySelectorAll("input");
                                    var inputValues = "";
                                    inputs.forEach(function (input) {
                                          inputValues += input.value + " ";
                                    });
                                    cell.textContent = inputValues;
                              }

                              var subtractionCell = dataRow.insertCell();
                              for (var j = 0; j < processesInput; j++) {
                                    var maximumInput = rows[i].cells[1].querySelectorAll("input")[j];
                                    var allocationInput = rows[i].cells[2].querySelectorAll("input")[j];
                                    if (maximumInput && allocationInput) {
                                          var minus = parseInt(maximumInput.value || 0) - parseInt(allocationInput.value || 0);
                                          subtractionCell.textContent += Math.abs(minus) + " "; // Accumulate subtraction values
                                    }
                              }
                        }

                        // Show the output table
                        outputTable.style.display = "table";
                  }
                  
                  function findSafeSequence() {
                        let process = []; // Process names
                        let allocation = []; // Allocation matrix
                        let maxNeed = []; // Maximum need matrix
                        let available = []; // Available resources

                        var table = document.getElementById("dataTable");
                        var rows = table.rows;

                        // Extract process names, allocation, maxNeed, and available resources
                        for (var i = 1; i < rows.length; i++) {
                              process.push(rows[i].cells[0].textContent);

                              // Extract allocation
                              var allocationInputs = rows[i].cells[2].querySelectorAll("input");
                              allocation.push(Array.from(allocationInputs).map(input => parseInt(input.value)));

                              // Extract maxNeed
                              var maxNeedInputs = rows[i].cells[1].querySelectorAll("input");
                              maxNeed.push(Array.from(maxNeedInputs).map(input => parseInt(input.value)));

                              // Extract available resources
                              var availableInputs = rows[i].cells[3].querySelectorAll("input");
                              available.push(Array.from(availableInputs).map(input => parseInt(input.value)));
                        }

                        var nProcesses = process.length;
                        var nResources = available[0].length;
                        var work = available[0].slice(); // Initialize work array with available resources
                        var finish = Array(nProcesses).fill(false); // Initialize finish array
                        var safeSeq = []; // Initialize safe sequence array

                        // Find a safe sequence
                        for (var attempt = 0; attempt < nProcesses; attempt++) {
                              var found = false;
                              for (var i = 0; i < nProcesses; i++) {
                                    if (!finish[i]) {
                                          var j;
                                          for (j = 0; j < nResources; j++) {
                                                if (maxNeed[i][j] > work[j]) {
                                                      break;
                                                }
                                          }
                                          if (j === nResources) {
                                                // If all resources of process i can be allocated
                                                for (var k = 0; k < nResources; k++) {
                                                      work[k] += allocation[i][k];
                                                }
                                                safeSeq.push(process[i]);
                                                finish[i] = true;
                                                found = true;
                                          }
                                    }
                              }
                              if (!found) {
                                    // If no process could be allocated resources
                                    break;
                              }
                        }

                        // Check if a safe sequence was found
                        if (safeSeq.length === nProcesses) {
                              // Display the safe sequence on the HTML page
                              var safeSeqElement = document.createElement("div");
                              safeSeqElement.textContent = "Safe Sequence: " + safeSeq.join(", ");
                              document.body.appendChild(safeSeqElement);
                        } else {
                              // Display message if no safe sequence exists
                              console.log("No safe sequence found.");
                        }
                  }