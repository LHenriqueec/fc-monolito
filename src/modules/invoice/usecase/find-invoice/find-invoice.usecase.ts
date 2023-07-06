import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";

export interface FindInvoiceUseCaseInputDTO {
    id: string;
}

export interface FindInvoiceUseCaseOutputDTO {
    id: string;
    name: string;
    document: string;
    address: {
        street: string;
        number: string;
        complement: string;
        city: string;
        state: string;
        zipcode: string;
    };
    items: {
        id: string;
        name: string;
        price: number;
    }[];
    total: number;
    createAt: Date;
}

export default class FindInvoiceUseCase implements UseCaseInterface {
    constructor(private _invoiceRepository: InvoiceGateway) {}
    
    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const invoice = await this._invoiceRepository.find(input.id);

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipcode: invoice.address.zipcode
            },
            items: invoice.items.map(item => ({
                id: item.id.id,
                name: item.name,
                price: item.price
            })),
            total: invoice.items.reduce((result, item) => result += item.price, 0),
            createAt: invoice.createdAt
        }
    }
}