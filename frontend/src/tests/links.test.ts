// Author: Nathaniel White
// Description: This vite test script is for checking if the the links to other pages all render correctly
import { describe, it, expect, vi } from "vitest";

global.fetch = vi.fn(async (url) => {
  if (url.toString().startsWith("http://localhost")) {
    return new Response(null, { status: 200 });
  }
  return new Response(null, { status: 404 });
});

describe("Website Links Test", () => {
  it("should have all links working", async () => {
    const links = [...document.querySelectorAll("a")];

    for (const link of links) {
      const href = link.getAttribute("href");

      if (!href || href.startsWith("#")) continue;

      const response = await fetch(`http://localhost${href}`);
      expect(response.ok).toBe(true);
    }
  });
});
