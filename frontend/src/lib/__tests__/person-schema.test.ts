import { describe, it, expect } from "vitest";
import { personSchema } from "@/lib/person-schema";
import { educators } from "@/content/educators";

describe("personSchema", () => {
  it("builds a Person schema with the educator's name and DISE credential", () => {
    const s = personSchema(educators[0]) as Record<string, unknown>;
    expect(s["@type"]).toBe("Person");
    expect(s.name).toBe(educators[0].name);
    const credentials = s.hasCredential as Record<string, unknown>[];
    expect(credentials.some((c) => String(c.credentialCategory).match(/DISE/))).toBe(
      true,
    );
  });

  it("lists every qualification's institution as alumniOf", () => {
    const s = personSchema(educators[0]) as Record<string, unknown>;
    const alumniOf = s.alumniOf as Record<string, unknown>[];
    expect(alumniOf.map((a) => a.name)).toEqual(
      educators[0].education?.map((e) => e.institution),
    );
  });

  it("omits credential fields for an educator with no education listed", () => {
    const s = personSchema({ ...educators[0], education: undefined }) as Record<
      string,
      unknown
    >;
    expect(s).not.toHaveProperty("alumniOf");
    expect(s).not.toHaveProperty("hasCredential");
  });
});

describe("lead educator data", () => {
  // Naming the former employer is a deliberate call — the centre confirmed it
  // is fine to publish. An earlier version of this test asserted the opposite.
  it("is Venetia, naming Metta School and her SPED qualification", () => {
    const v = educators[0];
    expect(v.name).toBe("Venetia");
    expect(v.experience?.some((e) => e.org === "Metta School, Singapore")).toBe(true);
    expect(v.education?.some((e) => /DISE/.test(e.qualification))).toBe(true);
  });
});
