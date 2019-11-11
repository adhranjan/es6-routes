import userRouter from './users'

export class Routes {
    constructor(app) {
        this.app = app;
    }

    startRouting() {
        this.app.use("/user", userRouter);
    }
}
