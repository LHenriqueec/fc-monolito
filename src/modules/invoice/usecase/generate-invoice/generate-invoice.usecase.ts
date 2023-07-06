import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Invoice from "../../domain/entity/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";

export interface GenerateInvoiceInputUseCaseDTO {
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipcode: string;
    items: {
        id: string;
        name: string;
        price: number;
    }[];
}

export interface GenerateInvoiceOutputUseCaseDTO {
    id: string;
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipcode: string;
    items: {
        id: string;
        name: string;
        price: number;
    }[];
    total: number;
}

export default class GenerateInvoiceUseCase implements UseCaseInterface {

    constructor(private _repository: InvoiceGateway) {}

    async execute(input: GenerateInvoiceInputUseCaseDTO): Promise<GenerateInvoiceOutputUseCaseDTO> {
        const invoice = new Invoice({
            name: input.name,
            document: input.document,
            address: {
                street: input.street,
                number: input.number,
                complement: input.complement,
                city: input.city,
                state: input.state,
                zipcode: input.zipcode
            },
            items: input.items.map(item => ({
                id: new Id(item.id),
                name: item.name,
                price: item.price
            })),
        });

        const result = await this._repository.generate(invoice);

        return {
            id: result.id.id,
            name: result.name,
            document: result.document,
            street: result.address.street,
            number: result.address.number,
            complement: result.address.complement,
            city: result.address.city,
            state: result.address.state,
            zipcode: result.address.zipcode,
            items: result.items.map(item => ({
                id: item.id.id,
                name: item.name,
                price: item.price
            })),
            total: result.items.reduce((result, item) => result += item.price, 0)
        }
    }
}