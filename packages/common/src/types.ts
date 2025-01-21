import z from "zod"

const CreateUserSchema = z.object({
    email:z.string(),
    password:z.string().min(3).max(50),
    name:z.string()
});

const LoginUserSchema = z.object({
    email:z.string(),
    password:z.string().min(3).max(50),
});


const CreateRoomSchema =z.object({
    roomId:z.string()
});

export {
    CreateRoomSchema,
    LoginUserSchema,
    CreateUserSchema
}