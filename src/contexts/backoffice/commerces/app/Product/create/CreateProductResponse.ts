import CommandResponse from '@shared/domain/bus/command/CommandResponse';
import Product from '@backoffice-contexts/commerces/domain/Product/Product';

export default class CreateProductResponse extends CommandResponse<Product> {
    readonly data: any;

}
