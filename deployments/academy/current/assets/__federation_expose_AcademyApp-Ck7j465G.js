import { r as importShared } from "./_virtual___federation_fn_import-DbgI9kXY.js";
import { i as createMemoryRouter, n as RouterProvider2, t as routes } from "./globals-YhhAm8eE.js";
import { t as require_jsx_runtime } from "./jsx-runtime-C1_5xbj_.js";
// src/AcademyApp.tsx
var import_jsx_runtime = require_jsx_runtime();
var { useState } = await importShared("react");
function AcademyApp() {
	const [router] = useState(() => createMemoryRouter(routes));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouterProvider2, { router });
}
export { AcademyApp as default };
