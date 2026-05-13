import { api } from "./api";
import type { User } from "../models/user";

export type SignInPayload = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type SignInResponse = {
  token: string;
  user: User;
};

export type SignUpPayload = {
  fullName: string;
  username: string;
  email: string;
  password: string;
};

export type SignUpResponse = {
  message: string;
  user: User;
  token?: string;
};

export const signIn = (payload: SignInPayload) =>
  api.post<SignInResponse>("/sign-in", {
    body: payload,
  });

export const signUp = (payload: SignUpPayload) =>
  api.post<SignUpResponse>("/sign-up", {
    body: payload,
  });
