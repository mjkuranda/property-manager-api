export class ApiError extends Error {

    constructor(message: string, private readonly statusCode: number) {
        super(message);
    }
}