import CommandResponse from '@shared/domain/bus/command/CommandResponse';
import Product from '@backoffice-contexts/products/domain/Product';

export default class CreateProductResponse extends CommandResponse<Product> {
    readonly data: any;

}
