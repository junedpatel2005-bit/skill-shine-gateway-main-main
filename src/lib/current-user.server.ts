import { getRequest } from "@tanstack/react-start/server";

import { readSessionFromCookieHeader } from "./auth-session.server";
import { findUserById, type PublicUser, type UserRole } from "./user-db.server";

export function getCurrentUser() {
  try {
    const request = getRequest();
    const headers = request.headers;
    const session = readSessionFromCookieHeader(headers.get("cookie"));

    if (!session) {
      return null;
    }

    return findUserById(session.userId) ?? null;
  } catch (error) {
    console.error("getCurrentUser failed (resilient fallback to null):", error);
    return null;
  }
}

export function requireCurrentUser() {
  const user = getCurrentUser();

  if (!user) {
    throw new Error("Authentication required.");
  }

  return user;
}

export function requireCurrentUserRole(role: UserRole): PublicUser {
  const user = requireCurrentUser();

  if (user.role !== role) {
    throw new Error("You do not have permission to access this page.");
  }

  return user;
}
