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
exports.id = "app/api/chat/route";
exports.ids = ["app/api/chat/route"];
exports.modules = {

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

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("pg");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=C%3A%5CUsers%5Cmdasa%5CDesktop%5CollamaChat%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cmdasa%5CDesktop%5CollamaChat&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=C%3A%5CUsers%5Cmdasa%5CDesktop%5CollamaChat%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cmdasa%5CDesktop%5CollamaChat&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_mdasa_Desktop_ollamaChat_app_api_chat_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/chat/route.ts */ \"(rsc)/./app/api/chat/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/chat/route\",\n        pathname: \"/api/chat\",\n        filename: \"route\",\n        bundlePath: \"app/api/chat/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\mdasa\\\\Desktop\\\\ollamaChat\\\\app\\\\api\\\\chat\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_mdasa_Desktop_ollamaChat_app_api_chat_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/chat/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZjaGF0JTJGcm91dGUmcGFnZT0lMkZhcGklMkZjaGF0JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGY2hhdCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNtZGFzYSU1Q0Rlc2t0b3AlNUNvbGxhbWFDaGF0JTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNtZGFzYSU1Q0Rlc2t0b3AlNUNvbGxhbWFDaGF0JmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNlO0FBQzVGO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbG9jYWwtY2hhdGdwdC1vbGxhbWEvPzBlZjkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcbWRhc2FcXFxcRGVza3RvcFxcXFxvbGxhbWFDaGF0XFxcXGFwcFxcXFxhcGlcXFxcY2hhdFxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvY2hhdC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2NoYXRcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2NoYXQvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxtZGFzYVxcXFxEZXNrdG9wXFxcXG9sbGFtYUNoYXRcXFxcYXBwXFxcXGFwaVxcXFxjaGF0XFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9jaGF0L3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=C%3A%5CUsers%5Cmdasa%5CDesktop%5CollamaChat%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cmdasa%5CDesktop%5CollamaChat&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/chat/route.ts":
/*!*******************************!*\
  !*** ./app/api/chat/route.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/db */ \"(rsc)/./lib/db.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_db__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uuid */ \"(rsc)/./node_modules/uuid/dist/esm-node/v4.js\");\n\n\n\nasync function POST(request) {\n    try {\n        const { title } = await request.json();\n        const result = await _lib_db__WEBPACK_IMPORTED_MODULE_1___default().query(\"INSERT INTO chats (id, title) VALUES ($1, $2) RETURNING *\", [\n            (0,uuid__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(),\n            title || \"New Chat\"\n        ]);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(result.rows[0]);\n    } catch (error) {\n        console.error(\"Error creating chat:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to create chat\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NoYXQvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBdUQ7QUFDckI7QUFDQztBQUU1QixlQUFlSSxLQUFLQyxPQUFvQjtJQUM3QyxJQUFJO1FBQ0YsTUFBTSxFQUFFQyxLQUFLLEVBQUUsR0FBRyxNQUFNRCxRQUFRRSxJQUFJO1FBRXBDLE1BQU1DLFNBQVMsTUFBTVAsb0RBQVUsQ0FDN0IsNkRBQ0E7WUFBQ0UsZ0RBQU1BO1lBQUlHLFNBQVM7U0FBVztRQUdqQyxPQUFPTixxREFBWUEsQ0FBQ08sSUFBSSxDQUFDQyxPQUFPRSxJQUFJLENBQUMsRUFBRTtJQUN6QyxFQUFFLE9BQU9DLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLHdCQUF3QkE7UUFDdEMsT0FBT1gscURBQVlBLENBQUNPLElBQUksQ0FBQztZQUFFSSxPQUFPO1FBQXdCLEdBQUc7WUFBRUUsUUFBUTtRQUFJO0lBQzdFO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sb2NhbC1jaGF0Z3B0LW9sbGFtYS8uL2FwcC9hcGkvY2hhdC9yb3V0ZS50cz9kZTQ2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcidcclxuaW1wb3J0IHBvb2wgZnJvbSAnLi4vLi4vLi4vbGliL2RiJ1xyXG5pbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJ1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgeyB0aXRsZSB9ID0gYXdhaXQgcmVxdWVzdC5qc29uKClcclxuICAgIFxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcG9vbC5xdWVyeShcclxuICAgICAgJ0lOU0VSVCBJTlRPIGNoYXRzIChpZCwgdGl0bGUpIFZBTFVFUyAoJDEsICQyKSBSRVRVUk5JTkcgKicsXHJcbiAgICAgIFt1dWlkdjQoKSwgdGl0bGUgfHwgJ05ldyBDaGF0J11cclxuICAgIClcclxuICAgIFxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHJlc3VsdC5yb3dzWzBdKVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjcmVhdGluZyBjaGF0OicsIGVycm9yKVxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdGYWlsZWQgdG8gY3JlYXRlIGNoYXQnIH0sIHsgc3RhdHVzOiA1MDAgfSlcclxuICB9XHJcbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwicG9vbCIsInY0IiwidXVpZHY0IiwiUE9TVCIsInJlcXVlc3QiLCJ0aXRsZSIsImpzb24iLCJyZXN1bHQiLCJxdWVyeSIsInJvd3MiLCJlcnJvciIsImNvbnNvbGUiLCJzdGF0dXMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/chat/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.js":
/*!*******************!*\
  !*** ./lib/db.js ***!
  \*******************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst { Pool } = __webpack_require__(/*! pg */ \"pg\");\nconst pool = new Pool({\n    host: \"localhost\",\n    port: 5432,\n    user: \"postgres\",\n    password: \"Mdasad\",\n    database: \"chatgpt_local\",\n    ssl: false\n});\nmodule.exports = pool;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIuanMiLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sRUFBRUEsSUFBSSxFQUFFLEdBQUdDLG1CQUFPQSxDQUFDO0FBRXpCLE1BQU1DLE9BQU8sSUFBSUYsS0FBSztJQUNwQkcsTUFBTTtJQUNOQyxNQUFNO0lBQ05DLE1BQU07SUFDTkMsVUFBVTtJQUNWQyxVQUFVO0lBQ1ZDLEtBQUs7QUFDUDtBQUVBQyxPQUFPQyxPQUFPLEdBQUdSIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbG9jYWwtY2hhdGdwdC1vbGxhbWEvLi9saWIvZGIuanM/M2RjOSJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IFBvb2wgfSA9IHJlcXVpcmUoJ3BnJyk7XHJcblxyXG5jb25zdCBwb29sID0gbmV3IFBvb2woe1xyXG4gIGhvc3Q6ICdsb2NhbGhvc3QnLFxyXG4gIHBvcnQ6IDU0MzIsXHJcbiAgdXNlcjogJ3Bvc3RncmVzJyxcclxuICBwYXNzd29yZDogJ01kYXNhZCcsXHJcbiAgZGF0YWJhc2U6ICdjaGF0Z3B0X2xvY2FsJyxcclxuICBzc2w6IGZhbHNlLFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcG9vbDsiXSwibmFtZXMiOlsiUG9vbCIsInJlcXVpcmUiLCJwb29sIiwiaG9zdCIsInBvcnQiLCJ1c2VyIiwicGFzc3dvcmQiLCJkYXRhYmFzZSIsInNzbCIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/uuid"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=C%3A%5CUsers%5Cmdasa%5CDesktop%5CollamaChat%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cmdasa%5CDesktop%5CollamaChat&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();