import DotMatrixInvoicePrinter from "./../index.js";

const totalProduct = 5;
let items = []
for (let index = 0; index < totalProduct; index++) {
    items.push({
        product_name: `PRODUCT ${index+1}`,
        price: (index+1) * 10000,
        quantity: index+1
    })
}

const data = {
    document_name: 'FAKTUR PENJUALAN',
    printer: {
        type: 'epsonlx300',
        host: 'localhost',
        port: '3000',
        token: '12345'
    },
    outlet: {
        name: 'PT SURYA KENCANA',
        phone: '08100001',
        address: 'Rajagaluh',
    },
    customer: {
        name: 'Nama Konsumen',
        phone: '0810002',
        address: 'Bandung'
    },
    sale: {
        code: 'INV2023090010',
        updated_at_formatted: '01/09/2023',
        payment_status: 'LUNAS',
        items: items,
        amount: items.reduce((acc, curr) => {
            return acc + (curr.price * curr.quantity)
        }, 0),
        payment: items.reduce((acc, curr) => {
            return acc + (curr.price * curr.quantity)
        }, 0),
        total_quantity: items.reduce((acc, curr) => {
            return acc + curr.quantity
        }, 0),
    },
    admin_name: 'Admin Name'
};

const invoicePrinter = new DotMatrixInvoicePrinter(data) 
invoicePrinter.printInvoice()