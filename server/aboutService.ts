import { db } from "../server/db";
import { sql } from "drizzle-orm";
import { aboutSections } from "../shared/schema";

export async function getAboutSection() {
  // Use Drizzle ORM to fetch the first about section row
  const [row] = await db.select().from(aboutSections).limit(1);
  if (!row) return null;
  // Map snake_case to camelCase for frontend compatibility
  return {
    ...row,
    projectsCompleted: row.projects_completed,
    yearsExperience: row.years_experience,
    satisfactionRate: row.satisfaction_rate,
    support: row.support,
    // Add more mappings if needed
  };
}
