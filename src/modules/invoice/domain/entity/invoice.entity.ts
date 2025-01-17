import AggregateRoot from "../../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../../@shared/domain/entity/base.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../value-object/address.value-object";
import Product from "./product.entity";

type InvoiceProps = {
    id?: Id,
    name: string,
    document: string,
    address: Address,
    items: Product[],
    createAt?: Date,
    updateAt?: Date
};

export default class Invoice extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _document: string;
    private _address: Address;
    private _items: Product[];

    constructor(props: InvoiceProps) {
        super(props.id, props.createAt, props.updateAt);
        this._name = props.name;
        this._document = props.document;
        this._address = props.address;
        this._items = props.items;
    }

    get name() {
        return this._name;
    }

    get document() {
        return this._document;
    }

    get address() {
        return this._address;
    }

    get items() {
        return this._items;
    }
}