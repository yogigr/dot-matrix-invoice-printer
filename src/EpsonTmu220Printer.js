import Escp from '@yogigr/escp-client';
import PrintStrategy from './PrintStrategy.js';

export default class EpsonTmu220Printer extends PrintStrategy {
    print(data) {
        let escp = new Escp(data.printer.host, data.printer.port, data.printer.token);

        const esc = '\x1B'; //ESC byte in hex notation
        const gs = '\x1D'; //GS
        const lf = '\x0A'; //LF


        // Initialize printer
        escp.raw += esc + "@";

        // Print and reverse feed

        //Emphasized + Double-height + Double-width mode selected (ESC ! (8 + 16 + 32)) 56 dec => 38 hex
        //escp.raw +=  esc + "!" + "\x38";

        //Emphasized mode selected (ESC ! (8 ))
        escp.raw += esc + "!" + "\x08";

        // Select justification: Centering
        escp.raw += esc + "a" + "\x01";

        //header

        // comp name
        escp.raw += data.outlet.name.toUpperCase() + lf;

        // reset printer mode
        escp.raw += esc + "!" + "\x00";

        escp.raw += data.outlet.address + lf;

        escp.raw += data.outlet.phone + lf;

        escp.text("---------------------------------", 33);
        escp.raw += lf;

        // Select justification: left
        //escp.raw += esc + "a" + "\x00";

        escp.text(data.sale.updated_at_formatted, 16);
        escp.text(data.sale.code, 17, false);
        escp.raw += lf;
        escp.text("---------------------------------", 33);

        //items
        data.sale.items.forEach((item) => {
            escp.raw += lf;
            escp.text(item.product_name, 20);
            escp.text(parseFloat(item.quantity).toLocaleString('id'), 2, false);
            escp.text(parseFloat(item.quantity * parseFloat(item.price)).toLocaleString('id'), 11, false);
        })
        escp.raw += lf;
        escp.text("---------------------------------", 33);

        //total
        escp.raw += lf;
        escp.raw += esc + '!' + "\x08";
        escp.text(" ", 11);
        escp.text("TOTAL", 10);
        escp.text(parseFloat(data.sale.amount).toLocaleString('id'), 12, false)

        escp.raw += lf;
        escp.text(" ", 11);
        escp.text("DIBAYAR", 10);
        escp.text(parseFloat(data.sale.payment).toLocaleString('id'), 12, false)

        escp.raw += lf;
        escp.text(" ", 11);
        escp.text("KEMBALI", 10);
        escp.text((parseFloat(data.sale.payment) - parseFloat(data.sale.amount)).toLocaleString('id'), 12, false)

        escp.raw += lf + lf;

        escp.raw += esc + '!' + "\x00";
        // Select justification: Centering
        escp.raw += esc + "a" + "\x01";
        escp.raw += 'TERIMA KASIH'

        escp.raw += lf;

        // Select cut mode and cut paper GS "V" 66 0
        escp.raw += gs + "V" + "\x42" + "\x14";

        try {
            escp.sendRaw();
            console.log(escp.raw);
        } catch (err) {
            console.log(err);
        }
    }
}