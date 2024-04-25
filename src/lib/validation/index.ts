import * as z from "zod"
export const signUpValidation = z.object({
  name:z.string().min(2,{message:'Please enter at least two character'}),
  username: z.string().min(2,{message:'The username is to short'}),
  email:z.string().email(),
  password:z.string().min(6,{message:'Password must be at least 6 character.'})
})

export const signInValidation = z.object({
  email:z.string().email(),
  password:z.string().min(6,{message:'Password must be at least 6 character.'})
})
export const PostValidation = z.object({
 caption:z.string().min(5).max(500),
 file:z.custom<File[]>(),
 location:z.string().min(2).max(100),
 tags:z.string(),
})

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  bio: z.string(),
});