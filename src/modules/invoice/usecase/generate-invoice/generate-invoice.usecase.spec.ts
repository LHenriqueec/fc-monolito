import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/entity/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import GenerateInvoiceUseCase, { GenerateInvoiceInputUseCaseDTO } from "./generate-invoice.usecase";

const invoice = new Invoice({
    id: new Id("1"),
    name: "Invoice Test",
    document: "1235123",
    address: {
        street: "123abc",
        number: "34",
        complement: "lá perto",
        city: "Lugar Nenhum",
        state: "LA",
        zipcode: "123456"
    },
    items: [
        {
            id: new Id("2"),
            name: "Item 1",
            price: 150
        },
        {
            id: new Id("2"),
            name: "Item 2",
            price: 200
        }
    ]
});

const MockRepository = (): InvoiceGateway => {
    return {
        find: jest.fn(),
        generate: jest.fn().mockReturnValue(Promise.resolve(invoice))
    }
}

describe("Generate Invoice UseCase unit test", () => {
    it("should generate an invoice", async () => {
        const repository = MockRepository();
        const usecase = new GenerateInvoiceUseCase(repository);

        const input: GenerateInvoiceInputUseCaseDTO = {
            name: "Invoice Test",
            document: "1235123",
            street: "123abc",
            number: "34",
            complement: "lá perto",
            city: "Lugar Nenhum",
            state: "LA",
            zipcode: "123456",
            items: [
                {
                    id: "2",
                    name: "Item 2",
                    price: 150
                },
                {
                    id: "3",
                    name: "Item 3",
                    price: 200
                }
            ]
        }

        const result = await usecase.execute(input);

        expect(repository.generate).toHaveBeenCalled();
        expect(result.id).toEqual(invoice.id.id);
        expect(result.name).toEqual(invoice.name);
        expect(result.document).toEqual(invoice.document);
        expect(result.street).toEqual(invoice.address.street);
        expect(result.number).toEqual(invoice.address.number);
        expect(result.complement).toEqual(invoice.address.complement);
        expect(result.city).toEqual(invoice.address.city);
        expect(result.state).toEqual(invoice.address.state);
        expect(result.zipcode).toEqual(invoice.address.zipcode);
        expect(result.items).toHaveLength(2);
        expect(result.items[0].id).toEqual(invoice.items[0].id.id);
        expect(result.items[0].name).toEqual(invoice.items[0].name);
        expect(result.items[0].price).toEqual(invoice.items[0].price);
        expect(result.items[1].id).toEqual(invoice.items[1].id.id);
        expect(result.items[1].name).toEqual(invoice.items[1].name);
        expect(result.items[1].price).toEqual(invoice.items[1].price);
        expect(result.total).toEqual(350);
    });
});