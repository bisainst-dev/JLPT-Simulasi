"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5CVibe%20Coding%5CJLPT%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CVibe%20Coding%5CJLPT&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5CVibe%20Coding%5CJLPT%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CVibe%20Coding%5CJLPT&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_Vibe_Coding_JLPT_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./src/app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"D:\\\\Vibe Coding\\\\JLPT\\\\src\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_Vibe_Coding_JLPT_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDVmliZSUyMENvZGluZyU1Q0pMUFQlNUNzcmMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUQlM0ElNUNWaWJlJTIwQ29kaW5nJTVDSkxQVCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDbUI7QUFDaEc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qbHB0LXNpbXVsYXRpb24tYXBwLz8zNjI2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkQ6XFxcXFZpYmUgQ29kaW5nXFxcXEpMUFRcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkQ6XFxcXFZpYmUgQ29kaW5nXFxcXEpMUFRcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5CVibe%20Coding%5CJLPT%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CVibe%20Coding%5CJLPT&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/[...nextauth]/route.ts":
/*!*************************************************!*\
  !*** ./src/app/api/auth/[...nextauth]/route.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./src/lib/auth.ts\");\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBaUM7QUFDUTtBQUV6QyxNQUFNRSxVQUFVRixnREFBUUEsQ0FBQ0Msa0RBQVdBO0FBRU8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qbHB0LXNpbXVsYXRpb24tYXBwLy4vc3JjL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLnRzPzAwOTgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gJ25leHQtYXV0aCc7XG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gJ0AvbGliL2F1dGgnO1xuXG5jb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpO1xuXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH07XG4iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJhdXRoT3B0aW9ucyIsImhhbmRsZXIiLCJHRVQiLCJQT1NUIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/auth.ts":
/*!*************************!*\
  !*** ./src/lib/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst authOptions = {\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60\n    },\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                },\n                impersonateUserId: {\n                    label: \"Impersonate User ID\",\n                    type: \"text\"\n                },\n                adminTokenSecret: {\n                    label: \"Admin Token Secret\",\n                    type: \"text\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials) return null;\n                // Impersonation Login Path\n                if (credentials.impersonateUserId && credentials.adminTokenSecret === process.env.NEXTAUTH_SECRET) {\n                    const targetUser = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.user.findUnique({\n                        where: {\n                            id: credentials.impersonateUserId\n                        }\n                    });\n                    if (!targetUser) return null;\n                    return {\n                        id: targetUser.id,\n                        name: targetUser.name,\n                        email: targetUser.email,\n                        role: targetUser.role,\n                        tier: targetUser.tier,\n                        targetLevel: targetUser.targetLevel || \"N5\",\n                        lpkName: targetUser.lpkName,\n                        isImpersonated: true\n                    };\n                }\n                // Standard Login Path\n                if (!credentials.email || !credentials.password) {\n                    throw new Error(\"Email dan kata sandi wajib diisi\");\n                }\n                const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email.toLowerCase().trim()\n                    }\n                });\n                if (!user) {\n                    throw new Error(\"Pengguna tidak ditemukan dengan email tersebut\");\n                }\n                const isMatch = await bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().compare(credentials.password, user.password);\n                if (!isMatch) {\n                    throw new Error(\"Kata sandi yang Anda masukkan salah\");\n                }\n                return {\n                    id: user.id,\n                    name: user.name,\n                    email: user.email,\n                    role: user.role,\n                    tier: user.tier,\n                    targetLevel: user.targetLevel || \"N5\",\n                    lpkName: user.lpkName\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user, trigger, session }) {\n            if (user) {\n                token.id = user.id;\n                token.role = user.role;\n                token.tier = user.tier;\n                token.targetLevel = user.targetLevel || \"N5\";\n                token.lpkName = user.lpkName;\n                token.isImpersonated = user.isImpersonated || false;\n            }\n            // Handle session updates (e.g. impersonation switch or targetLevel switch)\n            if (trigger === \"update\" && session) {\n                if (session.user) {\n                    token.id = session.user.id ?? token.id;\n                    token.name = session.user.name ?? token.name;\n                    token.email = session.user.email ?? token.email;\n                    token.role = session.user.role ?? token.role;\n                    token.tier = session.user.tier ?? token.tier;\n                    token.targetLevel = session.user.targetLevel ?? token.targetLevel;\n                    token.lpkName = session.user.lpkName ?? token.lpkName;\n                    token.isImpersonated = session.user.isImpersonated ?? token.isImpersonated;\n                    token.impersonatorAdmin = session.user.impersonatorAdmin ?? token.impersonatorAdmin;\n                }\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n                session.user.tier = token.tier;\n                session.user.targetLevel = token.targetLevel || \"N5\";\n                session.user.lpkName = token.lpkName;\n                session.user.isImpersonated = token.isImpersonated;\n                session.user.impersonatorAdmin = token.impersonatorAdmin;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\",\n        error: \"/login\"\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQUk7Z0JBQ3RDckIsUUFBUWlCLElBQUksQ0FBU0ssSUFBSSxHQUFHVyxNQUFNWCxJQUFJO2dCQUN0Q3RCLFFBQVFpQixJQUFJLENBQVNNLFdBQVcsR0FBR1UsTUFBTVYsV0FBVyxJQUFJO2dCQUN4RHZCLFFBQVFpQixJQUFJLENBQVNPLE9BQU8sR0FBR1MsTUFBTVQsT0FBTztnQkFDNUN4QixRQUFRaUIsSUFBSSxDQUFTUSxjQUFjLEdBQUdRLE1BQU1SLGNBQWM7Z0JBQzFEekIsUUFBUWlCLElBQUksQ0FBU2tCLGlCQUFpQixHQUFHRixNQUFNRSxpQkFBaUI7WUFDbkU7WUFDQSxPQUFPbkM7UUFDVDtJQUNGO0lBQ0FvQyxPQUFPO1FBQ0xDLFFBQVE7UUFDUkMsT0FBTztJQUNUO0lBQ0FDLFFBQVExQixRQUFRQyxHQUFHLENBQUNDLGVBQWU7QUFDckMsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL2pscHQtc2ltdWxhdGlvbi1hcHAvLi9zcmMvbGliL2F1dGgudHM/NjY5MiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tICduZXh0LWF1dGgnO1xuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFscyc7XG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tICdAL2xpYi9wcmlzbWEnO1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcyc7XG5cbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9uczogTmV4dEF1dGhPcHRpb25zID0ge1xuICBzZXNzaW9uOiB7XG4gICAgc3RyYXRlZ3k6ICdqd3QnLFxuICAgIG1heEFnZTogMzAgKiAyNCAqIDYwICogNjAsIC8vIDMwIGRheXNcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XG4gICAgICBuYW1lOiAnQ3JlZGVudGlhbHMnLFxuICAgICAgY3JlZGVudGlhbHM6IHtcbiAgICAgICAgZW1haWw6IHsgbGFiZWw6ICdFbWFpbCcsIHR5cGU6ICdlbWFpbCcgfSxcbiAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6ICdQYXNzd29yZCcsIHR5cGU6ICdwYXNzd29yZCcgfSxcbiAgICAgICAgaW1wZXJzb25hdGVVc2VySWQ6IHsgbGFiZWw6ICdJbXBlcnNvbmF0ZSBVc2VyIElEJywgdHlwZTogJ3RleHQnIH0sXG4gICAgICAgIGFkbWluVG9rZW5TZWNyZXQ6IHsgbGFiZWw6ICdBZG1pbiBUb2tlbiBTZWNyZXQnLCB0eXBlOiAndGV4dCcgfSxcbiAgICAgIH0sXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscykgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgLy8gSW1wZXJzb25hdGlvbiBMb2dpbiBQYXRoXG4gICAgICAgIGlmIChjcmVkZW50aWFscy5pbXBlcnNvbmF0ZVVzZXJJZCAmJiBjcmVkZW50aWFscy5hZG1pblRva2VuU2VjcmV0ID09PSBwcm9jZXNzLmVudi5ORVhUQVVUSF9TRUNSRVQpIHtcbiAgICAgICAgICBjb25zdCB0YXJnZXRVc2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgICAgICAgICB3aGVyZTogeyBpZDogY3JlZGVudGlhbHMuaW1wZXJzb25hdGVVc2VySWQgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoIXRhcmdldFVzZXIpIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiB0YXJnZXRVc2VyLmlkLFxuICAgICAgICAgICAgbmFtZTogdGFyZ2V0VXNlci5uYW1lLFxuICAgICAgICAgICAgZW1haWw6IHRhcmdldFVzZXIuZW1haWwsXG4gICAgICAgICAgICByb2xlOiB0YXJnZXRVc2VyLnJvbGUsXG4gICAgICAgICAgICB0aWVyOiB0YXJnZXRVc2VyLnRpZXIsXG4gICAgICAgICAgICB0YXJnZXRMZXZlbDogdGFyZ2V0VXNlci50YXJnZXRMZXZlbCB8fCAnTjUnLFxuICAgICAgICAgICAgbHBrTmFtZTogdGFyZ2V0VXNlci5scGtOYW1lLFxuICAgICAgICAgICAgaXNJbXBlcnNvbmF0ZWQ6IHRydWUsXG4gICAgICAgICAgfSBhcyBhbnk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdGFuZGFyZCBMb2dpbiBQYXRoXG4gICAgICAgIGlmICghY3JlZGVudGlhbHMuZW1haWwgfHwgIWNyZWRlbnRpYWxzLnBhc3N3b3JkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbWFpbCBkYW4ga2F0YSBzYW5kaSB3YWppYiBkaWlzaScpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgIHdoZXJlOiB7IGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbC50b0xvd2VyQ2FzZSgpLnRyaW0oKSB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BlbmdndW5hIHRpZGFrIGRpdGVtdWthbiBkZW5nYW4gZW1haWwgdGVyc2VidXQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGlzTWF0Y2ggPSBhd2FpdCBiY3J5cHQuY29tcGFyZShjcmVkZW50aWFscy5wYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XG4gICAgICAgIGlmICghaXNNYXRjaCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignS2F0YSBzYW5kaSB5YW5nIEFuZGEgbWFzdWtrYW4gc2FsYWgnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgIHJvbGU6IHVzZXIucm9sZSxcbiAgICAgICAgICB0aWVyOiB1c2VyLnRpZXIsXG4gICAgICAgICAgdGFyZ2V0TGV2ZWw6IHVzZXIudGFyZ2V0TGV2ZWwgfHwgJ041JyxcbiAgICAgICAgICBscGtOYW1lOiB1c2VyLmxwa05hbWUsXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBjYWxsYmFja3M6IHtcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciwgdHJpZ2dlciwgc2Vzc2lvbiB9KSB7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWQ7XG4gICAgICAgIHRva2VuLnJvbGUgPSAodXNlciBhcyBhbnkpLnJvbGU7XG4gICAgICAgIHRva2VuLnRpZXIgPSAodXNlciBhcyBhbnkpLnRpZXI7XG4gICAgICAgIHRva2VuLnRhcmdldExldmVsID0gKHVzZXIgYXMgYW55KS50YXJnZXRMZXZlbCB8fCAnTjUnO1xuICAgICAgICB0b2tlbi5scGtOYW1lID0gKHVzZXIgYXMgYW55KS5scGtOYW1lO1xuICAgICAgICB0b2tlbi5pc0ltcGVyc29uYXRlZCA9ICh1c2VyIGFzIGFueSkuaXNJbXBlcnNvbmF0ZWQgfHwgZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIEhhbmRsZSBzZXNzaW9uIHVwZGF0ZXMgKGUuZy4gaW1wZXJzb25hdGlvbiBzd2l0Y2ggb3IgdGFyZ2V0TGV2ZWwgc3dpdGNoKVxuICAgICAgaWYgKHRyaWdnZXIgPT09ICd1cGRhdGUnICYmIHNlc3Npb24pIHtcbiAgICAgICAgaWYgKHNlc3Npb24udXNlcikge1xuICAgICAgICAgIHRva2VuLmlkID0gc2Vzc2lvbi51c2VyLmlkID8/IHRva2VuLmlkO1xuICAgICAgICAgIHRva2VuLm5hbWUgPSBzZXNzaW9uLnVzZXIubmFtZSA/PyB0b2tlbi5uYW1lO1xuICAgICAgICAgIHRva2VuLmVtYWlsID0gc2Vzc2lvbi51c2VyLmVtYWlsID8/IHRva2VuLmVtYWlsO1xuICAgICAgICAgIHRva2VuLnJvbGUgPSBzZXNzaW9uLnVzZXIucm9sZSA/PyB0b2tlbi5yb2xlO1xuICAgICAgICAgIHRva2VuLnRpZXIgPSBzZXNzaW9uLnVzZXIudGllciA/PyB0b2tlbi50aWVyO1xuICAgICAgICAgIHRva2VuLnRhcmdldExldmVsID0gc2Vzc2lvbi51c2VyLnRhcmdldExldmVsID8/IHRva2VuLnRhcmdldExldmVsO1xuICAgICAgICAgIHRva2VuLmxwa05hbWUgPSBzZXNzaW9uLnVzZXIubHBrTmFtZSA/PyB0b2tlbi5scGtOYW1lO1xuICAgICAgICAgIHRva2VuLmlzSW1wZXJzb25hdGVkID0gc2Vzc2lvbi51c2VyLmlzSW1wZXJzb25hdGVkID8/IHRva2VuLmlzSW1wZXJzb25hdGVkO1xuICAgICAgICAgIHRva2VuLmltcGVyc29uYXRvckFkbWluID0gc2Vzc2lvbi51c2VyLmltcGVyc29uYXRvckFkbWluID8/IHRva2VuLmltcGVyc29uYXRvckFkbWluO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9LFxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XG4gICAgICBpZiAoc2Vzc2lvbi51c2VyKSB7XG4gICAgICAgIChzZXNzaW9uLnVzZXIgYXMgYW55KS5pZCA9IHRva2VuLmlkO1xuICAgICAgICAoc2Vzc2lvbi51c2VyIGFzIGFueSkucm9sZSA9IHRva2VuLnJvbGU7XG4gICAgICAgIChzZXNzaW9uLnVzZXIgYXMgYW55KS50aWVyID0gdG9rZW4udGllcjtcbiAgICAgICAgKHNlc3Npb24udXNlciBhcyBhbnkpLnRhcmdldExldmVsID0gdG9rZW4udGFyZ2V0TGV2ZWwgfHwgJ041JztcbiAgICAgICAgKHNlc3Npb24udXNlciBhcyBhbnkpLmxwa05hbWUgPSB0b2tlbi5scGtOYW1lO1xuICAgICAgICAoc2Vzc2lvbi51c2VyIGFzIGFueSkuaXNJbXBlcnNvbmF0ZWQgPSB0b2tlbi5pc0ltcGVyc29uYXRlZDtcbiAgICAgICAgKHNlc3Npb24udXNlciBhcyBhbnkpLmltcGVyc29uYXRvckFkbWluID0gdG9rZW4uaW1wZXJzb25hdG9yQWRtaW47XG4gICAgICB9XG4gICAgICByZXR1cm4gc2Vzc2lvbjtcbiAgICB9LFxuICB9LFxuICBwYWdlczoge1xuICAgIHNpZ25JbjogJy9sb2dpbicsXG4gICAgZXJyb3I6ICcvbG9naW4nLFxuICB9LFxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcbn07XG4iXSwibmFtZXMiOlsiQ3JlZGVudGlhbHNQcm92aWRlciIsInByaXNtYSIsImJjcnlwdCIsImF1dGhPcHRpb25zIiwic2Vzc2lvbiIsInN0cmF0ZWd5IiwibWF4QWdlIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImltcGVyc29uYXRlVXNlcklkIiwiYWRtaW5Ub2tlblNlY3JldCIsImF1dGhvcml6ZSIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiLCJ0YXJnZXRVc2VyIiwidXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImlkIiwicm9sZSIsInRpZXIiLCJ0YXJnZXRMZXZlbCIsImxwa05hbWUiLCJpc0ltcGVyc29uYXRlZCIsIkVycm9yIiwidG9Mb3dlckNhc2UiLCJ0cmltIiwiaXNNYXRjaCIsImNvbXBhcmUiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInRyaWdnZXIiLCJpbXBlcnNvbmF0b3JBZG1pbiIsInBhZ2VzIiwic2lnbkluIiwiZXJyb3IiLCJzZWNyZXQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/prisma.ts":
/*!***************************!*\
  !*** ./src/lib/prisma.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log:  true ? [\n        \"error\",\n        \"warn\"\n    ] : 0\n});\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3ByaXNtYS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBOEM7QUFFOUMsTUFBTUMsa0JBQWtCQztBQUlqQixNQUFNQyxTQUNYRixnQkFBZ0JFLE1BQU0sSUFDdEIsSUFBSUgsd0RBQVlBLENBQUM7SUFDZkksS0FBS0MsS0FBeUIsR0FBZ0I7UUFBQztRQUFTO0tBQU8sR0FBRyxDQUFTO0FBQzdFLEdBQUc7QUFFTCxJQUFJQSxJQUF5QixFQUFjSixnQkFBZ0JFLE1BQU0sR0FBR0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qbHB0LXNpbXVsYXRpb24tYXBwLy4vc3JjL2xpYi9wcmlzbWEudHM/MDFkNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XG5cbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7XG4gIHByaXNtYTogUHJpc21hQ2xpZW50IHwgdW5kZWZpbmVkO1xufTtcblxuZXhwb3J0IGNvbnN0IHByaXNtYSA9XG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz9cbiAgbmV3IFByaXNtYUNsaWVudCh7XG4gICAgbG9nOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JyA/IFsnZXJyb3InLCAnd2FybiddIDogWydlcnJvciddLFxuICB9KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWE7XG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsImxvZyIsInByb2Nlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/uuid","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5CVibe%20Coding%5CJLPT%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CVibe%20Coding%5CJLPT&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();