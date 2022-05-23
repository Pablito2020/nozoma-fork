import CommandResponse from '@shared/domain/bus/command/CommandResponse';
import Cart from "@pms-contexts/carts/domain/Cart";

export default class CreateCartResponse extends CommandResponse<Cart> {
    readonly data: any;
}