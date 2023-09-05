import Escp from '@yogigr/escp-client';
import PrintStrategy from './PrintStrategy.js';

export default class EpsonLx300Printer extends PrintStrategy {
    #writeHeader(escp, data) {
        escp.text(`${data.document_name}   HAL.${escp.currentPage}`, 40, false);
        escp.newLine();
        escp.text(data.outlet.name.toUpperCase(), 20);
        escp.text(data.customer.name.toUpperCase(), 20, false)
        escp.newLine();
        escp.text(data.outlet.phone, 20);
        escp.text(data.customer.phone, 20, false);
        escp.newLine();

        escp.text(`${data.sale.updated_at_formatted}`, 20);
        escp.text(`${data.sale.code}`, 20, false);
        escp.newLine();

        escp.text(`${data.sale.payment_status}`, 20);
        escp.newLine();

        escp.text("-".repeat(40), 40);
        escp.newLine()
        escp.text('NO ', 3, false);
        escp.text('BRG', 14);
        escp.text('HRG', 8, false);
        escp.text('QTY', 4, false);
        escp.text('TOT', 11, false);
        escp.newLine();
        escp.text("-".repeat(40), 40);
        escp.newLine()
    }

    #rowItem(escp, item, index) {
        escp.text(`${index + 1} `, 3, false);
        escp.text(item.product_name, 14);
        escp.text(parseFloat(item.price).toLocaleString('id'), 8, false);
        escp.text(parseFloat(item.quantity).toLocaleString('id'), 4, false);
        escp.text(parseFloat(item.quantity * parseFloat(item.price)).toLocaleString('id'), 11, false);
        escp.newLine();
    }

    #writeBody(escp, data) {
        data.sale.items.forEach((item, index) => {
            if (escp.currentLine == 41) {
                escp.newPage();
                this.#writeHeader(escp, data);
            }
            this.#rowItem(escp, item, index);
        });
    }

    #writeFooter(escp, data) {
        escp.text("-".repeat(40), 40)
        escp.newLine();
        escp.text('TOTAL', 25);
        escp.text(parseFloat(data.sale.total_quantity).toLocaleString('ID'), 4, false);
        escp.text(parseFloat(data.sale.amount).toLocaleString('ID'), 11, false);
        escp.newLine();
        escp.text('DIBAYAR', 25);
        escp.text(parseFloat(data.sale.payment).toLocaleString('ID'), 15, false);
        escp.newLine();
        escp.text('KEMBALI', 25);
        escp.text((parseFloat(data.sale.payment) - parseFloat(data.sale.amount)).toLocaleString('id'), 15, false);
        escp.newLine();
        escp.text('TERIMA KASIH', 27, false);
        escp.newLine();
    }

    print(data) {
        let escp = new Escp(data.printer.host, data.printer.port, data.printer.token);
        escp.reset();
        escp.setPrinterArea('\x4D', '\x30', '\x00', '\x2D', '\x2C', '\x00');
        this.#writeHeader(escp, data);
        this.#writeBody(escp, data);
        if (escp.currentLine > 35) {
            escp.newPage();
            this.#writeHeader(escp, data)
        }
        this.#writeFooter(escp, data)
        escp.newPage();
        escp.reset();
        escp.sendRaw();
        console.log(escp.raw);
    }
}