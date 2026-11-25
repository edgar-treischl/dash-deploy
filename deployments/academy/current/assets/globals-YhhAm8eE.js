const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/SalesChart-ConnbZNa.js","assets/jsx-runtime-C1_5xbj_.js","assets/rolldown-runtime-CO0Nlsmt.js"])))=>i.map(i=>d[i]);
import { r as importShared } from "./_virtual___federation_fn_import-DbgI9kXY.js";
import { t as require_jsx_runtime } from "./jsx-runtime-C1_5xbj_.js";
// node_modules/react-router/dist/development/chunk-6KYCQHYJ.mjs
/**
* react-router v7.18.5
*
* Copyright (c) Remix Software Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE.md file in the root directory of this source tree.
*
* @license MIT
*/
var __typeError = (msg) => {
	throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i;
var PROTOCOL_RELATIVE_URL_REGEX = /^[\\/]{2}/;
function normalizeProtocolRelativeUrl(url, protocol) {
	return protocol + url.replace(/\\/g, "/");
}
var PopStateEventType = "popstate";
function isLocation(obj) {
	return typeof obj === "object" && obj != null && "pathname" in obj && "search" in obj && "hash" in obj && "state" in obj && "key" in obj;
}
function createMemoryHistory(options = {}) {
	let { initialEntries = ["/"], initialIndex, v5Compat = false } = options;
	let entries;
	entries = initialEntries.map((entry, index2) => createMemoryLocation(entry, typeof entry === "string" ? null : entry.state, index2 === 0 ? "default" : void 0, typeof entry === "string" ? void 0 : entry.mask));
	let index = clampIndex(initialIndex == null ? entries.length - 1 : initialIndex);
	let action = "POP";
	let listener = null;
	function clampIndex(n) {
		return Math.min(Math.max(n, 0), entries.length - 1);
	}
	function getCurrentLocation() {
		return entries[index];
	}
	function createMemoryLocation(to, state = null, key, mask) {
		let location = createLocation(entries ? getCurrentLocation().pathname : "/", to, state, key, mask);
		warning(location.pathname.charAt(0) === "/", `relative pathnames are not supported in memory history: ${JSON.stringify(to)}`);
		return location;
	}
	function createHref2(to) {
		return typeof to === "string" ? to : createPath(to);
	}
	return {
		get index() {
			return index;
		},
		get action() {
			return action;
		},
		get location() {
			return getCurrentLocation();
		},
		createHref: createHref2,
		createURL(to) {
			return new URL(createHref2(to), "http://localhost");
		},
		encodeLocation(to) {
			let path = typeof to === "string" ? parsePath(to) : to;
			return {
				pathname: path.pathname || "",
				search: path.search || "",
				hash: path.hash || ""
			};
		},
		push(to, state) {
			action = "PUSH";
			let nextLocation = isLocation(to) ? to : createMemoryLocation(to, state);
			index += 1;
			entries.splice(index, entries.length, nextLocation);
			if (v5Compat && listener) listener({
				action,
				location: nextLocation,
				delta: 1
			});
		},
		replace(to, state) {
			action = "REPLACE";
			let nextLocation = isLocation(to) ? to : createMemoryLocation(to, state);
			entries[index] = nextLocation;
			if (v5Compat && listener) listener({
				action,
				location: nextLocation,
				delta: 0
			});
		},
		go(delta) {
			action = "POP";
			let nextIndex = clampIndex(index + delta);
			let nextLocation = entries[nextIndex];
			index = nextIndex;
			if (listener) listener({
				action,
				location: nextLocation,
				delta
			});
		},
		listen(fn) {
			listener = fn;
			return () => {
				listener = null;
			};
		}
	};
}
function createBrowserHistory(options = {}) {
	function createBrowserLocation(window2, globalHistory) {
		let maskedLocation = globalHistory.state?.masked;
		let { pathname, search, hash } = maskedLocation || window2.location;
		return createLocation("", {
			pathname,
			search,
			hash
		}, globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default", maskedLocation ? {
			pathname: window2.location.pathname,
			search: window2.location.search,
			hash: window2.location.hash
		} : void 0);
	}
	function createBrowserHref(window2, to) {
		return typeof to === "string" ? to : createPath(to);
	}
	return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
function invariant(value, message) {
	if (value === false || value === null || typeof value === "undefined") throw new Error(message);
}
function warning(cond, message) {
	if (!cond) {
		if (typeof console !== "undefined") console.warn(message);
		try {
			throw new Error(message);
		} catch (e) {}
	}
}
function createKey() {
	return Math.random().toString(36).substring(2, 10);
}
function getHistoryState(location, index) {
	return {
		usr: location.state,
		key: location.key,
		idx: index,
		masked: location.mask ? {
			pathname: location.pathname,
			search: location.search,
			hash: location.hash
		} : void 0
	};
}
function createLocation(current, to, state = null, key, mask) {
	return {
		pathname: typeof current === "string" ? current : current.pathname,
		search: "",
		hash: "",
		...typeof to === "string" ? parsePath(to) : to,
		state,
		key: to && to.key || key || createKey(),
		mask
	};
}
function createPath({ pathname = "/", search = "", hash = "" }) {
	if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
	if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
	return pathname;
}
function parsePath(path) {
	let parsedPath = {};
	if (path) {
		let hashIndex = path.indexOf("#");
		if (hashIndex >= 0) {
			parsedPath.hash = path.substring(hashIndex);
			path = path.substring(0, hashIndex);
		}
		let searchIndex = path.indexOf("?");
		if (searchIndex >= 0) {
			parsedPath.search = path.substring(searchIndex);
			path = path.substring(0, searchIndex);
		}
		if (path) parsedPath.pathname = path;
	}
	return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref2, validateLocation, options = {}) {
	let { window: window2 = document.defaultView, v5Compat = false } = options;
	let globalHistory = window2.history;
	let action = "POP";
	let listener = null;
	let index = getIndex();
	if (index == null) {
		index = 0;
		globalHistory.replaceState({
			...globalHistory.state,
			idx: index
		}, "");
	}
	function getIndex() {
		return (globalHistory.state || { idx: null }).idx;
	}
	function handlePop() {
		action = "POP";
		let nextIndex = getIndex();
		let delta = nextIndex == null ? null : nextIndex - index;
		index = nextIndex;
		if (listener) listener({
			action,
			location: history.location,
			delta
		});
	}
	function push(to, state) {
		action = "PUSH";
		let location = isLocation(to) ? to : createLocation(history.location, to, state);
		if (validateLocation) validateLocation(location, to);
		index = getIndex() + 1;
		let historyState = getHistoryState(location, index);
		let url = history.createHref(location.mask || location);
		try {
			globalHistory.pushState(historyState, "", url);
		} catch (error) {
			if (error instanceof DOMException && error.name === "DataCloneError") throw error;
			window2.location.assign(url);
		}
		if (v5Compat && listener) listener({
			action,
			location: history.location,
			delta: 1
		});
	}
	function replace2(to, state) {
		action = "REPLACE";
		let location = isLocation(to) ? to : createLocation(history.location, to, state);
		if (validateLocation) validateLocation(location, to);
		index = getIndex();
		let historyState = getHistoryState(location, index);
		let url = history.createHref(location.mask || location);
		globalHistory.replaceState(historyState, "", url);
		if (v5Compat && listener) listener({
			action,
			location: history.location,
			delta: 0
		});
	}
	function createURL(to) {
		return createBrowserURLImpl(window2, to);
	}
	let history = {
		get action() {
			return action;
		},
		get location() {
			return getLocation(window2, globalHistory);
		},
		listen(fn) {
			if (listener) throw new Error("A history only accepts one active listener");
			window2.addEventListener(PopStateEventType, handlePop);
			listener = fn;
			return () => {
				window2.removeEventListener(PopStateEventType, handlePop);
				listener = null;
			};
		},
		createHref(to) {
			return createHref2(window2, to);
		},
		createURL,
		encodeLocation(to) {
			let url = createURL(to);
			return {
				pathname: url.pathname,
				search: url.search,
				hash: url.hash
			};
		},
		push,
		replace: replace2,
		go(n) {
			return globalHistory.go(n);
		}
	};
	return history;
}
function createBrowserURLImpl(windowImpl, to, isAbsolute = false) {
	let base = "http://localhost";
	if (windowImpl) base = windowImpl.location.origin !== "null" ? windowImpl.location.origin : windowImpl.location.href;
	invariant(base, "No window.location.(origin|href) available to create URL");
	let href = typeof to === "string" ? to : createPath(to);
	href = href.replace(/ $/, "%20");
	if (!isAbsolute && PROTOCOL_RELATIVE_URL_REGEX.test(href)) href = base + href;
	return new URL(href, base);
}
var _map;
var RouterContextProvider = class {
	/**
	* Create a new `RouterContextProvider` instance
	* @param init An optional initial context map to populate the provider with
	*/
	constructor(init) {
		__privateAdd(this, _map, /* @__PURE__ */ new Map());
		if (init) for (let [context, value] of init) this.set(context, value);
	}
	/**
	* Access a value from the context. If no value has been set for the context,
	* it will return the context's `defaultValue` if provided, or throw an error
	* if no `defaultValue` was set.
	* @param context The context to get the value for
	* @returns The value for the context, or the context's `defaultValue` if no
	* value was set
	*/
	get(context) {
		if (__privateGet(this, _map).has(context)) return __privateGet(this, _map).get(context);
		if (context.defaultValue !== void 0) return context.defaultValue;
		throw new Error("No value found for context");
	}
	/**
	* Set a value for the context. If the context already has a value set, this
	* will overwrite it.
	*
	* @param context The context to set the value for
	* @param value The value to set for the context
	* @returns {void}
	*/
	set(context, value) {
		__privateGet(this, _map).set(context, value);
	}
};
_map = /* @__PURE__ */ new WeakMap();
var unsupportedLazyRouteObjectKeys = /* @__PURE__ */ new Set([
	"lazy",
	"caseSensitive",
	"path",
	"id",
	"index",
	"children"
]);
function isUnsupportedLazyRouteObjectKey(key) {
	return unsupportedLazyRouteObjectKeys.has(key);
}
var unsupportedLazyRouteFunctionKeys = /* @__PURE__ */ new Set([
	"lazy",
	"caseSensitive",
	"path",
	"id",
	"index",
	"middleware",
	"children"
]);
function isUnsupportedLazyRouteFunctionKey(key) {
	return unsupportedLazyRouteFunctionKeys.has(key);
}
function isIndexRoute(route) {
	return route.index === true;
}
function convertRoutesToDataRoutes(routes, mapRouteProperties2, parentPath = [], manifest = {}, allowInPlaceMutations = false) {
	return routes.map((route, index) => {
		let treePath = [...parentPath, String(index)];
		let id = typeof route.id === "string" ? route.id : treePath.join("-");
		invariant(route.index !== true || !route.children, `Cannot specify children on an index route`);
		invariant(allowInPlaceMutations || !manifest[id], `Found a route id collision on id "${id}".  Route id's must be globally unique within Data Router usages`);
		if (isIndexRoute(route)) {
			let indexRoute = {
				...route,
				id
			};
			manifest[id] = mergeRouteUpdates(indexRoute, mapRouteProperties2(indexRoute));
			return indexRoute;
		} else {
			let pathOrLayoutRoute = {
				...route,
				id,
				children: void 0
			};
			manifest[id] = mergeRouteUpdates(pathOrLayoutRoute, mapRouteProperties2(pathOrLayoutRoute));
			if (route.children) pathOrLayoutRoute.children = convertRoutesToDataRoutes(route.children, mapRouteProperties2, treePath, manifest, allowInPlaceMutations);
			return pathOrLayoutRoute;
		}
	});
}
function mergeRouteUpdates(route, updates) {
	return Object.assign(route, {
		...updates,
		...typeof updates.lazy === "object" && updates.lazy != null ? { lazy: {
			...route.lazy,
			...updates.lazy
		} } : {}
	});
}
function matchRoutes(routes, locationArg, basename = "/") {
	return matchRoutesImpl(routes, locationArg, basename, false);
}
function matchRoutesImpl(routes, locationArg, basename, allowPartial, precomputedBranches) {
	let pathname = stripBasename((typeof locationArg === "string" ? parsePath(locationArg) : locationArg).pathname || "/", basename);
	if (pathname == null) return null;
	let branches = precomputedBranches ?? flattenAndRankRoutes(routes);
	let matches = null;
	let decoded = decodePath(pathname);
	for (let i = 0; matches == null && i < branches.length; ++i) matches = matchRouteBranch(branches[i], decoded, allowPartial);
	return matches;
}
function convertRouteMatchToUiMatch(match, loaderData) {
	let { route, pathname, params } = match;
	return {
		id: route.id,
		pathname,
		params,
		data: loaderData[route.id],
		loaderData: loaderData[route.id],
		handle: route.handle
	};
}
function flattenAndRankRoutes(routes) {
	let branches = flattenRoutes(routes);
	rankRouteBranches(branches);
	return branches;
}
function flattenRoutes(routes, branches = [], parentsMeta = [], parentPath = "", _hasParentOptionalSegments = false) {
	let flattenRoute = (route, index, hasParentOptionalSegments = _hasParentOptionalSegments, relativePath) => {
		let meta = {
			relativePath: relativePath === void 0 ? route.path || "" : relativePath,
			caseSensitive: route.caseSensitive === true,
			childrenIndex: index,
			route
		};
		if (meta.relativePath.startsWith("/")) {
			if (!meta.relativePath.startsWith(parentPath) && hasParentOptionalSegments) return;
			invariant(meta.relativePath.startsWith(parentPath), `Absolute route path "${meta.relativePath}" nested under path "${parentPath}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`);
			meta.relativePath = meta.relativePath.slice(parentPath.length);
		}
		let path = joinPaths([parentPath, meta.relativePath]);
		let routesMeta = parentsMeta.concat(meta);
		if (route.children && route.children.length > 0) {
			invariant(route.index !== true, `Index routes must not have child routes. Please remove all child routes from route path "${path}".`);
			flattenRoutes(route.children, branches, routesMeta, path, hasParentOptionalSegments);
		}
		if (route.path == null && !route.index) return;
		branches.push({
			path,
			score: computeScore(path, route.index),
			routesMeta: routesMeta.map((meta2, i) => {
				let [matcher, params] = compilePath(meta2.relativePath, meta2.caseSensitive, i === routesMeta.length - 1);
				return {
					...meta2,
					matcher,
					compiledParams: params
				};
			})
		});
	};
	routes.forEach((route, index) => {
		if (route.path === "" || !route.path?.includes("?")) flattenRoute(route, index);
		else for (let exploded of explodeOptionalSegments(route.path)) flattenRoute(route, index, true, exploded);
	});
	return branches;
}
function explodeOptionalSegments(path) {
	let segments = path.split("/");
	if (segments.length === 0) return [];
	let [first, ...rest] = segments;
	let isOptional = first.endsWith("?");
	let required = first.replace(/\?$/, "");
	if (rest.length === 0) return isOptional ? [required, ""] : [required];
	let restExploded = explodeOptionalSegments(rest.join("/"));
	let result = [];
	result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/")));
	if (isOptional) result.push(...restExploded);
	return result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
function rankRouteBranches(branches) {
	branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map((meta) => meta.childrenIndex), b.routesMeta.map((meta) => meta.childrenIndex)));
}
var paramRe = /^:[\w-]+$/;
var dynamicSegmentValue = 3;
var indexRouteValue = 2;
var emptySegmentValue = 1;
var staticSegmentValue = 10;
var splatPenalty = -2;
var isSplat = (s) => s === "*";
function computeScore(path, index) {
	let segments = path.split("/");
	let initialScore = segments.length;
	if (segments.some(isSplat)) initialScore += splatPenalty;
	if (index) initialScore += indexRouteValue;
	return segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a, b) {
	return a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]) ? a[a.length - 1] - b[b.length - 1] : 0;
}
function matchRouteBranch(branch, pathname, allowPartial = false) {
	let { routesMeta } = branch;
	let matchedParams = {};
	let matchedPathname = "/";
	let matches = [];
	for (let i = 0; i < routesMeta.length; ++i) {
		let meta = routesMeta[i];
		let end = i === routesMeta.length - 1;
		let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
		let pattern = {
			path: meta.relativePath,
			caseSensitive: meta.caseSensitive,
			end
		};
		let match = meta.matcher && meta.compiledParams ? matchPathImpl(pattern, remainingPathname, meta.matcher, meta.compiledParams) : matchPath(pattern, remainingPathname);
		let route = meta.route;
		if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) match = matchPath({
			path: meta.relativePath,
			caseSensitive: meta.caseSensitive,
			end: false
		}, remainingPathname);
		if (!match) return null;
		Object.assign(matchedParams, match.params);
		matches.push({
			params: matchedParams,
			pathname: joinPaths([matchedPathname, match.pathname]),
			pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
			route
		});
		if (match.pathnameBase !== "/") matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
	}
	return matches;
}
function matchPath(pattern, pathname) {
	if (typeof pattern === "string") pattern = {
		path: pattern,
		caseSensitive: false,
		end: true
	};
	let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
	return matchPathImpl(pattern, pathname, matcher, compiledParams);
}
function matchPathImpl(pattern, pathname, matcher, compiledParams) {
	let match = pathname.match(matcher);
	if (!match) return null;
	let matchedPathname = match[0];
	let pathnameBase = removeTrailingSlash(matchedPathname, 1);
	let captureGroups = match.slice(1);
	return {
		params: compiledParams.reduce((memo2, { paramName, isOptional }, index) => {
			if (paramName === "*") {
				let splatValue = captureGroups[index] || "";
				pathnameBase = removeTrailingSlash(matchedPathname.slice(0, matchedPathname.length - splatValue.length), 1);
			}
			const value = captureGroups[index];
			if (isOptional && !value) memo2[paramName] = void 0;
			else memo2[paramName] = (value || "").replace(/%2F/g, "/");
			return memo2;
		}, {}),
		pathname: matchedPathname,
		pathnameBase,
		pattern
	};
}
function compilePath(path, caseSensitive = false, end = true) {
	warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), `Route path "${path}" will be treated as if it were "${path.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, "/*")}".`);
	let params = [];
	let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (match, paramName, isOptional, index, str) => {
		params.push({
			paramName,
			isOptional: isOptional != null
		});
		if (isOptional) {
			let nextChar = str.charAt(index + match.length);
			if (nextChar && nextChar !== "/") return "/([^\\/]*)";
			return "(?:/([^\\/]*))?";
		}
		return "/([^\\/]+)";
	}).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
	if (path.endsWith("*")) {
		params.push({ paramName: "*" });
		regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
	} else if (end) regexpSource += "\\/*$";
	else if (path !== "" && path !== "/") regexpSource += "(?:(?=\\/|$))";
	return [new RegExp(regexpSource, caseSensitive ? void 0 : "i"), params];
}
function decodePath(value) {
	try {
		return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
	} catch (error) {
		warning(false, `The URL path "${value}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${error}).`);
		return value;
	}
}
function stripBasename(pathname, basename) {
	if (basename === "/") return pathname;
	if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) return null;
	let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
	let nextChar = pathname.charAt(startIndex);
	if (nextChar && nextChar !== "/") return null;
	return pathname.slice(startIndex) || "/";
}
function prependBasename({ basename, pathname }) {
	return pathname === "/" ? basename : joinPaths([basename, pathname]);
}
var isAbsoluteUrl = (url) => ABSOLUTE_URL_REGEX.test(url);
function resolvePath(to, fromPathname = "/") {
	let { pathname: toPathname, search = "", hash = "" } = typeof to === "string" ? parsePath(to) : to;
	let pathname;
	if (toPathname) {
		toPathname = removeDoubleSlashes(toPathname);
		if (toPathname.startsWith("/") || toPathname.startsWith("\\")) pathname = resolvePathname(toPathname.substring(1), "/");
		else pathname = resolvePathname(toPathname, fromPathname);
	} else pathname = fromPathname;
	return {
		pathname,
		search: normalizeSearch(search),
		hash: normalizeHash(hash)
	};
}
function resolvePathname(relativePath, fromPathname) {
	let segments = removeTrailingSlash(fromPathname).split("/");
	relativePath.split("/").forEach((segment) => {
		if (segment === "..") {
			if (segments.length > 1) segments.pop();
		} else if (segment !== ".") segments.push(segment);
	});
	return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
	return `Cannot include a '${char}' character in a manually specified \`to.${field}\` field [${JSON.stringify(path)}].  Please separate it out to the \`to.${dest}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function getPathContributingMatches(matches) {
	return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
}
function getResolveToMatches(matches) {
	let pathMatches = getPathContributingMatches(matches);
	return pathMatches.map((match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase);
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative = false) {
	let to;
	if (typeof toArg === "string") to = parsePath(toArg);
	else {
		to = { ...toArg };
		invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
		invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
		invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
	}
	let isEmptyPath = toArg === "" || to.pathname === "";
	let toPathname = isEmptyPath ? "/" : to.pathname;
	let from;
	if (toPathname == null) from = locationPathname;
	else {
		let routePathnameIndex = routePathnames.length - 1;
		if (!isPathRelative && toPathname.startsWith("..")) {
			let toSegments = toPathname.split("/");
			while (toSegments[0] === "..") {
				toSegments.shift();
				routePathnameIndex -= 1;
			}
			to.pathname = toSegments.join("/");
		}
		from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
	}
	let path = resolvePath(to, from);
	let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
	let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
	if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) path.pathname += "/";
	return path;
}
var removeDoubleSlashes = (path) => path.replace(/[\\/]{2,}/g, "/");
var joinPaths = (paths) => removeDoubleSlashes(paths.join("/"));
function removeTrailingSlash(path, minLength = 0) {
	let end = path.length;
	while (end > minLength && path.charCodeAt(end - 1) === 47) end--;
	return end === path.length ? path : path.slice(0, end);
}
var normalizePathname = (pathname) => removeTrailingSlash(pathname).replace(/^\/*/, "/");
var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
var SUPPORTED_ERROR_TYPES = [
	"EvalError",
	"RangeError",
	"ReferenceError",
	"SyntaxError",
	"TypeError",
	"URIError"
];
var ErrorResponseImpl = class {
	constructor(status, statusText, data2, internal = false) {
		this.status = status;
		this.statusText = statusText || "";
		this.internal = internal;
		if (data2 instanceof Error) {
			this.data = data2.toString();
			this.error = data2;
		} else this.data = data2;
	}
};
function isRouteErrorResponse(error) {
	return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
function getRoutePattern(matches) {
	return joinPaths(matches.map((m) => m.route.path).filter(Boolean)) || "/";
}
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
function parseToInfo(_to, basename) {
	let to = _to;
	if (typeof to !== "string" || !ABSOLUTE_URL_REGEX.test(to)) return {
		absoluteURL: void 0,
		isExternal: false,
		to
	};
	let absoluteURL = to;
	let isExternal = false;
	if (isBrowser) try {
		let currentUrl = new URL(window.location.href);
		let targetUrl = PROTOCOL_RELATIVE_URL_REGEX.test(to) ? new URL(normalizeProtocolRelativeUrl(to, currentUrl.protocol)) : new URL(to);
		let path = stripBasename(targetUrl.pathname, basename);
		if (targetUrl.origin === currentUrl.origin && path != null) to = path + targetUrl.search + targetUrl.hash;
		else isExternal = true;
	} catch (e) {
		warning(false, `<Link to="${to}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`);
	}
	return {
		absoluteURL,
		isExternal,
		to
	};
}
var UninstrumentedSymbol = Symbol("Uninstrumented");
function getRouteInstrumentationUpdates(fns, route) {
	let aggregated = {
		lazy: [],
		"lazy.loader": [],
		"lazy.action": [],
		"lazy.middleware": [],
		middleware: [],
		loader: [],
		action: []
	};
	fns.forEach((fn) => fn({
		id: route.id,
		index: route.index,
		path: route.path,
		instrument(i) {
			let keys = Object.keys(aggregated);
			for (let key of keys) if (i[key]) aggregated[key].push(i[key]);
		}
	}));
	let updates = {};
	if (typeof route.lazy === "function" && aggregated.lazy.length > 0) {
		let instrumented = wrapImpl(aggregated.lazy, route.lazy, () => void 0);
		if (instrumented) updates.lazy = instrumented;
	}
	if (typeof route.lazy === "object") {
		let lazyObject = route.lazy;
		[
			"middleware",
			"loader",
			"action"
		].forEach((key) => {
			let lazyFn = lazyObject[key];
			let instrumentations = aggregated[`lazy.${key}`];
			if (typeof lazyFn === "function" && instrumentations.length > 0) {
				let instrumented = wrapImpl(instrumentations, lazyFn, () => void 0);
				if (instrumented) updates.lazy = Object.assign(updates.lazy || {}, { [key]: instrumented });
			}
		});
	}
	["loader", "action"].forEach((key) => {
		let handler = route[key];
		if (typeof handler === "function" && aggregated[key].length > 0) {
			let original = handler[UninstrumentedSymbol] ?? handler;
			let instrumented = wrapImpl(aggregated[key], original, (...args) => getHandlerInfo(args[0]));
			if (instrumented) {
				if (key === "loader" && original.hydrate === true) instrumented.hydrate = true;
				instrumented[UninstrumentedSymbol] = original;
				updates[key] = instrumented;
			}
		}
	});
	if (route.middleware && route.middleware.length > 0 && aggregated.middleware.length > 0) updates.middleware = route.middleware.map((middleware) => {
		let original = middleware[UninstrumentedSymbol] ?? middleware;
		let instrumented = wrapImpl(aggregated.middleware, original, (...args) => getHandlerInfo(args[0]));
		if (instrumented) {
			instrumented[UninstrumentedSymbol] = original;
			return instrumented;
		}
		return middleware;
	});
	return updates;
}
function instrumentClientSideRouter(router, fns) {
	let aggregated = {
		navigate: [],
		fetch: []
	};
	fns.forEach((fn) => fn({ instrument(i) {
		let keys = Object.keys(i);
		for (let key of keys) if (i[key]) aggregated[key].push(i[key]);
	} }));
	if (aggregated.navigate.length > 0) {
		let navigate = router.navigate[UninstrumentedSymbol] ?? router.navigate;
		let instrumentedNavigate = wrapImpl(aggregated.navigate, navigate, (...args) => {
			let [to, opts] = args;
			return {
				to: typeof to === "number" || typeof to === "string" ? to : to ? createPath(to) : ".",
				...getRouterInfo(router, opts ?? {})
			};
		});
		if (instrumentedNavigate) {
			instrumentedNavigate[UninstrumentedSymbol] = navigate;
			router.navigate = instrumentedNavigate;
		}
	}
	if (aggregated.fetch.length > 0) {
		let fetch2 = router.fetch[UninstrumentedSymbol] ?? router.fetch;
		let instrumentedFetch = wrapImpl(aggregated.fetch, fetch2, (...args) => {
			let [key, , href, opts] = args;
			return {
				href: href ?? ".",
				fetcherKey: key,
				...getRouterInfo(router, opts ?? {})
			};
		});
		if (instrumentedFetch) {
			instrumentedFetch[UninstrumentedSymbol] = fetch2;
			router.fetch = instrumentedFetch;
		}
	}
	return router;
}
function wrapImpl(impls, handler, getInfo) {
	if (impls.length === 0) return null;
	return async (...args) => {
		let result = await recurseRight(impls, getInfo(...args), () => handler(...args), impls.length - 1);
		if (result.type === "error") throw result.value;
		return result.value;
	};
}
async function recurseRight(impls, info, handler, index) {
	let impl = impls[index];
	let result;
	if (!impl) try {
		result = {
			type: "success",
			value: await handler()
		};
	} catch (e) {
		result = {
			type: "error",
			value: e
		};
	}
	else {
		let handlerPromise = void 0;
		let callHandler = async () => {
			if (handlerPromise) console.error("You cannot call instrumented handlers more than once");
			else handlerPromise = recurseRight(impls, info, handler, index - 1);
			result = await handlerPromise;
			invariant(result, "Expected a result");
			if (result.type === "error" && result.value instanceof Error) return {
				status: "error",
				error: result.value
			};
			return {
				status: "success",
				error: void 0
			};
		};
		try {
			await impl(callHandler, info);
		} catch (e) {
			console.error("An instrumentation function threw an error:", e);
		}
		if (!handlerPromise) await callHandler();
		await handlerPromise;
	}
	if (result) return result;
	return {
		type: "error",
		value: /* @__PURE__ */ new Error("No result assigned in instrumentation chain.")
	};
}
function getHandlerInfo(args) {
	let { request, context, params, pattern } = args;
	return {
		request: getReadonlyRequest(request),
		params: { ...params },
		pattern,
		context: getReadonlyContext(context)
	};
}
function getRouterInfo(router, opts) {
	return {
		currentUrl: createPath(router.state.location),
		..."formMethod" in opts ? { formMethod: opts.formMethod } : {},
		..."formEncType" in opts ? { formEncType: opts.formEncType } : {},
		..."formData" in opts ? { formData: opts.formData } : {},
		..."body" in opts ? { body: opts.body } : {}
	};
}
function getReadonlyRequest(request) {
	return {
		method: request.method,
		url: request.url,
		headers: { get: (...args) => request.headers.get(...args) }
	};
}
function getReadonlyContext(context) {
	if (isPlainObject(context)) {
		let frozen = { ...context };
		Object.freeze(frozen);
		return frozen;
	} else return { get: (ctx) => context.get(ctx) };
}
var objectProtoNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function isPlainObject(thing) {
	if (thing === null || typeof thing !== "object") return false;
	const proto = Object.getPrototypeOf(thing);
	return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === objectProtoNames;
}
var DEFAULT_NAVIGATION_URL = new URL("http://localhost");
function getNavigatorCurrentUrl(navigator) {
	if (navigator.createURL) return navigator.createURL("/");
	try {
		return new URL(navigator.createHref("/"), DEFAULT_NAVIGATION_URL);
	} catch {
		return DEFAULT_NAVIGATION_URL;
	}
}
function isSameOrigin(a, b) {
	return a.origin === b.origin && (a.origin !== "null" || a.protocol === b.protocol && a.host === b.host);
}
function isExplicitUrl(destination, target) {
	if (destination.startsWith("//")) return true;
	let protocol = target.protocol.toLowerCase();
	if (!destination.toLowerCase().startsWith(protocol)) return false;
	return target.host === "" || destination.slice(protocol.length).startsWith("//");
}
function validateNavigationTarget(original, resolved, currentUrl, externalPolicy) {
	let originalUrl = null;
	try {
		originalUrl = original == null ? null : new URL(original, currentUrl);
	} catch {}
	let resolvedUrl = new URL(resolved, currentUrl);
	let originalIsExternal = originalUrl != null && !isSameOrigin(originalUrl, currentUrl);
	let resolvedIsExternal = !isSameOrigin(resolvedUrl, currentUrl);
	if (externalPolicy === "reject") {
		if (originalIsExternal || resolvedIsExternal) throw new Error("External navigation is not allowed");
	} else if (resolvedIsExternal) {
		if (originalUrl == null || !isExplicitUrl(original, originalUrl) || !isSameOrigin(originalUrl, resolvedUrl)) throw new Error("External navigation is not allowed");
	}
}
var validMutationMethodsArr = [
	"POST",
	"PUT",
	"PATCH",
	"DELETE"
];
var validMutationMethods = new Set(validMutationMethodsArr);
var validRequestMethodsArr = ["GET", ...validMutationMethodsArr];
var validRequestMethods = new Set(validRequestMethodsArr);
var redirectStatusCodes = /* @__PURE__ */ new Set([
	301,
	302,
	303,
	307,
	308
]);
var redirectPreserveMethodStatusCodes = /* @__PURE__ */ new Set([307, 308]);
var IDLE_NAVIGATION = {
	state: "idle",
	location: void 0,
	matches: void 0,
	historyAction: void 0,
	formMethod: void 0,
	formAction: void 0,
	formEncType: void 0,
	formData: void 0,
	json: void 0,
	text: void 0
};
var IDLE_FETCHER = {
	state: "idle",
	data: void 0,
	formMethod: void 0,
	formAction: void 0,
	formEncType: void 0,
	formData: void 0,
	json: void 0,
	text: void 0
};
var IDLE_BLOCKER = {
	state: "unblocked",
	proceed: void 0,
	reset: void 0,
	location: void 0
};
var defaultMapRouteProperties = (route) => ({ hasErrorBoundary: Boolean(route.hasErrorBoundary) });
var TRANSITIONS_STORAGE_KEY = "remix-router-transitions";
var ResetLoaderDataSymbol = Symbol("ResetLoaderData");
var _routes;
var _branches;
var _hmrRoutes;
var _hmrBranches;
var DataRoutes = class {
	constructor(routes) {
		__privateAdd(this, _routes);
		__privateAdd(this, _branches);
		__privateAdd(this, _hmrRoutes);
		__privateAdd(this, _hmrBranches);
		__privateSet(this, _routes, routes);
		__privateSet(this, _branches, flattenAndRankRoutes(routes));
	}
	/** The stable route tree */
	get stableRoutes() {
		return __privateGet(this, _routes);
	}
	/** The in-flight route tree if one is active, otherwise the stable tree */
	get activeRoutes() {
		return __privateGet(this, _hmrRoutes) ?? __privateGet(this, _routes);
	}
	/** Pre-computed branches */
	get branches() {
		return __privateGet(this, _hmrBranches) ?? __privateGet(this, _branches);
	}
	get hasHMRRoutes() {
		return __privateGet(this, _hmrRoutes) != null;
	}
	/** Replace the stable route tree and recompute its branches */
	setRoutes(routes) {
		__privateSet(this, _routes, routes);
		__privateSet(this, _branches, flattenAndRankRoutes(routes));
	}
	/** Set a new in-flight route tree and recompute its branches */
	setHmrRoutes(routes) {
		__privateSet(this, _hmrRoutes, routes);
		__privateSet(this, _hmrBranches, flattenAndRankRoutes(routes));
	}
	/** Commit in-flight routes/branches to the stable slot and clear in-flight */
	commitHmrRoutes() {
		if (__privateGet(this, _hmrRoutes)) {
			__privateSet(this, _routes, __privateGet(this, _hmrRoutes));
			__privateSet(this, _branches, __privateGet(this, _hmrBranches));
			__privateSet(this, _hmrRoutes, void 0);
			__privateSet(this, _hmrBranches, void 0);
		}
	}
};
_routes = /* @__PURE__ */ new WeakMap();
_branches = /* @__PURE__ */ new WeakMap();
_hmrRoutes = /* @__PURE__ */ new WeakMap();
_hmrBranches = /* @__PURE__ */ new WeakMap();
function createRouter(init) {
	const routerWindow = init.window ? init.window : typeof window !== "undefined" ? window : void 0;
	const isBrowser3 = typeof routerWindow !== "undefined" && typeof routerWindow.document !== "undefined" && typeof routerWindow.document.createElement !== "undefined";
	invariant(init.routes.length > 0, "You must provide a non-empty routes array to createRouter");
	let hydrationRouteProperties2 = init.hydrationRouteProperties || [];
	let _mapRouteProperties = init.mapRouteProperties || defaultMapRouteProperties;
	let mapRouteProperties2 = _mapRouteProperties;
	if (init.instrumentations) {
		let instrumentations = init.instrumentations;
		mapRouteProperties2 = (route) => {
			return {
				..._mapRouteProperties(route),
				...getRouteInstrumentationUpdates(instrumentations.map((i) => i.route).filter(Boolean), route)
			};
		};
	}
	let manifest = {};
	let dataRoutes = new DataRoutes(convertRoutesToDataRoutes(init.routes, mapRouteProperties2, void 0, manifest));
	let basename = init.basename || "/";
	if (!basename.startsWith("/")) basename = `/${basename}`;
	let dataStrategyImpl = init.dataStrategy || defaultDataStrategyWithMiddleware;
	let future = { ...init.future };
	let unlistenHistory = null;
	let subscribers = /* @__PURE__ */ new Set();
	let bufferedInitialStateUpdate = null;
	let savedScrollPositions2 = null;
	let getScrollRestorationKey2 = null;
	let getScrollPosition = null;
	let initialScrollRestored = init.hydrationData != null;
	let initialMatches = matchRoutesImpl(dataRoutes.activeRoutes, init.history.location, basename, false, dataRoutes.branches);
	let initialMatchesIsFOW = false;
	let initialErrors = null;
	let initialized;
	let renderFallback;
	if (initialMatches == null && !init.patchRoutesOnNavigation) {
		let error = getInternalRouterError(404, { pathname: init.history.location.pathname });
		let { matches, route } = getShortCircuitMatches(dataRoutes.activeRoutes);
		initialized = true;
		renderFallback = !initialized;
		initialMatches = matches;
		initialErrors = { [route.id]: error };
	} else {
		if (initialMatches && !init.hydrationData) {
			if (checkFogOfWar(initialMatches, dataRoutes.activeRoutes, init.history.location.pathname).active) initialMatches = null;
		}
		if (!initialMatches) {
			initialized = false;
			renderFallback = !initialized;
			initialMatches = [];
			let fogOfWar = checkFogOfWar(null, dataRoutes.activeRoutes, init.history.location.pathname);
			if (fogOfWar.active && fogOfWar.matches) {
				initialMatchesIsFOW = true;
				initialMatches = fogOfWar.matches;
			}
		} else if (initialMatches.some((m) => m.route.lazy)) {
			initialized = false;
			renderFallback = !initialized;
		} else if (!initialMatches.some((m) => routeHasLoaderOrMiddleware(m.route))) {
			initialized = true;
			renderFallback = !initialized;
		} else {
			let loaderData = init.hydrationData ? init.hydrationData.loaderData : null;
			let errors = init.hydrationData ? init.hydrationData.errors : null;
			let relevantMatches = initialMatches;
			if (errors) {
				let idx = initialMatches.findIndex((m) => errors[m.route.id] !== void 0);
				relevantMatches = relevantMatches.slice(0, idx + 1);
			}
			renderFallback = false;
			initialized = true;
			relevantMatches.forEach((m) => {
				let status = getRouteHydrationStatus(m.route, loaderData, errors);
				renderFallback = renderFallback || status.renderFallback;
				initialized = initialized && !status.shouldLoad;
			});
		}
	}
	let router;
	let state = {
		historyAction: init.history.action,
		location: init.history.location,
		matches: initialMatches,
		initialized,
		renderFallback,
		navigation: IDLE_NAVIGATION,
		restoreScrollPosition: init.hydrationData != null ? false : null,
		preventScrollReset: false,
		revalidation: "idle",
		loaderData: init.hydrationData && init.hydrationData.loaderData || {},
		actionData: init.hydrationData && init.hydrationData.actionData || null,
		errors: init.hydrationData && init.hydrationData.errors || initialErrors,
		fetchers: /* @__PURE__ */ new Map(),
		blockers: /* @__PURE__ */ new Map()
	};
	let pendingAction = "POP";
	let pendingPopstateNavigationDfd = null;
	let pendingPreventScrollReset = false;
	let pendingNavigationController;
	let pendingViewTransitionEnabled = false;
	let appliedViewTransitions = /* @__PURE__ */ new Map();
	let removePageHideEventListener = null;
	let isUninterruptedRevalidation = false;
	let isRevalidationRequired = false;
	let cancelledFetcherLoads = /* @__PURE__ */ new Set();
	let fetchControllers = /* @__PURE__ */ new Map();
	let incrementingLoadId = 0;
	let pendingNavigationLoadId = -1;
	let fetchReloadIds = /* @__PURE__ */ new Map();
	let fetchRedirectIds = /* @__PURE__ */ new Set();
	let fetchLoadMatches = /* @__PURE__ */ new Map();
	let activeFetchers = /* @__PURE__ */ new Map();
	let fetchersQueuedForDeletion = /* @__PURE__ */ new Set();
	let blockerFunctions = /* @__PURE__ */ new Map();
	let unblockBlockerHistoryUpdate = void 0;
	let pendingRevalidationDfd = null;
	function initialize() {
		unlistenHistory = init.history.listen(({ action: historyAction, location, delta }) => {
			if (unblockBlockerHistoryUpdate) {
				unblockBlockerHistoryUpdate();
				unblockBlockerHistoryUpdate = void 0;
				return;
			}
			warning(blockerFunctions.size === 0 || delta != null, "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");
			let blockerKey = shouldBlockNavigation({
				currentLocation: state.location,
				nextLocation: location,
				historyAction
			});
			if (blockerKey && delta != null) {
				let nextHistoryUpdatePromise = new Promise((resolve) => {
					unblockBlockerHistoryUpdate = resolve;
				});
				init.history.go(delta * -1);
				updateBlocker(blockerKey, {
					state: "blocked",
					location,
					proceed() {
						updateBlocker(blockerKey, {
							state: "proceeding",
							proceed: void 0,
							reset: void 0,
							location
						});
						nextHistoryUpdatePromise.then(() => init.history.go(delta));
					},
					reset() {
						let blockers = new Map(state.blockers);
						blockers.set(blockerKey, IDLE_BLOCKER);
						updateState({ blockers });
					}
				});
				pendingPopstateNavigationDfd?.resolve();
				pendingPopstateNavigationDfd = null;
				return;
			}
			return startNavigation(historyAction, location);
		});
		if (isBrowser3) {
			restoreAppliedTransitions(routerWindow, appliedViewTransitions);
			let _saveAppliedTransitions = () => persistAppliedTransitions(routerWindow, appliedViewTransitions);
			routerWindow.addEventListener("pagehide", _saveAppliedTransitions);
			removePageHideEventListener = () => routerWindow.removeEventListener("pagehide", _saveAppliedTransitions);
		}
		if (!state.initialized) startNavigation("POP", state.location, { initialHydration: true });
		return router;
	}
	function dispose() {
		if (unlistenHistory) unlistenHistory();
		if (removePageHideEventListener) removePageHideEventListener();
		subscribers.clear();
		pendingNavigationController && pendingNavigationController.abort();
		state.fetchers.forEach((_, key) => deleteFetcher(state.fetchers, key));
		state.blockers.forEach((_, key) => deleteBlocker(key));
	}
	function subscribe(fn) {
		subscribers.add(fn);
		if (bufferedInitialStateUpdate) {
			let { newErrors } = bufferedInitialStateUpdate;
			bufferedInitialStateUpdate = null;
			fn(state, {
				deletedFetchers: [],
				newErrors,
				viewTransitionOpts: void 0,
				flushSync: false
			});
		}
		return () => subscribers.delete(fn);
	}
	function updateState(newState, opts = {}) {
		if (newState.matches) newState.matches = newState.matches.map((m) => {
			let route = manifest[m.route.id];
			let matchRoute = m.route;
			if (matchRoute.element !== route.element || matchRoute.errorElement !== route.errorElement || matchRoute.hydrateFallbackElement !== route.hydrateFallbackElement) return {
				...m,
				route
			};
			return m;
		});
		state = {
			...state,
			...newState
		};
		let unmountedFetchers = [];
		let mountedFetchers = [];
		state.fetchers.forEach((fetcher, key) => {
			if (fetcher.state === "idle") {
				if (fetchersQueuedForDeletion.has(key)) unmountedFetchers.push(key);
				else mountedFetchers.push(key);
			}
		});
		fetchersQueuedForDeletion.forEach((key) => {
			if (!state.fetchers.has(key) && !fetchControllers.has(key)) unmountedFetchers.push(key);
		});
		if (subscribers.size === 0) bufferedInitialStateUpdate = { newErrors: newState.errors ?? null };
		[...subscribers].forEach((subscriber) => subscriber(state, {
			deletedFetchers: unmountedFetchers,
			newErrors: newState.errors ?? null,
			viewTransitionOpts: opts.viewTransitionOpts,
			flushSync: opts.flushSync === true
		}));
		unmountedFetchers.forEach((key) => deleteFetcher(state.fetchers, key));
		mountedFetchers.forEach((key) => state.fetchers.delete(key));
	}
	function completeNavigation(location, newState, { flushSync } = {}) {
		let isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && location.state?._isRedirect !== true;
		let actionData;
		if (newState.actionData) {
			if (Object.keys(newState.actionData).length > 0) actionData = newState.actionData;
			else actionData = null;
		} else if (isActionReload) actionData = state.actionData;
		else actionData = null;
		let loaderData = newState.loaderData ? mergeLoaderData(state.loaderData, newState.loaderData, newState.matches || [], newState.errors) : state.loaderData;
		let blockers = state.blockers;
		if (blockers.size > 0) {
			blockers = new Map(blockers);
			blockers.forEach((_, k) => blockers.set(k, IDLE_BLOCKER));
		}
		let restoreScrollPosition = isUninterruptedRevalidation ? false : getSavedScrollPosition(location, newState.matches || state.matches);
		let preventScrollReset = pendingPreventScrollReset === true || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && location.state?._isRedirect !== true;
		dataRoutes.commitHmrRoutes();
		if (isUninterruptedRevalidation) {} else if (pendingAction === "POP") {} else if (pendingAction === "PUSH") init.history.push(location, location.state);
		else if (pendingAction === "REPLACE") init.history.replace(location, location.state);
		let viewTransitionOpts;
		if (pendingAction === "POP" && !isUninterruptedRevalidation && location !== state.location) {
			let priorPaths = appliedViewTransitions.get(state.location.pathname);
			if (priorPaths && priorPaths.has(location.pathname)) viewTransitionOpts = {
				currentLocation: state.location,
				nextLocation: location
			};
			else if (appliedViewTransitions.has(location.pathname)) viewTransitionOpts = {
				currentLocation: location,
				nextLocation: state.location
			};
		} else if (pendingViewTransitionEnabled) {
			let toPaths = appliedViewTransitions.get(state.location.pathname);
			if (toPaths) toPaths.add(location.pathname);
			else {
				toPaths = /* @__PURE__ */ new Set([location.pathname]);
				appliedViewTransitions.set(state.location.pathname, toPaths);
			}
			viewTransitionOpts = {
				currentLocation: state.location,
				nextLocation: location
			};
		}
		updateState({
			...newState,
			actionData,
			loaderData,
			historyAction: pendingAction,
			location,
			initialized: true,
			renderFallback: false,
			navigation: IDLE_NAVIGATION,
			revalidation: "idle",
			restoreScrollPosition,
			preventScrollReset,
			blockers
		}, {
			viewTransitionOpts,
			flushSync: flushSync === true
		});
		pendingAction = "POP";
		pendingPreventScrollReset = false;
		pendingViewTransitionEnabled = false;
		isUninterruptedRevalidation = false;
		isRevalidationRequired = false;
		pendingPopstateNavigationDfd?.resolve();
		pendingPopstateNavigationDfd = null;
		pendingRevalidationDfd?.resolve();
		pendingRevalidationDfd = null;
	}
	async function navigate(to, opts) {
		pendingPopstateNavigationDfd?.resolve();
		pendingPopstateNavigationDfd = null;
		if (typeof to === "number") {
			if (!pendingPopstateNavigationDfd) pendingPopstateNavigationDfd = createDeferred();
			let promise = pendingPopstateNavigationDfd.promise;
			init.history.go(to);
			return promise;
		}
		let { path, submission, error } = normalizeNavigateOptions(false, normalizeTo(state.location, state.matches, basename, to, opts?.fromRouteId, opts?.relative), opts);
		let maskPath;
		if (opts?.mask) {
			let partialPath = typeof opts.mask === "string" ? parsePath(opts.mask) : {
				...state.location.mask,
				...opts.mask
			};
			maskPath = {
				pathname: partialPath.pathname ?? "",
				search: partialPath.search ?? "",
				hash: partialPath.hash ?? ""
			};
			if (PROTOCOL_RELATIVE_URL_REGEX.test(maskPath.pathname)) throw new Error("External navigation is not allowed");
			else if (maskPath.pathname.startsWith("\\")) maskPath.pathname = maskPath.pathname.replace(/^\\+/, "/");
			validateNavigationTarget(typeof opts.mask === "string" ? opts.mask : createPath(opts.mask), createPath(maskPath), init.history.createURL("/"), "reject");
		}
		let currentLocation = state.location;
		let nextLocation = createLocation(currentLocation, path, opts && opts.state, void 0, maskPath);
		nextLocation = {
			...nextLocation,
			...init.history.encodeLocation(nextLocation)
		};
		validateNavigationTarget(to == null ? init.history.createHref(state.location) : typeof to === "string" ? to : createPath(to), init.history.createHref(nextLocation.mask || nextLocation), init.history.createURL("/"), "reject");
		let userReplace = opts && opts.replace != null ? opts.replace : void 0;
		let historyAction = "PUSH";
		if (userReplace === true) historyAction = "REPLACE";
		else if (userReplace === false) {} else if (submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search) historyAction = "REPLACE";
		let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : void 0;
		let flushSync = (opts && opts.flushSync) === true;
		let blockerKey = shouldBlockNavigation({
			currentLocation,
			nextLocation,
			historyAction
		});
		if (blockerKey) {
			updateBlocker(blockerKey, {
				state: "blocked",
				location: nextLocation,
				proceed() {
					updateBlocker(blockerKey, {
						state: "proceeding",
						proceed: void 0,
						reset: void 0,
						location: nextLocation
					});
					navigate(to, opts);
				},
				reset() {
					let blockers = new Map(state.blockers);
					blockers.set(blockerKey, IDLE_BLOCKER);
					updateState({ blockers });
				}
			});
			return;
		}
		await startNavigation(historyAction, nextLocation, {
			submission,
			pendingError: error,
			preventScrollReset,
			replace: opts && opts.replace,
			enableViewTransition: opts && opts.viewTransition,
			flushSync,
			callSiteDefaultShouldRevalidate: opts && opts.defaultShouldRevalidate
		});
	}
	function revalidate() {
		if (!pendingRevalidationDfd) pendingRevalidationDfd = createDeferred();
		interruptActiveLoads();
		updateState({ revalidation: "loading" });
		let promise = pendingRevalidationDfd.promise;
		if (state.navigation.state === "submitting") return promise;
		if (state.navigation.state === "idle") {
			startNavigation(state.historyAction, state.location, { startUninterruptedRevalidation: true });
			return promise;
		}
		startNavigation(pendingAction || state.historyAction, state.navigation.location, {
			overrideNavigation: state.navigation,
			enableViewTransition: pendingViewTransitionEnabled === true
		});
		return promise;
	}
	async function startNavigation(historyAction, location, opts) {
		pendingNavigationController && pendingNavigationController.abort();
		pendingNavigationController = null;
		pendingAction = historyAction;
		isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true;
		saveScrollPosition(state.location, state.matches);
		pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
		pendingViewTransitionEnabled = (opts && opts.enableViewTransition) === true;
		let routesToUse = dataRoutes.activeRoutes;
		let matches = opts?.initialHydration && state.matches && state.matches.length > 0 && !initialMatchesIsFOW ? state.matches : matchRoutesImpl(routesToUse, location, basename, false, dataRoutes.branches);
		let flushSync = (opts && opts.flushSync) === true;
		if (matches && state.initialized && !isRevalidationRequired && isHashChangeOnly(state.location, location) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
			completeNavigation(location, { matches }, { flushSync });
			return;
		}
		let fogOfWar = checkFogOfWar(matches, routesToUse, location.pathname);
		if (fogOfWar.active && fogOfWar.matches) matches = fogOfWar.matches;
		if (!matches) {
			let { error, notFoundMatches, route } = handleNavigational404(location.pathname);
			completeNavigation(location, {
				matches: notFoundMatches,
				loaderData: {},
				errors: { [route.id]: error }
			}, { flushSync });
			return;
		}
		let loadingNavigation = opts && opts.overrideNavigation ? {
			...opts.overrideNavigation,
			matches,
			historyAction
		} : void 0;
		pendingNavigationController = new AbortController();
		let request = createClientSideRequest(init.history, location, pendingNavigationController.signal, opts && opts.submission);
		let scopedContext = init.getContext ? await init.getContext() : new RouterContextProvider();
		let pendingActionResult;
		if (opts && opts.pendingError) pendingActionResult = [findNearestBoundary(matches).route.id, {
			type: "error",
			error: opts.pendingError
		}];
		else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
			let actionResult = await handleAction(request, location, opts.submission, matches, historyAction, scopedContext, fogOfWar.active, opts && opts.initialHydration === true, {
				replace: opts.replace,
				flushSync
			});
			if (actionResult.shortCircuited) return;
			if (actionResult.pendingActionResult) {
				let [routeId, result] = actionResult.pendingActionResult;
				if (isErrorResult(result) && isRouteErrorResponse(result.error) && result.error.status === 404) {
					pendingNavigationController = null;
					completeNavigation(location, {
						matches: actionResult.matches,
						loaderData: {},
						errors: { [routeId]: result.error }
					});
					return;
				}
			}
			matches = actionResult.matches || matches;
			pendingActionResult = actionResult.pendingActionResult;
			loadingNavigation = getLoadingNavigation(location, matches, historyAction, opts.submission);
			flushSync = false;
			fogOfWar.active = false;
			request = createClientSideRequest(init.history, request.url, request.signal);
		}
		let { shortCircuited, matches: updatedMatches, loaderData, errors, workingFetchers } = await handleLoaders(request, location, matches, historyAction, scopedContext, fogOfWar.active, loadingNavigation, opts && opts.submission, opts && opts.fetcherSubmission, opts && opts.replace, opts && opts.initialHydration === true, flushSync, pendingActionResult, opts && opts.callSiteDefaultShouldRevalidate);
		if (shortCircuited) return;
		pendingNavigationController = null;
		completeNavigation(location, {
			matches: updatedMatches || matches,
			...getActionDataForCommit(pendingActionResult),
			loaderData,
			errors,
			...workingFetchers ? { fetchers: workingFetchers } : {}
		});
	}
	async function handleAction(request, location, submission, matches, historyAction, scopedContext, isFogOfWar, initialHydration, opts = {}) {
		interruptActiveLoads();
		updateState({ navigation: getSubmittingNavigation(location, matches, historyAction, submission) }, { flushSync: opts.flushSync === true });
		if (isFogOfWar) {
			let discoverResult = await discoverRoutes(matches, location.pathname, request.signal);
			if (discoverResult.type === "aborted") return { shortCircuited: true };
			else if (discoverResult.type === "error") {
				if (discoverResult.partialMatches.length === 0) {
					let { matches: matches2, route } = getShortCircuitMatches(dataRoutes.activeRoutes);
					return {
						matches: matches2,
						pendingActionResult: [route.id, {
							type: "error",
							error: discoverResult.error
						}]
					};
				}
				let boundaryId = findNearestBoundary(discoverResult.partialMatches).route.id;
				return {
					matches: discoverResult.partialMatches,
					pendingActionResult: [boundaryId, {
						type: "error",
						error: discoverResult.error
					}]
				};
			} else if (!discoverResult.matches) {
				let { notFoundMatches, error, route } = handleNavigational404(location.pathname);
				return {
					matches: notFoundMatches,
					pendingActionResult: [route.id, {
						type: "error",
						error
					}]
				};
			} else matches = discoverResult.matches;
		}
		let result;
		let actionMatch = getTargetMatch(matches, location);
		if (!actionMatch.route.action && !actionMatch.route.lazy) result = {
			type: "error",
			error: getInternalRouterError(405, {
				method: request.method,
				pathname: location.pathname,
				routeId: actionMatch.route.id
			})
		};
		else {
			let results = await callDataStrategy(request, location, getTargetedDataStrategyMatches(mapRouteProperties2, manifest, request, location, matches, actionMatch, initialHydration ? [] : hydrationRouteProperties2, scopedContext), scopedContext, null);
			result = results[actionMatch.route.id];
			if (!result) {
				for (let match of matches) if (results[match.route.id]) {
					result = results[match.route.id];
					break;
				}
			}
			if (request.signal.aborted) return { shortCircuited: true };
		}
		if (isRedirectResult(result)) {
			let replace2;
			if (opts && opts.replace != null) replace2 = opts.replace;
			else replace2 = normalizeRedirectLocation(result.response.headers.get("Location"), new URL(request.url), basename, init.history) === state.location.pathname + state.location.search;
			await startRedirectNavigation(request, result, true, {
				submission,
				replace: replace2
			});
			return { shortCircuited: true };
		}
		if (isErrorResult(result)) {
			let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
			if ((opts && opts.replace) !== true) pendingAction = "PUSH";
			return {
				matches,
				pendingActionResult: [
					boundaryMatch.route.id,
					result,
					actionMatch.route.id
				]
			};
		}
		return {
			matches,
			pendingActionResult: [actionMatch.route.id, result]
		};
	}
	async function handleLoaders(request, location, matches, historyAction, scopedContext, isFogOfWar, overrideNavigation, submission, fetcherSubmission, replace2, initialHydration, flushSync, pendingActionResult, callSiteDefaultShouldRevalidate) {
		let loadingNavigation = overrideNavigation || getLoadingNavigation(location, matches, historyAction, submission);
		let activeSubmission = submission || fetcherSubmission || getSubmissionFromNavigation(loadingNavigation);
		let shouldUpdateNavigationState = !isUninterruptedRevalidation && !initialHydration;
		if (isFogOfWar) {
			if (shouldUpdateNavigationState) {
				let actionData = getUpdatedActionData(pendingActionResult);
				updateState({
					navigation: loadingNavigation,
					...actionData !== void 0 ? { actionData } : {}
				}, { flushSync });
			}
			let discoverResult = await discoverRoutes(matches, location.pathname, request.signal);
			if (discoverResult.type === "aborted") return { shortCircuited: true };
			else if (discoverResult.type === "error") {
				if (discoverResult.partialMatches.length === 0) {
					let { matches: matches2, route } = getShortCircuitMatches(dataRoutes.activeRoutes);
					return {
						matches: matches2,
						loaderData: {},
						errors: { [route.id]: discoverResult.error }
					};
				}
				let boundaryId = findNearestBoundary(discoverResult.partialMatches).route.id;
				return {
					matches: discoverResult.partialMatches,
					loaderData: {},
					errors: { [boundaryId]: discoverResult.error }
				};
			} else if (!discoverResult.matches) {
				let { error, notFoundMatches, route } = handleNavigational404(location.pathname);
				return {
					matches: notFoundMatches,
					loaderData: {},
					errors: { [route.id]: error }
				};
			} else matches = discoverResult.matches;
		}
		let routesToUse = dataRoutes.activeRoutes;
		let { dsMatches, revalidatingFetchers } = getMatchesToLoad(request, scopedContext, mapRouteProperties2, manifest, init.history, state, matches, activeSubmission, location, initialHydration ? [] : hydrationRouteProperties2, initialHydration === true, isRevalidationRequired, cancelledFetcherLoads, fetchersQueuedForDeletion, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, init.patchRoutesOnNavigation != null, dataRoutes.branches, pendingActionResult, callSiteDefaultShouldRevalidate);
		pendingNavigationLoadId = ++incrementingLoadId;
		if (!init.dataStrategy && !dsMatches.some((m) => m.shouldLoad) && !dsMatches.some((m) => m.route.middleware && m.route.middleware.length > 0) && revalidatingFetchers.length === 0) {
			let workingFetchers2 = new Map(state.fetchers);
			let didUpdateFetcherRedirects2 = markFetchRedirectsDone(workingFetchers2);
			completeNavigation(location, {
				matches,
				loaderData: {},
				errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? { [pendingActionResult[0]]: pendingActionResult[1].error } : null,
				...getActionDataForCommit(pendingActionResult),
				...didUpdateFetcherRedirects2 ? { fetchers: workingFetchers2 } : {}
			}, { flushSync });
			return { shortCircuited: true };
		}
		if (shouldUpdateNavigationState) {
			let updates = {};
			if (!isFogOfWar) {
				updates.navigation = loadingNavigation;
				let actionData = getUpdatedActionData(pendingActionResult);
				if (actionData !== void 0) updates.actionData = actionData;
			}
			if (revalidatingFetchers.length > 0) updates.fetchers = getUpdatedRevalidatingFetchers(revalidatingFetchers);
			updateState(updates, { flushSync });
		}
		revalidatingFetchers.forEach((rf) => {
			abortFetcher(rf.key);
			if (rf.controller) fetchControllers.set(rf.key, rf.controller);
		});
		let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((f) => abortFetcher(f.key));
		if (pendingNavigationController) pendingNavigationController.signal.addEventListener("abort", abortPendingFetchRevalidations);
		let { loaderResults, fetcherResults } = await callLoadersAndMaybeResolveData(dsMatches, revalidatingFetchers, request, location, scopedContext);
		if (request.signal.aborted) return { shortCircuited: true };
		if (pendingNavigationController) pendingNavigationController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
		revalidatingFetchers.forEach((rf) => fetchControllers.delete(rf.key));
		let redirect2 = findRedirect(loaderResults);
		if (redirect2) {
			await startRedirectNavigation(request, redirect2.result, true, { replace: replace2 });
			return { shortCircuited: true };
		}
		redirect2 = findRedirect(fetcherResults);
		if (redirect2) {
			fetchRedirectIds.add(redirect2.key);
			await startRedirectNavigation(request, redirect2.result, true, { replace: replace2 });
			return { shortCircuited: true };
		}
		let workingFetchers = new Map(state.fetchers);
		let { loaderData, errors } = processLoaderData(state, matches, loaderResults, pendingActionResult, revalidatingFetchers, fetcherResults, workingFetchers);
		if (initialHydration && state.errors) errors = {
			...state.errors,
			...errors
		};
		let didUpdateFetcherRedirects = markFetchRedirectsDone(workingFetchers);
		let didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId, workingFetchers);
		let shouldUpdateFetchers = didUpdateFetcherRedirects || didAbortFetchLoads || revalidatingFetchers.length > 0;
		return {
			matches,
			loaderData,
			errors,
			...shouldUpdateFetchers ? { workingFetchers } : {}
		};
	}
	function getUpdatedActionData(pendingActionResult) {
		if (pendingActionResult && !isErrorResult(pendingActionResult[1])) return { [pendingActionResult[0]]: pendingActionResult[1].data };
		else if (state.actionData) {
			if (Object.keys(state.actionData).length === 0) return null;
			else return state.actionData;
		}
	}
	function getUpdatedRevalidatingFetchers(revalidatingFetchers) {
		let workingFetchers = new Map(state.fetchers);
		revalidatingFetchers.forEach((rf) => {
			let fetcher = workingFetchers.get(rf.key);
			let revalidatingFetcher = getLoadingFetcher(void 0, fetcher ? fetcher.data : void 0);
			workingFetchers.set(rf.key, revalidatingFetcher);
		});
		return workingFetchers;
	}
	async function fetch2(key, routeId, href, opts) {
		abortFetcher(key);
		let flushSync = (opts && opts.flushSync) === true;
		let routesToUse = dataRoutes.activeRoutes;
		let normalizedPath = normalizeTo(state.location, state.matches, basename, href, routeId, opts?.relative);
		let matches = matchRoutesImpl(routesToUse, normalizedPath, basename, false, dataRoutes.branches);
		let fogOfWar = checkFogOfWar(matches, routesToUse, normalizedPath);
		if (fogOfWar.active && fogOfWar.matches) matches = fogOfWar.matches;
		if (!matches) {
			setFetcherError(key, routeId, getInternalRouterError(404, { pathname: normalizedPath }), { flushSync });
			return;
		}
		let { path, submission, error } = normalizeNavigateOptions(true, normalizedPath, opts);
		if (error) {
			setFetcherError(key, routeId, error, { flushSync });
			return;
		}
		let scopedContext = init.getContext ? await init.getContext() : new RouterContextProvider();
		let preventScrollReset = (opts && opts.preventScrollReset) === true;
		if (submission && isMutationMethod(submission.formMethod)) {
			await handleFetcherAction(key, routeId, path, matches, scopedContext, fogOfWar.active, flushSync, preventScrollReset, submission, opts && opts.defaultShouldRevalidate);
			return;
		}
		fetchLoadMatches.set(key, {
			routeId,
			path
		});
		await handleFetcherLoader(key, routeId, path, matches, scopedContext, fogOfWar.active, flushSync, preventScrollReset, submission);
	}
	async function handleFetcherAction(key, routeId, path, requestMatches, scopedContext, isFogOfWar, flushSync, preventScrollReset, submission, callSiteDefaultShouldRevalidate) {
		interruptActiveLoads();
		fetchLoadMatches.delete(key);
		updateFetcherState(key, getSubmittingFetcher(submission, state.fetchers.get(key)), { flushSync });
		let abortController = new AbortController();
		let fetchRequest = createClientSideRequest(init.history, path, abortController.signal, submission);
		if (isFogOfWar) {
			let discoverResult = await discoverRoutes(requestMatches, new URL(fetchRequest.url).pathname, fetchRequest.signal, key);
			if (discoverResult.type === "aborted") return;
			else if (discoverResult.type === "error") {
				setFetcherError(key, routeId, discoverResult.error, { flushSync });
				return;
			} else if (!discoverResult.matches) {
				setFetcherError(key, routeId, getInternalRouterError(404, { pathname: path }), { flushSync });
				return;
			} else requestMatches = discoverResult.matches;
		}
		let match = getTargetMatch(requestMatches, path);
		if (!match.route.action && !match.route.lazy) {
			setFetcherError(key, routeId, getInternalRouterError(405, {
				method: submission.formMethod,
				pathname: path,
				routeId
			}), { flushSync });
			return;
		}
		fetchControllers.set(key, abortController);
		let originatingLoadId = incrementingLoadId;
		let fetchMatches = getTargetedDataStrategyMatches(mapRouteProperties2, manifest, fetchRequest, path, requestMatches, match, hydrationRouteProperties2, scopedContext);
		let actionResults = await callDataStrategy(fetchRequest, path, fetchMatches, scopedContext, key);
		let actionResult = actionResults[match.route.id];
		if (!actionResult) {
			for (let match2 of fetchMatches) if (actionResults[match2.route.id]) {
				actionResult = actionResults[match2.route.id];
				break;
			}
		}
		if (fetchRequest.signal.aborted) {
			if (fetchControllers.get(key) === abortController) fetchControllers.delete(key);
			return;
		}
		if (fetchersQueuedForDeletion.has(key)) {
			if (isRedirectResult(actionResult) || isErrorResult(actionResult)) {
				updateFetcherState(key, getDoneFetcher(void 0));
				return;
			}
		} else {
			if (isRedirectResult(actionResult)) {
				fetchControllers.delete(key);
				if (pendingNavigationLoadId > originatingLoadId) {
					updateFetcherState(key, getDoneFetcher(void 0));
					return;
				} else {
					fetchRedirectIds.add(key);
					updateFetcherState(key, getLoadingFetcher(submission));
					return startRedirectNavigation(fetchRequest, actionResult, false, {
						fetcherSubmission: submission,
						preventScrollReset
					});
				}
			}
			if (isErrorResult(actionResult)) {
				setFetcherError(key, routeId, actionResult.error);
				return;
			}
		}
		let nextLocation = state.navigation.location || state.location;
		let revalidationRequest = createClientSideRequest(init.history, nextLocation, abortController.signal);
		let routesToUse = dataRoutes.activeRoutes;
		let matches = state.navigation.state !== "idle" ? matchRoutesImpl(routesToUse, state.navigation.location, basename, false, dataRoutes.branches) : state.matches;
		invariant(matches, "Didn't find any matches after fetcher action");
		let loadId = ++incrementingLoadId;
		fetchReloadIds.set(key, loadId);
		let { dsMatches, revalidatingFetchers } = getMatchesToLoad(revalidationRequest, scopedContext, mapRouteProperties2, manifest, init.history, state, matches, submission, nextLocation, hydrationRouteProperties2, false, isRevalidationRequired, cancelledFetcherLoads, fetchersQueuedForDeletion, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, init.patchRoutesOnNavigation != null, dataRoutes.branches, [match.route.id, actionResult], callSiteDefaultShouldRevalidate);
		let loadFetcher = getLoadingFetcher(submission, actionResult.data);
		let workingFetchers = new Map(state.fetchers);
		workingFetchers.set(key, loadFetcher);
		revalidatingFetchers.filter((rf) => rf.key !== key).forEach((rf) => {
			let staleKey = rf.key;
			let existingFetcher2 = workingFetchers.get(staleKey);
			let revalidatingFetcher = getLoadingFetcher(void 0, existingFetcher2 ? existingFetcher2.data : void 0);
			workingFetchers.set(staleKey, revalidatingFetcher);
			abortFetcher(staleKey);
			if (rf.controller) fetchControllers.set(staleKey, rf.controller);
		});
		updateState({ fetchers: workingFetchers });
		let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((rf) => abortFetcher(rf.key));
		abortController.signal.addEventListener("abort", abortPendingFetchRevalidations);
		let { loaderResults, fetcherResults } = await callLoadersAndMaybeResolveData(dsMatches, revalidatingFetchers, revalidationRequest, nextLocation, scopedContext);
		if (abortController.signal.aborted) return;
		abortController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
		fetchReloadIds.delete(key);
		fetchControllers.delete(key);
		revalidatingFetchers.forEach((r) => fetchControllers.delete(r.key));
		let fetcherIsMounted = state.fetchers.has(key);
		let getRedirectStateWithDoneFetcher = (s) => {
			if (!fetcherIsMounted) return s;
			let workingFetchers2 = new Map(s.fetchers);
			workingFetchers2.set(key, getDoneFetcher(actionResult.data));
			return {
				...s,
				fetchers: workingFetchers2
			};
		};
		let redirect2 = findRedirect(loaderResults);
		if (redirect2) {
			state = getRedirectStateWithDoneFetcher(state);
			return startRedirectNavigation(revalidationRequest, redirect2.result, false, { preventScrollReset });
		}
		redirect2 = findRedirect(fetcherResults);
		if (redirect2) {
			fetchRedirectIds.add(redirect2.key);
			state = getRedirectStateWithDoneFetcher(state);
			return startRedirectNavigation(revalidationRequest, redirect2.result, false, { preventScrollReset });
		}
		let finalFetchers = new Map(state.fetchers);
		if (fetcherIsMounted) finalFetchers.set(key, getDoneFetcher(actionResult.data));
		let { loaderData, errors } = processLoaderData(state, matches, loaderResults, void 0, revalidatingFetchers, fetcherResults, finalFetchers);
		abortStaleFetchLoads(loadId, finalFetchers);
		if (state.navigation.state === "loading" && loadId > pendingNavigationLoadId) {
			invariant(pendingAction, "Expected pending action");
			pendingNavigationController && pendingNavigationController.abort();
			completeNavigation(state.navigation.location, {
				matches,
				loaderData,
				errors,
				fetchers: finalFetchers
			});
		} else {
			updateState({
				errors,
				loaderData: mergeLoaderData(state.loaderData, loaderData, matches, errors),
				fetchers: finalFetchers
			});
			isRevalidationRequired = false;
		}
	}
	async function handleFetcherLoader(key, routeId, path, matches, scopedContext, isFogOfWar, flushSync, preventScrollReset, submission) {
		let existingFetcher = state.fetchers.get(key);
		updateFetcherState(key, getLoadingFetcher(submission, existingFetcher ? existingFetcher.data : void 0), { flushSync });
		let abortController = new AbortController();
		let fetchRequest = createClientSideRequest(init.history, path, abortController.signal);
		if (isFogOfWar) {
			let discoverResult = await discoverRoutes(matches, new URL(fetchRequest.url).pathname, fetchRequest.signal, key);
			if (discoverResult.type === "aborted") return;
			else if (discoverResult.type === "error") {
				setFetcherError(key, routeId, discoverResult.error, { flushSync });
				return;
			} else if (!discoverResult.matches) {
				setFetcherError(key, routeId, getInternalRouterError(404, { pathname: path }), { flushSync });
				return;
			} else matches = discoverResult.matches;
		}
		let match = getTargetMatch(matches, path);
		fetchControllers.set(key, abortController);
		let originatingLoadId = incrementingLoadId;
		let results = await callDataStrategy(fetchRequest, path, getTargetedDataStrategyMatches(mapRouteProperties2, manifest, fetchRequest, path, matches, match, hydrationRouteProperties2, scopedContext), scopedContext, key);
		let result = results[match.route.id];
		if (!result) {
			for (let match2 of matches) if (results[match2.route.id]) {
				result = results[match2.route.id];
				break;
			}
		}
		if (fetchControllers.get(key) === abortController) fetchControllers.delete(key);
		if (fetchRequest.signal.aborted) return;
		if (fetchersQueuedForDeletion.has(key)) {
			updateFetcherState(key, getDoneFetcher(void 0));
			return;
		}
		if (isRedirectResult(result)) {
			if (pendingNavigationLoadId > originatingLoadId) {
				updateFetcherState(key, getDoneFetcher(void 0));
				return;
			} else {
				fetchRedirectIds.add(key);
				await startRedirectNavigation(fetchRequest, result, false, { preventScrollReset });
				return;
			}
		}
		if (isErrorResult(result)) {
			setFetcherError(key, routeId, result.error);
			return;
		}
		updateFetcherState(key, getDoneFetcher(result.data));
	}
	async function startRedirectNavigation(request, redirect2, isNavigation, { submission, fetcherSubmission, preventScrollReset, replace: replace2 } = {}) {
		if (!isNavigation) {
			pendingPopstateNavigationDfd?.resolve();
			pendingPopstateNavigationDfd = null;
		}
		if (redirect2.response.headers.has("X-Remix-Revalidate")) isRevalidationRequired = true;
		let location = redirect2.response.headers.get("Location");
		invariant(location, "Expected a Location header on the redirect Response");
		let originalLocation = location;
		let currentUrl = new URL(request.url);
		location = normalizeRedirectLocation(location, currentUrl, basename, init.history);
		validateNavigationTarget(originalLocation, location, currentUrl, "allow-explicit");
		let redirectLocation = createLocation(state.location, location, { _isRedirect: true });
		if (isBrowser3) {
			let isDocumentReload = false;
			if (redirect2.response.headers.has("X-Remix-Reload-Document")) isDocumentReload = true;
			else if (isAbsoluteUrl(location)) {
				const url = createBrowserURLImpl(routerWindow, location, true);
				isDocumentReload = url.origin !== routerWindow.location.origin || stripBasename(url.pathname, basename) == null;
			}
			if (isDocumentReload) {
				if (replace2) routerWindow.location.replace(location);
				else routerWindow.location.assign(location);
				return;
			}
		}
		pendingNavigationController = null;
		let redirectNavigationType = replace2 === true || redirect2.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH";
		let { formMethod, formAction, formEncType } = state.navigation;
		if (!submission && !fetcherSubmission && formMethod && formAction && formEncType) submission = getSubmissionFromNavigation(state.navigation);
		let activeSubmission = submission || fetcherSubmission;
		if (redirectPreserveMethodStatusCodes.has(redirect2.response.status) && activeSubmission && isMutationMethod(activeSubmission.formMethod)) await startNavigation(redirectNavigationType, redirectLocation, {
			submission: {
				...activeSubmission,
				formAction: location
			},
			preventScrollReset: preventScrollReset || pendingPreventScrollReset,
			enableViewTransition: isNavigation ? pendingViewTransitionEnabled : void 0
		});
		else await startNavigation(redirectNavigationType, redirectLocation, {
			overrideNavigation: getLoadingNavigation(redirectLocation, [], redirectNavigationType, submission),
			fetcherSubmission,
			preventScrollReset: preventScrollReset || pendingPreventScrollReset,
			enableViewTransition: isNavigation ? pendingViewTransitionEnabled : void 0
		});
	}
	async function callDataStrategy(request, path, matches, scopedContext, fetcherKey) {
		let results;
		let dataResults = {};
		try {
			results = await callDataStrategyImpl(dataStrategyImpl, request, path, matches, fetcherKey, scopedContext, false);
		} catch (e) {
			matches.filter((m) => m.shouldLoad).forEach((m) => {
				dataResults[m.route.id] = {
					type: "error",
					error: e
				};
			});
			return dataResults;
		}
		if (request.signal.aborted) return dataResults;
		if (!isMutationMethod(request.method)) for (let match of matches) {
			if (results[match.route.id]?.type === "error") break;
			if (!results.hasOwnProperty(match.route.id) && !state.loaderData.hasOwnProperty(match.route.id) && (!state.errors || !state.errors.hasOwnProperty(match.route.id)) && match.shouldCallHandler()) results[match.route.id] = {
				type: "error",
				result: /* @__PURE__ */ new Error(`No result returned from dataStrategy for route ${match.route.id}`)
			};
		}
		for (let [routeId, result] of Object.entries(results)) if (isRedirectDataStrategyResult(result)) {
			let response = result.result;
			dataResults[routeId] = {
				type: "redirect",
				response: normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename)
			};
		} else dataResults[routeId] = await convertDataStrategyResultToDataResult(result);
		return dataResults;
	}
	async function callLoadersAndMaybeResolveData(matches, fetchersToLoad, request, location, scopedContext) {
		let loaderResultsPromise = callDataStrategy(request, location, matches, scopedContext, null);
		let fetcherResultsPromise = Promise.all(fetchersToLoad.map(async (f) => {
			if (f.matches && f.match && f.request && f.controller) {
				let result = (await callDataStrategy(f.request, f.path, f.matches, scopedContext, f.key))[f.match.route.id];
				return { [f.key]: result };
			} else return Promise.resolve({ [f.key]: {
				type: "error",
				error: getInternalRouterError(404, { pathname: f.path })
			} });
		}));
		return {
			loaderResults: await loaderResultsPromise,
			fetcherResults: (await fetcherResultsPromise).reduce((acc, r) => Object.assign(acc, r), {})
		};
	}
	function interruptActiveLoads() {
		isRevalidationRequired = true;
		fetchLoadMatches.forEach((_, key) => {
			if (fetchControllers.has(key)) cancelledFetcherLoads.add(key);
			abortFetcher(key);
		});
	}
	function updateFetcherState(key, fetcher, opts = {}) {
		let workingFetchers = new Map(state.fetchers);
		workingFetchers.set(key, fetcher);
		updateState({ fetchers: workingFetchers }, { flushSync: (opts && opts.flushSync) === true });
	}
	function setFetcherError(key, routeId, error, opts = {}) {
		let boundaryMatch = findNearestBoundary(state.matches, routeId);
		let workingFetchers = new Map(state.fetchers);
		deleteFetcher(workingFetchers, key);
		updateState({
			errors: { [boundaryMatch.route.id]: error },
			fetchers: workingFetchers
		}, { flushSync: (opts && opts.flushSync) === true });
	}
	function getFetcher(key) {
		activeFetchers.set(key, (activeFetchers.get(key) || 0) + 1);
		if (fetchersQueuedForDeletion.has(key)) fetchersQueuedForDeletion.delete(key);
		return state.fetchers.get(key) || IDLE_FETCHER;
	}
	function resetFetcher(key, opts) {
		abortFetcher(key, opts?.reason);
		updateFetcherState(key, getDoneFetcher(null));
	}
	function deleteFetcher(fetchers, key) {
		let fetcher = state.fetchers.get(key);
		if (fetchControllers.has(key) && !(fetcher && fetcher.state === "loading" && fetchReloadIds.has(key))) abortFetcher(key);
		fetchLoadMatches.delete(key);
		fetchReloadIds.delete(key);
		fetchRedirectIds.delete(key);
		fetchersQueuedForDeletion.delete(key);
		cancelledFetcherLoads.delete(key);
		fetchers.delete(key);
	}
	function queueFetcherForDeletion(key) {
		let count = (activeFetchers.get(key) || 0) - 1;
		if (count <= 0) {
			activeFetchers.delete(key);
			fetchersQueuedForDeletion.add(key);
		} else activeFetchers.set(key, count);
		updateState({ fetchers: new Map(state.fetchers) });
	}
	function abortFetcher(key, reason) {
		let controller = fetchControllers.get(key);
		if (controller) {
			controller.abort(reason);
			fetchControllers.delete(key);
		}
	}
	function markFetchersDone(keys, fetchers) {
		for (let key of keys) {
			let fetcher = fetchers.get(key);
			invariant(fetcher, `Expected fetcher: ${key}`);
			let doneFetcher = getDoneFetcher(fetcher.data);
			fetchers.set(key, doneFetcher);
		}
	}
	function markFetchRedirectsDone(fetchers) {
		let doneKeys = [];
		let didUpdateFetchers = false;
		for (let key of fetchRedirectIds) {
			let fetcher = fetchers.get(key);
			invariant(fetcher, `Expected fetcher: ${key}`);
			if (fetcher.state === "loading") {
				fetchRedirectIds.delete(key);
				doneKeys.push(key);
				didUpdateFetchers = true;
			}
		}
		markFetchersDone(doneKeys, fetchers);
		return didUpdateFetchers;
	}
	function abortStaleFetchLoads(landedId, fetchers) {
		let yeetedKeys = [];
		for (let [key, id] of fetchReloadIds) if (id < landedId) {
			let fetcher = fetchers.get(key);
			invariant(fetcher, `Expected fetcher: ${key}`);
			if (fetcher.state === "loading") {
				abortFetcher(key);
				fetchReloadIds.delete(key);
				yeetedKeys.push(key);
			}
		}
		markFetchersDone(yeetedKeys, fetchers);
		return yeetedKeys.length > 0;
	}
	function getBlocker(key, fn) {
		let blocker = state.blockers.get(key) || IDLE_BLOCKER;
		if (blockerFunctions.get(key) !== fn) blockerFunctions.set(key, fn);
		return blocker;
	}
	function deleteBlocker(key) {
		state.blockers.delete(key);
		blockerFunctions.delete(key);
	}
	function updateBlocker(key, newBlocker) {
		let blocker = state.blockers.get(key) || IDLE_BLOCKER;
		invariant(blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked", `Invalid blocker state transition: ${blocker.state} -> ${newBlocker.state}`);
		let blockers = new Map(state.blockers);
		blockers.set(key, newBlocker);
		updateState({ blockers });
	}
	function shouldBlockNavigation({ currentLocation, nextLocation, historyAction }) {
		if (blockerFunctions.size === 0) return;
		if (blockerFunctions.size > 1) warning(false, "A router only supports one blocker at a time");
		let entries = Array.from(blockerFunctions.entries());
		let [blockerKey, blockerFunction] = entries[entries.length - 1];
		let blocker = state.blockers.get(blockerKey);
		if (blocker && blocker.state === "proceeding") return;
		if (blockerFunction({
			currentLocation,
			nextLocation,
			historyAction
		})) return blockerKey;
	}
	function handleNavigational404(pathname) {
		let error = getInternalRouterError(404, { pathname });
		let routesToUse = dataRoutes.activeRoutes;
		let { matches, route } = getShortCircuitMatches(routesToUse);
		return {
			notFoundMatches: matches,
			route,
			error
		};
	}
	function enableScrollRestoration(positions, getPosition, getKey) {
		savedScrollPositions2 = positions;
		getScrollPosition = getPosition;
		getScrollRestorationKey2 = getKey || null;
		if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
			initialScrollRestored = true;
			let y = getSavedScrollPosition(state.location, state.matches);
			if (y != null) updateState({ restoreScrollPosition: y });
		}
		return () => {
			savedScrollPositions2 = null;
			getScrollPosition = null;
			getScrollRestorationKey2 = null;
		};
	}
	function getScrollKey(location, matches) {
		if (getScrollRestorationKey2) return getScrollRestorationKey2(location, matches.map((m) => convertRouteMatchToUiMatch(m, state.loaderData))) || location.key;
		return location.key;
	}
	function saveScrollPosition(location, matches) {
		if (savedScrollPositions2 && getScrollPosition) {
			let key = getScrollKey(location, matches);
			savedScrollPositions2[key] = getScrollPosition();
		}
	}
	function getSavedScrollPosition(location, matches) {
		if (savedScrollPositions2) {
			let key = getScrollKey(location, matches);
			let y = savedScrollPositions2[key];
			if (typeof y === "number") return y;
		}
		return null;
	}
	function checkFogOfWar(matches, routesToUse, pathname) {
		if (init.patchRoutesOnNavigation) {
			let activeBranches = dataRoutes.branches;
			if (!matches) return {
				active: true,
				matches: matchRoutesImpl(routesToUse, pathname, basename, true, activeBranches) || []
			};
			else if (Object.keys(matches[0].params).length > 0) return {
				active: true,
				matches: matchRoutesImpl(routesToUse, pathname, basename, true, activeBranches)
			};
		}
		return {
			active: false,
			matches: null
		};
	}
	async function discoverRoutes(matches, pathname, signal, fetcherKey) {
		if (!init.patchRoutesOnNavigation) return {
			type: "success",
			matches
		};
		let partialMatches = matches;
		while (true) {
			let localManifest = manifest;
			try {
				await init.patchRoutesOnNavigation({
					signal,
					path: pathname,
					matches: partialMatches,
					fetcherKey,
					patch: (routeId, children) => {
						if (signal.aborted) return;
						patchRoutesImpl(routeId, children, dataRoutes, localManifest, mapRouteProperties2, false);
					}
				});
			} catch (e) {
				return {
					type: "error",
					error: e,
					partialMatches
				};
			}
			if (signal.aborted) return { type: "aborted" };
			let activeBranches = dataRoutes.branches;
			let newMatches = matchRoutesImpl(dataRoutes.activeRoutes, pathname, basename, false, activeBranches);
			let newPartialMatches = null;
			if (newMatches) {
				if (Object.keys(newMatches[0].params).length === 0) return {
					type: "success",
					matches: newMatches
				};
				else {
					newPartialMatches = matchRoutesImpl(dataRoutes.activeRoutes, pathname, basename, true, activeBranches);
					if (!(newPartialMatches && partialMatches.length < newPartialMatches.length && compareMatches(partialMatches, newPartialMatches.slice(0, partialMatches.length)))) return {
						type: "success",
						matches: newMatches
					};
				}
			}
			if (!newPartialMatches) newPartialMatches = matchRoutesImpl(dataRoutes.activeRoutes, pathname, basename, true, activeBranches);
			if (!newPartialMatches || compareMatches(partialMatches, newPartialMatches)) return {
				type: "success",
				matches: null
			};
			partialMatches = newPartialMatches;
		}
	}
	function compareMatches(a, b) {
		return a.length === b.length && a.every((m, i) => m.route.id === b[i].route.id);
	}
	function _internalSetRoutes(newRoutes) {
		manifest = {};
		dataRoutes.setHmrRoutes(convertRoutesToDataRoutes(newRoutes, mapRouteProperties2, void 0, manifest));
	}
	function patchRoutes(routeId, children, unstable_allowElementMutations = false) {
		patchRoutesImpl(routeId, children, dataRoutes, manifest, mapRouteProperties2, unstable_allowElementMutations);
		if (!dataRoutes.hasHMRRoutes) updateState({});
	}
	router = {
		get basename() {
			return basename;
		},
		get future() {
			return future;
		},
		get state() {
			return state;
		},
		get routes() {
			return dataRoutes.stableRoutes;
		},
		get branches() {
			return dataRoutes.branches;
		},
		get manifest() {
			return manifest;
		},
		get window() {
			return routerWindow;
		},
		initialize,
		subscribe,
		enableScrollRestoration,
		navigate,
		fetch: fetch2,
		revalidate,
		createHref: (to) => init.history.createHref(to),
		createURL: (to) => init.history.createURL(to),
		encodeLocation: (to) => init.history.encodeLocation(to),
		getFetcher,
		resetFetcher,
		deleteFetcher: queueFetcherForDeletion,
		dispose,
		getBlocker,
		deleteBlocker,
		patchRoutes,
		_internalFetchControllers: fetchControllers,
		_internalSetRoutes,
		_internalSetStateDoNotUseOrYouWillBreakYourApp(newState) {
			updateState(newState);
		}
	};
	if (init.instrumentations) router = instrumentClientSideRouter(router, init.instrumentations.map((i) => i.router).filter(Boolean));
	return router;
}
function isSubmissionNavigation(opts) {
	return opts != null && ("formData" in opts && opts.formData != null || "body" in opts && opts.body !== void 0);
}
function normalizeTo(location, matches, basename, to, fromRouteId, relative) {
	let contextualMatches;
	let activeRouteMatch;
	if (fromRouteId) {
		contextualMatches = [];
		for (let match of matches) {
			contextualMatches.push(match);
			if (match.route.id === fromRouteId) {
				activeRouteMatch = match;
				break;
			}
		}
	} else {
		contextualMatches = matches;
		activeRouteMatch = matches[matches.length - 1];
	}
	let path = resolveTo(to ? to : ".", getResolveToMatches(contextualMatches), stripBasename(location.pathname, basename) || location.pathname, relative === "path");
	if (to == null) {
		path.search = location.search;
		path.hash = location.hash;
	}
	if ((to == null || to === "" || to === ".") && activeRouteMatch) {
		let nakedIndex = hasNakedIndexQuery(path.search);
		if (activeRouteMatch.route.index && !nakedIndex) path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
		else if (!activeRouteMatch.route.index && nakedIndex) {
			let params = new URLSearchParams(path.search);
			let indexValues = params.getAll("index");
			params.delete("index");
			indexValues.filter((v) => v).forEach((v) => params.append("index", v));
			let qs = params.toString();
			path.search = qs ? `?${qs}` : "";
		}
	}
	if (basename !== "/") path.pathname = prependBasename({
		basename,
		pathname: path.pathname
	});
	return createPath(path);
}
function normalizeNavigateOptions(isFetcher, path, opts) {
	if (!opts || !isSubmissionNavigation(opts)) return { path };
	if (opts.formMethod && !isValidMethod(opts.formMethod)) return {
		path,
		error: getInternalRouterError(405, { method: opts.formMethod })
	};
	let getInvalidBodyError = () => ({
		path,
		error: getInternalRouterError(400, { type: "invalid-body" })
	});
	let formMethod = (opts.formMethod || "get").toUpperCase();
	let formAction = stripHashFromPath(path);
	if (opts.body !== void 0) {
		if (opts.formEncType === "text/plain") {
			if (!isMutationMethod(formMethod)) return getInvalidBodyError();
			let text = typeof opts.body === "string" ? opts.body : opts.body instanceof FormData || opts.body instanceof URLSearchParams ? Array.from(opts.body.entries()).reduce((acc, [name, value]) => `${acc}${name}=${value}
`, "") : String(opts.body);
			return {
				path,
				submission: {
					formMethod,
					formAction,
					formEncType: opts.formEncType,
					formData: void 0,
					json: void 0,
					text
				}
			};
		} else if (opts.formEncType === "application/json") {
			if (!isMutationMethod(formMethod)) return getInvalidBodyError();
			try {
				let json = typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
				return {
					path,
					submission: {
						formMethod,
						formAction,
						formEncType: opts.formEncType,
						formData: void 0,
						json,
						text: void 0
					}
				};
			} catch (e) {
				return getInvalidBodyError();
			}
		}
	}
	invariant(typeof FormData === "function", "FormData is not available in this environment");
	let searchParams;
	let formData;
	if (opts.formData) {
		searchParams = convertFormDataToSearchParams(opts.formData);
		formData = opts.formData;
	} else if (opts.body instanceof FormData) {
		searchParams = convertFormDataToSearchParams(opts.body);
		formData = opts.body;
	} else if (opts.body instanceof URLSearchParams) {
		searchParams = opts.body;
		formData = convertSearchParamsToFormData(searchParams);
	} else if (opts.body == null) {
		searchParams = new URLSearchParams();
		formData = new FormData();
	} else try {
		searchParams = new URLSearchParams(opts.body);
		formData = convertSearchParamsToFormData(searchParams);
	} catch (e) {
		return getInvalidBodyError();
	}
	let submission = {
		formMethod,
		formAction,
		formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
		formData,
		json: void 0,
		text: void 0
	};
	if (isMutationMethod(submission.formMethod)) return {
		path,
		submission
	};
	let parsedPath = parsePath(path);
	if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) searchParams.append("index", "");
	parsedPath.search = `?${searchParams}`;
	return {
		path: createPath(parsedPath),
		submission
	};
}
function getMatchesToLoad(request, scopedContext, mapRouteProperties2, manifest, history, state, matches, submission, location, lazyRoutePropertiesToSkip, initialHydration, isRevalidationRequired, cancelledFetcherLoads, fetchersQueuedForDeletion, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, hasPatchRoutesOnNavigation, branches, pendingActionResult, callSiteDefaultShouldRevalidate) {
	let actionResult = pendingActionResult ? isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : pendingActionResult[1].data : void 0;
	let currentUrl = history.createURL(state.location);
	let nextUrl = history.createURL(location);
	let maxIdx;
	if (initialHydration && state.errors) {
		let boundaryId = Object.keys(state.errors)[0];
		maxIdx = matches.findIndex((m) => m.route.id === boundaryId);
	} else if (pendingActionResult && isErrorResult(pendingActionResult[1])) {
		let boundaryId = pendingActionResult[0];
		maxIdx = matches.findIndex((m) => m.route.id === boundaryId) - 1;
	}
	let actionStatus = pendingActionResult ? pendingActionResult[1].statusCode : void 0;
	let shouldSkipRevalidation = actionStatus && actionStatus >= 400;
	let baseShouldRevalidateArgs = {
		currentUrl,
		currentParams: state.matches[0]?.params || {},
		nextUrl,
		nextParams: matches[0].params,
		...submission,
		actionResult,
		actionStatus
	};
	let pattern = getRoutePattern(matches);
	let dsMatches = matches.map((match, index) => {
		let { route } = match;
		let forceShouldLoad = null;
		if (maxIdx != null && index > maxIdx) forceShouldLoad = false;
		else if (route.lazy) forceShouldLoad = true;
		else if (!routeHasLoaderOrMiddleware(route)) forceShouldLoad = false;
		else if (initialHydration) {
			let { shouldLoad: shouldLoad2 } = getRouteHydrationStatus(route, state.loaderData, state.errors);
			forceShouldLoad = shouldLoad2;
		} else if (isNewLoader(state.loaderData, state.matches[index], match)) forceShouldLoad = true;
		if (forceShouldLoad !== null) return getDataStrategyMatch(mapRouteProperties2, manifest, request, location, pattern, match, lazyRoutePropertiesToSkip, scopedContext, forceShouldLoad);
		let defaultShouldRevalidate = false;
		if (typeof callSiteDefaultShouldRevalidate === "boolean") defaultShouldRevalidate = callSiteDefaultShouldRevalidate;
		else if (shouldSkipRevalidation) defaultShouldRevalidate = false;
		else if (isRevalidationRequired) defaultShouldRevalidate = true;
		else if (currentUrl.pathname + currentUrl.search === nextUrl.pathname + nextUrl.search) defaultShouldRevalidate = true;
		else if (currentUrl.search !== nextUrl.search) defaultShouldRevalidate = true;
		else if (isNewRouteInstance(state.matches[index], match)) defaultShouldRevalidate = true;
		let shouldRevalidateArgs = {
			...baseShouldRevalidateArgs,
			defaultShouldRevalidate
		};
		let shouldLoad = shouldRevalidateLoader(match, shouldRevalidateArgs);
		return getDataStrategyMatch(mapRouteProperties2, manifest, request, location, pattern, match, lazyRoutePropertiesToSkip, scopedContext, shouldLoad, shouldRevalidateArgs, callSiteDefaultShouldRevalidate);
	});
	let revalidatingFetchers = [];
	fetchLoadMatches.forEach((f, key) => {
		if (initialHydration || !matches.some((m) => m.route.id === f.routeId) || fetchersQueuedForDeletion.has(key)) return;
		let fetcher = state.fetchers.get(key);
		let isMidInitialLoad = fetcher && fetcher.state !== "idle" && fetcher.data === void 0;
		let fetcherMatches = matchRoutesImpl(routesToUse, f.path, basename ?? "/", false, branches);
		if (!fetcherMatches) {
			if (hasPatchRoutesOnNavigation && isMidInitialLoad) return;
			revalidatingFetchers.push({
				key,
				routeId: f.routeId,
				path: f.path,
				matches: null,
				match: null,
				request: null,
				controller: null
			});
			return;
		}
		if (fetchRedirectIds.has(key)) return;
		let fetcherMatch = getTargetMatch(fetcherMatches, f.path);
		let fetchController = new AbortController();
		let fetchRequest = createClientSideRequest(history, f.path, fetchController.signal);
		let fetcherDsMatches = null;
		if (cancelledFetcherLoads.has(key)) {
			cancelledFetcherLoads.delete(key);
			fetcherDsMatches = getTargetedDataStrategyMatches(mapRouteProperties2, manifest, fetchRequest, f.path, fetcherMatches, fetcherMatch, lazyRoutePropertiesToSkip, scopedContext);
		} else if (isMidInitialLoad) {
			if (isRevalidationRequired) fetcherDsMatches = getTargetedDataStrategyMatches(mapRouteProperties2, manifest, fetchRequest, f.path, fetcherMatches, fetcherMatch, lazyRoutePropertiesToSkip, scopedContext);
		} else {
			let defaultShouldRevalidate;
			if (typeof callSiteDefaultShouldRevalidate === "boolean") defaultShouldRevalidate = callSiteDefaultShouldRevalidate;
			else if (shouldSkipRevalidation) defaultShouldRevalidate = false;
			else defaultShouldRevalidate = isRevalidationRequired;
			let shouldRevalidateArgs = {
				...baseShouldRevalidateArgs,
				defaultShouldRevalidate
			};
			if (shouldRevalidateLoader(fetcherMatch, shouldRevalidateArgs)) fetcherDsMatches = getTargetedDataStrategyMatches(mapRouteProperties2, manifest, fetchRequest, f.path, fetcherMatches, fetcherMatch, lazyRoutePropertiesToSkip, scopedContext, shouldRevalidateArgs);
		}
		if (fetcherDsMatches) revalidatingFetchers.push({
			key,
			routeId: f.routeId,
			path: f.path,
			matches: fetcherDsMatches,
			match: fetcherMatch,
			request: fetchRequest,
			controller: fetchController
		});
	});
	return {
		dsMatches,
		revalidatingFetchers
	};
}
function routeHasLoaderOrMiddleware(route) {
	return route.loader != null || route.middleware != null && route.middleware.length > 0;
}
function getRouteHydrationStatus(route, loaderData, errors) {
	if (route.lazy) return {
		shouldLoad: true,
		renderFallback: true
	};
	if (!routeHasLoaderOrMiddleware(route)) return {
		shouldLoad: false,
		renderFallback: false
	};
	let hasData = loaderData != null && route.id in loaderData;
	let hasError = errors != null && errors[route.id] !== void 0;
	if (!hasData && hasError) return {
		shouldLoad: false,
		renderFallback: false
	};
	if (typeof route.loader === "function" && route.loader.hydrate === true) return {
		shouldLoad: true,
		renderFallback: !hasData
	};
	let shouldLoad = !hasData && !hasError;
	return {
		shouldLoad,
		renderFallback: shouldLoad
	};
}
function isNewLoader(currentLoaderData, currentMatch, match) {
	let isNew = !currentMatch || match.route.id !== currentMatch.route.id;
	let isMissingData = !currentLoaderData.hasOwnProperty(match.route.id);
	return isNew || isMissingData;
}
function isNewRouteInstance(currentMatch, match) {
	let currentPath = currentMatch.route.path;
	return currentMatch.pathname !== match.pathname || currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"];
}
function shouldRevalidateLoader(loaderMatch, arg) {
	if (loaderMatch.route.shouldRevalidate) {
		let routeChoice = loaderMatch.route.shouldRevalidate(arg);
		if (typeof routeChoice === "boolean") return routeChoice;
	}
	return arg.defaultShouldRevalidate;
}
function patchRoutesImpl(routeId, children, dataRoutes, manifest, mapRouteProperties2, allowElementMutations) {
	let childrenToPatch;
	if (routeId) {
		let route = manifest[routeId];
		invariant(route, `No route found to patch children into: routeId = ${routeId}`);
		if (!route.children) route.children = [];
		childrenToPatch = route.children;
	} else childrenToPatch = dataRoutes.activeRoutes;
	let uniqueChildren = [];
	let existingChildren = [];
	children.forEach((newRoute) => {
		let existingRoute = childrenToPatch.find((existingRoute2) => isSameRoute(newRoute, existingRoute2));
		if (existingRoute) existingChildren.push({
			existingRoute,
			newRoute
		});
		else uniqueChildren.push(newRoute);
	});
	if (uniqueChildren.length > 0) {
		let newRoutes = convertRoutesToDataRoutes(uniqueChildren, mapRouteProperties2, [
			routeId || "_",
			"patch",
			String(childrenToPatch?.length || "0")
		], manifest);
		childrenToPatch.push(...newRoutes);
	}
	if (allowElementMutations && existingChildren.length > 0) for (let i = 0; i < existingChildren.length; i++) {
		let { existingRoute, newRoute } = existingChildren[i];
		let existingRouteTyped = existingRoute;
		let [newRouteTyped] = convertRoutesToDataRoutes([newRoute], mapRouteProperties2, [], {}, true);
		Object.assign(existingRouteTyped, {
			element: newRouteTyped.element ? newRouteTyped.element : existingRouteTyped.element,
			errorElement: newRouteTyped.errorElement ? newRouteTyped.errorElement : existingRouteTyped.errorElement,
			hydrateFallbackElement: newRouteTyped.hydrateFallbackElement ? newRouteTyped.hydrateFallbackElement : existingRouteTyped.hydrateFallbackElement
		});
	}
	if (!dataRoutes.hasHMRRoutes) dataRoutes.setRoutes([...dataRoutes.activeRoutes]);
}
function isSameRoute(newRoute, existingRoute) {
	if ("id" in newRoute && "id" in existingRoute && newRoute.id === existingRoute.id) return true;
	if (!(newRoute.index === existingRoute.index && newRoute.path === existingRoute.path && newRoute.caseSensitive === existingRoute.caseSensitive)) return false;
	if ((!newRoute.children || newRoute.children.length === 0) && (!existingRoute.children || existingRoute.children.length === 0)) return true;
	return newRoute.children?.every((aChild, i) => existingRoute.children?.some((bChild) => isSameRoute(aChild, bChild))) ?? false;
}
var lazyRoutePropertyCache = /* @__PURE__ */ new WeakMap();
var loadLazyRouteProperty = ({ key, route, manifest, mapRouteProperties: mapRouteProperties2 }) => {
	let routeToUpdate = manifest[route.id];
	invariant(routeToUpdate, "No route found in manifest");
	if (!routeToUpdate.lazy || typeof routeToUpdate.lazy !== "object") return;
	let lazyFn = routeToUpdate.lazy[key];
	if (!lazyFn) return;
	let cache = lazyRoutePropertyCache.get(routeToUpdate);
	if (!cache) {
		cache = {};
		lazyRoutePropertyCache.set(routeToUpdate, cache);
	}
	let cachedPromise = cache[key];
	if (cachedPromise) return cachedPromise;
	let propertyPromise = (async () => {
		let isUnsupported = isUnsupportedLazyRouteObjectKey(key);
		let isStaticallyDefined = routeToUpdate[key] !== void 0 && key !== "hasErrorBoundary";
		if (isUnsupported) {
			warning(!isUnsupported, "Route property " + key + " is not a supported lazy route property. This property will be ignored.");
			cache[key] = Promise.resolve();
		} else if (isStaticallyDefined) warning(false, `Route "${routeToUpdate.id}" has a static property "${key}" defined. The lazy property will be ignored.`);
		else {
			let value = await lazyFn();
			if (value != null) {
				Object.assign(routeToUpdate, { [key]: value });
				Object.assign(routeToUpdate, mapRouteProperties2(routeToUpdate));
			}
		}
		if (typeof routeToUpdate.lazy === "object") {
			routeToUpdate.lazy[key] = void 0;
			if (Object.values(routeToUpdate.lazy).every((value) => value === void 0)) routeToUpdate.lazy = void 0;
		}
	})();
	cache[key] = propertyPromise;
	return propertyPromise;
};
var lazyRouteFunctionCache = /* @__PURE__ */ new WeakMap();
function loadLazyRoute(route, type, manifest, mapRouteProperties2, lazyRoutePropertiesToSkip) {
	let routeToUpdate = manifest[route.id];
	invariant(routeToUpdate, "No route found in manifest");
	if (!route.lazy) return {
		lazyRoutePromise: void 0,
		lazyHandlerPromise: void 0
	};
	if (typeof route.lazy === "function") {
		let cachedPromise = lazyRouteFunctionCache.get(routeToUpdate);
		if (cachedPromise) return {
			lazyRoutePromise: cachedPromise,
			lazyHandlerPromise: cachedPromise
		};
		let lazyRoutePromise2 = (async () => {
			invariant(typeof route.lazy === "function", "No lazy route function found");
			let lazyRoute = await route.lazy();
			let routeUpdates = {};
			for (let lazyRouteProperty in lazyRoute) {
				let lazyValue = lazyRoute[lazyRouteProperty];
				if (lazyValue === void 0) continue;
				let isUnsupported = isUnsupportedLazyRouteFunctionKey(lazyRouteProperty);
				let isStaticallyDefined = routeToUpdate[lazyRouteProperty] !== void 0 && lazyRouteProperty !== "hasErrorBoundary";
				if (isUnsupported) warning(!isUnsupported, "Route property " + lazyRouteProperty + " is not a supported property to be returned from a lazy route function. This property will be ignored.");
				else if (isStaticallyDefined) warning(!isStaticallyDefined, `Route "${routeToUpdate.id}" has a static property "${lazyRouteProperty}" defined but its lazy function is also returning a value for this property. The lazy route property "${lazyRouteProperty}" will be ignored.`);
				else routeUpdates[lazyRouteProperty] = lazyValue;
			}
			Object.assign(routeToUpdate, routeUpdates);
			Object.assign(routeToUpdate, {
				...mapRouteProperties2(routeToUpdate),
				lazy: void 0
			});
		})();
		lazyRouteFunctionCache.set(routeToUpdate, lazyRoutePromise2);
		lazyRoutePromise2.catch(() => {});
		return {
			lazyRoutePromise: lazyRoutePromise2,
			lazyHandlerPromise: lazyRoutePromise2
		};
	}
	let lazyKeys = Object.keys(route.lazy);
	let lazyPropertyPromises = [];
	let lazyHandlerPromise = void 0;
	for (let key of lazyKeys) {
		if (lazyRoutePropertiesToSkip && lazyRoutePropertiesToSkip.includes(key)) continue;
		let promise = loadLazyRouteProperty({
			key,
			route,
			manifest,
			mapRouteProperties: mapRouteProperties2
		});
		if (promise) {
			lazyPropertyPromises.push(promise);
			if (key === type) lazyHandlerPromise = promise;
		}
	}
	let lazyRoutePromise = lazyPropertyPromises.length > 0 ? Promise.all(lazyPropertyPromises).then(() => {}) : void 0;
	lazyRoutePromise?.catch(() => {});
	lazyHandlerPromise?.catch(() => {});
	return {
		lazyRoutePromise,
		lazyHandlerPromise
	};
}
async function defaultDataStrategy(args) {
	let matchesToLoad = args.matches.filter((m) => m.shouldLoad);
	let keyedResults = {};
	(await Promise.all(matchesToLoad.map((m) => m.resolve()))).forEach((result, i) => {
		keyedResults[matchesToLoad[i].route.id] = result;
	});
	return keyedResults;
}
async function defaultDataStrategyWithMiddleware(args) {
	if (!args.matches.some((m) => m.route.middleware)) return defaultDataStrategy(args);
	return runClientMiddlewarePipeline(args, () => defaultDataStrategy(args));
}
function runClientMiddlewarePipeline(args, handler) {
	return runMiddlewarePipeline(args, handler, (r) => {
		if (isRedirectResponse(r)) throw r;
		return r;
	}, isDataStrategyResults, errorHandler);
	function errorHandler(error, routeId, nextResult) {
		if (nextResult) return Promise.resolve(Object.assign(nextResult.value, { [routeId]: {
			type: "error",
			result: error
		} }));
		else {
			let { matches } = args;
			let boundaryRouteId = findNearestBoundary(matches, matches[Math.min(Math.max(matches.findIndex((m) => m.route.id === routeId), 0), Math.max(matches.findIndex((m) => m.shouldCallHandler()), 0))].route.id).route.id;
			return Promise.resolve({ [boundaryRouteId]: {
				type: "error",
				result: error
			} });
		}
	}
}
async function runMiddlewarePipeline(args, handler, processResult, isResult, errorHandler) {
	let { matches, ...dataFnArgs } = args;
	return await callRouteMiddleware(dataFnArgs, matches.flatMap((m) => m.route.middleware ? m.route.middleware.map((fn) => [m.route.id, fn]) : []), handler, processResult, isResult, errorHandler);
}
async function callRouteMiddleware(args, middlewares, handler, processResult, isResult, errorHandler, idx = 0) {
	let { request } = args;
	if (request.signal.aborted) throw request.signal.reason ?? /* @__PURE__ */ new Error(`Request aborted: ${request.method} ${request.url}`);
	let tuple = middlewares[idx];
	if (!tuple) return await handler();
	let [routeId, middleware] = tuple;
	let nextResult;
	let next = async () => {
		if (nextResult) throw new Error("You may only call `next()` once per middleware");
		try {
			nextResult = { value: await callRouteMiddleware(args, middlewares, handler, processResult, isResult, errorHandler, idx + 1) };
			return nextResult.value;
		} catch (error) {
			nextResult = { value: await errorHandler(error, routeId, nextResult) };
			return nextResult.value;
		}
	};
	try {
		let value = await middleware(args, next);
		let result = value != null ? processResult(value) : void 0;
		if (isResult(result)) return result;
		else if (nextResult) return result ?? nextResult.value;
		else {
			nextResult = { value: await next() };
			return nextResult.value;
		}
	} catch (error) {
		return await errorHandler(error, routeId, nextResult);
	}
}
function getDataStrategyMatchLazyPromises(mapRouteProperties2, manifest, request, match, lazyRoutePropertiesToSkip) {
	let lazyMiddlewarePromise = loadLazyRouteProperty({
		key: "middleware",
		route: match.route,
		manifest,
		mapRouteProperties: mapRouteProperties2
	});
	let lazyRoutePromises = loadLazyRoute(match.route, isMutationMethod(request.method) ? "action" : "loader", manifest, mapRouteProperties2, lazyRoutePropertiesToSkip);
	return {
		middleware: lazyMiddlewarePromise,
		route: lazyRoutePromises.lazyRoutePromise,
		handler: lazyRoutePromises.lazyHandlerPromise
	};
}
function getDataStrategyMatch(mapRouteProperties2, manifest, request, path, pattern, match, lazyRoutePropertiesToSkip, scopedContext, shouldLoad, shouldRevalidateArgs = null, callSiteDefaultShouldRevalidate) {
	let isUsingNewApi = false;
	let _lazyPromises = getDataStrategyMatchLazyPromises(mapRouteProperties2, manifest, request, match, lazyRoutePropertiesToSkip);
	return {
		...match,
		_lazyPromises,
		shouldLoad,
		shouldRevalidateArgs,
		shouldCallHandler(defaultShouldRevalidate) {
			isUsingNewApi = true;
			if (!shouldRevalidateArgs) return shouldLoad;
			if (typeof callSiteDefaultShouldRevalidate === "boolean") return shouldRevalidateLoader(match, {
				...shouldRevalidateArgs,
				defaultShouldRevalidate: callSiteDefaultShouldRevalidate
			});
			if (typeof defaultShouldRevalidate === "boolean") return shouldRevalidateLoader(match, {
				...shouldRevalidateArgs,
				defaultShouldRevalidate
			});
			return shouldRevalidateLoader(match, shouldRevalidateArgs);
		},
		resolve(handlerOverride) {
			let { lazy, loader, middleware } = match.route;
			let callHandler = isUsingNewApi || shouldLoad || handlerOverride && !isMutationMethod(request.method) && (lazy || loader);
			let isMiddlewareOnlyRoute = middleware && middleware.length > 0 && !loader && !lazy;
			if (callHandler && (isMutationMethod(request.method) || !isMiddlewareOnlyRoute)) return callLoaderOrAction({
				request,
				path,
				pattern,
				match,
				lazyHandlerPromise: _lazyPromises?.handler,
				lazyRoutePromise: _lazyPromises?.route,
				handlerOverride,
				scopedContext
			});
			return Promise.resolve({
				type: "data",
				result: void 0
			});
		}
	};
}
function getTargetedDataStrategyMatches(mapRouteProperties2, manifest, request, path, matches, targetMatch, lazyRoutePropertiesToSkip, scopedContext, shouldRevalidateArgs = null) {
	return matches.map((match) => {
		if (match.route.id !== targetMatch.route.id) return {
			...match,
			shouldLoad: false,
			shouldRevalidateArgs,
			shouldCallHandler: () => false,
			_lazyPromises: getDataStrategyMatchLazyPromises(mapRouteProperties2, manifest, request, match, lazyRoutePropertiesToSkip),
			resolve: () => Promise.resolve({
				type: "data",
				result: void 0
			})
		};
		return getDataStrategyMatch(mapRouteProperties2, manifest, request, path, getRoutePattern(matches), match, lazyRoutePropertiesToSkip, scopedContext, true, shouldRevalidateArgs);
	});
}
async function callDataStrategyImpl(dataStrategyImpl, request, path, matches, fetcherKey, scopedContext, isStaticHandler) {
	if (matches.some((m) => m._lazyPromises?.middleware)) await Promise.all(matches.map((m) => m._lazyPromises?.middleware));
	let dataStrategyArgs = {
		request,
		url: createDataFunctionUrl(request, path),
		pattern: getRoutePattern(matches),
		params: matches[0].params,
		context: scopedContext,
		matches
	};
	let runClientMiddleware = isStaticHandler ? () => {
		throw new Error("You cannot call `runClientMiddleware()` from a static handler `dataStrategy`. Middleware is run outside of `dataStrategy` during SSR in order to bubble up the Response.  You can enable middleware via the `respond` API in `query`/`queryRoute`");
	} : (cb) => {
		let typedDataStrategyArgs = dataStrategyArgs;
		return runClientMiddlewarePipeline(typedDataStrategyArgs, () => {
			return cb({
				...typedDataStrategyArgs,
				fetcherKey,
				runClientMiddleware: () => {
					throw new Error("Cannot call `runClientMiddleware()` from within an `runClientMiddleware` handler");
				}
			});
		});
	};
	let results = await dataStrategyImpl({
		...dataStrategyArgs,
		fetcherKey,
		runClientMiddleware
	});
	try {
		await Promise.all(matches.flatMap((m) => [m._lazyPromises?.handler, m._lazyPromises?.route]));
	} catch (e) {}
	return results;
}
async function callLoaderOrAction({ request, path, pattern, match, lazyHandlerPromise, lazyRoutePromise, handlerOverride, scopedContext }) {
	let result;
	let onReject;
	let isAction = isMutationMethod(request.method);
	let type = isAction ? "action" : "loader";
	let runHandler = (handler) => {
		let reject;
		let abortPromise = new Promise((_, r) => reject = r);
		onReject = () => reject();
		request.signal.addEventListener("abort", onReject);
		let actualHandler = (ctx) => {
			if (typeof handler !== "function") return Promise.reject(/* @__PURE__ */ new Error(`You cannot call the handler for a route which defines a boolean "${type}" [routeId: ${match.route.id}]`));
			return handler({
				request,
				url: createDataFunctionUrl(request, path),
				pattern,
				params: match.params,
				context: scopedContext
			}, ...ctx !== void 0 ? [ctx] : []);
		};
		let handlerPromise = (async () => {
			try {
				return {
					type: "data",
					result: await (handlerOverride ? handlerOverride((ctx) => actualHandler(ctx)) : actualHandler())
				};
			} catch (e) {
				return {
					type: "error",
					result: e
				};
			}
		})();
		return Promise.race([handlerPromise, abortPromise]);
	};
	try {
		let handler = isAction ? match.route.action : match.route.loader;
		if (lazyHandlerPromise || lazyRoutePromise) {
			if (handler) {
				let handlerError;
				let [value] = await Promise.all([
					runHandler(handler).catch((e) => {
						handlerError = e;
					}),
					lazyHandlerPromise,
					lazyRoutePromise
				]);
				if (handlerError !== void 0) throw handlerError;
				result = value;
			} else {
				await lazyHandlerPromise;
				let handler2 = isAction ? match.route.action : match.route.loader;
				if (handler2) [result] = await Promise.all([runHandler(handler2), lazyRoutePromise]);
				else if (type === "action") {
					let url = new URL(request.url);
					let pathname = url.pathname + url.search;
					throw getInternalRouterError(405, {
						method: request.method,
						pathname,
						routeId: match.route.id
					});
				} else return {
					type: "data",
					result: void 0
				};
			}
		} else if (!handler) {
			let url = new URL(request.url);
			throw getInternalRouterError(404, { pathname: url.pathname + url.search });
		} else result = await runHandler(handler);
	} catch (e) {
		return {
			type: "error",
			result: e
		};
	} finally {
		if (onReject) request.signal.removeEventListener("abort", onReject);
	}
	return result;
}
async function parseResponseBody(response) {
	let contentType = response.headers.get("Content-Type");
	if (contentType && /\bapplication\/json\b/.test(contentType)) return response.body == null ? null : response.json();
	return response.text();
}
async function convertDataStrategyResultToDataResult(dataStrategyResult) {
	let { result, type } = dataStrategyResult;
	if (isResponse(result)) {
		let data2;
		try {
			data2 = await parseResponseBody(result);
		} catch (e) {
			return {
				type: "error",
				error: e
			};
		}
		if (type === "error") return {
			type: "error",
			error: new ErrorResponseImpl(result.status, result.statusText, data2),
			statusCode: result.status,
			headers: result.headers
		};
		return {
			type: "data",
			data: data2,
			statusCode: result.status,
			headers: result.headers
		};
	}
	if (type === "error") {
		if (isDataWithResponseInit(result)) {
			if (result.data instanceof Error) return {
				type: "error",
				error: result.data,
				statusCode: result.init?.status,
				headers: result.init?.headers ? new Headers(result.init.headers) : void 0
			};
			return {
				type: "error",
				error: dataWithResponseInitToErrorResponse(result),
				statusCode: isRouteErrorResponse(result) ? result.status : void 0,
				headers: result.init?.headers ? new Headers(result.init.headers) : void 0
			};
		}
		return {
			type: "error",
			error: result,
			statusCode: isRouteErrorResponse(result) ? result.status : void 0
		};
	}
	if (isDataWithResponseInit(result)) return {
		type: "data",
		data: result.data,
		statusCode: result.init?.status,
		headers: result.init?.headers ? new Headers(result.init.headers) : void 0
	};
	return {
		type: "data",
		data: result
	};
}
function normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename) {
	let location = response.headers.get("Location");
	invariant(location, "Redirects returned/thrown from loaders/actions must have a Location header");
	if (!isAbsoluteUrl(location)) {
		let trimmedMatches = matches.slice(0, matches.findIndex((m) => m.route.id === routeId) + 1);
		location = normalizeTo(new URL(request.url), trimmedMatches, basename, location);
		response.headers.set("Location", location);
	}
	return response;
}
var invalidProtocols = [
	"about:",
	"blob:",
	"chrome:",
	"chrome-untrusted:",
	"content:",
	"data:",
	"devtools:",
	"file:",
	"filesystem:",
	"javascript:"
];
function hasInvalidProtocol(location) {
	try {
		return invalidProtocols.includes(new URL(location).protocol);
	} catch {
		return false;
	}
}
function normalizeRedirectLocation(location, currentUrl, basename, historyInstance) {
	if (isAbsoluteUrl(location)) {
		let normalizedLocation = location;
		let url = PROTOCOL_RELATIVE_URL_REGEX.test(normalizedLocation) ? new URL(normalizeProtocolRelativeUrl(normalizedLocation, currentUrl.protocol)) : new URL(normalizedLocation);
		if (hasInvalidProtocol(url.toString())) throw new Error("Invalid redirect location");
		let isSameBasename = stripBasename(url.pathname, basename) != null;
		if (url.origin === currentUrl.origin && isSameBasename) return removeDoubleSlashes(url.pathname) + url.search + url.hash;
	}
	try {
		if (hasInvalidProtocol(historyInstance.createURL(location).toString())) throw new Error("Invalid redirect location");
	} catch (e) {}
	return location;
}
function createClientSideRequest(history, location, signal, submission) {
	let url = history.createURL(stripHashFromPath(location)).toString();
	let init = { signal };
	if (submission && isMutationMethod(submission.formMethod)) {
		let { formMethod, formEncType } = submission;
		init.method = formMethod.toUpperCase();
		if (formEncType === "application/json") {
			init.headers = new Headers({ "Content-Type": formEncType });
			init.body = JSON.stringify(submission.json);
		} else if (formEncType === "text/plain") init.body = submission.text;
		else if (formEncType === "application/x-www-form-urlencoded" && submission.formData) init.body = convertFormDataToSearchParams(submission.formData);
		else init.body = submission.formData;
	}
	return new Request(url, init);
}
function createDataFunctionUrl(request, path) {
	let url = new URL(request.url);
	let parsed = typeof path === "string" ? parsePath(path) : path;
	url.pathname = parsed.pathname || "/";
	if (parsed.search) {
		let searchParams = new URLSearchParams(parsed.search);
		let indexValues = searchParams.getAll("index");
		searchParams.delete("index");
		for (let value of indexValues.filter(Boolean)) searchParams.append("index", value);
		url.search = searchParams.size ? `?${searchParams.toString()}` : "";
	} else url.search = "";
	url.hash = parsed.hash || "";
	return url;
}
function convertFormDataToSearchParams(formData) {
	let searchParams = new URLSearchParams();
	for (let [key, value] of formData.entries()) searchParams.append(key, typeof value === "string" ? value : value.name);
	return searchParams;
}
function convertSearchParamsToFormData(searchParams) {
	let formData = new FormData();
	for (let [key, value] of searchParams.entries()) formData.append(key, value);
	return formData;
}
function processRouteLoaderData(matches, results, pendingActionResult, isStaticHandler = false, skipLoaderErrorBubbling = false) {
	let loaderData = {};
	let errors = null;
	let statusCode;
	let foundError = false;
	let loaderHeaders = {};
	let pendingError = pendingActionResult && isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : void 0;
	matches.forEach((match) => {
		if (!(match.route.id in results)) return;
		let id = match.route.id;
		let result = results[id];
		invariant(!isRedirectResult(result), "Cannot handle redirect results in processLoaderData");
		if (isErrorResult(result)) {
			let error = result.error;
			if (pendingError !== void 0) {
				error = pendingError;
				pendingError = void 0;
			}
			errors = errors || {};
			if (skipLoaderErrorBubbling) errors[id] = error;
			else {
				let boundaryMatch = findNearestBoundary(matches, id);
				if (errors[boundaryMatch.route.id] == null) errors[boundaryMatch.route.id] = error;
			}
			if (!isStaticHandler) loaderData[id] = ResetLoaderDataSymbol;
			if (!foundError) {
				foundError = true;
				statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
			}
			if (result.headers) loaderHeaders[id] = result.headers;
		} else {
			loaderData[id] = result.data;
			if (result.statusCode && result.statusCode !== 200 && !foundError) statusCode = result.statusCode;
			if (result.headers) loaderHeaders[id] = result.headers;
		}
	});
	if (pendingError !== void 0 && pendingActionResult) {
		errors = { [pendingActionResult[0]]: pendingError };
		if (pendingActionResult[2]) loaderData[pendingActionResult[2]] = void 0;
	}
	return {
		loaderData,
		errors,
		statusCode: statusCode || 200,
		loaderHeaders
	};
}
function processLoaderData(state, matches, results, pendingActionResult, revalidatingFetchers, fetcherResults, workingFetchers) {
	let { loaderData, errors } = processRouteLoaderData(matches, results, pendingActionResult);
	revalidatingFetchers.filter((f) => !f.matches || f.matches.some((m) => m.shouldLoad)).forEach((rf) => {
		let { key, match, controller } = rf;
		if (controller && controller.signal.aborted) return;
		let result = fetcherResults[key];
		invariant(result, "Did not find corresponding fetcher result");
		if (isErrorResult(result)) {
			let boundaryMatch = findNearestBoundary(state.matches, match?.route.id);
			if (!(errors && errors[boundaryMatch.route.id])) errors = {
				...errors,
				[boundaryMatch.route.id]: result.error
			};
			workingFetchers.delete(key);
		} else if (isRedirectResult(result)) invariant(false, "Unhandled fetcher revalidation redirect");
		else {
			let doneFetcher = getDoneFetcher(result.data);
			workingFetchers.set(key, doneFetcher);
		}
	});
	return {
		loaderData,
		errors
	};
}
function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
	let mergedLoaderData = Object.entries(newLoaderData).filter(([, v]) => v !== ResetLoaderDataSymbol).reduce((merged, [k, v]) => {
		merged[k] = v;
		return merged;
	}, {});
	for (let match of matches) {
		let id = match.route.id;
		if (!newLoaderData.hasOwnProperty(id) && loaderData.hasOwnProperty(id) && match.route.loader) mergedLoaderData[id] = loaderData[id];
		if (errors && errors.hasOwnProperty(id)) break;
	}
	return mergedLoaderData;
}
function getActionDataForCommit(pendingActionResult) {
	if (!pendingActionResult) return {};
	return isErrorResult(pendingActionResult[1]) ? { actionData: {} } : { actionData: { [pendingActionResult[0]]: pendingActionResult[1].data } };
}
function findNearestBoundary(matches, routeId) {
	return (routeId ? matches.slice(0, matches.findIndex((m) => m.route.id === routeId) + 1) : [...matches]).reverse().find((m) => m.route.hasErrorBoundary === true) || matches[0];
}
function getShortCircuitMatches(routes) {
	let route = routes.length === 1 ? routes[0] : routes.find((r) => r.index || !r.path || r.path === "/") || { id: `__shim-error-route__` };
	return {
		matches: [{
			params: {},
			pathname: "",
			pathnameBase: "",
			route
		}],
		route
	};
}
function getInternalRouterError(status, { pathname, routeId, method, type, message } = {}) {
	let statusText = "Unknown Server Error";
	let errorMessage = "Unknown @remix-run/router error";
	if (status === 400) {
		statusText = "Bad Request";
		if (method && pathname && routeId) errorMessage = `You made a ${method} request to "${pathname}" but did not provide a \`loader\` for route "${routeId}", so there is no way to handle the request.`;
		else if (type === "invalid-body") errorMessage = "Unable to encode submission body";
	} else if (status === 403) {
		statusText = "Forbidden";
		errorMessage = `Route "${routeId}" does not match URL "${pathname}"`;
	} else if (status === 404) {
		statusText = "Not Found";
		errorMessage = `No route matches URL "${pathname}"`;
	} else if (status === 405) {
		statusText = "Method Not Allowed";
		if (method && pathname && routeId) errorMessage = `You made a ${method.toUpperCase()} request to "${pathname}" but did not provide an \`action\` for route "${routeId}", so there is no way to handle the request.`;
		else if (method) errorMessage = `Invalid request method "${method.toUpperCase()}"`;
	}
	return new ErrorResponseImpl(status || 500, statusText, new Error(errorMessage), true);
}
function findRedirect(results) {
	let entries = Object.entries(results);
	for (let i = entries.length - 1; i >= 0; i--) {
		let [key, result] = entries[i];
		if (isRedirectResult(result)) return {
			key,
			result
		};
	}
}
function stripHashFromPath(path) {
	return createPath({
		...typeof path === "string" ? parsePath(path) : path,
		hash: ""
	});
}
function isHashChangeOnly(a, b) {
	if (a.pathname !== b.pathname || a.search !== b.search) return false;
	if (a.hash === "") return b.hash !== "";
	else if (a.hash === b.hash) return true;
	else if (b.hash !== "") return true;
	return false;
}
function dataWithResponseInitToErrorResponse(data2) {
	return new ErrorResponseImpl(data2.init?.status ?? 500, data2.init?.statusText ?? "Internal Server Error", data2.data);
}
function isDataStrategyResults(result) {
	return result != null && typeof result === "object" && Object.entries(result).every(([key, value]) => typeof key === "string" && isDataStrategyResult(value));
}
function isDataStrategyResult(result) {
	return result != null && typeof result === "object" && "type" in result && "result" in result && (result.type === "data" || result.type === "error");
}
function isRedirectDataStrategyResult(result) {
	return isResponse(result.result) && redirectStatusCodes.has(result.result.status);
}
function isErrorResult(result) {
	return result.type === "error";
}
function isRedirectResult(result) {
	return (result && result.type) === "redirect";
}
function isDataWithResponseInit(value) {
	return typeof value === "object" && value != null && "type" in value && "data" in value && "init" in value && value.type === "DataWithResponseInit";
}
function isResponse(value) {
	return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
}
function isRedirectStatusCode(statusCode) {
	return redirectStatusCodes.has(statusCode);
}
function isRedirectResponse(result) {
	return isResponse(result) && isRedirectStatusCode(result.status) && result.headers.has("Location");
}
function isValidMethod(method) {
	return validRequestMethods.has(method.toUpperCase());
}
function isMutationMethod(method) {
	return validMutationMethods.has(method.toUpperCase());
}
function hasNakedIndexQuery(search) {
	return new URLSearchParams(search).getAll("index").some((v) => v === "");
}
function getTargetMatch(matches, location) {
	let search = typeof location === "string" ? parsePath(location).search : location.search;
	if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) return matches[matches.length - 1];
	let pathMatches = getPathContributingMatches(matches);
	return pathMatches[pathMatches.length - 1];
}
function getSubmissionFromNavigation(navigation) {
	let { formMethod, formAction, formEncType, text, formData, json } = navigation;
	if (!formMethod || !formAction || !formEncType) return;
	if (text != null) return {
		formMethod,
		formAction,
		formEncType,
		formData: void 0,
		json: void 0,
		text
	};
	else if (formData != null) return {
		formMethod,
		formAction,
		formEncType,
		formData,
		json: void 0,
		text: void 0
	};
	else if (json !== void 0) return {
		formMethod,
		formAction,
		formEncType,
		formData: void 0,
		json,
		text: void 0
	};
}
function getLoadingNavigation(location, matches, historyAction, submission) {
	if (submission) return {
		state: "loading",
		location,
		matches,
		historyAction,
		formMethod: submission.formMethod,
		formAction: submission.formAction,
		formEncType: submission.formEncType,
		formData: submission.formData,
		json: submission.json,
		text: submission.text
	};
	else return {
		state: "loading",
		location,
		matches,
		historyAction,
		formMethod: void 0,
		formAction: void 0,
		formEncType: void 0,
		formData: void 0,
		json: void 0,
		text: void 0
	};
}
function getSubmittingNavigation(location, matches, historyAction, submission) {
	return {
		state: "submitting",
		location,
		matches,
		historyAction,
		formMethod: submission.formMethod,
		formAction: submission.formAction,
		formEncType: submission.formEncType,
		formData: submission.formData,
		json: submission.json,
		text: submission.text
	};
}
function getLoadingFetcher(submission, data2) {
	if (submission) return {
		state: "loading",
		formMethod: submission.formMethod,
		formAction: submission.formAction,
		formEncType: submission.formEncType,
		formData: submission.formData,
		json: submission.json,
		text: submission.text,
		data: data2
	};
	else return {
		state: "loading",
		formMethod: void 0,
		formAction: void 0,
		formEncType: void 0,
		formData: void 0,
		json: void 0,
		text: void 0,
		data: data2
	};
}
function getSubmittingFetcher(submission, existingFetcher) {
	return {
		state: "submitting",
		formMethod: submission.formMethod,
		formAction: submission.formAction,
		formEncType: submission.formEncType,
		formData: submission.formData,
		json: submission.json,
		text: submission.text,
		data: existingFetcher ? existingFetcher.data : void 0
	};
}
function getDoneFetcher(data2) {
	return {
		state: "idle",
		formMethod: void 0,
		formAction: void 0,
		formEncType: void 0,
		formData: void 0,
		json: void 0,
		text: void 0,
		data: data2
	};
}
function restoreAppliedTransitions(_window, transitions) {
	try {
		let sessionPositions = _window.sessionStorage.getItem(TRANSITIONS_STORAGE_KEY);
		if (sessionPositions) {
			let json = JSON.parse(sessionPositions);
			for (let [k, v] of Object.entries(json || {})) if (v && Array.isArray(v)) transitions.set(k, new Set(v || []));
		}
	} catch (e) {}
}
function persistAppliedTransitions(_window, transitions) {
	if (transitions.size > 0) {
		let json = {};
		for (let [k, v] of transitions) json[k] = [...v];
		try {
			_window.sessionStorage.setItem(TRANSITIONS_STORAGE_KEY, JSON.stringify(json));
		} catch (error) {
			warning(false, `Failed to save applied view transitions in sessionStorage (${error}).`);
		}
	}
}
function createDeferred() {
	let resolve;
	let reject;
	let promise = new Promise((res, rej) => {
		resolve = async (val) => {
			res(val);
			try {
				await promise;
			} catch (e) {}
		};
		reject = async (error) => {
			rej(error);
			try {
				await promise;
			} catch (e) {}
		};
	});
	return {
		promise,
		resolve,
		reject
	};
}
var React$2 = await importShared("react");
var DataRouterContext = React$2.createContext(null);
DataRouterContext.displayName = "DataRouter";
var DataRouterStateContext = React$2.createContext(null);
DataRouterStateContext.displayName = "DataRouterState";
var RSCRouterContext = React$2.createContext(false);
function useIsRSCRouterContext() {
	return React$2.useContext(RSCRouterContext);
}
var ViewTransitionContext = React$2.createContext({ isTransitioning: false });
ViewTransitionContext.displayName = "ViewTransition";
var FetchersContext = React$2.createContext(/* @__PURE__ */ new Map());
FetchersContext.displayName = "Fetchers";
var AwaitContext = React$2.createContext(null);
AwaitContext.displayName = "Await";
var NavigationContext = React$2.createContext(null);
NavigationContext.displayName = "Navigation";
var LocationContext = React$2.createContext(null);
LocationContext.displayName = "Location";
var RouteContext = React$2.createContext({
	outlet: null,
	matches: [],
	isDataRoute: false
});
RouteContext.displayName = "Route";
var RouteErrorContext = React$2.createContext(null);
RouteErrorContext.displayName = "RouteError";
var React2$1 = await importShared("react");
var ERROR_DIGEST_BASE = "REACT_ROUTER_ERROR";
var ERROR_DIGEST_REDIRECT = "REDIRECT";
var ERROR_DIGEST_ROUTE_ERROR_RESPONSE = "ROUTE_ERROR_RESPONSE";
function decodeRedirectErrorDigest(digest) {
	if (digest.startsWith(`${ERROR_DIGEST_BASE}:${ERROR_DIGEST_REDIRECT}:{`)) try {
		let parsed = JSON.parse(digest.slice(28));
		if (typeof parsed === "object" && parsed && typeof parsed.status === "number" && typeof parsed.statusText === "string" && typeof parsed.location === "string" && typeof parsed.reloadDocument === "boolean" && typeof parsed.replace === "boolean") return parsed;
	} catch {}
}
function decodeRouteErrorResponseDigest(digest) {
	if (digest.startsWith(`${ERROR_DIGEST_BASE}:${ERROR_DIGEST_ROUTE_ERROR_RESPONSE}:{`)) try {
		let parsed = JSON.parse(digest.slice(40));
		if (typeof parsed === "object" && parsed && typeof parsed.status === "number" && typeof parsed.statusText === "string") return new ErrorResponseImpl(parsed.status, parsed.statusText, parsed.data);
	} catch {}
}
function useHref(to, { relative } = {}) {
	invariant(useInRouterContext(), `useHref() may be used only in the context of a <Router> component.`);
	let { basename, navigator } = React2$1.useContext(NavigationContext);
	let { hash, pathname, search } = useResolvedPath(to, { relative });
	let joinedPathname = pathname;
	if (basename !== "/") joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
	return navigator.createHref({
		pathname: joinedPathname,
		search,
		hash
	});
}
function useInRouterContext() {
	return React2$1.useContext(LocationContext) != null;
}
function useLocation() {
	invariant(useInRouterContext(), `useLocation() may be used only in the context of a <Router> component.`);
	return React2$1.useContext(LocationContext).location;
}
function useMatch(pattern) {
	invariant(useInRouterContext(), `useMatch() may be used only in the context of a <Router> component.`);
	let { pathname } = useLocation();
	return React2$1.useMemo(() => matchPath(pattern, decodePath(pathname)), [pathname, pattern]);
}
var navigateEffectWarning = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
function useIsomorphicLayoutEffect(cb) {
	if (!React2$1.useContext(NavigationContext).static) React2$1.useLayoutEffect(cb);
}
function useNavigate() {
	let { isDataRoute } = React2$1.useContext(RouteContext);
	return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
	invariant(useInRouterContext(), `useNavigate() may be used only in the context of a <Router> component.`);
	let dataRouterContext = React2$1.useContext(DataRouterContext);
	let { basename, navigator } = React2$1.useContext(NavigationContext);
	let { matches } = React2$1.useContext(RouteContext);
	let { pathname: locationPathname } = useLocation();
	let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
	let activeRef = React2$1.useRef(false);
	useIsomorphicLayoutEffect(() => {
		activeRef.current = true;
	});
	return React2$1.useCallback((to, options = {}) => {
		warning(activeRef.current, navigateEffectWarning);
		if (!activeRef.current) return;
		if (typeof to === "number") {
			navigator.go(to);
			return;
		}
		let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
		if (dataRouterContext == null && basename !== "/") path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
		validateNavigationTarget(typeof to === "string" ? to : createPath(to), navigator.createHref(path), getNavigatorCurrentUrl(navigator), "reject");
		(!!options.replace ? navigator.replace : navigator.push)(path, options.state, options);
	}, [
		basename,
		navigator,
		routePathnamesJson,
		locationPathname,
		dataRouterContext
	]);
}
var OutletContext = React2$1.createContext(null);
function useOutlet(context) {
	let outlet = React2$1.useContext(RouteContext).outlet;
	return React2$1.useMemo(() => outlet && /* @__PURE__ */ React2$1.createElement(OutletContext.Provider, { value: context }, outlet), [outlet, context]);
}
function useParams() {
	let { matches } = React2$1.useContext(RouteContext);
	return matches[matches.length - 1]?.params ?? {};
}
function useResolvedPath(to, { relative } = {}) {
	let { matches } = React2$1.useContext(RouteContext);
	let { pathname: locationPathname } = useLocation();
	let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
	return React2$1.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [
		to,
		routePathnamesJson,
		locationPathname,
		relative
	]);
}
function useRoutesImpl(routes, locationArg, dataRouterOpts) {
	invariant(useInRouterContext(), `useRoutes() may be used only in the context of a <Router> component.`);
	let { navigator } = React2$1.useContext(NavigationContext);
	let { matches: parentMatches } = React2$1.useContext(RouteContext);
	let routeMatch = parentMatches[parentMatches.length - 1];
	let parentParams = routeMatch ? routeMatch.params : {};
	let parentPathname = routeMatch ? routeMatch.pathname : "/";
	let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
	let parentRoute = routeMatch && routeMatch.route;
	{
		let parentPath = parentRoute && parentRoute.path || "";
		warningOnce(parentPathname, !parentRoute || parentPath.endsWith("*") || parentPath.endsWith("*?"), `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${parentPathname}" (under <Route path="${parentPath}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${parentPath}"> to <Route path="${parentPath === "/" ? "*" : `${parentPath}/*`}">.`);
	}
	let locationFromContext = useLocation();
	let location;
	if (locationArg) {
		let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
		invariant(parentPathnameBase === "/" || parsedLocationArg.pathname?.startsWith(parentPathnameBase), `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${parentPathnameBase}" but pathname "${parsedLocationArg.pathname}" was given in the \`location\` prop.`);
		location = parsedLocationArg;
	} else location = locationFromContext;
	let pathname = location.pathname || "/";
	let remainingPathname = pathname;
	if (parentPathnameBase !== "/") {
		let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
		remainingPathname = "/" + pathname.replace(/^\//, "").split("/").slice(parentSegments.length).join("/");
	}
	let matches = dataRouterOpts && dataRouterOpts.state.matches.length ? dataRouterOpts.state.matches.map((m) => Object.assign(m, { route: dataRouterOpts.manifest[m.route.id] || m.route })) : matchRoutes(routes, { pathname: remainingPathname });
	warning(parentRoute || matches != null, `No routes matched location "${location.pathname}${location.search}${location.hash}" `);
	warning(matches == null || matches[matches.length - 1].route.element !== void 0 || matches[matches.length - 1].route.Component !== void 0 || matches[matches.length - 1].route.lazy !== void 0, `Matched leaf route at location "${location.pathname}${location.search}${location.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);
	let renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
		params: Object.assign({}, parentParams, match.params),
		pathname: joinPaths([parentPathnameBase, navigator.encodeLocation ? navigator.encodeLocation(match.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")).pathname : match.pathname]),
		pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([parentPathnameBase, navigator.encodeLocation ? navigator.encodeLocation(match.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")).pathname : match.pathnameBase])
	})), parentMatches, dataRouterOpts);
	if (locationArg && renderedMatches) return /* @__PURE__ */ React2$1.createElement(LocationContext.Provider, { value: {
		location: {
			pathname: "/",
			search: "",
			hash: "",
			state: null,
			key: "default",
			mask: void 0,
			...location
		},
		navigationType: "POP"
	} }, renderedMatches);
	return renderedMatches;
}
function DefaultErrorComponent() {
	let error = useRouteError();
	let message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : error instanceof Error ? error.message : JSON.stringify(error);
	let stack = error instanceof Error ? error.stack : null;
	let lightgrey = "rgba(200,200,200, 0.5)";
	let preStyles = {
		padding: "0.5rem",
		backgroundColor: lightgrey
	};
	let codeStyles = {
		padding: "2px 4px",
		backgroundColor: lightgrey
	};
	let devInfo = null;
	console.error("Error handled by React Router default ErrorBoundary:", error);
	devInfo = /* @__PURE__ */ React2$1.createElement(React2$1.Fragment, null, /* @__PURE__ */ React2$1.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ React2$1.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ React2$1.createElement("code", { style: codeStyles }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ React2$1.createElement("code", { style: codeStyles }, "errorElement"), " prop on your route."));
	return /* @__PURE__ */ React2$1.createElement(React2$1.Fragment, null, /* @__PURE__ */ React2$1.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ React2$1.createElement("h3", { style: { fontStyle: "italic" } }, message), stack ? /* @__PURE__ */ React2$1.createElement("pre", { style: preStyles }, stack) : null, devInfo);
}
var defaultErrorElement = /* @__PURE__ */ React2$1.createElement(DefaultErrorComponent, null);
var RenderErrorBoundary = class extends React2$1.Component {
	constructor(props) {
		super(props);
		this.state = {
			location: props.location,
			revalidation: props.revalidation,
			error: props.error
		};
	}
	static getDerivedStateFromError(error) {
		return { error };
	}
	static getDerivedStateFromProps(props, state) {
		if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") return {
			error: props.error,
			location: props.location,
			revalidation: props.revalidation
		};
		return {
			error: props.error !== void 0 ? props.error : state.error,
			location: state.location,
			revalidation: props.revalidation || state.revalidation
		};
	}
	componentDidCatch(error, errorInfo) {
		if (this.props.onError) this.props.onError(error, errorInfo);
		else console.error("React Router caught the following error during render", error);
	}
	render() {
		let error = this.state.error;
		if (this.context && typeof error === "object" && error && "digest" in error && typeof error.digest === "string") {
			const decoded = decodeRouteErrorResponseDigest(error.digest);
			if (decoded) error = decoded;
		}
		let result = error !== void 0 ? /* @__PURE__ */ React2$1.createElement(RouteContext.Provider, { value: this.props.routeContext }, /* @__PURE__ */ React2$1.createElement(RouteErrorContext.Provider, {
			value: error,
			children: this.props.component
		})) : this.props.children;
		if (this.context) return /* @__PURE__ */ React2$1.createElement(RSCErrorHandler, { error }, result);
		return result;
	}
};
RenderErrorBoundary.contextType = RSCRouterContext;
var errorRedirectHandledMap = /* @__PURE__ */ new WeakMap();
function RSCErrorHandler({ children, error }) {
	let { basename, navigator } = React2$1.useContext(NavigationContext);
	if (typeof error === "object" && error && "digest" in error && typeof error.digest === "string") {
		let redirect2 = decodeRedirectErrorDigest(error.digest);
		if (redirect2) {
			let existingRedirect = errorRedirectHandledMap.get(error);
			if (existingRedirect) throw existingRedirect;
			let parsed = parseToInfo(redirect2.location, basename);
			let target = parsed.absoluteURL || parsed.to;
			validateNavigationTarget(redirect2.location, target, getNavigatorCurrentUrl(navigator), "allow-explicit");
			if (hasInvalidProtocol(target)) throw new Error("Invalid redirect location");
			if (isBrowser && !errorRedirectHandledMap.get(error)) {
				if (parsed.isExternal || redirect2.reloadDocument) window.location.href = target;
				else {
					const redirectPromise = Promise.resolve().then(() => window.__reactRouterDataRouter.navigate(parsed.to, { replace: redirect2.replace }));
					errorRedirectHandledMap.set(error, redirectPromise);
					throw redirectPromise;
				}
			}
			return /* @__PURE__ */ React2$1.createElement("meta", {
				httpEquiv: "refresh",
				content: `0;url=${target}`
			});
		}
	}
	return children;
}
function RenderedRoute({ routeContext, match, children }) {
	let dataRouterContext = React2$1.useContext(DataRouterContext);
	if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
	return /* @__PURE__ */ React2$1.createElement(RouteContext.Provider, { value: routeContext }, children);
}
function _renderMatches(matches, parentMatches = [], dataRouterOpts) {
	let dataRouterState = dataRouterOpts?.state;
	if (matches == null) {
		if (!dataRouterState) return null;
		if (dataRouterState.errors) matches = dataRouterState.matches;
		else if (parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) matches = dataRouterState.matches;
		else return null;
	}
	let renderedMatches = matches;
	let errors = dataRouterState?.errors;
	if (errors != null) {
		let errorIndex = renderedMatches.findIndex((m) => m.route.id && errors?.[m.route.id] !== void 0);
		invariant(errorIndex >= 0, `Could not find a matching route for errors on route IDs: ${Object.keys(errors).join(",")}`);
		renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
	}
	let renderFallback = false;
	let fallbackIndex = -1;
	if (dataRouterOpts && dataRouterState) {
		renderFallback = dataRouterState.renderFallback;
		for (let i = 0; i < renderedMatches.length; i++) {
			let match = renderedMatches[i];
			if (match.route.HydrateFallback || match.route.hydrateFallbackElement) fallbackIndex = i;
			if (match.route.id) {
				let { loaderData, errors: errors2 } = dataRouterState;
				let needsToRunLoader = match.route.loader && !loaderData.hasOwnProperty(match.route.id) && (!errors2 || errors2[match.route.id] === void 0);
				if (match.route.lazy || needsToRunLoader) {
					if (dataRouterOpts.isStatic) renderFallback = true;
					if (fallbackIndex >= 0) renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
					else renderedMatches = [renderedMatches[0]];
					break;
				}
			}
		}
	}
	let onErrorHandler = dataRouterOpts?.onError;
	let onError = dataRouterState && onErrorHandler ? (error, errorInfo) => {
		onErrorHandler(error, {
			location: dataRouterState.location,
			params: dataRouterState.matches?.[0]?.params ?? {},
			pattern: getRoutePattern(dataRouterState.matches),
			errorInfo
		});
	} : void 0;
	return renderedMatches.reduceRight((outlet, match, index) => {
		let error;
		let shouldRenderHydrateFallback = false;
		let errorElement = null;
		let hydrateFallbackElement = null;
		if (dataRouterState) {
			error = errors && match.route.id ? errors[match.route.id] : void 0;
			errorElement = match.route.errorElement || defaultErrorElement;
			if (renderFallback) {
				if (fallbackIndex < 0 && index === 0) {
					warningOnce("route-fallback", false, "No `HydrateFallback` element provided to render during initial hydration");
					shouldRenderHydrateFallback = true;
					hydrateFallbackElement = null;
				} else if (fallbackIndex === index) {
					shouldRenderHydrateFallback = true;
					hydrateFallbackElement = match.route.hydrateFallbackElement || null;
				}
			}
		}
		let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1));
		let getChildren = () => {
			let children;
			if (error) children = errorElement;
			else if (shouldRenderHydrateFallback) children = hydrateFallbackElement;
			else if (match.route.Component) children = /* @__PURE__ */ React2$1.createElement(match.route.Component, null);
			else if (match.route.element) children = match.route.element;
			else children = outlet;
			return /* @__PURE__ */ React2$1.createElement(RenderedRoute, {
				match,
				routeContext: {
					outlet,
					matches: matches2,
					isDataRoute: dataRouterState != null
				},
				children
			});
		};
		return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ React2$1.createElement(RenderErrorBoundary, {
			location: dataRouterState.location,
			revalidation: dataRouterState.revalidation,
			component: errorElement,
			error,
			children: getChildren(),
			routeContext: {
				outlet: null,
				matches: matches2,
				isDataRoute: true
			},
			onError
		}) : getChildren();
	}, null);
}
function getDataRouterConsoleError(hookName) {
	return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext(hookName) {
	let ctx = React2$1.useContext(DataRouterContext);
	invariant(ctx, getDataRouterConsoleError(hookName));
	return ctx;
}
function useDataRouterState(hookName) {
	let state = React2$1.useContext(DataRouterStateContext);
	invariant(state, getDataRouterConsoleError(hookName));
	return state;
}
function useRouteContext(hookName) {
	let route = React2$1.useContext(RouteContext);
	invariant(route, getDataRouterConsoleError(hookName));
	return route;
}
function useCurrentRouteId(hookName) {
	let route = useRouteContext(hookName);
	let thisRoute = route.matches[route.matches.length - 1];
	invariant(thisRoute.route.id, `${hookName} can only be used on routes that contain a unique "id"`);
	return thisRoute.route.id;
}
function useRouteId() {
	return useCurrentRouteId("useRouteId");
}
function useNavigation() {
	let state = useDataRouterState("useNavigation");
	return React2$1.useMemo(() => {
		let { matches, historyAction, ...rest } = state.navigation;
		return rest;
	}, [state.navigation]);
}
function useMatches() {
	let { matches, loaderData } = useDataRouterState("useMatches");
	return React2$1.useMemo(() => matches.map((m) => convertRouteMatchToUiMatch(m, loaderData)), [matches, loaderData]);
}
function useRouteError() {
	let error = React2$1.useContext(RouteErrorContext);
	let state = useDataRouterState("useRouteError");
	let routeId = useCurrentRouteId("useRouteError");
	if (error !== void 0) return error;
	return state.errors?.[routeId];
}
function useNavigateStable() {
	let { router } = useDataRouterContext("useNavigate");
	let id = useCurrentRouteId("useNavigate");
	let activeRef = React2$1.useRef(false);
	useIsomorphicLayoutEffect(() => {
		activeRef.current = true;
	});
	return React2$1.useCallback(async (to, options = {}) => {
		warning(activeRef.current, navigateEffectWarning);
		if (!activeRef.current) return;
		if (typeof to === "number") await router.navigate(to);
		else await router.navigate(to, {
			fromRouteId: id,
			...options
		});
	}, [router, id]);
}
var alreadyWarned = {};
function warningOnce(key, cond, message) {
	if (!cond && !alreadyWarned[key]) {
		alreadyWarned[key] = true;
		warning(false, message);
	}
}
var React3$1 = await importShared("react");
var alreadyWarned2 = {};
function warnOnce(condition, message) {
	if (!condition && !alreadyWarned2[message]) {
		alreadyWarned2[message] = true;
		console.warn(message);
	}
}
var useOptimisticImpl = React3$1["useOptimistic"];
var stableUseOptimisticSetter = () => void 0;
function useOptimisticSafe(val) {
	if (useOptimisticImpl) return useOptimisticImpl(val);
	else return [val, stableUseOptimisticSetter];
}
function mapRouteProperties(route) {
	let updates = { hasErrorBoundary: route.hasErrorBoundary || route.ErrorBoundary != null || route.errorElement != null };
	if (route.Component) {
		if (route.element) warning(false, "You should not include both `Component` and `element` on your route - `Component` will be used.");
		Object.assign(updates, {
			element: React3$1.createElement(route.Component),
			Component: void 0
		});
	}
	if (route.HydrateFallback) {
		if (route.hydrateFallbackElement) warning(false, "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used.");
		Object.assign(updates, {
			hydrateFallbackElement: React3$1.createElement(route.HydrateFallback),
			HydrateFallback: void 0
		});
	}
	if (route.ErrorBoundary) {
		if (route.errorElement) warning(false, "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used.");
		Object.assign(updates, {
			errorElement: React3$1.createElement(route.ErrorBoundary),
			ErrorBoundary: void 0
		});
	}
	return updates;
}
var hydrationRouteProperties = ["HydrateFallback", "hydrateFallbackElement"];
function createMemoryRouter(routes, opts) {
	return createRouter({
		basename: opts?.basename,
		getContext: opts?.getContext,
		future: opts?.future,
		history: createMemoryHistory({
			initialEntries: opts?.initialEntries,
			initialIndex: opts?.initialIndex
		}),
		hydrationData: opts?.hydrationData,
		routes,
		hydrationRouteProperties,
		mapRouteProperties,
		dataStrategy: opts?.dataStrategy,
		patchRoutesOnNavigation: opts?.patchRoutesOnNavigation,
		instrumentations: opts?.instrumentations
	}).initialize();
}
var Deferred = class {
	constructor() {
		this.status = "pending";
		this.promise = new Promise((resolve, reject) => {
			this.resolve = (value) => {
				if (this.status === "pending") {
					this.status = "resolved";
					resolve(value);
				}
			};
			this.reject = (reason) => {
				if (this.status === "pending") {
					this.status = "rejected";
					reject(reason);
				}
			};
		});
	}
};
function RouterProvider({ router, flushSync: reactDomFlushSyncImpl, onError, useTransitions }) {
	useTransitions = useIsRSCRouterContext() || useTransitions;
	let [_state, setStateImpl] = React3$1.useState(router.state);
	let [state, setOptimisticState] = useOptimisticSafe(_state);
	let [pendingState, setPendingState] = React3$1.useState();
	let [vtContext, setVtContext] = React3$1.useState({ isTransitioning: false });
	let [renderDfd, setRenderDfd] = React3$1.useState();
	let [transition, setTransition] = React3$1.useState();
	let [interruption, setInterruption] = React3$1.useState();
	let fetcherData = React3$1.useRef(/* @__PURE__ */ new Map());
	let setState = React3$1.useCallback((newState, { deletedFetchers, newErrors, flushSync, viewTransitionOpts }) => {
		if (newErrors && onError) Object.values(newErrors).forEach((error) => onError(error, {
			location: newState.location,
			params: newState.matches[0]?.params ?? {},
			pattern: getRoutePattern(newState.matches)
		}));
		newState.fetchers.forEach((fetcher, key) => {
			if (fetcher.data !== void 0) fetcherData.current.set(key, fetcher.data);
		});
		deletedFetchers.forEach((key) => fetcherData.current.delete(key));
		warnOnce(flushSync === false || reactDomFlushSyncImpl != null, "You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from \"react-router/dom\"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.");
		let isViewTransitionAvailable = router.window != null && router.window.document != null && typeof router.window.document.startViewTransition === "function";
		warnOnce(viewTransitionOpts == null || isViewTransitionAvailable, "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available.");
		if (!viewTransitionOpts || !isViewTransitionAvailable) {
			if (reactDomFlushSyncImpl && flushSync) reactDomFlushSyncImpl(() => setStateImpl(newState));
			else if (useTransitions === false) setStateImpl(newState);
			else React3$1.startTransition(() => {
				if (useTransitions === true) setOptimisticState((s) => getOptimisticRouterState(s, newState));
				setStateImpl(newState);
			});
			return;
		}
		if (reactDomFlushSyncImpl && flushSync) {
			reactDomFlushSyncImpl(() => {
				if (transition) {
					renderDfd?.resolve();
					transition.skipTransition();
				}
				setVtContext({
					isTransitioning: true,
					flushSync: true,
					currentLocation: viewTransitionOpts.currentLocation,
					nextLocation: viewTransitionOpts.nextLocation
				});
			});
			let t = router.window.document.startViewTransition(() => {
				reactDomFlushSyncImpl(() => setStateImpl(newState));
			});
			t.finished.finally(() => {
				reactDomFlushSyncImpl(() => {
					setRenderDfd(void 0);
					setTransition(void 0);
					setPendingState(void 0);
					setVtContext({ isTransitioning: false });
				});
			});
			reactDomFlushSyncImpl(() => setTransition(t));
			return;
		}
		if (transition) {
			renderDfd?.resolve();
			transition.skipTransition();
			setInterruption({
				state: newState,
				currentLocation: viewTransitionOpts.currentLocation,
				nextLocation: viewTransitionOpts.nextLocation
			});
		} else {
			setPendingState(newState);
			setVtContext({
				isTransitioning: true,
				flushSync: false,
				currentLocation: viewTransitionOpts.currentLocation,
				nextLocation: viewTransitionOpts.nextLocation
			});
		}
	}, [
		router.window,
		reactDomFlushSyncImpl,
		transition,
		renderDfd,
		useTransitions,
		setOptimisticState,
		onError
	]);
	React3$1.useLayoutEffect(() => router.subscribe(setState), [router, setState]);
	React3$1.useEffect(() => {
		if (vtContext.isTransitioning && !vtContext.flushSync) setRenderDfd(new Deferred());
	}, [vtContext]);
	React3$1.useEffect(() => {
		if (renderDfd && pendingState && router.window) {
			let newState = pendingState;
			let renderPromise = renderDfd.promise;
			let transition2 = router.window.document.startViewTransition(async () => {
				if (useTransitions === false) setStateImpl(newState);
				else React3$1.startTransition(() => {
					if (useTransitions === true) setOptimisticState((s) => getOptimisticRouterState(s, newState));
					setStateImpl(newState);
				});
				await renderPromise;
			});
			transition2.finished.finally(() => {
				setRenderDfd(void 0);
				setTransition(void 0);
				setPendingState(void 0);
				setVtContext({ isTransitioning: false });
			});
			setTransition(transition2);
		}
	}, [
		pendingState,
		renderDfd,
		router.window,
		useTransitions,
		setOptimisticState
	]);
	React3$1.useEffect(() => {
		if (renderDfd && pendingState && state.location.key === pendingState.location.key) renderDfd.resolve();
	}, [
		renderDfd,
		transition,
		state.location,
		pendingState
	]);
	React3$1.useEffect(() => {
		if (!vtContext.isTransitioning && interruption) {
			setPendingState(interruption.state);
			setVtContext({
				isTransitioning: true,
				flushSync: false,
				currentLocation: interruption.currentLocation,
				nextLocation: interruption.nextLocation
			});
			setInterruption(void 0);
		}
	}, [vtContext.isTransitioning, interruption]);
	let navigator = React3$1.useMemo(() => {
		return {
			createHref: router.createHref,
			createURL: router.createURL,
			encodeLocation: router.encodeLocation,
			go: (n) => router.navigate(n),
			push: (to, state2, opts) => router.navigate(to, {
				state: state2,
				preventScrollReset: opts?.preventScrollReset
			}),
			replace: (to, state2, opts) => router.navigate(to, {
				replace: true,
				state: state2,
				preventScrollReset: opts?.preventScrollReset
			})
		};
	}, [router]);
	let basename = router.basename || "/";
	let dataRouterContext = React3$1.useMemo(() => ({
		router,
		navigator,
		static: false,
		basename,
		onError
	}), [
		router,
		navigator,
		basename,
		onError
	]);
	return /* @__PURE__ */ React3$1.createElement(React3$1.Fragment, null, /* @__PURE__ */ React3$1.createElement(DataRouterContext.Provider, { value: dataRouterContext }, /* @__PURE__ */ React3$1.createElement(DataRouterStateContext.Provider, { value: state }, /* @__PURE__ */ React3$1.createElement(FetchersContext.Provider, { value: fetcherData.current }, /* @__PURE__ */ React3$1.createElement(ViewTransitionContext.Provider, { value: vtContext }, /* @__PURE__ */ React3$1.createElement(Router, {
		basename,
		location: state.location,
		navigationType: state.historyAction,
		navigator,
		useTransitions
	}, /* @__PURE__ */ React3$1.createElement(MemoizedDataRoutes, {
		routes: router.routes,
		manifest: router.manifest,
		future: router.future,
		state,
		isStatic: false,
		onError
	})))))), null);
}
function getOptimisticRouterState(currentState, newState) {
	return {
		...currentState,
		navigation: newState.navigation.state !== "idle" ? newState.navigation : currentState.navigation,
		revalidation: newState.revalidation !== "idle" ? newState.revalidation : currentState.revalidation,
		actionData: newState.navigation.state !== "submitting" ? newState.actionData : currentState.actionData,
		fetchers: newState.fetchers
	};
}
var MemoizedDataRoutes = React3$1.memo(DataRoutes2);
function DataRoutes2({ routes, manifest, future, state, isStatic, onError }) {
	return useRoutesImpl(routes, void 0, {
		manifest,
		state,
		isStatic,
		onError,
		future
	});
}
function Outlet(props) {
	return useOutlet(props.context);
}
function Router({ basename: basenameProp = "/", children = null, location: locationProp, navigationType = "POP", navigator, static: staticProp = false, useTransitions }) {
	invariant(!useInRouterContext(), `You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);
	let basename = basenameProp.replace(/^\/*/, "/");
	let navigationContext = React3$1.useMemo(() => ({
		basename,
		navigator,
		static: staticProp,
		useTransitions,
		future: {}
	}), [
		basename,
		navigator,
		staticProp,
		useTransitions
	]);
	if (typeof locationProp === "string") locationProp = parsePath(locationProp);
	let { pathname = "/", search = "", hash = "", state = null, key = "default", mask } = locationProp;
	let locationContext = React3$1.useMemo(() => {
		let trailingPathname = stripBasename(pathname, basename);
		if (trailingPathname == null) return null;
		return {
			location: {
				pathname: trailingPathname,
				search,
				hash,
				state,
				key,
				mask
			},
			navigationType
		};
	}, [
		basename,
		pathname,
		search,
		hash,
		state,
		key,
		navigationType,
		mask
	]);
	warning(locationContext != null, `<Router basename="${basename}"> is not able to match the URL "${pathname}${search}${hash}" because it does not start with the basename, so the <Router> won't render anything.`);
	if (locationContext == null) return null;
	return /* @__PURE__ */ React3$1.createElement(NavigationContext.Provider, { value: navigationContext }, /* @__PURE__ */ React3$1.createElement(LocationContext.Provider, {
		children,
		value: locationContext
	}));
}
React3$1.Component;
var defaultMethod = "get";
var defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
	return typeof HTMLElement !== "undefined" && object instanceof HTMLElement;
}
function isButtonElement(object) {
	return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
	return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
	return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
	return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
	return event.button === 0 && (!target || target === "_self") && !isModifiedEvent(event);
}
var _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
	if (_formDataSupportsSubmitter === null) try {
		new FormData(document.createElement("form"), 0);
		_formDataSupportsSubmitter = false;
	} catch (e) {
		_formDataSupportsSubmitter = true;
	}
	return _formDataSupportsSubmitter;
}
var supportedFormEncTypes = /* @__PURE__ */ new Set([
	"application/x-www-form-urlencoded",
	"multipart/form-data",
	"text/plain"
]);
function getFormEncType(encType) {
	if (encType != null && !supportedFormEncTypes.has(encType)) {
		warning(false, `"${encType}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${defaultEncType}"`);
		return null;
	}
	return encType;
}
function getFormSubmissionInfo(target, basename) {
	let method;
	let action;
	let encType;
	let formData;
	let body;
	if (isFormElement(target)) {
		let attr = target.getAttribute("action");
		action = attr ? stripBasename(attr, basename) : null;
		method = target.getAttribute("method") || defaultMethod;
		encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
		formData = new FormData(target);
	} else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
		let form = target.form;
		if (form == null) throw new Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);
		let attr = target.getAttribute("formaction") || form.getAttribute("action");
		action = attr ? stripBasename(attr, basename) : null;
		method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
		encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
		formData = new FormData(form, target);
		if (!isFormDataSubmitterSupported()) {
			let { name, type, value } = target;
			if (type === "image") {
				let prefix = name ? `${name}.` : "";
				formData.append(`${prefix}x`, "0");
				formData.append(`${prefix}y`, "0");
			} else if (name) formData.append(name, value);
		}
	} else if (isHtmlElement(target)) throw new Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);
	else {
		method = defaultMethod;
		action = null;
		encType = defaultEncType;
		body = target;
	}
	if (formData && encType === "text/plain") {
		body = formData;
		formData = void 0;
	}
	return {
		action,
		method: method.toLowerCase(),
		encType,
		formData,
		body
	};
}
await importShared("react");
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var ESCAPE_LOOKUP = {
	"&": "\\u0026",
	">": "\\u003e",
	"<": "\\u003c",
	"\u2028": "\\u2028",
	"\u2029": "\\u2029"
};
var ESCAPE_REGEX = /[&><\u2028\u2029]/g;
function escapeHtml(html) {
	return html.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}
function invariant2(value, message) {
	if (value === false || value === null || typeof value === "undefined") throw new Error(message);
}
function singleFetchUrl(reqUrl, basename, trailingSlashAware, extension) {
	let url = typeof reqUrl === "string" ? new URL(reqUrl, typeof window === "undefined" ? "server://singlefetch/" : window.location.origin) : reqUrl;
	if (trailingSlashAware) {
		if (url.pathname.endsWith("/")) url.pathname = `${url.pathname}_.${extension}`;
		else url.pathname = `${url.pathname}.${extension}`;
	} else if (url.pathname === "/") url.pathname = `_root.${extension}`;
	else if (basename && stripBasename(url.pathname, basename) === "/") url.pathname = `${removeTrailingSlash(basename)}/_root.${extension}`;
	else url.pathname = `${removeTrailingSlash(url.pathname)}.${extension}`;
	return url;
}
var React9 = await importShared("react");
var React8 = await importShared("react");
async function loadRouteModule(route, routeModulesCache) {
	if (route.id in routeModulesCache) return routeModulesCache[route.id];
	try {
		let routeModule = await import(
			/* @vite-ignore */
			/* webpackIgnore: true */
			route.module
);
		routeModulesCache[route.id] = routeModule;
		return routeModule;
	} catch (error) {
		console.error(`Error loading route module \`${route.module}\`, reloading page...`);
		console.error(error);
		if (window.__reactRouterContext && window.__reactRouterContext.isSpaMode && void 0);
		window.location.reload();
		return new Promise(() => {});
	}
}
function isPageLinkDescriptor(object) {
	return object != null && typeof object.page === "string";
}
function isHtmlLinkDescriptor(object) {
	if (object == null) return false;
	if (object.href == null) return object.rel === "preload" && typeof object.imageSrcSet === "string" && typeof object.imageSizes === "string";
	return typeof object.rel === "string" && typeof object.href === "string";
}
async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
	return dedupeLinkDescriptors((await Promise.all(matches.map(async (match) => {
		let route = manifest.routes[match.route.id];
		if (route) {
			let mod = await loadRouteModule(route, routeModules);
			return mod.links ? mod.links() : [];
		}
		return [];
	}))).flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map((link) => link.rel === "stylesheet" ? {
		...link,
		rel: "prefetch",
		as: "style"
	} : {
		...link,
		rel: "prefetch"
	}));
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location, mode) {
	let isNew = (match, index) => {
		if (!currentMatches[index]) return true;
		return match.route.id !== currentMatches[index].route.id;
	};
	let matchPathChanged = (match, index) => {
		return currentMatches[index].pathname !== match.pathname || currentMatches[index].route.path?.endsWith("*") && currentMatches[index].params["*"] !== match.params["*"];
	};
	if (mode === "assets") return nextMatches.filter((match, index) => isNew(match, index) || matchPathChanged(match, index));
	if (mode === "data") return nextMatches.filter((match, index) => {
		let manifestRoute = manifest.routes[match.route.id];
		if (!manifestRoute || !manifestRoute.hasLoader) return false;
		if (isNew(match, index) || matchPathChanged(match, index)) return true;
		if (match.route.shouldRevalidate) {
			let routeChoice = match.route.shouldRevalidate({
				currentUrl: new URL(location.pathname + location.search + location.hash, window.origin),
				currentParams: currentMatches[0]?.params || {},
				nextUrl: new URL(page, window.origin),
				nextParams: match.params,
				defaultShouldRevalidate: true
			});
			if (typeof routeChoice === "boolean") return routeChoice;
		}
		return true;
	});
	return [];
}
function getModuleLinkHrefs(matches, manifest, { includeHydrateFallback } = {}) {
	return dedupeHrefs(matches.map((match) => {
		let route = manifest.routes[match.route.id];
		if (!route) return [];
		let hrefs = [route.module];
		if (route.clientActionModule) hrefs = hrefs.concat(route.clientActionModule);
		if (route.clientLoaderModule) hrefs = hrefs.concat(route.clientLoaderModule);
		if (includeHydrateFallback && route.hydrateFallbackModule) hrefs = hrefs.concat(route.hydrateFallbackModule);
		if (route.imports) hrefs = hrefs.concat(route.imports);
		return hrefs;
	}).flat(1));
}
function dedupeHrefs(hrefs) {
	return [...new Set(hrefs)];
}
function sortKeys(obj) {
	let sorted = {};
	let keys = Object.keys(obj).sort();
	for (let key of keys) sorted[key] = obj[key];
	return sorted;
}
function dedupeLinkDescriptors(descriptors, preloads) {
	let set = /* @__PURE__ */ new Set();
	let preloadsSet = new Set(preloads);
	return descriptors.reduce((deduped, descriptor) => {
		if (preloads && !isPageLinkDescriptor(descriptor) && descriptor.as === "script" && descriptor.href && preloadsSet.has(descriptor.href)) return deduped;
		let key = JSON.stringify(sortKeys(descriptor));
		if (!set.has(key)) {
			set.add(key);
			deduped.push({
				key,
				link: descriptor
			});
		}
		return deduped;
	}, []);
}
await importShared("react");
await importShared("react");
await importShared("react");
function useDataRouterContext2() {
	let context = React8.useContext(DataRouterContext);
	invariant2(context, "You must render this element inside a <DataRouterContext.Provider> element");
	return context;
}
function useDataRouterStateContext() {
	let context = React8.useContext(DataRouterStateContext);
	invariant2(context, "You must render this element inside a <DataRouterStateContext.Provider> element");
	return context;
}
var FrameworkContext = React8.createContext(void 0);
FrameworkContext.displayName = "FrameworkContext";
function useFrameworkContext() {
	let context = React8.useContext(FrameworkContext);
	invariant2(context, "You must render this element inside a <HydratedRouter> element");
	return context;
}
function usePrefetchBehavior(prefetch, theirElementProps) {
	let frameworkContext = React8.useContext(FrameworkContext);
	let [maybePrefetch, setMaybePrefetch] = React8.useState(false);
	let [shouldPrefetch, setShouldPrefetch] = React8.useState(false);
	let { onFocus, onBlur, onMouseEnter, onMouseLeave, onTouchStart } = theirElementProps;
	let ref = React8.useRef(null);
	React8.useEffect(() => {
		if (prefetch === "render") setShouldPrefetch(true);
		if (prefetch === "viewport") {
			let callback = (entries) => {
				entries.forEach((entry) => {
					setShouldPrefetch(entry.isIntersecting);
				});
			};
			let observer = new IntersectionObserver(callback, { threshold: .5 });
			if (ref.current) observer.observe(ref.current);
			return () => {
				observer.disconnect();
			};
		}
	}, [prefetch]);
	React8.useEffect(() => {
		if (maybePrefetch) {
			let id = setTimeout(() => {
				setShouldPrefetch(true);
			}, 100);
			return () => {
				clearTimeout(id);
			};
		}
	}, [maybePrefetch]);
	let setIntent = () => {
		setMaybePrefetch(true);
	};
	let cancelIntent = () => {
		setMaybePrefetch(false);
		setShouldPrefetch(false);
	};
	if (!frameworkContext) return [
		false,
		ref,
		{}
	];
	if (prefetch !== "intent") return [
		shouldPrefetch,
		ref,
		{}
	];
	return [
		shouldPrefetch,
		ref,
		{
			onFocus: composeEventHandlers(onFocus, setIntent),
			onBlur: composeEventHandlers(onBlur, cancelIntent),
			onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
			onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
			onTouchStart: composeEventHandlers(onTouchStart, setIntent)
		}
	];
}
function composeEventHandlers(theirHandler, ourHandler) {
	return (event) => {
		theirHandler && theirHandler(event);
		if (!event.defaultPrevented) ourHandler(event);
	};
}
function PrefetchPageLinks({ page, ...linkProps }) {
	let rsc = useIsRSCRouterContext();
	let { nonce: contextNonce } = useFrameworkContext();
	let { router } = useDataRouterContext2();
	let matches = React8.useMemo(() => matchRoutes(router.routes, page, router.basename), [
		router.routes,
		page,
		router.basename
	]);
	if (!matches) return null;
	if (linkProps.nonce == null && contextNonce) linkProps = {
		...linkProps,
		nonce: contextNonce
	};
	if (rsc) return /* @__PURE__ */ React8.createElement(RSCPrefetchPageLinksImpl, {
		page,
		matches,
		...linkProps
	});
	return /* @__PURE__ */ React8.createElement(PrefetchPageLinksImpl, {
		page,
		matches,
		...linkProps
	});
}
function useKeyedPrefetchLinks(matches) {
	let { manifest, routeModules } = useFrameworkContext();
	let [keyedPrefetchLinks, setKeyedPrefetchLinks] = React8.useState([]);
	React8.useEffect(() => {
		let interrupted = false;
		getKeyedPrefetchLinks(matches, manifest, routeModules).then((links) => {
			if (!interrupted) setKeyedPrefetchLinks(links);
		});
		return () => {
			interrupted = true;
		};
	}, [
		matches,
		manifest,
		routeModules
	]);
	return keyedPrefetchLinks;
}
function RSCPrefetchPageLinksImpl({ page, matches: nextMatches, ...linkProps }) {
	let location = useLocation();
	let { future } = useFrameworkContext();
	let { basename } = useDataRouterContext2();
	let dataHrefs = React8.useMemo(() => {
		if (page === location.pathname + location.search + location.hash) return [];
		let url = singleFetchUrl(page, basename, future.v8_trailingSlashAwareDataRequests, "rsc");
		let hasSomeRoutesWithShouldRevalidate = false;
		let targetRoutes = [];
		for (let match of nextMatches) if (typeof match.route.shouldRevalidate === "function") hasSomeRoutesWithShouldRevalidate = true;
		else targetRoutes.push(match.route.id);
		if (hasSomeRoutesWithShouldRevalidate && targetRoutes.length > 0) url.searchParams.set("_routes", targetRoutes.join(","));
		return [url.pathname + url.search];
	}, [
		basename,
		future.v8_trailingSlashAwareDataRequests,
		page,
		location,
		nextMatches
	]);
	return /* @__PURE__ */ React8.createElement(React8.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ React8.createElement("link", {
		key: href,
		rel: "prefetch",
		as: "fetch",
		href,
		...linkProps
	})));
}
function PrefetchPageLinksImpl({ page, matches: nextMatches, ...linkProps }) {
	let location = useLocation();
	let { future, manifest, routeModules } = useFrameworkContext();
	let { basename } = useDataRouterContext2();
	let { loaderData, matches } = useDataRouterStateContext();
	let newMatchesForData = React8.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location, "data"), [
		page,
		nextMatches,
		matches,
		manifest,
		location
	]);
	let newMatchesForAssets = React8.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location, "assets"), [
		page,
		nextMatches,
		matches,
		manifest,
		location
	]);
	let dataHrefs = React8.useMemo(() => {
		if (page === location.pathname + location.search + location.hash) return [];
		let routesParams = /* @__PURE__ */ new Set();
		let foundOptOutRoute = false;
		nextMatches.forEach((m) => {
			let manifestRoute = manifest.routes[m.route.id];
			if (!manifestRoute || !manifestRoute.hasLoader) return;
			if (!newMatchesForData.some((m2) => m2.route.id === m.route.id) && m.route.id in loaderData && routeModules[m.route.id]?.shouldRevalidate) foundOptOutRoute = true;
			else if (manifestRoute.hasClientLoader) foundOptOutRoute = true;
			else routesParams.add(m.route.id);
		});
		if (routesParams.size === 0) return [];
		let url = singleFetchUrl(page, basename, future.v8_trailingSlashAwareDataRequests, "data");
		if (foundOptOutRoute && routesParams.size > 0) url.searchParams.set("_routes", nextMatches.filter((m) => routesParams.has(m.route.id)).map((m) => m.route.id).join(","));
		return [url.pathname + url.search];
	}, [
		basename,
		future.v8_trailingSlashAwareDataRequests,
		loaderData,
		location,
		manifest,
		newMatchesForData,
		nextMatches,
		page,
		routeModules
	]);
	let moduleHrefs = React8.useMemo(() => getModuleLinkHrefs(newMatchesForAssets, manifest), [newMatchesForAssets, manifest]);
	let keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets);
	return /* @__PURE__ */ React8.createElement(React8.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ React8.createElement("link", {
		key: href,
		rel: "prefetch",
		as: "fetch",
		href,
		...linkProps
	})), moduleHrefs.map((href) => /* @__PURE__ */ React8.createElement("link", {
		key: href,
		rel: "modulepreload",
		href,
		...linkProps
	})), keyedPrefetchLinks.map(({ key, link }) => /* @__PURE__ */ React8.createElement("link", {
		key,
		nonce: linkProps.nonce,
		...link,
		crossOrigin: link.crossOrigin ?? linkProps.crossOrigin
	})));
}
function mergeRefs(...refs) {
	return (value) => {
		refs.forEach((ref) => {
			if (typeof ref === "function") ref(value);
			else if (ref != null) ref.current = value;
		});
	};
}
React9.Component;
var React10 = await importShared("react");
var isBrowser2 = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
try {
	if (isBrowser2) window.__reactRouterVersion = "7.18.5";
} catch (e) {}
function createBrowserRouter(routes, opts) {
	return createRouter({
		basename: opts?.basename,
		getContext: opts?.getContext,
		future: opts?.future,
		history: createBrowserHistory({ window: opts?.window }),
		hydrationData: opts?.hydrationData || parseHydrationData(),
		routes,
		mapRouteProperties,
		hydrationRouteProperties,
		dataStrategy: opts?.dataStrategy,
		patchRoutesOnNavigation: opts?.patchRoutesOnNavigation,
		window: opts?.window,
		instrumentations: opts?.instrumentations
	}).initialize();
}
function parseHydrationData() {
	let state = window?.__staticRouterHydrationData;
	if (state && state.errors) state = {
		...state,
		errors: deserializeErrors(state.errors)
	};
	return state;
}
function deserializeErrors(errors) {
	if (!errors) return null;
	let entries = Object.entries(errors);
	let serialized = {};
	for (let [key, val] of entries) if (val && val.__type === "RouteErrorResponse") serialized[key] = new ErrorResponseImpl(val.status, val.statusText, val.data, val.internal === true);
	else if (val && val.__type === "Error") {
		if (typeof val.__subType === "string" && SUPPORTED_ERROR_TYPES.includes(val.__subType)) {
			let ErrorConstructor = window[val.__subType];
			if (typeof ErrorConstructor === "function") try {
				let error = new ErrorConstructor(val.message);
				error.stack = "";
				serialized[key] = error;
			} catch (e) {}
		}
		if (serialized[key] == null) {
			let error = new Error(val.message);
			error.stack = "";
			serialized[key] = error;
		}
	} else serialized[key] = val;
	return serialized;
}
function HistoryRouter({ basename, children, history, useTransitions }) {
	let [state, setStateImpl] = React10.useState({
		action: history.action,
		location: history.location
	});
	let setState = React10.useCallback((newState) => {
		if (useTransitions === false) setStateImpl(newState);
		else React10.startTransition(() => setStateImpl(newState));
	}, [useTransitions]);
	React10.useLayoutEffect(() => history.listen(setState), [history, setState]);
	return /* @__PURE__ */ React10.createElement(Router, {
		basename,
		children,
		location: state.location,
		navigationType: state.action,
		navigator: history,
		useTransitions
	});
}
HistoryRouter.displayName = "unstable_HistoryRouter";
var Link = React10.forwardRef(function LinkWithRef({ onClick, discover = "render", prefetch = "none", relative, reloadDocument, replace: replace2, mask, state, target, to, preventScrollReset, viewTransition, defaultShouldRevalidate, ...rest }, forwardedRef) {
	let { basename, navigator, useTransitions } = React10.useContext(NavigationContext);
	let isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX.test(to);
	let parsed = parseToInfo(to, basename);
	to = parsed.to;
	let href = useHref(to, { relative });
	let location = useLocation();
	let maskedHref = null;
	if (mask) {
		let resolved = resolveTo(mask, [], location.mask ? location.mask.pathname : "/", true);
		if (basename !== "/") resolved.pathname = resolved.pathname === "/" ? basename : joinPaths([basename, resolved.pathname]);
		maskedHref = navigator.createHref(resolved);
	}
	let [shouldPrefetch, prefetchRef, prefetchHandlers] = usePrefetchBehavior(prefetch, rest);
	let internalOnClick = useLinkClickHandler(to, {
		replace: replace2,
		mask,
		state,
		target,
		preventScrollReset,
		relative,
		viewTransition,
		defaultShouldRevalidate,
		useTransitions
	});
	function handleClick(event) {
		if (onClick) onClick(event);
		if (!event.defaultPrevented) internalOnClick(event);
	}
	let isSpaLink = !(parsed.isExternal || reloadDocument);
	let link = /* @__PURE__ */ React10.createElement("a", {
		...rest,
		...prefetchHandlers,
		href: (isSpaLink ? maskedHref : void 0) || parsed.absoluteURL || href,
		onClick: isSpaLink ? handleClick : onClick,
		ref: mergeRefs(forwardedRef, prefetchRef),
		target,
		"data-discover": !isAbsolute && discover === "render" ? "true" : void 0
	});
	return shouldPrefetch && !isAbsolute ? /* @__PURE__ */ React10.createElement(React10.Fragment, null, link, /* @__PURE__ */ React10.createElement(PrefetchPageLinks, { page: href })) : link;
});
Link.displayName = "Link";
var NavLink = React10.forwardRef(function NavLinkWithRef({ "aria-current": ariaCurrentProp = "page", caseSensitive = false, className: classNameProp = "", end = false, style: styleProp, to, viewTransition, children, ...rest }, ref) {
	let path = useResolvedPath(to, { relative: rest.relative });
	let location = useLocation();
	let routerState = React10.useContext(DataRouterStateContext);
	let { navigator, basename } = React10.useContext(NavigationContext);
	let isTransitioning = routerState != null && useViewTransitionState(path) && viewTransition === true;
	let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
	let locationPathname = location.pathname;
	let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
	if (!caseSensitive) {
		locationPathname = locationPathname.toLowerCase();
		nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
		toPathname = toPathname.toLowerCase();
	}
	if (nextLocationPathname && basename) nextLocationPathname = stripBasename(nextLocationPathname, basename) || nextLocationPathname;
	const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
	let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
	let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
	let renderProps = {
		isActive,
		isPending,
		isTransitioning
	};
	let ariaCurrent = isActive ? ariaCurrentProp : void 0;
	let className;
	if (typeof classNameProp === "function") className = classNameProp(renderProps);
	else className = [
		classNameProp,
		isActive ? "active" : null,
		isPending ? "pending" : null,
		isTransitioning ? "transitioning" : null
	].filter(Boolean).join(" ");
	let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
	return /* @__PURE__ */ React10.createElement(Link, {
		...rest,
		"aria-current": ariaCurrent,
		className,
		ref,
		style,
		to,
		viewTransition
	}, typeof children === "function" ? children(renderProps) : children);
});
NavLink.displayName = "NavLink";
var Form = React10.forwardRef(({ discover = "render", fetcherKey, navigate, reloadDocument, replace: replace2, state, method = defaultMethod, action, onSubmit, relative, preventScrollReset, viewTransition, defaultShouldRevalidate, ...props }, forwardedRef) => {
	let { useTransitions } = React10.useContext(NavigationContext);
	let submit = useSubmit();
	let formAction = useFormAction(action, { relative });
	let formMethod = method.toLowerCase() === "get" ? "get" : "post";
	let isAbsolute = typeof action === "string" && ABSOLUTE_URL_REGEX.test(action);
	let submitHandler = (event) => {
		onSubmit && onSubmit(event);
		if (event.defaultPrevented) return;
		event.preventDefault();
		let submitter = event.nativeEvent.submitter;
		let submitMethod = submitter?.getAttribute("formmethod") || method;
		let doSubmit = () => submit(submitter || event.currentTarget, {
			fetcherKey,
			method: submitMethod,
			navigate,
			replace: replace2,
			state,
			relative,
			preventScrollReset,
			viewTransition,
			defaultShouldRevalidate
		});
		if (useTransitions && navigate !== false) React10.startTransition(() => doSubmit());
		else doSubmit();
	};
	return /* @__PURE__ */ React10.createElement("form", {
		ref: forwardedRef,
		method: formMethod,
		action: formAction,
		onSubmit: reloadDocument ? onSubmit : submitHandler,
		...props,
		"data-discover": !isAbsolute && discover === "render" ? "true" : void 0
	});
});
Form.displayName = "Form";
function ScrollRestoration({ getKey, storageKey, ...props }) {
	let remixContext = React10.useContext(FrameworkContext);
	let { basename } = React10.useContext(NavigationContext);
	let location = useLocation();
	let matches = useMatches();
	useScrollRestoration({
		getKey,
		storageKey
	});
	let ssrKey = React10.useMemo(() => {
		if (!remixContext || !getKey) return null;
		let userKey = getScrollRestorationKey(location, matches, basename, getKey);
		return userKey !== location.key ? userKey : null;
	}, []);
	if (!remixContext || remixContext.isSpaMode) return null;
	let restoreScroll = ((storageKey2, restoreKey) => {
		if (!window.history.state || !window.history.state.key) {
			let key = Math.random().toString(32).slice(2);
			window.history.replaceState({ key }, "");
		}
		try {
			let storedY = JSON.parse(sessionStorage.getItem(storageKey2) || "{}")[restoreKey || window.history.state.key];
			if (typeof storedY === "number") window.scrollTo(0, storedY);
		} catch (error) {
			console.error(error);
			sessionStorage.removeItem(storageKey2);
		}
	}).toString();
	if (props.nonce == null && remixContext?.nonce) props.nonce = remixContext.nonce;
	return /* @__PURE__ */ React10.createElement("script", {
		...props,
		suppressHydrationWarning: true,
		dangerouslySetInnerHTML: { __html: `(${restoreScroll})(${escapeHtml(JSON.stringify(storageKey || SCROLL_RESTORATION_STORAGE_KEY))}, ${escapeHtml(JSON.stringify(ssrKey))})` }
	});
}
ScrollRestoration.displayName = "ScrollRestoration";
function getDataRouterConsoleError2(hookName) {
	return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext3(hookName) {
	let ctx = React10.useContext(DataRouterContext);
	invariant(ctx, getDataRouterConsoleError2(hookName));
	return ctx;
}
function useDataRouterState2(hookName) {
	let state = React10.useContext(DataRouterStateContext);
	invariant(state, getDataRouterConsoleError2(hookName));
	return state;
}
function useLinkClickHandler(to, { target, replace: replaceProp, mask, state, preventScrollReset, relative, viewTransition, defaultShouldRevalidate, useTransitions } = {}) {
	let navigate = useNavigate();
	let location = useLocation();
	let path = useResolvedPath(to, { relative });
	return React10.useCallback((event) => {
		if (shouldProcessLinkClick(event, target)) {
			event.preventDefault();
			let replace2 = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
			let doNavigate = () => navigate(to, {
				replace: replace2,
				mask,
				state,
				preventScrollReset,
				relative,
				viewTransition,
				defaultShouldRevalidate
			});
			if (useTransitions) React10.startTransition(() => doNavigate());
			else doNavigate();
		}
	}, [
		location,
		navigate,
		path,
		replaceProp,
		mask,
		state,
		target,
		to,
		preventScrollReset,
		relative,
		viewTransition,
		defaultShouldRevalidate,
		useTransitions
	]);
}
var fetcherId = 0;
var getUniqueFetcherId = () => `__${String(++fetcherId)}__`;
function useSubmit() {
	let { router } = useDataRouterContext3("useSubmit");
	let { basename } = React10.useContext(NavigationContext);
	let currentRouteId = useRouteId();
	let routerFetch = router.fetch;
	let routerNavigate = router.navigate;
	return React10.useCallback(async (target, options = {}) => {
		let { action, method, encType, formData, body } = getFormSubmissionInfo(target, basename);
		if (options.navigate === false) {
			let key = options.fetcherKey || getUniqueFetcherId();
			await routerFetch(key, currentRouteId, options.action || action, {
				defaultShouldRevalidate: options.defaultShouldRevalidate,
				preventScrollReset: options.preventScrollReset,
				formData,
				body,
				formMethod: options.method || method,
				formEncType: options.encType || encType,
				flushSync: options.flushSync
			});
		} else await routerNavigate(options.action || action, {
			defaultShouldRevalidate: options.defaultShouldRevalidate,
			preventScrollReset: options.preventScrollReset,
			formData,
			body,
			formMethod: options.method || method,
			formEncType: options.encType || encType,
			replace: options.replace,
			state: options.state,
			fromRouteId: currentRouteId,
			flushSync: options.flushSync,
			viewTransition: options.viewTransition
		});
	}, [
		routerFetch,
		routerNavigate,
		basename,
		currentRouteId
	]);
}
function useFormAction(action, { relative } = {}) {
	let { basename } = React10.useContext(NavigationContext);
	let routeContext = React10.useContext(RouteContext);
	invariant(routeContext, "useFormAction must be used inside a RouteContext");
	let [match] = routeContext.matches.slice(-1);
	let path = { ...useResolvedPath(action ? action : ".", { relative }) };
	let location = useLocation();
	if (action == null) {
		path.search = location.search;
		let params = new URLSearchParams(path.search);
		let indexValues = params.getAll("index");
		if (indexValues.some((v) => v === "")) {
			params.delete("index");
			indexValues.filter((v) => v).forEach((v) => params.append("index", v));
			let qs = params.toString();
			path.search = qs ? `?${qs}` : "";
		}
	}
	if ((!action || action === ".") && match.route.index) path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
	if (basename !== "/") path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
	return createPath(path);
}
var SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions";
var savedScrollPositions = {};
function getScrollRestorationKey(location, matches, basename, getKey) {
	let key = null;
	if (getKey) {
		if (basename !== "/") key = getKey({
			...location,
			pathname: stripBasename(location.pathname, basename) || location.pathname
		}, matches);
		else key = getKey(location, matches);
	}
	if (key == null) key = location.key;
	return key;
}
function useScrollRestoration({ getKey, storageKey } = {}) {
	let { router } = useDataRouterContext3("useScrollRestoration");
	let { restoreScrollPosition, preventScrollReset } = useDataRouterState2("useScrollRestoration");
	let { basename } = React10.useContext(NavigationContext);
	let location = useLocation();
	let matches = useMatches();
	let navigation = useNavigation();
	React10.useEffect(() => {
		window.history.scrollRestoration = "manual";
		return () => {
			window.history.scrollRestoration = "auto";
		};
	}, []);
	usePageHide(React10.useCallback(() => {
		if (navigation.state === "idle") {
			let key = getScrollRestorationKey(location, matches, basename, getKey);
			savedScrollPositions[key] = window.scrollY;
		}
		try {
			sessionStorage.setItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY, JSON.stringify(savedScrollPositions));
		} catch (error) {
			warning(false, `Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${error}).`);
		}
		window.history.scrollRestoration = "auto";
	}, [
		navigation.state,
		getKey,
		basename,
		location,
		matches,
		storageKey
	]));
	if (typeof document !== "undefined") {
		React10.useLayoutEffect(() => {
			try {
				let sessionPositions = sessionStorage.getItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY);
				if (sessionPositions) savedScrollPositions = JSON.parse(sessionPositions);
			} catch (e) {}
		}, [storageKey]);
		React10.useLayoutEffect(() => {
			let disableScrollRestoration = router?.enableScrollRestoration(savedScrollPositions, () => window.scrollY, getKey ? (location2, matches2) => getScrollRestorationKey(location2, matches2, basename, getKey) : void 0);
			return () => disableScrollRestoration && disableScrollRestoration();
		}, [
			router,
			basename,
			getKey
		]);
		React10.useLayoutEffect(() => {
			if (restoreScrollPosition === false) return;
			if (typeof restoreScrollPosition === "number") {
				window.scrollTo(0, restoreScrollPosition);
				return;
			}
			try {
				if (location.hash) {
					let el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
					if (el) {
						el.scrollIntoView();
						return;
					}
				}
			} catch {
				warning(false, `"${location.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`);
			}
			if (preventScrollReset === true) return;
			window.scrollTo(0, 0);
		}, [
			location,
			restoreScrollPosition,
			preventScrollReset
		]);
	}
}
function usePageHide(callback, options) {
	let { capture } = options || {};
	React10.useEffect(() => {
		let opts = capture != null ? { capture } : void 0;
		window.addEventListener("pagehide", callback, opts);
		return () => {
			window.removeEventListener("pagehide", callback, opts);
		};
	}, [callback, capture]);
}
function useViewTransitionState(to, { relative } = {}) {
	let vtContext = React10.useContext(ViewTransitionContext);
	invariant(vtContext != null, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
	let { basename } = useDataRouterContext3("useViewTransitionState");
	let path = useResolvedPath(to, { relative });
	if (!vtContext.isTransitioning) return false;
	let currentPath = stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
	let nextPath = stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
	return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
}
await importShared("react");
// node_modules/react-router/dist/development/dom-export.mjs
/**
* react-router v7.18.5
*
* Copyright (c) Remix Software Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE.md file in the root directory of this source tree.
*
* @license MIT
*/
var React$1 = await importShared("react");
var ReactDOM = await importShared("react-dom");
function RouterProvider2(props) {
	return /* @__PURE__ */ React$1.createElement(RouterProvider, {
		flushSync: ReactDOM.flushSync,
		...props
	});
}
await importShared("react");
await importShared("react");
await importShared("react-dom");
// src/components/ScrollToTop.tsx
var { useLayoutEffect } = await importShared("react");
var ScrollToTop = ({ contentRef }) => {
	const { pathname } = useLocation();
	useLayoutEffect(() => {
		let element = contentRef.current;
		while (element) {
			const { overflowX, overflowY } = window.getComputedStyle(element);
			if (/(auto|scroll|overlay)/.test(`${overflowX} ${overflowY}`)) element.scrollTo({
				top: 0,
				left: 0,
				behavior: "instant"
			});
			element = element.parentElement;
		}
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "instant"
		});
	}, [pathname, contentRef]);
	return null;
};
// node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toKebabCase = (string) => string?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
// node_modules/lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
function toLucideIconData(iconName, iconNode, aliases = []) {
	if (iconNode == null) throw new Error("[lucide]: iconNode is required when icon name is used");
	return {
		name: toKebabCase(iconName),
		size: 24,
		node: iconNode,
		...aliases.length > 0 ? { aliases } : {}
	};
}
// node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toCamelCase = (string) => {
	let out = "";
	let upperNext = false;
	for (const ch of string) {
		if (ch === "-" || ch === "_" || ch <= " ") {
			upperNext = out.length > 0;
			continue;
		}
		if (out.length === 0) out += ch.toLowerCase();
		else out += upperNext ? ch.toUpperCase() : ch;
		upperNext = false;
	}
	return out;
};
// node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toPascalCase = (string) => {
	const camelCase = toCamelCase(string);
	return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
// node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
	return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
// node_modules/lucide-react/dist/esm/shared/src/build/defaultAttributes.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
};
// node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconNode.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
function isDefined(value) {
	return value !== null && value !== void 0;
}
function buildLucideIconNode(icon, params = {}) {
	const attributeNames = params.attributeNames ?? {};
	const getAttributeName = (attributeName) => attributeNames[attributeName] ?? attributeName;
	const viewBoxWidth = icon.size ?? icon.width ?? defaultAttributes["width"];
	const viewBoxHeight = icon.size ?? icon.height ?? defaultAttributes["height"];
	const aliasClassNames = icon.aliases?.filter((alias) => typeof alias === "string" && alias.trim() !== "").map((alias) => `lucide-${alias}`) ?? [];
	const iconClassNames = [...icon.name ? [`lucide-${icon.name}`] : [], ...aliasClassNames];
	const classNamesFromClassName = params.className?.split(" ").filter(Boolean) ?? [];
	const className = params.includeDefaultClasses === false ? mergeClasses(...classNamesFromClassName) : mergeClasses("lucide", ...iconClassNames, ...classNamesFromClassName);
	const calculatedStrokeWidth = params.absoluteStrokeWidth ? Number(params.strokeWidth ?? defaultAttributes["stroke-width"]) * Number(icon.size ?? icon.width ?? defaultAttributes["width"]) / Number(params.size ?? params.width ?? defaultAttributes["width"]) : params.strokeWidth ?? defaultAttributes["stroke-width"];
	return [
		"svg",
		{
			...Object.entries(defaultAttributes).reduce((attrs, [attrName, value]) => {
				attrs[getAttributeName(attrName)] = value;
				return attrs;
			}, {}),
			..."color" in params && params.color && { [getAttributeName("stroke")]: params.color },
			..."size" in params && isDefined(params.size) && {
				[getAttributeName("width")]: params.size,
				[getAttributeName("height")]: params.size
			},
			..."width" in params && isDefined(params.width) && { [getAttributeName("width")]: params.width },
			..."height" in params && isDefined(params.height) && { [getAttributeName("height")]: params.height },
			[getAttributeName("stroke-width")]: calculatedStrokeWidth,
			...className && { [getAttributeName("class")]: className },
			[getAttributeName("viewBox")]: `0 0 ${viewBoxWidth} ${viewBoxHeight}`,
			...params.hasA11yProp === false ? { [getAttributeName("aria-hidden")]: "true" } : {},
			..."attributes" in params && params.attributes
		},
		icon.node.map((child) => {
			const [name, attrs, children] = child;
			const nextAttrs = params.nonScalingStroke ? {
				[getAttributeName("vector-effect")]: "non-scaling-stroke",
				...attrs
			} : attrs;
			return children ? [
				name,
				nextAttrs,
				children
			] : [name, nextAttrs];
		})
	];
}
// node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
function buildLucideIconForReact(icon, params = {}) {
	return buildLucideIconNode(icon, {
		...params,
		attributeNames: {
			...params.attributeNames,
			class: "className",
			"stroke-width": "strokeWidth",
			"stroke-linecap": "strokeLinecap",
			"stroke-linejoin": "strokeLinejoin",
			"vector-effect": "vectorEffect"
		}
	});
}
// node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var hasA11yProp = (props) => {
	for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
	return false;
};
// node_modules/lucide-react/dist/esm/context.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var { createContext, useContext, useMemo: useMemo$1, createElement: createElement$3 } = await importShared("react");
var LucideContext = createContext({});
var useLucideContext = () => useContext(LucideContext);
// node_modules/lucide-react/dist/esm/Icon.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var { forwardRef: forwardRef$1, createElement: createElement$2 } = await importShared("react");
var Icon = forwardRef$1(({ color, size, width, height, strokeWidth, absoluteStrokeWidth, nonScalingStroke, className = "", children, iconNode = [], icon = {
	node: iconNode,
	aliases: [],
	size: 24
}, ...rest }, ref) => {
	const { size: contextSize = 24, strokeWidth: contextStrokeWidth = 2, absoluteStrokeWidth: contextAbsoluteStrokeWidth = false, nonScalingStroke: contextNonScalingStroke = false, color: contextColor = "currentColor", className: contextClass = "" } = useLucideContext() ?? {};
	const hasAccessibleProp = Boolean(children) || hasA11yProp(rest);
	const [name, svgAttributes, builtIconNode = []] = buildLucideIconForReact(icon, {
		color: color ?? contextColor,
		width: width ?? size ?? contextSize,
		height: height ?? size ?? contextSize,
		strokeWidth: strokeWidth ?? contextStrokeWidth,
		absoluteStrokeWidth: absoluteStrokeWidth ?? contextAbsoluteStrokeWidth,
		nonScalingStroke: nonScalingStroke ?? contextNonScalingStroke,
		className: mergeClasses(contextClass, className),
		hasA11yProp: hasAccessibleProp,
		attributes: rest
	});
	return createElement$2(name, {
		ref,
		...svgAttributes
	}, [...builtIconNode.map(([tag, attrs]) => createElement$2(tag, attrs)), ...Array.isArray(children) ? children : [children]]);
});
// node_modules/lucide-react/dist/esm/createLucideIcon.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var { forwardRef, createElement: createElement$1 } = await importShared("react");
function createLucideIcon(iconDataOrName, iconNode = [], aliases = []) {
	const iconData = typeof iconDataOrName === "string" ? toLucideIconData(iconDataOrName, iconNode, aliases) : iconDataOrName;
	const Component = forwardRef(({ className, ...props }, ref) => createElement$1(Icon, {
		ref,
		icon: iconData,
		className,
		...props
	}));
	if (iconData.name) Component.displayName = toPascalCase(iconData.name);
	return Component;
}
// node_modules/lucide-react/dist/esm/icons/award.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$16 = {
	name: "award",
	size: 24,
	node: [["path", {
		d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
		key: "1yiouv"
	}], ["circle", {
		cx: "12",
		cy: "8",
		r: "6",
		key: "1vp47v"
	}]]
};
__iconData$16.node;
var Award = createLucideIcon(__iconData$16);
// node_modules/lucide-react/dist/esm/icons/bell.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$15 = {
	name: "bell",
	size: 24,
	node: [["path", {
		d: "M10.268 21a2 2 0 0 0 3.464 0",
		key: "vwvbt9"
	}], ["path", {
		d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
		key: "11g9vi"
	}]]
};
__iconData$15.node;
var Bell = createLucideIcon(__iconData$15);
// node_modules/lucide-react/dist/esm/icons/book-check.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$14 = {
	name: "book-check",
	size: 24,
	node: [["path", {
		d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
		key: "k3hazp"
	}], ["path", {
		d: "m9 9.5 2 2 4-4",
		key: "1dth82"
	}]]
};
__iconData$14.node;
var BookCheck = createLucideIcon(__iconData$14);
// node_modules/lucide-react/dist/esm/icons/book-open.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$13 = {
	name: "book-open",
	size: 24,
	node: [["path", {
		d: "M12 5v16",
		key: "1f6ucr"
	}], ["path", {
		d: "M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",
		key: "1fyvmf"
	}]]
};
__iconData$13.node;
var BookOpen = createLucideIcon(__iconData$13);
// node_modules/lucide-react/dist/esm/icons/box.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$12 = {
	name: "box",
	size: 24,
	node: [
		["path", {
			d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
			key: "hh9hay"
		}],
		["path", {
			d: "m3.3 7 8.7 5 8.7-5",
			key: "g66t2b"
		}],
		["path", {
			d: "M12 22V12",
			key: "d0xqtd"
		}]
	]
};
__iconData$12.node;
var Box = createLucideIcon(__iconData$12);
// node_modules/lucide-react/dist/esm/icons/chart-column-big.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$11 = {
	name: "chart-column-big",
	size: 24,
	node: [
		["path", {
			d: "M3 3v16a2 2 0 0 0 2 2h16",
			key: "c24i48"
		}],
		["rect", {
			x: "15",
			y: "5",
			width: "4",
			height: "12",
			rx: "1",
			key: "q8uenq"
		}],
		["rect", {
			x: "7",
			y: "8",
			width: "4",
			height: "9",
			rx: "1",
			key: "sr5ea"
		}]
	],
	aliases: ["bar-chart-big"]
};
__iconData$11.node;
var ChartColumnBig = createLucideIcon(__iconData$11);
// node_modules/lucide-react/dist/esm/icons/circle-check.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$10 = {
	name: "circle-check",
	size: 24,
	node: [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["path", {
		d: "m16 9-5.5 5.5L8 12",
		key: "xofnsj"
	}]],
	aliases: ["check-circle-2"]
};
__iconData$10.node;
var CircleCheck = createLucideIcon(__iconData$10);
// node_modules/lucide-react/dist/esm/icons/circle-question-mark.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$9 = {
	name: "circle-question-mark",
	size: 24,
	node: [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M9 9.5a3 2.5 0 016 0c0 2-2 2-3 3.5",
			key: "1awbb0"
		}],
		["path", {
			d: "M12 17h.01",
			key: "p32p05"
		}]
	],
	aliases: ["help-circle", "circle-help"]
};
__iconData$9.node;
var CircleQuestionMark = createLucideIcon(__iconData$9);
// node_modules/lucide-react/dist/esm/icons/circle.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$8 = {
	name: "circle",
	size: 24,
	node: [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]]
};
__iconData$8.node;
var Circle = createLucideIcon(__iconData$8);
// node_modules/lucide-react/dist/esm/icons/graph-hub.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$7 = {
	name: "graph-hub",
	size: 24,
	node: [
		["circle", {
			cx: "12",
			cy: "7",
			r: "4",
			key: "17ys0d"
		}],
		["circle", {
			cx: "4",
			cy: "19",
			r: "2",
			key: "p3m9r0"
		}],
		["circle", {
			cx: "12",
			cy: "19",
			r: "2",
			key: "13j0tp"
		}],
		["circle", {
			cx: "20",
			cy: "19",
			r: "2",
			key: "1obnsp"
		}],
		["path", {
			d: "M8 7a4 4 0 0 0-4 4v6",
			key: "4fno04"
		}],
		["path", {
			d: "M12 11v6",
			key: "1bwqyc"
		}],
		["path", {
			d: "M16 7a4 4 0 0 1 4 4v6",
			key: "1sfi0q"
		}]
	]
};
__iconData$7.node;
var GraphHub = createLucideIcon(__iconData$7);
// node_modules/lucide-react/dist/esm/icons/lightbulb.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$6 = {
	name: "lightbulb",
	size: 24,
	node: [
		["path", {
			d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
			key: "1gvzjb"
		}],
		["path", {
			d: "M9 18h6",
			key: "x1upvd"
		}],
		["path", {
			d: "M10 22h4",
			key: "ceow96"
		}]
	]
};
__iconData$6.node;
var Lightbulb = createLucideIcon(__iconData$6);
// node_modules/lucide-react/dist/esm/icons/map.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$5 = {
	name: "map",
	size: 24,
	node: [
		["path", {
			d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
			key: "169xi5"
		}],
		["path", {
			d: "M15 5.764v15",
			key: "1pn4in"
		}],
		["path", {
			d: "M9 3.236v15",
			key: "1uimfh"
		}]
	]
};
__iconData$5.node;
var Map$1 = createLucideIcon(__iconData$5);
// node_modules/lucide-react/dist/esm/icons/rocket.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$4 = {
	name: "rocket",
	size: 24,
	node: [
		["path", {
			d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",
			key: "qeys4"
		}],
		["path", {
			d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09",
			key: "u4xsad"
		}],
		["path", {
			d: "M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z",
			key: "676m9"
		}],
		["path", {
			d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05",
			key: "92ym6u"
		}]
	]
};
__iconData$4.node;
var Rocket = createLucideIcon(__iconData$4);
// node_modules/lucide-react/dist/esm/icons/search.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$3 = {
	name: "search",
	size: 24,
	node: [["path", {
		d: "m21 21-4.34-4.34",
		key: "14j7rj"
	}], ["circle", {
		cx: "11",
		cy: "11",
		r: "8",
		key: "4ej97u"
	}]]
};
__iconData$3.node;
var Search = createLucideIcon(__iconData$3);
// node_modules/lucide-react/dist/esm/icons/settings.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$2 = {
	name: "settings",
	size: 24,
	node: [["path", {
		d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
		key: "1i5ecw"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "3",
		key: "1v7zrd"
	}]]
};
__iconData$2.node;
var Settings = createLucideIcon(__iconData$2);
// node_modules/lucide-react/dist/esm/icons/trophy.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$1 = {
	name: "trophy",
	size: 24,
	node: [
		["path", {
			d: "M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2",
			key: "pwuv1l"
		}],
		["path", {
			d: "M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2",
			key: "1y54w1"
		}],
		["path", {
			d: "M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3",
			key: "e30mpu"
		}],
		["path", {
			d: "M4 22h16",
			key: "57wxv0"
		}],
		["path", {
			d: "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",
			key: "1mhfuq"
		}],
		["path", {
			d: "M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3",
			key: "i0yafy"
		}]
	]
};
__iconData$1.node;
var Trophy = createLucideIcon(__iconData$1);
// node_modules/lucide-react/dist/esm/icons/zap.mjs
/**
* @license lucide-react v1.73.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData = {
	name: "zap",
	size: 24,
	node: [["path", {
		d: "M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z",
		key: "1v7up4"
	}]]
};
__iconData.node;
var Zap = createLucideIcon(__iconData);
// src/components/layout/Topbar.tsx
var import_jsx_runtime = require_jsx_runtime();
function Topbar() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "mfe-academy-topbar",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mfe-academy-topbar-left",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NavLink, {
				to: "/",
				className: "mfe-academy-topbar-brand",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mfe-academy-topbar-brand-mark",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { size: 20 })
					}),
					" ",
					"Dash Academy"
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mfe-academy-topbar-right",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mfe-academy-search-box",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					placeholder: "Suche ..."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "mfe-academy-notification-button",
				"aria-label": "Notifications",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mfe-academy-notification-dot" })]
			})]
		})]
	});
}
// src/layouts/AppLayout.tsx
var { useRef: useRef$1 } = await importShared("react");
function AppLayout() {
	const contentRef = useRef$1(null);
	const isRetentionPage = useMatch("/retention");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mfe-academy",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollToTop, { contentRef }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mfe-academy-main-content",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Topbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				ref: contentRef,
				className: isRetentionPage ? "mfe-academy-main--full-width" : void 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})]
		})]
	});
}
// src/pages/LandingPage.tsx
var featureLinks = [
	{
		label: "Explore",
		path: "/retention",
		icon: ChartColumnBig,
		description: "Beispiel App"
	},
	{
		label: "Learn",
		path: "/learning-path",
		icon: Map$1,
		description: "Beispiel Roadmap"
	},
	{
		label: "Connect",
		path: "/.",
		icon: GraphHub,
		description: "Example Button"
	},
	{
		label: "Settings",
		path: "/settings",
		icon: Settings,
		description: "Example Page"
	}
];
var benefits = [
	{
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, {}),
		number: "01 / LERNEN",
		title: "Learning by Doing",
		description: "Lernen mit echten Apps."
	},
	{
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {}),
		number: "02 / ENTDECKEN",
		title: "Safe Sandbox",
		description: "App Inhalte in einer geschützten Umgebung entdecken."
	},
	{
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookCheck, {}),
		number: "03 / ENTWICKELN",
		title: "Apps, Roadmap, Knowledge Hubs?",
		description: "Dash und Fortbildungen zur DGQE gemeinsam entwickeln."
	},
	{
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, {}),
		number: "04 / AUFBAUEN",
		title: "Data Literacy",
		description: "Data Literacy Skills aufbauen."
	}
];
function LandingPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "learning-page mfe-academy-landing-page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mfe-academy-landing-benefits",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mfe-academy-landing-intro",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "learning-eyebrow",
						children: "Fortbildungsapp"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mfe-academy-landing-title",
						children: ["Dash ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Academy" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mfe-academy-landing-note",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mfe-academy-landing-note-icon",
							children: "✓"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Fortbildungsinhalte für Dash." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mfe-academy-landing-actions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/learning-path",
							className: "mfe-academy-landing-start",
							children: "Starten"
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mfe-academy-landing-benefits-visual",
				children: benefits.map((benefit, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mfe-academy-landing-benefit",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mfe-academy-landing-benefit-icon",
						children: benefit.icon
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mfe-academy-landing-benefit-copy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mfe-academy-landing-benefit-number",
								children: benefit.number
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: benefit.title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: benefit.description })
						]
					})]
				}, index))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mfe-academy-landing-features",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mfe-academy-feature-links-grid",
				children: featureLinks.map(({ label, path, icon: Icon, description }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: path,
					className: "mfe-academy-feature-link-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mfe-academy-feature-link-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 32 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mfe-academy-feature-link-title",
							children: label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mfe-academy-feature-link-description",
							children: description
						})
					]
				}, label))
			})
		})]
	});
}
// src/assets/intro.svg
var intro_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='iso-8859-1'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%20473.935%20473.935'%20xml:space='preserve'%3e%3ccircle%20style='fill:%234ABC96;'%20cx='236.967'%20cy='236.967'%20r='236.967'/%3e%3cg%3e%3cpath%20style='fill:%2382725A;'%20d='M238.752,94.907c-5.411,0-9.807,4.389-9.807,9.807v223.744c0,5.418,4.397,9.807,9.807,9.807%20c5.418,0,9.807-4.389,9.807-9.807V104.714C248.559,99.292,244.17,94.907,238.752,94.907z'/%3e%3cpath%20style='fill:%2382725A;'%20d='M234.719,325.569c-2.99,2.986-2.99,7.832,0,10.821l63.753,63.756c2.99,2.986,7.835,2.986,10.825,0%20c2.99-2.99,2.99-7.832,0-10.821l-63.753-63.756C242.554,322.58,237.708,322.58,234.719,325.569z'/%3e%3cpath%20style='fill:%2382725A;'%20d='M243.474,325.569c2.99,2.986,2.99,7.832,0,10.821l-63.753,63.756c-2.986,2.986-7.835,2.986-10.818,0%20c-2.993-2.99-2.993-7.832,0-10.821l63.753-63.753C235.643,322.58,240.488,322.58,243.474,325.569z'/%3e%3c/g%3e%3cpath%20style='fill:%23F9F29A;'%20d='M376.517,280.106c0,20.292-16.449,6.125-36.737,6.125H140.785c-20.288,0-36.737,14.166-36.737-6.125%20V127.034c0-20.288,16.449-9.186,36.737-9.186h198.996c20.288,0,36.737-11.106,36.737,9.186V280.106z'/%3e%3cg%3e%3crect%20x='257.252'%20y='160.598'%20style='fill:%2380702C;'%20width='102.596'%20height='6.492'/%3e%3crect%20x='257.611'%20y='176.837'%20style='fill:%2380702C;'%20width='102.585'%20height='6.485'/%3e%3crect%20x='257.555'%20y='194.087'%20style='fill:%2380702C;'%20width='102.596'%20height='6.492'/%3e%3crect%20x='257.555'%20y='210.775'%20style='fill:%2380702C;'%20width='56.576'%20height='6.496'/%3e%3c/g%3e%3cpath%20style='fill:%23988534;'%20d='M218.217,175.958c-0.61-1.949-2.395-3.259-4.61-3.259c-0.007,0-0.007,0-0.011,0%20c-2.095,0.082-3.888,1.568-4.352,3.611l-9.751,42.757l-13.5-64.972c-0.442-2.107-2.256-3.626-4.565-3.697%20c-2.069,0-3.91,1.396-4.475,3.401l-12.924,46.413l-12.759-12.767c-1.762-1.759-4.823-1.759-6.582,0l-20.022,20.015l6.586,6.586%20l16.726-16.73l15.113,15.117c1.156,1.141,2.926,1.624,4.471,1.209c1.594-0.419,2.862-1.669,3.297-3.255l9.919-35.629l13.949,67.113%20c0.449,2.163,2.301,3.686,4.528,3.708h0.026c2.181,0,4.049-1.486,4.539-3.618l10.66-46.757l7.405,23.671l8.879-2.773%20L218.217,175.958z'/%3e%3cg%3e%3cpath%20style='fill:%2382725A;'%20d='M390.295,113.915c0,5.07-5.759,9.186-12.864,9.186H100.074c-7.102,0-12.864-4.112-12.864-9.186l0,0%20c0-5.074,5.762-9.186,12.864-9.186h277.353C384.536,104.729,390.295,108.841,390.295,113.915L390.295,113.915z'/%3e%3cpath%20style='fill:%2382725A;'%20d='M390.295,284.047c0,5.07-5.759,9.186-12.864,9.186H100.074c-7.102,0-12.864-4.116-12.864-9.186l0,0%20c0-5.074,5.762-9.186,12.864-9.186h277.353C384.536,274.861,390.295,278.973,390.295,284.047L390.295,284.047z'/%3e%3c/g%3e%3c/svg%3e";
// src/data/lessonMetadata.ts
/**
* Lesson metadata - defines modules and lessons
* Content is loaded from markdown files in src/lessons/
* 
* This separates structural metadata (which lessons exist, their order)
* from content (what they teach), making it easy to:
* - Add new lessons by creating markdown files
* - Reorder lessons by editing this file
* - Update titles/descriptions without touching content
*/
var learningPath = {
	id: "data-literacy-foundations",
	title: "Data Literacy",
	description: "Alles Wichtige im Überblick.",
	moduleIds: [
		"foundations",
		"working-with-data",
		"data-analysis",
		"visualization",
		"data-in-practice"
	]
};
var modules = [
	{
		id: "foundations",
		title: "Data Foundations",
		description: "Vertiefen Sie Ihr Verständnis von Daten.",
		icon: "database",
		order: 1,
		lessonIds: [
			"lesson-1",
			"lesson-2",
			"lesson-3"
		],
		previewImage: intro_default
	},
	{
		id: "data-analysis",
		title: "Datenanalyse",
		description: "Daten untersuchen und auswerten.",
		icon: "chart",
		order: 2,
		lessonIds: [
			"lesson-7",
			"lesson-8",
			"lesson-9"
		],
		previewImage: void 0
	},
	{
		id: "visualization",
		title: "Data Visualisierung",
		description: "Ergebnisse visuell darstellen.",
		icon: "presentation",
		order: 3,
		lessonIds: ["lesson-10", "lesson-11"],
		previewImage: void 0
	},
	{
		id: "data-in-practice",
		title: "Data in Practice",
		description: "Datenkompetenz in der Praxis anwenden.",
		icon: "briefcase",
		order: 4,
		lessonIds: ["lesson-12", "lesson-13"],
		previewImage: void 0
	}
];
var achievements = [
	{
		id: "first-lesson",
		title: "Foundation Badge",
		description: "Foundation Lektion mit Bravur bestanden.",
		image: void 0,
		fallbackIcon: "🏅"
	},
	{
		id: "module-master",
		title: "Analysis Master",
		description: "Analyse Track erfolgreich beendet.",
		image: void 0,
		fallbackIcon: "⭐"
	},
	{
		id: "data-champion",
		title: "Data Champion",
		description: "All Module erfolgreich abgeschlossen.",
		image: void 0,
		fallbackIcon: "🏆"
	}
];
// node_modules/zustand/esm/vanilla.mjs
var createStoreImpl = (createState) => {
	let state;
	const listeners = /* @__PURE__ */ new Set();
	const setState = (partial, replace) => {
		const nextState = typeof partial === "function" ? partial(state) : partial;
		if (!Object.is(nextState, state)) {
			const previousState = state;
			state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
			listeners.forEach((listener) => listener(state, previousState));
		}
	};
	const getState = () => state;
	const getInitialState = () => initialState;
	const subscribe = (listener) => {
		listeners.add(listener);
		return () => listeners.delete(listener);
	};
	const api = {
		setState,
		getState,
		getInitialState,
		subscribe
	};
	const initialState = state = createState(setState, getState, api);
	return api;
};
var createStore = ((createState) => createState ? createStoreImpl(createState) : createStoreImpl);
// node_modules/zustand/esm/react.mjs
var React = await importShared("react");
var identity = (arg) => arg;
function useStore(api, selector = identity) {
	const slice = React.useSyncExternalStore(api.subscribe, React.useCallback(() => selector(api.getState()), [api, selector]), () => selector(api.getInitialState()));
	React.useDebugValue(slice);
	return slice;
}
var createImpl = (createState) => {
	const api = createStore(createState);
	const useBoundStore = (selector) => useStore(api, selector);
	Object.assign(useBoundStore, api);
	return useBoundStore;
};
var create$1 = ((createState) => createState ? createImpl(createState) : createImpl);
// node_modules/zustand/esm/middleware.mjs
function createJSONStorage(getStorage, options) {
	let storage;
	try {
		storage = getStorage();
	} catch (e) {
		return;
	}
	return {
		getItem: (name) => {
			var _a;
			const parse = (str2) => {
				if (str2 === null) return null;
				return JSON.parse(str2, options == null ? void 0 : options.reviver);
			};
			const str = (_a = storage.getItem(name)) != null ? _a : null;
			if (isPromiseLike(str)) return str.then(parse);
			return parse(str);
		},
		setItem: (name, newValue) => storage.setItem(name, JSON.stringify(newValue, options == null ? void 0 : options.replacer)),
		removeItem: (name) => storage.removeItem(name)
	};
}
var isPromiseLike = (value) => typeof (value == null ? void 0 : value.then) === "function";
var toSyncThenable = (value) => ({ then(onFulfilled) {
	return onFulfilled ? toThenable(onFulfilled)(value) : this;
} });
var toThenable = (fn) => (input) => {
	try {
		const result = fn(input);
		return isPromiseLike(result) ? result : toSyncThenable(result);
	} catch (error) {
		return { then(_onFulfilled, onRejected) {
			return onRejected ? toThenable(onRejected)(error) : this;
		} };
	}
};
var persistImpl = (config, baseOptions) => (set, get, api) => {
	let options = {
		storage: createJSONStorage(() => window.localStorage),
		partialize: (state) => state,
		version: 0,
		merge: (persistedState, currentState) => ({
			...currentState,
			...persistedState
		}),
		...baseOptions
	};
	let hasHydrated = false;
	let hydrationVersion = 0;
	const hydrationListeners = /* @__PURE__ */ new Set();
	const finishHydrationListeners = /* @__PURE__ */ new Set();
	let storage = options.storage;
	if (!storage) return config((...args) => {
		console.warn(`[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`);
		set(...args);
	}, get, api);
	const setItem = () => {
		const state = options.partialize({ ...get() });
		return storage.setItem(options.name, {
			state,
			version: options.version
		});
	};
	const savedSetState = api.setState;
	api.setState = (...args) => {
		savedSetState(...args);
		return setItem();
	};
	const configResult = config((...args) => {
		set(...args);
		return setItem();
	}, get, api);
	api.getInitialState = () => configResult;
	let stateFromStorage;
	const hydrate = () => {
		var _a, _b;
		if (!storage) return;
		const currentVersion = ++hydrationVersion;
		hasHydrated = false;
		hydrationListeners.forEach((cb) => {
			var _a2;
			return cb((_a2 = get()) != null ? _a2 : configResult);
		});
		const postRehydrationCallback = ((_b = options.onRehydrateStorage) == null ? void 0 : _b.call(options, (_a = get()) != null ? _a : configResult)) || void 0;
		return toThenable(storage.getItem.bind(storage))(options.name).then((deserializedStorageValue) => {
			if (deserializedStorageValue) {
				if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
					if (options.migrate) {
						const migration = options.migrate(deserializedStorageValue.state, deserializedStorageValue.version);
						if (isPromiseLike(migration)) return migration.then((result) => [true, result]);
						return [true, migration];
					}
					console.error(`State loaded from storage couldn't be migrated since no migrate function was provided`);
				} else return [false, deserializedStorageValue.state];
			}
			return [false, void 0];
		}).then((migrationResult) => {
			var _a2;
			if (currentVersion !== hydrationVersion) return;
			const [migrated, migratedState] = migrationResult;
			stateFromStorage = options.merge(migratedState, (_a2 = get()) != null ? _a2 : configResult);
			set(stateFromStorage, true);
			if (migrated) return setItem();
		}).then(() => {
			if (currentVersion !== hydrationVersion) return;
			postRehydrationCallback?.(get(), void 0);
			stateFromStorage = get();
			hasHydrated = true;
			finishHydrationListeners.forEach((cb) => cb(stateFromStorage));
		}).then(() => void 0, (e) => {
			if (currentVersion !== hydrationVersion) return;
			postRehydrationCallback?.(void 0, e);
		});
	};
	api.persist = {
		setOptions: (newOptions) => {
			options = {
				...options,
				...newOptions
			};
			if (newOptions.storage) storage = newOptions.storage;
		},
		clearStorage: () => {
			++hydrationVersion;
			storage?.removeItem(options.name);
		},
		getOptions: () => options,
		rehydrate: () => {
			try {
				return Promise.resolve(hydrate());
			} catch (error) {
				return Promise.reject(error);
			}
		},
		hasHydrated: () => hasHydrated,
		onHydrate: (cb) => {
			hydrationListeners.add(cb);
			return () => {
				hydrationListeners.delete(cb);
			};
		},
		onFinishHydration: (cb) => {
			finishHydrationListeners.add(cb);
			return () => {
				finishHydrationListeners.delete(cb);
			};
		}
	};
	if (!options.skipHydration) hydrate();
	return stateFromStorage || configResult;
};
var persist = persistImpl;
// src/stores/progressStore.ts
var initialProgress = {
	completedLessonIds: [],
	currentLessonId: "lesson-1",
	earnedAchievementIds: []
};
var useProgressStore = create$1()(persist((set) => ({
	...initialProgress,
	completeLesson: (lessonId) => set((state) => ({ completedLessonIds: [.../* @__PURE__ */ new Set([...state.completedLessonIds, lessonId])] })),
	setCurrentLesson: (lessonId) => set({ currentLessonId: lessonId }),
	resetProgress: () => set(initialProgress)
}), { name: "data-literacy-progress" }));
// node_modules/marked/lib/marked.esm.js
/**
* marked v18.2.0 - a markdown parser
* Copyright (c) 2018-2026, MarkedJS. (MIT License)
* Copyright (c) 2011-2018, Christopher Jeffrey. (MIT License)
* https://github.com/markedjs/marked
*/
/**
* DO NOT EDIT THIS FILE
* The code in this file is generated from files in ./src/
*/
function j$1() {
	return {
		async: !1,
		breaks: !1,
		extensions: null,
		gfm: !0,
		hooks: null,
		pedantic: !1,
		renderer: null,
		silent: !1,
		tokenizer: null,
		walkTokens: null
	};
}
var y$1 = j$1();
function ie$1(l) {
	y$1 = l;
}
var D$1 = { exec: () => null };
function B$1(l) {
	let e = [];
	return (t) => {
		let n = Math.max(0, Math.min(3, t - 1)), s = e[n];
		return s || (s = l(n), e[n] = s), s;
	};
}
function h$1(l, e = "") {
	let t = typeof l == "string" ? l : l.source, n = {
		replace: (s, i) => {
			let r = typeof i == "string" ? i : i.source;
			return r = r.replace(T$1.caret, "$1"), t = t.replace(s, r), n;
		},
		getRegex: () => new RegExp(t, e)
	};
	return n;
}
var we$1 = ((l = "") => {
	try {
		return !!new RegExp("(?<=1)(?<!1)" + l);
	} catch {
		return !1;
	}
})();
var T$1 = {
	codeRemoveIndent: /^(?: {0,3}\t| {1,4})/gm,
	listInterruptsParagraph: /^ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/,
	outputLinkReplace: /\\([\[\]])/g,
	indentCodeCompensation: /^(\s+)(?:```)/,
	beginningSpace: /^\s+/,
	endingHash: /#$/,
	startingSpaceChar: /^ /,
	endingSpaceChar: / $/,
	endingSpaceTabChar: /[ \t]$/,
	nonSpaceChar: /[^ ]/,
	newLineCharGlobal: /\n/g,
	tabCharGlobal: /\t/g,
	leadingSpaceTab: /^[ \t]+/,
	multipleSpaceGlobal: /\s+/g,
	blankLine: /^[ \t]*$/,
	doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
	blockquoteStart: /^ {0,3}>/,
	blockquoteSetextReplace: /\n {0,3}((?:=+|-+)[ \t]*)(?=\n|$)/g,
	blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
	blockquoteMarkerWhitespace: /^( {0,3}>)([ \t]+)/gm,
	listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
	listIsTask: /^\[[ xX]\][ \t]+\S/,
	listReplaceTask: /^\[[ xX]\][ \t]+/,
	listTaskCheckbox: /\[[ xX]\]/,
	anyLine: /\n.*\n/,
	hrefBrackets: /^<(.*)>$/,
	tableDelimiter: /[:|]/,
	tableAlignChars: /^\||\| *$/g,
	tableRowBlankLine: /\n[ \t]*$/,
	tableAlignRight: /^ *-+: *$/,
	tableAlignCenter: /^ *:-+: *$/,
	tableAlignLeft: /^ *:-+ *$/,
	startATag: /^<a /i,
	endATag: /^<\/a>/i,
	startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
	endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
	startAngleBracket: /^</,
	endAngleBracket: />$/,
	pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
	unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
	numericCharacterReference: /&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));/,
	numericCharacterReferenceOrAmpersand: /&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
	escapeTest: /[&<>"']/,
	escapeReplace: /[&<>"']/g,
	escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
	escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
	caret: /(^|[^\[])\^/g,
	percentDecode: /%25/g,
	findPipe: /\|/g,
	splitPipe: / \|/,
	slashPipe: /\\\|/g,
	carriageReturn: /\r\n|\r/g,
	spaceLine: /^ +$/gm,
	notSpaceStart: /^\S*/,
	endingNewline: /\n$/,
	listItemRegex: (l) => new RegExp(`^( {0,3}${l})((?:[	 ][^\\n]*)?(?:\\n|$))`),
	nextBulletRegex: B$1((l) => new RegExp(`^ {0,${l}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),
	hrRegex: B$1((l) => new RegExp(`^ {0,${l}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)),
	fencesBeginRegex: B$1((l) => new RegExp(`^ {0,${l}}(?:\`\`\`|~~~)`)),
	headingBeginRegex: B$1((l) => new RegExp(`^ {0,${l}}#{1,6}(?:\\s|$)`)),
	pedanticHeadingBeginRegex: B$1((l) => new RegExp(`^ {0,${l}}#`)),
	htmlBeginRegex: B$1((l) => new RegExp(`^ {0,${l}}(?:</?(?:${K$1})(?: +|$|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`, "i")),
	blockquoteBeginRegex: B$1((l) => new RegExp(`^ {0,${l}}>`)),
	nestedContainerMarkers: /^(?: {0,3}(?:(?:[*+-]|\d{1,9}[.)])[ \t]+|>[ \t]?))+/
};
var He$1 = /^(?:[ \t]*(?:\n|$))+/;
var je$1 = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
var Ge$1 = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}(?:(?=`)\1`*|(?=~)\1~*) *(?=\n|$)|$)/;
var W$1 = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
var Ne$1 = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
var ae$1 = / {0,3}(?:[*+-]|\d{1,9}[.)])/;
var Pe$1 = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |fences|blockquote|heading|hr|html|table))+?)\n {0,3}(=+|-+)[ \t]*(?:\n+|$)/;
var ye$1 = h$1(Pe$1).replace(/bull/g, ae$1).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
var Fe$1 = h$1(Pe$1).replace(/bull/g, ae$1).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
var le$1 = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/;
var Qe$1 = /^[^\n]+/;
var ue$1 = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\\n]|\n(?![ \t]*\n))+/;
var Ue$1 = h$1(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", ue$1).replace("title", /(?:"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\\n]|\n(?!\n))*'|\((?:\\[\s\S]|[^()\\])*\))/).getRegex();
var We$1 = h$1(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, ae$1).getRegex();
var K$1 = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
var pe$1 = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
var Ke$1 = h$1("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?:[ \\t]+|\\n|/?>|$)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!(?:script|pre|style|textarea)(?![a-z0-9-]))([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", pe$1).replace("tag", K$1).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
var Se$1 = (l) => h$1(le$1).replace("hr", W$1).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", l).replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", K$1).getRegex();
var Xe$1 = Se$1(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/);
var Ve$1 = Se$1(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/);
var ce$1 = {
	blockquote: h$1(/^( {0,3}> ?(?:(?![ \t]*(?:\n|$))(paragraph)|[^\n]*)(?:\n|$))+/).replace("paragraph", Ve$1).getRegex(),
	code: je$1,
	def: Ue$1,
	fences: Ge$1,
	heading: Ne$1,
	hr: W$1,
	html: Ke$1,
	lheading: ye$1,
	list: We$1,
	newline: He$1,
	paragraph: Xe$1,
	table: D$1,
	text: Qe$1
};
var Re$1 = h$1("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", W$1).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", K$1).getRegex();
var Ye$1 = {
	...ce$1,
	lheading: Fe$1,
	table: Re$1,
	paragraph: h$1(le$1).replace("hr", W$1).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Re$1).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", K$1).getRegex()
};
var et$1 = {
	...ce$1,
	html: h$1(`^ *(?:comment(?: *\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1>(?: *\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?>(?: *\\n{2,}|\\s*$))`).replace("comment", pe$1).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
	def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
	heading: /^(#{1,6})(.*)(?:\n+|$)/,
	fences: D$1,
	lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
	paragraph: h$1(le$1).replace("hr", W$1).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", ye$1).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
};
var tt$1 = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
var nt$1 = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
var _e$1 = /^( {2,}|\\)\n(?!\s*$)[ \t]*/;
var rt$1 = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
var $$1 = /[\p{P}\p{S}]/u;
var G$1 = /[\s\p{P}\p{S}]/u;
var X$1 = /[^\s\p{P}\p{S}]/u;
var st$1 = h$1(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, G$1).getRegex();
var it$1 = /[\p{Pi}\p{Ps}"']/u;
var $e$1 = /(?!~)[\p{P}\p{S}]/u;
var ot$1 = /(?!~)[\s\p{P}\p{S}]/u;
var at$1 = /(?:[^\s\p{P}\p{S}]|~)/u;
var lt$1 = h$1(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", we$1 ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex();
var Le$1 = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/;
var ut$1 = h$1(Le$1, "u").replace(/punct/g, $$1).getRegex();
var pt$1 = h$1(Le$1, "u").replace(/punct/g, $e$1).getRegex();
var ht$1 = h$1(/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/, "u").replace(/openQuote/g, it$1).replace(/punct/g, $$1).getRegex();
var Ce$1 = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
var dt$1 = h$1(Ce$1, "gu").replace(/notPunctSpace/g, X$1).replace(/punctSpace/g, G$1).replace(/punct/g, $$1).getRegex();
var gt$1 = h$1(Ce$1, "gu").replace(/notPunctSpace/g, at$1).replace(/punctSpace/g, ot$1).replace(/punct/g, $e$1).getRegex();
var ft$1 = h$1("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, X$1).replace(/punctSpace/g, G$1).replace(/punct/g, $$1).getRegex();
var mt$1 = h$1("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, X$1).replace(/punctSpace/g, G$1).replace(/punct/g, $$1).getRegex();
var bt$1 = h$1("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, X$1).replace(/punctSpace/g, G$1).replace(/punct/g, $$1).getRegex();
var Rt$1 = h$1(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, $$1).getRegex();
var Ot$1 = h$1("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, X$1).replace(/punctSpace/g, G$1).replace(/punct/g, $$1).getRegex();
var wt$1 = h$1(/\\(punct)/, "gu").replace(/punct/g, $$1).getRegex();
var Pt$1 = h$1(/(`+)(?:[^`]|[^`][\s\S]*?[^`])\1(?!`)|`+|\\(punct)/, "gu").replace(/punct/g, $$1).getRegex();
var yt$1 = h$1(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
var St$1 = h$1(pe$1).replace("(?:-->|$)", "-->").getRegex();
var _t$1 = h$1("^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", St$1).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
var Ie$1 = /\[(?:\\[\s\S]|[^\[\]\\])*\]/;
var re$1 = h$1(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace("brackets", Ie$1).getRegex();
var $t$1 = h$1(/^!?\[(label)\]\([ \t\n]*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?[ \t\n]*\)/).replace("label", re$1).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|\((?:\\[\s\S]|[^)\\])*\)/).getRegex();
var Lt$1 = h$1(/^!?\[(label)\]\[(ref)\]/).replace("label", re$1).replace("ref", ue$1).getRegex();
var Ct$1 = h$1(/^!?\[(ref)\](?:\[\])?/).replace("ref", ue$1).getRegex();
var Te$1 = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/;
var It$1 = h$1(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace("brackets", Ie$1).getRegex();
var At$1 = h$1("reflink|nolink(?!\\()", "g").replace("reflink", h$1(/^!?\[(label)\]\[(ref)\]/).replace("label", It$1).replace("ref", Te$1).getRegex()).replace("nolink", h$1(/^!?\[(ref)\](?:\[\])?/).replace("ref", Te$1).getRegex()).getRegex();
var Oe$1 = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/;
var zt$1 = h$1(/(?:mailto:email|xmpp:email(?:\/[A-Za-z0-9@.]+)?)/).replace(/email/g, /[A-Za-z0-9._+-]+@[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex();
var he$1 = {
	_backpedal: D$1,
	anyPunctuation: wt$1,
	anyPunctuationOutsideCode: Pt$1,
	autolink: yt$1,
	blockSkip: lt$1,
	br: _e$1,
	code: nt$1,
	del: D$1,
	delLDelim: D$1,
	delRDelim: D$1,
	emStrongLDelim: ut$1,
	emStrongRDelimAst: dt$1,
	emStrongRDelimUnd: mt$1,
	escape: tt$1,
	link: $t$1,
	nolink: Ct$1,
	punctuation: st$1,
	reflink: Lt$1,
	reflinkSearch: At$1,
	tag: _t$1,
	text: rt$1,
	url: D$1
};
var Mt$1 = {
	...he$1,
	emStrongLDelim: ht$1,
	emStrongRDelimAst: ft$1,
	emStrongRDelimUnd: bt$1,
	link: h$1(/^!?\[(label)\]\((.*?)\)/).replace("label", re$1).getRegex(),
	reflink: h$1(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", re$1).getRegex()
};
var oe$1 = {
	...he$1,
	emStrongRDelimAst: gt$1,
	emStrongLDelim: pt$1,
	delLDelim: Rt$1,
	delRDelim: Ot$1,
	url: h$1(/^emailProtocol|^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("emailProtocol", zt$1).replace("protocol", Oe$1).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),
	_backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
	del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,
	text: h$1(/^(?:[^a-zA-Z0-9](?=emailProtocol)|(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|wwwStart|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9](?=emailProtocol)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))))/).replace("protocol", Oe$1).replace(/emailProtocol/g, /(?:mailto|xmpp):/).replace("wwwStart", we$1 ? "(?<![^\\s*_~(])www\\." : "www\\.").getRegex()
};
var Bt$1 = {
	...oe$1,
	br: h$1(_e$1).replace("{2,}", "*").getRegex(),
	text: h$1(oe$1.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
};
var V$1 = {
	normal: ce$1,
	gfm: Ye$1,
	pedantic: et$1
};
var N$1 = {
	normal: he$1,
	gfm: oe$1,
	breaks: Bt$1,
	pedantic: Mt$1
};
var Dt$1 = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
};
var Ae$1 = (l) => Dt$1[l];
function P$1(l, e) {
	if (e) {
		if (T$1.escapeTest.test(l)) return l.replace(T$1.escapeReplace, Ae$1);
	} else if (T$1.escapeTestNoEncode.test(l)) return l.replace(T$1.escapeReplaceNoEncode, Ae$1);
	return l;
}
function Ee$1(l) {
	return T$1.numericCharacterReference.test(l) ? l.replace(T$1.numericCharacterReferenceOrAmpersand, (e, t, n) => {
		if (t === void 0 && n === void 0) return "&amp;";
		let s = t === void 0 ? Number.parseInt(n, 16) : Number.parseInt(t, 10);
		return s === 0 || s > 1114111 || s >= 55296 && s <= 57343 ? "�" : s === 38 ? "&amp;" : String.fromCodePoint(s);
	}) : l;
}
function de$1(l) {
	try {
		l = encodeURI(l).replace(T$1.percentDecode, "%");
	} catch {
		return null;
	}
	return l;
}
function ge$1(l, e) {
	let n = l.replace(T$1.findPipe, (i, r, o) => {
		let a = !1, p = r;
		for (; --p >= 0 && o[p] === "\\";) a = !a;
		return a ? "|" : " |";
	}).split(T$1.splitPipe), s = 0;
	if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), e) if (n.length > e) n.splice(e);
	else for (; n.length < e;) n.push("");
	for (; s < n.length; s++) n[s] = n[s].trim().replace(T$1.slashPipe, "|");
	return n;
}
function L$1(l, e, t) {
	let n = l.length;
	if (n === 0) return "";
	let s = 0;
	for (; s < n;) {
		let i = l.charAt(n - s - 1);
		if (i === e && !t) s++;
		else if (i !== e && t) s++;
		else break;
	}
	return l.slice(0, n - s);
}
function ke$1(l) {
	let e = l.split(`
`), t = e.length - 1;
	for (; t >= 0 && T$1.blankLine.test(e[t]);) t--;
	return e.length - t <= 2 ? l : e.slice(0, t + 1).join(`
`);
}
function Q$1(l) {
	return l.trim().replace(T$1.multipleSpaceGlobal, " ").toLowerCase().toUpperCase().toLowerCase();
}
function fe$1(l, e) {
	if (l.indexOf(e[0]) === -1 && l.indexOf(e[1]) === -1) return -1;
	let t = 0;
	for (let n = 0; n < l.length; n++) if (l[n] === "\\") n++;
	else if (l[n] === e[0]) t++;
	else if (l[n] === e[1] && (t--, t < 0)) return n;
	return t > 0 ? -2 : -1;
}
var F$1 = /* @__PURE__ */ new WeakMap();
function me$1(l) {
	let e = {
		"*": -1,
		_: -1
	}, t = -1, n = l.length;
	for (let s = 0; s < n; s++) {
		let i = l[s];
		if (i !== "*" && i !== "_" && i !== "~") continue;
		let r = s === 0 ? `
` : l[s - 1], o = s + 1;
		for (; o < n && l[o] === i;) o++;
		r !== " " && r !== "	" && r !== `
` && r !== "\r" && r !== "\f" && (i === "~" ? t = s : e[i] = s), s = o - 1;
	}
	return {
		maskedSrc: l,
		lastPossibleEmStrongCloserIndex: e,
		lastPossibleDelCloserIndex: t
	};
}
function ze$1(l, e) {
	let t = me$1(e), n = F$1.get(l);
	n ? n.push(t) : F$1.set(l, [t]);
}
function Me$1(l) {
	let e = F$1.get(l);
	e && (e.pop(), e.length === 0 && F$1.delete(l));
}
function Be$1(l, e, t) {
	let n = F$1.get(l)?.at(-1);
	return n && n.maskedSrc === e ? n.lastPossibleEmStrongCloserIndex[t] : me$1(e).lastPossibleEmStrongCloserIndex[t];
}
function De$1(l, e) {
	let t = F$1.get(l)?.at(-1);
	return t && t.maskedSrc === e ? t.lastPossibleDelCloserIndex : me$1(e).lastPossibleDelCloserIndex;
}
function J$1(l, e = 0) {
	let t = e, n = "";
	for (let s of l) if (s === "	") {
		let i = 4 - t % 4;
		n += " ".repeat(i), t += i;
	} else n += s, t++;
	return n;
}
function qe$1(l, e, t, n, s) {
	let i = e.href, r = e.title || null, o = l[1].replace(s.other.outputLinkReplace, "$1"), a = l[0].charAt(0) === "!", p = n.state.inLink, c = n.state.linkEmitted, u = n.state.inRawBlock;
	n.state.inLink = !0, n.state.linkEmitted = !1;
	let d = n.inlineTokens(o), k = n.state.linkEmitted;
	if (n.state.linkEmitted = c, n.state.inLink = p, !a) {
		if (k) {
			n.state.inRawBlock = u;
			return;
		}
		n.state.linkEmitted = !0;
	}
	return {
		type: a ? "image" : "link",
		raw: t,
		href: i,
		title: r,
		text: o,
		tokens: d
	};
}
function qt$1(l, e, t) {
	let n = l.match(t.other.indentCodeCompensation);
	if (n === null) return e;
	let s = n[1];
	return e.split(`
`).map((i) => {
		let r = i.match(t.other.beginningSpace);
		if (r === null) return i;
		let [o] = r;
		return i.slice(Math.min(o.length, s.length));
	}).join(`
`);
}
function ve$1(l, e, t, n) {
	if (!e.includes("<")) return !1;
	for (let s = 0; s < e.length; s++) {
		if (e[s] === "\\") {
			s++;
			continue;
		}
		if (e[s] === "`") {
			let o = n.inline.code.exec(e.slice(s));
			if (o) {
				s += o[0].length - 1;
				continue;
			}
		}
		if (e[s] !== "<") continue;
		let i = l.slice(t + s), r = n.inline.tag.exec(i) || n.inline.autolink.exec(i);
		if (r) {
			if (r[0].length > e.length - s) return !0;
			s += r[0].length - 1;
		}
	}
	return !1;
}
var _$1 = class {
	options;
	rules;
	lexer;
	constructor(e) {
		this.options = e || y$1;
	}
	space(e) {
		let t = this.rules.block.newline.exec(e);
		if (t && t[0].length > 0) return {
			type: "space",
			raw: t[0]
		};
	}
	code(e) {
		let t = this.rules.block.code.exec(e);
		if (t) {
			let n = this.options.pedantic ? t[0] : ke$1(t[0]);
			return {
				type: "code",
				raw: n,
				codeBlockStyle: "indented",
				text: n.replace(this.rules.other.codeRemoveIndent, "")
			};
		}
	}
	fences(e) {
		let t = this.rules.block.fences.exec(e);
		if (t) {
			let n = t[0], s = qt$1(n, t[3] || "", this.rules);
			return {
				type: "code",
				raw: n,
				lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
				text: s
			};
		}
	}
	heading(e) {
		let t = this.rules.block.heading.exec(e);
		if (t) {
			let n = t[2].trim();
			if (this.rules.other.endingHash.test(n)) {
				let s = L$1(n, "#");
				(this.options.pedantic || !s || this.rules.other.endingSpaceTabChar.test(s)) && (n = s.trim());
			}
			return {
				type: "heading",
				raw: L$1(t[0], `
`),
				depth: t[1].length,
				text: n,
				tokens: this.lexer.inline(n)
			};
		}
	}
	hr(e) {
		let t = this.rules.block.hr.exec(e);
		if (t) return {
			type: "hr",
			raw: L$1(t[0], `
`)
		};
	}
	blockquote(e) {
		let t = this.rules.block.blockquote.exec(e);
		if (t) {
			let n = L$1(t[0], `
`).split(`
`), s = "", i = "", r = [];
			for (; n.length > 0;) {
				let o = !1, a = [], p = 0;
				for (; p < n.length; p++) if (this.rules.other.blockquoteStart.test(n[p])) a.push(n[p]), o = !0;
				else if (!o) a.push(n[p]);
				else break;
				n = n.slice(p);
				let c = a.join(`
`), u = c.replace(this.rules.other.blockquoteMarkerWhitespace, (g, b, f) => b + J$1(f, b.length)).replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
				s = s ? `${s}
${c}` : c, i = i ? `${i}
${u}` : u;
				let d = this.lexer.state.top;
				if (this.lexer.state.top = !0, this.lexer.blockTokens(u, r, !0), this.lexer.state.top = d, n.length === 0) break;
				let k = r.at(-1);
				if (k?.type === "code" || k?.type === "heading" || k?.type === "hr" || k?.type === "html" || k?.type === "table") break;
				if (k?.type === "blockquote") {
					let g = k, b = n.join(`
`), f = g.raw + `
` + b.replace(this.rules.other.blockquoteSetextReplace2, ""), m = this.blockquote(f);
					r[r.length - 1] = m;
					let S = f.substring(m.raw.length).replace(/^\n/, ""), R = S ? S.split(`
`).length : 0, A = R ? n.slice(0, -R) : n;
					if (A.length > 0 && (s = `${s}
${A.join(`
`)}`), i = i.substring(0, i.length - g.text.length) + m.text, n = n.slice(A.length), n.length > 0 && this.rules.other.blockquoteStart.test(n[0])) continue;
					break;
				} else if (k?.type === "list") {
					let g = k, b = g.raw + `
` + n.join(`
`), f = this.list(b);
					r[r.length - 1] = f;
					let m = f.raw.length > g.raw.length ? b.slice(g.raw.length + 1, f.raw.length).split(`
`).length : 0;
					if (m > 0) {
						let S = n.slice(0, m).join(`
`);
						s = `${s}
${S}`, i = `${i}
${S}`;
					}
					n = n.slice(m);
					continue;
				}
			}
			return {
				type: "blockquote",
				raw: s,
				tokens: r,
				text: i
			};
		}
	}
	list(e) {
		let t = this.rules.block.list.exec(e);
		if (t) {
			if (!this.options.pedantic && this.lexer.state.lastToken?.type === "text" && !this.rules.other.listInterruptsParagraph.test(e)) return;
			let n = e, s = () => n.length - e.length, i = t[1].trim(), r = i.length > 1, o = {
				type: "list",
				raw: "",
				ordered: r,
				start: r ? +i.slice(0, -1) : "",
				loose: !1,
				items: []
			};
			i = r ? `\\d{1,9}\\${i.slice(-1)}` : `\\${i}`, this.options.pedantic && (i = r ? i : "[*+-]");
			let a = this.rules.other.listItemRegex(i), p = !1;
			for (; e;) {
				let u = !1, d = "";
				if (!(t = a.exec(e)) || this.rules.block.hr.test(e)) break;
				let k = s();
				e = e.substring(t[0].length);
				let g = t[2].split(`
`, 1)[0], b = t[1].length, f = this.options.pedantic ? J$1(g, b) : g.replace(this.rules.other.leadingSpaceTab, (v) => J$1(v, b)), m = e.split(`
`, 1)[0], S = !f.trim(), R = 0;
				if (this.options.pedantic ? (R = 2, d = f.trimStart()) : S ? R = b + 1 : (R = f.search(this.rules.other.nonSpaceChar), R = R > 4 ? 1 : R, d = f.slice(R), R += b), S && this.rules.other.blankLine.test(m) && (e = e.substring(m.length + 1), u = !0), !u) {
					let v = this.rules.other.nextBulletRegex(R), U = this.rules.other.hrRegex(R), ee = this.rules.other.fencesBeginRegex(R), te = this.options.pedantic ? this.rules.other.pedanticHeadingBeginRegex(R) : this.rules.other.headingBeginRegex(R), M = this.rules.other.htmlBeginRegex(R), ne = this.rules.other.blockquoteBeginRegex(R), Z = !1;
					for (; e;) {
						let xe = e.split(`
`, 1)[0], H;
						if (m = xe, this.options.pedantic ? (m = m.replace(this.rules.other.listReplaceNesting, "  "), H = m) : H = m.replace(this.rules.other.leadingSpaceTab, (be) => J$1(be)), ee.test(m) || te.test(m) || M.test(m) || ne.test(m) || v.test(m) || U.test(m)) break;
						if (H.search(this.rules.other.nonSpaceChar) >= R || !m.trim()) d += `
` + H.slice(R), Z = !1;
						else {
							if (S || f.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || ee.test(f) || te.test(f) || M.test(f) || U.test(f)) break;
							if (!this.options.pedantic && !Z) {
								let se = f.replace(this.rules.other.nestedContainerMarkers, "");
								if (this.rules.block.fences.test(se) || this.rules.block.heading.test(se) || this.rules.block.hr.test(se)) break;
							}
							let Ze = !this.options.pedantic && /^ {0,3}(?:=+|-+) *$/.test(m) && this.rules.block.lheading.test(`${f}
${m}`) ? `    ${H.replace(/^ {0,3}/, "")}` : m;
							d += `
` + Ze, Z = !0;
						}
						S = !m.trim(), e = e.substring(xe.length + 1), f = H.slice(R);
					}
				}
				let A = n.slice(k, s());
				o.loose || (p ? o.loose = !0 : this.rules.other.doubleBlankLine.test(A) && (p = !0)), o.items.push({
					type: "list_item",
					raw: A,
					task: !!this.options.gfm && this.rules.other.listIsTask.test(d),
					loose: !1,
					text: d,
					tokens: []
				});
			}
			let c = o.items.at(-1);
			if (c) c.raw = c.raw.trimEnd(), c.text = c.text.trimEnd();
			else return;
			o.raw = n.slice(0, s()).trimEnd();
			for (let u of o.items) if (this.lexer.state.top = !1, u.tokens = this.lexer.blockTokens(u.text, []), !o.loose) {
				let d = u.tokens.filter((g) => g.type === "space");
				o.loose = d.length > 0 && d.some((g) => this.rules.other.anyLine.test(g.raw));
			}
			for (let u of o.items) {
				let d = u.tokens[0];
				if (u.task && (d?.type === "text" || d?.type === "paragraph")) {
					u.text = u.text.replace(this.rules.other.listReplaceTask, ""), d.raw = d.raw.replace(this.rules.other.listReplaceTask, ""), d.text = d.text.replace(this.rules.other.listReplaceTask, "");
					for (let g = this.lexer.inlineQueue.length - 1; g >= 0; g--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[g].src)) {
						this.lexer.inlineQueue[g].src = this.lexer.inlineQueue[g].src.replace(this.rules.other.listReplaceTask, "");
						break;
					}
					let k = this.rules.other.listTaskCheckbox.exec(u.raw);
					if (k) {
						let g = {
							type: "checkbox",
							raw: k[0] + " ",
							checked: k[0] !== "[ ]"
						};
						u.checked = g.checked, o.loose ? u.tokens[0] && ["paragraph", "text"].includes(u.tokens[0].type) && "tokens" in u.tokens[0] && u.tokens[0].tokens ? (u.tokens[0].raw = g.raw + u.tokens[0].raw, u.tokens[0].text = g.raw + u.tokens[0].text, u.tokens[0].tokens.unshift(g)) : u.tokens.unshift({
							type: "paragraph",
							raw: g.raw,
							text: g.raw,
							tokens: [g]
						}) : u.tokens.unshift(g);
					}
				} else u.task && (u.task = !1);
			}
			if (o.loose) for (let u of o.items) {
				u.loose = !0;
				for (let d of u.tokens) d.type === "text" && (d.type = "paragraph");
			}
			return o;
		}
	}
	html(e) {
		let t = this.rules.block.html.exec(e);
		if (t) {
			let n = ke$1(t[0]);
			return {
				type: "html",
				block: !0,
				raw: n,
				pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
				text: n
			};
		}
	}
	def(e) {
		let t = this.rules.block.def.exec(e);
		if (t) {
			if (!this.rules.other.startAngleBracket.test(t[2]) && fe$1(t[2], "()") !== -1) return;
			let n = Q$1(t[1]), s = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", i = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
			return {
				type: "def",
				tag: n,
				raw: L$1(t[0], `
`),
				href: s,
				title: i
			};
		}
	}
	table(e) {
		let t = this.rules.block.table.exec(e);
		if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
		let n = ge$1(t[1]), s = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], r = {
			type: "table",
			raw: L$1(t[0], `
`),
			header: [],
			align: [],
			rows: []
		};
		if (n.length === s.length) {
			for (let o of s) this.rules.other.tableAlignRight.test(o) ? r.align.push("right") : this.rules.other.tableAlignCenter.test(o) ? r.align.push("center") : this.rules.other.tableAlignLeft.test(o) ? r.align.push("left") : r.align.push(null);
			for (let o = 0; o < n.length; o++) r.header.push({
				text: n[o],
				tokens: this.lexer.inline(n[o]),
				header: !0,
				align: r.align[o]
			});
			for (let o of i) r.rows.push(ge$1(o, r.header.length).map((a, p) => ({
				text: a,
				tokens: this.lexer.inline(a),
				header: !1,
				align: r.align[p]
			})));
			return r;
		}
	}
	lheading(e) {
		let t = this.rules.block.lheading.exec(e);
		if (t) {
			let n = t[1].trim();
			return {
				type: "heading",
				raw: L$1(t[0], `
`),
				depth: t[2].charAt(0) === "=" ? 1 : 2,
				text: n,
				tokens: this.lexer.inline(n)
			};
		}
	}
	paragraph(e) {
		let t = this.rules.block.paragraph.exec(e);
		if (t) {
			let n = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
			return {
				type: "paragraph",
				raw: t[0],
				text: n,
				tokens: this.lexer.inline(n)
			};
		}
	}
	text(e) {
		let t = this.rules.block.text.exec(e);
		if (t) return {
			type: "text",
			raw: t[0],
			text: t[0],
			tokens: this.lexer.inline(t[0])
		};
	}
	escape(e) {
		let t = this.rules.inline.escape.exec(e);
		if (t) return {
			type: "escape",
			raw: t[0],
			text: t[1]
		};
	}
	tag(e) {
		let t = this.rules.inline.tag.exec(e);
		if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
			type: "html",
			raw: t[0],
			inLink: this.lexer.state.inLink,
			inRawBlock: this.lexer.state.inRawBlock,
			block: !1,
			text: t[0]
		};
	}
	link(e) {
		if (this.lexer.state.linkParenPossible === !1) return;
		let t = this.rules.inline.link.exec(e);
		if (t) {
			let n = t[0].charAt(0) === "!" ? 2 : 1;
			if (!this.options.pedantic && ve$1(e, t[1], n, this.rules)) return;
			let s = t[2].trim();
			if (!this.options.pedantic && this.rules.other.startAngleBracket.test(s)) {
				if (!this.rules.other.endAngleBracket.test(s)) return;
				let a = L$1(s.slice(0, -1), "\\");
				if ((s.length - a.length) % 2 === 0) return;
			} else {
				let a = fe$1(t[2], "()");
				if (a === -2) return;
				if (a > -1) {
					let c = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + a;
					t[2] = t[2].substring(0, a), t[0] = t[0].substring(0, c).trim(), t[3] = "";
				}
			}
			let i = L$1(t[0].slice(0, -1), "\\");
			if ((t[0].length - i.length) % 2 === 0) return;
			let r = t[2], o = "";
			if (this.options.pedantic) {
				let a = this.rules.other.pedanticHrefTitle.exec(r);
				a && (r = a[1], o = a[3]);
			} else o = t[3] ? t[3].slice(1, -1) : "";
			return r = r.trim(), this.rules.other.startAngleBracket.test(r) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(s) ? r = r.slice(1) : r = r.slice(1, -1)), qe$1(t, {
				href: r && r.replace(this.rules.inline.anyPunctuation, "$1"),
				title: o && o.replace(this.rules.inline.anyPunctuation, "$1")
			}, t[0], this.lexer, this.rules);
		}
	}
	reflink(e, t) {
		let n;
		if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
			let s = n[0].charAt(0) === "!" ? 2 : 1;
			if (!this.options.pedantic && ve$1(e, n[1], s, this.rules)) return;
			let i = t[Q$1(n[2] || n[1])];
			if (!i) {
				let r = n[0].charAt(0);
				return {
					type: "text",
					raw: r,
					text: r
				};
			}
			return qe$1(n, i, n[0], this.lexer, this.rules);
		}
	}
	emStrong(e, t, n = "") {
		let s = this.rules.inline.emStrongLDelim.exec(e);
		if (!s || !s[1] && !s[2] && !s[3] && !s[4]) return;
		let i = s[0][0], r = n === i, o = t.length - e.length, a = o;
		for (; !this.options.pedantic && a > 0 && t[a - 1] === i;) a--;
		let p = [...t.slice(Math.max(0, a - 2), a)].at(-1) ?? "", c = p === "*" || p === "_" || !!this.rules.inline.punctuation.exec(p);
		a < o && (n = p);
		let u = a < o ? c : n === "*" || n === "_" || !!this.rules.inline.punctuation.exec(n);
		if (s[4] && n.match(this.rules.other.unicodeAlphaNumeric)) return;
		let d = s[1] || s[3] || "";
		if (!d || !n || u) {
			let k = [...s[0]].length - 1, g, b, f = k, m = 0, S = o - a + k, R = !this.options.pedantic && !!p.trim() && (!!d || i === "*" && !c);
			if (i !== "*" && i !== "_") return;
			let A = i === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd, v = Be$1(this, t, i), U = t.length - e.length + k;
			if (v < U) return;
			t = t.slice(-1 * e.length + k);
			let ee = v - U;
			for (A.lastIndex = 0; (s = A.exec(t)) !== null && !(s.index > ee);) {
				if (g = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !g) continue;
				if (b = [...g].length, s[3] || s[4]) {
					f += b;
					continue;
				} else if (s[5] || s[6] || R) {
					if (r && (s[5] || s[6])) break;
					if (S % 3 && !((S + b) % 3)) {
						m += b;
						continue;
					}
				}
				if (f -= b, f > 0) continue;
				b = Math.min(b, b + f + m);
				let te = [...s[0]][0].length, M = e.slice(0, k + s.index + te + b);
				if (Math.min(k, b) % 2) {
					let Z = M.slice(1, -1);
					return {
						type: "em",
						raw: M,
						text: Z,
						tokens: this.lexer.inlineTokens(Z)
					};
				}
				let ne = M.slice(2, -2);
				return {
					type: "strong",
					raw: M,
					text: ne,
					tokens: this.lexer.inlineTokens(ne)
				};
			}
		}
	}
	codespan(e) {
		let t = this.rules.inline.code.exec(e);
		if (t) {
			let n = t[2].replace(this.rules.other.newLineCharGlobal, " "), s = this.rules.other.nonSpaceChar.test(n), i = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
			return s && i && (n = n.substring(1, n.length - 1)), {
				type: "codespan",
				raw: t[0],
				text: n
			};
		}
	}
	br(e) {
		let t = this.rules.inline.br.exec(e);
		if (t) return {
			type: "br",
			raw: t[0]
		};
	}
	del(e, t, n = "") {
		let s = this.rules.inline.delLDelim.exec(e);
		if (!s) return;
		if (!(s[1] || "") || !n || this.rules.inline.punctuation.exec(n)) {
			let r = [...s[0]].length - 1, o, a, p = r, c = this.rules.inline.delRDelim, u = De$1(this, t), d = t.length - e.length + r;
			if (u < d) return;
			t = t.slice(-1 * e.length + r);
			let k = u - d;
			for (c.lastIndex = 0; (s = c.exec(t)) !== null && !(s.index > k);) {
				if (o = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !o || (a = [...o].length, a !== r)) continue;
				if (s[3] || s[4]) {
					p += a;
					continue;
				}
				if (p -= a, p > 0) continue;
				a = Math.min(a, a + p);
				let g = [...s[0]][0].length, b = e.slice(0, r + s.index + g + a), f = b.slice(r, -r);
				return {
					type: "del",
					raw: b,
					text: f,
					tokens: this.lexer.inlineTokens(f)
				};
			}
		}
	}
	autolink(e) {
		let t = this.rules.inline.autolink.exec(e);
		if (t) {
			let n, s;
			return t[2] === "@" ? (n = t[1], s = "mailto:" + n) : (n = t[1], s = n), {
				type: "link",
				raw: t[0],
				text: n,
				href: s,
				autolink: !0,
				tokens: [{
					type: "text",
					raw: n,
					text: n
				}]
			};
		}
	}
	url(e) {
		let t;
		if (t = this.rules.inline.url.exec(e)) {
			let n, s;
			if (t[2] === "@") n = t[0], s = "mailto:" + n;
			else {
				let i;
				do
					i = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
				while (i !== t[0]);
				n = t[0], t[1] === "www." ? s = "http://" + t[0] : s = t[0];
			}
			return {
				type: "link",
				raw: t[0],
				text: n,
				href: s,
				autolink: !0,
				tokens: [{
					type: "text",
					raw: n,
					text: n
				}]
			};
		}
	}
	inlineText(e) {
		let t = this.rules.inline.text.exec(e);
		if (t) {
			let n = this.lexer.state.inRawBlock;
			return {
				type: "text",
				raw: t[0],
				text: n ? t[0] : Ee$1(t[0]),
				escaped: n
			};
		}
	}
};
var O$1 = class l {
	tokens;
	options;
	state;
	inlineQueue;
	tokenizer;
	constructor(e) {
		this.tokens = [], this.tokens.links = Object.create(null), this.options = e || y$1, this.options.tokenizer = this.options.tokenizer || new _$1(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
			inLink: !1,
			inRawBlock: !1,
			linkEmitted: !1,
			linkParenPossible: !0,
			top: !0
		};
		let t = {
			other: T$1,
			block: V$1.normal,
			inline: N$1.normal
		};
		this.options.pedantic ? (t.block = V$1.pedantic, t.inline = N$1.pedantic) : this.options.gfm && (t.block = V$1.gfm, this.options.breaks ? t.inline = N$1.breaks : t.inline = N$1.gfm), this.tokenizer.rules = t;
	}
	static get rules() {
		return {
			block: V$1,
			inline: N$1
		};
	}
	static lex(e, t) {
		return new l(t).lex(e);
	}
	static lexInline(e, t) {
		return new l(t).inlineTokens(e);
	}
	lex(e) {
		e = e.replace(T$1.carriageReturn, `
`), this.blockTokens(e, this.tokens);
		for (let t = 0; t < this.inlineQueue.length; t++) {
			let n = this.inlineQueue[t];
			this.state.inRawBlock = !1, this.inlineTokens(n.src, n.tokens);
		}
		return this.inlineQueue = [], this.tokens;
	}
	blockTokens(e, t = [], n = !1) {
		this.tokenizer.lexer = this;
		let s = this.state.lastToken;
		this.options.pedantic && (e = e.replace(T$1.tabCharGlobal, "    ").replace(T$1.spaceLine, ""));
		let i = 1 / 0;
		for (; e;) {
			if (e.length < i) i = e.length;
			else {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
			this.state.lastToken = t.at(-1);
			let r;
			if (this.options.extensions?.block?.some((a) => (r = a.call({ lexer: this }, e, t)) ? (e = e.substring(r.raw.length), t.push(r), !0) : !1)) continue;
			if (r = this.tokenizer.space(e)) {
				e = e.substring(r.raw.length);
				let a = t.at(-1);
				r.raw.length === 1 && a !== void 0 ? a.raw += `
` : t.push(r);
				continue;
			}
			if (r = this.tokenizer.code(e)) {
				e = e.substring(r.raw.length);
				let a = t.at(-1);
				a?.type === "paragraph" || a?.type === "text" ? (a.raw += (a.raw.endsWith(`
`) ? "" : `
`) + r.raw, a.text += `
` + r.text, this.inlineQueue.at(-1).src = a.text) : t.push(r);
				continue;
			}
			if (r = this.tokenizer.fences(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.heading(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.hr(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.blockquote(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.list(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.html(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.def(e)) {
				e = e.substring(r.raw.length);
				let a = t.at(-1);
				a?.type === "paragraph" || a?.type === "text" ? (a.raw += (a.raw.endsWith(`
`) ? "" : `
`) + r.raw, a.text += `
` + r.raw, this.inlineQueue.at(-1).src = a.text) : (this.tokens.links[r.tag] || (this.tokens.links[r.tag] = {
					href: r.href,
					title: r.title
				}), t.push(r));
				continue;
			}
			if (r = this.tokenizer.table(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.lheading(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			let o = e;
			if (this.options.extensions?.startBlock) {
				let a = 1 / 0, p = e.slice(1), c;
				this.options.extensions.startBlock.forEach((u) => {
					c = u.call({ lexer: this }, p), typeof c == "number" && c >= 0 && (a = Math.min(a, c));
				}), a < 1 / 0 && a >= 0 && (o = e.substring(0, a + 1));
			}
			if (this.state.top && (r = this.tokenizer.paragraph(o))) {
				let a = t.at(-1);
				n && a?.type === "paragraph" ? (a.raw += (a.raw.endsWith(`
`) ? "" : `
`) + r.raw, a.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = a.text) : t.push(r), n = o.length !== e.length, e = e.substring(r.raw.length);
				continue;
			}
			if (r = this.tokenizer.text(e)) {
				e = e.substring(r.raw.length);
				let a = t.at(-1);
				a?.type === "text" ? (a.raw += (a.raw.endsWith(`
`) ? "" : `
`) + r.raw, a.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = a.text) : t.push(r);
				continue;
			}
			if (e) {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
		}
		return this.state.top = !0, this.state.lastToken = s, t;
	}
	inline(e, t = []) {
		return this.inlineQueue.push({
			src: e,
			tokens: t
		}), t;
	}
	linkInText(e) {
		if (!e.includes("[")) return !1;
		let t = this.tokenizer.rules.inline.link;
		for (let n of e.matchAll(this.tokenizer.rules.inline.blockSkip)) if (t.test(n[0]) && e.charAt(n.index - 1) !== "!") return !0;
		for (let n of e.matchAll(this.tokenizer.rules.inline.reflinkSearch)) {
			let s = n[0], i = s.lastIndexOf("[");
			if (!(s.charAt(0) === "!" || !Object.hasOwn(this.tokens.links, Q$1(s.slice(i + 1, -1)))) && !(i > 1 && this.linkInText(s.slice(1, i - 1)))) return !0;
		}
		return !1;
	}
	inlineTokens(e, t = []) {
		this.tokenizer.lexer = this;
		let n = this.state.linkParenPossible;
		this.state.linkParenPossible = n && e.includes(")");
		try {
			return this.#e(e, t);
		} finally {
			this.state.linkParenPossible = n;
		}
	}
	#e(e, t) {
		let n = e.includes("*") || e.includes("_") || e.includes("~") || this.options.hooks?.emStrongMask || this.tokenizer.emStrong !== _$1.prototype.emStrong || this.tokenizer.del !== _$1.prototype.del ? this.#r(e) : e;
		ze$1(this.tokenizer, n);
		try {
			return this.#t(e, n, t);
		} finally {
			Me$1(this.tokenizer);
		}
	}
	#t(e, t, n) {
		let s = !1, i = "", r = 1 / 0;
		for (; e;) {
			if (e.length < r) r = e.length;
			else {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
			s || (i = ""), s = !1;
			let o;
			if (this.options.extensions?.inline?.some((p) => (o = p.call({ lexer: this }, e, n)) ? (e = e.substring(o.raw.length), n.push(o), !0) : !1)) continue;
			if (o = this.tokenizer.escape(e)) {
				e = e.substring(o.raw.length), n.push(o);
				continue;
			}
			if (o = this.tokenizer.tag(e)) {
				e = e.substring(o.raw.length), n.push(o);
				continue;
			}
			if (o = this.tokenizer.link(e)) {
				e = e.substring(o.raw.length), n.push(o);
				continue;
			}
			if (o = this.tokenizer.reflink(e, this.tokens.links)) {
				e = e.substring(o.raw.length);
				let p = n.at(-1);
				o.type === "text" && p?.type === "text" ? (p.raw += o.raw, p.text += o.text) : n.push(o);
				continue;
			}
			if (o = this.tokenizer.emStrong(e, t, i)) {
				e = e.substring(o.raw.length), n.push(o);
				continue;
			}
			if (o = this.tokenizer.codespan(e)) {
				e = e.substring(o.raw.length), n.push(o);
				continue;
			}
			if (o = this.tokenizer.br(e)) {
				e = e.substring(o.raw.length), n.push(o);
				continue;
			}
			if (o = this.tokenizer.del(e, t, i)) {
				e = e.substring(o.raw.length), n.push(o);
				continue;
			}
			if (o = this.tokenizer.autolink(e)) {
				e = e.substring(o.raw.length), n.push(o);
				continue;
			}
			if (!this.state.inLink && (o = this.tokenizer.url(e))) {
				e = e.substring(o.raw.length), n.push(o);
				continue;
			}
			let a = e;
			if (this.options.extensions?.startInline) {
				let p = 1 / 0, c = e.slice(1), u;
				this.options.extensions.startInline.forEach((d) => {
					u = d.call({ lexer: this }, c), typeof u == "number" && u >= 0 && (p = Math.min(p, u));
				}), p < 1 / 0 && p >= 0 && (a = e.substring(0, p + 1));
			}
			if (o = this.tokenizer.inlineText(a)) {
				e = e.substring(o.raw.length), o.raw.slice(-1) !== "_" && (i = o.raw.slice(-1)), s = !0;
				let p = n.at(-1);
				p?.type === "text" ? (p.raw += o.raw, p.text += o.text) : n.push(o);
				continue;
			}
			if (e) {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
		}
		return n;
	}
	#n(e) {
		let { blockSkip: t, tag: n, autolink: s } = this.tokenizer.rules.inline, i = "", r = 0, o;
		for (t.lastIndex = 0; o = t.exec(e);) {
			let a = o.index + (o[2] ? o[2].length : 0), p = o.index + o[0].length;
			if (e.charAt(a) === "<") {
				let c = e.slice(a), u = n.exec(c) || s.exec(c);
				if (!u) {
					t.lastIndex = a + 1;
					continue;
				}
				p = a + u[0].length, t.lastIndex = p;
			}
			i += e.slice(r, a) + "[" + "a".repeat(p - a - 2) + "]", r = p;
		}
		return i + e.slice(r);
	}
	#r(e) {
		let t = e;
		if (this.tokens.links && e.includes("[")) {
			let n = this.tokenizer.rules.inline.reflinkSearch, s = (i) => {
				let r = i.lastIndexOf("[");
				if (!Object.hasOwn(this.tokens.links, Q$1(i.slice(r + 1, -1)))) return i;
				if (r > 1 && i.charAt(0) !== "!") {
					let o = i.slice(1, r - 1);
					if (this.linkInText(o)) return "[" + o.replace(n, s) + "][" + "a".repeat(i.length - r - 2) + "]";
				}
				return "[" + "a".repeat(i.length - 2) + "]";
			};
			t = t.replace(n, s);
		}
		return t = t.replace(this.tokenizer.rules.inline.anyPunctuationOutsideCode, (n, s, i) => i ? "+".repeat(n.length) : s ? s + n.slice(s.length, -s.length).replace(/`/g, "+") + s : n), t = this.#n(t), t = this.options.hooks?.emStrongMask?.call({ lexer: this }, t) ?? t, t;
	}
	infiniteLoopError(e) {
		let t = "Infinite loop on byte: " + e;
		if (this.options.silent) console.error(t);
		else throw new Error(t);
	}
};
var C$1 = class {
	options;
	parser;
	constructor(e) {
		this.options = e || y$1;
	}
	space(e) {
		return "";
	}
	code({ text: e, lang: t, escaped: n }) {
		let s = (t || "").match(T$1.notSpaceStart)?.[0], i = e ? e.replace(T$1.endingNewline, "") + `
` : "";
		return s ? "<pre><code class=\"language-" + P$1(s) + "\">" + (n ? i : P$1(i, !0)) + `</code></pre>
` : "<pre><code>" + (n ? i : P$1(i, !0)) + `</code></pre>
`;
	}
	blockquote({ tokens: e }) {
		return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
	}
	html({ text: e }) {
		return e;
	}
	def(e) {
		return "";
	}
	heading({ tokens: e, depth: t }) {
		return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
	}
	hr(e) {
		return `<hr>
`;
	}
	list(e) {
		let t = e.ordered, n = e.start, s = "";
		for (let o = 0; o < e.items.length; o++) {
			let a = e.items[o];
			s += this.listitem(a);
		}
		let i = t ? "ol" : "ul", r = t && n !== 1 ? " start=\"" + n + "\"" : "";
		return "<" + i + r + `>
` + s + "</" + i + `>
`;
	}
	listitem(e) {
		return `<li>${this.parser.parse(e.tokens)}</li>
`;
	}
	checkbox({ checked: e }) {
		return "<input " + (e ? "checked=\"\" " : "") + "disabled=\"\" type=\"checkbox\"> ";
	}
	paragraph({ tokens: e }) {
		return `<p>${this.parser.parseInline(e)}</p>
`;
	}
	table(e) {
		let t = "", n = "";
		for (let i = 0; i < e.header.length; i++) n += this.tablecell(e.header[i]);
		t += this.tablerow({ text: n });
		let s = "";
		for (let i = 0; i < e.rows.length; i++) {
			let r = e.rows[i];
			n = "";
			for (let o = 0; o < r.length; o++) n += this.tablecell(r[o]);
			s += this.tablerow({ text: n });
		}
		return s && (s = `<tbody>${s}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + s + `</table>
`;
	}
	tablerow({ text: e }) {
		return `<tr>
${e}</tr>
`;
	}
	tablecell(e) {
		let t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
		return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
	}
	strong({ tokens: e }) {
		return `<strong>${this.parser.parseInline(e)}</strong>`;
	}
	em({ tokens: e }) {
		return `<em>${this.parser.parseInline(e)}</em>`;
	}
	codespan({ text: e }) {
		return `<code>${P$1(e, !0)}</code>`;
	}
	br(e) {
		return "<br>";
	}
	del({ tokens: e }) {
		return `<del>${this.parser.parseInline(e)}</del>`;
	}
	link({ href: e, title: t, text: n, tokens: s, autolink: i }) {
		let r = i ? P$1(n, !0) : this.parser.parseInline(s), o = de$1(e);
		if (o === null) return r;
		e = P$1(o, i);
		let a = "<a href=\"" + e + "\"";
		return t && (a += " title=\"" + P$1(t) + "\""), a += ">" + r + "</a>", a;
	}
	image({ href: e, title: t, text: n, tokens: s }) {
		s && (n = this.parser.parseInline(s, this.parser.textRenderer));
		let i = de$1(e);
		if (i === null) return P$1(n);
		e = i;
		let r = `<img src="${P$1(e)}" alt="${P$1(n)}"`;
		return t && (r += ` title="${P$1(t)}"`), r += ">", r;
	}
	text(e) {
		return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : P$1(e.text);
	}
};
var E$1 = class {
	parser;
	strong({ text: e, tokens: t }) {
		return t ? this.parser.parseInline(t, this) : e;
	}
	em({ text: e, tokens: t }) {
		return t ? this.parser.parseInline(t, this) : e;
	}
	codespan({ text: e }) {
		return e;
	}
	del({ text: e, tokens: t }) {
		return t ? this.parser.parseInline(t, this) : e;
	}
	html({ text: e }) {
		return e;
	}
	text({ text: e }) {
		return e;
	}
	link({ text: e, tokens: t }) {
		return t ? this.parser.parseInline(t, this) : e;
	}
	image({ text: e, tokens: t }) {
		return t ? this.parser.parseInline(t, this) : e;
	}
	br() {
		return `
`;
	}
	checkbox({ raw: e }) {
		return e;
	}
};
var w$1 = class l {
	options;
	renderer;
	textRenderer;
	constructor(e) {
		this.options = e || y$1, this.options.renderer = this.options.renderer || new C$1(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new E$1(), this.textRenderer.parser = this;
	}
	static parse(e, t) {
		return new l(t).parse(e);
	}
	static parseInline(e, t) {
		return new l(t).parseInline(e);
	}
	parse(e) {
		this.renderer.parser = this;
		let t = "";
		for (let n = 0; n < e.length; n++) {
			let s = e[n];
			if (this.options.extensions?.renderers?.[s.type]) {
				let r = s, o = this.options.extensions.renderers[r.type].call({ parser: this }, r);
				if (o !== !1 || ![
					"space",
					"hr",
					"heading",
					"code",
					"table",
					"blockquote",
					"list",
					"checkbox",
					"html",
					"def",
					"paragraph",
					"text"
				].includes(r.type)) {
					t += o === !1 ? "" : o ?? "";
					continue;
				}
			}
			let i = s;
			switch (i.type) {
				case "space":
					t += this.renderer.space(i);
					break;
				case "hr":
					t += this.renderer.hr(i);
					break;
				case "heading":
					t += this.renderer.heading(i);
					break;
				case "code":
					t += this.renderer.code(i);
					break;
				case "table":
					t += this.renderer.table(i);
					break;
				case "blockquote":
					t += this.renderer.blockquote(i);
					break;
				case "list":
					t += this.renderer.list(i);
					break;
				case "checkbox":
					t += this.renderer.checkbox(i);
					break;
				case "html":
					t += this.renderer.html(i);
					break;
				case "def":
					t += this.renderer.def(i);
					break;
				case "paragraph":
					t += this.renderer.paragraph(i);
					break;
				case "text":
					t += this.renderer.text(i);
					break;
				default: {
					let r = "Token with \"" + i.type + "\" type was not found.";
					if (this.options.silent) return console.error(r), "";
					throw new Error(r);
				}
			}
		}
		return t;
	}
	parseInline(e, t = this.renderer) {
		this.renderer.parser = this;
		let n = "";
		for (let s = 0; s < e.length; s++) {
			let i = e[s];
			if (this.options.extensions?.renderers?.[i.type]) {
				let o = this.options.extensions.renderers[i.type].call({ parser: this }, i);
				if (o !== !1 || ![
					"escape",
					"html",
					"link",
					"image",
					"checkbox",
					"strong",
					"em",
					"codespan",
					"br",
					"del",
					"text"
				].includes(i.type)) {
					n += o === !1 ? "" : o ?? "";
					continue;
				}
			}
			let r = i;
			switch (r.type) {
				case "escape":
					n += t.text(r);
					break;
				case "html":
					n += t.html(r);
					break;
				case "link":
					n += t.link(r);
					break;
				case "image":
					n += t.image(r);
					break;
				case "checkbox":
					n += t.checkbox(r);
					break;
				case "strong":
					n += t.strong(r);
					break;
				case "em":
					n += t.em(r);
					break;
				case "codespan":
					n += t.codespan(r);
					break;
				case "br":
					n += t.br(r);
					break;
				case "del":
					n += t.del(r);
					break;
				case "text":
					n += t.text(r);
					break;
				default: {
					let o = "Token with \"" + r.type + "\" type was not found.";
					if (this.options.silent) return console.error(o), "";
					throw new Error(o);
				}
			}
		}
		return n;
	}
};
var I$1 = class {
	options;
	block;
	constructor(e) {
		this.options = e || y$1;
	}
	static passThroughHooks = /* @__PURE__ */ new Set([
		"preprocess",
		"postprocess",
		"processAllTokens",
		"emStrongMask"
	]);
	static passThroughHooksRespectAsync = /* @__PURE__ */ new Set([
		"preprocess",
		"postprocess",
		"processAllTokens"
	]);
	preprocess(e) {
		return e;
	}
	postprocess(e) {
		return e;
	}
	processAllTokens(e) {
		return e;
	}
	emStrongMask(e) {
		return e;
	}
	provideLexer(e = this.block) {
		return e ? O$1.lex : O$1.lexInline;
	}
	provideParser(e = this.block) {
		return e ? w$1.parse : w$1.parseInline;
	}
};
function z$1(l, e) {
	if (Array.isArray(e)) for (let t = 0; t < e.length; t++) l.push(e[t]);
	else l.push(e);
}
var Y$1 = class {
	defaults = j$1();
	options = this.setOptions;
	parse = this.parseMarkdown(!0);
	parseInline = this.parseMarkdown(!1);
	Parser = w$1;
	Renderer = C$1;
	TextRenderer = E$1;
	Lexer = O$1;
	Tokenizer = _$1;
	Hooks = I$1;
	constructor(...e) {
		this.use(...e);
	}
	walkTokens(e, t) {
		let n = [];
		for (let s of e) switch (z$1(n, t.call(this, s)), s.type) {
			case "table": {
				let i = s;
				for (let r of i.header) z$1(n, this.walkTokens(r.tokens, t));
				for (let r of i.rows) for (let o of r) z$1(n, this.walkTokens(o.tokens, t));
				break;
			}
			case "list": {
				let i = s;
				z$1(n, this.walkTokens(i.items, t));
				break;
			}
			default: {
				let i = s;
				this.defaults.extensions?.childTokens?.[i.type] ? this.defaults.extensions.childTokens[i.type].forEach((r) => {
					let o = i[r].flat(1 / 0);
					z$1(n, this.walkTokens(o, t));
				}) : i.tokens && z$1(n, this.walkTokens(i.tokens, t));
			}
		}
		return n;
	}
	use(...e) {
		let t = this.defaults.extensions || {
			renderers: Object.create(null),
			childTokens: Object.create(null)
		};
		return e.forEach((n) => {
			let s = { ...n };
			if (s.async = this.defaults.async || s.async || !1, n.extensions && (n.extensions.forEach((i) => {
				if (!i.name) throw new Error("extension name required");
				if ("renderer" in i) {
					let r = t.renderers[i.name];
					r ? t.renderers[i.name] = function(...o) {
						let a = i.renderer.apply(this, o);
						return a === !1 && (a = r.apply(this, o)), a;
					} : t.renderers[i.name] = i.renderer;
				}
				if ("tokenizer" in i) {
					if (!i.level || i.level !== "block" && i.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
					let r = t[i.level];
					r ? r.unshift(i.tokenizer) : t[i.level] = [i.tokenizer], i.start && (i.level === "block" ? t.startBlock ? t.startBlock.push(i.start) : t.startBlock = [i.start] : i.level === "inline" && (t.startInline ? t.startInline.push(i.start) : t.startInline = [i.start]));
				}
				"childTokens" in i && i.childTokens && (t.childTokens[i.name] = i.childTokens);
			}), s.extensions = t), n.renderer) {
				let i = this.defaults.renderer || new C$1(this.defaults);
				for (let r in n.renderer) {
					if (!(r in i)) throw new Error(`renderer '${r}' does not exist`);
					if (["options", "parser"].includes(r)) continue;
					let o = r, a = n.renderer[o], p = i[o];
					i[o] = (...c) => {
						let u = a.apply(i, c);
						return u === !1 && (u = p.apply(i, c)), u === !1 ? "" : u ?? "";
					};
				}
				s.renderer = i;
			}
			if (n.tokenizer) {
				let i = this.defaults.tokenizer || new _$1(this.defaults);
				for (let r in n.tokenizer) {
					if (!(r in i)) throw new Error(`tokenizer '${r}' does not exist`);
					if ([
						"options",
						"rules",
						"lexer"
					].includes(r)) continue;
					let o = r, a = n.tokenizer[o], p = i[o];
					i[o] = (...c) => {
						let u = a.apply(i, c);
						return u === !1 && (u = p.apply(i, c)), u;
					};
				}
				s.tokenizer = i;
			}
			if (n.hooks) {
				let i = this.defaults.hooks || new I$1();
				for (let r in n.hooks) {
					if (!(r in i)) throw new Error(`hook '${r}' does not exist`);
					if (["options", "block"].includes(r)) continue;
					let o = r, a = n.hooks[o], p = i[o];
					I$1.passThroughHooks.has(r) ? i[o] = (c) => {
						if (i.options.async && I$1.passThroughHooksRespectAsync.has(r)) return (async () => {
							let d = await a.call(i, c);
							return p.call(i, d);
						})();
						let u = a.call(i, c);
						return p.call(i, u);
					} : i[o] = (...c) => {
						if (i.options.async) return (async () => {
							let d = await a.apply(i, c);
							return d === !1 && (d = await p.apply(i, c)), d;
						})();
						let u = a.apply(i, c);
						return u === !1 && (u = p.apply(i, c)), u;
					};
				}
				s.hooks = i;
			}
			if (n.walkTokens) {
				let i = this.defaults.walkTokens, r = n.walkTokens;
				s.walkTokens = function(o) {
					let a = [];
					return z$1(a, r.call(this, o)), i && z$1(a, i.call(this, o)), a;
				};
			}
			this.defaults = {
				...this.defaults,
				...s
			};
		}), this;
	}
	setOptions(e) {
		return this.defaults = {
			...this.defaults,
			...e
		}, this;
	}
	lexer(e, t) {
		return O$1.lex(e, t ?? this.defaults);
	}
	parser(e, t) {
		return w$1.parse(e, t ?? this.defaults);
	}
	parseMarkdown(e) {
		return (n, s) => {
			let i = { ...s }, r = {
				...this.defaults,
				...i
			}, o = this.onError(!!r.silent, !!r.async);
			if (this.defaults.async === !0 && i.async === !1) return o(/* @__PURE__ */ new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
			if (typeof n > "u" || n === null) return o(/* @__PURE__ */ new Error("marked(): input parameter is undefined or null"));
			if (typeof n != "string") return o(/* @__PURE__ */ new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
			if (r.hooks && (r.hooks.options = r, r.hooks.block = e), r.async) return (async () => {
				let a = r.hooks ? await r.hooks.preprocess(n) : n, c = await (r.hooks ? await r.hooks.provideLexer(e) : e ? O$1.lex : O$1.lexInline)(a, r), u = r.hooks ? await r.hooks.processAllTokens(c) : c;
				r.walkTokens && await Promise.all(this.walkTokens(u, r.walkTokens));
				let k = await (r.hooks ? await r.hooks.provideParser(e) : e ? w$1.parse : w$1.parseInline)(u, r);
				return r.hooks ? await r.hooks.postprocess(k) : k;
			})().catch(o);
			try {
				r.hooks && (n = r.hooks.preprocess(n));
				let p = (r.hooks ? r.hooks.provideLexer(e) : e ? O$1.lex : O$1.lexInline)(n, r);
				r.hooks && (p = r.hooks.processAllTokens(p)), r.walkTokens && this.walkTokens(p, r.walkTokens);
				let u = (r.hooks ? r.hooks.provideParser(e) : e ? w$1.parse : w$1.parseInline)(p, r);
				return r.hooks && (u = r.hooks.postprocess(u)), u;
			} catch (a) {
				return o(a);
			}
		};
	}
	onError(e, t) {
		return (n) => {
			if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
				let s = "<p>An error occurred:</p><pre>" + P$1(n.message + "", !0) + "</pre>";
				return t ? Promise.resolve(s) : s;
			}
			if (t) return Promise.reject(n);
			throw n;
		};
	}
};
var q$1 = new Y$1();
function x$1(l, e) {
	return q$1.parse(l, e);
}
x$1.options = x$1.setOptions = function(l) {
	return q$1.setOptions(l), x$1.defaults = q$1.defaults, ie$1(x$1.defaults), x$1;
};
x$1.getDefaults = j$1;
x$1.defaults = y$1;
function vt$1(...l) {
	return q$1.use(...l), x$1.defaults = q$1.defaults, ie$1(x$1.defaults), x$1;
}
x$1.use = vt$1;
x$1.walkTokens = function(l, e) {
	return q$1.walkTokens(l, e);
};
x$1.parseInline = q$1.parseInline;
x$1.Parser = w$1;
x$1.parser = w$1.parse;
x$1.Renderer = C$1;
x$1.TextRenderer = E$1;
x$1.Lexer = O$1;
x$1.lexer = O$1.lex;
x$1.Tokenizer = _$1;
x$1.Hooks = I$1;
x$1.parse = x$1;
x$1.options;
x$1.setOptions;
x$1.walkTokens;
x$1.parseInline;
w$1.parse;
O$1.lex;
// node_modules/dompurify/dist/purify.es.mjs
/*! @license DOMPurify 3.4.17 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.17/LICENSE */
function _OverloadYield(e, d) {
	this.v = e, this.k = d;
}
function _arrayLikeToArray(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
function _arrayWithHoles(r) {
	if (Array.isArray(r)) return r;
}
function _iterableToArrayLimit(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r) {
			o = !0, n = r;
		} finally {
			try {
				if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _nonIterableRest() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
function _slicedToArray(r, e) {
	return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _unsupportedIterableToArray(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray(r, a);
		var t = {}.toString.call(r).slice(8, -1);
		return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
	}
}
function AsyncGenerator(e) {
	var t, n;
	function resume(t, n) {
		try {
			var r = e[t](n), o = r.value, u = o instanceof _OverloadYield;
			Promise.resolve(u ? o.v : o).then(function(n) {
				if (u) {
					var i = "return" === t && o.k ? t : "next";
					if (!o.k || n.done) return resume(i, n);
					n = e[i](n).value;
				}
				settle(!!r.done, n);
			}, function(e) {
				resume("throw", e);
			});
		} catch (e) {
			settle(2, e);
		}
	}
	function settle(e, r) {
		2 === e ? t.reject(r) : t.resolve({
			value: r,
			done: e
		}), (t = t.next) ? resume(t.key, t.arg) : n = null;
	}
	this._invoke = function(e, r) {
		return new Promise(function(o, u) {
			var i = {
				key: e,
				arg: r,
				resolve: o,
				reject: u,
				next: null
			};
			n ? n = n.next = i : (t = n = i, resume(e, r));
		});
	}, "function" != typeof e.return && (this.return = void 0);
}
AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function() {
	return this;
}, AsyncGenerator.prototype.next = function(e) {
	return this._invoke("next", e);
}, AsyncGenerator.prototype.throw = function(e) {
	return this._invoke("throw", e);
}, AsyncGenerator.prototype.return = function(e) {
	return this._invoke("return", e);
};
var entries = Object.entries;
var setPrototypeOf = Object.setPrototypeOf;
var isFrozen = Object.isFrozen;
var getPrototypeOf = Object.getPrototypeOf;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var freeze = Object.freeze;
var seal = Object.seal;
var create = Object.create;
var _ref = typeof Reflect !== "undefined" && Reflect;
var apply = _ref.apply;
var construct = _ref.construct;
if (!freeze) freeze = function freeze(x) {
	return x;
};
if (!seal) seal = function seal(x) {
	return x;
};
if (!apply) apply = function apply(func, thisArg) {
	for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];
	return func.apply(thisArg, args);
};
if (!construct) construct = function construct(Func) {
	for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
	return new Func(...args);
};
var arrayForEach = unapply(Array.prototype.forEach);
Array.prototype.indexOf;
var arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
var arrayPop = unapply(Array.prototype.pop);
var arrayPush = unapply(Array.prototype.push);
var arraySlice = unapply(Array.prototype.slice);
var arraySplice = unapply(Array.prototype.splice);
var arrayIsArray = Array.isArray;
var setCreate = unconstruct(Set);
var setAdd = unapply(Set.prototype.add);
var setHas = unapply(Set.prototype.has);
var stringToLowerCase = unapply(String.prototype.toLowerCase);
var stringToString = unapply(String.prototype.toString);
var stringMatch = unapply(String.prototype.match);
var stringReplace = unapply(String.prototype.replace);
var stringIndexOf = unapply(String.prototype.indexOf);
var stringTrim = unapply(String.prototype.trim);
var numberToString = unapply(Number.prototype.toString);
var booleanToString = unapply(Boolean.prototype.toString);
var bigintToString = typeof BigInt === "undefined" ? null : unapply(BigInt.prototype.toString);
var symbolToString = typeof Symbol === "undefined" ? null : unapply(Symbol.prototype.toString);
var objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
var objectToString = unapply(Object.prototype.toString);
var regExpTest = unapply(RegExp.prototype.test);
var typeErrorCreate = unconstruct(TypeError);
/**
* Creates a new function that calls the given function with a specified thisArg and arguments.
*
* @param func - The function to be wrapped and called.
* @returns A new function that calls the given function with a specified thisArg and arguments.
*/
function unapply(func) {
	return function(thisArg) {
		if (thisArg instanceof RegExp) thisArg.lastIndex = 0;
		for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) args[_key3 - 1] = arguments[_key3];
		return apply(func, thisArg, args);
	};
}
/**
* Creates a new function that constructs an instance of the given constructor function with the provided arguments.
*
* @param func - The constructor function to be wrapped and called.
* @returns A new function that constructs an instance of the given constructor function with the provided arguments.
*/
function unconstruct(Func) {
	return function() {
		for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) args[_key4] = arguments[_key4];
		return construct(Func, args);
	};
}
/**
* Add properties to a lookup table
*
* @param set - The set to which elements will be added.
* @param array - The array containing elements to be added to the set.
* @param transformCaseFunc - An optional function to transform the case of each element before adding to the set.
* @returns The modified set with added elements.
*/
function addToSet(set, array) {
	let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
	if (setPrototypeOf) setPrototypeOf(set, null);
	if (!arrayIsArray(array)) return set;
	let l = array.length;
	while (l--) {
		let element = array[l];
		if (typeof element === "string") {
			const lcElement = transformCaseFunc(element);
			if (lcElement !== element) {
				if (!isFrozen(array)) array[l] = lcElement;
				element = lcElement;
			}
		}
		set[element] = true;
	}
	return set;
}
/**
* Clean up an array to harden against CSPP
*
* @param array - The array to be cleaned.
* @returns The cleaned version of the array
*/
function cleanArray(array) {
	for (let index = 0; index < array.length; index++) if (!objectHasOwnProperty(array, index)) array[index] = null;
	return array;
}
/**
* Shallow clone an object
*
* @param object - The object to be cloned.
* @returns A new object that copies the original.
*/
function clone(object) {
	const newObject = create(null);
	for (const _ref2 of entries(object)) {
		var _ref3 = _slicedToArray(_ref2, 2);
		const property = _ref3[0];
		const value = _ref3[1];
		if (objectHasOwnProperty(object, property)) {
			if (arrayIsArray(value)) newObject[property] = cleanArray(value);
			else if (value && typeof value === "object" && value.constructor === Object) newObject[property] = clone(value);
			else newObject[property] = value;
		}
	}
	return newObject;
}
/**
* Convert non-node values into strings without depending on direct property access.
*
* @param value - The value to stringify.
* @returns A string representation of the provided value.
*/
function stringifyValue(value) {
	switch (typeof value) {
		case "string": return value;
		case "number": return numberToString(value);
		case "boolean": return booleanToString(value);
		case "bigint": return bigintToString ? bigintToString(value) : "0";
		case "symbol": return symbolToString ? symbolToString(value) : "Symbol()";
		case "undefined": return objectToString(value);
		case "function":
		case "object": {
			if (value === null) return objectToString(value);
			const valueAsRecord = value;
			const valueToString = lookupGetter(valueAsRecord, "toString");
			if (typeof valueToString === "function") {
				const stringified = valueToString(valueAsRecord);
				return typeof stringified === "string" ? stringified : objectToString(stringified);
			}
			return objectToString(value);
		}
		default: return objectToString(value);
	}
}
/**
* This method automatically checks if the prop is function or getter and behaves accordingly.
*
* @param object - The object to look up the getter function in its prototype chain.
* @param prop - The property name for which to find the getter function.
* @returns The getter function found in the prototype chain or a fallback function.
*/
function lookupGetter(object, prop) {
	while (object !== null) {
		const desc = getOwnPropertyDescriptor(object, prop);
		if (desc) {
			if (desc.get) return unapply(desc.get);
			if (typeof desc.value === "function") return unapply(desc.value);
		}
		object = getPrototypeOf(object);
	}
	function fallbackValue() {
		return null;
	}
	return fallbackValue;
}
/**
* Like lookupGetter, but for accessor properties only, and returns null
* instead of a null-returning fallback when no getter exists on the chain.
* Lets a caller fall back to a direct property read in environments that
* lack the getter, where a fallback returning null would be indistinguishable
* from a legitimate null value (e.g. namespaceURI of a no-namespace element).
*
* @param object - The object (usually a prototype) to start the lookup at.
* @param prop - The accessor property name.
* @returns The unapplied getter, or null if none was found.
*/
function lookupAccessor(object, prop) {
	while (object !== null) {
		const desc = getOwnPropertyDescriptor(object, prop);
		if (desc) return desc.get ? unapply(desc.get) : null;
		object = getPrototypeOf(object);
	}
	return null;
}
function isRegex(value) {
	try {
		regExpTest(value, "");
		return true;
	} catch (_unused) {
		return false;
	}
}
var html$1 = freeze([
	"a",
	"abbr",
	"acronym",
	"address",
	"area",
	"article",
	"aside",
	"audio",
	"b",
	"bdi",
	"bdo",
	"big",
	"blink",
	"blockquote",
	"body",
	"br",
	"button",
	"canvas",
	"caption",
	"center",
	"cite",
	"code",
	"col",
	"colgroup",
	"content",
	"data",
	"datalist",
	"dd",
	"decorator",
	"del",
	"details",
	"dfn",
	"dialog",
	"dir",
	"div",
	"dl",
	"dt",
	"element",
	"em",
	"fieldset",
	"figcaption",
	"figure",
	"font",
	"footer",
	"form",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"head",
	"header",
	"hgroup",
	"hr",
	"html",
	"i",
	"img",
	"input",
	"ins",
	"kbd",
	"label",
	"legend",
	"li",
	"main",
	"map",
	"mark",
	"marquee",
	"menu",
	"menuitem",
	"meter",
	"nav",
	"nobr",
	"ol",
	"optgroup",
	"option",
	"output",
	"p",
	"picture",
	"pre",
	"progress",
	"q",
	"rp",
	"rt",
	"ruby",
	"s",
	"samp",
	"search",
	"section",
	"select",
	"shadow",
	"slot",
	"small",
	"source",
	"spacer",
	"span",
	"strike",
	"strong",
	"style",
	"sub",
	"summary",
	"sup",
	"table",
	"tbody",
	"td",
	"template",
	"textarea",
	"tfoot",
	"th",
	"thead",
	"time",
	"tr",
	"track",
	"tt",
	"u",
	"ul",
	"var",
	"video",
	"wbr"
]);
var svg$1 = freeze([
	"svg",
	"a",
	"altglyph",
	"altglyphdef",
	"altglyphitem",
	"animatecolor",
	"animatemotion",
	"animatetransform",
	"circle",
	"clippath",
	"defs",
	"desc",
	"ellipse",
	"enterkeyhint",
	"exportparts",
	"filter",
	"font",
	"g",
	"glyph",
	"glyphref",
	"hkern",
	"image",
	"inputmode",
	"line",
	"lineargradient",
	"marker",
	"mask",
	"metadata",
	"mpath",
	"part",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"radialgradient",
	"rect",
	"stop",
	"style",
	"switch",
	"symbol",
	"text",
	"textpath",
	"title",
	"tref",
	"tspan",
	"view",
	"vkern"
]);
var svgFilters = freeze([
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence"
]);
var svgDisallowed = freeze([
	"animate",
	"color-profile",
	"cursor",
	"discard",
	"font-face",
	"font-face-format",
	"font-face-name",
	"font-face-src",
	"font-face-uri",
	"foreignobject",
	"hatch",
	"hatchpath",
	"mesh",
	"meshgradient",
	"meshpatch",
	"meshrow",
	"missing-glyph",
	"script",
	"set",
	"solidcolor",
	"unknown",
	"use"
]);
var mathMl$1 = freeze([
	"math",
	"menclose",
	"merror",
	"mfenced",
	"mfrac",
	"mglyph",
	"mi",
	"mlabeledtr",
	"mmultiscripts",
	"mn",
	"mo",
	"mover",
	"mpadded",
	"mphantom",
	"mroot",
	"mrow",
	"ms",
	"mspace",
	"msqrt",
	"mstyle",
	"msub",
	"msup",
	"msubsup",
	"mtable",
	"mtd",
	"mtext",
	"mtr",
	"munder",
	"munderover",
	"mprescripts"
]);
var mathMlDisallowed = freeze([
	"maction",
	"maligngroup",
	"malignmark",
	"mlongdiv",
	"mscarries",
	"mscarry",
	"msgroup",
	"mstack",
	"msline",
	"msrow",
	"semantics",
	"annotation",
	"annotation-xml",
	"mprescripts",
	"none"
]);
var text = freeze(["#text"]);
var html = freeze([
	"accept",
	"action",
	"align",
	"alt",
	"autocapitalize",
	"autocomplete",
	"autopictureinpicture",
	"autoplay",
	"background",
	"bgcolor",
	"border",
	"capture",
	"cellpadding",
	"cellspacing",
	"checked",
	"cite",
	"class",
	"clear",
	"color",
	"cols",
	"colspan",
	"command",
	"commandfor",
	"controls",
	"controlslist",
	"coords",
	"crossorigin",
	"datetime",
	"decoding",
	"default",
	"dir",
	"disabled",
	"disablepictureinpicture",
	"disableremoteplayback",
	"download",
	"draggable",
	"enctype",
	"enterkeyhint",
	"exportparts",
	"face",
	"for",
	"headers",
	"height",
	"hidden",
	"high",
	"href",
	"hreflang",
	"id",
	"inert",
	"inputmode",
	"integrity",
	"ismap",
	"kind",
	"label",
	"lang",
	"list",
	"loading",
	"loop",
	"low",
	"max",
	"maxlength",
	"media",
	"method",
	"min",
	"minlength",
	"multiple",
	"muted",
	"name",
	"nonce",
	"noshade",
	"novalidate",
	"nowrap",
	"open",
	"optimum",
	"part",
	"pattern",
	"placeholder",
	"playsinline",
	"popover",
	"popovertarget",
	"popovertargetaction",
	"poster",
	"preload",
	"pubdate",
	"radiogroup",
	"readonly",
	"rel",
	"required",
	"rev",
	"reversed",
	"role",
	"rows",
	"rowspan",
	"spellcheck",
	"scope",
	"selected",
	"shape",
	"size",
	"sizes",
	"slot",
	"span",
	"srclang",
	"start",
	"src",
	"srcset",
	"step",
	"style",
	"summary",
	"tabindex",
	"title",
	"translate",
	"type",
	"usemap",
	"valign",
	"value",
	"width",
	"wrap",
	"xmlns"
]);
var svg = freeze([
	"accent-height",
	"accumulate",
	"additive",
	"alignment-baseline",
	"amplitude",
	"ascent",
	"attributename",
	"attributetype",
	"azimuth",
	"basefrequency",
	"baseline-shift",
	"begin",
	"bias",
	"by",
	"class",
	"clip",
	"clippathunits",
	"clip-path",
	"clip-rule",
	"color",
	"color-interpolation",
	"color-interpolation-filters",
	"color-profile",
	"color-rendering",
	"cx",
	"cy",
	"d",
	"dx",
	"dy",
	"diffuseconstant",
	"direction",
	"display",
	"divisor",
	"dominant-baseline",
	"dur",
	"edgemode",
	"elevation",
	"end",
	"exponent",
	"fill",
	"fill-opacity",
	"fill-rule",
	"filter",
	"filterunits",
	"flood-color",
	"flood-opacity",
	"font-family",
	"font-size",
	"font-size-adjust",
	"font-stretch",
	"font-style",
	"font-variant",
	"font-weight",
	"fx",
	"fy",
	"g1",
	"g2",
	"glyph-name",
	"glyphref",
	"gradientunits",
	"gradienttransform",
	"height",
	"href",
	"id",
	"image-rendering",
	"in",
	"in2",
	"intercept",
	"k",
	"k1",
	"k2",
	"k3",
	"k4",
	"kerning",
	"keypoints",
	"keysplines",
	"keytimes",
	"lang",
	"lengthadjust",
	"letter-spacing",
	"kernelmatrix",
	"kernelunitlength",
	"lighting-color",
	"local",
	"marker-end",
	"marker-mid",
	"marker-start",
	"markerheight",
	"markerunits",
	"markerwidth",
	"maskcontentunits",
	"maskunits",
	"max",
	"mask",
	"mask-type",
	"media",
	"method",
	"mode",
	"min",
	"name",
	"numoctaves",
	"offset",
	"operator",
	"opacity",
	"order",
	"orient",
	"orientation",
	"origin",
	"overflow",
	"paint-order",
	"path",
	"pathlength",
	"patterncontentunits",
	"patterntransform",
	"patternunits",
	"pointer-events",
	"points",
	"preservealpha",
	"preserveaspectratio",
	"primitiveunits",
	"r",
	"rx",
	"ry",
	"radius",
	"refx",
	"refy",
	"repeatcount",
	"repeatdur",
	"restart",
	"result",
	"rotate",
	"scale",
	"seed",
	"shape-rendering",
	"slope",
	"specularconstant",
	"specularexponent",
	"spreadmethod",
	"startoffset",
	"stddeviation",
	"stitchtiles",
	"stop-color",
	"stop-opacity",
	"stroke-dasharray",
	"stroke-dashoffset",
	"stroke-linecap",
	"stroke-linejoin",
	"stroke-miterlimit",
	"stroke-opacity",
	"stroke",
	"stroke-width",
	"style",
	"surfacescale",
	"systemlanguage",
	"tabindex",
	"tablevalues",
	"targetx",
	"targety",
	"transform",
	"transform-origin",
	"text-anchor",
	"text-decoration",
	"text-orientation",
	"text-rendering",
	"textlength",
	"type",
	"u1",
	"u2",
	"unicode",
	"values",
	"vector-effect",
	"viewbox",
	"visibility",
	"version",
	"vert-adv-y",
	"vert-origin-x",
	"vert-origin-y",
	"width",
	"word-spacing",
	"wrap",
	"writing-mode",
	"xchannelselector",
	"ychannelselector",
	"x",
	"x1",
	"x2",
	"xmlns",
	"y",
	"y1",
	"y2",
	"z",
	"zoomandpan"
]);
var mathMl = freeze([
	"accent",
	"accentunder",
	"align",
	"bevelled",
	"close",
	"columnalign",
	"columnlines",
	"columnspacing",
	"columnspan",
	"denomalign",
	"depth",
	"dir",
	"display",
	"displaystyle",
	"encoding",
	"fence",
	"frame",
	"height",
	"href",
	"id",
	"largeop",
	"length",
	"linethickness",
	"lquote",
	"lspace",
	"mathbackground",
	"mathcolor",
	"mathsize",
	"mathvariant",
	"maxsize",
	"minsize",
	"movablelimits",
	"notation",
	"numalign",
	"open",
	"rowalign",
	"rowlines",
	"rowspacing",
	"rowspan",
	"rspace",
	"rquote",
	"scriptlevel",
	"scriptminsize",
	"scriptsizemultiplier",
	"selection",
	"separator",
	"separators",
	"stretchy",
	"subscriptshift",
	"supscriptshift",
	"symmetric",
	"voffset",
	"width",
	"xmlns"
]);
var xml = freeze([
	"xlink:href",
	"xml:id",
	"xlink:title",
	"xml:space",
	"xmlns:xlink"
]);
var MUSTACHE_EXPR = seal(/{{[\w\W]*|^[\w\W]*}}/g);
var ERB_EXPR = seal(/<%[\w\W]*|^[\w\W]*%>/g);
var TMPLIT_EXPR = seal(/\${[\w\W]*/g);
var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/);
var ARIA_ATTR = seal(/^aria-[\-\w]+$/);
var IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i);
var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
var ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g);
var DOCTYPE_NAME = seal(/^html$/i);
var CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
var ELEMENT_MARKUP_PROBE = seal(/<[/\w!]/g);
var COMMENT_MARKUP_PROBE = seal(/<[/\w]/g);
var FALLBACK_TAG_CLOSE = seal(/<\/no(script|embed|frames)/i);
var SELF_CLOSING_TAG = seal(/\/>/i);
var NODE_TYPE = {
	element: 1,
	attribute: 2,
	text: 3,
	cdataSection: 4,
	entityReference: 5,
	entityNode: 6,
	processingInstruction: 7,
	comment: 8,
	document: 9,
	documentType: 10,
	documentFragment: 11,
	notation: 12
};
var LITERAL_TEXT_ELEMENTS = freeze(addToSet({}, [
	"style",
	"script",
	"xmp",
	"iframe",
	"noembed",
	"noframes",
	"plaintext",
	"noscript"
]));
var getGlobal = function getGlobal() {
	return typeof window === "undefined" ? null : window;
};
/**
* Creates a no-op policy for internal use only.
* Don't export this function outside this module!
* @param trustedTypes The policy factory.
* @param purifyHostElement The Script element used to load DOMPurify (to determine policy name suffix).
* @return The policy created (or null, if Trusted Types
* are not supported or creating the policy failed).
*/
var _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, purifyHostElement) {
	if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") return null;
	let suffix = null;
	const ATTR_NAME = "data-tt-policy-suffix";
	if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) suffix = purifyHostElement.getAttribute(ATTR_NAME);
	const policyName = "dompurify" + (suffix ? "#" + suffix : "");
	try {
		return trustedTypes.createPolicy(policyName, {
			createHTML(html) {
				return html;
			},
			createScriptURL(scriptUrl) {
				return scriptUrl;
			}
		});
	} catch (_) {
		console.warn("TrustedTypes policy " + policyName + " could not be created.");
		return null;
	}
};
var _createHooksMap = function _createHooksMap() {
	return {
		afterSanitizeAttributes: [],
		afterSanitizeElements: [],
		afterSanitizeShadowDOM: [],
		beforeSanitizeAttributes: [],
		beforeSanitizeElements: [],
		beforeSanitizeShadowDOM: [],
		uponSanitizeAttribute: [],
		uponSanitizeElement: [],
		uponSanitizeShadowNode: []
	};
};
/**
* Resolve a set-valued configuration option: a fresh set built from
* cfg[key] when it is an own array property (seeded with a clone of
* options.base when given, case-normalized via options.transform),
* the fallback set otherwise.
*
* @param cfg the cloned, prototype-free configuration object
* @param key the configuration property to read
* @param fallback the set to use when the option is absent or not an array
* @param options transform and optional base set to merge into
* @returns the resolved set
*/
var _resolveSetOption = function _resolveSetOption(cfg, key, fallback, options) {
	return objectHasOwnProperty(cfg, key) && arrayIsArray(cfg[key]) ? addToSet(options.base ? clone(options.base) : {}, cfg[key], options.transform) : fallback;
};
/**
* Resolve an object-valued configuration option: a prototype-free clone
* of cfg[key] when it is an own, truthy object property, else a fresh
* fallback built by makeFallback (fresh on every parse, so a previous
* parse can never leak state into the next one).
*
* @param cfg the cloned, prototype-free configuration object
* @param key the configuration property to read
* @param makeFallback builds the fallback value when the option is absent
* @returns the resolved object
*/
var _resolveObjectOption = function _resolveObjectOption(cfg, key, makeFallback) {
	const value = objectHasOwnProperty(cfg, key) ? cfg[key] : void 0;
	return value && typeof value === "object" ? clone(value) : makeFallback();
};
function createDOMPurify() {
	let window = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
	const DOMPurify = (root) => createDOMPurify(root);
	DOMPurify.version = "3.4.17";
	DOMPurify.removed = [];
	if (!window || !window.document || window.document.nodeType !== NODE_TYPE.document || !window.Element) {
		DOMPurify.isSupported = false;
		return DOMPurify;
	}
	let document = window.document;
	const originalDocument = document;
	const currentScript = originalDocument.currentScript;
	window.DocumentFragment;
	const HTMLTemplateElement = window.HTMLTemplateElement, Node = window.Node, Element = window.Element, NodeFilter = window.NodeFilter;
	window.NamedNodeMap === void 0 && (window.NamedNodeMap || window.MozNamedAttrMap);
	window.HTMLFormElement;
	const DOMParser = window.DOMParser, trustedTypes = window.trustedTypes;
	const ElementPrototype = Element.prototype;
	const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
	const remove = lookupGetter(ElementPrototype, "remove");
	const removeAttributeNode = lookupGetter(ElementPrototype, "removeAttributeNode");
	const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
	const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
	const getParentNode = lookupGetter(ElementPrototype, "parentNode");
	const getShadowRoot = lookupGetter(ElementPrototype, "shadowRoot");
	const getAttributes = lookupGetter(ElementPrototype, "attributes");
	const getNodeType = Node && Node.prototype ? lookupGetter(Node.prototype, "nodeType") : null;
	const getNodeName = Node && Node.prototype ? lookupGetter(Node.prototype, "nodeName") : null;
	const getOwnerDocument = Node && Node.prototype ? lookupGetter(Node.prototype, "ownerDocument") : null;
	const _readNodeType = function _readNodeType(node) {
		return getNodeType ? getNodeType(node) : node.nodeType;
	};
	const _readNodeName = function _readNodeName(node) {
		return getNodeName ? getNodeName(node) : node.nodeName;
	};
	const getNamespaceURI = lookupAccessor(ElementPrototype, "namespaceURI");
	const _readNamespaceURI = function _readNamespaceURI(element) {
		return getNamespaceURI ? getNamespaceURI(element) : element.namespaceURI;
	};
	if (typeof HTMLTemplateElement === "function") {
		const template = document.createElement("template");
		if (template.content && template.content.ownerDocument) document = template.content.ownerDocument;
	}
	let trustedTypesPolicy;
	let emptyHTML = "";
	let defaultTrustedTypesPolicy;
	let defaultTrustedTypesPolicyResolved = false;
	let IN_TRUSTED_TYPES_POLICY = 0;
	const _assertNotInTrustedTypesPolicy = function _assertNotInTrustedTypesPolicy() {
		if (IN_TRUSTED_TYPES_POLICY > 0) throw typeErrorCreate("A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the \"DOMPurify and Trusted Types\" section of the README.");
	};
	const _createTrustedHTML = function _createTrustedHTML(html) {
		_assertNotInTrustedTypesPolicy();
		IN_TRUSTED_TYPES_POLICY++;
		try {
			return trustedTypesPolicy.createHTML(html);
		} finally {
			IN_TRUSTED_TYPES_POLICY--;
		}
	};
	const _createTrustedScriptURL = function _createTrustedScriptURL(scriptUrl) {
		_assertNotInTrustedTypesPolicy();
		IN_TRUSTED_TYPES_POLICY++;
		try {
			return trustedTypesPolicy.createScriptURL(scriptUrl);
		} finally {
			IN_TRUSTED_TYPES_POLICY--;
		}
	};
	const _getDefaultTrustedTypesPolicy = function _getDefaultTrustedTypesPolicy() {
		if (!defaultTrustedTypesPolicyResolved) {
			defaultTrustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
			defaultTrustedTypesPolicyResolved = true;
		}
		return defaultTrustedTypesPolicy;
	};
	const _document = document, implementation = _document.implementation, createNodeIterator = _document.createNodeIterator, createDocumentFragment = _document.createDocumentFragment, getElementsByTagName = _document.getElementsByTagName;
	const importNode = originalDocument.importNode;
	let hooks = _createHooksMap();
	/**
	* Expose whether this browser supports running the full DOMPurify.
	*/
	DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
	const MUSTACHE_EXPR$1 = MUSTACHE_EXPR, ERB_EXPR$1 = ERB_EXPR, TMPLIT_EXPR$1 = TMPLIT_EXPR, DATA_ATTR$1 = DATA_ATTR, ARIA_ATTR$1 = ARIA_ATTR, IS_SCRIPT_OR_DATA$1 = IS_SCRIPT_OR_DATA, ATTR_WHITESPACE$1 = ATTR_WHITESPACE, CUSTOM_ELEMENT$1 = CUSTOM_ELEMENT;
	let IS_ALLOWED_URI$1 = IS_ALLOWED_URI;
	/**
	* We consider the elements and attributes below to be safe. Ideally
	* don't add any new ones but feel free to remove unwanted ones.
	*/
	let ALLOWED_TAGS = null;
	const DEFAULT_ALLOWED_TAGS = addToSet({}, [
		...html$1,
		...svg$1,
		...svgFilters,
		...mathMl$1,
		...text
	]);
	let ALLOWED_ATTR = null;
	const DEFAULT_ALLOWED_ATTR = addToSet({}, [
		...html,
		...svg,
		...mathMl,
		...xml
	]);
	let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
		tagNameCheck: {
			writable: true,
			configurable: false,
			enumerable: true,
			value: null
		},
		attributeNameCheck: {
			writable: true,
			configurable: false,
			enumerable: true,
			value: null
		},
		allowCustomizedBuiltInElements: {
			writable: true,
			configurable: false,
			enumerable: true,
			value: false
		}
	}));
	let FORBID_TAGS = null;
	let FORBID_ATTR = null;
	const EXTRA_ELEMENT_HANDLING = Object.seal(create(null, {
		tagCheck: {
			writable: true,
			configurable: false,
			enumerable: true,
			value: null
		},
		attributeCheck: {
			writable: true,
			configurable: false,
			enumerable: true,
			value: null
		}
	}));
	let ALLOW_ARIA_ATTR = true;
	let ALLOW_DATA_ATTR = true;
	let ALLOW_UNKNOWN_PROTOCOLS = false;
	let ALLOW_SELF_CLOSE_IN_ATTR = true;
	let SAFE_FOR_TEMPLATES = false;
	let SAFE_FOR_XML = true;
	let WHOLE_DOCUMENT = false;
	let SET_CONFIG = false;
	let SET_CONFIG_ALLOWED_TAGS = null;
	let SET_CONFIG_ALLOWED_ATTR = null;
	let FORCE_BODY = false;
	let RETURN_DOM = false;
	let RETURN_DOM_FRAGMENT = false;
	let RETURN_TRUSTED_TYPE = false;
	let SANITIZE_DOM = true;
	let SANITIZE_NAMED_PROPS = false;
	const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
	let KEEP_CONTENT = true;
	let IN_PLACE = false;
	let IN_PLACE_VISITED = null;
	let USE_PROFILES = {};
	let FORBID_CONTENTS = null;
	const DEFAULT_FORBID_CONTENTS = addToSet({}, [
		"annotation-xml",
		"audio",
		"colgroup",
		"desc",
		"foreignobject",
		"head",
		"iframe",
		"math",
		"mi",
		"mn",
		"mo",
		"ms",
		"mtext",
		"noembed",
		"noframes",
		"noscript",
		"plaintext",
		"script",
		"selectedcontent",
		"style",
		"svg",
		"template",
		"thead",
		"title",
		"video",
		"xmp"
	]);
	let DATA_URI_TAGS = null;
	const DEFAULT_DATA_URI_TAGS = addToSet({}, [
		"audio",
		"video",
		"img",
		"source",
		"image",
		"track"
	]);
	let URI_SAFE_ATTRIBUTES = null;
	const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, [
		"alt",
		"class",
		"for",
		"id",
		"label",
		"name",
		"pattern",
		"placeholder",
		"role",
		"summary",
		"title",
		"value",
		"style",
		"xmlns"
	]);
	const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
	const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
	const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
	let NAMESPACE = HTML_NAMESPACE;
	let IS_EMPTY_INPUT = false;
	let ALLOWED_NAMESPACES = null;
	const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [
		MATHML_NAMESPACE,
		SVG_NAMESPACE,
		HTML_NAMESPACE
	], stringToString);
	const DEFAULT_MATHML_TEXT_INTEGRATION_POINTS = freeze([
		"mi",
		"mo",
		"mn",
		"ms",
		"mtext"
	]);
	let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, DEFAULT_MATHML_TEXT_INTEGRATION_POINTS);
	const DEFAULT_HTML_INTEGRATION_POINTS = freeze(["annotation-xml"]);
	let HTML_INTEGRATION_POINTS = addToSet({}, DEFAULT_HTML_INTEGRATION_POINTS);
	const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, [
		"title",
		"style",
		"font",
		"a",
		"script"
	]);
	let PARSER_MEDIA_TYPE = null;
	const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
	const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
	let transformCaseFunc = null;
	let CONFIG = null;
	const formElement = document.createElement("form");
	const isRegexOrFunction = function isRegexOrFunction(testValue) {
		return testValue instanceof RegExp || testValue instanceof Function;
	};
	/**
	* _parseConfig
	*
	* @param cfg optional config literal
	*/
	const _parseConfig = function _parseConfig() {
		let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		if (CONFIG && CONFIG === cfg) return;
		if (!cfg || typeof cfg !== "object") cfg = {};
		cfg = clone(cfg);
		PARSER_MEDIA_TYPE = SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
		transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
		ALLOWED_TAGS = _resolveSetOption(cfg, "ALLOWED_TAGS", DEFAULT_ALLOWED_TAGS, { transform: transformCaseFunc });
		ALLOWED_ATTR = _resolveSetOption(cfg, "ALLOWED_ATTR", DEFAULT_ALLOWED_ATTR, { transform: transformCaseFunc });
		ALLOWED_NAMESPACES = _resolveSetOption(cfg, "ALLOWED_NAMESPACES", DEFAULT_ALLOWED_NAMESPACES, { transform: stringToString });
		URI_SAFE_ATTRIBUTES = _resolveSetOption(cfg, "ADD_URI_SAFE_ATTR", DEFAULT_URI_SAFE_ATTRIBUTES, {
			transform: transformCaseFunc,
			base: DEFAULT_URI_SAFE_ATTRIBUTES
		});
		DATA_URI_TAGS = _resolveSetOption(cfg, "ADD_DATA_URI_TAGS", DEFAULT_DATA_URI_TAGS, {
			transform: transformCaseFunc,
			base: DEFAULT_DATA_URI_TAGS
		});
		FORBID_CONTENTS = _resolveSetOption(cfg, "FORBID_CONTENTS", DEFAULT_FORBID_CONTENTS, { transform: transformCaseFunc });
		FORBID_TAGS = _resolveSetOption(cfg, "FORBID_TAGS", clone({}), { transform: transformCaseFunc });
		FORBID_ATTR = _resolveSetOption(cfg, "FORBID_ATTR", clone({}), { transform: transformCaseFunc });
		USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES && typeof cfg.USE_PROFILES === "object" ? clone(cfg.USE_PROFILES) : cfg.USE_PROFILES : false;
		ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
		ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
		ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
		ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
		SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
		SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
		WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
		RETURN_DOM = cfg.RETURN_DOM || false;
		RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
		RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
		FORCE_BODY = cfg.FORCE_BODY || false;
		SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
		SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
		KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
		IN_PLACE = cfg.IN_PLACE || false;
		IS_ALLOWED_URI$1 = isRegex(cfg.ALLOWED_URI_REGEXP) ? cfg.ALLOWED_URI_REGEXP : IS_ALLOWED_URI;
		NAMESPACE = typeof cfg.NAMESPACE === "string" ? cfg.NAMESPACE : HTML_NAMESPACE;
		MATHML_TEXT_INTEGRATION_POINTS = _resolveObjectOption(cfg, "MATHML_TEXT_INTEGRATION_POINTS", () => addToSet({}, DEFAULT_MATHML_TEXT_INTEGRATION_POINTS));
		HTML_INTEGRATION_POINTS = _resolveObjectOption(cfg, "HTML_INTEGRATION_POINTS", () => addToSet({}, DEFAULT_HTML_INTEGRATION_POINTS));
		const customElementHandling = _resolveObjectOption(cfg, "CUSTOM_ELEMENT_HANDLING", () => create(null));
		CUSTOM_ELEMENT_HANDLING = create(null);
		if (objectHasOwnProperty(customElementHandling, "tagNameCheck") && isRegexOrFunction(customElementHandling.tagNameCheck)) CUSTOM_ELEMENT_HANDLING.tagNameCheck = customElementHandling.tagNameCheck;
		if (objectHasOwnProperty(customElementHandling, "attributeNameCheck") && isRegexOrFunction(customElementHandling.attributeNameCheck)) CUSTOM_ELEMENT_HANDLING.attributeNameCheck = customElementHandling.attributeNameCheck;
		if (objectHasOwnProperty(customElementHandling, "allowCustomizedBuiltInElements") && typeof customElementHandling.allowCustomizedBuiltInElements === "boolean") CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = customElementHandling.allowCustomizedBuiltInElements;
		seal(CUSTOM_ELEMENT_HANDLING);
		if (SAFE_FOR_TEMPLATES) ALLOW_DATA_ATTR = false;
		if (RETURN_DOM_FRAGMENT) RETURN_DOM = true;
		if (USE_PROFILES) {
			ALLOWED_TAGS = addToSet({}, text);
			ALLOWED_ATTR = create(null);
			if (USE_PROFILES.html === true) {
				addToSet(ALLOWED_TAGS, html$1);
				addToSet(ALLOWED_ATTR, html);
			}
			if (USE_PROFILES.svg === true) {
				addToSet(ALLOWED_TAGS, svg$1);
				addToSet(ALLOWED_ATTR, svg);
				addToSet(ALLOWED_ATTR, xml);
			}
			if (USE_PROFILES.svgFilters === true) {
				addToSet(ALLOWED_TAGS, svgFilters);
				addToSet(ALLOWED_ATTR, svg);
				addToSet(ALLOWED_ATTR, xml);
			}
			if (USE_PROFILES.mathMl === true) {
				addToSet(ALLOWED_TAGS, mathMl$1);
				addToSet(ALLOWED_ATTR, mathMl);
				addToSet(ALLOWED_ATTR, xml);
			}
		}
		EXTRA_ELEMENT_HANDLING.tagCheck = null;
		EXTRA_ELEMENT_HANDLING.attributeCheck = null;
		if (objectHasOwnProperty(cfg, "ADD_TAGS")) {
			if (typeof cfg.ADD_TAGS === "function") EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
			else if (arrayIsArray(cfg.ADD_TAGS)) {
				if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) ALLOWED_TAGS = clone(ALLOWED_TAGS);
				addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
			}
		}
		if (objectHasOwnProperty(cfg, "ADD_ATTR")) {
			if (typeof cfg.ADD_ATTR === "function") EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
			else if (arrayIsArray(cfg.ADD_ATTR)) {
				if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) ALLOWED_ATTR = clone(ALLOWED_ATTR);
				addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
			}
		}
		if (objectHasOwnProperty(cfg, "ADD_FORBID_CONTENTS") && arrayIsArray(cfg.ADD_FORBID_CONTENTS)) {
			if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) FORBID_CONTENTS = clone(FORBID_CONTENTS);
			addToSet(FORBID_CONTENTS, cfg.ADD_FORBID_CONTENTS, transformCaseFunc);
		}
		if (KEEP_CONTENT) ALLOWED_TAGS["#text"] = true;
		if (WHOLE_DOCUMENT) addToSet(ALLOWED_TAGS, [
			"html",
			"head",
			"body"
		]);
		if (ALLOWED_TAGS.table) {
			addToSet(ALLOWED_TAGS, ["tbody"]);
			delete FORBID_TAGS.tbody;
		}
		if (cfg.TRUSTED_TYPES_POLICY) {
			if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") throw typeErrorCreate("TRUSTED_TYPES_POLICY configuration option must provide a \"createHTML\" hook.");
			if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") throw typeErrorCreate("TRUSTED_TYPES_POLICY configuration option must provide a \"createScriptURL\" hook.");
			const previousTrustedTypesPolicy = trustedTypesPolicy;
			trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
			try {
				emptyHTML = _createTrustedHTML("");
			} catch (error) {
				trustedTypesPolicy = previousTrustedTypesPolicy;
				throw error;
			}
		} else if (cfg.TRUSTED_TYPES_POLICY === null) {
			trustedTypesPolicy = void 0;
			emptyHTML = "";
		} else {
			if (trustedTypesPolicy === void 0) trustedTypesPolicy = _getDefaultTrustedTypesPolicy();
			if (trustedTypesPolicy && typeof emptyHTML === "string") emptyHTML = _createTrustedHTML("");
		}
		if (freeze) freeze(cfg);
		CONFIG = cfg;
	};
	const ALL_SVG_TAGS = addToSet({}, [
		...svg$1,
		...svgFilters,
		...svgDisallowed
	]);
	const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
	/**
	* Namespace rules for an element in the SVG namespace.
	*
	* @param tagName the element's lowercase tag name
	* @param parent the (possibly simulated) parent node
	* @param parentTagName the parent's lowercase tag name
	* @returns true if a spec-compliant parser could produce this element
	*/
	const _checkSvgNamespace = function _checkSvgNamespace(tagName, parent, parentTagName) {
		if (parent.namespaceURI === HTML_NAMESPACE) return tagName === "svg";
		if (parent.namespaceURI === MATHML_NAMESPACE) return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
		return Boolean(ALL_SVG_TAGS[tagName]);
	};
	/**
	* Namespace rules for an element in the MathML namespace.
	*
	* @param tagName the element's lowercase tag name
	* @param parent the (possibly simulated) parent node
	* @param parentTagName the parent's lowercase tag name
	* @returns true if a spec-compliant parser could produce this element
	*/
	const _checkMathMlNamespace = function _checkMathMlNamespace(tagName, parent, parentTagName) {
		if (parent.namespaceURI === HTML_NAMESPACE) return tagName === "math";
		if (parent.namespaceURI === SVG_NAMESPACE) return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
		return Boolean(ALL_MATHML_TAGS[tagName]);
	};
	/**
	* Namespace rules for an element in the HTML namespace.
	*
	* @param tagName the element's lowercase tag name
	* @param parent the (possibly simulated) parent node
	* @param parentTagName the parent's lowercase tag name
	* @returns true if a spec-compliant parser could produce this element
	*/
	const _checkHtmlNamespace = function _checkHtmlNamespace(tagName, parent, parentTagName) {
		if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) return false;
		if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) return false;
		return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
	};
	/**
	* @param element a DOM element whose namespace is being checked
	* @returns Return false if the element has a
	*  namespace that a spec-compliant parser would never
	*  return. Return true otherwise.
	*/
	const _checkValidNamespace = function _checkValidNamespace(element) {
		const elementNamespace = _readNamespaceURI(element);
		const tagName = stringToLowerCase(_readNodeName(element));
		const parentNode = getParentNode(element);
		let parent;
		let parentTagName;
		if (parentNode && _readNodeType(parentNode) === NODE_TYPE.element) {
			parent = { namespaceURI: _readNamespaceURI(parentNode) };
			parentTagName = stringToLowerCase(_readNodeName(parentNode));
		} else {
			parent = { namespaceURI: NAMESPACE };
			parentTagName = "template";
		}
		if (!ALLOWED_NAMESPACES[elementNamespace]) return false;
		if (elementNamespace === SVG_NAMESPACE) return _checkSvgNamespace(tagName, parent, parentTagName);
		if (elementNamespace === MATHML_NAMESPACE) return _checkMathMlNamespace(tagName, parent, parentTagName);
		if (elementNamespace === HTML_NAMESPACE) return _checkHtmlNamespace(tagName, parent, parentTagName);
		if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[elementNamespace]) return true;
		return false;
	};
	/**
	* _forceRemove
	*
	* @param node a DOM node
	*/
	const _forceRemove = function _forceRemove(node) {
		arrayPush(DOMPurify.removed, { element: node });
		try {
			getParentNode(node).removeChild(node);
		} catch (_) {
			remove(node);
			if (!getParentNode(node)) throw typeErrorCreate("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
		}
	};
	/**
	* _stripAttributeNode
	*
	* Remove a single Attr node case/namespace-exactly on an attribute-teardown
	* path. Name-based removeAttribute() ASCII-lowercases its lookup key for an
	* HTML element in an HTML document and so silently misses a case-preserved
	* handler (e.g. `ONERROR` off an XML/XHTML import) - the same defect
	* _removeAttribute() was fixed for, which a name-based call would reintroduce
	* on these IN_PLACE teardown paths. Unlike _removeAttribute this does not
	* record into DOMPurify.removed: the neutralize passes intentionally do not
	* book-keep. A clobbered/detached node falls back to best-effort name-based
	* removal.
	*
	* @param element the element to strip the attribute from
	* @param attribute the Attr node to remove
	* @param name the attribute's name, for the fallback path
	*/
	const _stripAttributeNode = function _stripAttributeNode(element, attribute, name) {
		try {
			removeAttributeNode(element, attribute);
		} catch (_) {
			try {
				element.removeAttribute(name);
			} catch (_) {}
		}
	};
	/**
	* Fail-closed teardown of an in-place root: strip every disallowed attribute
	* in the subtree first, so nothing armed is left behind, then remove all
	* children and the root's own attributes.
	*
	* @param root the in-place root to empty
	*/
	const _neutralizeRoot = function _neutralizeRoot(root) {
		_neutralizeSubtree(root);
		const childNodes = getChildNodes(root);
		if (childNodes) arrayForEach(arraySlice(childNodes), (child) => {
			try {
				remove(child);
			} catch (_) {}
		});
		const attributes = _readNodeType(root) === NODE_TYPE.element ? getAttributes(root) : null;
		if (attributes) for (let i = attributes.length - 1; i >= 0; --i) {
			const attribute = attributes[i];
			const name = attribute && attribute.name;
			if (typeof name === "string") _stripAttributeNode(root, attribute, name);
		}
	};
	/**
	* Removes an attribute, preferably as its exact Attr node: name-based
	* removal lowercases the name in HTML documents and misses case-preserved
	* names, e.g. from imported XHTML.
	*
	* @param name an Attribute name
	* @param element a DOM node
	* @param attr the exact Attr node to remove, when the caller has it
	*/
	const _removeAttribute = function _removeAttribute(name, element, attr) {
		if (!attr) try {
			attr = element.getAttributeNode(name);
		} catch (_) {
			attr = null;
		}
		arrayPush(DOMPurify.removed, {
			attribute: attr || null,
			from: element
		});
		try {
			if (attr) removeAttributeNode(element, attr);
			else element.removeAttribute(name);
		} catch (_) {
			try {
				element.removeAttribute(name);
			} catch (_) {}
		}
		if (name === "is") {
			if (RETURN_DOM || RETURN_DOM_FRAGMENT) try {
				_forceRemove(element);
			} catch (_) {}
			else try {
				element.setAttribute(name, "");
			} catch (_) {}
		}
	};
	/**
	* Removes every attribute the configuration does not allow. Used to
	* neutralize nodes discarded from an in-place tree.
	*
	* @param element the element to strip
	*/
	const _stripDisallowedAttributes = function _stripDisallowedAttributes(element) {
		const attributes = getAttributes(element);
		if (!attributes) return;
		for (let i = attributes.length - 1; i >= 0; --i) {
			const attribute = attributes[i];
			const name = attribute && attribute.name;
			if (typeof name !== "string" || ALLOWED_ATTR[transformCaseFunc(name)]) continue;
			_stripAttributeNode(element, attribute, name);
		}
	};
	/**
	* Iterative depth-first walk, so deep trees cannot overflow the call stack,
	* reading through the cached getters, so clobbering cannot hide children.
	* When `visit` returns false, the node's children are skipped. With
	* `intoShadow`, open shadow roots are walked after their host's children.
	*
	* @param root where to start
	* @param visit called for every node
	* @param intoShadow whether to enter open shadow roots
	*/
	const _walkTree = function _walkTree(root, visit) {
		let intoShadow = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
		const stack = [root];
		while (stack.length > 0) {
			const node = stack.pop();
			if (visit(node) === false) continue;
			if (intoShadow && _readNodeType(node) === NODE_TYPE.element) {
				const shadowRoot = getShadowRoot(node);
				if (_isDocumentFragment(shadowRoot)) stack.push(shadowRoot);
			}
			const childNodes = getChildNodes(node);
			if (childNodes) for (let i = childNodes.length - 1; i >= 0; --i) stack.push(childNodes[i]);
		}
	};
	/**
	* Strips disallowed attributes from every element of a discarded subtree,
	* so a handler that is already queued (a loading image) cannot fire.
	*
	* @param root the root of a removed subtree
	*/
	const _neutralizeSubtree = function _neutralizeSubtree(root) {
		_walkTree(root, (node) => {
			if (_readNodeType(node) === NODE_TYPE.element) _stripDisallowedAttributes(node);
		});
	};
	/**
	* All nodes under `root`, root first, including open shadow roots. Template
	* content is not entered, it is inert.
	*
	* @param root the in-place root
	* @return the nodes
	*/
	const _collectLiveNodes = function _collectLiveNodes(root) {
		const nodes = [];
		_walkTree(root, (node) => {
			nodes.push(node);
		}, true);
		return nodes;
	};
	/**
	* Strips disallowed attributes from every element that was under the
	* in-place root when the call started and no longer is, whatever removed
	* or moved it.
	*
	* @param root the in-place root
	* @param before the root's nodes, collected before the walk
	*/
	const _neutralizeEscapedElements = function _neutralizeEscapedElements(root, before) {
		const reachable = setCreate();
		arrayForEach(_collectLiveNodes(root), (node) => {
			if (_readNodeType(node) === NODE_TYPE.element) setAdd(reachable, node);
		});
		arrayForEach(before, (node) => {
			if (_readNodeType(node) === NODE_TYPE.element && !setHas(reachable, node)) _stripDisallowedAttributes(node);
		});
	};
	/**
	* Neutralizes everything that left the in-place tree during the call: what
	* DOMPurify removed, and what hooks or custom elements removed or moved out.
	*
	* @param root the in-place root
	* @param before the root's nodes, collected before the walk
	* @return true if the root itself was removed
	*/
	const _neutralizeDiscarded = function _neutralizeDiscarded(root, before) {
		let rootRemoved = false;
		arrayForEach(DOMPurify.removed, (entry) => {
			if (entry.element) {
				rootRemoved = rootRemoved || entry.element === root;
				_neutralizeSubtree(entry.element);
			}
		});
		_neutralizeEscapedElements(root, before);
		return rootRemoved;
	};
	const MAX_UNVISITED_ROUNDS = 8;
	/**
	* The walk only moves forward, so a node moved to a position it already
	* passed is never visited. Give every original node that is still in the
	* tree but unvisited the normal treatment, hooks included. Nodes created
	* during the call are left alone. Fails closed if the tree keeps changing.
	*
	* @param root the in-place root
	* @param before the root's nodes, collected before the walk
	*/
	const _sanitizeUnvisitedNodes = function _sanitizeUnvisitedNodes(root, before) {
		const visited = IN_PLACE_VISITED;
		let original = null;
		const getOriginal = () => {
			if (!original) {
				original = setCreate();
				arrayForEach(before, (beforeNode) => {
					setAdd(original, beforeNode);
				});
			}
			return original;
		};
		for (let round = 0;; round++) {
			const live = _collectLiveNodes(root);
			const containers = [root];
			let pending = false;
			arrayForEach(live, (node) => {
				if (_readNodeType(node) === NODE_TYPE.documentFragment) arrayPush(containers, node);
				else if (!pending && !setHas(visited, node)) pending = setHas(getOriginal(), node);
			});
			if (!pending) return;
			if (round >= MAX_UNVISITED_ROUNDS) throw typeErrorCreate("the tree kept changing during in-place sanitization; refusing to return it");
			arrayForEach(containers, (container, index) => {
				_sanitizeUnvisitedIn(container, index > 0, root, getOriginal());
			});
		}
	};
	/**
	* One _sanitizeUnvisitedNodes pass over the root or an open shadow root.
	*
	* @param container the root or an open shadow root
	* @param inShadow whether container is a shadow root
	* @param root the in-place root
	* @param original the root's nodes collected before the walk, as a set
	*/
	const _sanitizeUnvisitedIn = function _sanitizeUnvisitedIn(container, inShadow, root, original) {
		const iterator = _createNodeIterator(container);
		let node;
		while (node = iterator.nextNode()) {
			if (!setHas(original, node) || setHas(IN_PLACE_VISITED, node)) continue;
			if (inShadow) _executeHooks(hooks.uponSanitizeShadowNode, node, null);
			_sanitizeElements(node, root);
			_sanitizeAttributes(node, root);
			if (_isDocumentFragment(node.content)) _sanitizeShadowDOM2(node.content);
		}
	};
	/**
	* Records that _sanitizeElements processed `node`. No-op outside IN_PLACE.
	*
	* @param node the node being processed
	*/
	const _markVisited = function _markVisited(node) {
		if (IN_PLACE_VISITED) setAdd(IN_PLACE_VISITED, node);
	};
	/**
	* Patch-linkage attributes (declarative partial updates): `patchsrc`
	* always, `for` everywhere except on <label> and <output>. Gated on
	* SAFE_FOR_XML. Shared by the IN_PLACE pre-pass and _isValidAttribute.
	*
	* @param lcName the transformCaseFunc'd attribute name
	* @param lcTag the transformCaseFunc'd tag name of the carrying element
	* @return true if the attribute is patch linkage and must be dropped
	*/
	const _isPatchLinkageAttribute = function _isPatchLinkageAttribute(lcName, lcTag) {
		if (!SAFE_FOR_XML) return false;
		if (lcName === "patchsrc") return true;
		return lcName === "for" && lcTag !== "label" && lcTag !== "output";
	};
	/**
	* IN_PLACE pre-pass: sever all patch linkage before the walk, so no patch
	* can fire mid-walk into a part of the tree the walker already passed.
	* Removes range markers (processing instructions, comments with markup)
	* and strips linkage attributes. It cannot undo a patch that already fired.
	*
	* TODO: if the shipped feature can patch through `for` on <label>/<output>,
	* drop that pair here too (see test/declarative-patch-probe.html).
	*
	* @param root the in-place root to sweep
	*/
	const _neutralizePatchLinkage = function _neutralizePatchLinkage(root) {
		if (!SAFE_FOR_XML) return;
		_walkTree(root, (node) => {
			const nodeType = _readNodeType(node);
			if (nodeType === NODE_TYPE.processingInstruction || nodeType === NODE_TYPE.comment && regExpTest(COMMENT_MARKUP_PROBE, node.data)) {
				try {
					remove(node);
				} catch (_) {}
				return false;
			}
			if (nodeType === NODE_TYPE.element) {
				const element = node;
				const lcTag = transformCaseFunc(_readNodeName(node));
				try {
					if (element.hasAttribute && element.hasAttribute("patchsrc")) element.removeAttribute("patchsrc");
					if (element.hasAttribute && element.hasAttribute("for") && _isPatchLinkageAttribute("for", lcTag)) element.removeAttribute("for");
				} catch (_) {}
			}
			return true;
		});
	};
	/**
	* _initDocument
	*
	* @param dirty - a string of dirty markup
	* @return a DOM, filled with the dirty markup
	*/
	const _initDocument = function _initDocument(dirty) {
		let doc = null;
		let leadingWhitespace = null;
		if (FORCE_BODY) dirty = "<remove></remove>" + dirty;
		else {
			const matches = stringMatch(dirty, /^[\r\n\t ]+/);
			leadingWhitespace = matches && matches[0];
		}
		if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) dirty = "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body>" + dirty + "</body></html>";
		const dirtyPayload = trustedTypesPolicy ? _createTrustedHTML(dirty) : dirty;
		if (NAMESPACE === HTML_NAMESPACE) try {
			doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
		} catch (_) {}
		if (!doc || !doc.documentElement) {
			doc = implementation.createDocument(NAMESPACE, "template", null);
			try {
				doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
			} catch (_) {}
		}
		const body = doc.body || doc.documentElement;
		if (dirty && leadingWhitespace) body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
		if (NAMESPACE === HTML_NAMESPACE) return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
		return WHOLE_DOCUMENT ? doc.documentElement : body;
	};
	/**
	* Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
	*
	* @param root The root element or node to start traversing on.
	* @return The created NodeIterator
	*/
	const _createNodeIterator = function _createNodeIterator(root) {
		const doc = getOwnerDocument ? getOwnerDocument(root) : root.ownerDocument;
		return createNodeIterator.call(doc || root, root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION, null);
	};
	/**
	* Replace template expression syntax (mustache, ERB, template
	* literal) with a space; shared by all SAFE_FOR_TEMPLATES scrub
	* sites. Order matters: mustache, then ERB, then template literal.
	*
	* @param value the string to scrub
	* @returns the scrubbed string
	*/
	const _stripTemplateExpressions = function _stripTemplateExpressions(value) {
		value = stringReplace(value, MUSTACHE_EXPR$1, " ");
		value = stringReplace(value, ERB_EXPR$1, " ");
		value = stringReplace(value, TMPLIT_EXPR$1, " ");
		return value;
	};
	/**
	* Strip template-engine expressions ({{...}}, ${...}, <%...%>) from the
	* character data of an element subtree. Used as the final safety net for
	* SAFE_FOR_TEMPLATES on every DOM-returning code path so that expressions
	* which only form after text-node normalization (e.g. fragments split across
	* stripped elements) cannot survive into a template-evaluating framework.
	*
	* Walks text/comment/CDATA/processing-instruction nodes and mutates `.data`
	* in place rather than round-tripping through innerHTML. This preserves
	* descendant node references (important for IN_PLACE callers), avoids a
	* serialize/reparse cycle, and reads literal character data — which means
	* `<%...%>` in text content matches the ERB regex against its real bytes
	* instead of the HTML-entity-escaped form innerHTML would produce.
	*
	* Attribute values are not visited here; SAFE_FOR_TEMPLATES handling for
	* attributes is performed during the per-node `_sanitizeAttributes` pass.
	*
	* @param node The root element whose character data should be scrubbed.
	*/
	const _scrubTemplateExpressions2 = function _scrubTemplateExpressions(node) {
		var _node$querySelectorAl;
		_scrubOwnCharacterData(node);
		const templates = (_node$querySelectorAl = node.querySelectorAll) === null || _node$querySelectorAl === void 0 ? void 0 : _node$querySelectorAl.call(node, "template");
		if (templates) arrayForEach(templates, (tmpl) => {
			if (_isDocumentFragment(tmpl.content)) _scrubTemplateExpressions2(tmpl.content);
		});
	};
	/**
	* _scrubOwnCharacterData
	*
	* Non-recursive core of _scrubTemplateExpressions: normalize `node` and
	* strip template expressions from its own character data only. Does not
	* enter <template>.content or attached shadow roots (NodeIterator never
	* does). Used by _sanitizeShadowDOM, where every nested template content
	* and shadow root is already walked - and therefore scrubbed - by its own
	* recursive _sanitizeShadowDOM call; recursing here as well would rescrub
	* each nested fragment once per ancestor, which is quadratic in nesting
	* depth.
	*
	* @param node The root whose own character data should be scrubbed.
	*/
	const _scrubOwnCharacterData = function _scrubOwnCharacterData(node) {
		node.normalize();
		const doc = getOwnerDocument ? getOwnerDocument(node) : node.ownerDocument;
		const walker = createNodeIterator.call(doc || node, node, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_CDATA_SECTION | NodeFilter.SHOW_PROCESSING_INSTRUCTION, null);
		let currentNode = walker.nextNode();
		while (currentNode) {
			currentNode.data = _stripTemplateExpressions(currentNode.data);
			currentNode = walker.nextNode();
		}
	};
	/**
	* _isClobbered
	*
	* Detect DOM-clobbering on HTMLFormElement nodes. Form is the only HTML
	* interface with [LegacyOverrideBuiltIns]; a descendant element with a
	* `name` attribute matching a prototype property shadows that property
	* on direct reads. We use this check at the IN_PLACE entry-point and
	* during attribute sanitization to refuse clobbered forms.
	*
	* @param element element to check for clobbering attacks
	* @return true if clobbered, false if safe
	*/
	const _isClobbered = function _isClobbered(element) {
		const realTagName = getNodeName ? getNodeName(element) : null;
		if (typeof realTagName !== "string") return false;
		if (transformCaseFunc(realTagName) !== "form") return false;
		return typeof element.nodeName !== "string" || typeof element.textContent !== "string" || typeof element.removeChild !== "function" || element.attributes !== getAttributes(element) || typeof element.removeAttribute !== "function" || typeof element.removeAttributeNode !== "function" || typeof element.getAttributeNode !== "function" || typeof element.setAttribute !== "function" || typeof element.namespaceURI !== "string" || typeof element.insertBefore !== "function" || typeof element.hasChildNodes !== "function" || element.nodeType !== getNodeType(element) || element.childNodes !== getChildNodes(element);
	};
	/**
	* Checks whether the given value is a DocumentFragment from any realm.
	*
	* The realm-independent replacement reads `nodeType` through the cached
	* Node.prototype getter and compares to the DOCUMENT_FRAGMENT_NODE
	* constant (11). nodeType is a numeric value resolved from the node's
	* internal slot, identical across realms for the same kind of node.
	*
	* @param value object to check
	* @return true if value is a DocumentFragment-shaped node from any realm
	*/
	const _isDocumentFragment = function _isDocumentFragment(value) {
		if (!getNodeType || typeof value !== "object" || value === null) return false;
		try {
			return getNodeType(value) === NODE_TYPE.documentFragment;
		} catch (_) {
			return false;
		}
	};
	/**
	* Checks whether the given object is a DOM node, including nodes that
	* originate from a different window/realm (e.g. an iframe's
	* contentDocument). The previous `value instanceof Node` check was
	* realm-bound: nodes from a different window failed it, causing
	* sanitize() to silently stringify them and reset IN_PLACE to false,
	* returning the original node unsanitized. See GHSA-4w3q-35jp-p934.
	*
	* @param value object to check whether it's a DOM node
	* @return true if value is a DOM node from any realm
	*/
	const _isNode = function _isNode(value) {
		if (!getNodeType || typeof value !== "object" || value === null) return false;
		try {
			return typeof getNodeType(value) === "number";
		} catch (_) {
			return false;
		}
	};
	function _executeHooks(hooks, currentNode, data) {
		if (hooks.length === 0) return;
		arrayForEach(hooks, (hook) => {
			hook.call(DOMPurify, currentNode, data, CONFIG);
		});
	}
	/**
	* Structural-threat checks that condemn a node regardless of the
	* allowlists: mXSS via namespace confusion, risky CSS construction,
	* processing instructions, markup-bearing comments. Pure predicate;
	* the caller removes. Check order is load-bearing.
	*
	* @param currentNode the node to inspect
	* @param tagName the node's transformCaseFunc'd tag name
	* @return true if the node must be removed
	*/
	const _isUnsafeNode = function _isUnsafeNode(currentNode, tagName) {
		if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.textContent) && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.innerHTML)) return true;
		if (SAFE_FOR_XML && LITERAL_TEXT_ELEMENTS[tagName] && _readNodeType(currentNode) === NODE_TYPE.element && _readNamespaceURI(currentNode) === HTML_NAMESPACE && (_isNode(currentNode.firstElementChild) || typeof currentNode.textContent === "string" && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.textContent))) return true;
		if (currentNode.nodeType === NODE_TYPE.processingInstruction) return true;
		if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(COMMENT_MARKUP_PROBE, currentNode.data)) return true;
		return false;
	};
	/**
	* Evaluate a CUSTOM_ELEMENT_HANDLING check (a RegExp or a predicate
	* function, per the validation in _parseConfig) against a name.
	* Additional arguments are forwarded to predicate functions - the
	* attributeNameCheck predicate receives the tag name as its second
	* argument. A null/absent check never matches.
	*
	* @param check the configured tagNameCheck / attributeNameCheck value
	* @param name the name to test
	* @param args extra arguments forwarded to a predicate function
	* @return true if the check matches the name
	*/
	const _matchesNameCheck = function _matchesNameCheck(check, name) {
		if (check instanceof RegExp) return regExpTest(check, name);
		if (check instanceof Function) {
			for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];
			return Boolean(check(name, ...args));
		}
		return false;
	};
	/**
	* Handle a node whose tag is forbidden or not allowlisted: keep
	* allowed custom elements (false return exits _sanitizeElements
	* early - the namespace and fallback-tag removal checks are
	* intentionally skipped for kept custom elements), else hoist
	* content per KEEP_CONTENT and remove.
	*
	* A kept custom element is the ONLY case in which this function
	* returns false, so the caller uses that return value to run the
	* afterSanitizeElements hook on the kept element and keep the
	* element-hook lifecycle consistent with normal allowlisted
	* elements (GHSA-c2j3-45gr-mqc4).
	*
	* @param currentNode the disallowed node
	* @param tagName the node's transformCaseFunc'd tag name
	* @return true if the node was removed, false if kept
	*/
	const _sanitizeDisallowedNode = function _sanitizeDisallowedNode(currentNode, tagName, root) {
		if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName) && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) return false;
		if (KEEP_CONTENT && !FORBID_CONTENTS[tagName] && !FORBID_CONTENTS[stringToLowerCase(tagName)]) {
			const parentNode = getParentNode(currentNode);
			const childNodes = getChildNodes(currentNode);
			if (childNodes && parentNode) {
				const childCount = childNodes.length;
				for (let i = childCount - 1; i >= 0; --i) {
					const hoisted = currentNode === root ? cloneNode(childNodes[i], true) : childNodes[i];
					parentNode.insertBefore(hoisted, getNextSibling(currentNode));
				}
			}
		}
		_forceRemove(currentNode);
		return true;
	};
	/**
	* Fork a hook-mutable allowlist off its shared binding the first time a
	* (possibly lazily-installed) uponSanitize* hook is about to see it, so the
	* hook cannot widen the per-instance default or the setConfig binding by
	* reference and leak past the call. Returns the set unchanged once it is
	* already call-local, so repeated calls across elements are idempotent.
	*
	* @param hookList the uponSanitize* hook array for this event
	* @param set the current ALLOWED_TAGS / ALLOWED_ATTR binding
	* @param defaultSet the per-instance DEFAULT_ALLOWED_* constant
	* @param setConfigSet the captured setConfig() binding, or null
	* @return a call-local clone if a hook is present and set is still shared,
	*   else set unchanged
	*/
	const _forkSharedAllowlist = function _forkSharedAllowlist(hookList, set, defaultSet, setConfigSet) {
		if (hookList.length === 0) return set;
		return set === defaultSet || set === setConfigSet ? clone(set) : set;
	};
	/**
	* A hook may have detached the node it was called for. If so, treat it as
	* removed and stop processing it; the walk root is exempt. On the IN_PLACE
	* path the detached subtree is neutralized right away.
	*
	* @param currentNode the node a hook may have detached
	* @param root the current walk root
	* @return true if the node was detached
	*/
	const _handleHookDetachedNode = function _handleHookDetachedNode(currentNode, root) {
		if (currentNode === root || getParentNode(currentNode) !== null) return false;
		if (IN_PLACE) _neutralizeSubtree(currentNode);
		return true;
	};
	/**
	* _sanitizeElements
	*
	* @protect nodeName
	* @protect textContent
	* @protect removeChild
	* @param currentNode to check for permission to exist
	* @return true if node was killed, false if left alive
	*/
	const _sanitizeElements = function _sanitizeElements(currentNode, root) {
		_markVisited(currentNode);
		_executeHooks(hooks.beforeSanitizeElements, currentNode, null);
		if (_handleHookDetachedNode(currentNode, root)) return true;
		if (_isClobbered(currentNode)) {
			_forceRemove(currentNode);
			return true;
		}
		const tagName = transformCaseFunc(_readNodeName(currentNode));
		ALLOWED_TAGS = _forkSharedAllowlist(hooks.uponSanitizeElement, ALLOWED_TAGS, DEFAULT_ALLOWED_TAGS, SET_CONFIG_ALLOWED_TAGS);
		_executeHooks(hooks.uponSanitizeElement, currentNode, {
			tagName,
			allowedTags: ALLOWED_TAGS
		});
		if (_handleHookDetachedNode(currentNode, root)) return true;
		if (_isUnsafeNode(currentNode, tagName)) {
			_forceRemove(currentNode);
			return true;
		}
		if (FORBID_TAGS[tagName] || !(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && !ALLOWED_TAGS[tagName]) {
			const removed = _sanitizeDisallowedNode(currentNode, tagName, root);
			if (removed === false) {
				_executeHooks(hooks.afterSanitizeElements, currentNode, null);
				if (_handleHookDetachedNode(currentNode, root)) return true;
			}
			return removed;
		}
		if (_readNodeType(currentNode) === NODE_TYPE.element && !_checkValidNamespace(currentNode)) {
			_forceRemove(currentNode);
			return true;
		}
		if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(FALLBACK_TAG_CLOSE, currentNode.innerHTML)) {
			_forceRemove(currentNode);
			return true;
		}
		if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
			const content = _stripTemplateExpressions(currentNode.textContent);
			if (currentNode.textContent !== content) {
				arrayPush(DOMPurify.removed, { element: currentNode.cloneNode() });
				currentNode.textContent = content;
			}
		}
		_executeHooks(hooks.afterSanitizeElements, currentNode, null);
		return _handleHookDetachedNode(currentNode, root);
	};
	/**
	* _isValidAttribute
	*
	* @param lcTag Lowercase tag name of containing element.
	* @param lcName Lowercase attribute name.
	* @param value Attribute value.
	* @return Returns true if `value` is valid, otherwise false.
	*/
	const _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
		if (FORBID_ATTR[lcName]) return false;
		if (_isPatchLinkageAttribute(lcName, lcTag)) return false;
		if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document || value in formElement)) return false;
		const nameIsPermitted = ALLOWED_ATTR[lcName] || EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag);
		if (ALLOW_DATA_ATTR && regExpTest(DATA_ATTR$1, lcName)) return true;
		if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$1, lcName)) return true;
		if (!nameIsPermitted) return _isBasicCustomElement(lcTag) && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName, lcTag) || lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value);
		if (URI_SAFE_ATTRIBUTES[lcName]) return true;
		if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE$1, ""))) return true;
		if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag]) return true;
		if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$1, stringReplace(value, ATTR_WHITESPACE$1, ""))) return true;
		return !value;
	};
	const RESERVED_CUSTOM_ELEMENT_NAMES = addToSet({}, [
		"annotation-xml",
		"color-profile",
		"font-face",
		"font-face-format",
		"font-face-name",
		"font-face-src",
		"font-face-uri",
		"missing-glyph"
	]);
	/**
	* _isBasicCustomElement
	* checks if at least one dash is included in tagName, and it's not the first char
	* for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
	*
	* @param tagName name of the tag of the node to sanitize
	* @returns Returns true if the tag name meets the basic criteria for a custom element, otherwise false.
	*/
	const _isBasicCustomElement = function _isBasicCustomElement(tagName) {
		return !RESERVED_CUSTOM_ELEMENT_NAMES[stringToLowerCase(tagName)] && regExpTest(CUSTOM_ELEMENT$1, tagName);
	};
	/**
	* Wrap an attribute value in the matching Trusted Types object when
	* the active policy requires it. Namespaced attributes pass through
	* unchanged (no TT support yet, see
	* https://bugs.chromium.org/p/chromium/issues/detail?id=1305293).
	*
	* @param lcTag lowercase tag name of the containing element
	* @param lcName lowercase attribute name
	* @param namespaceURI the attribute's namespace, if any
	* @param value the attribute value to wrap
	* @return the value, wrapped when Trusted Types demand it
	*/
	const _applyTrustedTypesToAttribute = function _applyTrustedTypesToAttribute(lcTag, lcName, namespaceURI, value) {
		if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function" && !namespaceURI) switch (trustedTypes.getAttributeType(lcTag, lcName)) {
			case "TrustedHTML": return _createTrustedHTML(value);
			case "TrustedScriptURL": return _createTrustedScriptURL(value);
		}
		return value;
	};
	/**
	* Write a modified attribute value back onto the element. On
	* success, re-probe for clobbering introduced by the new value and
	* remove the element when found; otherwise, when this writeback is the
	* recreate half of the SANITIZE_NAMED_PROPS remove-and-recreate, pop the
	* removal entry that path recorded so it does not show as removed. On
	* failure, remove the attribute instead.
	*
	* Returns true only on a clean write (the value was set and the new value
	* introduced no clobbering). The caller uses that, together with its own
	* knowledge of whether this attribute pushed a DOMPurify.removed record, to
	* decide whether to pop that record. The pop must happen ONLY for the
	* named-prop remove-and-recreate; popping on any other value change (trim,
	* template scrubbing, Trusted Types) would consume an unrelated _forceRemove
	* subtree-cleanup record and let that detached subtree keep a live event
	* handler through the IN_PLACE neutralization pass (SO-001).
	*
	* @param currentNode the element carrying the attribute
	* @param name the attribute name as present on the element
	* @param namespaceURI the attribute's namespace, if any
	* @param value the new attribute value
	* @return true if the value was written without introducing clobbering
	*/
	const _setAttributeValue = function _setAttributeValue(currentNode, name, namespaceURI, value) {
		try {
			if (namespaceURI) currentNode.setAttributeNS(namespaceURI, name, value);
			else currentNode.setAttribute(name, value);
			if (_isClobbered(currentNode)) {
				_forceRemove(currentNode);
				return false;
			}
			return true;
		} catch (_) {
			_removeAttribute(name, currentNode);
			return false;
		}
	};
	/**
	* _isUnsafeAttributeValue
	*
	* Value-based attribute checks that the attribute walk applies before any
	* hook can force-keep an attribute, shared with the public
	* isValidAttribute() so that it never approves a value sanitize() would
	* strip.
	*
	* @param name the attribute name as found on the node (case preserved)
	* @param value the attribute value
	* @returns true if the attribute must be removed because of its value
	*/
	const _isUnsafeAttributeValue = function _isUnsafeAttributeValue(name, value) {
		if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, value)) return true;
		return stringToLowerCase(name) === "attributename" && stringMatch(value, "href") !== null;
	};
	/**
	* _sanitizeAttributes
	*
	* @protect attributes
	* @protect nodeName
	* @protect removeAttribute
	* @protect setAttribute
	*
	* @param currentNode to sanitize
	* @param root the current walk root
	*/
	const _sanitizeAttributes = function _sanitizeAttributes(currentNode, root) {
		_executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
		if (_handleHookDetachedNode(currentNode, root)) return;
		const attributes = currentNode.attributes;
		if (!attributes || _isClobbered(currentNode)) return;
		ALLOWED_ATTR = _forkSharedAllowlist(hooks.uponSanitizeAttribute, ALLOWED_ATTR, DEFAULT_ALLOWED_ATTR, SET_CONFIG_ALLOWED_ATTR);
		const hookEvent = {
			attrName: "",
			attrValue: "",
			keepAttr: true,
			allowedAttributes: ALLOWED_ATTR,
			forceKeepAttr: void 0
		};
		let l = attributes.length;
		const lcTag = transformCaseFunc(currentNode.nodeName);
		while (l--) {
			const attr = attributes[l];
			const name = attr.name, namespaceURI = attr.namespaceURI, attrValue = attr.value;
			const lcName = transformCaseFunc(name);
			const initValue = attrValue;
			let value = name === "value" ? initValue : stringTrim(initValue);
			let recreatedNamedProp = false;
			hookEvent.attrName = lcName;
			hookEvent.attrValue = value;
			hookEvent.keepAttr = true;
			hookEvent.forceKeepAttr = void 0;
			_executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
			value = hookEvent.attrValue;
			if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name") && stringIndexOf(value, SANITIZE_NAMED_PROPS_PREFIX) !== 0) {
				_removeAttribute(name, currentNode, attr);
				value = SANITIZE_NAMED_PROPS_PREFIX + value;
				recreatedNamedProp = true;
			}
			if (_isUnsafeAttributeValue(name, value)) {
				_removeAttribute(name, currentNode, attr);
				continue;
			}
			if (hookEvent.forceKeepAttr) continue;
			if (!hookEvent.keepAttr) {
				_removeAttribute(name, currentNode, attr);
				continue;
			}
			if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(SELF_CLOSING_TAG, value)) {
				_removeAttribute(name, currentNode, attr);
				continue;
			}
			if (SAFE_FOR_TEMPLATES) value = _stripTemplateExpressions(value);
			if (!_isValidAttribute(lcTag, lcName, value)) {
				_removeAttribute(name, currentNode, attr);
				continue;
			}
			value = _applyTrustedTypesToAttribute(lcTag, lcName, namespaceURI, value);
			if (value !== initValue) {
				if (_setAttributeValue(currentNode, name, namespaceURI, value) && recreatedNamedProp) arrayPop(DOMPurify.removed);
			}
		}
		_executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
		_handleHookDetachedNode(currentNode, root);
	};
	/**
	* _sanitizeShadowDOM
	*
	* @param fragment to iterate over recursively
	*/
	const _sanitizeShadowDOM2 = function _sanitizeShadowDOM(fragment) {
		let shadowNode = null;
		const shadowIterator = _createNodeIterator(fragment);
		_executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
		while (shadowNode = shadowIterator.nextNode()) {
			_executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
			_sanitizeElements(shadowNode, fragment);
			_sanitizeAttributes(shadowNode, fragment);
			if (_isDocumentFragment(shadowNode.content)) _sanitizeShadowDOM2(shadowNode.content);
			if (_readNodeType(shadowNode) === NODE_TYPE.element) {
				const innerSr = getShadowRoot(shadowNode);
				if (_isDocumentFragment(innerSr)) {
					_sanitizeAttachedShadowRoots(innerSr);
					_sanitizeShadowDOM2(innerSr);
				}
			}
		}
		if (SAFE_FOR_TEMPLATES) _scrubOwnCharacterData(fragment);
		_executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
	};
	/**
	* Sanitizes every attached shadow root under `root`, since the node
	* iterator does not enter shadow trees. Needed for IN_PLACE input and for
	* DOM input whose clonable shadow roots were copied by importNode().
	*
	* @param root the subtree root to walk for attached shadow roots
	*/
	const _sanitizeAttachedShadowRoots = function _sanitizeAttachedShadowRoots(root) {
		const stack = [{
			node: root,
			shadow: null
		}];
		while (stack.length > 0) {
			const item = stack.pop();
			if (item.shadow) {
				_sanitizeShadowDOM2(item.shadow);
				continue;
			}
			const node = item.node;
			const isElement = _readNodeType(node) === NODE_TYPE.element;
			const childNodes = getChildNodes(node);
			if (childNodes) for (let i = childNodes.length - 1; i >= 0; --i) stack.push({
				node: childNodes[i],
				shadow: null
			});
			if (isElement) {
				const rootName = getNodeName ? getNodeName(node) : null;
				if (typeof rootName === "string" && transformCaseFunc(rootName) === "template") {
					const content = node.content;
					if (_isDocumentFragment(content)) stack.push({
						node: content,
						shadow: null
					});
				}
			}
			if (isElement) {
				const sr = getShadowRoot(node);
				if (_isDocumentFragment(sr)) stack.push({
					node: null,
					shadow: sr
				}, {
					node: sr,
					shadow: null
				});
			}
		}
	};
	DOMPurify.sanitize = function(dirty) {
		let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		let body = null;
		let importedNode = null;
		let currentNode = null;
		let returnNode = null;
		IS_EMPTY_INPUT = !dirty;
		if (IS_EMPTY_INPUT) dirty = "<!-->";
		if (typeof dirty !== "string" && !_isNode(dirty)) {
			dirty = stringifyValue(dirty);
			if (typeof dirty !== "string") throw typeErrorCreate("dirty is not a string, aborting");
		}
		if (!DOMPurify.isSupported) return dirty;
		if (SET_CONFIG) {
			ALLOWED_TAGS = SET_CONFIG_ALLOWED_TAGS;
			ALLOWED_ATTR = SET_CONFIG_ALLOWED_ATTR;
		} else _parseConfig(cfg);
		if (hooks.uponSanitizeElement.length > 0 || hooks.uponSanitizeAttribute.length > 0) ALLOWED_TAGS = clone(ALLOWED_TAGS);
		if (hooks.uponSanitizeAttribute.length > 0) ALLOWED_ATTR = clone(ALLOWED_ATTR);
		DOMPurify.removed = [];
		const inPlace = IN_PLACE && typeof dirty !== "string" && _isNode(dirty);
		let inPlaceNodes = [];
		const outerVisited = IN_PLACE_VISITED;
		if (inPlace) {
			_neutralizePatchLinkage(dirty);
			const nn = _readNodeName(dirty);
			if (typeof nn === "string") {
				const tagName = transformCaseFunc(nn);
				if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
					_neutralizeRoot(dirty);
					throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
				}
			}
			if (_isClobbered(dirty)) {
				_neutralizeRoot(dirty);
				throw typeErrorCreate("root node is clobbered and cannot be sanitized in-place");
			}
			inPlaceNodes = _collectLiveNodes(dirty);
			IN_PLACE_VISITED = setCreate();
		} else if (_isNode(dirty)) {
			body = _initDocument("<!---->");
			importedNode = body.ownerDocument.importNode(dirty, true);
			if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") body = importedNode;
			else if (importedNode.nodeName === "HTML") body = importedNode;
			else body.appendChild(importedNode);
			_sanitizeAttachedShadowRoots(body);
		} else {
			if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && dirty.indexOf("<") === -1) return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? _createTrustedHTML(dirty) : dirty;
			body = _initDocument(dirty);
			if (!body) return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
		}
		if (body && FORCE_BODY) _forceRemove(body.firstChild);
		const walkRoot = inPlace ? dirty : body;
		try {
			if (inPlace) _sanitizeAttachedShadowRoots(dirty);
			const nodeIterator = _createNodeIterator(walkRoot);
			while (currentNode = nodeIterator.nextNode()) {
				_sanitizeElements(currentNode, walkRoot);
				_sanitizeAttributes(currentNode, walkRoot);
				if (_isDocumentFragment(currentNode.content)) _sanitizeShadowDOM2(currentNode.content);
			}
			if (inPlace) _sanitizeUnvisitedNodes(dirty, inPlaceNodes);
		} catch (error) {
			if (inPlace) {
				_neutralizeRoot(dirty);
				_neutralizeDiscarded(dirty, inPlaceNodes);
			}
			throw error;
		} finally {
			IN_PLACE_VISITED = outerVisited;
		}
		if (inPlace) {
			if (_neutralizeDiscarded(dirty, inPlaceNodes)) throw typeErrorCreate("a node selected for removal could not be safely returned; refusing to sanitize in place");
			if (SAFE_FOR_TEMPLATES) _scrubTemplateExpressions2(dirty);
			return dirty;
		}
		if (RETURN_DOM) {
			if (SAFE_FOR_TEMPLATES) _scrubTemplateExpressions2(body);
			if (RETURN_DOM_FRAGMENT) {
				returnNode = createDocumentFragment.call(body.ownerDocument);
				while (body.firstChild) returnNode.appendChild(body.firstChild);
			} else returnNode = body;
			if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) returnNode = importNode.call(originalDocument, returnNode, true);
			return returnNode;
		}
		let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
		if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
		if (SAFE_FOR_TEMPLATES) serializedHTML = _stripTemplateExpressions(serializedHTML);
		return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? _createTrustedHTML(serializedHTML) : serializedHTML;
	};
	DOMPurify.setConfig = function() {
		let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		_parseConfig(cfg);
		SET_CONFIG = true;
		SET_CONFIG_ALLOWED_TAGS = ALLOWED_TAGS;
		SET_CONFIG_ALLOWED_ATTR = ALLOWED_ATTR;
	};
	DOMPurify.clearConfig = function() {
		CONFIG = null;
		SET_CONFIG = false;
		SET_CONFIG_ALLOWED_TAGS = null;
		SET_CONFIG_ALLOWED_ATTR = null;
		trustedTypesPolicy = defaultTrustedTypesPolicy;
		emptyHTML = "";
	};
	DOMPurify.isValidAttribute = function(tag, attr, value) {
		if (!CONFIG) _parseConfig({});
		const lcTag = transformCaseFunc(tag);
		const lcName = transformCaseFunc(attr);
		if (typeof value === "string" && (_isUnsafeAttributeValue(attr, value) || !ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(SELF_CLOSING_TAG, value))) return false;
		return _isValidAttribute(lcTag, lcName, value);
	};
	DOMPurify.addHook = function(entryPoint, hookFunction) {
		if (typeof hookFunction !== "function") return;
		if (!objectHasOwnProperty(hooks, entryPoint)) return;
		arrayPush(hooks[entryPoint], hookFunction);
	};
	DOMPurify.removeHook = function(entryPoint, hookFunction) {
		if (!objectHasOwnProperty(hooks, entryPoint)) return;
		if (hookFunction !== void 0) {
			const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
			return index === -1 ? void 0 : arraySplice(hooks[entryPoint], index, 1)[0];
		}
		return arrayPop(hooks[entryPoint]);
	};
	DOMPurify.removeHooks = function(entryPoint) {
		if (!objectHasOwnProperty(hooks, entryPoint)) return;
		hooks[entryPoint] = [];
	};
	DOMPurify.removeAllHooks = function() {
		hooks = _createHooksMap();
	};
	return DOMPurify;
}
var purify_default = createDOMPurify();
// src/utils/markdownParser.ts
function isComponentToken(token) {
	return token.type === "lesson-component";
}
function isProps(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
var lessonMarkdown = new Y$1({ extensions: [{
	name: "lesson-component",
	level: "block",
	start: (source) => source.match(/^ {0,3}:::[ \t]+component\b/m)?.index,
	tokenizer(source) {
		const opening = /^ {0,3}:::[ \t]+component[ \t]+([A-Z]\w*)[ \t]*\n/.exec(source);
		if (!opening) return;
		const body = source.slice(opening[0].length);
		const closing = /^ {0,3}:::[ \t]*(?:\n|$)/m.exec(body);
		const componentName = opening[1];
		if (!closing) throw new Error(`Missing closing ::: for component "${componentName}"`);
		const json = body.slice(0, closing.index).trim();
		const props = json ? JSON.parse(json) : {};
		if (!isProps(props)) throw new Error(`Props for component "${componentName}" must be a JSON object`);
		return {
			type: "lesson-component",
			raw: source.slice(0, opening[0].length + closing.index + closing[0].length),
			componentName,
			props
		};
	}
}] });
/**
* Sanitize HTML to prevent XSS attacks.
*/
function sanitizeHtml(html) {
	return purify_default.sanitize(html, {
		ALLOWED_TAGS: [
			"h1",
			"h2",
			"h3",
			"h4",
			"h5",
			"h6",
			"p",
			"br",
			"hr",
			"strong",
			"em",
			"u",
			"ul",
			"ol",
			"li",
			"a",
			"blockquote",
			"code",
			"pre",
			"table",
			"thead",
			"tbody",
			"tr",
			"td",
			"th",
			"img"
		],
		ALLOWED_ATTR: [
			"href",
			"title",
			"alt",
			"src"
		]
	});
}
function parseMarkdownToBlocks(markdown, lessonId) {
	const tokens = lessonMarkdown.lexer(markdown);
	if (!tokens.some(isComponentToken)) return [{
		id: `${lessonId}-markdown`,
		type: "markdown",
		content: markdown
	}];
	const blocks = [];
	let content = "";
	const flushMarkdown = () => {
		if (content.trim()) blocks.push({
			id: `${lessonId}-markdown-${blocks.length}`,
			type: "markdown",
			content
		});
		content = "";
	};
	for (const token of tokens) if (isComponentToken(token)) {
		flushMarkdown();
		blocks.push({
			id: `${lessonId}-component-${blocks.length}`,
			type: "react-component",
			componentName: token.componentName,
			props: token.props
		});
	} else content += token.raw;
	flushMarkdown();
	return blocks;
}
// \0vite/preload-helper.js
var scriptRel = "modulepreload";
var assetsURL = function(dep) {
	return "/dash-academy/" + dep;
};
var seen = {};
var isCssPreloadUrl = function isCssPreloadUrl(url) {
	return url.pathname.endsWith(".css");
};
var preloadOnce = function preloadOnce(seen, href, preload) {
	if (href in seen) return seen[href];
	const promise = preload();
	if (!promise) {
		seen[href] = void 0;
		return;
	}
	const preloadPromise = promise.then(() => {
		seen[href] = void 0;
	}, (err) => {
		seen[href] = void 0;
		throw err;
	});
	seen[href] = preloadPromise;
	return preloadPromise;
};
var __vitePreload = function preload(baseModule, deps, importerUrl) {
	let promise = Promise.resolve();
	if (deps && deps.length > 0) {
		let preloadedHrefs;
		const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
		const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
		function allSettled(promises) {
			return Promise.all(promises.map((p) => Promise.resolve(p).then((value) => ({
				status: "fulfilled",
				value
			}), (reason) => ({
				status: "rejected",
				reason
			}))));
		}
		function importMetaResolve(specifier) {
			if (import.meta.resolve) return new URL(import.meta.resolve(specifier));
			return new URL(
				specifier,
				/** #__KEEP__ */
				import.meta.url
			);
		}
		promise = allSettled(deps.map((depString) => {
			depString = assetsURL(depString, importerUrl);
			const dep = importMetaResolve(depString);
			const isCss = isCssPreloadUrl(dep);
			return preloadOnce(seen, dep.href, () => {
				if (preloadedHrefs === void 0) {
					preloadedHrefs = {
						all: /* @__PURE__ */ new Set(),
						styles: /* @__PURE__ */ new Set()
					};
					const links = document.getElementsByTagName("link");
					for (let i = links.length - 1; i >= 0; i--) {
						const link = links[i];
						preloadedHrefs.all.add(link.href);
						if (link.rel === "stylesheet") preloadedHrefs.styles.add(link.href);
					}
				}
				if ((isCss ? preloadedHrefs.styles : preloadedHrefs.all).has(dep.href)) return;
				const link = document.createElement("link");
				link.rel = isCss ? "stylesheet" : scriptRel;
				if (!isCss) link.as = "script";
				link.crossOrigin = "";
				link.href = dep.href;
				if (cspNonce) link.setAttribute("nonce", cspNonce);
				document.head.appendChild(link);
				if (isCss) return new Promise((res, rej) => {
					const handleSettle = (e) => {
						link.removeEventListener("load", handleSettle);
						link.removeEventListener("error", handleSettle);
						if (e.type === "error") rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`));
						else res(e);
					};
					link.addEventListener("load", handleSettle);
					link.addEventListener("error", handleSettle);
				});
			});
		}).filter((p) => p !== void 0));
	}
	function handlePreloadError(err) {
		const e = new Event("vite:preloadError", { cancelable: true });
		e.payload = err;
		window.dispatchEvent(e);
		if (!e.defaultPrevented) throw err;
	}
	return promise.then((res) => {
		for (const item of res || []) {
			if (item.status !== "rejected") continue;
			handlePreloadError(item.reason);
		}
		return baseModule().catch(handlePreloadError);
	});
};
// src/utils/lessonLoader.ts
var metadataFiles = /* #__PURE__ */ Object.assign({
	"../lessons/foundations/lesson-1/lesson.json": () => __vitePreload(() => import("./lesson-BQ_83X6C.js").then((m) => m["default"]), []),
	"../lessons/foundations/lesson-2/lesson.json": () => __vitePreload(() => import("./lesson-ZAYQ0LEs.js").then((m) => m["default"]), []),
	"../lessons/foundations/lesson-3/lesson.json": () => __vitePreload(() => import("./lesson-CDFCEWo5.js").then((m) => m["default"]), [])
});
var contentFiles = /* #__PURE__ */ Object.assign({
	"../lessons/foundations/lesson-1/content.md": () => __vitePreload(() => import("./content-Bruact72.js").then((m) => m["default"]), []),
	"../lessons/foundations/lesson-2/content.md": () => __vitePreload(() => import("./content-o8N4P2iw.js").then((m) => m["default"]), []),
	"../lessons/foundations/lesson-3/content.md": () => __vitePreload(() => import("./content-CSWgVlmh.js").then((m) => m["default"]), [])
});
/**
* Load a lesson from the file system
* This function imports the lesson metadata and content dynamically
*/
async function loadLessonFile(moduleId, lessonId) {
	try {
		const lessonPath = `../lessons/${moduleId}/${lessonId}`;
		const loadMetadata = metadataFiles[`${lessonPath}/lesson.json`];
		const loadContent = contentFiles[`${lessonPath}/content.md`];
		if (!loadMetadata || !loadContent) throw new Error(`Missing lesson.json or content.md in ${lessonPath}`);
		const [metadata, markdownContent] = await Promise.all([loadMetadata(), loadContent()]);
		return {
			id: metadata.id,
			moduleId,
			title: metadata.title,
			description: metadata.description,
			durationMinutes: metadata.durationMinutes,
			order: metadata.order,
			content: parseMarkdownToBlocks(markdownContent, lessonId)
		};
	} catch (error) {
		console.error(`Failed to load lesson ${lessonId} from module ${moduleId}:`, error);
		return null;
	}
}
/**
* Cache for loaded lessons to avoid re-importing
*/
var lessonCache = /* @__PURE__ */ new Map();
/**
* Get a lesson by ID, loading from file system
* Uses caching to avoid re-imports (disabled in development)
*/
async function getLesson(moduleId, lessonId) {
	const cacheKey = `${moduleId}/${lessonId}`;
	if (lessonCache.has(cacheKey)) return lessonCache.get(cacheKey) || null;
	const lesson = await loadLessonFile(moduleId, lessonId);
	lessonCache.set(cacheKey, Promise.resolve(lesson));
	return lesson;
}
// src/assets/avatar.svg
var avatar_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%20128%20128'%20data-name='Layer%201'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cstyle%3e.cls-1{fill:%2300adfe;}.cls-2,.cls-6{fill:%23ffffff;}.cls-14,.cls-2{opacity:0.3;}.cls-3{fill:%23393c54;}.cls-4{fill:%23fba875;}.cls-5{fill:%23b56b63;}.cls-10,.cls-11,.cls-13,.cls-14,.cls-7,.cls-9{fill:none;stroke-linecap:round;}.cls-10,.cls-7{stroke:%23fba875;}.cls-10,.cls-11,.cls-13,.cls-7{stroke-miterlimit:10;}.cls-7{stroke-width:20px;}.cls-8{fill:%23ffbb94;}.cls-9{stroke:%23515570;opacity:0.4;}.cls-14,.cls-9{stroke-linejoin:round;stroke-width:2px;}.cls-10,.cls-11,.cls-13{stroke-width:4px;}.cls-11{stroke:%23393c54;}.cls-12{fill:%23515570;}.cls-13{stroke:%23ffffff;}.cls-13,.cls-15{opacity:0.1;}.cls-14{stroke:%23f85565;}.cls-15{fill:%23f85565;}%3c/style%3e%3c/defs%3e%3ctitle/%3e%3ccircle%20class='cls-1'%20cx='64'%20cy='64'%20r='60'/%3e%3ccircle%20class='cls-2'%20cx='64'%20cy='64'%20r='48'/%3e%3cpath%20class='cls-3'%20d='M31.08,61.57V45.92a32.92,32.92,0,0,1,65.84,0V61.57Z'/%3e%3ccircle%20class='cls-4'%20cx='91.32'%20cy='60.43'%20r='7.93'/%3e%3cpath%20class='cls-5'%20d='M64,124.1a59.78,59.78,0,0,0,40-15.28l-2.39-5.68c-1.71-4-6.22-6.64-11.29-6.64H37.69c-5.07,0-9.58,2.66-11.29,6.64L24,108.82A59.78,59.78,0,0,0,64,124.1Z'/%3e%3cpath%20class='cls-6'%20d='M81.72,98.25a3.06,3.06,0,0,0-3.08-2.88H49.36a3.07,3.07,0,0,0-3.08,2.93c0,.11,0,.21,0,.32-.17,7.32,10.52,16.64,10.52,16.64L64,108.05l7.17,7.17s10.56-9,10.56-16.22C81.73,98.74,81.73,98.49,81.72,98.25Z'/%3e%3cline%20class='cls-7'%20x1='64'%20x2='64'%20y1='84.75'%20y2='98.5'/%3e%3ccircle%20class='cls-4'%20cx='36.68'%20cy='60.43'%20r='7.93'/%3e%3cpath%20class='cls-8'%20d='M64,94.37A28.31,28.31,0,0,1,35.68,66.05V47.43a28.32,28.32,0,1,1,56.64,0V66.05A28.31,28.31,0,0,1,64,94.37Z'/%3e%3ccircle%20class='cls-3'%20cx='77.5'%20cy='59.28'%20r='3'/%3e%3ccircle%20class='cls-3'%20cx='50.5'%20cy='59.28'%20r='3'/%3e%3cline%20class='cls-9'%20x1='74.69'%20x2='84.31'%20y1='53'%20y2='52.75'/%3e%3cline%20class='cls-9'%20x1='53.31'%20x2='43.69'%20y1='53'%20y2='52.75'/%3e%3cpath%20class='cls-3'%20d='M92.32,64.81h-1.1A3.22,3.22,0,0,0,88,68h0a3.22,3.22,0,0,1-3.22,3.22H43.22A3.22,3.22,0,0,1,40,68h0a3.22,3.22,0,0,0-3.22-3.22h-1.1V82.28c0,15.43,12.1,28.47,27.52,28.9A28.32,28.32,0,0,0,92.32,82.87Z'/%3e%3cpath%20class='cls-6'%20d='M71.55,75a1,1,0,0,1,.94,1.07,8.56,8.56,0,0,1-17,0A1,1,0,0,1,56.45,75Z'/%3e%3cline%20class='cls-10'%20x1='64'%20x2='64'%20y1='60.75'%20y2='67.25'/%3e%3cline%20class='cls-10'%20x1='66.5'%20x2='61.5'%20y1='68'%20y2='68'/%3e%3cline%20class='cls-11'%20x1='36'%20x2='36'%20y1='56'%20y2='36'/%3e%3cline%20class='cls-11'%20x1='92'%20x2='92'%20y1='56'%20y2='35'/%3e%3cpath%20class='cls-12'%20d='M31,23.83A15.17,15.17,0,0,0,46.17,39H91.5a1,1,0,0,0,1-1.29A29.92,29.92,0,0,0,64,17H31Z'/%3e%3cpath%20class='cls-13'%20d='M70.5,33H47.73a10,10,0,0,1-10-10'/%3e%3cline%20class='cls-14'%20x1='65'%20x2='67'%20y1='67'%20y2='67'/%3e%3cellipse%20class='cls-15'%20cx='50.42'%20cy='67.67'%20rx='4.58'%20ry='2.98'/%3e%3cellipse%20class='cls-15'%20cx='77.58'%20cy='67.67'%20rx='4.58'%20ry='2.98'/%3e%3c/svg%3e";
// src/components/LearningScoreCard.tsx
var TRACK_LEVELS = [
	{
		name: "Fundamentals",
		icon: "🧱",
		minPercentage: 0
	},
	{
		name: "Novice",
		icon: "👨‍🎓",
		minPercentage: 15
	},
	{
		name: "Practitioner",
		icon: "💼",
		minPercentage: 30
	},
	{
		name: "Expert",
		icon: "🧠",
		minPercentage: 50
	},
	{
		name: "Master",
		icon: "🏆",
		minPercentage: 75
	}
];
function LearningScoreCard({ name, completedLessons, totalLessons, completedModules, totalModules, earnedAchievements, totalAchievements }) {
	const percentage = totalLessons > 0 ? Math.round(completedLessons / totalLessons * 100) : 0;
	const track = TRACK_LEVELS.findLast((level) => percentage >= level.minPercentage) ?? TRACK_LEVELS[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "learning-score-card",
		"aria-label": `Lernbilanz von ${name}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "learning-score-card-profile",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "learning-score-card-avatar",
					src: avatar_default,
					alt: ""
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "learning-score-card-identity",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Deine Lernbilanz" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "learning-score-card-level",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {
								size: 20,
								strokeWidth: 2.5
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Track: ", track.name] })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "learning-score-card-results",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "learning-score-card-stats",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
							className: "learning-score-card-stats-item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
								size: 24,
								strokeWidth: 2
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Lektionen geschafft" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [completedLessons, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [" / ", totalLessons] })] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
							className: "learning-score-card-stats-item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, {
								size: 24,
								strokeWidth: 2
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Module abgeschlossen" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [completedModules, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [" / ", totalModules] })] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
							className: "learning-score-card-stats-item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, {
								size: 24,
								strokeWidth: 2
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Erfolge gesammelt" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [earnedAchievements.length, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [" / ", totalAchievements] })] })] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "learning-score-card-progress",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "learning-score-card-progress-label",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Lernfortschritt" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [percentage, "%"] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "learning-meter learning-score-card-meter",
						role: "progressbar",
						"aria-label": "Lernfortschritt",
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": percentage,
						"aria-valuetext": `${completedLessons} von ${totalLessons} Lektionen abgeschlossen`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "learning-meter-fill",
							style: { width: `${percentage}%` }
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "learning-score-card-achievements",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Deine Abzeichen" }), earnedAchievements.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "learning-score-card-badges",
					children: earnedAchievements.map((achievement) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [achievement.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: achievement.image,
						alt: ""
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "learning-score-card-badge-icon",
						"aria-hidden": "true",
						children: achievement.fallbackIcon || "🏅"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: achievement.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: achievement.description })] })] }, achievement.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "learning-score-card-empty",
					children: "Noch keine Abzeichen. Deine gesammelten Erfolge erscheinen hier."
				})]
			})
		]
	});
}
// src/pages/LearningPathPage.tsx
var { useState: useState$4, useEffect: useEffect$3 } = await importShared("react");
function LearningPathPage() {
	const completed = useProgressStore((state) => state.completedLessonIds);
	const earnedAchievementIds = useProgressStore((state) => state.earnedAchievementIds);
	const currentLessonId = useProgressStore((state) => state.currentLessonId);
	const [currentLesson, setCurrentLesson] = useState$4(null);
	useEffect$3(() => {
		if (!currentLessonId) return;
		let active = true;
		const loadCurrentLesson = async () => {
			try {
				for (const mod of modules) if (mod.lessonIds.includes(currentLessonId)) {
					const lesson = await getLesson(mod.id, currentLessonId);
					if (active && lesson) setCurrentLesson(lesson);
					break;
				}
			} catch (err) {
				console.error("Error loading current lesson:", err);
			}
		};
		loadCurrentLesson();
		return () => {
			active = false;
		};
	}, [currentLessonId]);
	const lessonIds = [...new Set(modules.flatMap((module) => module.lessonIds))];
	const completedLessons = lessonIds.filter((id) => completed.includes(id)).length;
	const completedModules = modules.filter((module) => module.lessonIds.length > 0 && module.lessonIds.every((id) => completed.includes(id))).length;
	const earnedAchievements = achievements.filter((achievement) => earnedAchievementIds.includes(achievement.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "learning-page learning-page--path",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "learning-eyebrow learning-link",
					children: "Lernpfad"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "learning-title",
					children: learningPath.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "learning-description",
					children: learningPath.description
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "learning-hero",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearningScoreCard, {
					name: "Alex",
					completedLessons,
					totalLessons: lessonIds.length,
					completedModules,
					totalModules: modules.length,
					earnedAchievements,
					totalAchievements: achievements.length
				})
			}),
			currentLesson && currentLesson.id === currentLessonId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "learning-continue-section",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "learning-section-title",
						children: "Weiterlernen"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: `/lessons/${currentLesson.id}`,
						className: "learning-continue-featured",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "learning-continue-featured-image",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='iso-8859-1'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%20471.836%20471.836'%20xml:space='preserve'%3e%3ccircle%20style='fill:%23F2BE3E;'%20cx='235.918'%20cy='235.918'%20r='235.918'/%3e%3cpolygon%20style='fill:%23F2EF8F;'%20points='388.047,357.188%20127.833,398.741%2094.285,193.224%20354.498,151.672%20'/%3e%3cg%3e%3crect%20x='128.465'%20y='216.567'%20transform='matrix(-0.9875%200.1578%20-0.1578%20-0.9875%20494.8586%20406.8546)'%20style='fill:%23988534;'%20width='205.627'%20height='13.01'/%3e%3crect%20x='134.327'%20y='248.674'%20transform='matrix(-0.9875%200.1577%20-0.1577%20-0.9875%20511.55%20469.7617)'%20style='fill:%23988534;'%20width='205.624'%20height='13.003'/%3e%3crect%20x='139.693'%20y='282.815'%20transform='matrix(-0.9875%200.1577%20-0.1577%20-0.9875%20527.6082%20536.7776)'%20style='fill:%23988534;'%20width='205.631'%20height='13.01'/%3e%3cpolygon%20style='fill:%23988534;'%20points='259.274,327.116%20147.332,345.001%20145.266,332.156%20257.212,314.27%20'/%3e%3c/g%3e%3cg%3e%3cpolygon%20style='fill:%237D8880;'%20points='225.104,201.572%20219.069,163.983%20231.824,163.983%20225.617,201.572%20'/%3e%3cpolygon%20style='fill:%23F06668;'%20points='197.348,72.384%20199.514,76.119%20213.269,88.672%20206.41,138.943%20209.045,161.902%20218.871,167.477%20237.523,167.934%20251.207,159.975%20242.257,145.513%20237.171,90.741%20237.433,83.254%20249.669,75.793%20251.162,71.98%20'/%3e%3cpath%20style='fill:%23E84849;'%20d='M248.019,164.787c-4.572,3.027-10.174,4.992-16.292,5.658l-2.058,0.176%20c-0.236,0.019-0.464,0.052-0.7,0.052l-1.89,0.056c-3.753-0.019-7.379-0.513-10.72-1.493c-12.524-3.633-21.549-13.351-21.717-24.879%20c-0.086-6.466,3.308-7.809,9.672-11.977l7.431-43.064c-6.028-2.043-10.802-8.947-13.246-14.196%20c8.254,6.881,17.957,8.52,24.89,8.587c0.236,1.74,0.883,6.687,0.909,7.416c4.426,0.015,8.093-0.636,10.642-1.336l0.007-0.026%20l1.216-7.607c5.422-1.392,10.174-3.633,13.497-6.357c-1.998,4.501-5.28,9.946-9.47,11.966c0,0,5.339,30.581,7.465,43.393%20c6.881,3.948,12.584,5.616,12.685,12.295C260.475,152.043,255.63,159.751,248.019,164.787z%20M235.072,91.138%20c-2.623,0.7-6.309,1.343-10.754,1.325l-0.296,58.993c1.916,0.172,3.847,0.239,5.736,0.086c4.015-0.337,7.633-1.5,10.6-3.3%20L235.072,91.138z%20M248.681,160.686l-7.903-11.139c-3.102,1.815-6.806,2.986-10.907,3.33c-1.983,0.168-4.007,0.079-6.028-0.101%20l-5.729,12.561l-0.041,0.094c3.094,0.606,6.357,0.913,9.744,0.868c7.936-0.116,15.195-2.14,20.834-5.422L248.681,160.686z%20M227.346,82.259c-6.941,0.509-20.041-0.116-29.998-9.875c-0.651-1.25-1.055-2.552-1.07-3.914%20c-0.019-1.474,0.378-2.904,1.096-4.269c3.356-6.238,14.002-10.889,26.686-11.076c12.685-0.168,23.453,4.198,26.971,10.331%20c0.778,1.343,1.205,2.765,1.231,4.243c0.019,1.482-0.37,2.919-1.104,4.284c-0.079,0.228-0.187,0.505-0.281,0.745%20C246.709,77.653,237.22,81.54,227.346,82.259z'/%3e%3c/g%3e%3c/svg%3e",
								alt: "",
								className: "learning-continue-featured-image-content"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "learning-continue-featured-content",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "learning-link",
									children: "Aktuelle Lektion"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "learning-card-title",
									children: currentLesson.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "learning-card-description",
									children: currentLesson.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "learning-card-action",
									children: "Weiter zur Lektion →"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "learning-continue-subheading",
						children: "Module erkunden"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "learning-continue-grid",
						children: modules.map((module, index) => {
							const finished = module.lessonIds.filter((lessonId) => completed.includes(lessonId)).length;
							const isLocked = index > 0 && !modules.slice(0, index).every((previous) => previous.lessonIds.every((id) => completed.includes(id)));
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: isLocked ? "#" : `/modules/${module.id}`,
								onClick: (e) => isLocked && e.preventDefault(),
								className: "learning-continue-card",
								style: {
									textDecoration: "none",
									color: "inherit",
									cursor: isLocked ? "not-allowed" : "pointer",
									opacity: isLocked ? .6 : 1
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "learning-continue-image",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: module.previewImage || "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='iso-8859-1'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20height='800px'%20width='800px'%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%20473.965%20473.965'%20xml:space='preserve'%3e%3cpath%20style='fill:%23F6A2A3;'%20d='M0.006,236.973C0.006,106.09,106.103,0,236.979,0c130.883,0,236.981,106.094,236.981,236.973%20c0,130.887-106.098,236.988-236.981,236.988C106.107,473.961,0.006,367.864,0.006,236.973z'/%3e%3cpath%20style='fill:%23E84849;'%20d='M420.243,148.383c-28.501,30.278-63.977,67.954-132.492,74.218%20c-22.226,2.032-65.63,13.283-91.565,20.011c-3.727,0.965-7.072,1.833-9.916,2.559c-62.701,16-92.096,29.463-130.92,99.333%20c-5.302,9.545-10.761,17.092-16.344,22.683c42.379,64.31,115.201,106.779,197.973,106.779%20c130.883,0,236.981-106.098,236.981-236.988c0-40.931-10.38-79.438-28.647-113.035C437.406,130.183,429.358,138.703,420.243,148.383%20z'/%3e%3cg%3e%3ccircle%20style='fill:%23FDF2F7;'%20cx='85.756'%20cy='293.118'%20r='29.309'/%3e%3ccircle%20style='fill:%23FDF2F7;'%20cx='235.426'%20cy='229.172'%20r='29.309'/%3e%3ccircle%20style='fill:%23FDF2F7;'%20cx='393.515'%20cy='170.561'%20r='29.309'/%3e%3c/g%3e%3cpath%20style='fill:%23FDF7FA;'%20d='M443.146,120.167c-0.528-0.928-1.055-1.852-1.594-2.773c-8.733,6.75-17.332,15.846-26.757,25.859%20c-27.637,29.358-62.035,65.892-127.725,71.894c-22.836,2.088-66.611,13.437-92.762,20.217c-3.716,0.965-7.053,1.83-9.889,2.556%20c-63.52,16.209-95.546,30.843-135.609,102.951c-4.629,8.333-9.276,14.952-13.916,19.895c0.662,1.078,1.366,2.122,2.047,3.192%20c0.685,1.078,1.366,2.159,2.065,3.225c5.583-5.586,11.042-13.137,16.344-22.683c38.825-69.87,68.22-83.329,130.92-99.332%20c2.844-0.722,6.189-1.594,9.916-2.559c25.934-6.728,69.339-17.979,91.565-20.011c68.519-6.264,103.991-43.939,132.492-74.218%20c9.115-9.68,17.167-18.2,25.074-24.445C444.62,122.662,443.864,121.428,443.146,120.167z'/%3e%3c/svg%3e",
										alt: module.title,
										className: "learning-continue-image-content"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "learning-continue-content",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "learning-meta",
											children: ["Modul ", String(index + 1).padStart(2, "0")]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "learning-card-title",
											children: module.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "learning-card-description",
											children: module.description
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "learning-continue-progress",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "learning-meter",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "learning-meter-fill",
													style: { width: `${finished / module.lessonIds.length * 100}%` }
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "learning-meta",
												children: [
													finished,
													"/",
													module.lessonIds.length,
													" Lektionen"
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "learning-card-action",
											children: "Zum Modul →"
										})
									]
								})]
							}, module.id);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "learning-section-title",
					children: "Deine Erfolge"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "learning-section-subtitle",
					children: "Deine verdienten Abzeichen und die nächsten Meilensteine."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "achievements-grid",
					children: achievements.map((achievement) => {
						const isEarned = earnedAchievementIds.includes(achievement.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `achievement-card${isEarned ? " achievement-card--earned" : " achievement-card--locked"}`,
							children: [
								achievement.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "achievement-image",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: achievement.image,
										alt: "",
										className: "achievement-image-content"
									})
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "achievement-icon",
									"aria-hidden": "true",
									children: isEarned ? achievement.fallbackIcon || "🏅" : "🔒"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "achievement-status",
									children: isEarned ? "Erreicht" : "Noch nicht erreicht"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: achievement.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: achievement.description })
							]
						}, achievement.id);
					})
				})
			] })
		]
	});
}
// src/pages/ModulePage.tsx
var { useState: useState$3, useEffect: useEffect$2 } = await importShared("react");
function ModulePage() {
	const { moduleId } = useParams();
	const [moduleLessons, setModuleLessons] = useState$3([]);
	const [loading, setLoading] = useState$3(true);
	const module = modules.find((item) => item.id === moduleId);
	const completed = useProgressStore((state) => state.completedLessonIds);
	useEffect$2(() => {
		if (!module) return;
		const loadLessons = async () => {
			try {
				const lessons = await Promise.all(module.lessonIds.map((lessonId) => getLesson(module.id, lessonId)));
				setModuleLessons(lessons.filter((l) => l !== null).sort((a, b) => a.order - b.order));
			} catch (err) {
				console.error("Error loading module lessons:", err);
			} finally {
				setLoading(false);
			}
		};
		loadLessons();
	}, [module]);
	if (!module) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Module not found." });
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Loading module..." });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "learning-page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/learning-path",
				className: "learning-link",
				children: "← Zurück zur Übersicht"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "learning-title",
				children: module.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "learning-description",
				children: module.description
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "learning-list",
			children: moduleLessons.map((lesson, index) => {
				const isCompleted = completed.includes(lesson.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: `/lessons/${lesson.id}`,
					className: "learning-card learning-card--link learning-lesson-row",
					children: [
						isCompleted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "learning-status-complete" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "learning-muted" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "learning-row-content",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "learning-meta",
									children: ["LESSON ", index + 1]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "learning-card-title",
									children: lesson.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "learning-card-description",
									children: lesson.description
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "learning-duration",
							children: [lesson.durationMinutes, " min"]
						})
					]
				}, lesson.id);
			})
		})]
	});
}
// src/components/componentRegistry.ts
var { lazy } = await importShared("react");
var componentRegistry = { SalesChart: lazy(() => __vitePreload(() => import("./SalesChart-ConnbZNa.js"), __vite__mapDeps([0,1,2]))) };
/**
* Get a component by name. Returns lazy-loaded component or null if not found.
*/
function getComponent(name) {
	return Object.hasOwn(componentRegistry, name) ? componentRegistry[name] : null;
}
// src/components/LessonRenderer.tsx
var { Suspense, createElement, useMemo } = await importShared("react");
function ComponentLoader({ componentName, props, fallback }) {
	const Component = getComponent(componentName);
	if (!Component) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "learning-error",
		role: "alert",
		children: fallback || `Component "${componentName}" not found`
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "learning-loading",
			children: "Loading component..."
		}),
		children: createElement(Component, props || {})
	});
}
function MarkdownBlock({ content, components }) {
	const htmlContent = useMemo(() => {
		return sanitizeHtml(x$1.parse(content, { async: false }));
	}, [content]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "learning-markdown-section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "learning-markdown-content",
			dangerouslySetInnerHTML: { __html: htmlContent }
		}), components && components.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "learning-components",
			children: components.map((comp, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentLoader, {
				componentName: comp.componentName,
				props: comp.props
			}, index))
		})]
	});
}
function LessonRenderer({ blocks }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "learning-lesson-content",
		children: blocks.map((block) => {
			switch (block.type) {
				case "text": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					block.heading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "learning-section-title",
						children: block.heading
					}),
					block.image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: block.image,
						alt: block.imageAlt || block.heading || "",
						className: "learning-content-image"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "learning-prose",
						children: block.content
					})
				] }, block.id);
				case "markdown": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownBlock, {
					content: block.content,
					components: block.components
				}, block.id);
				case "react-component": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "learning-component-section",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentLoader, {
						componentName: block.componentName,
						props: block.props,
						fallback: block.fallback
					})
				}, block.id);
				case "callout": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `learning-callout learning-callout--${block.style || "info"}`,
					children: block.content
				}, block.id);
				case "quiz": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "learning-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: block.question }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "learning-quiz-answers",
							children: block.answers.map((answer, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: answer }, index))
						}),
						block.explanation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "learning-quiz-explanation",
							children: block.explanation
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "learning-card-meta",
							children: "Quiz interaction will be implemented later."
						})
					]
				}, block.id);
				default: return null;
			}
		})
	});
}
// src/pages/LessonPage.tsx
var { useState: useState$2, useEffect: useEffect$1 } = await importShared("react");
function LessonPage() {
	const { lessonId } = useParams();
	const navigate = useNavigate();
	const module = modules.find((item) => item.lessonIds.includes(lessonId ?? ""));
	const [result, setResult] = useState$2(null);
	const completeLesson = useProgressStore((state) => state.completeLesson);
	const setCurrentLesson = useProgressStore((state) => state.setCurrentLesson);
	useEffect$1(() => {
		if (!lessonId || !module) return;
		let active = true;
		const loadLesson = async () => {
			const lesson = await getLesson(module.id, lessonId);
			if (active) setResult({
				lessonId,
				lesson
			});
		};
		loadLesson();
		return () => {
			active = false;
		};
	}, [lessonId, module]);
	if (!lessonId || !module) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Lesson not found." });
	if (result?.lessonId !== lessonId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Loading lesson..." });
	const lesson = result.lesson;
	if (!lesson) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "alert",
		children: "Failed to load lesson content."
	});
	const currentIndex = module.lessonIds.indexOf(lesson.id);
	const nextLessonId = module.lessonIds[currentIndex + 1] || null;
	const handleComplete = () => {
		completeLesson(lesson.id);
		if (nextLessonId) {
			setCurrentLesson(nextLessonId);
			navigate(`/lessons/${nextLessonId}`);
		} else navigate(`/modules/${module.id}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "learning-page learning-page--lesson",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: `/modules/${module.id}`,
					className: "learning-link",
					children: ["← ", module.title]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "learning-lesson-number",
					children: ["LESSON ", lesson.order]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "learning-title",
					children: lesson.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "learning-description",
					children: lesson.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "learning-card-meta",
					children: [lesson.durationMinutes, " minutes"]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonRenderer, { blocks: lesson.content }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "learning-lesson-footer",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleComplete,
					className: "learning-button",
					children: "Complete lesson →"
				})
			})
		]
	});
}
// src/pages/SettingsPage.tsx
function SettingsPage() {
	const resetProgress = useProgressStore((s) => s.resetProgress);
	const handleResetProgress = () => {
		if (window.confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
			resetProgress();
			alert("Progress has been reset!");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "learning-page learning-page--settings",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "learning-page-header",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Settings" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Manage your learning preferences" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "learning-page-content",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mfe-academy-settings-section",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Learning Preferences" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mfe-academy-settings-option",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								defaultChecked: true
							}), "Enable notifications"] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mfe-academy-settings-option",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								defaultChecked: true
							}), "Show progress in sidebar"] })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mfe-academy-settings-section",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Data & Privacy" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mfe-academy-settings-option",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							defaultChecked: true
						}), "Allow tracking of learning patterns"] })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mfe-academy-settings-section mfe-academy-danger-zone",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Danger Zone" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "These actions cannot be undone." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "mfe-academy-btn mfe-academy-btn--danger",
							onClick: handleResetProgress,
							children: "Reset All Progress"
						})
					]
				})
			]
		})]
	});
}
// node_modules/@edgar-treischl/dash-ui/dist/index.js
var { memo: memo$1 } = await importShared("react");
var SCHOOL_TYPE_COLORS$1 = {
	"GS": "#264653",
	"MS": "#2a9d8f",
	"RS": "#e9c46a",
	"GY": "#f4a261",
	"IGS": "#e76f51"
};
var CHART_WIDTH = 800;
var CHART_HEIGHT = 500;
var CHART_PADDING = {
	top: 40,
	right: 60,
	bottom: 80,
	left: 90
};
function formatPercent(value) {
	return `${value.toFixed(2)}%`;
}
var SCHOOL_TYPES$1 = [
	"GS",
	"MS",
	"RS",
	"GY",
	"IGS"
];
var SCHOOL_YEARS = [
	"2024/25",
	"2023/24",
	"2022/23",
	"2021/22",
	"2020/21"
];
function BarPlotComponent({ data, year, maxPercent: customMaxPercent }) {
	const chartInnerWidth = CHART_WIDTH - CHART_PADDING.left - CHART_PADDING.right;
	const maxPercent = customMaxPercent ?? Math.max(...data.map((d) => d.percent), 50);
	const xScale = (value) => value / maxPercent * chartInnerWidth;
	const barHeight = 50;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`,
		className: "dash-ui__chart",
		role: "img",
		"aria-label": `Balkendiagramm der Wiederholungsquoten f\xFCr ${year}`,
		children: [
			[
				0,
				10,
				20,
				30,
				40,
				50
			].map((tick) => {
				const x = CHART_PADDING.left + xScale(tick);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: x,
					x2: x,
					y1: CHART_PADDING.top,
					y2: CHART_HEIGHT - CHART_PADDING.bottom,
					className: "dash-ui__grid-line",
					stroke: "#e0e0e0",
					strokeWidth: "1"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
					x,
					y: CHART_HEIGHT - CHART_PADDING.bottom + 24,
					textAnchor: "middle",
					className: "dash-ui__axis-label",
					fontSize: "14",
					fill: "#666",
					children: [tick, "%"]
				})] }, `grid-${tick}`);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: CHART_PADDING.left,
				x2: CHART_WIDTH - CHART_PADDING.right,
				y1: CHART_HEIGHT - CHART_PADDING.bottom,
				y2: CHART_HEIGHT - CHART_PADDING.bottom,
				className: "dash-ui__axis-line",
				stroke: "#333",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: CHART_PADDING.left,
				x2: CHART_PADDING.left,
				y1: CHART_PADDING.top,
				y2: CHART_HEIGHT - CHART_PADDING.bottom,
				className: "dash-ui__axis-line",
				stroke: "#333",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
				x: CHART_WIDTH / 2,
				y: CHART_HEIGHT - 10,
				textAnchor: "middle",
				className: "dash-ui__axis-title",
				fontSize: "16",
				fontWeight: "500",
				fill: "#000",
				children: ["Wiederholungsquote (%) im Jahr ", year]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 15,
				y: CHART_HEIGHT / 2,
				textAnchor: "middle",
				className: "dash-ui__axis-title",
				transform: `rotate(-90 15 ${CHART_HEIGHT / 2})`,
				fontSize: "16",
				fontWeight: "500",
				fill: "#000",
				children: "Schultyp"
			}),
			data.map((item, index) => {
				const y = CHART_PADDING.top + index * 70;
				const width = xScale(item.percent);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: CHART_PADDING.left,
						y,
						width,
						height: barHeight,
						fill: SCHOOL_TYPE_COLORS$1[item.type],
						opacity: .8
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: CHART_PADDING.left - 10,
						y: y + barHeight / 2 + 5,
						textAnchor: "end",
						className: "dash-ui__axis-label",
						fontSize: "18",
						fontWeight: "600",
						fill: "#000",
						children: item.type
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: CHART_PADDING.left + width + 10,
						y: y + barHeight / 2 + 5,
						className: "dash-ui__bar-label",
						fontSize: "14",
						fontWeight: "600",
						fill: "#000",
						children: formatPercent(item.percent)
					})
				] }, item.type);
			})
		]
	});
}
var BarPlot = Object.assign(memo$1(BarPlotComponent), { peek: {
	description: "A horizontal bar chart component for visualizing school type distribution data with percentage values.",
	categories: ["visualizations", "charts"],
	madeFrom: []
} });
var { memo: memo2 } = await importShared("react");
function SelectIcon({ className, width = 16, height = 16 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		className: className ?? "select-icon-svg",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M4 6.5L8 10.5L12 6.5",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function YearSelectComponent({ selectedYear, onYearChange, label = "Wählen Sie ein Schuljahr:", disabled = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "class-retention-mfe__control-group",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "class-retention-mfe__control-label",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "class-retention-mfe__control-pair",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "year-select",
				className: "class-retention-mfe__control-short-label",
				children: "Schuljahr"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				id: "year-select",
				className: "class-retention-mfe__control-select",
				value: selectedYear,
				onChange: (e) => onYearChange(e.target.value),
				disabled,
				children: SCHOOL_YEARS.map((year) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: year,
					children: year
				}, year))
			})]
		})]
	});
}
memo2(YearSelectComponent);
var { memo: memo3, useState: useState$1 } = await importShared("react");
function formatNumber(value) {
	return new Intl.NumberFormat("de-DE").format(value);
}
function LineChartComponent({ data, minYear, maxYear }) {
	const [hoveredPoint, setHoveredPoint] = useState$1(null);
	const allYearsSet = /* @__PURE__ */ new Set();
	const schoolYearMap = /* @__PURE__ */ new Map();
	data.forEach((schoolTypeData) => {
		schoolTypeData.forEach((d) => {
			allYearsSet.add(d.year);
			schoolYearMap.set(d.year, d.syear);
		});
	});
	const allYears = Array.from(allYearsSet).map((y) => parseInt(y)).sort((a, b) => a - b);
	const chartInnerWidth = CHART_WIDTH - CHART_PADDING.left - CHART_PADDING.right;
	const chartInnerHeight = CHART_HEIGHT - CHART_PADDING.top - CHART_PADDING.bottom;
	const maxRetention = Math.max(...Array.from(data.values()).flat().map((d) => d.number) || [0]);
	const yScale = (value) => CHART_HEIGHT - CHART_PADDING.bottom - value / maxRetention * chartInnerHeight;
	const yearRange = Math.max(...allYears) - Math.min(...allYears) || 1;
	const xScale = (year) => {
		const yearNum = parseInt(year);
		return CHART_PADDING.left + (yearNum - Math.min(...allYears)) / yearRange * chartInnerWidth;
	};
	const yTicks = [
		0,
		Math.round(maxRetention / 4),
		Math.round(maxRetention / 2),
		Math.round(maxRetention * 3 / 4),
		maxRetention
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`,
		className: "line-chart",
		role: "img",
		"aria-label": "Liniendiagramm der Klassenwiederholungen im Zeitverlauf nach Schultyp",
		children: [
			yTicks.map((tick) => {
				const y = yScale(tick);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: CHART_PADDING.left,
					x2: CHART_WIDTH - CHART_PADDING.right,
					y1: y,
					y2: y,
					className: "line-chart__grid-line",
					stroke: "#e5e7eb",
					strokeWidth: 1
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: CHART_PADDING.left - 10,
					y: y + 4,
					className: "line-chart__axis-label line-chart__axis-label--y",
					fontSize: "12",
					fill: "#666",
					textAnchor: "end",
					children: formatNumber(tick)
				})] }, `y-${tick}`);
			}),
			allYears.map((year) => {
				const x = xScale(year.toString());
				const schoolYear = schoolYearMap.get(year.toString()) || year.toString();
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x,
					y: CHART_HEIGHT - CHART_PADDING.bottom + 24,
					textAnchor: "middle",
					className: "line-chart__axis-label",
					fontSize: "12",
					fill: "#666",
					children: schoolYear
				}, `x-${year}`);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: CHART_PADDING.left,
				x2: CHART_WIDTH - CHART_PADDING.right,
				y1: CHART_HEIGHT - CHART_PADDING.bottom,
				y2: CHART_HEIGHT - CHART_PADDING.bottom,
				className: "line-chart__axis-line",
				stroke: "#333",
				strokeWidth: 2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: CHART_PADDING.left,
				x2: CHART_PADDING.left,
				y1: CHART_PADDING.top,
				y2: CHART_HEIGHT - CHART_PADDING.bottom,
				className: "line-chart__axis-line",
				stroke: "#333",
				strokeWidth: 2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
				x: CHART_WIDTH / 2,
				y: CHART_HEIGHT - 10,
				textAnchor: "middle",
				className: "line-chart__axis-title",
				fontSize: "16",
				fontWeight: "500",
				fill: "#333",
				children: [
					"Schuljahr ",
					minYear,
					"/",
					maxYear
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 15,
				y: CHART_HEIGHT / 2,
				textAnchor: "middle",
				className: "line-chart__axis-title",
				transform: `rotate(-90 15 ${CHART_HEIGHT / 2})`,
				fontSize: "16",
				fontWeight: "500",
				fill: "#333",
				children: "Anzahl Wiederholungen"
			}),
			SCHOOL_TYPES$1.map((schoolType) => {
				const schoolTypeData = data.get(schoolType) || [];
				if (schoolTypeData.length === 0) return null;
				const pathData = schoolTypeData.map((d, i) => {
					const x = xScale(d.year);
					const y = yScale(d.number);
					return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
				}).join(" ");
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: pathData,
					stroke: SCHOOL_TYPE_COLORS$1[schoolType],
					strokeWidth: 3,
					fill: "none",
					strokeLinecap: "round",
					strokeLinejoin: "round"
				}), schoolTypeData.map((d) => {
					const cx = xScale(d.year);
					const cy = yScale(d.number);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx,
						cy,
						r: hoveredPoint?.schoolType === schoolType && hoveredPoint?.syear === d.syear ? 7 : 5,
						fill: SCHOOL_TYPE_COLORS$1[schoolType],
						style: {
							cursor: "pointer",
							transition: "r 0.2s"
						},
						onMouseEnter: () => setHoveredPoint({
							schoolType,
							syear: d.syear,
							value: d.number,
							x: cx,
							y: cy
						}),
						onMouseLeave: () => setHoveredPoint(null)
					}, `${schoolType}-${d.year}`);
				})] }, schoolType);
			}),
			hoveredPoint && (() => {
				const tooltipHeight = 50;
				const tooltipWidth = 130;
				const tooltipPadding = 10;
				const tooltipY = hoveredPoint.y - tooltipHeight - tooltipPadding < CHART_PADDING.top ? hoveredPoint.y + tooltipPadding + 10 : hoveredPoint.y - tooltipHeight - tooltipPadding;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: hoveredPoint.x - tooltipWidth / 2,
						y: tooltipY,
						width: tooltipWidth,
						height: tooltipHeight,
						rx: 6,
						fill: "white",
						stroke: SCHOOL_TYPE_COLORS$1[hoveredPoint.schoolType],
						strokeWidth: 2,
						className: "line-chart__tooltip-bg",
						filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: hoveredPoint.x,
						y: tooltipY + 16,
						textAnchor: "middle",
						className: "line-chart__tooltip-text line-chart__tooltip-label",
						fontSize: "14",
						fontWeight: "500",
						fill: "#333",
						children: hoveredPoint.schoolType
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: hoveredPoint.x,
						y: tooltipY + 28,
						textAnchor: "middle",
						className: "line-chart__tooltip-text line-chart__tooltip-label",
						fontSize: "12",
						fill: "#666",
						fontWeight: "400",
						children: hoveredPoint.syear
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: hoveredPoint.x,
						y: tooltipY + 42,
						textAnchor: "middle",
						className: "line-chart__tooltip-text",
						fontSize: "14",
						fontWeight: "600",
						fill: "#333",
						children: formatNumber(hoveredPoint.value)
					})
				] });
			})()
		]
	});
}
memo3(LineChartComponent);
var { memo: memo4 } = await importShared("react");
function LineChartLegendComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "line-chart__legend",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "line-chart__legend-label",
			children: "Schultyp"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "line-chart__legend-list",
			children: SCHOOL_TYPES$1.map((schoolType) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "line-chart__legend-item",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "line-chart__legend-swatch",
					style: { backgroundColor: SCHOOL_TYPE_COLORS$1[schoolType] }
				}), schoolType]
			}, schoolType))
		})]
	});
}
memo4(LineChartLegendComponent);
// node_modules/driver.js/dist/driver.js.mjs
function e(e, n, r) {
	t(e);
	let i = {
		step: n,
		controller: new AbortController(),
		placeholder: r,
		latched: !1
	};
	return e.state.__activation = i, e.state.__lastAnnouncement = void 0, i;
}
function t(e) {
	let t = e.state.__activation;
	t && (e.state.__activation = void 0, t.waitController?.abort(), t.controller.abort());
}
function n(e, t) {
	return e.state.__activation === t;
}
function r(e, t, n) {
	e.state.__keepReturnFocus || (e.state.__activeOnDestroyed = document.activeElement), e.state.__keepReturnFocus = n, e.state.activeIndex = t;
}
function i(e, t) {
	e.state.__transitionCallback = t;
}
function a(e) {
	return !!e.state.__transitionCallback;
}
function o(e, t) {
	return e.state.__transitionCallback === t;
}
function s(e) {
	let t = !!e.state.__refreshMissed;
	return e.state.__transitionCallback = void 0, t && (e.state.__refreshMissed = !1), t;
}
function c(e) {
	e.state.__refreshMissed = !0;
}
function l(e, t) {
	let n = e.state.__activation;
	n && (n.waitController?.abort(), n.waitController = void 0, n.wait = t);
}
function u(e) {
	let t = e.state.__activation;
	return t?.wait ? (t.wait = void 0, t.waitController?.abort(), t.waitController = void 0, !0) : !1;
}
function d(e) {
	return !!e.state.__activation?.wait;
}
function f(e, t) {
	e.state.__pendingWaitCancel = t;
}
function p(e) {
	return !!e.state.__pendingWaitCancel;
}
function m(e) {
	let t = e.state.__pendingWaitCancel;
	t && (f(e), t());
}
function h(e) {
	let t = e.state.__activation;
	return t?.placeholder && {
		...t.placeholder,
		step: t.step
	};
}
function g(e) {
	return h(e)?.step ?? e.state.__activeStep;
}
function _(e) {
	let t = e.state.__activation;
	return t?.placeholder ? (t.placeholder = void 0, !0) : !1;
}
function v(e, t) {
	e.settling = t;
}
function ee(e, t) {
	return !n(e, t) || t.latched ? !1 : (t.latched = !0, !0);
}
function y(e) {
	e.done = !0;
}
function b(e, t) {
	!n(e, t) || p(e) || (t.latched = !1, t.recheck?.());
}
function x(e, t) {
	return t.latched || p(e);
}
function S(e, t) {
	return !!t.settling || x(e, t);
}
function C(e, t) {
	let n = e.state.__activation;
	return n?.step === t && !!n.done;
}
function w(e, t, n) {
	return t?.[n] ?? e.config[n];
}
function T(e) {
	return !!w(e, e.state.activeStep, `allowPageInteraction`);
}
function E(e, t) {
	if (t.advanceOn !== void 0) return t.advanceOn || void 0;
	if (t.advanceOnClick !== void 0) return t.advanceOnClick ? `click` : void 0;
	let n = e.config.advanceOn;
	return n === void 0 ? e.config.advanceOnClick ? `click` : void 0 : n || void 0;
}
function D(e, t) {
	return t.advanceOn === void 0 ? t.advanceOnClick ?? (e.config.advanceOn === void 0 && !!e.config.advanceOnClick) : !1;
}
function O(e) {
	return e ? typeof e == `string` || Array.isArray(e) ? { types: [e].flat() } : {
		types: [e.event].flat(),
		when: e.when,
		strict: e.strict
	} : { types: [] };
}
var k = [`press0`, `click`];
var A = {
	click: k,
	dblclick: [...k, `dblclick`],
	mousedown: k,
	mouseup: k,
	pointerdown: k,
	pointerup: k,
	contextmenu: [
		`press2`,
		`contextmenu`,
		`auxclick`
	],
	auxclick: [
		`press1`,
		`press2`,
		`auxclick`
	]
};
function j(e) {
	return e in A;
}
function M(e, t = {}) {
	e.config = {
		animate: !0,
		duration: 400,
		allowClose: !0,
		allowScroll: !0,
		overlayClickBehavior: `close`,
		overlayOpacity: .7,
		smoothScroll: !1,
		disableActiveInteraction: !1,
		advanceOnClick: !1,
		skipMissingElement: !1,
		waitForElement: 0,
		showProgress: !1,
		stagePadding: 10,
		stageRadius: 5,
		popoverOffset: 10,
		showButtons: [
			`next`,
			`previous`,
			`close`
		],
		disableButtons: [],
		overlayColor: `#000`,
		...t
	};
}
function N(e, t, n) {
	let r = t || e.state;
	return {
		config: e.config,
		state: r,
		driver: e.driver,
		index: r.activeIndex,
		...n ? { reason: n } : {}
	};
}
function te(e, t, n) {
	let r = {
		tour: n,
		ui: t,
		config: {},
		state: {},
		consumed: /* @__PURE__ */ new WeakSet()
	};
	return M(r, e), Object.assign(r.tour, t.controls?.(r)), r;
}
var ne = [
	`pointerdown`,
	`mousedown`,
	`pointerup`,
	`mouseup`,
	`click`
];
var re = /* @__PURE__ */ new WeakMap();
function ie(e, t, n) {
	ae(e);
	let r = (r) => {
		let i = r.target;
		e.contains(i) && ((!n || n(i)) && (r.preventDefault(), r.stopPropagation(), r.stopImmediatePropagation()), r.type === `click` && t?.(r));
	};
	for (let e of ne) document.addEventListener(e, r, !0);
	re.set(e, r);
}
function ae(e) {
	let t = re.get(e);
	if (t) {
		for (let e of ne) document.removeEventListener(e, t, !0);
		re.delete(e);
	}
}
function P(e) {
	return typeof e == `function` ? e() : typeof e == `string` ? document.querySelector(e) : e;
}
var oe = `driver-dummy-element`;
function F(e) {
	return !e || e.id === `driver-dummy-element`;
}
var I = `driver-allowed-element`;
var L = `driver-active-element-raised`;
var se = `driver-page-interactive`;
function R(e) {
	return !!e.closest(`.${I}`);
}
function ce(e) {
	let t = window.getComputedStyle(e);
	return [
		t.overflow,
		t.overflowX,
		t.overflowY
	].some((e) => e === `auto` || e === `scroll`);
}
function z(e, t, n, r) {
	return (e /= r / 2) < 1 ? n / 2 * e * e + t : -n / 2 * (--e * (e - 2) - 1) + t;
}
var le = `a[href], area[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), summary, audio[controls], video[controls], [contenteditable]:not([contenteditable="false"]), [tabindex]:not([tabindex="-1"]):not([disabled])`;
function ue(e) {
	return e.flatMap((e) => {
		let t = e.matches(le), n = Array.from(e.querySelectorAll(le));
		return [...t ? [e] : [], ...n];
	});
}
function de(e) {
	return getComputedStyle(e).pointerEvents !== `none` && Ce(e);
}
function fe(e) {
	return ue(e).filter(de);
}
function pe(e, t, n) {
	if (!e || he(e)) return;
	let r = e.offsetHeight > window.innerHeight;
	e.scrollIntoView({
		behavior: !t || me(e) ? `auto` : `smooth`,
		inline: n?.inline ?? `center`,
		block: n?.block ?? (r ? `start` : `center`)
	});
}
function me(e) {
	if (!e || !e.parentElement) return;
	let t = e.parentElement;
	return t.scrollHeight > t.clientHeight;
}
function he(e) {
	let t = e.getBoundingClientRect();
	return t.top >= 0 && t.left >= 0 && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) && t.right <= (window.innerWidth || document.documentElement.clientWidth) && !Se(e, t);
}
function ge(e) {
	let t = e.assignedSlot ?? e.parentElement;
	if (t) return t;
	let n = e.parentNode;
	return n instanceof ShadowRoot ? n.host : null;
}
function _e(e, t) {
	try {
		return e.matches(t);
	} catch {
		return !1;
	}
}
function ve(e) {
	return /paint|strict|content/.test(e.contain || ``);
}
function ye(e, t) {
	return t !== `absolute` && t !== `fixed` || (e.transform || `none`) !== `none` || (e.perspective || `none`) !== `none` || (e.filter || `none`) !== `none` || /layout|paint|strict|content/.test(e.contain || ``) || /transform|perspective|filter/.test(e.willChange || ``) || t === `absolute` && e.position !== `static`;
}
var be = (e) => !!e && e !== `visible`;
var xe = (e, t, n) => Math.min(Math.max(e, t), n);
function B(e) {
	let { left: t, top: n, right: r, bottom: i } = e.getBoundingClientRect(), a = getComputedStyle(e).position;
	for (let o = ge(e); o && !(o === document.body || o === document.documentElement); o = ge(o)) {
		let e = getComputedStyle(o);
		if (!ye(e, a)) continue;
		let s = ve(e), c = (e.overflow || ``).split(` `), l = s || be(e.overflowX) || be(c[0]), u = s || be(e.overflowY) || be(c[1] ?? c[0]);
		if (l || u) {
			let e = o.getBoundingClientRect(), a = e.left + o.clientLeft, s = e.top + o.clientTop, c = a + (o.clientWidth || e.width), d = s + (o.clientHeight || e.height);
			l && (t = xe(t, a, c), r = xe(r, a, c)), u && (n = xe(n, s, d), i = xe(i, s, d));
		}
		if (_e(o, `:modal, :popover-open`)) break;
		a = e.position;
	}
	return new DOMRect(t, n, r - t, i - n);
}
function Se(e, t) {
	let n = B(e);
	return n.width < t.width || n.height < t.height;
}
function Ce(e) {
	return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}
var we = /* @__PURE__ */ new WeakSet();
function Te(e) {
	let t = e.closest(`dialog[open]`);
	if (!t) return document.body;
	if (!(`showPopover` in t)) return t;
	let n = t.querySelector(`:scope > .driver-layer`);
	return n || (n = document.createElement(`div`), n.className = `driver-layer`, n.setAttribute(`popover`, `manual`), t.appendChild(n)), we.has(t) || (we.add(t), t.addEventListener(`close`, () => {
		t.querySelector(`:scope > .driver-layer:popover-open`)?.hidePopover();
	})), n.matches(`:popover-open`) || n.showPopover(), n;
}
function Ee(e) {
	e?.classList.contains(`driver-layer`) && !e.childElementCount && e.remove();
}
function De(e) {
	let t = e.parentElement;
	e.remove(), Ee(t);
}
function Oe(e, t, n = !1) {
	if (n && t !== document.body) {
		t.prepend(e);
		return;
	}
	t.appendChild(e);
}
function ke(e, t, n = !1) {
	let r = Te(t), i = e.parentElement;
	return i === r ? !1 : (Oe(e, r, n), Ee(i), !0);
}
function Ae(e) {
	return e instanceof HTMLElement ? e.isContentEditable || !!e.closest(`input, textarea, select, [role=combobox], [role=grid], [role=listbox], [role=menu], [role=menubar], [role=radiogroup], [role=slider], [role=spinbutton], [role=tablist], [role=textbox], [role=tree], [role=treegrid]`) : !1;
}
var je = 2 ** 31 - 1;
function Me(e) {
	return e > je;
}
function Ne(e, t, n, r, i, a, o) {
	let s;
	if (e === `start`) s = t - a;
	else if (e === `end`) s = t - r + n + a;
	else if (e === `center`) s = t + n / 2 - r / 2;
	else return 0;
	return Math.max(Math.min(s, i - r - o), o);
}
function Pe(e, t, n) {
	let { align: r, side: i } = n, a = n.centered ? `over` : i, o = n.padding, { style: s, classList: c } = e.wrapper, { width: l, height: u } = e.wrapper.getBoundingClientRect(), d = l + n.offset, f = u + n.offset, p = e.arrow.getBoundingClientRect(), m = B(t), h = m.top - f, g = h >= 0, _ = window.innerHeight - (m.bottom + f), v = _ >= 0, ee = m.left - d, y = ee >= 0, b = window.innerWidth - (m.right + d), x = b >= 0, S = p.width, C = () => Ne(r, m.top, m.height, u, window.innerHeight, o, S), w = () => Ne(r, m.left, m.width, l, window.innerWidth, o, S), T = !g && !v && !y && !x, E = a;
	a === `top` && g ? x = y = v = !1 : a === `bottom` && v ? x = y = g = !1 : a === `left` && y ? x = g = v = !1 : a === `right` && x && (y = g = v = !1);
	let D = (e, t) => {
		s[e] = t === void 0 ? `auto` : `${t}px`;
	}, O = window.innerWidth / 2 - l / 2, k = window.innerWidth - l - S, A = window.innerHeight - u - S;
	a === `over` ? (D(`left`, O), D(`right`), D(`top`, window.innerHeight / 2 - u / 2), D(`bottom`)) : T ? (D(`left`, O), D(`right`), D(`bottom`, 10), D(`top`)) : y ? (D(`left`, Math.min(ee, k)), D(`top`, C()), D(`bottom`), D(`right`), E = `left`) : x ? (D(`right`, Math.min(b, k)), D(`top`, C()), D(`bottom`), D(`left`), E = `right`) : g ? (D(`top`, Math.min(h, A)), D(`left`, w()), D(`bottom`), D(`right`), E = `top`) : v && (D(`left`, w()), D(`bottom`, Math.min(_, A)), D(`top`), D(`right`), E = `bottom`), Re(e, T ? `over` : E, r, m);
	let j = `driver-popover-side-${E}`, M = `driver-popover-align-${r}`;
	[...c].filter((e) => e.startsWith(`driver-popover-side-`) || e.startsWith(`driver-popover-align-`)).filter((e) => e !== j && e !== M).forEach((e) => c.remove(e)), c.contains(j) || c.add(j), c.contains(M) || c.add(M), n.onPositioned?.();
}
function Fe(e, t, n, r, i, a = 10) {
	let o = r - n;
	return e <= n && t >= r ? i === `start` ? 15 + a / 2 : i === `end` ? o - 15 - a / 2 : o / 2 : (Math.min(Math.max(e, n), r) + Math.min(Math.max(t, n), r)) / 2 - n;
}
function Ie(e, t, n = 10) {
	let r = t - 15 - n;
	if (r < 15) return Math.max(0, (t - n) / 2);
	let i = e - n / 2;
	return Math.min(Math.max(i, 15), r);
}
function Le(e, t, n) {
	return e === `left` || e === `right` ? t.bottom > n.top && t.top < n.bottom ? e : t.bottom <= n.top ? `bottom` : `top` : t.right > n.left && t.left < n.right ? e : t.right <= n.left ? `right` : `left`;
}
function Re(e, t, n, r) {
	let i = e.arrow;
	if (i.className = `driver-popover-arrow`, i.style.top = ``, i.style.right = ``, i.style.bottom = ``, i.style.left = ``, t === `over`) {
		i.classList.add(`driver-popover-arrow-none`);
		return;
	}
	let a = e.wrapper.getBoundingClientRect(), o = i.getBoundingClientRect().width || 10, s = Le(t, r, a);
	if (i.classList.add(`driver-popover-arrow-side-${s}`), s === `left` || s === `right`) {
		let e = Fe(r.top, r.bottom, a.top, a.bottom, n, o);
		i.style.top = `${Ie(e, a.height, o)}px`;
	} else {
		let e = Fe(r.left, r.right, a.left, a.right, n, o);
		i.style.left = `${Ie(e, a.width, o)}px`;
	}
}
function ze(e) {
	e && (e.wrapper.style.display = `none`);
}
var Be = /* @__PURE__ */ new WeakMap();
var Ve = /* @__PURE__ */ new WeakMap();
function V(e, t) {
	Ve.get(e) !== t && (e.innerHTML = t, Ve.set(e, t));
}
function H(e, t) {
	e.style.display = t ? `` : `none`;
}
var He = /* @__PURE__ */ new WeakSet();
function Ue(e) {
	e?.setAttribute(`tabindex`, `-1`), e?.focus();
}
function U(e, t) {
	let n = e.closest(`.driver-popover`);
	t && document.activeElement === e && (Ue(n), He.add(e)), e.disabled = t, e.classList.toggle(We, t), !t && He.delete(e) && n && document.activeElement === n && e.focus();
}
var W = `driver-popover-instruction-text`;
var We = `driver-popover-btn-disabled`;
function Ge(e, t, n) {
	let r = (e.getAttribute(`aria-describedby`) || ``).split(/\s+/).filter((e) => e && e !== t);
	n && r.push(t), e.setAttribute(`aria-describedby`, r.join(` `));
}
function Ke(e, t) {
	let n = G(`div`, t), r = e.footer.parentNode === e.wrapper ? e.footer : null;
	return e.wrapper.insertBefore(n, r), n;
}
function qe(e) {
	let t = Ke(e, `driver-popover-instruction`), n = G(`span`, `driver-popover-instruction-indicator`);
	n.setAttribute(`aria-hidden`, `true`), t.append(G(`span`, W, W), n), e.instruction = t, e.instructionIndicator = n;
}
function Je(e, t) {
	let n = !!t.isGated;
	(n || t.instruction) && !e.instruction && qe(e);
	let { instruction: r, instructionIndicator: i, wrapper: a, nextButton: o } = e;
	if (!r || !i) return;
	let s = t.instruction || ``;
	a.classList.toggle(`driver-popover-has-instruction`, n), a.classList.toggle(`driver-popover-instruction-done`, n && !!t.isDone), Ge(a, W, !!s);
	let c = r.querySelector(`:scope > .${W}`);
	c && s && V(c, s), H(r, !!s), n ? (o.setAttribute(`aria-disabled`, `true`), o.classList.add(We)) : o.removeAttribute(`aria-disabled`);
}
function Ye(e, t) {
	t.feedback && !e.feedback && (e.feedback = Ke(e, `driver-popover-feedback`)), e.feedback && (V(e.feedback, t.feedback || ``), H(e.feedback, !!t.feedback));
}
function Xe(e, t) {
	let { title: n, description: r, showButtons: i, disableButtons: a, showProgress: o, nextBtnText: s, prevBtnText: c, progressText: l } = t;
	V(e.nextButton, s), V(e.previousButton, c), V(e.progress, l), e.closeButton.setAttribute(`aria-label`, t.closeBtnLabel), e.nextButton.classList.toggle(`driver-popover-done-btn`, !!t.doneButton), n && V(e.title, n), H(e.title, !!n), r && V(e.description, r), H(e.description, !!r);
	let u = i.includes(`next`) || i.includes(`previous`) || o;
	H(e.closeButton, i.includes(`close`)), H(e.footer, u), H(e.progress, o), H(e.nextButton, i.includes(`next`)), H(e.previousButton, i.includes(`previous`)), U(e.nextButton, a.includes(`next`)), U(e.previousButton, a.includes(`previous`)), U(e.closeButton, a.includes(`close`)), Je(e, t), Ye(e, t);
	let d = e.wrapper;
	d.classList.remove(...Be.get(d) || []);
	let f = (t.popoverClass || ``).split(/\s+/).filter(Boolean);
	d.classList.add(...f), Be.set(d, f);
}
function Ze(e, t) {
	if (e.disabled) return !0;
	for (let n = e; n && n !== t; n = n.parentElement) if (n.style?.display === `none`) return !0;
	return !1;
}
function Qe(e, t, n) {
	let r = document.activeElement, i = !!r && e.wrapper.contains(r) && r !== e.wrapper;
	Xe(e, n), i && (!r.isConnected || Ze(r, e.wrapper)) && (e.wrapper.setAttribute(`tabindex`, `-1`), e.wrapper.focus()), Pe(e, t, n.position), rt(e, t, n.position);
}
function $e(e, t) {
	let n = it();
	Te(e).appendChild(n.wrapper);
	let r = n.wrapper;
	return r.className = `driver-popover`, Xe(n, t), r.style.display = `block`, r.style.left = ``, r.style.top = ``, r.style.bottom = ``, r.style.right = ``, r.id = `driver-popover-content`, r.setAttribute(`role`, `dialog`), r.setAttribute(`aria-labelledby`, `driver-popover-title`), n.arrow.className = `driver-popover-arrow`, ie(n.wrapper, (e) => {
		let n = e.target instanceof Element ? e.target : e.target?.parentElement;
		if (n) {
			if (n.closest(`.driver-popover-next-btn`)) return t.onNextClick?.();
			if (n.closest(`.driver-popover-prev-btn`)) return t.onPrevClick?.();
			if (n.closest(`.driver-popover-close-btn`)) return t.onCloseClick?.();
		}
	}, (e) => n.description.contains(e) || n.title.contains(e) ? !1 : !!e.closest(`.driver-popover-prev-btn, .driver-popover-next-btn, .driver-popover-close-btn`)), t.onRender?.(n), Pe(n, e, t.position), rt(n, e, t.position), t.scrollIntoView !== !1 && pe(r, t.smoothScroll, {
		block: `nearest`,
		inline: `nearest`
	}), t.keepFocus || et(n), n;
}
function et(e) {
	let { nextButton: t, wrapper: n } = e;
	t.isConnected && t.style.display !== `none` && !t.disabled && !t.hasAttribute(`aria-disabled`) && t.focus(), document.activeElement !== t && Ue(n);
}
var tt = /* @__PURE__ */ new WeakMap();
var nt = /* @__PURE__ */ new WeakSet();
function rt(e, t, n) {
	tt.set(e, {
		anchor: t,
		position: n
	}), e.wrapper.querySelectorAll(`img`).forEach((t) => {
		if (t.complete || nt.has(t)) return;
		nt.add(t);
		let n = () => {
			nt.delete(t);
			let n = tt.get(e);
			n && e.wrapper.isConnected && Pe(e, n.anchor, n.position);
		};
		t.addEventListener(`load`, n, { once: !0 }), t.addEventListener(`error`, n, { once: !0 });
	});
}
function G(e, t, n) {
	let r = document.createElement(e);
	return n && (r.id = n), r instanceof HTMLButtonElement && (r.type = `button`), r.className = t, r;
}
function it() {
	let e = G(`div`, `driver-popover`);
	e.setAttribute(`aria-describedby`, `driver-popover-description`);
	let t = G(`div`, `driver-popover-arrow`), n = G(`div`, `driver-popover-title`, `driver-popover-title`);
	n.style.display = `none`, n.innerText = `Popover Title`;
	let r = G(`div`, `driver-popover-description`, `driver-popover-description`);
	r.style.display = `none`, r.innerText = `Popover description is here`;
	let i = G(`button`, `driver-popover-close-btn`);
	i.innerHTML = `&times;`;
	let a = G(`div`, `driver-popover-footer`), o = G(`span`, `driver-popover-progress-text`), s = G(`span`, `driver-popover-navigation-btns`), c = G(`button`, `driver-popover-prev-btn driver-popover-footer-btn`);
	c.innerHTML = `Previous`;
	let l = G(`button`, `driver-popover-next-btn driver-popover-footer-btn`);
	return l.innerHTML = `Next`, s.append(c, l), a.append(o, s), e.append(i, t, n, r, a), {
		wrapper: e,
		arrow: t,
		title: n,
		description: r,
		footer: a,
		previousButton: c,
		nextButton: l,
		closeButton: i,
		footerButtons: s,
		progress: o
	};
}
function at(e) {
	e && (ae(e.wrapper), De(e.wrapper));
}
var ot = `http://www.w3.org/2000/svg`;
function st() {
	return `0 0 ${window.innerWidth} ${window.innerHeight}`;
}
function ct(e, t, n, r) {
	let i = document.createElementNS(ot, `svg`);
	i.setAttribute(`class`, e), i.setAttribute(`viewBox`, st()), i.setAttribute(`preserveAspectRatio`, `xMinYMin slice`), i.style.fillRule = `evenodd`;
	let a = document.createElementNS(ot, `path`);
	return a.setAttribute(`d`, t), a.style.fill = n, a.style.opacity = `${r}`, a.style.pointerEvents = `auto`, i.appendChild(a), i;
}
function lt(e, t) {
	let n = e.width + t.padding * 2, r = e.height + t.padding * 2, i = Math.min(t.radius, n / 2, r / 2);
	return {
		x: e.x - t.padding,
		y: e.y - t.padding,
		width: n,
		height: r,
		radius: Math.floor(Math.max(i, 0))
	};
}
function ut(e, t) {
	let n = window.innerWidth, r = window.innerHeight, i = lt(e, t), a = i.radius, o = i.x + a, s = i.y, c = i.width - a * 2, l = i.height - a * 2;
	return `M${n},0L0,0L0,${r}L${n},${r}L${n},0Z
    M${o},${s} h${c} a${a},${a} 0 0 1 ${a},${a} v${l} a${a},${a} 0 0 1 -${a},${a} h-${c} a${a},${a} 0 0 1 -${a},-${a} v-${l} a${a},${a} 0 0 1 ${a},-${a} z`;
}
function dt(e, t, n) {
	return t > e.x && t < e.x + e.width && n > e.y && n < e.y + e.height;
}
function ft(e, t) {
	let n = (e, n) => t.some((t) => dt(t, e, n)), r = (n, r) => [...new Set([e, ...t].flatMap((e) => [e[n], e[n] + e[r]]))].sort((e, t) => e - t), i = r(`x`, `width`), a = r(`y`, `height`), o = ``;
	i.forEach((t, r) => {
		a.forEach((s, c) => {
			let l = i[r + 1] - t, u = a[c + 1] - s, d = t + l / 2, f = s + u / 2;
			n(d, f) && !dt(e, d, f) && (o += `M${t},${s}h${l}v${u}h-${l}z`);
		});
	});
	let s = e.radius;
	for (let t of [0, 1]) for (let r of [0, 1]) {
		let i = e.x + t * e.width, a = e.y + r * e.height, c = t ? -s : s, l = r ? -s : s;
		s && n(i + c / 2, a + l / 2) && (o += `M${i},${a}h${c}a${s},${s} 0 0 ${t ^ r} ${-c},${l}z`);
	}
	return o;
}
function pt(e, t, n, r, i) {
	let a = e.state.__activeStagePosition, o = a || B(r), s = B(i);
	a = {
		x: z(t, o.x, s.x - o.x, n),
		y: z(t, o.y, s.y - o.y, n),
		width: z(t, o.width, s.width - o.width, n),
		height: z(t, o.height, s.height - o.height, n)
	}, bt(e, a, i), e.state.__activeStagePosition = a;
}
function mt(e, t) {
	if (!t) return;
	let n = B(t), r = {
		x: n.x,
		y: n.y,
		width: n.width,
		height: n.height
	};
	e.state.__activeStagePosition = r, bt(e, r, t);
}
function ht(e) {
	let t = e.state.__activeStagePosition, n = e.state.__overlaySvg;
	!t || !n || n.setAttribute(`viewBox`, st());
}
function gt(e, t, n) {
	let r = Ct(e, t);
	return Oe(r, Te(n), !0), ie(r, (t) => {
		t.target.tagName === `path` && e.tour.overlayClick();
	}), e.state.__overlaySvg = r, r;
}
function _t(e) {
	e.style.animation = `none`;
}
function vt(e, t) {
	ke(e, t, !0) && _t(e);
}
function yt(e, t) {
	let n = e.closest(`dialog`);
	return n ? ft(t, Array.from(n.querySelectorAll(`.driver-allowed-element`)).map((e) => e.getBoundingClientRect())) : ``;
}
function bt(e, t, n) {
	let r = e.state.__overlaySvg ?? gt(e, t, n);
	vt(r, n);
	let i = r.firstElementChild;
	if (i?.tagName !== `path`) return;
	let a = St(e), o = ut(t, a) + yt(r, lt(t, a));
	i.getAttribute(`d`) !== o && i.setAttribute(`d`, o);
}
function xt(e, t = !1) {
	let n = e.state.__activeStagePosition, r = e.state.activeElement, i = e.state.__overlaySvg;
	n && r && i && (t || i.closest(`dialog`)) && bt(e, n, r);
}
function St(e) {
	let t = e.state.activeElement;
	return t && (F(t) || R(t)) ? {
		padding: 0,
		radius: 0
	} : {
		padding: e.config.stagePadding || 0,
		radius: e.config.stageRadius || 0
	};
}
function Ct(e, t) {
	let n = ct(`driver-overlay driver-overlay-animated`, ut(t, St(e)), e.config.overlayColor || `rgb(0,0,0)`, `${e.config.overlayOpacity}`);
	return n.setAttribute(`version`, `1.1`), n.style.cssText += `clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;z-index:10000;position:fixed;top:0;left:0;width:100%;height:100%`, n.firstElementChild.style.cursor = `auto`, n;
}
function wt(e) {
	let t = e.state.__overlaySvg;
	t && (ae(t), De(t));
}
function Tt(e, t) {
	return w(e, t, `allowedElements`);
}
function Et(e) {
	return e ? typeof e == `function` ? Array.from(e() || []) : (Array.isArray(e) ? e : [e]).flatMap((e) => typeof e == `string` ? Array.from(document.querySelectorAll(e)) : e ? [e] : []) : [];
}
function Dt(e, t, n) {
	let r = Tt(e, t);
	if (!r) return;
	let i = /* @__PURE__ */ new Set(), a, o = () => {
		if (n.aborted) return;
		let t = new Set(Et(r));
		i.forEach((e) => {
			!t.has(e) && e.classList.contains(`driver-allowed-element`) && e.classList.remove(I);
		}), t.forEach((e) => {
			e.classList.contains(`driver-allowed-element`) || e.classList.add(I);
		}), i = t;
		let a = e.state.activeElement, o = !!a && !F(a) && R(a);
		a && o !== a.classList.contains(`driver-active-element-raised`) && (a.classList.toggle(L, o), xt(e, !0));
	}, s = () => {
		a === void 0 && (a = window.requestAnimationFrame(() => {
			a = void 0, o(), xt(e);
		}));
	}, c = new MutationObserver((e) => {
		let t = !1;
		e.forEach((e) => {
			let n = e.target;
			n.closest?.(`.driver-layer, .driver-overlay, .driver-popover`) || (t = !0, e.attributeName === `class` && i.has(n) && !n.classList.contains(`driver-allowed-element`) && n.classList.add(I));
		}), t && s();
	}), l = typeof r == `function` || [r].flat().some((e) => typeof e == `string`);
	o(), c.observe(document.body, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		...l ? {} : { attributeFilter: [`class`] }
	}), e.state.__syncAllowedElements = o, n.addEventListener(`abort`, () => {
		c.disconnect(), a !== void 0 && window.cancelAnimationFrame(a), i.forEach((e) => e.classList.remove(I)), e.state.__syncAllowedElements === o && (e.state.__syncAllowedElements = void 0);
	});
}
function Ot(e, t, n) {
	let r = document.activeElement;
	if (!r || r === document.body) return !1;
	let i = w(e, n, `disableActiveInteraction`) !== !0;
	return !F(t) && i && t.contains(r) ? !0 : Et(Tt(e, n)).some((e) => e.contains(r));
}
function kt(e) {
	if (e.state.__liveRegion) return;
	let t = document.createElement(`div`);
	t.className = `driver-live-region`, t.setAttribute(`aria-live`, `polite`), t.setAttribute(`aria-atomic`, `true`), t.style.cssText = `position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0`, document.body.appendChild(t), e.state.__liveRegion = t;
}
function At(e, t) {
	let n = e.state.__liveRegion, r = t.trim();
	!n || !r || e.state.__lastAnnouncement === r || (e.state.__lastAnnouncement = r, n.textContent = r);
}
function jt(e) {
	e.state.__liveRegion?.remove();
}
function Mt(e, t) {
	return !w(e, t, `skipMissingElement`) || !t.element ? !1 : !P(t.element);
}
function K(e, t, n) {
	let r = e.config.steps || [];
	for (let i = t; i >= 0 && i < r.length; i += n) if (!Mt(e, r[i])) return i;
}
function q(e, t) {
	let n = e.state.activeIndex;
	return n !== void 0 && K(e, n + t, t) === void 0;
}
function Nt(e, t) {
	let n = q(e, 1), r = t?.popover?.onDoneClick || e.config.onDoneClick;
	return n && r ? r : t?.popover?.onNextClick || e.config.onNextClick;
}
function Pt(e, t) {
	return t?.popover?.onPrevClick || e.config.onPrevClick;
}
function Ft(e, t) {
	return t?.popover?.onCloseClick || e.config.onCloseClick;
}
function It(e, t, n) {
	let r = (e.config.steps || []).length;
	return t.replace(`{{current}}`, `${n + 1}`).replace(`{{total}}`, `${r}`);
}
var Lt = [
	`next`,
	`previous`,
	`close`
];
function Rt(e, t) {
	return {
		index: t,
		hasNext: K(e, t + 1, 1) !== void 0,
		hasPrevious: K(e, t - 1, -1) !== void 0
	};
}
function zt(e, t = {}, n) {
	let r = e.config, i = t.showButtons || r.showButtons, a = r.progressText || `{{current}} of {{total}}`, o = {
		showProgress: t.showProgress ?? r.showProgress ?? !1,
		prevBtnText: t.prevBtnText ?? (r.prevBtnText || `Previous`),
		closeBtnLabel: t.closeBtnLabel ?? (r.closeBtnLabel || `Close`),
		popoverClass: t.popoverClass || r.popoverClass || ``
	};
	return n ? {
		...o,
		showButtons: Lt.filter((e) => (e !== `close` || r.allowClose) && (!i || i.includes(e))),
		disableButtons: [...r.disableButtons || [], ...n.hasPrevious ? [] : [`previous`]],
		progressText: It(e, t.progressText || a, n.index),
		nextBtnText: n.hasNext ? t.nextBtnText ?? (r.nextBtnText || `Next`) : t.doneBtnText || r.doneBtnText || `Done`
	} : {
		...o,
		showButtons: i || [],
		disableButtons: t.disableButtons || r.disableButtons || [],
		progressText: t.progressText ?? a,
		nextBtnText: t.nextBtnText ?? (r.nextBtnText || `Next`)
	};
}
function J(e, t) {
	let n = (e.config.steps || [])[t], r = n.popover || {}, i = Rt(e, t), a = zt(e, r, i);
	return {
		...n,
		popover: {
			showButtons: a.showButtons,
			nextBtnText: i.hasNext ? void 0 : a.nextBtnText,
			disableButtons: a.disableButtons,
			showProgress: a.showProgress,
			onNextClick: r.onNextClick || e.config.onNextClick || e.tour.moveNext,
			onPrevClick: Pt(e, n) || e.tour.movePrevious,
			onCloseClick: Ft(e, n) || e.tour.close,
			...r,
			progressText: a.progressText
		}
	};
}
function Y(e) {
	return !!e?.popover?.instruction && !Vt(e);
}
var Bt = /* @__PURE__ */ new WeakSet();
function Vt(e) {
	return !!e && Bt.has(e);
}
function Ht(e) {
	return Bt.add(e), e;
}
function Ut(e, t, n) {
	let r = e.config.stagePadding || 0;
	return {
		side: n.popover?.side || `bottom`,
		align: n.popover?.align || `start`,
		offset: r + (e.config.popoverOffset || 0),
		padding: r,
		centered: F(t),
		onPositioned: () => {
			let t = n.popover?.onPopoverPositioned || e.config.onPopoverPositioned;
			t && e.state.popover && t(e.state.popover, N(e));
		}
	};
}
function Wt(e, t) {
	let n = e.state.__activation;
	return n?.popoverPatch && n.step === t ? n.popoverPatch : void 0;
}
function Gt(e, t) {
	let n = Wt(e, t), r = {
		...t.popover,
		...n
	}, i = zt(e, r);
	return n?.popoverClass !== void 0 && (i.popoverClass = n.popoverClass), n?.progressText !== void 0 && (i.progressText = It(e, n.progressText, e.state.activeIndex ?? 0)), {
		popover: r,
		options: i
	};
}
function Kt(e, t) {
	let { showButtons: n, disableButtons: r } = t ? Gt(e, t).options : zt(e);
	return {
		showButtons: n,
		disableButtons: r
	};
}
function qt(e, t, n) {
	let { popover: r, options: i } = Gt(e, n), a = e.state.__activation, o = Y(n);
	return {
		...i,
		title: r.title,
		description: r.description,
		isGated: o,
		isDone: o && C(e, n),
		instruction: o || Vt(n) ? r.instruction : void 0,
		feedback: a?.step === n ? a.feedback : void 0,
		doneButton: q(e, 1),
		smoothScroll: e.config.smoothScroll,
		scrollIntoView: w(e, n, `scrollIntoView`),
		onNextClick: e.tour.pressNext,
		onPrevClick: e.tour.previous,
		onCloseClick: () => {
			e.state.__destroyReason = `close`;
			let r = Ft(e, n);
			return r ? r(e.state.activeElement ?? t, n, N(e)) : e.tour.requestClose();
		},
		onRender: (t) => {
			e.state.popover = t, (r.onPopoverRender || e.config.onPopoverRender)?.(t, N(e));
		},
		position: Ut(e, t, n)
	};
}
function Jt(e, t, n) {
	let r = !F(t) && w(e, n, `disableActiveInteraction`) !== !0;
	if (!(w(e, n, `focus`) !== `element` || !r)) return fe([t])[0];
}
function Yt(e, t, n) {
	Ot(e, t, n) || Jt(e, t, n)?.focus({ preventScroll: !0 });
}
function Xt(e, t, n) {
	at(e.state.popover);
	let r = Ot(e, t, n) || w(e, n, `focus`) === `none` || !!Jt(e, t, n), i = $e(t, {
		...qt(e, t, n),
		keepFocus: r
	});
	Qt(e), r && At(e, Zt(i).filter(Boolean).join(`. `));
}
function Zt(e) {
	return [
		e.title,
		e.description,
		e.instruction
	].map((e) => !e || e.style.display === `none` ? `` : e.textContent || ``);
}
function Qt(e) {
	d(e) && tn(e);
}
function $t(e, t, n) {
	let r = e.state.popover;
	r && (Qe(r, t, qt(e, t, n)), Qt(e));
}
function en(e, t, n) {
	let r = e.state.popover;
	r && Pe(r, t, Ut(e, t, n));
}
function tn(e) {
	let t = e.state.popover;
	!t || t.wrapper.style.display === `none` || (t.wrapper.classList.add(`driver-popover-waiting`), t.wrapper.setAttribute(`aria-busy`, `true`), U(t.nextButton, !0), U(t.previousButton, !0));
}
function nn(e, t, n) {
	let r = e.state.popover;
	!r || r.wrapper.style.display === `none` || (r.wrapper.classList.remove(`driver-popover-waiting`), r.wrapper.removeAttribute(`aria-busy`), t && n && $t(e, t, n));
}
function rn(e, t) {
	if (!ee(e, t)) return;
	let r = w(e, t.step, `advanceDelay`) ?? 0;
	if (r <= 0) {
		e.tour.next(), b(e, t);
		return;
	}
	y(t), e.tour.refreshPopover(), Y(t.step) && e.ui.announce(e, t.step.popover?.doneBtnText || e.config.doneBtnText || `Done`);
	let i = window.setTimeout(() => {
		n(e, t) && (e.tour.next(), b(e, t));
	}, r);
	t.controller.signal.addEventListener(`abort`, () => window.clearTimeout(i));
}
function an(e) {
	let t = h(e);
	return {
		element: t?.element ?? e.state.activeElement,
		step: t?.step ?? e.state.activeStep
	};
}
function on(e, t) {
	l(e, t), e.ui.showWaiting(e);
}
function sn(e, t, n, r) {
	let i = e.state.__activation, a = w(e, t, `onWaitingForElement`);
	if (!a || !i?.wait) return;
	i.waitController?.abort();
	let o = new AbortController();
	i.waitController = o, a(r, t, {
		...N(e),
		index: n,
		signal: o.signal
	});
}
function cn(e) {
	let t = an(e);
	u(e) && e.ui.hideWaiting(e, t.element, t.step);
}
function ln(e, t, n, r) {
	let i = e.state.__activation, a, o = () => {
		l.disconnect(), window.clearTimeout(u), a !== void 0 && window.cancelAnimationFrame(a);
	}, s = (t) => {
		o(), f(e), r(t), i && b(e, i);
	}, c = () => {
		a = void 0, P(t.element) && s(!0);
	}, l = new MutationObserver(() => {
		a ?? (a = window.requestAnimationFrame(c));
	}), u = Me(n) ? void 0 : window.setTimeout(() => s(!1), n);
	f(e, o), l.observe(document.documentElement, {
		childList: !0,
		subtree: !0,
		attributes: !0
	});
}
function un(e, t) {
	let r = J(e, t), i = dn(e, r), a = !!e.state.activeStep;
	if (i === `stay` || typeof i == `string` && !a) {
		e.tour.drive(t, !0);
		return;
	}
	let o = e.state.__activation;
	if (cn(e), typeof i == `string`) return;
	let s = i(void 0, r, {
		...N(e),
		index: t,
		cause: `timeout`
	}), c = !e.state.isInitialized || !n(e, o) || p(e);
	s === !1 || c || e.tour.drive(t, !0);
}
function dn(e, t) {
	return w(e, t, `onElementMissing`) ?? `stay`;
}
function fn(e, t) {
	let n = e.state.activeIndex;
	if (!n) return;
	let r = e.config.steps || [];
	for (let i = n - 1; t === `previousAction` && i >= 0; i--) {
		let t = r[i];
		if (Y(t) && t.element && P(t.element)?.isConnected) {
			e.tour.drive(i);
			return;
		}
	}
	e.tour.drive(n - 1);
}
function pn(e, t) {
	let { step: n } = t, { signal: r } = t.controller;
	if (!n.element) return;
	let i, a, o = !1, s = (n) => {
		window.clearTimeout(a), a = void 0, o = !1, e.ui.rebind(e, n), x(e, t) || cn(e);
	}, c = () => {
		let t = P(n.element);
		if (!t || !t.isConnected) return !1;
		let i = e.state.activeElement;
		s(t);
		let a = w(e, n, `onElementReplaced`);
		return a && t !== i && a(t, n, {
			...N(e),
			signal: r
		}), !0;
	}, l = (t) => {
		o = !0, cn(e);
		let r = dn(e, n);
		if (typeof r == `function`) {
			r(t, n, {
				...N(e),
				cause: `removed`
			});
			return;
		}
		r !== `stay` && fn(e, r);
	}, u = () => {
		i = void 0;
		let u = e.state.activeElement;
		if (r.aborted || !u || F(u)) return;
		if (u.isConnected) {
			(o || a !== void 0) && s(u);
			return;
		}
		if (S(e, t) || c() || o || a || dn(e, n) === `stay`) return;
		let d = w(e, n, `waitForRemovedElement`) ?? w(e, n, `waitForElement`) ?? 0;
		if (d <= 0) {
			l(u);
			return;
		}
		on(e, `missing`), a = Me(d) ? -1 : window.setTimeout(() => {
			a = void 0, !(r.aborted || S(e, t) || c()) && l(u);
		}, d), sn(e, n, e.state.activeIndex, u);
	}, d = () => {
		i === void 0 && (i = window.requestAnimationFrame(u));
	}, f = new MutationObserver(d);
	f.observe(document.documentElement, {
		childList: !0,
		subtree: !0
	}), t.recheck = d, r.addEventListener(`abort`, () => {
		f.disconnect(), window.clearTimeout(a), i !== void 0 && window.cancelAnimationFrame(i);
	});
}
function mn(e, t) {
	if (!t) return !1;
	let n = e.composedPath();
	return n.length > 0 ? n.includes(t) : e.target instanceof Node && t.contains(e.target);
}
function hn(e, t, n, r) {
	let { signal: i } = n.controller, { types: o, when: s } = O(t), c = () => D(e, n.step) && a(e), l = (t) => {
		let n = e.state.__advanceClick, r = t;
		return !n || r.detail < 2 || r.timeStamp - n.timeStamp > 500 ? !1 : Math.abs(r.clientX - n.clientX) < 8 && Math.abs(r.clientY - n.clientY) < 8;
	}, u = (e) => c() || l(e), d = (t) => {
		if (!s) return !0;
		let r = e.state.activeElement;
		return !!r && s(r, n.step, {
			...N(e),
			event: t
		});
	}, f, p, m = (t) => {
		f === t && (window.clearTimeout(p), f = void 0, p = void 0, v(n, !1), !i.aborted && (!e.consumed.has(t) && d(t) && (j(t.type) && (e.state.__advanceClick = t), r()), n.recheck?.()));
	}, h = (t) => {
		mn(t, e.state.activeElement) && (j(t.type) && u(t) || (f = t, v(n, !0), window.clearTimeout(p), p = window.setTimeout(() => m(t), 0)));
	};
	for (let e of o) window.addEventListener(e, h, {
		capture: !0,
		signal: i
	}), window.addEventListener(e, m, { signal: i });
	i.addEventListener(`abort`, () => window.clearTimeout(p));
}
var X;
function gn(i, a) {
	let o = te(i, a, {
		drive: C,
		next: c,
		moveNext: l,
		movePrevious: u,
		close: () => k(`close`),
		destroy: k,
		refreshPopover: x
	}), s = () => k(`replaced`, !1);
	function c() {
		let { element: e, step: t } = an(o), n = Nt(o, t);
		if (!t || !n) {
			Vt(t) || l();
			return;
		}
		q(o, 1) && (o.state.__destroyReason = `done`), n(e, t, N(o));
	}
	function l() {
		let e = o.state.activeIndex, t = o.config.steps || [];
		if (e === void 0) return;
		let n = e + 1;
		t[n] ? C(n) : k(`done`);
	}
	function u() {
		let e = o.state.activeIndex, t = o.config.steps || [];
		if (e === void 0) return;
		let n = e - 1;
		t[n] ? C(n) : k(`api`);
	}
	function f(e) {
		if (!(o.config.steps || [])[e]) {
			k(`api`);
			return;
		}
		S(), C(e);
	}
	function p() {
		let e = o.state.__activation;
		!e || d(o) || rn(o, e);
	}
	let _ = /* @__PURE__ */ new WeakSet();
	function v(e, t) {
		let { types: n } = O(t);
		if (!(a.blocksInteraction && w(o, e, `disableActiveInteraction`)) || !n.length || !n.every(j)) return;
		let r = o.state.activeIndex, i = r !== void 0 && o.config.steps?.[r] || e;
		if (_.has(i)) return;
		_.add(i);
		let s = r === void 0 ? `The highlight` : `Step ${r + 1}`;
		console.warn(`[driver.js] ${s} can't complete: disableActiveInteraction blocks its advanceOn events.`);
	}
	function ee(e) {
		if (!n(o, e)) return;
		let { step: t } = e;
		a.trackAllowed(o, t, e.controller.signal), pn(o, e);
		let r = E(o, t);
		v(t, r), r && hn(o, r, e, () => rn(o, e));
	}
	function y(e) {
		let t = o.state.__activation;
		t && (t.popoverPatch = e ? {
			...t.popoverPatch,
			...e
		} : void 0, x());
	}
	function b(e) {
		let t = o.state.__activation;
		!t || (t.feedback || ``) === e || (t.feedback = e, x(), a.announce(o, o.state.popover?.feedback?.textContent || ``));
	}
	function x() {
		a.refreshPopover(o);
	}
	function S() {
		o.state.isInitialized || (X && X !== s && X(), X = s, o.state.isInitialized = !0, a.mount(o));
	}
	function C(e = 0, t = !1) {
		m(o), o.state.__destroyReason = void 0;
		let n = o.config.steps;
		if (!n) {
			console.error(`No steps to drive through`), k(`api`);
			return;
		}
		if (!n[e]) {
			k(`api`);
			return;
		}
		let i = n[e], s = w(o, i, `waitForElement`) ?? 0;
		if (!t && s > 0 && i.element && !P(i.element)) {
			h(o)?.index === e ? on(o, `initial`) : o.state.activeStep ? on(o, `next`) : (a.endInitialWait(o), a.showInitialWait(o, e)), ln(o, i, s, (t) => {
				t ? C(e, !0) : un(o, e);
			}), sn(o, J(o, e), e);
			return;
		}
		if (a.endInitialWait(o), Mt(o, i)) {
			let t = o.state.activeIndex, r = typeof t == `number` && e < t ? -1 : 1;
			n[e + r] ? C(e + r) : r === 1 && k(`done`);
			return;
		}
		r(o, e, !1), T(J(o, e));
	}
	function T(t) {
		let n = e(o, t);
		a.highlight(o, t), ee(n);
	}
	function D() {
		X === s && (X = void 0), a.detach(o), m(o), t(o), a.unmount(o);
		let e = o.state;
		return o.state = {}, e;
	}
	function k(e, t = !0) {
		if (!o.state.isInitialized) return;
		e === `api` && (e = o.state.__destroyReason ?? `api`);
		let n = !!o.state.__activeElement || !!o.state.__activeStep, r = n ? o.state.__activeElement : o.state.activeElement, i = o.state.__activeStep ?? h(o)?.step ?? o.state.activeStep ?? o.state.__activation?.step, s = F(r) ? void 0 : r, c = document.activeElement, l = !c || c === document.body || o.state.popover?.wrapper.contains(c) ? o.state.__activeOnDestroyed : void 0, u = o.config.onDestroyStarted, d = g(o) ?? o.state.activeStep ?? o.state.__activation?.step;
		if (t && u && d) {
			o.state.__destroyReason = e, u(s, d, N(o, void 0, e));
			return;
		}
		let f = i?.onDeselected || o.config.onDeselected, p = o.config.onDestroyed, m = D();
		i && (n && f && f(s, i, N(o, m, e)), p?.(s, i, N(o, m, e))), l && a.restoreFocus(l);
	}
	let A = {
		isActive: () => o.state.isInitialized || !1,
		refresh: () => a.refresh(o),
		drive: (e = 0) => {
			S(), C(e);
		},
		setConfig: (e) => M(o, e),
		setSteps: (e) => {
			o.state.isInitialized ? D() : o.state = {}, M(o, {
				...o.config,
				steps: e
			});
		},
		getConfig: ((e) => e ? o.config[e] : o.config),
		getState: (e) => e ? o.state[e] : o.state,
		getActiveIndex: () => o.state.activeIndex,
		isFirstStep: () => q(o, -1),
		isLastStep: () => q(o, 1),
		getActiveStep: () => o.state.activeStep,
		getActiveElement: () => o.state.activeElement,
		getPreviousElement: () => o.state.previousElement,
		getPreviousStep: () => o.state.previousStep,
		getNextStep: () => {
			let e = o.config.steps || [], t = o.state.activeIndex;
			if (t === void 0) return;
			let n = K(o, t + 1, 1);
			return n === void 0 ? void 0 : e[n];
		},
		moveNext: l,
		movePrevious: u,
		moveTo: f,
		hasNextStep: () => o.state.activeIndex !== void 0 && !q(o, 1),
		hasPreviousStep: () => o.state.activeIndex !== void 0 && !q(o, -1),
		highlight: (e) => {
			S(), m(o), a.endInitialWait(o), o.state.__destroyReason = void 0, T(Ht({
				...e,
				popover: e.popover ? {
					showButtons: [],
					showProgress: !1,
					progressText: ``,
					...e.popover
				} : void 0
			}));
		},
		updatePopover: y,
		advance: p,
		nudge: (e) => {
			typeof e == `object` && y(e), b(typeof e == `string` ? e : ``), a.nudge(o);
		},
		destroy: () => {
			k(`api`, !1);
		}
	};
	return o.driver = A, A;
}
function _n(e, t, r) {
	let i = e.state.__activation, a = () => !n(e, i), o = e.state.__activeStep, s = e.state.__activeElement || (o ? void 0 : t), c = r.onHighlightStarted || e.config.onHighlightStarted, l = r.onHighlighted || e.config.onHighlighted, u = o?.onDeselected || e.config.onDeselected, d = i?.controller.signal, f = N(e);
	if (!(o && o !== r && u && (u(F(s) ? void 0 : s, o, f), a())) && !(c && (c(F(t) ? void 0 : t, r, {
		...f,
		signal: d
	}), a()))) return e.state.previousStep = o, e.state.previousElement = s, e.state.activeStep = r, e.state.activeElement = t, (n) => {
		e.state.__previousStep = o, e.state.__previousElement = s, e.state.__activeStep = r, e.state.__activeElement = n, l && l(F(t) ? void 0 : n, r, {
			...N(e),
			signal: d
		});
	};
}
function vn(e, t, n) {
	return (e.state.activeStep === t ? e.state.activeElement : void 0) || n;
}
var yn = {
	"aria-haspopup": `dialog`,
	"aria-expanded": `true`,
	"aria-controls": `driver-popover-content`
};
var bn = /* @__PURE__ */ new WeakSet();
function xn(e) {
	if (!(Object.keys(yn).some((t) => e.hasAttribute(t)) && !bn.has(e))) {
		for (let [t, n] of Object.entries(yn)) e.setAttribute(t, n);
		bn.add(e);
	}
}
function Sn(e) {
	if (bn.has(e)) {
		for (let [t, n] of Object.entries(yn)) e.getAttribute(t) === n && e.removeAttribute(t);
		bn.delete(e);
	}
}
function Cn() {
	let e = document.getElementById(oe);
	if (e) return e;
	let t = document.createElement(`div`);
	return t.id = oe, t.style.cssText = `width:0;height:0;pointer-events:none;opacity:0;position:fixed;top:50%;left:50%`, document.body.appendChild(t), t;
}
function wn(e, t) {
	let n = P(t.element);
	n || (n = Cn()), On(e, n, t);
}
function Tn(e, t) {
	let n = e.state.__resizeObserver;
	n?.disconnect(), t && n?.observe(t);
}
function En(e) {
	let t = e.state.__activeElement, n = e.state.__activeStep;
	if (!(!t || !n)) {
		if (a(e)) {
			c(e), ht(e);
			return;
		}
		e.state.__syncAllowedElements?.(), Dn(e, t), mt(e, t), ht(e), en(e, t, n);
	}
}
function Dn(e, t) {
	let n = e.state.popover?.wrapper;
	n && ke(n, t);
}
function On(e, t, n) {
	Tn(e);
	let r = e.config.duration || 400, a = Date.now(), c = e.config.animate, l = _n(e, t, n);
	if (!l) return;
	let u = e.state.previousElement || t, d = u !== t && c, f = !1;
	ze(e.state.popover);
	let p = () => {
		if (!o(e, p)) return;
		let i = Date.now() - a, c = r - i <= r / 2, m = vn(e, n, t);
		if (n.popover && c && !f && d && (Xt(e, m, n), f = !0), e.config.animate && i < r) pt(e, i, r, u, m);
		else {
			if (mt(e, m), l(m), !o(e, p)) return;
			Yt(e, m, n);
			let t = s(e);
			Tn(e, m), t && En(e);
			return;
		}
		window.requestAnimationFrame(p);
	};
	i(e, p), window.requestAnimationFrame(p), Nn(e);
	let m = w(e, n, `scrollIntoView`);
	m !== !1 && pe(t, e.config.smoothScroll, typeof m == `object` ? m : void 0), !d && n.popover && Xt(e, t, n), Mn(e), Pn(e, t, n);
}
var kn = /* @__PURE__ */ new WeakMap();
function An(e, t) {
	kn.get(e)?.disconnect();
	let n = new MutationObserver(() => {
		let n = t().filter((t) => !e.classList.contains(t));
		n.length > 0 && e.classList.add(...n);
	});
	n.observe(e, {
		attributes: !0,
		attributeFilter: [`class`]
	}), kn.set(e, n);
}
function jn(e) {
	kn.get(e)?.disconnect(), kn.delete(e), e.classList.remove(`driver-active-element`, `driver-no-interaction`, L), Sn(e);
}
function Mn(e) {
	let t = e.state.__marked?.element;
	(/* @__PURE__ */ new Set([t, ...document.querySelectorAll(`.driver-active-element`)])).forEach((e) => {
		e && jn(e);
	});
}
function Nn(e) {
	let t = e.state.__marked?.parent;
	(/* @__PURE__ */ new Set([t, ...document.querySelectorAll(`.driver-active-element-parent`)])).forEach((e) => {
		e?.classList.remove(`driver-active-element-parent`, `driver-active-element-parent-no-scroll`);
	});
}
function Pn(e, t, n) {
	document.body.classList.toggle(se, !!w(e, n, `allowPageInteraction`));
	let r = w(e, n, `disableActiveInteraction`) === !0;
	r && t.classList.add(`driver-no-interaction`);
	let i = t.parentElement, a = i && i !== document.body ? i : void 0;
	a && (a.classList.add(`driver-active-element-parent`), ce(a) && a.classList.add(`driver-active-element-parent-no-scroll`)), e.state.__marked = {
		element: t,
		parent: a
	}, t.classList.add(`driver-active-element`), F(t) || (xn(t), t.classList.toggle(L, R(t)), An(t, () => [
		`driver-active-element`,
		...r ? [`driver-no-interaction`] : [],
		...R(t) ? [L] : []
	]));
}
function Fn() {
	document.getElementById(oe)?.remove();
}
function In(e) {
	Fn(), Nn(e), Mn(e);
}
function Ln(e, t) {
	let n = e.state.activeStep;
	n && (Nn(e), Mn(e), Pn(e, t, n), e.state.activeElement = t, e.state.__activeElement = t, Tn(e, t), Dn(e, t), mt(e, t), en(e, t, n));
}
function Rn(e, t) {
	let n = e.state.activeElement;
	return !F(n) && !!n && t.includes(n);
}
function zn(e, t) {
	let n = e.state.popover?.wrapper;
	return n && t.includes(n) ? `popover` : Rn(e, t) ? `element` : e.ui.isAllowed(e, t) ? `allowed` : `outside`;
}
function Bn(e) {
	let t = [];
	for (let n = e; n;) t.push(n), n = n.parentNode || (n instanceof ShadowRoot ? n.host : null);
	return t;
}
var Vn = /* @__PURE__ */ new Set([
	`pointerdown`,
	`mousedown`,
	`pointerup`,
	`mouseup`
]);
var Hn = [
	`click`,
	`auxclick`,
	`contextmenu`,
	`dblclick`
];
function Un(e) {
	if (e instanceof MouseEvent) return Vn.has(e.type) ? `press${e.button}` : Hn.includes(e.type) ? e.type : void 0;
}
function Wn(e, t) {
	let { types: n, strict: r } = O(E(e, t));
	if (!(!r || !n.length)) return n.every(j) ? n : void 0;
}
function Gn(e, t) {
	let n = e.state.activeStep, r = Un(t);
	if (!n || !r || !Rn(e, t.composedPath())) return;
	if (e.ui.blocksInteraction && w(e, n, `disableActiveInteraction`)) return `disabled`;
	let i = Wn(e, n);
	if (!(!i || i.some((e) => A[e].includes(r)))) return `strict`;
}
function Kn(e) {
	return e.isTrusted;
}
var qn = [
	`pointerdown`,
	`mousedown`,
	`touchstart`
];
var Jn = [
	`pointerup`,
	`mouseup`,
	`touchend`
];
var Yn = /* @__PURE__ */ new Set([`touchstart`, `touchend`]);
var Xn = /* @__PURE__ */ new Set([
	`pointerdown`,
	`mousedown`,
	`pointerup`,
	`mouseup`,
	`click`
]);
function Zn(e, t) {
	t.preventDefault(), t.stopImmediatePropagation(), e.consumed.add(t);
}
function Qn(e, t) {
	if (!e.ui.blocksInteraction || T(e)) return;
	let n = t.composedPath();
	if (zn(e, n) !== `outside`) return;
	let r = n[0];
	if (r === document.body || r === document.documentElement) return `root`;
	let i = e.state.__overlaySvg;
	if (i && n.includes(i)) return `overlay`;
}
function $n(e) {
	Xn.has(e.type) && e.preventDefault(), e.stopImmediatePropagation();
}
function er(e, t) {
	if (!e.state.isInitialized) return;
	let n = e.state.activeStep, r = w(e, n, `onInteraction`);
	if (!n || !r || t.type === `auxclick` && t.button === 2) return;
	let i = zn(e, t.composedPath());
	if (i === `popover`) return;
	let a = e.state.activeElement;
	r(F(a) ? void 0 : a, n, {
		...N(e),
		event: t,
		region: i
	}) === !1 && Zn(e, t);
}
function tr(e) {
	let t = new AbortController(), n = !1, r = (t) => {
		!e.state.isInitialized || !Kn(t) || (n = !!Qn(e, t), (n || Gn(e, t)) && $n(t));
	}, i = (t) => {
		!e.state.isInitialized || !Kn(t) || (n && Qn(e, t) || Gn(e, t)) && $n(t);
	}, a = (t) => {
		if (er(e, t), !e.state.isInitialized || e.consumed.has(t) || !Kn(t)) return;
		let r = t.type === `dblclick` || t.type === `auxclick` && t.button === 2;
		if (n && Qn(e, t) === `root`) {
			$n(t), Y(e.state.activeStep) && !r && e.ui.nudge(e);
			return;
		}
		let i = Gn(e, t);
		i && (Zn(e, t), i === `strict` && !r && e.ui.nudge(e));
	}, o = (e, n) => {
		window.addEventListener(e, n, {
			capture: !0,
			passive: Yn.has(e) || void 0,
			signal: t.signal
		});
	};
	return qn.forEach((e) => o(e, r)), Jn.forEach((e) => o(e, i)), Hn.forEach((e) => o(e, a)), () => t.abort();
}
function nr(e, t) {
	let n = zn(e, t);
	return n === `element` || n === `allowed` || n === `outside` && T(e);
}
function rr(e, t) {
	return Ae(t[0]) && nr(e, t);
}
function ir(e) {
	return rr(e, Bn(document.activeElement));
}
function Z(e) {
	return e.code || e.key;
}
function ar(e) {
	let t = e.state.__handledKeys;
	return t || (t = /* @__PURE__ */ new Set(), e.state.__handledKeys = t), t;
}
function or(e, t) {
	let n = e.state.__pressedKeys, r = Z(t);
	return n?.has(r) ? n.get(r) !== e.state.__activation : t.repeat;
}
function sr(e) {
	let t = new AbortController(), n = /* @__PURE__ */ new Map();
	e.state.__pressedKeys = n;
	let r = (t) => {
		let r = t;
		r.type === `keydown` && !r.repeat && n.set(Z(r), e.state.__activation);
		let i = e.state.popover?.wrapper;
		i && r.composedPath().includes(i) && or(e, r) && r.preventDefault();
	};
	return [
		`keydown`,
		`keypress`,
		`keyup`
	].forEach((e) => window.addEventListener(e, r, {
		capture: !0,
		signal: t.signal
	})), window.addEventListener(`blur`, () => {
		e.state.__widgetKey = void 0, n.clear();
	}, { signal: t.signal }), () => t.abort();
}
function Q(e) {
	let t = e.state.__resizeTimeout;
	t && window.cancelAnimationFrame(t), e.state.__resizeTimeout = window.requestAnimationFrame(() => En(e));
}
function cr(e) {
	let t = e.state.__activeElement?.getBoundingClientRect();
	!t || t.width === 0 && t.height === 0 || Q(e);
}
function lr(e, t) {
	if (!e.state.isInitialized || !(t.key === `Tab` || t.keyCode === 9) || T(e)) return;
	let n = e.state.__activeElement, r = e.state.popover?.wrapper, i = [...new Set(fe([
		...r ? [r] : [],
		...n ? [n] : [],
		...Array.from(document.querySelectorAll(`.${I}`))
	]))], a = i[0], o = i[i.length - 1];
	t.preventDefault(), t.shiftKey ? (i[i.indexOf(document.activeElement) - 1] || o)?.focus() : (i[i.indexOf(document.activeElement) + 1] || a)?.focus();
}
function ur(e, t) {
	ar(e).add(Z(t)), (rr(e, t.composedPath()) || ir(e)) && (e.state.__widgetKey = Z(t));
}
function dr(e, t) {
	let n = Z(t);
	!t.defaultPrevented && e.state.__widgetKey !== n && ar(e).delete(n);
}
function fr(e, t) {
	let n = e.config.allowKeyboardControl ?? !0, r = ar(e).delete(Z(t)), i = or(e, t);
	e.state.__pressedKeys?.delete(Z(t)), e.state.__widgetKey === Z(t) && (e.state.__widgetKey = void 0), !(!n || r || i || ir(e)) && (t.key === `Escape` ? e.tour.escape() : t.key === `ArrowRight` ? e.tour.arrowRight() : t.key === `ArrowLeft` && e.tour.arrowLeft());
}
function pr(e) {
	if (e.state.__events) return;
	let t = (t) => fr(e, t), n = (t) => {
		dr(e, t), lr(e, t);
	}, r = (t) => ur(e, t), i = () => Q(e), a = (t) => {
		t.target instanceof Node && e.state.popover?.wrapper.contains(t.target) || Q(e);
	};
	e.state.__events = {
		onKeyup: t,
		onKeydown: n,
		onKeydownCapture: r,
		onResize: i,
		onScroll: a
	}, typeof ResizeObserver < `u` && (e.state.__resizeObserver = new ResizeObserver(() => cr(e)));
	let o = new MutationObserver(() => Q(e));
	o.observe(document.documentElement, {
		attributes: !0,
		attributeFilter: [`open`],
		subtree: !0
	}), e.state.__openObserver = o;
	let s = tr(e), c = sr(e);
	e.state.__teardownGate = () => {
		s(), c();
	}, window.addEventListener(`keydown`, r, !0), window.addEventListener(`keyup`, t, !1), window.addEventListener(`keydown`, n, !1), window.addEventListener(`resize`, i), window.addEventListener(`scroll`, a, !0), document.addEventListener(`close`, i, !0);
}
function mr(e) {
	let t = e.state.__events;
	t && (window.removeEventListener(`keyup`, t.onKeyup), window.removeEventListener(`keydown`, t.onKeydown), window.removeEventListener(`keydown`, t.onKeydownCapture, !0), e.state.__teardownGate?.(), e.state.__resizeObserver?.disconnect(), e.state.__openObserver?.disconnect(), window.removeEventListener(`resize`, t.onResize), document.removeEventListener(`close`, t.onResize, !0), window.removeEventListener(`scroll`, t.onScroll, !0));
}
function hr(e) {
	let t = e.state.__activation?.step ?? g(e);
	return !d(e) && !Y(t);
}
function gr(e) {
	let t = e.state.__activation;
	return Y(t?.step ?? g(e)) ? (!(t && C(e, t.step)) && !d(e) && e.ui.nudge(e), !0) : !1;
}
function _r(e, t) {
	if (t === `previous` && d(e) || t === `next` && !hr(e)) return !1;
	let n = Kt(e, g(e));
	return n.showButtons.includes(t) && !n.disableButtons.includes(t);
}
function vr(e, t = `close`) {
	e.config.allowClose && e.tour.destroy(t);
}
function yr(e) {
	Kt(e, g(e)).disableButtons.includes(`close`) || vr(e, `escape`);
}
function br(e) {
	gr(e) || e.tour.next();
}
function xr(e) {
	let { element: t, step: n } = an(e), r = Pt(e, n);
	if (!n || !r) {
		Vt(n) || e.tour.movePrevious();
		return;
	}
	r(t, n, N(e));
}
function Sr(e) {
	let t = e.config.overlayClickBehavior;
	if (!(typeof t != `function` && t !== `none` && gr(e))) {
		if (e.config.allowClose && t === `close`) {
			e.tour.destroy(`overlay`);
			return;
		}
		if (typeof t == `function`) {
			e.state.__destroyReason = `overlay`;
			let n = g(e) ?? e.state.activeStep;
			n && t(e.state.__activeElement, n, N(e));
			return;
		}
		t === `nextStep` && hr(e) && e.tour.next();
	}
}
function Cr(e) {
	let t = e.state.activeIndex;
	a(e) || t === void 0 || !e.state.__activeStep || !(e.config.steps || [])[t - 1] || !_r(e, `previous`) || xr(e);
}
function wr(e) {
	let t = e.state.activeIndex !== void 0 && !!g(e);
	a(e) || !t || gr(e) || !_r(e, `next`) || e.tour.next();
}
function Tr(e) {
	return {
		pressNext: () => br(e),
		previous: () => xr(e),
		requestClose: () => vr(e),
		overlayClick: () => Sr(e),
		escape: () => yr(e),
		arrowLeft: () => Cr(e),
		arrowRight: () => wr(e)
	};
}
var Er = `driver-popover-nudge`;
var $ = /* @__PURE__ */ new WeakMap();
function Dr() {
	let e = getComputedStyle(document.documentElement).getPropertyValue(`--driver-nudge-duration`).trim(), t = parseFloat(e);
	return Number.isNaN(t) ? 500 : e.endsWith(`ms`) || !e.endsWith(`s`) ? t : t * 1e3;
}
function Or(e, t) {
	window.clearTimeout($.get(e));
	let n = () => {
		window.clearTimeout($.get(e)), $.delete(e), e.removeEventListener(`animationend`, r), t();
	}, r = (e) => {
		let t = e.animationName;
		t && !t.startsWith(`driver-nudge`) || n();
	};
	e.addEventListener(`animationend`, r), $.set(e, window.setTimeout(n, Dr() + 150));
}
function kr(e) {
	e.classList.remove(Er), e.offsetWidth, e.classList.add(Er);
}
function Ar(e) {
	let t = e.state.popover?.wrapper;
	!e.state.isInitialized || !t || !t.isConnected || t.style.display === `none` || (kr(t), Or(t, () => t.classList.remove(Er)));
}
function jr(e) {
	document.body.classList.add(`driver-active`, e.config.animate ? `driver-fade` : `driver-simple`), e.config.allowScroll || document.body.classList.add(`driver-no-scroll`), document.body.style.setProperty(`--driver-animation-duration`, `${e.config.duration || 400}ms`), pr(e), kt(e);
}
function Mr() {
	document.body.classList.remove(`driver-active`, `driver-fade`, `driver-simple`, `driver-no-scroll`, se), document.body.style.removeProperty(`--driver-animation-duration`);
}
function Nr(e) {
	mr(e), jt(e), at(e.state.popover), In(e), wt(e);
}
function Pr(t, n) {
	let i = J(t, n);
	if (!i.popover) return;
	let a = Cn();
	r(t, n, !0), e(t, i, {
		element: a,
		index: n
	}), Xt(t, a, i), on(t, `initial`);
}
function Fr(e) {
	_(e) && (at(e.state.popover), e.state.popover = void 0, Fn());
}
function Ir(e) {
	let t = e.state.__activation;
	if (!t) return;
	let n = e.state.popover, { element: r, step: i } = an(e);
	if (!n || !r || i !== t.step || n.wrapper.style.display === `none` || !n.wrapper.isConnected) return;
	let a = Zt(n);
	$t(e, r, t.step), At(e, Zt(n).filter((e, t) => e && e !== a[t]).join(`. `));
}
var Lr = {
	blocksInteraction: !0,
	controls: Tr,
	mount: jr,
	detach: Mr,
	unmount: Nr,
	highlight: wn,
	rebind: Ln,
	refresh: Q,
	trackAllowed: Dt,
	isAllowed: (e, t) => t.some((e) => e instanceof Element && e.classList.contains(`driver-allowed-element`)),
	showWaiting: tn,
	hideWaiting: nn,
	showInitialWait: Pr,
	endInitialWait: Fr,
	refreshPopover: Ir,
	nudge: Ar,
	announce: At,
	restoreFocus: (e) => e.focus()
};
function Rr(e = {}) {
	return gn(e, Lr);
}
// src/services/tourService.ts
var STORAGE_PREFIX = "dash-learning:tour-seen:";
var LocalStorageTourService = class {
	async hasSeenTour(tourId) {
		try {
			return localStorage.getItem(STORAGE_PREFIX + tourId) === "true";
		} catch {
			return false;
		}
	}
	async markTourSeen(tourId) {
		try {
			localStorage.setItem(STORAGE_PREFIX + tourId, "true");
		} catch {}
	}
	async resetTour(tourId) {
		try {
			localStorage.removeItem(STORAGE_PREFIX + tourId);
		} catch {}
	}
};
var tourService = new LocalStorageTourService();
// src/hooks/useGuidedTour.ts
var { useCallback, useEffect, useRef } = await importShared("react");
function useGuidedTour({ tourId, steps, autoStart = true, service = tourService }) {
	const driverRef = useRef(null);
	const startTour = useCallback(() => {
		driverRef.current?.destroy();
		const availableSteps = steps.filter((step) => typeof step.element !== "string" || document.querySelector(step.element));
		if (availableSteps.length === 0) return;
		const instance = Rr({
			showProgress: true,
			allowClose: true,
			nextBtnText: "Weiter",
			prevBtnText: "Zurück",
			doneBtnText: "Fertig",
			progressText: "{{current}} von {{total}}",
			steps: availableSteps,
			onDestroyed: () => {
				service.markTourSeen(tourId);
				driverRef.current = null;
			}
		});
		driverRef.current = instance;
		instance.drive();
	}, [
		service,
		steps,
		tourId
	]);
	useEffect(() => {
		if (!autoStart) return;
		let cancelled = false;
		let timer;
		service.hasSeenTour(tourId).then((seen) => {
			if (cancelled || seen) return;
			timer = window.setTimeout(startTour, 300);
		}).catch(() => {});
		return () => {
			cancelled = true;
			window.clearTimeout(timer);
		};
	}, [
		autoStart,
		service,
		startTour,
		tourId
	]);
	useEffect(() => () => driverRef.current?.destroy(), []);
	return { startTour };
}
// src/tours/retentionTour.ts
var RETENTION_TOUR_ID = "retention-page";
var retentionTourSteps = [
	{
		element: "[data-tour=\"retention-header\"]",
		popover: {
			title: "Willkommen",
			description: "Diese App zeigt Klassenwiederholungen nach Schulart und Schuljahr. Wir führen Sie kurz durch die wichtigsten Bereiche.",
			side: "bottom",
			align: "start"
		}
	},
	{
		element: "[data-tour=\"retention-year-select\"]",
		popover: {
			title: "Schuljahr wählen",
			description: "Wählen Sie hier das Schuljahr. Diagramm, Interpretation und Trends werden automatisch aktualisiert.",
			side: "bottom",
			align: "start"
		}
	},
	{
		element: "[data-tour=\"retention-chart\"]",
		popover: {
			title: "Wiederholungsquoten",
			description: "Das Balkendiagramm zeigt den Anteil der Schülerinnen und Schüler, die eine Klasse wiederholen – je Schulart.",
			side: "right",
			align: "center"
		}
	},
	{
		element: "[data-tour=\"retention-legend\"]",
		popover: {
			title: "Legende",
			description: "Die Farben kennzeichnen die einzelnen Schularten.",
			side: "top",
			align: "start"
		}
	},
	{
		element: "[data-tour=\"retention-interpretation\"]",
		popover: {
			title: "Interpretation",
			description: "Unter „Befund“ finden Sie die Einordnung der Zahlen, unter „Hinweis“ Hintergründe und empfohlene Maßnahmen.",
			side: "left",
			align: "start"
		}
	},
	{
		element: "[data-tour=\"retention-trend\"]",
		popover: {
			title: "Trend zum Vorjahr",
			description: "Veränderung der Wiederholungsquote gegenüber dem Vorjahr in Prozentpunkten. Für 2022/23 liegt kein Vorjahr vor.",
			side: "top",
			align: "start"
		}
	}
];
// src/pages/RetentionPage.tsx
var { memo, useState } = await importShared("react");
var SCHOOL_TYPE_LABELS = {
	GS: "Grundschulen",
	MS: "Mittelschulen",
	RS: "Realschulen",
	GY: "Gymnasien",
	IGS: "Int. Gesamtschulen"
};
var SCHOOL_TYPE_COLORS = {
	GS: "#264653",
	MS: "#2a9d8f",
	RS: "#e9c46a",
	GY: "#f4a261",
	IGS: "#e76f51"
};
var SCHOOL_TYPES = [
	"GS",
	"MS",
	"RS",
	"GY",
	"IGS"
];
var DATA_BY_YEAR = {
	"2022/23": [
		{
			type: "GS",
			count: 150,
			percent: 8.5
		},
		{
			type: "MS",
			count: 95,
			percent: 6.2
		},
		{
			type: "RS",
			count: 45,
			percent: 3.8
		},
		{
			type: "GY",
			count: 22,
			percent: 1.5
		},
		{
			type: "IGS",
			count: 18,
			percent: 2.1
		}
	],
	"2023/24": [
		{
			type: "GS",
			count: 165,
			percent: 9.2
		},
		{
			type: "MS",
			count: 102,
			percent: 6.8
		},
		{
			type: "RS",
			count: 52,
			percent: 4.1
		},
		{
			type: "GY",
			count: 25,
			percent: 1.8
		},
		{
			type: "IGS",
			count: 20,
			percent: 2.3
		}
	],
	"2024/25": [
		{
			type: "GS",
			count: 172,
			percent: 9.8
		},
		{
			type: "MS",
			count: 108,
			percent: 7.1
		},
		{
			type: "RS",
			count: 58,
			percent: 4.5
		},
		{
			type: "GY",
			count: 28,
			percent: 2
		},
		{
			type: "IGS",
			count: 22,
			percent: 2.6
		}
	]
};
function RetentionPageComponent() {
	const [selectedYear, setSelectedYear] = useState("2024/25");
	const [activeTab, setActiveTab] = useState("befund");
	const { startTour } = useGuidedTour({
		tourId: RETENTION_TOUR_ID,
		steps: retentionTourSteps
	});
	const yearData = DATA_BY_YEAR[selectedYear];
	const getPreviousYear = (year) => {
		return {
			"2022/23": null,
			"2023/24": "2022/23",
			"2024/25": "2023/24"
		}[year];
	};
	const calculateYoYChange = (schoolType) => {
		const prevYear = getPreviousYear(selectedYear);
		if (!prevYear) return null;
		const currentData = DATA_BY_YEAR[selectedYear].find((d) => d.type === schoolType);
		const previousData = DATA_BY_YEAR[prevYear].find((d) => d.type === schoolType);
		if (!currentData || !previousData) return null;
		return currentData.percent - previousData.percent;
	};
	const yoyChanges = SCHOOL_TYPES.map((schoolType) => ({
		type: schoolType,
		change: calculateYoYChange(schoolType)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mfe-academy-retention mfe-academy-retention__page-wrapper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "mfe-academy-retention__page-header",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mfe-academy-retention__page-header-content mfe-academy-retention__page-header-content--with-actions",
				"data-tour": "retention-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mfe-academy-retention__page-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mfe-academy-retention__page-title",
						children: "Klassenwiederholungs App"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mfe-academy-retention__page-description",
						children: "Analyse der Schülerwiederholungen nach Schulart und Schuljahr"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "mfe-academy-retention__tour-button",
					onClick: startTour,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, {
						size: 16,
						"aria-hidden": "true"
					}), "Tour starten"]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mfe-academy-retention__page-content",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mfe-academy-retention__explorer-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mfe-academy-retention__explorer-left",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mfe-academy-retention__chart-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mfe-academy-retention__card-heading" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mfe-academy-retention__controls-section",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mfe-academy-retention__control-group",
									"data-tour": "retention-year-select",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "year-select",
										className: "mfe-academy-retention__control-label",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Schuljahr wählen:" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: "year-select",
										value: selectedYear,
										onChange: (e) => setSelectedYear(e.target.value),
										className: "mfe-academy-retention__control-select",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "2022/23",
												children: "2022/23"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "2023/24",
												children: "2023/24"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "2024/25",
												children: "2024/25"
											})
										]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mfe-academy-retention__chart-frame",
								"data-tour": "retention-chart",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarPlot, {
									data: yearData,
									year: selectedYear
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mfe-academy-retention__chart-legend",
								"data-tour": "retention-legend",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mfe-academy-retention__legend-label",
									children: "Schularten"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mfe-academy-retention__legend-list",
									children: SCHOOL_TYPES.map((schoolType) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mfe-academy-retention__legend-swatch",
											style: { backgroundColor: SCHOOL_TYPE_COLORS[schoolType] }
										}),
										schoolType,
										" (",
										SCHOOL_TYPE_LABELS[schoolType],
										")"
									] }, schoolType))
								})]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mfe-academy-retention__explorer-right",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mfe-academy-retention__story-card mfe-academy-retention__story-card--tall",
						"data-tour": "retention-interpretation",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mfe-academy-retention__story-header",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mfe-academy-retention__story-heading",
									children: "Interpretation"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mfe-academy-retention__story-tabs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: `mfe-academy-retention__story-tab ${activeTab === "befund" ? "mfe-academy-retention__story-tab--active" : ""}`,
									onClick: () => setActiveTab("befund"),
									type: "button",
									children: "Befund"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: `mfe-academy-retention__story-tab ${activeTab === "hinweis" ? "mfe-academy-retention__story-tab--active" : ""}`,
									onClick: () => setActiveTab("hinweis"),
									type: "button",
									children: "Hinweis"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mfe-academy-retention__story-content",
								children: [activeTab === "befund" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mfe-academy-retention__story-text",
									children: "Wie unterscheiden sich Schularten nach Wiederholungsquoten? Das Balkendiagramm zeigt die Anteile der Schülerinnen und Schüler, die in verschiedenen Schultypen in Bayern Klassen wiederholen."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "mfe-academy-retention__story-text",
									style: { paddingLeft: "1.5rem" },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Grundschulen (GS):" }),
											" Mit ",
											yearData[0]?.percent,
											"% die höchste Wiederholungsquote aller Schularten. Dies deutet darauf hin, dass Grundschüler häufiger Schwierigkeiten in den Grundkompetenzen haben."
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Mittelschulen (MS):" }),
											" Mit ",
											yearData[1]?.percent,
											"% deutlich niedriger als Grundschulen, aber noch erheblich höher als an Gymnasien. Ein moderater Anteil der Schüler wiederholt."
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Realschulen (RS):" }),
											" Mit ",
											yearData[2]?.percent,
											"% zeigt sich ein moderater Wiederholungsanteil zwischen Mittel- und Gymnasialbereich."
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Gymnasien (GY):" }),
											" Mit ",
											yearData[3]?.percent,
											"% die niedrigste Wiederholungsquote. Gymnasien haben eine Selektionsfunktion bei der Aufnahme."
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Integrierte Gesamtschulen (IGS):" }),
											" Mit",
											" ",
											yearData[4]?.percent,
											"% ein niedriger Wiederholungsanteil ähnlich wie Gymnasien."
										] })
									]
								})] }), activeTab === "hinweis" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mfe-academy-retention__story-text mfe-academy-retention__story-text--italic",
										children: "Betroffene Kinder erleben häufiger Leistungsängste, geringeres Selbstvertrauen sowie ein erhöhtes Risiko für Schulabbrüche. Hohe Wiederholungsquoten können daher ein Hinweis darauf sein, dass bestehende Leistungsanforderungen nicht ausreichend durch präventive Förderung, individualisierte Unterstützung und adaptive Lernangebote abgefedert werden."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mfe-academy-retention__story-text",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Empfohlene Maßnahmen:" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
										className: "mfe-academy-retention__story-text",
										style: { paddingLeft: "1.5rem" },
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Frühe Identifikation von Schülerinnen und Schülern mit Lernrückständen" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Individualisierte Förderung und spezialisierte Unterstützung" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Zusammenarbeit zwischen Schulen, Familien und Fachleuten" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Prävention durch adaptive Unterrichtsgestaltung" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Regelmäßige Fortbildungen für Lehrkräfte im Umgang mit heterogenen Lerngruppen" })
										]
									})
								] })]
							})
						]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mfe-academy-retention__stats-section",
				"data-tour": "retention-trend",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mfe-academy-retention__stats-header",
					children: "Trend im Vergleich zum Vorjahr"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mfe-academy-retention__stats-row",
					"aria-label": "Veränderungen zum Vorjahr",
					children: yoyChanges.map(({ type, change }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mfe-academy-retention__stat-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mfe-academy-retention__stat-type",
							children: type
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: change === null ? "" : change > 0 ? "mfe-academy-retention__stat-increase" : change < 0 ? "mfe-academy-retention__stat-decrease" : "",
							children: change === null ? "N/A" : `${change > 0 ? "+" : ""}${change.toFixed(1)}%`
						})]
					}, type))
				})]
			})]
		})]
	});
}
var RetentionPage_default = memo(RetentionPageComponent);
// src/app/router.tsx
var routes = [{
	path: "/",
	element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLayout, {}),
	children: [
		{
			index: true,
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingPage, {})
		},
		{
			path: "learning-path",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearningPathPage, {})
		},
		{
			path: "modules/:moduleId",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModulePage, {})
		},
		{
			path: "lessons/:lessonId",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonPage, {})
		},
		{
			path: "settings",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPage, {})
		},
		{
			path: "retention",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetentionPage_default, {})
		}
	]
}];
export { createMemoryRouter as i, RouterProvider2 as n, createBrowserRouter as r, routes as t };
