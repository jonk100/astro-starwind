/**
 * @file src/actions/index.ts
 * @description Astro Actions registry.
 *
 * Add new domain action files here as features are built out.
 * Client usage: actions.auth.signIn, actions.habit.create, etc.
 */

import { auth } from "./auth.actions";
import { habit } from "./habit.actions";

export const server = {
  auth,
  habit,
};