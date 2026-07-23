import { g as getResponse, r as requestHandler } from "../server.js";
import { rootRouteId, parseRedirect, isRedirect, defaultSerovalPlugins, makeSerovalPlugin, createRawStreamRPCPlugin, invariant, isNotFound, getScriptPreloadAttrs, getStylesheetHref, resolveManifestCssLink, resolveManifestAssetLink, createSerializationAdapter, isResolvedRedirect, executeRewriteInput } from "@tanstack/router-core";
import { AsyncLocalStorage } from "node:async_hooks";
import { toCrossJSONStream, fromJSON, toCrossJSONAsync } from "seroval";
import { createMemoryHistory } from "@tanstack/history";
import { mergeHeaders } from "@tanstack/router-core/ssr/client";
import { getNormalizedURL, getOrigin, normalizeSsrResponse, attachRouterServerSsrUtils, replaceSsrResponse, stripSsrResponseBody, isSsrResponse } from "@tanstack/router-core/ssr/server";
import "react";
import { RouterProvider } from "@tanstack/react-router";
import { jsx } from "react/jsx-runtime";
import { defineHandlerCallback, renderRouterToStream } from "@tanstack/react-router/ssr/server";
function StartServer(props) {
  return /* @__PURE__ */ jsx(RouterProvider, { router: props.router });
}
var defaultStreamHandler = defineHandlerCallback(({ request, router, responseHeaders }) => renderRouterToStream({
  request,
  router,
  responseHeaders,
  children: /* @__PURE__ */ jsx(StartServer, { router })
}));
var HEADERS = { TSS_SHELL: "X-TSS_SHELL" };
async function getStartManifest(matchedRoutes) {
  const { tsrStartManifest } = await import("./_tanstack-start-manifest_v-CtdgO2DE.js");
  const startManifest = tsrStartManifest();
  let routes = startManifest.routes;
  routes[rootRouteId];
  const manifestRoutes = {};
  for (const k in routes) {
    const v = routes[k];
    const result = {};
    if (v.preloads && v.preloads.length > 0) result.preloads = v.preloads;
    if (v.scripts && v.scripts.length > 0) result.scripts = v.scripts;
    if (v.css?.length) result.css = v.css;
    if (result.preloads || result.scripts || result.css) manifestRoutes[k] = result;
  }
  return {
    ...startManifest.scriptFormat ? { scriptFormat: startManifest.scriptFormat } : {},
    ...startManifest.inlineCss ? { inlineCss: startManifest.inlineCss } : {},
    routes: manifestRoutes
  };
}
const manifest = {
  "0130dd17c6708cf113632c167a9382723e32cfb27fbce797720189b1d05ebac5": {
    functionName: "updateManagedUserRole_createServerFn_handler",
    importer: () => import("./admin-CawZR5yM.js")
  },
  "03fe474a9b0c6cd7a657ab1e7c76c97e2f51b03af3a1674c897cf45a7674189b": {
    functionName: "performSearch_createServerFn_handler",
    importer: () => import("./GlobalSearch-DbKZlkBq.js")
  },
  "04819e7894ac20a9e67842e674a7cafc7662fcf7d57cc791df4e9565891d8768": {
    functionName: "submitSignup_createServerFn_handler",
    importer: () => import("./signup-D1fFuMTq.js")
  },
  "050899b9025cd8acdf0542ff35da13724bb9b47516a7a04f814b8e1c68ba0a2c": {
    functionName: "getProfessionalStatsData_createServerFn_handler",
    importer: () => import("./stats-DnjMbLxN.js")
  },
  "08fd37130d4793ce5d4c55b60a23ef25090c5fe2a3d46a7766c0d385178406f9": {
    functionName: "getNotificationsPageData_createServerFn_handler",
    importer: () => import("./notifications-iD5_ayUK.js")
  },
  "098b42f6887d35232744b8a4b5a9d8320fae10641031ab1101b9ac3ee9ef66d5": {
    functionName: "submitProjectRequest_createServerFn_handler",
    importer: () => import("./job._jobId-DCEGhdVF.js")
  },
  "0c86f3e56ddd26cf4be6ac95c8df4027d8dc824522e054266058cdcf9b5d6041": {
    functionName: "clearAdminNotifications_createServerFn_handler",
    importer: () => import("./admin-notifications-y11V8Gh3.js")
  },
  "0e146aa39fde9d262e6e06f126a0893e440b786e0b8895f309e09355d861878f": {
    functionName: "loadLegalPage_createServerFn_handler",
    importer: () => import("./_legalPageSlug-Cjk6dIcz.js")
  },
  "1098c7c3c4f88c50c233de7e63d13343b5b364d4f9c196863026dc40cd9265aa": {
    functionName: "getDraftJob_createServerFn_handler",
    importer: () => import("./post-job-CwKVRRMg.js")
  },
  "12163bba88d4762a9cb6b72f6c7362484b1d32999fba614b513a46288400c7ac": {
    functionName: "getDashboardAccess_createServerFn_handler",
    importer: () => import("./dashboard-DuqKI95h.js")
  },
  "1352238e92751112f326b98e5a6618a5af4927f592eadfebbc82c8f3eb61ec63": {
    functionName: "getProjectData_createServerFn_handler",
    importer: () => import("./project._projectId.server-C1rCeslB.js")
  },
  "13c7d4217cb971cba0b9e699a15703b98809c3996d7081bf760428a8b19a87c7": {
    functionName: "sendSignupOtp_createServerFn_handler",
    importer: () => import("./signup-D1fFuMTq.js")
  },
  "1ab8beec04065a6b46a91078b57a799f049604ec51d771fb9c676749bc38a17c": {
    functionName: "clearProjectRevision_createServerFn_handler",
    importer: () => import("./project-track._trackingId-CXrXYfJi.js")
  },
  "1afaf94834e254922e7bf7305944676301838ba478bbbb901e1d474bfdc16e99": {
    functionName: "getHireDetails_createServerFn_handler",
    importer: () => import("./hire._proId-K-ue7qL9.js")
  },
  "1b101f8aa7fd0e5406cfeb84f019d600f221056e114340a2506230526a899ad4": {
    functionName: "cancelDirectHireProject_createServerFn_handler",
    importer: () => import("./projects-PCTN0c9p.js")
  },
  "1b3c5d79d45933cb865cd3fd1c2138207d34bd67fdd45ca5143b6b5e0e60e1e3": {
    functionName: "submitAdminLogin_createServerFn_handler",
    importer: () => import("./admin-CawZR5yM.js")
  },
  "2080a9744ef24ed1f2349176327a3f409d884f7adb9f61528d71686ec276c885": {
    functionName: "getRealtimeViewer_createServerFn_handler",
    importer: () => import("./AppShell-CVwdBatk.js")
  },
  "2114fbcd804606ec0ffa4509ea56beb9c77d12bf8af2b79accd1d13504827428": {
    functionName: "getClientReportsData_createServerFn_handler",
    importer: () => import("./client-reports-D0ujwe8Q.js")
  },
  "21979ea036eadadfd14a1ef9fabc79f952b9d59dc1b92b8560d652fa27c1b7de": {
    functionName: "sendNegotiationOffer_createServerFn_handler",
    importer: () => import("./stats-detail-BuC6obAk.js")
  },
  "21fdf6e8e7840e1cff3b3ca3611a368d5ab8b8f96b9ea15af45c378854b1d5bf": {
    functionName: "checkProjectAuth_createServerFn_handler",
    importer: () => import("./project._projectId.server-C1rCeslB.js")
  },
  "221f7999531e9ffd902d29b3f85e75eda20ade33378579e143f61defc4e53495": {
    functionName: "saveVerificationDocument_createServerFn_handler",
    importer: () => import("./verification-DTECWkRQ.js")
  },
  "2427e0ec35ea63d06c06b8c95f151e80ad322b163d72120613f30a0a1d824893": {
    functionName: "updateMyInfo_createServerFn_handler",
    importer: () => import("./my-info-BtzOKu6v.js")
  },
  "243f2490899071e8ebf4a541df3ecb0b948f66d0efca85f53fb18a6ad2f99af7": {
    functionName: "updateManagedProfessionalVerification_createServerFn_handler",
    importer: () => import("./user-management-CR3_0dIV.js")
  },
  "2e19328f8538965cc4bf2bfc8b18be8bea3d6b7d5a5ff3c16c8035b343b4f683": {
    functionName: "saveProfessionalProfile_createServerFn_handler",
    importer: () => import("./profile-setup-CAtkO1Xa.js")
  },
  "34873e21d20b0abcbe478ce7f33f3e9c5997242623c5f24d3c882940549f32b6": {
    functionName: "updateManagedDisputeStatus_createServerFn_handler",
    importer: () => import("./admin-CawZR5yM.js")
  },
  "3663e1dcb3d83c2308c4233fc773cfd0b41d86e50aee0505ca87d4d9743e05b4": {
    functionName: "loadNotificationPanelData_createServerFn_handler",
    importer: () => import("./AppShell-CVwdBatk.js")
  },
  "38e4caa85870d2b011787db77ba991ad42b78eece051c99b92d28accc79e7e34": {
    functionName: "getVerificationPage_createServerFn_handler",
    importer: () => import("./verification-DTECWkRQ.js")
  },
  "38e7ef89a0190d3ec419669020cd02b27ca22e5de02c1c2ccabcf2787f723cd2": {
    functionName: "getVerificationManagementData_createServerFn_handler",
    importer: () => import("./verification-management-DKKCehdz.js")
  },
  "3c1e409d910825d3a5a277a9a5f297e2365837eb02ddc09f92a7788eef1bf966": {
    functionName: "updateDisputeReviewStatus_createServerFn_handler",
    importer: () => import("./job-management-BdUHQpH8.js")
  },
  "46409a6e140b0fbbb4054bcde4973dfdce1166763727f42c81d81d3d979feeae": {
    functionName: "resetPassword_createServerFn_handler",
    importer: () => import("./forgot-password-D9PYbipv.js")
  },
  "47ad1f1e83a28c5c50411a048bd05de7a364ac9e0ca0cb9a48b4b93ea90f3f09": {
    functionName: "getSiteHeaderUser_createServerFn_handler",
    importer: () => import("./SiteHeader-CoDAs3U5.js")
  },
  "47ad464b6b0b07fa3ee9d80b2e3474c6d1faa7c83291e440ab9d7ca5511c8fb4": {
    functionName: "getNotificationSnapshot_createServerFn_handler",
    importer: () => import("./AppShell-CVwdBatk.js")
  },
  "49046d7c5730cbfe7bb34cd5d52f67bee14077c570bd1ff52fc6e218f54d687f": {
    functionName: "getHireAccess_createServerFn_handler",
    importer: () => import("./hire._proId-K-ue7qL9.js")
  },
  "4df961514bde49cbb0c7192f9b69ed61c09ffaf2e449825947edd4cf122b67e2": {
    functionName: "saveClientJob_createServerFn_handler",
    importer: () => import("./post-job-CwKVRRMg.js")
  },
  "4e78feff978e75cd52051d26d221c6c099c8394984a3718bbdb8706e224e31c9": {
    functionName: "requestWithdrawal_createServerFn_handler",
    importer: () => import("./earnings-C4AlWhyb.js")
  },
  "50c70bc07b503c6662e88c80b6c6da6d6dc2e14b88aab95aee2e3aa832bea6fe": {
    functionName: "getCurrentUserFn_createServerFn_handler",
    importer: () => import("./index-DfplFlLl.js")
  },
  "543235704210eeb04c5cc7ffe5ad97072b66baab0cada240c42d7d12da4e8f35": {
    functionName: "saveClientProfile_createServerFn_handler",
    importer: () => import("./profile-setup-C-tH6qs5.js")
  },
  "547642466553dd72bf7aad332cf0b891936c04e214045162a610d5727ff09263": {
    functionName: "loadAdminCategoriesData_createServerFn_handler",
    importer: () => import("./admin-categories-DuNav91Z.js")
  },
  "5617dd59ed60c0d159164207db053e3ad2ccdb8abef223e148530dcdfcafa6f1": {
    functionName: "markNotificationsRead_createServerFn_handler",
    importer: () => import("./notifications-iD5_ayUK.js")
  },
  "5745e5497e445555fa94b5b1a3b5f87f7888d3e78c9903ed7e454c57230d2aba": {
    functionName: "getMyInfoData_createServerFn_handler",
    importer: () => import("./my-info-BtzOKu6v.js")
  },
  "576fe12dd784cc869a9ca756e2b212df90341c076f6142ed21f5ba66874fffc2": {
    functionName: "removeServiceCategory_createServerFn_handler",
    importer: () => import("./admin-categories-DuNav91Z.js")
  },
  "5bd7f7de8a64a2ee076ec76a556f559b62012f42b6011240ddf3997aad10414c": {
    functionName: "sendNegotiationOffer_createServerFn_handler",
    importer: () => import("./stats-DnjMbLxN.js")
  },
  "5feb31bfc71b14ea08550c2b12b4cc18685f13d087894e33b7082e8ad614492d": {
    functionName: "getJobManagementData_createServerFn_handler",
    importer: () => import("./job-management-BdUHQpH8.js")
  },
  "62594a67bff601f34bf09e77f55d04b1abc3c2cb3e849829c7799ef4601bcce1": {
    functionName: "sendPasswordResetOtp_createServerFn_handler",
    importer: () => import("./forgot-password-D9PYbipv.js")
  },
  "691df0d0f8aeff3d6aadaaf9faa9297462dff6cac5b57ca82500889f4d1ad1cb": {
    functionName: "getEarningsData_createServerFn_handler",
    importer: () => import("./earnings-C4AlWhyb.js")
  },
  "6f7c48b478f865c6aa2d7de1ee4ba1c033ec49a13573320a947be5889b3768fb": {
    functionName: "loadServicesData_createServerFn_handler",
    importer: () => import("./services-DQdjse_e.js")
  },
  "7289ddbee63ffc3afac939be6d4a48afb6b87577e64db0027216d793e1797742": {
    functionName: "startDirectHireProject_createServerFn_handler",
    importer: () => import("./projects-PCTN0c9p.js")
  },
  "786f5101632b203af0eb28be1fb4d679269c74691401ec1b6b449a8edd3067a1": {
    functionName: "getAdminReportsData_createServerFn_handler",
    importer: () => import("./admin-reports-BRNBqmne.js")
  },
  "78a30400a82c387d7f50258c6808cbacab370d3279d39fe0320a38c6abff7b9a": {
    functionName: "saveProfessionalWorkPhotosUpload_createServerFn_handler",
    importer: () => import("./profile-setup-CAtkO1Xa.js")
  },
  "79c8bfa0dc26a63cfce8d4b298efcd3cbde99f92285a5b43927deab15e082529": {
    functionName: "saveFavoriteJob_createServerFn_handler",
    importer: () => import("./index-Bh62KBpt.js")
  },
  "7cf9b549da54905b15de3ab7fd7d0d87c0adfbccbaf92c4aef93c08a5496bf86": {
    functionName: "getProjectsPageData_createServerFn_handler",
    importer: () => import("./projects-PCTN0c9p.js")
  },
  "7fb9024a085484decec73064df196406d2dfa38387498314733a92803139ccf3": {
    functionName: "deleteProject_createServerFn_handler",
    importer: () => import("./project._projectId.server-C1rCeslB.js")
  },
  "80c5d0f5007def4b6d3b85805f512f4e7453a3d7ef5bc930f2cbab97f8977afc": {
    functionName: "rateProjectProfessional_createServerFn_handler",
    importer: () => import("./project-track._trackingId-CXrXYfJi.js")
  },
  "80eabf15f2715bb64d656ee1c68f69421d7daa00d87f9a424a70ef6c8aa3e507": {
    functionName: "getProDetails_createServerFn_handler",
    importer: () => import("./pro._proId-CDGHF5v_.js")
  },
  "84487b79c8c0dda0932e15f0b533c89810aacfc736af6087a50d35a8550d07f2": {
    functionName: "addProjectMilestone_createServerFn_handler",
    importer: () => import("./project-track._trackingId-CXrXYfJi.js")
  },
  "84591fcb04b7f6eb0f011841c740911f1042c20b8d0970e0de1fa91c3a35fdde": {
    functionName: "getPostJobAccess_createServerFn_handler",
    importer: () => import("./post-job-CwKVRRMg.js")
  },
  "8970e96279146b0b7c89d98104e63c2be6bfe7fad738b480a637de26025eacf7": {
    functionName: "updateProjectStatus_createServerFn_handler",
    importer: () => import("./projects-PCTN0c9p.js")
  },
  "89f524fd6c5bf85e111a57c758b432358c7d12e411e9b7863b6f9428c6f137e5": {
    functionName: "submitLogin_createServerFn_handler",
    importer: () => import("./login-1Ze28RoK.js")
  },
  "8a1c28cedc7196cd4f9754d02e7774264f54ef4c22e9e30f3479e991188e6cb0": {
    functionName: "saveReviewResponse_createServerFn_handler",
    importer: () => import("./stats-detail-BuC6obAk.js")
  },
  "8a6d72fdedf604409984b58a246992318228fc681185ded0c9486f2e1fcee1f1": {
    functionName: "submitFinalWork_createServerFn_handler",
    importer: () => import("./project-track._trackingId-CXrXYfJi.js")
  },
  "8bcb83b2ac36f74a5f33ec892c4b41348990edcd59ee70b521aefd68bf37407f": {
    functionName: "getClientMessagesPage_createServerFn_handler",
    importer: () => import("./messages-ZHsRvFdq.js")
  },
  "900bb128350f2296e0f61f02a79dc7299cd447591d80524ec1c748722fb00a47": {
    functionName: "getReportsData_createServerFn_handler",
    importer: () => import("./reports-B0jEviw-.js")
  },
  "944a30392296e8a1c31e157378436df8798cf6f1d7946e14b2325a0ffbacebd5": {
    functionName: "saveFavoriteJob_createServerFn_handler",
    importer: () => import("./job._jobId-DCEGhdVF.js")
  },
  "94a5151b754e4ae8e302d55aab22e133a9dce54b31bf69ca5e2ae9a5a5533ee9": {
    functionName: "getAdminPageData_createServerFn_handler",
    importer: () => import("./admin-CawZR5yM.js")
  },
  "951c17a8842f1d7cb860c1d26decee12b7759ebea0e564cb42cf8b06b2fa6f96": {
    functionName: "getAuthLayoutUser_createServerFn_handler",
    importer: () => import("./AuthLayout-SgyNgUWA.js")
  },
  "978f656b55bcfafae5855f5f72ec85ca2d229bcd432622e80f38a271889c3b0c": {
    functionName: "loadFooterPages_createServerFn_handler",
    importer: () => import("./SiteFooter-CpE09qW0.js")
  },
  "99f8bc625c4f192187c9842ee3a566892709d8486e62910e3a0b50dd648a03ff": {
    functionName: "removeProjectImmediately_createServerFn_handler",
    importer: () => import("./projects-PCTN0c9p.js")
  },
  "9a9692dd4e7e76f31f2fd3771ae2a31bf928a5249b21dd9f68561ac178b30a86": {
    functionName: "cancelProfessionalTrackedProject_createServerFn_handler",
    importer: () => import("./stats-DnjMbLxN.js")
  },
  "9c4e4e55713c4ee4c8202a7c32106c8cc84d850c6ea382a3a7f315b63ccbeecd": {
    functionName: "updateManagedUserStatus_createServerFn_handler",
    importer: () => import("./admin-CawZR5yM.js")
  },
  "9e3e92a6c974eec47913ae5d84eadaf5914fdecd33993b0c2f00e1ad6de28151": {
    functionName: "deleteUploadedWork_createServerFn_handler",
    importer: () => import("./project-track._trackingId-CXrXYfJi.js")
  },
  "a172767e0829445458bae5e557f8faaa303ac6ae415111c949002c34f3898285": {
    functionName: "loadFaqPage_createServerFn_handler",
    importer: () => import("./faq-VSS-uyhl.js")
  },
  "a21b3d6cf93c73b3a0a3bfb37e618c75f752705a70cc7607a5e2db6bbb3eb8c3": {
    functionName: "loadPublishedEditorPages_createServerFn_handler",
    importer: () => import("./__root-B5zK2e2g.js")
  },
  "a4c31141410ac6780d4cd742b0257e4d637ef0ce0b6c71e3fdb2d21268b861b8": {
    functionName: "saveWebEditorPage_createServerFn_handler",
    importer: () => import("./web-editor-o8oJFAg8.js")
  },
  "aa2cd770358103e83638d3ec2ca758b10579b0e0280be5ae356a514f8b1f099d": {
    functionName: "markAdminNotificationsRead_createServerFn_handler",
    importer: () => import("./admin-notifications-y11V8Gh3.js")
  },
  "aa570f29499fd324ade1a4bebcdf028039d509b20f350df4392626c54629c4d9": {
    functionName: "loadPrivacyPage_createServerFn_handler",
    importer: () => import("./privacy-policy-DXY3qQws.js")
  },
  "aec19aa73a307cd432310028eaa0eed27043384ac6eee443f8aec6a9b8ecda9b": {
    functionName: "loadWebsiteCmsData_createServerFn_handler",
    importer: () => import("./website-cms-Czk-wlp8.js")
  },
  "b2006b819abe3a98a4efe84f86e34301cda5272937d3b6465571260d9bd38adf": {
    functionName: "getProfessionalProfilePage_createServerFn_handler",
    importer: () => import("./profile-setup-CAtkO1Xa.js")
  },
  "b317eff85cc91e7d65af4c84256c953471969d1ad85d0c37dbe07e790417e43e": {
    functionName: "raiseProjectDispute_createServerFn_handler",
    importer: () => import("./project-track._trackingId-CXrXYfJi.js")
  },
  "b4a2717c635ee7c0de3686b24148eb32a359e67ad4d41dffe205a24774bc4ff8": {
    functionName: "getProfileSetupData_createServerFn_handler",
    importer: () => import("./profile-setup-C-tH6qs5.js")
  },
  "b6df212eaa2ab587a99f249bda564bc2a1ae2f9d46be29facb860d178cdcdefb": {
    functionName: "updateProjectRequest_createServerFn_handler",
    importer: () => import("./projects-PCTN0c9p.js")
  },
  "b7be1155b461346fba94102841135b1efac9a8414a9f7fb9af563d104284628d": {
    functionName: "updateHireRequestStatus_createServerFn_handler",
    importer: () => import("./stats-DnjMbLxN.js")
  },
  "bdfd373e0f5cc6529d7b2d94d214b1d0e952f0e8734a7226a92bd6dd1652568e": {
    functionName: "removeProjectMilestone_createServerFn_handler",
    importer: () => import("./project-track._trackingId-CXrXYfJi.js")
  },
  "bf64e5b60e364c05c09598f2a23046d9968e10d4acbb03fcece2f8c40c48e1dc": {
    functionName: "deleteRejectedDirectHire_createServerFn_handler",
    importer: () => import("./projects-PCTN0c9p.js")
  },
  "c1dda5569f7d8a8222f5345ddcffb7e438089ea88d58e762a57ec868d51a5db2": {
    functionName: "deleteProfessionalRejectedDirectHire_createServerFn_handler",
    importer: () => import("./stats-DnjMbLxN.js")
  },
  "c829c55c5ec41e871fc4af8350f0d80871ebfd62b94c1435073a57be85993dee": {
    functionName: "reviewFinalWork_createServerFn_handler",
    importer: () => import("./project-track._trackingId-CXrXYfJi.js")
  },
  "caa7ea0460ff589ca14ad47e869b8dca5174757b5a6860c21cdb76719c13198c": {
    functionName: "getProfessionalMessagesPage_createServerFn_handler",
    importer: () => import("./messages-C2KY2Ho6.js")
  },
  "cae39de6756e250edd0006d2fc13cb6a28c1f3d827e6b6b18554134d1b321d41": {
    functionName: "cancelProfessionalDirectHireProject_createServerFn_handler",
    importer: () => import("./stats-DnjMbLxN.js")
  },
  "cafc9756e06bfb73d91de8bc1aa45992a234b001e43353d2d042974b8b7b3eb0": {
    functionName: "getWebEditorData_createServerFn_handler",
    importer: () => import("./web-editor-o8oJFAg8.js")
  },
  "cb2bb861c5599608c85d8e21f78d33d7b6c50c46f72d5fe6e5b875ff153bfa9c": {
    functionName: "requestProjectRevision_createServerFn_handler",
    importer: () => import("./project-track._trackingId-CXrXYfJi.js")
  },
  "cf6c7a846eb399b5fce248e1b1973906faf891dc04c7cdefd0db732ded84c101": {
    functionName: "clearNotifications_createServerFn_handler",
    importer: () => import("./notifications-iD5_ayUK.js")
  },
  "d10fd46a0f32cdc7ad911170dd8cf534414c29108be8166833d5526f9cdb0ea7": {
    functionName: "setClientJobStatus_createServerFn_handler",
    importer: () => import("./dashboard-DuqKI95h.js")
  },
  "d21ae227bec96e0c5dcf4b0e8804f1ee297797d383b41ca8942fdff33d67acc2": {
    functionName: "updateManagedUserStatus_createServerFn_handler",
    importer: () => import("./user-management-CR3_0dIV.js")
  },
  "d45d657e65d2dc91c1038c27ffcc9dc1643d278a30371f0a7552c8d53f5b1561": {
    functionName: "rateProjectProfessional_createServerFn_handler",
    importer: () => import("./projects-PCTN0c9p.js")
  },
  "d6cb18f803edd4461bd987b58b861aeac8b544386153c085fd62a805954f078d": {
    functionName: "logoutAction_createServerFn_handler",
    importer: () => import("./logout.server-7Ba2m6t0.js")
  },
  "d7a541c7e5704b9aa7e159708b81abd37fbd1a93c5c947fea36e447fdc291d62": {
    functionName: "updatePayoutReviewStatus_createServerFn_handler",
    importer: () => import("./earnings-reports-CGW834bW.js")
  },
  "de3e9c361ee6b8699fb59740e3f7f1792d454180e07aec30eaf58759859aaeb8": {
    functionName: "sendHireNegotiationOffer_createServerFn_handler",
    importer: () => import("./stats-DnjMbLxN.js")
  },
  "e0c85f1131201062c5b88ab1131561692d37ca7915f418c4705f581ad85ddb77": {
    functionName: "updateBrowserNotifications_createServerFn_handler",
    importer: () => import("./notifications-iD5_ayUK.js")
  },
  "e0d667c0383670fd421af6b54f07f455c7fc8ad5909abf4b6548b358809bd6b6": {
    functionName: "updateVerificationReviewStatus_createServerFn_handler",
    importer: () => import("./verification-management-DKKCehdz.js")
  },
  "e1a8f00cb9eb520da7092dad35237298bc912e8c6d9f496b539773de95a86dcd": {
    functionName: "updateManagedUserPassword_createServerFn_handler",
    importer: () => import("./user-management-CR3_0dIV.js")
  },
  "e451185b765523e82bfb50e816caab6fdd07884d4e3887d63e531ff6649f30fe": {
    functionName: "getTrackingPageData_createServerFn_handler",
    importer: () => import("./project-track._trackingId-CXrXYfJi.js")
  },
  "e5d3f5d948391b170b648653d55968324eb90a864ee693154a5ada87efb58755": {
    functionName: "getHomeData_createServerFn_handler",
    importer: () => import("./index-DfplFlLl.js")
  },
  "e6474fabb0c7002835fe9cf233562b70c976f1753e8258ac38019f98d7b13067": {
    functionName: "saveServiceCategory_createServerFn_handler",
    importer: () => import("./admin-categories-DuNav91Z.js")
  },
  "e700a94027d492715aa27d3f891c8366f2ed540f86df2000a5c1552ca6db7596": {
    functionName: "changeMilestoneStatus_createServerFn_handler",
    importer: () => import("./project-track._trackingId-CXrXYfJi.js")
  },
  "e8e7f8df643a91f5fa16310b31c9084324d8df716e972d847ad9fbb636a8bc2c": {
    functionName: "cancelTrackedProject_createServerFn_handler",
    importer: () => import("./projects-PCTN0c9p.js")
  },
  "ea47e43a69ab6d6ce8d3ded0358d8dd4612882a9bd94cb62d0bafb38860338b6": {
    functionName: "saveHireContract_createServerFn_handler",
    importer: () => import("./hire._proId-K-ue7qL9.js")
  },
  "eaf4203d0ffa702f7dd50fd5919dd499db4c8f0bd1f7d3f62adda621f9d6884a": {
    functionName: "getDiscoveryData_createServerFn_handler",
    importer: () => import("./discover-B8MYo9_s.js")
  },
  "ebed5c2a9559ca743c744b5b964f96de975e6711abfd36ee0215df6b6bfa8f38": {
    functionName: "saveProfessionalVerificationUpload_createServerFn_handler",
    importer: () => import("./profile-setup-CAtkO1Xa.js")
  },
  "ee8e3371be33623c7fdc5db78b469509f3e5beacdc3e1feba4b39d1c7891bc6f": {
    functionName: "saveProfessionalProfilePhotoUpload_createServerFn_handler",
    importer: () => import("./profile-setup-CAtkO1Xa.js")
  },
  "eea242dfecf25c3556aa69c07e2ff6fabb7fe636a68e719cc719b9a73f9007c0": {
    functionName: "loadTermsPage_createServerFn_handler",
    importer: () => import("./terms-and-conditions-CbOthfbc.js")
  },
  "f108177aa08367938e52b83bddcc36fd4b131fcfe5a95865744a3cb3f9976718": {
    functionName: "getEarningsReportsData_createServerFn_handler",
    importer: () => import("./earnings-reports-CGW834bW.js")
  },
  "f522407dafc3847e81c19f552cdd8d1599c8f85d9d2f336df1bfcf1ec7902cca": {
    functionName: "getProfessionalReportsData_createServerFn_handler",
    importer: () => import("./professional-reports-BDrVBMi7.js")
  },
  "f636a1fc0798a6c639b7a495c21195375d0683eda240bab05234d6ef15e816f5": {
    functionName: "uploadProjectWork_createServerFn_handler",
    importer: () => import("./project-track._trackingId-CXrXYfJi.js")
  },
  "f6c254b7f87f34d97319eb6d48703259e6914e716729c3c2f428b5e1e8081982": {
    functionName: "getUserManagementData_createServerFn_handler",
    importer: () => import("./user-management-CR3_0dIV.js")
  },
  "fb9aa94d0347ab202806b7721a9146d2982139847d35e2d034072254935e44c8": {
    functionName: "saveWebsiteCmsPage_createServerFn_handler",
    importer: () => import("./website-cms-Czk-wlp8.js")
  },
  "fbaf96e46299326181a9fe147d6f35c7702b6d5d89c811f690a6a22af5cf1ddf": {
    functionName: "saveReviewResponse_createServerFn_handler",
    importer: () => import("./stats-DnjMbLxN.js")
  },
  "fbdfe6ab2e50a745fc4a753ad78f5f0482350705c42008ac33293075a8d93ca7": {
    functionName: "getJobDetails_createServerFn_handler",
    importer: () => import("./job._jobId-DCEGhdVF.js")
  },
  "fdd2792a2c24c834517782fc4c0a485940ed26d7156272db363b023a115fd9b1": {
    functionName: "getHomeData_createServerFn_handler",
    importer: () => import("./for-professionals-C-JIXm3I.js")
  },
  "ff434e75bc89341f957044cac77a2690d285d7052aee5ea9f68120cee5984435": {
    functionName: "getAdminNotifications_createServerFn_handler",
    importer: () => import("./admin-notifications-y11V8Gh3.js")
  }
};
async function getServerFnById(id, access) {
  const serverFnInfo = manifest[id];
  if (!serverFnInfo) {
    throw new Error("Server function info not found for " + id);
  }
  const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
  if (!fnModule) {
    throw new Error("Server function module not resolved for " + id);
  }
  const action = fnModule[serverFnInfo.functionName];
  if (!action) {
    throw new Error("Server function module export not resolved for serverFn ID: " + id);
  }
  return action;
}
var TSS_FORMDATA_CONTEXT = "__TSS_CONTEXT";
var TSS_SERVER_FUNCTION = /* @__PURE__ */ Symbol.for("TSS_SERVER_FUNCTION");
var TSS_SERVER_FUNCTION_FACTORY = /* @__PURE__ */ Symbol.for("TSS_SERVER_FUNCTION_FACTORY");
var X_TSS_SERIALIZED = "x-tss-serialized";
var X_TSS_RAW_RESPONSE = "x-tss-raw";
var TSS_CONTENT_TYPE_FRAMED = "application/x-tss-framed";
var FrameType = {
  /** Seroval JSON chunk (NDJSON line) */
  JSON: 0,
  /** Raw stream data chunk */
  CHUNK: 1,
  /** Raw stream end (EOF) */
  END: 2,
  /** Raw stream error */
  ERROR: 3
};
var FRAME_HEADER_SIZE = 9;
var TSS_CONTENT_TYPE_FRAMED_VERSIONED = `${TSS_CONTENT_TYPE_FRAMED}; v=1`;
function isSafeKey(key) {
  return key !== "__proto__" && key !== "constructor" && key !== "prototype";
}
function safeObjectMerge(target, source) {
  const result = /* @__PURE__ */ Object.create(null);
  if (target) {
    for (const key of Object.keys(target)) if (isSafeKey(key)) result[key] = target[key];
  }
  if (source && typeof source === "object") {
    for (const key of Object.keys(source)) if (isSafeKey(key)) result[key] = source[key];
  }
  return result;
}
function createNullProtoObject(source) {
  if (!source) return /* @__PURE__ */ Object.create(null);
  const obj = /* @__PURE__ */ Object.create(null);
  for (const key of Object.keys(source)) if (isSafeKey(key)) obj[key] = source[key];
  return obj;
}
var GLOBAL_STORAGE_KEY = /* @__PURE__ */ Symbol.for("tanstack-start:start-storage-context");
var globalObj = globalThis;
if (!globalObj[GLOBAL_STORAGE_KEY]) globalObj[GLOBAL_STORAGE_KEY] = new AsyncLocalStorage();
var startStorage = globalObj[GLOBAL_STORAGE_KEY];
async function runWithStartContext(context, fn) {
  return startStorage.run(context, fn);
}
function getStartContext(opts) {
  const context = startStorage.getStore();
  if (!context && opts?.throwIfNotFound !== false) throw new Error(`No Start context found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`);
  return context;
}
var getStartOptions = () => getStartContext().startOptions;
var getStartContextServerOnly = getStartContext;
var createServerFn = (options, __opts) => {
  const resolvedOptions = __opts || options || {};
  if (typeof resolvedOptions.method === "undefined") resolvedOptions.method = "GET";
  const setValidator = (validator) => {
    return createServerFn(void 0, {
      ...resolvedOptions,
      validator,
      inputValidator: validator
    });
  };
  const res = {
    options: resolvedOptions,
    middleware: (middleware) => {
      const newMiddleware = [...resolvedOptions.middleware || []];
      middleware.map((m) => {
        if (TSS_SERVER_FUNCTION_FACTORY in m) {
          if (m.options.middleware) newMiddleware.push(...m.options.middleware);
        } else newMiddleware.push(m);
      });
      const res2 = createServerFn(void 0, {
        ...resolvedOptions,
        middleware: newMiddleware
      });
      res2[TSS_SERVER_FUNCTION_FACTORY] = true;
      return res2;
    },
    validator: setValidator,
    inputValidator: setValidator,
    handler: (...args) => {
      const [extractedFn, serverFn] = args;
      const newOptions = {
        ...resolvedOptions,
        extractedFn,
        serverFn
      };
      const resolvedMiddleware = [...newOptions.middleware || [], serverFnBaseToMiddleware(newOptions)];
      extractedFn.method = resolvedOptions.method;
      return Object.assign(async (opts) => {
        const result = await executeMiddleware$1(resolvedMiddleware, "client", {
          ...extractedFn,
          ...newOptions,
          data: opts?.data,
          headers: opts?.headers,
          signal: opts?.signal,
          fetch: opts?.fetch,
          context: createNullProtoObject()
        });
        const redirect = parseRedirect(result.error);
        if (redirect) throw redirect;
        if (result.error) throw result.error;
        return result.result;
      }, {
        ...extractedFn,
        method: resolvedOptions.method,
        __executeServer: async (opts) => {
          const startContext = getStartContextServerOnly();
          const serverContextAfterGlobalMiddlewares = startContext.contextAfterGlobalMiddlewares;
          return await executeMiddleware$1(resolvedMiddleware, "server", {
            ...extractedFn,
            ...opts,
            serverFnMeta: extractedFn.serverFnMeta,
            context: safeObjectMerge(opts.context, serverContextAfterGlobalMiddlewares),
            request: startContext.request
          }).then((d) => ({
            result: d.result,
            error: d.error,
            context: d.sendContext
          }));
        }
      });
    }
  };
  const fun = (options2) => {
    return createServerFn(void 0, {
      ...resolvedOptions,
      ...options2
    });
  };
  return Object.assign(fun, res);
};
async function executeMiddleware$1(middlewares, env, opts) {
  let flattenedMiddlewares = flattenMiddlewares([...getStartOptions()?.functionMiddleware || [], ...middlewares]);
  if (env === "server") {
    const startContext = getStartContextServerOnly({ throwIfNotFound: false });
    if (startContext?.executedRequestMiddlewares) flattenedMiddlewares = flattenedMiddlewares.filter((m) => !startContext.executedRequestMiddlewares.has(m));
  }
  const callNextMiddleware = async (ctx) => {
    const nextMiddleware = flattenedMiddlewares.shift();
    if (!nextMiddleware) return ctx;
    try {
      let validator = "validator" in nextMiddleware.options ? nextMiddleware.options.validator : void 0;
      if (!validator && "inputValidator" in nextMiddleware.options) validator = nextMiddleware.options.inputValidator;
      if (validator && env === "server") ctx.data = await execValidator(validator, ctx.data);
      let middlewareFn = void 0;
      if (env === "client") {
        if ("client" in nextMiddleware.options) middlewareFn = nextMiddleware.options.client;
      } else if ("server" in nextMiddleware.options) middlewareFn = nextMiddleware.options.server;
      if (middlewareFn) {
        const userNext = async (userCtx = {}) => {
          const result2 = await callNextMiddleware({
            ...ctx,
            ...userCtx,
            context: safeObjectMerge(ctx.context, userCtx.context),
            sendContext: safeObjectMerge(ctx.sendContext, userCtx.sendContext),
            headers: mergeHeaders(ctx.headers, userCtx.headers),
            _callSiteFetch: ctx._callSiteFetch,
            fetch: ctx._callSiteFetch ?? userCtx.fetch ?? ctx.fetch,
            result: userCtx.result !== void 0 ? userCtx.result : userCtx instanceof Response ? userCtx : ctx.result,
            error: userCtx.error ?? ctx.error
          });
          if (result2.error) throw result2.error;
          return result2;
        };
        const result = await middlewareFn({
          ...ctx,
          next: userNext
        });
        if (isRedirect(result)) return {
          ...ctx,
          error: result
        };
        if (result instanceof Response) return {
          ...ctx,
          result
        };
        if (!result) throw new Error("User middleware returned undefined. You must call next() or return a result in your middlewares.");
        return result;
      }
      return callNextMiddleware(ctx);
    } catch (error) {
      return {
        ...ctx,
        error
      };
    }
  };
  return callNextMiddleware({
    ...opts,
    headers: opts.headers || {},
    sendContext: opts.sendContext || {},
    context: opts.context || createNullProtoObject(),
    _callSiteFetch: opts.fetch
  });
}
function flattenMiddlewares(middlewares, maxDepth = 100) {
  const seen = /* @__PURE__ */ new Set();
  const flattened = [];
  const recurse = (middleware, depth) => {
    if (depth > maxDepth) throw new Error(`Middleware nesting depth exceeded maximum of ${maxDepth}. Check for circular references.`);
    middleware.forEach((m) => {
      if (m.options.middleware) recurse(m.options.middleware, depth + 1);
      if (!seen.has(m)) {
        seen.add(m);
        flattened.push(m);
      }
    });
  };
  recurse(middlewares, 0);
  return flattened;
}
async function execValidator(validator, input) {
  if (validator == null) return {};
  if ("~standard" in validator) {
    const result = await validator["~standard"].validate(input);
    if (result.issues) throw new Error(JSON.stringify(result.issues, void 0, 2));
    return result.value;
  }
  if ("parse" in validator) return validator.parse(input);
  if (typeof validator === "function") return validator(input);
  throw new Error("Invalid validator type!");
}
function serverFnBaseToMiddleware(options) {
  return {
    "~types": void 0,
    options: {
      inputValidator: options.validator ?? options.inputValidator,
      client: async ({ next, sendContext, fetch: fetch2, ...ctx }) => {
        const payload = {
          ...ctx,
          context: sendContext,
          fetch: fetch2
        };
        return next(await options.extractedFn?.(payload));
      },
      server: async ({ next, ...ctx }) => {
        const result = await options.serverFn?.(ctx);
        return next({
          ...ctx,
          result
        });
      }
    }
  };
}
var createMiddleware = (options, __opts) => {
  const resolvedOptions = {
    type: "request",
    ...__opts || options
  };
  const setValidator = (validator) => {
    return createMiddleware({}, Object.assign(resolvedOptions, {
      validator,
      inputValidator: validator
    }));
  };
  return {
    options: resolvedOptions,
    middleware: (middleware) => {
      return createMiddleware({}, Object.assign(resolvedOptions, { middleware }));
    },
    validator: setValidator,
    inputValidator: setValidator,
    client: (client) => {
      return createMiddleware({}, Object.assign(resolvedOptions, { client }));
    },
    server: (server2) => {
      return createMiddleware({}, Object.assign(resolvedOptions, { server: server2 }));
    }
  };
};
var innerCreateCsrfMiddleware = (opts = {}) => {
  const middleware = createMiddleware().server(async (ctx) => {
    const csrfCtx = ctx;
    if (opts.filter && !await opts.filter(csrfCtx)) return ctx.next();
    if (await isCsrfRequestAllowed(opts, csrfCtx)) return ctx.next();
    return getFailureResponse(opts, csrfCtx);
  });
  return middleware;
};
var createCsrfMiddleware = innerCreateCsrfMiddleware;
async function isCsrfRequestAllowed(opts, ctx) {
  const result = await getCsrfRequestValidationResult(opts, ctx);
  return result === true || result === void 0 && opts.allowRequestsWithoutOriginCheck === true;
}
async function getCsrfRequestValidationResult(opts, ctx) {
  const fetchSite = ctx.request.headers.get("Sec-Fetch-Site");
  if (fetchSite !== null) return matchValue(opts.secFetchSite ?? "same-origin", fetchSite, ctx);
  const origin = ctx.request.headers.get("Origin");
  if (origin !== null) {
    if (opts.origin) return matchValue(opts.origin, origin, ctx);
    return origin === new URL(ctx.request.url).origin;
  }
  const referer = ctx.request.headers.get("Referer");
  if (referer === null || opts.referer === false) return;
  if (typeof opts.referer === "function") return opts.referer(referer, ctx);
  if (opts.origin) {
    const refererOrigin = getOriginFromUrl(referer);
    return refererOrigin !== void 0 && matchValue(opts.origin, refererOrigin, ctx);
  }
  return isRefererSameOrigin(referer, new URL(ctx.request.url).origin);
}
async function matchValue(matcher, value, ctx) {
  if (typeof matcher === "function") return matcher(value, ctx);
  if (Array.isArray(matcher)) return matcher.includes(value);
  return value === matcher;
}
function getOriginFromUrl(url) {
  try {
    return new URL(url).origin;
  } catch {
    return;
  }
}
function isRefererSameOrigin(referer, requestOrigin) {
  if (referer === requestOrigin) return true;
  if (!referer.startsWith(requestOrigin)) return false;
  if (referer.length === requestOrigin.length) return true;
  const code = referer.charCodeAt(requestOrigin.length);
  return code === 47 || code === 63 || code === 35;
}
async function getFailureResponse(opts, ctx) {
  if (typeof opts.failureResponse === "function") return opts.failureResponse(ctx);
  return opts.failureResponse?.clone() ?? new Response("Forbidden", {
    status: 403
  });
}
function getDefaultSerovalPlugins() {
  return [...getStartOptions()?.serializationAdapters?.map(makeSerovalPlugin) ?? [], ...defaultSerovalPlugins];
}
var textEncoder = new TextEncoder();
var EMPTY_PAYLOAD = new Uint8Array(0);
function encodeFrame(type, streamId, payload) {
  const frame = new Uint8Array(FRAME_HEADER_SIZE + payload.length);
  frame[0] = type;
  frame[1] = streamId >>> 24 & 255;
  frame[2] = streamId >>> 16 & 255;
  frame[3] = streamId >>> 8 & 255;
  frame[4] = streamId & 255;
  frame[5] = payload.length >>> 24 & 255;
  frame[6] = payload.length >>> 16 & 255;
  frame[7] = payload.length >>> 8 & 255;
  frame[8] = payload.length & 255;
  frame.set(payload, FRAME_HEADER_SIZE);
  return frame;
}
function encodeJSONFrame(json) {
  return encodeFrame(FrameType.JSON, 0, textEncoder.encode(json));
}
function encodeChunkFrame(streamId, chunk) {
  return encodeFrame(FrameType.CHUNK, streamId, chunk);
}
function encodeEndFrame(streamId) {
  return encodeFrame(FrameType.END, streamId, EMPTY_PAYLOAD);
}
function encodeErrorFrame(streamId, error) {
  const message = error instanceof Error ? error.message : String(error ?? "Unknown error");
  return encodeFrame(FrameType.ERROR, streamId, textEncoder.encode(message));
}
function createMultiplexedStream(jsonStream, rawStreams, lateStreamSource) {
  let controller;
  let cancelled = false;
  const readers = [];
  const enqueue = (frame) => {
    if (cancelled) return false;
    try {
      controller.enqueue(frame);
      return true;
    } catch {
      return false;
    }
  };
  const errorOutput = (error) => {
    if (cancelled) return;
    cancelled = true;
    try {
      controller.error(error);
    } catch {
    }
    for (const reader of readers) reader.cancel().catch(() => {
    });
  };
  async function pumpRawStream(streamId, stream) {
    const reader = stream.getReader();
    readers.push(reader);
    try {
      while (!cancelled) {
        const { done, value } = await reader.read();
        if (done) {
          enqueue(encodeEndFrame(streamId));
          return;
        }
        if (!enqueue(encodeChunkFrame(streamId, value))) return;
      }
    } catch (error) {
      enqueue(encodeErrorFrame(streamId, error));
    } finally {
      reader.releaseLock();
    }
  }
  async function pumpJSON() {
    const reader = jsonStream.getReader();
    readers.push(reader);
    try {
      while (!cancelled) {
        const { done, value } = await reader.read();
        if (done) return;
        if (!enqueue(encodeJSONFrame(value))) return;
      }
    } catch (error) {
      errorOutput(error);
      throw error;
    } finally {
      reader.releaseLock();
    }
  }
  async function pumpLateStreams() {
    if (!lateStreamSource) return [];
    const lateStreamPumps = [];
    const reader = lateStreamSource.getReader();
    readers.push(reader);
    try {
      while (!cancelled) {
        const { done, value } = await reader.read();
        if (done) break;
        lateStreamPumps.push(pumpRawStream(value.id, value.stream));
      }
    } finally {
      reader.releaseLock();
    }
    return lateStreamPumps;
  }
  return new ReadableStream({
    async start(ctrl) {
      controller = ctrl;
      const pumps = [pumpJSON()];
      for (const [streamId, stream] of rawStreams) pumps.push(pumpRawStream(streamId, stream));
      if (lateStreamSource) pumps.push(pumpLateStreams());
      try {
        const latePumps = (await Promise.all(pumps)).find(Array.isArray);
        if (latePumps && latePumps.length > 0) await Promise.all(latePumps);
        if (!cancelled) try {
          controller.close();
        } catch {
        }
      } catch {
      }
    },
    cancel() {
      cancelled = true;
      for (const reader of readers) reader.cancel().catch(() => {
      });
      readers.length = 0;
    }
  });
}
var serovalPlugins = void 0;
var FORM_DATA_CONTENT_TYPES = ["multipart/form-data", "application/x-www-form-urlencoded"];
var MAX_PAYLOAD_SIZE = 1e6;
var handleServerAction = async ({ request, context, serverFnId }) => {
  const methodUpper = request.method.toUpperCase();
  const url = new URL(request.url);
  const action = await getServerFnById(serverFnId);
  if (action.method && methodUpper !== action.method) return new Response(`expected ${action.method} method. Got ${methodUpper}`, {
    status: 405,
    headers: { Allow: action.method }
  });
  const isServerFn = request.headers.get("x-tsr-serverFn") === "true";
  if (!serovalPlugins) serovalPlugins = getDefaultSerovalPlugins();
  const contentType = request.headers.get("Content-Type");
  function parsePayload(payload) {
    return fromJSON(payload, { plugins: serovalPlugins });
  }
  return await (async () => {
    try {
      let serializeResult = function(res2) {
        let nonStreamingBody = void 0;
        const alsResponse = getResponse();
        if (res2 !== void 0) {
          const rawStreams = /* @__PURE__ */ new Map();
          let initialPhase = true;
          let lateStreamWriter;
          let lateStreamReadable = void 0;
          const pendingLateStreams = [];
          const plugins = [createRawStreamRPCPlugin((id, stream) => {
            if (initialPhase) {
              rawStreams.set(id, stream);
              return;
            }
            if (lateStreamWriter) {
              lateStreamWriter.write({
                id,
                stream
              }).catch(() => {
              });
              return;
            }
            pendingLateStreams.push({
              id,
              stream
            });
          }), ...serovalPlugins || []];
          let done = false;
          const callbacks = {
            onParse: (value) => {
              nonStreamingBody = value;
            },
            onDone: () => {
              done = true;
            },
            onError: (error) => {
              throw error;
            }
          };
          toCrossJSONStream(res2, {
            refs: /* @__PURE__ */ new Map(),
            plugins,
            onParse(value) {
              callbacks.onParse(value);
            },
            onDone() {
              callbacks.onDone();
            },
            onError: (error) => {
              callbacks.onError(error);
            }
          });
          initialPhase = false;
          if (done && rawStreams.size === 0) return new Response(nonStreamingBody ? JSON.stringify(nonStreamingBody) : void 0, {
            status: alsResponse.status,
            statusText: alsResponse.statusText,
            headers: {
              "Content-Type": "application/json",
              [X_TSS_SERIALIZED]: "true"
            }
          });
          const { readable, writable } = new TransformStream();
          lateStreamReadable = readable;
          lateStreamWriter = writable.getWriter();
          for (const registration of pendingLateStreams) lateStreamWriter.write(registration).catch(() => {
          });
          pendingLateStreams.length = 0;
          const multiplexedStream = createMultiplexedStream(new ReadableStream({
            start(controller) {
              callbacks.onParse = (value) => {
                controller.enqueue(JSON.stringify(value) + "\n");
              };
              callbacks.onDone = () => {
                try {
                  controller.close();
                } catch {
                }
                lateStreamWriter?.close().catch(() => {
                }).finally(() => {
                  lateStreamWriter = void 0;
                });
              };
              callbacks.onError = (error) => {
                controller.error(error);
                lateStreamWriter?.abort(error).catch(() => {
                }).finally(() => {
                  lateStreamWriter = void 0;
                });
              };
              if (nonStreamingBody !== void 0) callbacks.onParse(nonStreamingBody);
              if (done) callbacks.onDone();
            },
            cancel() {
              lateStreamWriter?.abort().catch(() => {
              });
              lateStreamWriter = void 0;
            }
          }), rawStreams, lateStreamReadable);
          return new Response(multiplexedStream, {
            status: alsResponse.status,
            statusText: alsResponse.statusText,
            headers: {
              "Content-Type": TSS_CONTENT_TYPE_FRAMED_VERSIONED,
              [X_TSS_SERIALIZED]: "true"
            }
          });
        }
        return new Response(void 0, {
          status: alsResponse.status,
          statusText: alsResponse.statusText
        });
      };
      let res = await (async () => {
        if (FORM_DATA_CONTENT_TYPES.some((type) => contentType && contentType.includes(type))) {
          if (methodUpper === "GET") {
            if (false) ;
            invariant();
          }
          const formData = await request.formData();
          const serializedContext = formData.get(TSS_FORMDATA_CONTEXT);
          formData.delete(TSS_FORMDATA_CONTEXT);
          const params = {
            context,
            data: formData,
            method: methodUpper
          };
          if (typeof serializedContext === "string") try {
            const deserializedContext = fromJSON(JSON.parse(serializedContext), { plugins: serovalPlugins });
            if (typeof deserializedContext === "object" && deserializedContext) params.context = safeObjectMerge(deserializedContext, context);
          } catch (e) {
            if (false) ;
          }
          return await action(params);
        }
        if (methodUpper === "GET") {
          const payloadParam = url.searchParams.get("payload");
          if (payloadParam && payloadParam.length > MAX_PAYLOAD_SIZE) throw new Error("Payload too large");
          const payload2 = payloadParam ? parsePayload(JSON.parse(payloadParam)) : {};
          payload2.context = safeObjectMerge(payload2.context, context);
          payload2.method = methodUpper;
          return await action(payload2);
        }
        let jsonPayload;
        if (contentType?.includes("application/json")) jsonPayload = await request.json();
        const payload = jsonPayload ? parsePayload(jsonPayload) : {};
        payload.context = safeObjectMerge(payload.context, context);
        payload.method = methodUpper;
        return await action(payload);
      })();
      const unwrapped = res.result || res.error;
      if (isNotFound(res)) res = isNotFoundResponse(res);
      if (!isServerFn) return unwrapped;
      if (unwrapped instanceof Response) {
        if (isRedirect(unwrapped)) return unwrapped;
        unwrapped.headers.set(X_TSS_RAW_RESPONSE, "true");
        return unwrapped;
      }
      return serializeResult(res);
    } catch (error) {
      if (error instanceof Response) return error;
      if (isNotFound(error)) return isNotFoundResponse(error);
      console.info();
      console.info("Server Fn Error!");
      console.info();
      console.error(error);
      console.info();
      const serializedError = JSON.stringify(await Promise.resolve(toCrossJSONAsync(error, {
        refs: /* @__PURE__ */ new Map(),
        plugins: serovalPlugins
      })));
      const response = getResponse();
      return new Response(serializedError, {
        status: response.status ?? 500,
        statusText: response.statusText,
        headers: {
          "Content-Type": "application/json",
          [X_TSS_SERIALIZED]: "true"
        }
      });
    }
  })();
};
function isNotFoundResponse(error) {
  const { headers, ...rest } = error;
  return new Response(JSON.stringify(rest), {
    status: 404,
    headers: {
      "Content-Type": "application/json",
      ...headers || {}
    }
  });
}
var LINK_PARAM_TOKEN_RE = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
var PRELOAD_AS_VALUES = /* @__PURE__ */ new Set([
  "fetch",
  "font",
  "image",
  "script",
  "style",
  "track"
]);
function buildLinkParam(name, value) {
  if (value === void 0) return name;
  if (LINK_PARAM_TOKEN_RE.test(value)) return `${name}=${value}`;
  return `${name}=${JSON.stringify(value)}`;
}
function serializeEarlyHint(hint) {
  const parts = [`<${hint.href}>`, buildLinkParam("rel", hint.rel)];
  if (hint.as) parts.push(buildLinkParam("as", hint.as));
  if (hint.crossOrigin !== void 0) parts.push(buildLinkParam("crossorigin", hint.crossOrigin || void 0));
  if (hint.type) parts.push(buildLinkParam("type", hint.type));
  if (hint.integrity) parts.push(buildLinkParam("integrity", hint.integrity));
  if (hint.referrerPolicy) parts.push(buildLinkParam("referrerpolicy", hint.referrerPolicy));
  if (hint.fetchPriority) parts.push(buildLinkParam("fetchpriority", hint.fetchPriority));
  return parts.join("; ");
}
function getStringAttr(attrs, name, fallbackName) {
  const value = attrs?.[name] ?? (fallbackName ? attrs?.[fallbackName] : void 0);
  return typeof value === "string" ? value : void 0;
}
function getPreloadAs(attrs) {
  const as = getStringAttr(attrs, "as");
  return as && PRELOAD_AS_VALUES.has(as) ? as : void 0;
}
function addEarlyHintFetchAttrs(hint, attrs) {
  const crossOrigin = getStringAttr(attrs, "crossOrigin", "crossorigin");
  const type = getStringAttr(attrs, "type");
  const integrity = getStringAttr(attrs, "integrity");
  const referrerPolicy = getStringAttr(attrs, "referrerPolicy", "referrerpolicy");
  const fetchPriority = getStringAttr(attrs, "fetchPriority", "fetchpriority");
  if (crossOrigin !== void 0) hint.crossOrigin = crossOrigin;
  if (type) hint.type = type;
  if (integrity) hint.integrity = integrity;
  if (referrerPolicy) hint.referrerPolicy = referrerPolicy;
  if (fetchPriority) hint.fetchPriority = fetchPriority;
}
function linkAttrsToEarlyHint(attrs) {
  const href = getStringAttr(attrs, "href");
  const rel = getStringAttr(attrs, "rel");
  if (!href || !rel) return void 0;
  const relTokens = rel.split(/\s+/);
  let hintRel;
  let hintAs;
  if (relTokens.includes("modulepreload")) {
    hintRel = "modulepreload";
    hintAs = "script";
  } else if (relTokens.includes("stylesheet")) {
    hintRel = "preload";
    hintAs = "style";
  } else if (relTokens.includes("preload")) {
    hintAs = getPreloadAs(attrs);
    if (!hintAs) return void 0;
    hintRel = "preload";
  } else if (relTokens.includes("preconnect")) {
    hintRel = "preconnect";
    hintAs = void 0;
  } else if (relTokens.includes("dns-prefetch")) {
    hintRel = "dns-prefetch";
    hintAs = void 0;
  }
  if (!hintRel) return void 0;
  const hint = {
    href,
    rel: hintRel
  };
  if (hintAs) hint.as = hintAs;
  addEarlyHintFetchAttrs(hint, attrs);
  return hint;
}
function collectStaticHintsFromManifest(manifest2, matchedRoutes) {
  const hints = [];
  for (const route of matchedRoutes) {
    const routeManifest = manifest2.routes[route.id];
    if (!routeManifest) continue;
    for (const link of routeManifest.preloads ?? []) {
      const attrs = getScriptPreloadAttrs(manifest2, link);
      const hint = {
        href: attrs.href,
        rel: attrs.rel,
        as: "script"
      };
      if (attrs.crossOrigin !== void 0) hint.crossOrigin = attrs.crossOrigin;
      hints.push(hint);
    }
    for (const link of routeManifest.css ?? []) {
      const stylesheetHref = getStylesheetHref(link);
      if (manifest2.inlineCss?.styles[stylesheetHref] !== void 0) continue;
      const resolvedLink = resolveManifestCssLink(link);
      const hint = {
        href: stylesheetHref,
        rel: "preload",
        as: "style"
      };
      if (resolvedLink.crossOrigin !== void 0) hint.crossOrigin = resolvedLink.crossOrigin;
      hints.push(hint);
    }
  }
  return hints;
}
function collectDynamicHintsFromMatches(matches) {
  const hints = [];
  for (const match of matches) {
    const links = match.links;
    if (!Array.isArray(links)) continue;
    for (const link of links) {
      const hint = linkAttrsToEarlyHint(link);
      if (hint) hints.push(hint);
    }
  }
  return hints;
}
function createEarlyHintsEvent(opts) {
  const nextHints = [];
  const nextLinks = [];
  for (const hint of opts.hints) {
    const link = serializeEarlyHint(hint);
    if (opts.sentLinks.has(link)) continue;
    opts.sentLinks.add(link);
    opts.sentHints.push(hint);
    nextHints.push(hint);
    nextLinks.push(link);
  }
  if (!nextHints.length && opts.phase !== "dynamic") return void 0;
  return {
    phase: opts.phase,
    hints: nextHints,
    links: nextLinks,
    allHints: opts.sentHints.slice(),
    allLinks: Array.from(opts.sentLinks)
  };
}
function createResponseLinkHeaderEntries(opts) {
  for (const hint of opts.hints) {
    const link = serializeEarlyHint(hint);
    if (opts.sentLinks.has(link)) continue;
    opts.sentLinks.add(link);
    opts.entries.push({
      phase: opts.phase,
      hint,
      link
    });
  }
}
function getResponseLinkHeaderEntries(opts) {
  if (!opts.filter) return opts.entries.map((entry) => entry.link);
  try {
    const links = [];
    for (const entry of opts.entries) if (opts.filter(entry)) links.push(entry.link);
    return links;
  } catch (err) {
    console.error("Error filtering response Link headers:", err);
    return [];
  }
}
function notifyEarlyHints(phase, event, onEarlyHints) {
  try {
    const result = onEarlyHints(event);
    if (result) Promise.resolve(result).catch((err) => {
      console.error(`Error sending ${phase} early hints:`, err);
    });
  } catch (err) {
    console.error(`Error sending ${phase} early hints:`, err);
  }
}
function getResponseLinkHeaderFilter(responseLinkHeader) {
  if (typeof responseLinkHeader !== "object") return;
  return responseLinkHeader.filter;
}
function appendResponseLinkHeaders(opts) {
  for (const link of getResponseLinkHeaderEntries(opts)) opts.responseHeaders.append("Link", link);
}
function collectResponseLinkHeaderEntries(opts) {
  for (let index = 0; index < opts.event.hints.length; index++) opts.entries.push({
    phase: opts.phase,
    hint: opts.event.hints[index],
    link: opts.event.links[index]
  });
}
function collectEarlyHintsPhase(opts) {
  const event = opts.onEarlyHints ? createEarlyHintsEvent({
    phase: opts.phase,
    hints: opts.hints,
    sentLinks: opts.sentLinks,
    sentHints: opts.sentHints
  }) : void 0;
  if (event) notifyEarlyHints(opts.phase, event, opts.onEarlyHints);
  if (!opts.responseLinkHeaderEntries) return;
  if (event) {
    collectResponseLinkHeaderEntries({
      phase: opts.phase,
      event,
      entries: opts.responseLinkHeaderEntries
    });
    return;
  }
  createResponseLinkHeaderEntries({
    phase: opts.phase,
    hints: opts.hints,
    sentLinks: opts.sentLinks,
    entries: opts.responseLinkHeaderEntries
  });
}
function createEarlyHintsCollector(opts) {
  if (!opts?.onEarlyHints && !opts?.responseLinkHeader) return;
  const sentLinks = /* @__PURE__ */ new Set();
  const sentHints = opts.onEarlyHints ? new Array() : void 0;
  const responseLinkHeaderEntries = opts.responseLinkHeader ? new Array() : void 0;
  const responseLinkHeaderFilter = getResponseLinkHeaderFilter(opts.responseLinkHeader);
  return {
    collectStatic: ({ manifest: manifest2, matchedRoutes }) => {
      if (!matchedRoutes?.length) return;
      collectEarlyHintsPhase({
        phase: "static",
        hints: collectStaticHintsFromManifest(manifest2, matchedRoutes),
        sentLinks,
        sentHints,
        onEarlyHints: opts.onEarlyHints,
        responseLinkHeaderEntries
      });
    },
    collectDynamic: (matches) => {
      collectEarlyHintsPhase({
        phase: "dynamic",
        hints: collectDynamicHintsFromMatches(matches),
        sentLinks,
        sentHints,
        onEarlyHints: opts.onEarlyHints,
        responseLinkHeaderEntries
      });
    },
    appendResponseHeaders: (headers) => {
      if (!responseLinkHeaderEntries?.length) return;
      appendResponseLinkHeaders({
        responseHeaders: headers,
        entries: responseLinkHeaderEntries,
        filter: responseLinkHeaderFilter
      });
    }
  };
}
function normalizeTransformAssetResult(result) {
  if (typeof result === "string") return { href: result };
  return result;
}
function escapeCssString(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\a ").replace(/\r/g, "\\d ").replace(/\f/g, "\\c ");
}
async function transformInlineCssTemplate(options) {
  const { strings, urls } = options.template;
  if (strings.length !== urls.length + 1) throw new Error(`TanStack Start inlineCss template for ${options.stylesheetHref} is invalid`);
  let css = strings[0];
  for (let index = 0; index < urls.length; index++) {
    const transformed = normalizeTransformAssetResult(await options.transformFn({
      kind: "css-url",
      url: urls[index],
      stylesheetHref: options.stylesheetHref
    }));
    css += escapeCssString(transformed.href) + strings[index + 1];
  }
  return css;
}
async function transformInlineCssStyles(inlineCss, transformFn) {
  const transformedStyles = {};
  const transformedEntries = await Promise.all(Object.entries(inlineCss.styles).map(async ([stylesheetHref, css]) => {
    const template = inlineCss.templates?.[stylesheetHref];
    return [stylesheetHref, template ? await transformInlineCssTemplate({
      stylesheetHref,
      template,
      transformFn
    }) : css];
  }));
  for (const [stylesheetHref, css] of transformedEntries) transformedStyles[stylesheetHref] = css;
  return {
    styles: transformedStyles,
    ...inlineCss.templates ? { templates: inlineCss.templates } : {}
  };
}
function resolveTransformAssetsCrossOrigin(config, kind) {
  if (!config) return void 0;
  if (typeof config === "string") return config;
  return config[kind];
}
function isObjectShorthand(transform) {
  return "prefix" in transform;
}
function resolveTransformAssetsConfig(transform) {
  if (typeof transform === "string") {
    const prefix = transform;
    return {
      type: "transform",
      transformFn: ({ url }) => ({ href: `${prefix}${url}` }),
      cache: true
    };
  }
  if (typeof transform === "function") return {
    type: "transform",
    transformFn: transform,
    cache: true
  };
  if (isObjectShorthand(transform)) {
    const { prefix, crossOrigin } = transform;
    return {
      type: "transform",
      transformFn: ({ url, kind }) => {
        const href = `${prefix}${url}`;
        if (kind === "css-url") return { href };
        const co = resolveTransformAssetsCrossOrigin(crossOrigin, kind);
        return co ? {
          href,
          crossOrigin: co
        } : { href };
      },
      cache: true
    };
  }
  if ("createTransform" in transform && transform.createTransform) return {
    type: "createTransform",
    createTransform: transform.createTransform,
    cache: transform.cache !== false
  };
  return {
    type: "transform",
    transformFn: typeof transform.transform === "string" ? (({ url }) => ({ href: `${transform.transform}${url}` })) : transform.transform,
    cache: transform.cache !== false
  };
}
function assignManifestLink(link, next) {
  if (typeof link === "string") return next.crossOrigin ? next : next.href;
  const nextLink = {
    ...link,
    href: next.href
  };
  if (next.crossOrigin) nextLink.crossOrigin = next.crossOrigin;
  else delete nextLink.crossOrigin;
  return nextLink;
}
async function transformManifestAssets(source, transformFn, _opts) {
  const manifest2 = structuredClone(source);
  const inlineCssEnabled = _opts?.inlineCss !== false;
  const scriptTransforms = /* @__PURE__ */ new Map();
  const transformScript = (url) => {
    const cached = scriptTransforms.get(url);
    if (cached) return cached;
    const transformed = Promise.resolve(transformFn({
      url,
      kind: "script"
    })).then(normalizeTransformAssetResult);
    scriptTransforms.set(url, transformed);
    return transformed;
  };
  if (!inlineCssEnabled) delete manifest2.inlineCss;
  else if (manifest2.inlineCss) manifest2.inlineCss = await transformInlineCssStyles(manifest2.inlineCss, transformFn);
  for (const route of Object.values(manifest2.routes)) {
    if (route.preloads?.length) route.preloads = await Promise.all(route.preloads.map(async (link) => {
      const result = await transformScript(resolveManifestAssetLink(link).href);
      return assignManifestLink(link, {
        href: result.href,
        crossOrigin: result.crossOrigin
      });
    }));
    if (route.css?.length && !manifest2.inlineCss) route.css = await Promise.all(route.css.map(async (link) => {
      const result = normalizeTransformAssetResult(await transformFn({
        url: resolveManifestCssLink(link).href,
        kind: "stylesheet"
      }));
      return assignManifestLink(link, {
        href: result.href,
        crossOrigin: result.crossOrigin
      });
    }));
    if (route.scripts?.length) for (const script of route.scripts) {
      const src = script.attrs?.src;
      if (typeof src !== "string") continue;
      const result = await transformScript(src);
      script.attrs = {
        ...script.attrs,
        src: result.href
      };
      if (result.crossOrigin) script.attrs.crossOrigin = result.crossOrigin;
      else delete script.attrs.crossOrigin;
    }
  }
  return manifest2;
}
function buildManifest(source, opts) {
  return {
    ...source.scriptFormat ? { scriptFormat: source.scriptFormat } : {},
    ...opts?.inlineCss !== false && source.inlineCss ? { inlineCss: structuredClone(source.inlineCss) } : {},
    routes: { ...source.routes }
  };
}
function getStaticHandlerInlineCssDefault(handlerInlineCss) {
  if (typeof handlerInlineCss === "function") return;
  return handlerInlineCss ?? true;
}
async function resolveInlineCssForRequest(opts) {
  if (opts.requestInlineCss !== void 0) return opts.requestInlineCss;
  if (typeof opts.handlerInlineCss === "function") return await opts.handlerInlineCss({ request: opts.request });
  return opts.handlerInlineCss ?? true;
}
function createCachedBaseManifestLoader(loadBaseManifest) {
  let baseManifestPromise;
  return () => {
    if (!baseManifestPromise) baseManifestPromise = loadBaseManifest().catch((error) => {
      baseManifestPromise = void 0;
      throw error;
    });
    return baseManifestPromise;
  };
}
function createFinalManifestTransformResolver(transformAssets, opts) {
  const transformConfig = transformAssets !== void 0 ? resolveTransformAssetsConfig(transformAssets) : void 0;
  const cache = transformConfig ? transformConfig.cache : true;
  const warmup = !!transformAssets && typeof transformAssets === "object" && "warmup" in transformAssets && transformAssets.warmup === true;
  let cachedCreateTransformPromise;
  const clearCachedCreateTransform = () => {
    cachedCreateTransformPromise = void 0;
  };
  return {
    cache,
    warmup,
    clearCachedCreateTransform,
    getTransformFn: async (ctx) => {
      if (!transformConfig) return void 0;
      if (transformConfig.type !== "createTransform") return transformConfig.transformFn;
      if (!cache || false) return transformConfig.createTransform(ctx);
      if (!cachedCreateTransformPromise) cachedCreateTransformPromise = Promise.resolve(transformConfig.createTransform(ctx)).catch((error) => {
        clearCachedCreateTransform();
        throw error;
      });
      return cachedCreateTransformPromise;
    }
  };
}
function createFinalManifestResolver(opts) {
  const finalManifestCache = /* @__PURE__ */ new Map();
  const transformResolver = createFinalManifestTransformResolver(opts.transformAssets);
  const handlerDefaultInlineCss = getStaticHandlerInlineCssDefault(opts.inlineCss);
  const getRequestManifestOptions = async (requestOpts) => {
    const transformFn = await transformResolver.getTransformFn({
      warmup: false,
      request: requestOpts.request
    });
    const inlineCss = await resolveInlineCssForRequest({
      request: requestOpts.request,
      handlerInlineCss: opts.inlineCss,
      requestInlineCss: requestOpts.requestInlineCss
    });
    return {
      getBaseManifest: requestOpts.getBaseManifest,
      transformFn,
      cache: transformResolver.cache,
      inlineCss
    };
  };
  const resolveRequest = async (requestOpts, cache) => {
    return resolveFinalManifest({
      ...await getRequestManifestOptions(requestOpts),
      finalManifestCache: cache
    });
  };
  return {
    warmup: ({ getBaseManifest: getBaseManifest2 }) => warmupFinalManifest({
      enabled: transformResolver.warmup,
      handlerDefaultInlineCss,
      cache: transformResolver.cache,
      finalManifestCache,
      getBaseManifest: getBaseManifest2,
      getTransformFn: () => transformResolver.getTransformFn({ warmup: true }),
      onError: transformResolver.clearCachedCreateTransform
    }),
    resolveCached: (requestOpts) => resolveRequest(requestOpts, finalManifestCache),
    resolveUncached: (requestOpts) => resolveRequest(requestOpts, void 0)
  };
}
function getFinalManifestCacheKey(inlineCss) {
  return inlineCss ? "inline-css" : "linked-css";
}
function cacheFinalManifestPromise(cachedFinalManifestPromises, cacheKey, promise) {
  const cachedFinalManifestPromise = promise.catch((error) => {
    if (cachedFinalManifestPromises.get(cacheKey) === cachedFinalManifestPromise) cachedFinalManifestPromises.delete(cacheKey);
    throw error;
  });
  cachedFinalManifestPromises.set(cacheKey, cachedFinalManifestPromise);
  return cachedFinalManifestPromise;
}
function getOrCreateCachedFinalManifestPromise(cachedFinalManifestPromises, cacheKey, computeFinalManifest) {
  const cachedFinalManifestPromise = cachedFinalManifestPromises.get(cacheKey);
  if (cachedFinalManifestPromise) return cachedFinalManifestPromise;
  return cacheFinalManifestPromise(cachedFinalManifestPromises, cacheKey, Promise.resolve().then(computeFinalManifest));
}
async function buildFinalManifest(opts) {
  return opts.transformFn ? await transformManifestAssets(opts.base, opts.transformFn, { inlineCss: opts.inlineCss }) : buildManifest(opts.base, { inlineCss: opts.inlineCss });
}
async function resolveFinalManifest(opts) {
  const computeFinalManifest = async () => {
    return buildFinalManifest({
      base: await opts.getBaseManifest(),
      transformFn: opts.transformFn,
      inlineCss: opts.inlineCss
    });
  };
  if (opts.finalManifestCache && (!opts.transformFn || opts.cache)) return getOrCreateCachedFinalManifestPromise(opts.finalManifestCache, getFinalManifestCacheKey(opts.inlineCss), computeFinalManifest);
  return computeFinalManifest();
}
function warmupFinalManifest(opts) {
  if (!opts.enabled || opts.handlerDefaultInlineCss === void 0 || !opts.cache) return;
  const inlineCss = opts.handlerDefaultInlineCss;
  const warmupPromise = getOrCreateCachedFinalManifestPromise(opts.finalManifestCache, getFinalManifestCacheKey(inlineCss), async () => {
    const [base, transformFn] = await Promise.all([opts.getBaseManifest(), opts.getTransformFn()]);
    return buildFinalManifest({
      base,
      transformFn,
      inlineCss
    });
  });
  if (opts.onError) warmupPromise.catch(opts.onError);
  return warmupPromise;
}
var ServerFunctionSerializationAdapter = createSerializationAdapter({
  key: "$TSS/serverfn",
  test: (v) => {
    if (typeof v !== "function") return false;
    if (!(TSS_SERVER_FUNCTION in v)) return false;
    return !!v[TSS_SERVER_FUNCTION];
  },
  toSerializable: ({ serverFnMeta }) => ({ functionId: serverFnMeta.id }),
  fromSerializable: ({ functionId }) => {
    const fn = async (opts, signal) => {
      return (await (await getServerFnById(functionId))(opts ?? {}, signal)).result;
    };
    return fn;
  }
});
function getStartResponseHeaders(opts) {
  return mergeHeaders({ "Content-Type": "text/html; charset=utf-8" }, ...opts.router.stores.matches.get().map((match) => {
    return match.headers;
  }));
}
var entriesPromise;
var hasWarnedMissingCsrfMiddleware = false;
var defaultCsrfMiddleware = createCsrfMiddleware({ filter: (ctx) => ctx.handlerType === "serverFn" });
var getCachedBaseManifest = createCachedBaseManifestLoader(() => getStartManifest());
var getProdBaseManifest = () => getCachedBaseManifest();
var getBaseManifest = getProdBaseManifest;
var createEarlyHintsForRequest = createEarlyHintsCollector;
async function loadEntries() {
  const [routerEntry, startEntry, pluginAdapters] = await Promise.all([
    import("./router-DyXkltGt.js").then((n) => n.a4),
    import("./start-Cc7xS1zt.js"),
    import("./empty-plugin-adapters-BFgPZ6_d.js")
  ]);
  return {
    routerEntry,
    startEntry,
    pluginAdapters
  };
}
function getEntries() {
  if (!entriesPromise) entriesPromise = loadEntries();
  return entriesPromise;
}
function warnMissingCsrfMiddlewareOnce() {
  if (hasWarnedMissingCsrfMiddleware) return;
  hasWarnedMissingCsrfMiddleware = true;
  console.warn(`TanStack Start server functions are not protected by the CSRF middleware.

Server functions are same-origin RPC endpoints and should be protected from cross-site requests.

Add the CSRF middleware in src/start.ts:

  const csrfMiddleware = createCsrfMiddleware({
    filter: (ctx) => ctx.handlerType === 'serverFn',
  })

  export const startInstance = createStart(() => ({
    requestMiddleware: [csrfMiddleware],
  }))

If you intentionally handle CSRF another way, disable this warning:

  tanstackStart({
    serverFns: {
      disableCsrfMiddlewareWarning: true,
    },
  })`);
}
var ROUTER_BASEPATH = "/";
var SERVER_FN_BASE = "/_serverFn/";
var IS_PRERENDERING = process.env.TSS_PRERENDERING === "true";
var IS_SHELL_ENV = process.env.TSS_SHELL === "true";
var ERR_NO_RESPONSE = "Internal Server Error";
var ERR_NO_DEFER = "Internal Server Error";
function throwRouteHandlerError() {
  throw new Error(ERR_NO_RESPONSE);
}
function throwIfMayNotDefer() {
  throw new Error(ERR_NO_DEFER);
}
function isSpecialResponse(value) {
  return value instanceof Response || isRedirect(value);
}
function handleCtxResult(result) {
  if (isSsrResponse(result) || isSpecialResponse(result)) return { response: result };
  return result;
}
async function executeMiddleware(middlewares, ctx) {
  let index = -1;
  let streamResponse;
  const setResponse = (response) => {
    if (isSsrResponse(response)) {
      if (response.serverSsrCleanup === "stream") streamResponse = response;
      ctx.response = response.response;
      return;
    }
    ctx.response = response;
  };
  const disposeStreamResponse = async (reason) => {
    const response = streamResponse;
    if (!response) return;
    streamResponse = void 0;
    const currentResponse = ctx.response;
    if (currentResponse === response.response || currentResponse instanceof Response && response.response.body !== null && currentResponse.body === response.response.body) ctx.response = void 0;
    await response.dispose(reason);
  };
  const getFinalResponse = async () => {
    const response = ctx.response;
    if (!response) throwRouteHandlerError();
    if (!streamResponse) return response;
    if (response === streamResponse.response) return streamResponse;
    if (streamResponse.response.body !== null && response.body === streamResponse.response.body) return {
      ...streamResponse,
      response
    };
    await disposeStreamResponse("middleware response replaced");
    return response;
  };
  const next = async (nextCtx) => {
    if (nextCtx) {
      if (nextCtx.context) ctx.context = safeObjectMerge(ctx.context, nextCtx.context);
      for (const key of Object.keys(nextCtx)) if (key === "response") setResponse(nextCtx.response);
      else if (key !== "context") ctx[key] = nextCtx[key];
    }
    index++;
    const middleware = middlewares[index];
    if (!middleware) return ctx;
    let result;
    try {
      result = await middleware({
        ...ctx,
        next
      });
    } catch (err) {
      if (isSpecialResponse(err)) {
        setResponse(err);
        return ctx;
      }
      await disposeStreamResponse("middleware error");
      throw err;
    }
    const normalized = handleCtxResult(result);
    if (normalized) {
      if (normalized.response !== void 0) setResponse(normalized.response);
      if (normalized.context) ctx.context = safeObjectMerge(ctx.context, normalized.context);
    }
    return ctx;
  };
  await next();
  return {
    ctx,
    response: await getFinalResponse()
  };
}
function handlerToMiddleware(handler, mayDefer = false) {
  if (mayDefer) return handler;
  return async (ctx) => {
    const response = await handler({
      ...ctx,
      next: throwIfMayNotDefer
    });
    if (!response) throwRouteHandlerError();
    return response;
  };
}
function createStartHandler(cbOrOptions) {
  const handlerOptions = typeof cbOrOptions === "function" ? {} : cbOrOptions;
  const cb = typeof cbOrOptions === "function" ? cbOrOptions : cbOrOptions.handler;
  const finalManifestResolver = createFinalManifestResolver({
    ...handlerOptions
  });
  const resolveManifestForRequest = finalManifestResolver.resolveCached;
  finalManifestResolver.warmup({ getBaseManifest: () => getBaseManifest() });
  const startRequestResolver = async (request, requestOpts) => {
    let router = null;
    let responseOwnsCleanup = false;
    try {
      const { url, handledProtocolRelativeURL } = getNormalizedURL(request.url);
      const href = url.pathname + url.search + url.hash;
      const origin = getOrigin(request);
      if (handledProtocolRelativeURL) return Response.redirect(url, 308);
      const entries = await getEntries();
      const hasStartInstance = !!entries.startEntry.startInstance;
      const startOptions = await entries.startEntry.startInstance?.getOptions() || {};
      const { hasPluginAdapters, pluginSerializationAdapters } = entries.pluginAdapters;
      const serializationAdapters = [
        ...startOptions.serializationAdapters || [],
        ...hasPluginAdapters ? pluginSerializationAdapters : [],
        ServerFunctionSerializationAdapter
      ];
      const requestStartOptions = {
        ...startOptions,
        requestMiddleware: hasStartInstance ? startOptions.requestMiddleware : [defaultCsrfMiddleware],
        serializationAdapters
      };
      const flattenedRequestMiddlewares = requestStartOptions.requestMiddleware ? flattenMiddlewares(requestStartOptions.requestMiddleware) : [];
      const executedRequestMiddlewares = new Set(flattenedRequestMiddlewares);
      const getRouter = async () => {
        if (router) return router;
        router = await entries.routerEntry.getRouter();
        let isShell = IS_SHELL_ENV;
        if (IS_PRERENDERING && !isShell) isShell = request.headers.get(HEADERS.TSS_SHELL) === "true";
        const history = createMemoryHistory({ initialEntries: [href] });
        router.update({
          history,
          isShell,
          isPrerendering: IS_PRERENDERING,
          origin: router.options.origin ?? origin,
          defaultSsr: requestStartOptions.defaultSsr,
          serializationAdapters: [...requestStartOptions.serializationAdapters, ...router.options.serializationAdapters || []],
          basepath: ROUTER_BASEPATH
        });
        return router;
      };
      if (SERVER_FN_BASE && url.pathname.startsWith(SERVER_FN_BASE)) {
        if (false) ;
        const serverFnId = url.pathname.slice(SERVER_FN_BASE.length).split("/")[0];
        if (!serverFnId) throw new Error("Invalid server action param for serverFnId");
        const serverFnHandler = async ({ context }) => {
          return runWithStartContext({
            getRouter,
            startOptions: requestStartOptions,
            contextAfterGlobalMiddlewares: context,
            request,
            executedRequestMiddlewares,
            handlerType: "serverFn"
          }, () => handleServerAction({
            request,
            context: requestOpts?.context,
            serverFnId
          }));
        };
        const { response: middlewareResponse2 } = await executeMiddleware([...flattenedRequestMiddlewares.map((d) => d.options.server), serverFnHandler], {
          request,
          pathname: url.pathname,
          handlerType: "serverFn",
          context: createNullProtoObject(requestOpts?.context)
        });
        const result = await handleRedirectResponse(middlewareResponse2, request, getRouter);
        responseOwnsCleanup = result.serverSsrCleanup === "stream";
        return result.response;
      }
      const executeRouter = async (serverContext, matchedRoutes) => {
        const acceptParts = (request.headers.get("Accept") || "*/*").split(",");
        if (!["*/*", "text/html"].some((mimeType) => acceptParts.some((part) => part.trim().startsWith(mimeType)))) return normalizeSsrResponse(Response.json({ error: "Only HTML requests are supported here" }, { status: 500 }));
        const manifest2 = await resolveManifestForRequest({
          request,
          requestInlineCss: requestOpts?.inlineCss,
          getBaseManifest: () => getBaseManifest(matchedRoutes)
        });
        const earlyHints = createEarlyHintsForRequest({
          onEarlyHints: requestOpts?.onEarlyHints,
          responseLinkHeader: requestOpts?.responseLinkHeader
        });
        earlyHints?.collectStatic({
          manifest: manifest2,
          matchedRoutes
        });
        const routerInstance = await getRouter();
        attachRouterServerSsrUtils({
          router: routerInstance,
          manifest: manifest2,
          getRequestAssets: () => getStartContext({ throwIfNotFound: false })?.requestAssets
        });
        routerInstance.options.additionalContext = { serverContext };
        await routerInstance.load();
        if (routerInstance.state.redirect) return normalizeSsrResponse(routerInstance.state.redirect);
        earlyHints?.collectDynamic(routerInstance.stores.matches.get());
        const ctx = getStartContext({ throwIfNotFound: false });
        await routerInstance.serverSsr.dehydrate({ requestAssets: ctx?.requestAssets });
        const responseHeaders = getStartResponseHeaders({ router: routerInstance });
        earlyHints?.appendResponseHeaders(responseHeaders);
        return normalizeSsrResponse(await cb({
          request,
          router: routerInstance,
          responseHeaders
        }));
      };
      const requestHandlerMiddleware = async ({ context }) => {
        return runWithStartContext({
          getRouter,
          startOptions: requestStartOptions,
          contextAfterGlobalMiddlewares: context,
          request,
          executedRequestMiddlewares,
          handlerType: "router"
        }, async () => {
          try {
            return await handleServerRoutes({
              getRouter,
              request,
              url,
              executeRouter,
              context,
              executedRequestMiddlewares
            });
          } catch (err) {
            if (err instanceof Response) return err;
            throw err;
          }
        });
      };
      const { response: middlewareResponse } = await executeMiddleware([...flattenedRequestMiddlewares.map((d) => d.options.server), requestHandlerMiddleware], {
        request,
        pathname: url.pathname,
        handlerType: "router",
        context: createNullProtoObject(requestOpts?.context)
      });
      const response = await handleRedirectResponse(middlewareResponse, request, getRouter);
      responseOwnsCleanup = response.serverSsrCleanup === "stream";
      return response.response;
    } finally {
      if (router?.serverSsr && !responseOwnsCleanup) router.serverSsr.cleanup();
      router = null;
    }
  };
  return requestHandler(startRequestResolver);
}
async function handleRedirectResponse(response, request, getRouter) {
  const ssrResponse = normalizeSsrResponse(response);
  if (!isRedirect(ssrResponse.response)) return ssrResponse;
  if (isResolvedRedirect(ssrResponse.response)) {
    if (request.headers.get("x-tsr-serverFn") === "true") return replaceSsrResponse(ssrResponse, Response.json({
      ...ssrResponse.response.options,
      isSerializedRedirect: true
    }, { headers: ssrResponse.response.headers }), "redirect response replaced");
    return ssrResponse;
  }
  const opts = ssrResponse.response.options;
  if (opts.to && typeof opts.to === "string" && !opts.to.startsWith("/")) throw new Error(`Server side redirects must use absolute paths via the 'href' or 'to' options. The redirect() method's "to" property accepts an internal path only. Use the "href" property to provide an external URL. Received: ${JSON.stringify(opts)}`);
  if ([
    "params",
    "search",
    "hash"
  ].some((d) => typeof opts[d] === "function")) throw new Error(`Server side redirects must use static search, params, and hash values and do not support functional values. Received functional values for: ${Object.keys(opts).filter((d) => typeof opts[d] === "function").map((d) => `"${d}"`).join(", ")}`);
  const redirect = (await getRouter()).resolveRedirect(ssrResponse.response);
  if (request.headers.get("x-tsr-serverFn") === "true") return replaceSsrResponse(ssrResponse, Response.json({
    ...ssrResponse.response.options,
    isSerializedRedirect: true
  }, { headers: ssrResponse.response.headers }), "redirect response replaced");
  return replaceSsrResponse(ssrResponse, redirect, "redirect response replaced");
}
async function handleServerRoutes({ getRouter, request, url, executeRouter, context, executedRequestMiddlewares }) {
  const router = await getRouter();
  const pathname = executeRewriteInput(router.rewrite, url).pathname;
  const { matchedRoutes, foundRoute, routeParams } = router.getMatchedRoutes(pathname);
  const isExactMatch = foundRoute && routeParams["**"] === void 0;
  const routeMiddlewares = [];
  for (const route of matchedRoutes) {
    const serverMiddleware = route.options.server?.middleware;
    if (serverMiddleware) {
      const flattened = flattenMiddlewares(serverMiddleware);
      for (const m of flattened) if (!executedRequestMiddlewares.has(m)) routeMiddlewares.push(m.options.server);
    }
  }
  const server2 = foundRoute?.options.server;
  let isHeadFallback = false;
  if (server2?.handlers && isExactMatch) {
    const handlers = typeof server2.handlers === "function" ? server2.handlers({ createHandlers: (d) => d }) : server2.handlers;
    const requestMethod = request.method.toUpperCase();
    const handler = requestMethod === "HEAD" ? handlers["HEAD"] ?? handlers["GET"] ?? handlers["ANY"] : handlers[requestMethod] ?? handlers["ANY"];
    isHeadFallback = requestMethod === "HEAD" && handler !== void 0 && !handlers["HEAD"];
    if (handler) {
      const mayDefer = !!foundRoute.options.component;
      if (typeof handler === "function") routeMiddlewares.push(handlerToMiddleware(handler, mayDefer));
      else {
        if (handler.middleware?.length) {
          const handlerMiddlewares = flattenMiddlewares(handler.middleware);
          for (const m of handlerMiddlewares) routeMiddlewares.push(m.options.server);
        }
        if (handler.handler) routeMiddlewares.push(handlerToMiddleware(handler.handler, mayDefer));
      }
    }
  }
  routeMiddlewares.push(((ctx2) => executeRouter(ctx2.context, matchedRoutes)));
  const { ctx, response } = await executeMiddleware(routeMiddlewares, {
    request,
    context,
    params: routeParams,
    pathname,
    handlerType: "router"
  });
  if (isHeadFallback) {
    if (!ctx.response) throwRouteHandlerError();
    return stripSsrResponseBody(await handleRedirectResponse(response, request, getRouter), "HEAD body stripped");
  }
  return normalizeSsrResponse(response);
}
var fetch = createStartHandler(defaultStreamHandler);
function createServerEntry(entry) {
  return { async fetch(...args) {
    return await entry.fetch(...args);
  } };
}
var server_default = createServerEntry({ fetch });
const server = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createServerEntry,
  default: server_default
}, Symbol.toStringTag, { value: "Module" }));
export {
  TSS_SERVER_FUNCTION as T,
  createMiddleware as a,
  createCsrfMiddleware as b,
  createServerFn as c,
  getServerFnById as g,
  server as s
};
