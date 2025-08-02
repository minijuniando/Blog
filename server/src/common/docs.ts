import type { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const swaggerSpec = swaggerJsdoc({
	definition: {
		info: {
			title: "Mini-juniando",
			description: "Mini-juniando API endpoints",
			version: "1.0.0",
		},
	},
	apis: ["../routes/*.ts"],
});

export function swaggerDocs(app: Express): void {
	app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
	app.use("/docs.json", (_, res) => {
		res.json(swaggerSpec);
	});
}
