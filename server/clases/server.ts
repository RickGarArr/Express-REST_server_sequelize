import Express from 'express';
export default class Server {
    private app: Express.Application;
    private port: number;
    constructor(port: number) {
        this.port = port;
        this.app = Express();
    }

    public start(callback: Function) {
        this.app.listen(this.port, callback());
    }

    public getApp(): Express.Application {
        return this.app;
    }

    public getPort(): number {
        return this.port;
    }
}