# PRC Datasets

Manages the `dataset` post type and `datasets` taxonomy as a linked pair (via [`prc/term-data-store`](https://github.com/pewresearch/term-data-store), namespace `PRC\TDS`), providing a digital-rights-management layer for file downloads, an ATP legal-acceptance gate, download telemetry, and newsletter audience building via Firebase Cloud Functions.

## What it does

- Registers the `dataset` CPT and `datasets` taxonomy and binds them via `prc/term-data-store` so each taxonomy term has a corresponding post that holds the content and metadata.
- Adds `prc-datasets` post type support to `post`, `feature`, and `chart` so those post types can be tagged with dataset terms.
- Gated downloads — resolves the download file URL (media library attachment, legacy meta, or legacy archive fallback) only after verifying Firebase identity (`X-PRC-User-Id` / `X-PRC-User-Token` headers) and per-IP rate limiting on `get-download`. Page-baked WordPress nonces are not used (they expire on edge-cached pages).
- ATP (American Trends Panel) legal gate — marks individual datasets as ATP-restricted; users must accept the ATP Terms of Service before a download URL is returned.
- Download telemetry — tracks a cumulative total (`_total_downloads`), a per-year monthly breakdown (`_downloads_{year}`), and (from 2026-08-01) day buckets in `_downloads_daily_{year}`; also logs each download against the Firebase user record. Replacing a dataset file can set `new_data_uploaded` so the editor stats panel splits the affected month into before/after counts.
- Newsletter audiences — `wp prc datasets build-audience` calls the `buildDatasetAudience` Cloud Function to resolve downloader emails for system-email newsletters.
- Legacy archive fallback — if a dataset has no attachment ID, attempts to fetch the file URL from `legacy.pewresearch.org` via the REST API and enqueues an Action Scheduler job (`prc_dataset_recovery`) to migrate the file to the current site asynchronously.
- Custom rewrite rules for `/datasets/`, `/datasets/{year}/`, and research-team-prefixed URLs like `/politics/dataset/{slug}/`.
- Includes datasets in sitewide search results and ElasticPress-backed archive faceting.
- Injects dataset terms into `prc_platform_post_report_package_materials` so datasets appear in report package sidebars.
- Block editor sidebar panel (`Dataset Options`) for uploading the download file and toggling the ATP flag, with a monthly download heatmap.
- Three Gutenberg blocks and one block bindings source (see below).

## Key files

| File | Purpose |
|---|---|
| `includes/class-content-type.php` | CPT/taxonomy registration, `prc/term-data-store` relationship, meta field registration, rewrite rules, research team URL config, search/EP archive inclusion |
| `includes/class-rest-api.php` | REST endpoint registration and all download/ATP/logging handlers |
| `includes/class-ability-categories.php` | Registers the `datasets` WP Abilities category for MCP discovery |
| `includes/class-ability.php` | WP Abilities API `prc-datasets/get-analytics` and `prc-datasets/get-download-url` tools (MCP + REST) |
| `includes/class-cli.php` | WP-CLI commands under `wp prc datasets` |
| `includes/class-cli-build-audience.php` | `wp prc datasets build-audience` — Firebase audience resolver |
| `includes/class-plugin.php` | Bootstrap: loads classes, registers blocks, wires block bindings source, enqueues inspector panel |
| `includes/inspector-sidebar-panel/src/index.js` | Editor sidebar plugin — file upload (`MediaDropZone`), new-data confirm modal, ATP toggle, pre-publish panel |
| `includes/inspector-sidebar-panel/src/stats-panel.js` | Download heatmap with year/month selectors, day drill-down, and new-data before/after split |
| `build/download-block/` | `prc-platform/dataset-download` block — interactive download button |
| `build/dataset-atp-legal-acceptance-block/` | `prc-platform/dataset-atp-legal-acceptance` block — ATP opt-in form |
| `build/dataset-description-block/` | `prc-platform/dataset-description` block — editor-only block that pulls post content via block bindings |

## Blocks

| Block name | Description |
|---|---|
| `prc-platform/dataset-download` | Renders the download button. Uses the Interactivity API for the client-side download flow (Firebase auth headers, ATP gate check, file URL resolution). Dynamic (`render.php`). |
| `prc-platform/dataset-atp-legal-acceptance` | Renders the ATP terms acceptance form. Injected automatically by the download block when a dataset is ATP-restricted and the user has not yet accepted. Not directly insertable. |
| `prc-platform/dataset-description` | Editor-only. Registers a block bindings source (`prc-platform/dataset-description`) that pulls `post_content` from the related `dataset` post into a `core/paragraph` block on taxonomy archive or single-dataset pages. |

## REST API endpoints

All endpoints are registered under `prc-api/v3` on `rest_api_init`.

| Method | Route | Auth | Description |
|---|---|---|---|
| `POST` | `/prc-api/v3/datasets/get-download` | Firebase UID + rate limit | Resolves and returns the download file URL; increments counters and logs the download |
| `POST` | `/prc-api/v3/datasets/check-atp` | Firebase UID in request | Returns whether the user has accepted the ATP agreement |
| `POST` | `/prc-api/v3/datasets/accept-atp` | Firebase UID in request | Records ATP acceptance on the user's Firebase record |
| `POST` | `/prc-api/v3/datasets/log-download` | Firebase UID in request | Separately logs a download (total + monthly + user record) without resolving a URL |
| `GET` | `/prc-api/v3/datasets/download-stats` | `edit_posts` capability | Returns `{ total, log, daily, new_data_uploaded, splits }` for a dataset; cached 24 h via transient |

The `dataset` post type also gets a `_downloads` REST field that exposes the same stats structure on the standard WP REST response.

## WP Abilities API

| Ability ID | Input | Description |
|---|---|---|
| `prc-datasets/get-analytics` | `post_id` (integer, required) | Returns `{ post_id, title, total, log, daily, new_data_uploaded, splits }` download analytics for a dataset. Requires `edit_post` on that dataset. Exposed via REST and MCP. |
| `prc-datasets/get-download-url` | `post_id` (integer, required) | Returns `{ post_id, title, file_url, attachment_id }` without incrementing download counters. Requires Author+ (`publish_posts`) and `edit_post` on the dataset. Does not attempt legacy archive recovery. |

### Authenticated download requests

User-facing endpoints (`get-download`, `check-atp`, `accept-atp`, `log-download`) require Firebase identity via request headers (not query args or page nonces):

| Header | Description |
|---|---|
| `X-PRC-User-Id` | Firebase UID of the signed-in user |
| `X-PRC-User-Token` | Firebase ID token; validated server-side before any user-scoped action |

`get-download` additionally enforces per-IP rate limiting via `PRC\Platform\rate_limit_hit()`.

## Filters and hooks

### Filters this plugin exposes

| Hook | Type | Description |
|---|---|---|
| `prc_platform__datasets_enabled_post_types` | Filter | Extend the list of post types that support the `datasets` taxonomy. Receives and should return `array` of post type slugs. Post types that call `add_post_type_support( $pt, 'prc-datasets' )` are automatically included without this filter. |

### Actions this plugin exposes

| Hook | Type | Description |
|---|---|---|
| `prc_dataset_recovery` | Action Scheduler async action | Fired when a legacy archive fallback succeeds. Args: `dataset_id` (int), `file_url` (string). Intended consumer migrates the remote file into the media library and updates `_download_attachment_id`. |

### Filters and actions this plugin consumes

| Hook | Type | Source | Description |
|---|---|---|---|
| `init` | Action | native WP | Registers dataset archive rewrite rules (`/datasets/`, `/datasets/{year}/`) via `add_rewrite_rule` |
| `prc_research_teams_rewrite_config` | Filter | prc-research-teams | Registers research-team-prefixed URL patterns for `dataset` |
| `prc_platform_post_report_package_materials` | Filter | prc-platform-core | Appends dataset terms to the report package materials array |
| `prc_platform_pub_listing_default_args` | Filter | prc-pub-listing | Adds `dataset` to `post_type` when a search string is present |
| `rest_api_init` | Action | WordPress core | Registers the five dataset REST endpoints directly |
| `wp_abilities_api_categories_init` | Action | WP Abilities API | Registers the `datasets` ability category |
| `wp_abilities_api_init` | Action | WP Abilities API | Registers `prc-datasets/get-analytics` and `prc-datasets/get-download-url` |

## Post meta

| Key | Type | Description |
|---|---|---|
| `_download_attachment_id` | `integer` | Media library attachment ID for the downloadable file |
| `is_atp` | `boolean` | Whether this dataset requires ATP legal acceptance before download |
| `_total_downloads` | `integer` | Running total of all downloads across all time |
| `_downloads_{year}` | `array` | Monthly download counts for the given year, keyed by zero-padded month (`01`–`12`) |
| `_downloads_daily_{year}` | `array` | Day buckets for the given year: `{ MM: { DD: count } }` (written from 2026-08-01 onward) |
| `new_data_uploaded` | `string` | Site-local mysql datetime when an editor confirmed a new-data file upload; used to split that month's stats |

## WP-CLI commands

Registered as `wp prc datasets <subcommand>`.

```bash
# Aggregate ATP download counts by year (WordPress post meta)
wp prc datasets atp-downloads [--year=<year>] [--detailed] [--per-dataset] [--format=<table|csv|json|yaml>]

# Build newsletter audience from Firebase users who downloaded a dataset
wp prc datasets build-audience --dataset-id=<id> [--dry-run] [--no-create-post] [--label=<text>] [--include-unverified]

# Find datasets missing an attached download file
wp prc datasets missing-files [--dry-run]
```

## Dependencies

| Dependency | Notes |
|---|---|
| `prc-platform-core` | Provides `PRC\Platform\Firebase` and lifecycle action hooks |
| `prc-user-accounts` | `PRC\Platform\User_Accounts\User_Data` — ATP acceptance checks and per-user download logging |
| `@prc/components` | `MediaDropZone` used in the editor sidebar panel |
| [`prc/term-data-store`](https://github.com/pewresearch/term-data-store) (`PRC\TDS`) | `\PRC\TDS\add_relationship()` links the `dataset` CPT and `datasets` taxonomy |
| Action Scheduler | Async `prc_dataset_recovery` jobs for legacy file migration |
| ElasticPress / VIP Search | Dataset archive EP opt-in via `integrate_dataset_archive_with_elasticpress` |

## Notes

- The `datasets` taxonomy slug is `dataset` (singular), so taxonomy archive URLs are `/dataset/{slug}/`, not `/datasets/{slug}/`. The `/datasets/` path is the CPT archive, handled by custom rewrite rules.
- ATP acceptance state lives on the user's Firebase record, not in WordPress. The `check-atp` and `accept-atp` endpoints delegate entirely to `User_Data`.
- Download stats are cached per-dataset for 24 hours (`dataset_downloads_{id}` transient). The stats panel in the editor sidebar bypasses this cache by calling the endpoint directly.
- The admin bar "Edit" link on taxonomy archive pages is replaced with a direct link to the related `dataset` post edit screen.
- Build targets two separate entry points: `build:blocks` (three blocks via `@wordpress/scripts`) and `build:inspector-panel` (the sidebar plugin). Run both with `npm run build -w @prc/datasets`.
