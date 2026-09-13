# Deployment record

Public page: https://phenology.technology/totallytwisted/

Repository: https://github.com/TimIam/totally-twisted-css (main)

The existing Vercel project is `singularity-predictor`. This repository contains only the screensaver app, not the entire phenology.technology site. GitHub pushes are not automatically wired to that existing site's deployment.

The initial release reused all 135 source-file hashes from the site's current production deployment, then added these six files under `totallytwisted/`:

- index.html
- styles.css
- upstream.css
- artwork.css
- app.js
- assets/twisted-sprites.png

All other source files, Vercel configuration, existing routes, function settings, and scheduled jobs were preserved. The release was built with the production environment after a preview build succeeded. Both `/totallytwisted` and `/totallytwisted/` work; the site's existing canonicalization redirects to the spelling without a trailing slash.

Initial production deployment: `dpl_BCNGwdPEGuJ63UWwmtMTsnn3ezy5`.

For future updates, start from the latest complete production source, replace only the six app files, and deploy the whole existing site. Do not deploy this repository alone as the root of phenology.technology. The six files were also copied into `C:/Projects/pheno-site-mirror/totallytwisted`, but the rest of that mirror may lag production.

Verification: 83 browser checks passed across 17 scenes and 49 variants in Chromium at desktop and mobile viewport sizes. The live homepage, jobs page, and morality page matched their preceding production source hashes. All six deployed app files matched local hashes. This does not constitute testing on physical Apple devices.
