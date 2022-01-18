export class UserModel {
    constructor(
        private username: string,
        private password: string,
        private email: string,
        private createdAt: Date,
        private deletedAt: Date,
        private profileImage: string) { }
}
