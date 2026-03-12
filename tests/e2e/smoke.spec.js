const { test, expect } = require("@playwright/test");

test("home, learn, and scramble smoke flow", async ({ page }) => {
	const browserErrors = [];

	page.on("pageerror", (error) => {
		browserErrors.push(`PAGEERROR: ${error.message}`);
	});

	page.on("console", (message) => {
		if (["error", "warning"].includes(message.type())) {
			browserErrors.push(
				`CONSOLE ${message.type().toUpperCase()}: ${message.text()}`
			);
		}
	});

	await page.goto("http://127.0.0.1:4173", { waitUntil: "networkidle" });

	await expect(
		page.getByText("Study the deck. Then race the scramble.")
	).toBeVisible();

	await page.getByText("Set 01").click();
	await expect(page.getByText("Set 01 is ready")).toBeVisible();
	await page.getByText("Learn deck").click();

	await expect(page.getByText("Study one card at a time.")).toBeVisible();
	await expect(page.getByText("1/26")).toBeVisible();
	await page.getByText("Flip card").click();
	await expect(page.getByText("Show word")).toBeVisible();
	await page.getByText("Next").click();
	await expect(page.getByText("2/26")).toBeVisible();
	await page.getByText("Previous").click();
	await expect(page.getByText("1/26")).toBeVisible();

	await page.goto("http://127.0.0.1:4173", { waitUntil: "networkidle" });
	await expect(
		page.getByText("Study the deck. Then race the scramble.")
	).toBeVisible();

	await page.getByText("Set 01").click();
	await page.getByText("Play scramble").click();

	await expect(
		page.getByText("Unscramble the word before time runs out.")
	).toBeVisible();
	await expect(page.getByText("1/26")).toBeVisible();

	await page.getByText("Reveal").click();
	await expect(page.getByText("Keep playing")).toBeVisible();
	await page.getByText("Keep playing").click();
	await expect(page.getByText("Reveal")).toBeVisible();

	await page.getByText("Reveal").click();
	await page.getByText("Next word").click();
	await expect(page.getByText("2/26")).toBeVisible();

	expect(browserErrors).toEqual([]);
});
