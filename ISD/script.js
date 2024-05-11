function createCustomer() {
    // Logic to create a customer
    alert('Customer Created!');
}

function searchCustomer() {
    // Logic to search customers
    alert('Search Initiated!');
}

function deleteCustomer(customerId) {
    // Assuming 'customerId' is the identifier for the customer
    console.log("Deleting customer with ID:", customerId);
    alert('Customer with ID ' + customerId + ' deleted!');

    // Here you would usually make an API call to delete the customer from the server
    // After confirming deletion from the server, you can remove the customer's element from the DOM:
    document.querySelector('#customer-entry-' + customerId).remove();
}

function displayCustomers(customers) {
    const list = document.getElementById('customer-list');
    list.innerHTML = ''; // Clear existing entries

    customers.forEach(customer => {
        const entry = document.createElement('div');
        entry.className = 'customer-entry';
        entry.id = 'customer-entry-' + customer.id;
        entry.innerHTML = `
            <span>Name: ${customer.name}</span>
            <span>Email: ${customer.email}</span>
            <span>Type: ${customer.type}</span>
            <span>Address: ${customer.address}</span>
            <button onclick="deleteCustomer('${customer.id}')">Delete</button>
        `;
        list.appendChild(entry);
    });
}

