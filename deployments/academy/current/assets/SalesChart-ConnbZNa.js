import { t as require_jsx_runtime } from "./jsx-runtime-C1_5xbj_.js";
// src/components/SalesChart.tsx
var import_jsx_runtime = require_jsx_runtime();
function SalesChart({ title = "SuS Over Time", data = [
	{
		sart: "GS",
		sus: 12e3
	},
	{
		sart: "MS",
		sus: 15e3
	},
	{
		sart: "RS",
		sus: 18e3
	},
	{
		sart: "GS",
		sus: 16e3
	}
] }) {
	const maxSales = Math.max(...data.map((d) => d.sus));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "learning-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				style: { marginTop: 0 },
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "flex",
					alignItems: "flex-end",
					gap: "12px",
					height: "250px",
					paddingBottom: "16px"
				},
				children: data.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						flex: 1,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "flex-end"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							width: "100%",
							height: `${item.sus / maxSales * 200}px`,
							backgroundColor: "var(--learning-primary)",
							borderRadius: "4px 4px 0 0",
							marginBottom: "8px",
							transition: "all 0.2s ease"
						},
						title: `${item.sart}: $${item.sus.toLocaleString()}`,
						onMouseEnter: (e) => {
							e.currentTarget.style.opacity = "0.8";
						},
						onMouseLeave: (e) => {
							e.currentTarget.style.opacity = "1";
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							fontSize: "12px",
							color: "var(--learning-text-muted)",
							textAlign: "center"
						},
						children: item.sart
					})]
				}, index))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				style: {
					width: "100%",
					borderCollapse: "collapse",
					marginTop: "16px"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					style: { borderBottom: "1px solid var(--learning-border)" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						style: {
							textAlign: "left",
							padding: "8px",
							fontWeight: 600
						},
						children: "Schulart"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						style: {
							textAlign: "right",
							padding: "8px",
							fontWeight: 600
						},
						children: "SuS"
					})]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					style: { borderBottom: "1px solid var(--learning-border-light)" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: { padding: "8px" },
						children: item.sart
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: {
							textAlign: "right",
							padding: "8px"
						},
						children: item.sus.toLocaleString()
					})]
				}, index)) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					fontSize: "12px",
					color: "var(--learning-text-muted)",
					marginTop: "12px",
					marginBottom: 0
				},
				children: "💡 Ein interaktiver Plot"
			})
		]
	});
}
export { SalesChart as default };
