# MFE Registry & Nginx Configuration Generation

Register MFEs in `nginx/mfes.json`; edit `nginx.conf.template` for shared
server settings. Do not manually edit the generated config.

## Updating the registry

After changing `mfes.json`, rebuild the image and recreate the local container:

```bash
docker compose up --build -d nginx
```

Generation happens during **image build**, not container startup. A plain
`docker compose restart nginx` or `docker compose up -d` does not regenerate it.
The config lives at `/etc/nginx/conf.d/default.conf` inside the image:

```bash
docker compose exec nginx cat /etc/nginx/conf.d/default.conf
docker compose exec nginx nginx -t
```

To generate a local preview without Docker (requires Node.js):

```bash
node nginx/generate-config.js
```

This writes the ignored `nginx/nginx.conf`; it does not update the running
container. An optional output filename can be passed as the first argument.

For registration and deployment steps, see [Adding an MFE](../docs/ADDING_AN_MFE.md).
Existing bind-mounted artifact updates do not require an image rebuild;
registry or template changes do.

| Property | Meaning |
|----------|---------|
| `name` | Unique lowercase identifier with letters, digits, hyphens. Files are under `/srv/<name>`; `shell` is reserved. |
| `path` | Unique single-segment URL path, such as `/mfe-dashboard`. |
| `displayName` | Optional label; does not affect routing. |
| `remoteEntry` | Optional local JS/MJS URL, such as `/dashboard-mfe/assets/remoteEntry.js`. Its first segment defines the federation asset base and must be distinct from all registered paths and other remote bases. |
| `requiresLogin` | Optional boolean, default `false`. Redirects navigation to the Shell when `true`; otherwise serves an MFE SPA. |

The federation base serves files without SPA fallback, including nested assets.
Missing static assets return 404. Shell assets remain under `/srv/shell`.
The registry does not configure the Shell's remote URLs: configure those in
the Shell build separately.

**Login redirects are not authentication.** Static and federation files remain
public; protecting sensitive APIs/data requires actual authentication elsewhere.

## Published image

The root `Dockerfile`, used by CI and `make build`, also generates the config.
Unlike local Compose, it bundles artifacts. For a new MFE, also add its artifact
`COPY` instruction to that Dockerfile. Rebuild and publish the image to deploy
registry changes; restarting an older published image is not enough.

On the server, use the standalone `docker-compose.prod.yml` to pull and run
that published image without local builds or artifact mounts:

```bash
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d --no-build
```

## Checks

```bash
node --test nginx/generate-config.test.js
docker compose build nginx
NGINX_TEST_IMAGE=dash-deploy-nginx node --test nginx/routing.test.js
```
