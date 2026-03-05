# PRC Datasets

Manages the `dataset` post type and `datasets` taxonomy as a linked pair (via TDS), providing a digital-rights-management layer for file downloads, an ATP legal-acceptance gate, download telemetry, and Firebase sync for Cloud Function–computed user statistics.

## What it does

- Registers the `dataset` CPT and `datasets` taxonomy and binds them via TDS so each taxonomy term has a corresponding post that holds the content and metadata.
- Adds `prc-datasets` post type support to `post`, `feature`, and `chart` so those post types can be tagged with dataset terms.
- Gated downloads — resolves the download file URL (media library attachment, legacy meta, or legacy archive fallback) only after verifying a nonce and a Firebase UID.
- ATP (American Trends Panel) legal gate — marks individual datasets as ATP-restricted; users must accept the ATP Terms of Service before a download URL is returned.
- Download telemetry — tracks a cumulative total (`_total_downloads`) and a per-year monthly breakdown (`_downloads_{year}`) stored as post meta; also logs each download against the Firebase user record.
- Firebase sync — keeps `config/atp-dataset-ids` in Firebase up to date on every publish/update/trash/untrash event so Cloud Functions can compute user-level download statistics.
- Legacy archive fallback — if a dataset has no attachment ID, attempts to fetch the file URL from `legacy.pewresearch.org` via the REST API and enqueues an Action Scheduler job (`prc_dataset_recovery`) to migrate the file to the current site asynchronously.
- Custom rewrite rules for `/datasets/`, `/datasets/{year}/`, and research-team-prefixed URLs like `/politics/dataset/{slug}/`.
- Includes datasets in sitewide search results and FacetWP indexing.
- Injects dataset terms into `prc_platform_post_report_package_materials` so datasets appear in report package sidebars.
- Block editor sidebar panel (`Dataset Options`) for uploading the download file and toggling the ATP flag, with a monthly download heatmap.
- Three Gutenberg blocks and one block bindings source (see below).

## Key files

| File | Purpose |
|---|---|
| `includes/class-content-type.php` | CPT/taxonomy registration, TDS relationship, meta field registration, rewrite rules, research team URL config, search/FacetWP inclusion |
| `includes/class-rest-api.php` | REST endpoint registration and all download/ATP/logging handlers |
| `includes/class-firebase-sync.php` | Syncs ATP dataset IDs to Firebase on content lifecycle events |
| `includes/class-cli.php` | WP-CLI commands under `wp prc datasets` |
| `includes/class-plugin.php` | Bootstrap: loads classes, registers blocks, wires block bindings source, enqueues inspector panel |
| `includes/inspector-sidebar-panel/src/index.js` | Editor sidebar plugin — file upload (`MediaDropZone`), ATP toggle, pre-publish panel |
| `includes/inspector-sidebar-panel/src/stats-panel.js` | Monthly download heatmap component rendered inside the sidebar |
| `build/download-block/` | `prc-platform/dataset-download` block — interactive download button |
| `build/dataset-atp-legal-acceptance-block/` | `prc-platform/dataset-atp-legal-acceptance` block — ATP opt-in form |
| `build/dataset-description-block/` | `prc-platform/dataset-description` block — editor-only block that pulls post content via block bindings |

## Blocks

| Block name | Description |
|---|---|
| `prc-platform/dataset-download` | Renders the download button. Uses the Interactivity API for the client-side download flow (nonce verification, ATP gate check, file URL resolution). Dynamic (`render.php`). |
| `prc-platform/dataset-atp-legal-acceptance` | Renders the ATP terms acceptance form. Injected automatically by the download block when a dataset is ATP-restricted and the user has not yet accepted. Not directly insertable. |
| `prc-platform/dataset-description` | Editor-only. Registers a block bindings source (`prc-platform/dataset-description`) that pulls `post_content` from the related `dataset` post into a `core/paragraph` block on taxonomy archive or single-dataset pages. |

## REST API endpoints

All endpoints are registered under `prc-api/v3` via the `prc_api_endpoints` filter.

| Method | Route | Auth | Description |
|---|---|---|---|
| `POST` | `/prc-api/v3/datasets/get-download` | Nonce (`prc_platform_dataset_download`) + Firebase UID in body | Resolves and returns the download file URL; increments counters and logs the download |
| `POST` | `/prc-api/v3/datasets/check-atp` | Nonce + Firebase UID in body | Returns whether the user has accepted the ATP agreement |
| `POST` | `/prc-api/v3/datasets/accept-atp` | Nonce + Firebase UID in body | Records ATP acceptance on the user's Firebase record |
| `POST` | `/prc-api/v3/datasets/log-download` | `X-WP-Nonce` header | Separately logs a download (total + monthly + user record) without resolving a URL |
| `GET` | `/prc-api/v3/datasets/download-stats` | `edit_posts` capability | Returns `{ total, log: { year: { month: count } } }` for a dataset; cached 24 h via transient |

