import EpsonLx300Printer from './EpsonLx300Printer.js';
import EpsonTmu220Printer from './EpsonTmu220Printer.js';

export default class DotMatrixPrinterFactory {
    createPrinter(type) {
        switch (type) {
            case 'epsontmu220':
                return new EpsonTmu220Printer();
                break;
            case 'epsonlx300':
                return new EpsonLx300Printer();
                break;
            default:
                throw new Error('Printer type not valid');
                break;
        }
    }
}