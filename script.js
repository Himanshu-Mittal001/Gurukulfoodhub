// Toggle Navigation Menu for Mobile/Tablet View
function toggleMenu() {
  const navList = document.getElementById("navList");
  navList.classList.toggle("active");
}

// Toggle Dark/Light Mode
function toggleMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");
  const modeToggle = document.getElementById("modeToggle");

  if (body.classList.contains("dark-mode")) {
    modeToggle.checked = true;
  } else {
    modeToggle.checked = false;
  }
}

// Load Transaction Table Based on Category Selection
function loadTransactions(category) {
  let tableHTML = `
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Category</th>
          <th>Note</th>
          <th>Debit (₹)</th>
          <th>Credit (₹)</th>
          <th>Total Balance (₹)</th>
        </tr>
      </thead>
      <tbody>
        <!-- Dynamic rows will be added here based on transactions -->
      </tbody>
    </table>
    <form id="transactionForm">
      <input type="date" id="transactionDate" required>
      <input type="number" id="debitAmount" placeholder="Debit Amount (₹)" required>
      <input type="number" id="creditAmount" placeholder="Credit Amount (₹)" required>
      <button type="submit">Save Entries</button>
    </form>
  `;
  document.getElementById("transactionTableContainer").innerHTML = tableHTML;

  // Populate the transaction table based on selected category
  populateTransactionTable(category);
}

// Populate the Transaction Table
function populateTransactionTable(category) {
  let rows = '';
  
  if (category === 'customer') {
    rows = `
      <tr>
        <td><img src="images/sample1.jpg" alt="Customer Image" class="circular-img"></td>
        <td>John Doe</td>
        <td>Regular</td>
        <td><input type="text" placeholder="Notes"></td>
        <td class="debit">1000</td>
        <td class="credit">5000</td>
        <td class="totalBalance" style="color:green">4000</td>
      </tr>
    `;
  } else if (category === 'vendor') {
    rows = `
      <tr>
        <td><img src="images/sample2.jpg" alt="Vendor Image" class="circular-img"></td>
        <td>ABC Corp</td>
        <td>Electronics</td>
        <td><input type="text" placeholder="Notes"></td>
        <td class="debit">500</td>
        <td class="credit">3000</td>
        <td class="totalBalance" style="color:green">2500</td>
      </tr>
    `;
  } else if (category === 'worker') {
    rows = `
      <tr>
        <td><img src="images/sample1.jpg" alt="Worker Image" class="circular-img"></td>
        <td>Mark Twain</td>
        <td>Manager</td>
        <td><input type="text" placeholder="Notes"></td>
        <td class="debit">3000</td>
        <td class="credit">7000</td>
        <td class="totalBalance" style="color:green">4000</td>
      </tr>
    `;
  }

  document.querySelector("#transactionTableContainer table tbody").innerHTML = rows;
}

// Handle the Transaction Form Submission
document.getElementById("transactionForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const transactionDate = document.getElementById("transactionDate").value;
  const debitAmount = document.getElementById("debitAmount").value;
  const creditAmount = document.getElementById("creditAmount").value;

  // Validate input fields
  if (!transactionDate) {
    alert('Date is required!');
    return;
  }
  
  if (isNaN(debitAmount) || isNaN(creditAmount) || debitAmount < 0 || creditAmount < 0) {
    alert('Please enter valid Debit and Credit amounts.');
    return;
  }

  alert('Entries Saved Successfully!');
});

// Generate PDF for the Entire Page Content
function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text('Transaction Report', 20, 20);

  // Capture the entire page content and add it to the PDF
  doc.html(document.getElementById('transactionTableContainer'), {
    callback: function (doc) {
      doc.save('transaction_report.pdf');
    },
    margin: [10, 10, 10, 10],
    html2canvas: { scale: 4 }
  });
}
