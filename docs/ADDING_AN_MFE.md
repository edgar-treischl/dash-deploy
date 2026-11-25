# Adding an MFE

1. Build the MFE and copy the contents of its `dist/` directory to
   `deployments/dashboard/current/` (replace `dashboard` with your MFE name).
2. Add an entry to the `mfes` array in `nginx/mfes.json`:

   ```json
   {
     "name": "dashboard",
     "path": "/dashboard",
     "remoteEntry": "/dashboard-mfe/assets/remoteEntry.js",
     "requiresLogin": true
   }
   ```

   Use unique URL prefixes for `path` and the first segment of `remoteEntry`.
   Set `remoteEntry` to the URL matching the MFE build's asset base. Set
   `requiresLogin` to `false` for direct SPA navigation.
3. Add a read-only mount to the `nginx` service in `docker-compose.yml`:

   ```yaml
   - ./deployments/dashboard/current:/srv/dashboard:ro
   ```

   The `/srv/` directory name must match the registry's `name`.
4. Configure the Shell to load the MFE's `remoteEntry` URL, then run
   `make nginx-conf` to rebuild and restart local Nginx. Check the remote URL
   and confirm the MFE loads through the Shell.
5. For production, also add
   `COPY deployments/dashboard/current/ /srv/dashboard/` to the root
   `Dockerfile` and ensure the built artifacts are available to the CI build.
   Publish the updated image and pull it on the server as described in the
   [deployment README](../README.md#production-deployment).

`requiresLogin` only redirects navigation; MFE assets remain publicly
accessible. It does not enforce authentication.
