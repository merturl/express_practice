import { sign, verify, SignOptions } from "jsonwebtoken";

export const generateToken = (
  payload: any,
  options?: SignOptions
): string | null => {
  const jwtOptions: SignOptions = {
    issuer: "merturl.kr",
    expiresIn: "7d",
    ...options,
  };

  const secretKey = "helloworld";
  const token = sign(payload, secretKey, jwtOptions);
  return token;
};

export const decodeToken = <T>(token: string): T => {
  const secretKey = "helloworld";
  const decode = verify(token, secretKey);
  return decode as any;
};
