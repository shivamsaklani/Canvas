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
    roomname:z.string().min(3).max(20),
});

export {
    CreateRoomSchema,
    LoginUserSchema,
    CreateUserSchema
}