The `dataset` post type also gets a `_downloads` REST field that exposes the same total + yearly log structure on the standard WP REST response.

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
| `prc_platform_rewrite_rules` | Filter | prc-platform-core | Adds dataset archive rewrite rules (`/datasets/`, `/datasets/{year}/`) |
| `prc_research_teams_rewrite_config` | Filter | prc-research-teams | Registers research-team-prefixed URL patterns for `dataset` |
| `prc_platform_post_report_package_materials` | Filter | prc-platform-core | Appends dataset terms to the report package materials array |
| `prc_platform_pub_listing_default_args` | Filter | prc-pub-listing | Adds `dataset` to `post_type` when a search string is present |
| `prc_platform__facetwp_indexer_query_args` | Filter | prc-facets | Adds `dataset` to the FacetWP indexer query so datasets are facetable |
| `prc_api_endpoints` | Filter | prc-platform-core | Registers the five dataset REST endpoints |
| `prc_platform_on_publish` | Action | prc-platform-core | Triggers Firebase ATP ID sync on publish |
| `prc_platform_on_update` | Action | prc-platform-core | Triggers Firebase ATP ID sync on update |
| `prc_platform_on_trash` | Action | prc-platform-core | Triggers Firebase ATP ID sync on trash |
| `prc_platform_on_untrash` | Action | prc-platform-core | Triggers Firebase ATP ID sync on untrash |

## Post meta

| Key | Type | Description |
|---|---|---|
| `_download_attachment_id` | `integer` | Media library attachment ID for the downloadable file |
| `is_atp` | `boolean` | Whether this dataset requires ATP legal acceptance before download |
| `_total_downloads` | `integer` | Running total of all downloads across all time |
| `_downloads_{year}` | `array` | Monthly download counts for the given year, keyed by zero-padded month (`01`–`12`) |

## WP-CLI commands

Registered as `wp prc datasets <subcommand>`.

```bash
# Aggregate ATP download counts by year
wp prc datasets atp-downloads [--year=<year>] [--detailed] [--per-dataset] [--format=<table|csv|json|yaml>]

# Read pre-computed user statistics from Firebase (computed daily by Cloud Function)
wp prc datasets atp-user-stats [--include-distribution] [--refresh] [--format=<format>]

# Push current list of ATP dataset IDs to Firebase config/atp-dataset-ids
wp prc datasets sync-atp-ids

# Find datasets missing an attached download file
wp prc datasets missing-files [--dry-run]
```

`atp-user-stats --refresh` runs `sync-atp-ids` before reading Firebase, which is useful when Cloud Function stats seem stale.

## Dependencies

| Dependency | Notes |
|---|---|
| `prc-platform-core` | Provides `PRC\Platform\Firebase`, lifecycle action hooks, and `prc_api_endpoints` |
| `prc-user-accounts` | `PRC\Platform\User_Accounts\User_Data` — ATP acceptance checks and per-user download logging |
| `@prc/components` | `MediaDropZone` used in the editor sidebar panel |
| TDS (Term Data Store) | `\TDS\add_relationship()` links the `dataset` CPT and `datasets` taxonomy |
| Action Scheduler | Async `prc_dataset_recovery` jobs for legacy file migration |
| FacetWP | Indexer integration (optional; gracefully skipped if not active) |

## Notes

- The `datasets` taxonomy slug is `dataset` (singular), so taxonomy archive URLs are `/dataset/{slug}/`, not `/datasets/{slug}/`. The `/datasets/` path is the CPT archive, handled by custom rewrite rules.
- ATP acceptance state lives on the user's Firebase record, not in WordPress. The `check-atp` and `accept-atp` endpoints delegate entirely to `User_Data`.
- Download stats are cached per-dataset for 24 hours (`dataset_downloads_{id}` transient). The stats panel in the editor sidebar bypasses this cache by calling the endpoint directly.
- The admin bar "Edit" link on taxonomy archive pages is replaced with a direct link to the related `dataset` post edit screen.
- Build targets two separate entry points: `build:blocks` (three blocks via `@wordpress/scripts`) and `build:inspector-panel` (the sidebar plugin). Run both with `npm run build -w @prc/datasets`.
