import {
  pgTable,
  uuid,
  varchar,
  integer,
  timestamp,
  boolean,
  date,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// enum for user roles
export const rolesEnum = pgEnum("roles", ["free", "tier1", "tier2", "admin"]);

// enum for freequency types
export const frequencyEnum = pgEnum("frequency", [
  "daily",
  "weekly",
  "monthly",
]);

// 🧑 USERS
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  userName: varchar("username", { length: 50 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  xp: integer("xp").notNull().default(0),
  role: rolesEnum().notNull().default("free"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 💪 HABITS
export const habits = pgTable("habits", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  icon: varchar("icon", { length: 100 }).notNull().default("🏆"),
  frequency: frequencyEnum().notNull().default("daily"),
  xpValue: integer("xp_value").notNull().default(10),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ⚡ HABIT TRANSACTIONS
// Each row represents a habit completion event (with XP snapshot)
export const habitTransactions = pgTable("habit_transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  habitId: uuid("habit_id")
    .references(() => habits.id, { onDelete: "cascade" })
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  date: date("date").notNull(),
  completed: boolean("completed").notNull().default(false),
  totalXpAtTime: integer("total_xp_at_time").notNull().default(0), // snapshot of user XP
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 🔗 RELATIONS
export const usersRelations = relations(users, ({ many }) => ({
  habits: many(habits),
  transactions: many(habitTransactions),
}));

export const habitsRelations = relations(habits, ({ one, many }) => ({
  user: one(users, {
    fields: [habits.userId],
    references: [users.id],
  }),
  transactions: many(habitTransactions),
}));

export const habitTransactionsRelations = relations(
  habitTransactions,
  ({ one }) => ({
    user: one(users, {
      fields: [habitTransactions.userId],
      references: [users.id],
    }),
    habit: one(habits, {
      fields: [habitTransactions.habitId],
      references: [habits.id],
    }),
  })
);
