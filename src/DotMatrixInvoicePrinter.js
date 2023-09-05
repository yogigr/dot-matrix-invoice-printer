import DotMatrixPrinterFactory from './DotMatrixPrinterFactory.js';

export default class DotMatrixInvoicePrinter {
    constructor(data) {
        this.printerFactory = new DotMatrixPrinterFactory();
        this.printer = this.printerFactory.createPrinter(data.printer.type);
        this.data = data;
    }
    printInvoice() {
        this.printer.print(this.data);
    }
}