import Id from "../../../@shared/domain/value-object/id.value-object";

export default class Product {
    id?: Id;
    name: string;
    price: number;
}