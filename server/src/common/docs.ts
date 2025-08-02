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

export function swaggerDocs(): void {}
