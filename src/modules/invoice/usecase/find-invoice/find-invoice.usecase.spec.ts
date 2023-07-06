import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/entity/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import FindInvoiceUseCase from "./find-invoice.usecase";

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
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
        generate: jest.fn()
    }
}

describe("Find Invoice UseCase unit test", () => {
    it("should find an invoice", async () => {
        const repository = MockRepository();
        const usecase = new FindInvoiceUseCase(repository);

        const input = {id: "1"};
        const result = await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toEqual(input.id);
        expect(result.name).toEqual(invoice.name);
        expect(result.document).toEqual(invoice.document);
        expect(result.address.street).toEqual(invoice.address.street);
        expect(result.address.number).toEqual(invoice.address.number);
        expect(result.address.complement).toEqual(invoice.address.complement);
        expect(result.address.city).toEqual(invoice.address.city);
        expect(result.address.state).toEqual(invoice.address.state);
        expect(result.address.zipcode).toEqual(invoice.address.zipcode);
        expect(result.items).toHaveLength(2);
        expect(result.items[0].id).toBe(invoice.items[0].id.id);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
        expect(result.items[1].id).toBe(invoice.items[1].id.id);
        expect(result.items[1].name).toBe(invoice.items[1].name);
        expect(result.items[1].price).toBe(invoice.items[1].price);
        expect(result.total).toEqual(350);
        expect(result.createAt).toBeDefined();
    });
});