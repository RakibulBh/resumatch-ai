import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  scans: defineTable({
    _id: v.union(v.id("_id"), v.null()),
    user: v.id("users"),
    resumeText: v.string(),
    aiResult: v.string(),
  }),
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    imgUrl: v.string(),
    name: v.string(),
  }),
});
