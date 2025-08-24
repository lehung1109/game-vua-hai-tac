import { LoginInput, LoginResponse } from "@/app/api/auth/login/route";
import { http } from "../network/network.service";
import { RegisterInput, RegisterResponse } from "@/app/api/auth/register/route";
import { MeResponse } from "@/app/api/me/route";

export async function login(input: LoginInput): Promise<LoginResponse> {
  return http.post<LoginResponse>("/api/auth/login", input);
}

export async function logout(): Promise<void> {
  await http.post("/api/auth/logout");
}

export async function register(
  input: RegisterInput
): Promise<RegisterResponse> {
  return http.post<RegisterResponse>("/api/auth/register", input);
}

export async function getMe(): Promise<MeResponse> {
  return http.get<MeResponse>(process.env.NEXT_PUBLIC_BASE_URL + "/api/me");
}
