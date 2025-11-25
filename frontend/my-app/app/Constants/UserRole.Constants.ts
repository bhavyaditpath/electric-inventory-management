export const UserRole = {
  admin: "admin",
  branch: "branch",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];