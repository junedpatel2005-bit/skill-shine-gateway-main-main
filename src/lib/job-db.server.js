"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientJob = createClientJob;
exports.getClientJobById = getClientJobById;
exports.getClientJobsByUserId = getClientJobsByUserId;
exports.getOpenClientJobs = getOpenClientJobs;
exports.getOpenClientJobById = getOpenClientJobById;
exports.getFavoriteJobIds = getFavoriteJobIds;
exports.getFavoriteJobsByUserId = getFavoriteJobsByUserId;
exports.isFavoriteJob = isFavoriteJob;
exports.setFavoriteJob = setFavoriteJob;
exports.updateClientJobStatus = updateClientJobStatus;
exports.updateClientJob = updateClientJob;
exports.deleteClientJob = deleteClientJob;
var node_path_1 = require("node:path");
var supabase_compat_1 = require("@/lib/supabase-compat");
var socket_io_client_1 = require("socket.io-client");
var prisma_1 = require("@/lib/prisma");
var globalForJobDb = globalThis;
function getDatabase() {
    if (!globalForJobDb.jobDb) {
        var databasePath = node_path_1.default.resolve(process.cwd(), "prisma", "app.db");
        globalForJobDb.jobDb = new supabase_compat_1.default(databasePath);
        ensureClientJobTables(globalForJobDb.jobDb);
    }
    return globalForJobDb.jobDb;
}
function ensureClientJobTables(db) {
    db.exec("\n    CREATE TABLE IF NOT EXISTS \"ClientJob\" (\n      \"id\" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\n      \"userId\" INTEGER NOT NULL,\n      \"category\" TEXT NOT NULL,\n      \"title\" TEXT NOT NULL,\n      \"description\" TEXT NOT NULL,\n      \"budgetMin\" INTEGER,\n      \"budgetMax\" INTEGER,\n      \"urgency\" TEXT NOT NULL DEFAULT 'MEDIUM',\n      \"timingType\" TEXT NOT NULL DEFAULT 'FIXED',\n      \"hourlyRate\" INTEGER,\n      \"jobDate\" TEXT,\n      \"deadline\" TEXT NOT NULL,\n      \"workMode\" TEXT NOT NULL DEFAULT 'BOTH',\n      \"locationLabel\" TEXT,\n      \"locationAddress\" TEXT,\n      \"locationLat\" REAL,\n      \"locationLng\" REAL,\n      \"status\" TEXT NOT NULL DEFAULT 'OPEN',\n      \"createdAt\" TEXT NOT NULL,\n      \"updatedAt\" TEXT NOT NULL\n    );\n\n    CREATE TABLE IF NOT EXISTS \"ClientJobAttachment\" (\n      \"id\" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\n      \"jobId\" INTEGER NOT NULL,\n      \"fileName\" TEXT NOT NULL,\n      \"fileType\" TEXT,\n      \"fileSize\" INTEGER,\n      \"previewUrl\" TEXT,\n      \"createdAt\" TEXT NOT NULL\n    );\n\n    CREATE INDEX IF NOT EXISTS \"ClientJob_userId_idx\" ON \"ClientJob\"(\"userId\");\n    CREATE INDEX IF NOT EXISTS \"ClientJob_status_idx\" ON \"ClientJob\"(\"status\");\n    CREATE INDEX IF NOT EXISTS \"ClientJobAttachment_jobId_idx\" ON \"ClientJobAttachment\"(\"jobId\");\n\n    CREATE TABLE IF NOT EXISTS \"FavoriteJob\" (\n      \"id\" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\n      \"userId\" INTEGER NOT NULL,\n      \"jobId\" INTEGER NOT NULL,\n      \"createdAt\" TEXT NOT NULL,\n      UNIQUE(\"userId\", \"jobId\")\n    );\n\n    CREATE INDEX IF NOT EXISTS \"FavoriteJob_userId_idx\" ON \"FavoriteJob\"(\"userId\");\n    CREATE INDEX IF NOT EXISTS \"FavoriteJob_jobId_idx\" ON \"FavoriteJob\"(\"jobId\");\n\n    CREATE TABLE IF NOT EXISTS \"ProjectTracking\" (\n      \"id\" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\n      \"requestId\" INTEGER NOT NULL,\n      \"jobId\" INTEGER NOT NULL,\n      \"clientId\" INTEGER NOT NULL,\n      \"professionalId\" INTEGER NOT NULL,\n      \"status\" TEXT NOT NULL DEFAULT 'ACTIVE',\n      \"acceptedAt\" TEXT NOT NULL,\n      \"createdAt\" TEXT NOT NULL,\n      \"updatedAt\" TEXT NOT NULL\n    );\n\n    CREATE INDEX IF NOT EXISTS \"ProjectTracking_jobId_idx\" ON \"ProjectTracking\"(\"jobId\");\n  ");
    ensureColumn(db, "ClientJob", "timingType", "ALTER TABLE \"ClientJob\" ADD COLUMN \"timingType\" TEXT NOT NULL DEFAULT 'FIXED'");
    ensureColumn(db, "ClientJob", "hourlyRate", "ALTER TABLE \"ClientJob\" ADD COLUMN \"hourlyRate\" INTEGER");
}
function ensureFavoriteJobTable(db) {
    db.exec("\n    CREATE TABLE IF NOT EXISTS \"FavoriteJob\" (\n      \"id\" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\n      \"userId\" INTEGER NOT NULL,\n      \"jobId\" INTEGER NOT NULL,\n      \"createdAt\" TEXT NOT NULL,\n      UNIQUE(\"userId\", \"jobId\")\n    );\n\n    CREATE INDEX IF NOT EXISTS \"FavoriteJob_userId_idx\" ON \"FavoriteJob\"(\"userId\");\n    CREATE INDEX IF NOT EXISTS \"FavoriteJob_jobId_idx\" ON \"FavoriteJob\"(\"jobId\");\n  ");
}
function normalizeDateValue(value) {
    var trimmed = value === null || value === void 0 ? void 0 : value.trim();
    if (!trimmed) {
        return null;
    }
    return new Date("".concat(trimmed, "T00:00:00.000Z")).toISOString();
}
function mapJob(row, attachments) {
    var _a, _b;
    return __assign(__assign({}, row), { timingType: (_a = row.timingType) !== null && _a !== void 0 ? _a : (row.hourlyRate ? "HOURLY" : "FIXED"), hourlyRate: (_b = row.hourlyRate) !== null && _b !== void 0 ? _b : null, attachments: attachments });
}
function tableExists(db, tableName) {
    var result = db
        .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ? LIMIT 1")
        .get(tableName);
    return Boolean(result);
}
function ensureColumn(db, tableName, columnName, alterSql) {
    var columns = db.prepare("PRAGMA table_info(\"".concat(tableName, "\")")).all();
    if (!columns.some(function (column) { return column.name === columnName; })) {
        db.exec(alterSql);
    }
}
function availableJobPredicate() {
    return "\n    ClientJob.status = 'OPEN'\n    AND NOT EXISTS (\n      SELECT 1\n      FROM \"ProjectTracking\"\n      WHERE \"ProjectTracking\".jobId = ClientJob.id\n        AND \"ProjectTracking\".status = 'ACTIVE'\n    )\n  ";
}
function createClientJob(userId, input) {
    var _a;
    var db = getDatabase();
    var timestamp = new Date().toISOString();
    var createJob = db.transaction(function (attachments) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        var result = db
            .prepare("\n          INSERT INTO \"ClientJob\" (\n            userId,\n            category,\n            title,\n            description,\n            budgetMin,\n            budgetMax,\n            urgency,\n            timingType,\n            hourlyRate,\n            jobDate,\n            deadline,\n            workMode,\n            locationLabel,\n            locationAddress,\n            locationLat,\n            locationLng,\n            status,\n            createdAt,\n            updatedAt\n          )\n          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)\n        ")
            .run(userId, input.category.trim(), input.title.trim(), input.description.trim(), (_a = input.budgetMin) !== null && _a !== void 0 ? _a : null, (_b = input.budgetMax) !== null && _b !== void 0 ? _b : null, input.urgency, input.timingType, (_c = input.hourlyRate) !== null && _c !== void 0 ? _c : null, normalizeDateValue(input.jobDate), (_d = normalizeDateValue(input.deadline)) !== null && _d !== void 0 ? _d : timestamp, input.workMode, ((_e = input.locationLabel) === null || _e === void 0 ? void 0 : _e.trim()) || null, ((_f = input.locationAddress) === null || _f === void 0 ? void 0 : _f.trim()) || null, (_g = input.locationLat) !== null && _g !== void 0 ? _g : null, (_h = input.locationLng) !== null && _h !== void 0 ? _h : null, input.status, timestamp, timestamp);
        var jobId = Number(result.lastInsertRowid);
        var insertAttachment = db.prepare("\n        INSERT INTO \"ClientJobAttachment\" (\n          jobId,\n          fileName,\n          fileType,\n          fileSize,\n          previewUrl,\n          createdAt\n        )\n        VALUES (?, ?, ?, ?, ?, ?)\n      ");
        for (var _i = 0, attachments_1 = attachments; _i < attachments_1.length; _i++) {
            var attachment = attachments_1[_i];
            insertAttachment.run(jobId, attachment.fileName.trim(), ((_j = attachment.fileType) === null || _j === void 0 ? void 0 : _j.trim()) || null, (_k = attachment.fileSize) !== null && _k !== void 0 ? _k : null, ((_l = attachment.previewUrl) === null || _l === void 0 ? void 0 : _l.trim()) || null, timestamp);
        }
        return jobId;
    });
    var jobId = createJob((_a = input.attachments) !== null && _a !== void 0 ? _a : []);
    // Notify admin room via socket server (best-effort, do not fail job creation)
    try {
        var socketUrl = process.env.SOCKET_URL || "http://localhost:".concat(process.env.SOCKET_PORT || 4001);
        var sock = (0, socket_io_client_1.io)(socketUrl, { autoConnect: false });
        sock.connect();
        sock.emit("admin:activity", { reason: "client job posted" });
        sock.disconnect();
    }
    catch (e) {
        // ignore errors — admin refresh is best-effort
    }
    return getClientJobById(userId, jobId);
}
function getClientJobById(userId, jobId) {
    return __awaiter(this, void 0, void 0, function () {
        var job, attachments;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, prisma_1.prisma.clientJob.findUnique({
                        where: { id: jobId },
                        include: {
                            attachments: { orderBy: { id: "asc" } },
                            user: { select: { firstName: true, lastName: true, companyName: true, avatarUrl: true } },
                        },
                    })];
                case 1:
                    job = _c.sent();
                    if (!job || job.userId !== userId)
                        return [2 /*return*/, null];
                    attachments = job.attachments.map(function (a) { return ({
                        id: a.id,
                        jobId: a.jobId,
                        fileName: a.fileName,
                        fileType: a.fileType,
                        fileSize: a.fileSize,
                        previewUrl: a.previewUrl,
                        createdAt: a.createdAt.toISOString(),
                    }); });
                    return [2 /*return*/, {
                            id: job.id,
                            userId: job.userId,
                            category: job.category,
                            title: job.title,
                            description: job.description,
                            budgetMin: job.budgetMin,
                            budgetMax: job.budgetMax,
                            urgency: job.urgency,
                            timingType: job.jobDate ? "FIXED" : "FIXED",
                            hourlyRate: null,
                            jobDate: (_b = (_a = job.jobDate) === null || _a === void 0 ? void 0 : _a.toISOString()) !== null && _b !== void 0 ? _b : null,
                            deadline: job.deadline.toISOString(),
                            workMode: job.workMode,
                            locationLabel: job.locationLabel,
                            locationAddress: job.locationAddress,
                            locationLat: job.locationLat,
                            locationLng: job.locationLng,
                            status: job.status,
                            createdAt: job.createdAt.toISOString(),
                            updatedAt: job.updatedAt.toISOString(),
                            attachments: attachments,
                        }];
            }
        });
    });
}
function getClientJobsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var jobs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma_1.prisma.clientJob.findMany({
                        where: { userId: userId },
                        include: { attachments: { orderBy: { id: "asc" } } },
                        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
                    })];
                case 1:
                    jobs = _a.sent();
                    return [2 /*return*/, jobs.map(function (job) {
                            var _a, _b;
                            return mapJob({
                                id: job.id,
                                userId: job.userId,
                                category: job.category,
                                title: job.title,
                                description: job.description,
                                budgetMin: job.budgetMin,
                                budgetMax: job.budgetMax,
                                urgency: job.urgency,
                                timingType: job.jobDate ? "FIXED" : "FIXED",
                                hourlyRate: null,
                                jobDate: (_b = (_a = job.jobDate) === null || _a === void 0 ? void 0 : _a.toISOString()) !== null && _b !== void 0 ? _b : null,
                                deadline: job.deadline.toISOString(),
                                workMode: job.workMode,
                                locationLabel: job.locationLabel,
                                locationAddress: job.locationAddress,
                                locationLat: job.locationLat,
                                locationLng: job.locationLng,
                                status: job.status,
                                createdAt: job.createdAt.toISOString(),
                                updatedAt: job.updatedAt.toISOString(),
                            }, job.attachments.map(function (a) { return ({
                                id: a.id,
                                jobId: a.jobId,
                                fileName: a.fileName,
                                fileType: a.fileType,
                                fileSize: a.fileSize,
                                previewUrl: a.previewUrl,
                                createdAt: a.createdAt.toISOString(),
                            }); }));
                        })];
            }
        });
    });
}
function getOpenClientJobs() {
    return __awaiter(this, void 0, void 0, function () {
        var jobs, idsCsv, attachmentRows, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, prisma_1.prisma.$queryRawUnsafe("\n      SELECT\n        cj.*,\n        TRIM(u.\"firstName\" || ' ' || u.\"lastName\") AS \"clientName\",\n        u.\"companyName\" AS \"clientCompanyName\",\n        u.\"avatarUrl\" AS \"clientAvatarUrl\"\n      FROM \"ClientJob\" cj\n      INNER JOIN \"User\" u ON u.id = cj.\"userId\"\n      WHERE cj.\"status\" = 'OPEN'\n      ORDER BY cj.\"createdAt\" DESC, cj.id DESC\n    ")];
                case 1:
                    jobs = (_b.sent());
                    if (!jobs.length)
                        return [2 /*return*/, []];
                    idsCsv = jobs.map(function (j) { return Number(j.id); }).join(",");
                    if (!idsCsv) return [3 /*break*/, 3];
                    return [4 /*yield*/, prisma_1.prisma.$queryRawUnsafe("SELECT * FROM \"ClientJobAttachment\" WHERE \"jobId\" IN (".concat(idsCsv, ") ORDER BY id ASC"))];
                case 2:
                    _a = (_b.sent());
                    return [3 /*break*/, 4];
                case 3:
                    _a = [];
                    _b.label = 4;
                case 4:
                    attachmentRows = _a;
                    return [2 /*return*/, jobs.map(function (job) {
                            var _a, _b;
                            return (__assign(__assign({}, mapJob({
                                id: job.id,
                                userId: job.userId,
                                category: job.category,
                                title: job.title,
                                description: job.description,
                                budgetMin: job.budgetMin,
                                budgetMax: job.budgetMax,
                                urgency: job.urgency,
                                timingType: job.jobDate ? "FIXED" : "FIXED",
                                hourlyRate: null,
                                jobDate: job.jobDate ? new Date(job.jobDate).toISOString() : null,
                                deadline: new Date(job.deadline).toISOString(),
                                workMode: job.workMode,
                                locationLabel: job.locationLabel,
                                locationAddress: job.locationAddress,
                                locationLat: job.locationLat,
                                locationLng: job.locationLng,
                                status: job.status,
                                createdAt: new Date(job.createdAt).toISOString(),
                                updatedAt: new Date(job.updatedAt).toISOString(),
                            }, attachmentRows.filter(function (a) { return a.jobId === job.id; }).map(function (a) { return ({
                                id: a.id,
                                jobId: a.jobId,
                                fileName: a.fileName,
                                fileType: a.fileType,
                                fileSize: a.fileSize,
                                previewUrl: a.previewUrl,
                                createdAt: new Date(a.createdAt).toISOString(),
                            }); }))), { clientName: job.clientName, clientCompanyName: (_a = job.clientCompanyName) !== null && _a !== void 0 ? _a : null, clientAvatarUrl: (_b = job.clientAvatarUrl) !== null && _b !== void 0 ? _b : null }));
                        })];
            }
        });
    });
}
function getOpenClientJobById(jobId) {
    return __awaiter(this, void 0, void 0, function () {
        var job;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, prisma_1.prisma.clientJob.findUnique({
                        where: { id: jobId },
                        include: {
                            user: { select: { firstName: true, lastName: true, companyName: true, avatarUrl: true } },
                            attachments: { orderBy: { id: "asc" } },
                        },
                    })];
                case 1:
                    job = _e.sent();
                    if (!job || job.status !== "OPEN")
                        return [2 /*return*/, null];
                    return [2 /*return*/, __assign(__assign({}, mapJob({
                            id: job.id,
                            userId: job.userId,
                            category: job.category,
                            title: job.title,
                            description: job.description,
                            budgetMin: job.budgetMin,
                            budgetMax: job.budgetMax,
                            urgency: job.urgency,
                            timingType: job.jobDate ? "FIXED" : "FIXED",
                            hourlyRate: null,
                            jobDate: (_b = (_a = job.jobDate) === null || _a === void 0 ? void 0 : _a.toISOString()) !== null && _b !== void 0 ? _b : null,
                            deadline: job.deadline.toISOString(),
                            workMode: job.workMode,
                            locationLabel: job.locationLabel,
                            locationAddress: job.locationAddress,
                            locationLat: job.locationLat,
                            locationLng: job.locationLng,
                            status: job.status,
                            createdAt: job.createdAt.toISOString(),
                            updatedAt: job.updatedAt.toISOString(),
                        }, job.attachments.map(function (a) { return ({
                            id: a.id,
                            jobId: a.jobId,
                            fileName: a.fileName,
                            fileType: a.fileType,
                            fileSize: a.fileSize,
                            previewUrl: a.previewUrl,
                            createdAt: a.createdAt.toISOString(),
                        }); }))), { clientName: "".concat(job.user.firstName, " ").concat(job.user.lastName).trim(), clientCompanyName: (_c = job.user.companyName) !== null && _c !== void 0 ? _c : null, clientAvatarUrl: (_d = job.user.avatarUrl) !== null && _d !== void 0 ? _d : null })];
            }
        });
    });
}
function getFavoriteJobIds(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var rows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma_1.prisma.favoriteJob.findMany({
                        where: { userId: userId },
                        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
                        select: { jobId: true },
                    })];
                case 1:
                    rows = _a.sent();
                    return [2 /*return*/, rows.map(function (r) { return r.jobId; })];
            }
        });
    });
}
function getFavoriteJobsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var favoriteIds, favoriteIdSet, favoriteOrder, openJobs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFavoriteJobIds(userId)];
                case 1:
                    favoriteIds = _a.sent();
                    if (!favoriteIds.length) {
                        return [2 /*return*/, []];
                    }
                    favoriteIdSet = new Set(favoriteIds);
                    favoriteOrder = new Map(favoriteIds.map(function (jobId, index) { return [jobId, index]; }));
                    return [4 /*yield*/, getOpenClientJobs()];
                case 2:
                    openJobs = _a.sent();
                    return [2 /*return*/, openJobs
                            .filter(function (job) { return favoriteIdSet.has(job.id); })
                            .sort(function (a, b) { var _a, _b; return ((_a = favoriteOrder.get(a.id)) !== null && _a !== void 0 ? _a : 0) - ((_b = favoriteOrder.get(b.id)) !== null && _b !== void 0 ? _b : 0); })];
            }
        });
    });
}
function isFavoriteJob(userId, jobId) {
    return __awaiter(this, void 0, void 0, function () {
        var row;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma_1.prisma.favoriteJob.findFirst({ where: { userId: userId, jobId: jobId }, select: { id: true } })];
                case 1:
                    row = _a.sent();
                    return [2 /*return*/, Boolean(row)];
            }
        });
    });
}
function setFavoriteJob(userId, jobId, favorite) {
    var db = getDatabase();
    ensureFavoriteJobTable(db);
    if (favorite) {
        var job = db
            .prepare("\n          SELECT id\n          FROM \"ClientJob\"\n          WHERE ClientJob.id = ? AND ".concat(availableJobPredicate(), "\n          LIMIT 1\n        "))
            .get(jobId);
        if (!job) {
            throw new Error("This job is not available.");
        }
        db.prepare("\n        INSERT OR IGNORE INTO \"FavoriteJob\" (userId, jobId, createdAt)\n        VALUES (?, ?, ?)\n      ").run(userId, jobId, new Date().toISOString());
        return true;
    }
    db.prepare("\n      DELETE FROM \"FavoriteJob\"\n      WHERE userId = ? AND jobId = ?\n    ").run(userId, jobId);
    return false;
}
function updateClientJobStatus(userId, jobId, status) {
    var db = getDatabase();
    var timestamp = new Date().toISOString();
    var existing = getClientJobById(userId, jobId);
    if (!existing) {
        return undefined;
    }
    var updateJobStatus = db.transaction(function () {
        if (status === "OPEN" && existing.status === "CLOSED") {
            clearReopenedJobRequestDrafts(db, jobId);
        }
        db.prepare("\n        UPDATE \"ClientJob\"\n        SET status = ?, updatedAt = ?\n        WHERE id = ? AND userId = ?\n      ").run(status, timestamp, jobId, userId);
    });
    updateJobStatus();
    return getClientJobById(userId, jobId);
}
function clearReopenedJobRequestDrafts(db, jobId) {
    if (!tableExists(db, "ProjectRequest")) {
        return;
    }
    if (tableExists(db, "ProjectNegotiation")) {
        db.prepare("\n        DELETE FROM \"ProjectNegotiation\"\n        WHERE requestId IN (\n          SELECT id\n          FROM \"ProjectRequest\"\n          WHERE jobId = ? AND status IN ('PENDING', 'DECLINED')\n        )\n      ").run(jobId);
    }
    db.prepare("\n      DELETE FROM \"ProjectRequest\"\n      WHERE jobId = ? AND status IN ('PENDING', 'DECLINED')\n    ").run(jobId);
}
function updateClientJob(userId, jobId, input) {
    var _a;
    var db = getDatabase();
    var timestamp = new Date().toISOString();
    var existing = getClientJobById(userId, jobId);
    if (!existing) {
        return null;
    }
    var updateJob = db.transaction(function (attachments) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        db.prepare("\n        UPDATE \"ClientJob\"\n        SET\n          category = ?,\n          title = ?,\n          description = ?,\n          budgetMin = ?,\n          budgetMax = ?,\n          urgency = ?,\n          timingType = ?,\n          hourlyRate = ?,\n          jobDate = ?,\n          deadline = ?,\n          workMode = ?,\n          locationLabel = ?,\n          locationAddress = ?,\n          locationLat = ?,\n          locationLng = ?,\n          status = ?,\n          updatedAt = ?\n        WHERE id = ? AND userId = ?\n      ").run(input.category.trim(), input.title.trim(), input.description.trim(), (_a = input.budgetMin) !== null && _a !== void 0 ? _a : null, (_b = input.budgetMax) !== null && _b !== void 0 ? _b : null, input.urgency, input.timingType, (_c = input.hourlyRate) !== null && _c !== void 0 ? _c : null, normalizeDateValue(input.jobDate), (_d = normalizeDateValue(input.deadline)) !== null && _d !== void 0 ? _d : timestamp, input.workMode, ((_e = input.locationLabel) === null || _e === void 0 ? void 0 : _e.trim()) || null, ((_f = input.locationAddress) === null || _f === void 0 ? void 0 : _f.trim()) || null, (_g = input.locationLat) !== null && _g !== void 0 ? _g : null, (_h = input.locationLng) !== null && _h !== void 0 ? _h : null, input.status, timestamp, jobId, userId);
        db.prepare("DELETE FROM \"ClientJobAttachment\" WHERE jobId = ?").run(jobId);
        var insertAttachment = db.prepare("\n        INSERT INTO \"ClientJobAttachment\" (\n          jobId,\n          fileName,\n          fileType,\n          fileSize,\n          previewUrl,\n          createdAt\n        )\n        VALUES (?, ?, ?, ?, ?, ?)\n      ");
        for (var _i = 0, attachments_2 = attachments; _i < attachments_2.length; _i++) {
            var attachment = attachments_2[_i];
            insertAttachment.run(jobId, attachment.fileName.trim(), ((_j = attachment.fileType) === null || _j === void 0 ? void 0 : _j.trim()) || null, (_k = attachment.fileSize) !== null && _k !== void 0 ? _k : null, ((_l = attachment.previewUrl) === null || _l === void 0 ? void 0 : _l.trim()) || null, timestamp);
        }
    });
    updateJob((_a = input.attachments) !== null && _a !== void 0 ? _a : []);
    // Notify admin room about updated job (best-effort)
    try {
        var socketUrl = process.env.SOCKET_URL || "http://localhost:".concat(process.env.SOCKET_PORT || 4001);
        var sock = (0, socket_io_client_1.io)(socketUrl, { autoConnect: false });
        sock.connect();
        sock.emit("admin:activity", { reason: "client job updated" });
        sock.disconnect();
    }
    catch (e) {
        // ignore errors
    }
    return getClientJobById(userId, jobId);
}
function deleteClientJob(userId, jobId) {
    var db = getDatabase();
    var job = getClientJobById(userId, jobId);
    if (!job) {
        return false;
    }
    var deleteJob = db.transaction(function () {
        var _a;
        if (tableExists(db, "ProjectTracking")) {
            var retainedTracking = db
                .prepare("\n            SELECT id, status\n            FROM \"ProjectTracking\"\n            WHERE jobId = ?\n              AND clientId = ?\n              AND status IN ('ACTIVE', 'COMPLETED')\n            LIMIT 1\n          ")
                .get(jobId, userId);
            if (retainedTracking) {
                throw new Error(retainedTracking.status === "COMPLETED"
                    ? "Completed projects stay in account history and cannot be deleted."
                    : "Active projects must be cancelled or completed before the job can be deleted.");
            }
        }
        var trackingIds = tableExists(db, "ProjectTracking")
            ? db
                .prepare("SELECT id FROM \"ProjectTracking\" WHERE jobId = ? AND clientId = ?")
                .all(jobId, userId)
            : [];
        var trackingIdValues = trackingIds.map(function (tracking) { return tracking.id; });
        if (trackingIdValues.length) {
            var placeholders = trackingIdValues.map(function () { return "?"; }).join(",");
            var trackingTables = [
                "ProjectTransaction",
                "ProjectReview",
                "ProjectDispute",
                "ProjectCompletionRequest",
                "ProjectMilestone",
                "ProjectRevisionRequest",
                "ProjectWorkUpload",
            ];
            for (var _i = 0, trackingTables_1 = trackingTables; _i < trackingTables_1.length; _i++) {
                var table = trackingTables_1[_i];
                if (tableExists(db, table)) {
                    (_a = db.prepare("DELETE FROM \"".concat(table, "\" WHERE trackingId IN (").concat(placeholders, ")"))).run.apply(_a, trackingIdValues);
                }
            }
        }
        if (tableExists(db, "ProjectTracking")) {
            db.prepare("DELETE FROM \"ProjectTracking\" WHERE jobId = ? AND clientId = ?").run(jobId, userId);
        }
        if (tableExists(db, "ProjectRequest")) {
            db.prepare("DELETE FROM \"ProjectRequest\" WHERE jobId = ? AND clientId = ?").run(jobId, userId);
        }
        db.prepare("DELETE FROM \"FavoriteJob\" WHERE jobId = ?").run(jobId);
        db.prepare("DELETE FROM \"ClientJobAttachment\" WHERE jobId = ?").run(jobId);
        db.prepare("DELETE FROM \"ClientJob\" WHERE id = ? AND userId = ?").run(jobId, userId);
    });
    deleteJob();
    return true;
}
