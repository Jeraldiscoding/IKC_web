import { describe, it, expect } from "vitest";
import { personSchema } from "@/lib/person-schema";
import { educators } from "@/content/educators";

describe("personSchema", () => {
  it("builds a Person schema with the educator's name and DISE credential", () => {
    const s = personSchema(educators[0]) as Record<string, unknown>;
    expect(s["@type"]).toBe("Person");
    expect(s.name).toBe(educators[0].name);
    const credential = s.hasCredential as Record<string, unknown>;
    expect(String(credential.credentialCategory)).toMatch(/DISE/);
  });
});

describe("lead educator data", () => {
  it("is Venetia with SPED school experience, without naming the school", () => {
    const v = educators[0];
    expect(v.name).toBe("Venetia");
    expect(v.experience?.some((e) => e.org === "SPED School")).toBe(true);
    expect(v.experience?.some((e) => e.org === "METTA School")).toBe(false);
  });
});
