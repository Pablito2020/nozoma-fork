import CommandResponse from "@shared/domain/bus/command/CommandResponse";
import Commerce from "@backoffice-contexts/commerces/domain/Commerce";

export default class DeleteCommerceResponse extends CommandResponse<Commerce> {
    readonly data: any;
}