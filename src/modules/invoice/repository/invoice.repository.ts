import Invoice from "../domain/entity/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";

export default class InvoiceRepository implements InvoiceGateway {
    find(id: string): Promise<Invoice> {
        throw new Error("Method not implemented.");
    }
    generate(invoice: Invoice): Promise<Invoice> {
        throw new Error("Method not implemented.");
    }
}