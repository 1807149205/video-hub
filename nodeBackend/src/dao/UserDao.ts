import DatabaseUtil from "../utils/DatabaseUtil";

export interface UserType {
    id: number;
    username: string;
    password: string;
    avatar: string;
    create_date: Date;
    update_date: Date;
}

export interface SaveUserType {
    username: string;
    password: string;
    avatar?: string;
}

class UserDao {
    async getAll() {
        const res: UserType[] = await DatabaseUtil.select("select * from user");
        return res;
    }
    async saveUser(user: SaveUserType) {
        const sql: string = "INSERT INTO `video_hub`.`user` (`username`, `password`, `avatar`, `create_date`) VALUES (?,?,?,?)";
        await DatabaseUtil.update(sql, [ user.username, user.password, user.avatar || "", new Date() ])
    }
}

export default UserDao;