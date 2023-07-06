import ValueObject from "../../../@shared/domain/value-object/value-object.interface";

export default class Address implements ValueObject {
    street: string;
    number: string;
    complement:  string;
    city: string;
    state: string;
    zipcode: string;
}