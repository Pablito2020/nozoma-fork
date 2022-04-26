export default class NotFound extends Error {
    constructor(clazz: string, id: string) {
        super(`${clazz} id: ${id} not found`);
    }
}
