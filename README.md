# DotMatrixInvoicePrinter

DotMatrixInvoicePrinter is a JavaScript package that simplifies dot matrix printing for invoice and receipt generation. It provides a straightforward way to create and print invoices on various dot matrix printers.

## Installation

You can install DotMatrixInvoicePrinter using npm:

```bash
npm install @yogigr/dot-matrix-invoice-printer
```

## Usage



```javascript

// import the package into your javascript file:

import DotMatrixInvoicePrinter from '@yogigr/dot-matrix-invoice-printer'


// Prepare your data object with the necessary information for the invoice:

const data = {
    document_name: 'INVOICE',
    printer: {
        type: 'epsonlx300' // epsonlx300 || epsontmu220,
        host: 'localhost',
        port: '3000',
        token: '12345'
    },
    outlet: {
        name: 'OUTLET NAME',
        phone: '00000000',
        address: 'Address Here',
    },
    customer: {
        name: 'Customer Name',
        phone: '000000',
        address: 'Address Here'
    },
    sale: {
        code: 'INV2023090010',
        updated_at_formatted: '01/09/2023',
        payment_status: 'PAID',
        items: [
            {
                product_name: 'Product Name',
                price: 100,
                quantity: 10
            },
            ...
        ],
        amount: 1000,
        payment: 1000,
        total_quantity: 10,
    },
    admin_name: 'Admin Name'
};

// Create an instance of DotMatrixInvoicePrinter and print the invoice:

const invoicePrinter = new DotMatrixInvoicePrinter(data);
invoicePrinter.printInvoice();
```