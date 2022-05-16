import CommandResponse from '@shared/domain/bus/command/CommandResponse';
import Commerce from '@backoffice-contexts/commerces/domain/Commerce/Commerce';

export default class CreateCommerceResponse extends CommandResponse<Commerce> {
    readonly data: any;

}
