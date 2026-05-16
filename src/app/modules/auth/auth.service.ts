const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  return {
    email: payload.email,
    token: "jwt-token-demo",
  };
};

export const AuthService = {
  loginUser,
};