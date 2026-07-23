DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'jobstatus') THEN
    CREATE TYPE "JobStatus" AS ENUM ('DRAFT','OPEN','CLOSED');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'joburgency') THEN
    CREATE TYPE "JobUrgency" AS ENUM ('LOW','MEDIUM','HIGH');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'jobworkmode') THEN
    CREATE TYPE "JobWorkMode" AS ENUM ('ON_SITE','REMOTE','BOTH');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'userrole') THEN
    CREATE TYPE "UserRole" AS ENUM ('ADMIN','CLIENT','PROFESSIONAL');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'cmspagestatus') THEN
    CREATE TYPE "CmsPageStatus" AS ENUM ('DRAFT','PUBLISHED','ARCHIVED');
  END IF;
END$$;
