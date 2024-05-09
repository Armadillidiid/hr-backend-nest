import { FastifyRequest } from "fastify";

/**
 * Retrieves the user object from a FastifyRequest object.
 *
 * @param request - The FastifyRequest object containing the user information.
 * @returns The user object extracted from the request.
 * @throws Error when the user object is not found in the request or does not have an 'id' property.
 */
export function getUserFromRequest(request: FastifyRequest) {
  if (!request.user) {
    throw new Error("User not found in request");
  }
  if (!("id" in request.user)) {
    throw new Error("User not found in request");
  }

  return request.user;
}
