# MFE Access Control Guide

> The Nginx configuration snippets and MFE setup steps below predate the
> registry-based generator. For current setup instructions, see
> [Adding an MFE](ADDING_AN_MFE.md). Redirects are not authentication:
> MFE assets remain publicly accessible.

## Overview

All Micro Frontend (MFE) routes are protected by authentication. Direct access to any MFE is blocked; users must authenticate through the Shell first.

**Current Status:** `Class MFE (/class/)` is protected and serves as the template for all future MFEs.

---

## Current Implementation

### How It Works

1. **User tries direct access** → `http://localhost:8080/class/`
2. **Nginx blocks and redirects** → `302 /?login_required=class`
3. **Shell loads** → User sees login form
4. **User authenticates** → Shell handles authentication
5. **Shell loads MFE** → Via Module Federation (internal access)

### Configuration Files

#### `nginx/nginx.conf`

```nginx
# Redirect direct /class access to Shell login
location = /class {
    return 301 /;
}

location /class/ {
    return 302 /?login_required=class;
}

# Static assets for MFEs remain accessible (for Shell Module Federation)
location ~* ^/class/.*\.(js|mjs|css|json|png|jpg|svg|woff2?)$ {
    root /srv;
    try_files $uri =404;
}
```

#### `docker-compose.yml`

```yaml
volumes:
  - ./deployments/class/current:/srv/class:ro
```

---

## Adding a New MFE

Follow this pattern for every new MFE you add.

### Step 1: Update `nginx/nginx.conf`

Add these location blocks **before** the static assets catch-all at the end:

```nginx
# Redirect direct /[mfe-name] access to Shell login
location = /[mfe-name] {
    return 301 /;
}

location /[mfe-name]/ {
    return 302 /?login_required=[mfe-name];
}

# Static assets for [mfe-name]
location ~* ^/[mfe-name]/.*\.(js|mjs|css|json|png|jpg|svg|woff2?)$ {
    root /srv;
    try_files $uri =404;
}
```

**Example: Adding Dashboard MFE**

```nginx
# Dashboard MFE
location = /dashboard {
    return 301 /;
}

location /dashboard/ {
    return 302 /?login_required=dashboard;
}

location ~* ^/dashboard/.*\.(js|mjs|css|json|png|jpg|svg|woff2?)$ {
    root /srv;
    try_files $uri =404;
}
```

### Step 2: Update `docker-compose.yml`

Add volume mount in the `nginx` service:

```yaml
volumes:
  - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro
  - ./deployments/shell/current:/srv/shell:ro
  - ./deployments/class/current:/srv/class:ro
  - ./deployments/dashboard/current:/srv/dashboard:ro  # ← Add this
```

### Step 3: Create Deployment Directory

```bash
mkdir -p deployments/dashboard/current
```

### Step 4: Deploy MFE Artifacts

Copy your MFE's `dist/` contents to the deployment directory:

```bash
cp -r /path/to/mfe/dist/* deployments/dashboard/current/
```

### Step 5: Restart Nginx

```bash
make up
# or
docker compose up --build -d
```

### Step 6: Verify

Test that the access control works:

```bash
# Should redirect to login
curl -i http://localhost:8080/dashboard/

# Should return 302 with Location header
# Location: /?login_required=dashboard
```

---

## Configuration Template

Use this template for consistency when adding new MFEs:

```nginx
# [MFE Name] MFE
location = /[path] {
    return 301 /;
}

location /[path]/ {
    return 302 /?login_required=[path];
}

location ~* ^/[path]/.*\.(js|mjs|css|json|png|jpg|svg|woff2?)$ {
    root /srv;
    try_files $uri =404;
}
```

**Variables:**
- `[MFE Name]` — Human-readable name (e.g., "Dashboard MFE")
- `[path]` — URL path and login identifier (e.g., "dashboard", "reporting", "admin")

---

## MFE Checklist

Before deploying a new MFE, verify:

- [ ] Nginx config has `location = /[path]` redirect
- [ ] Nginx config has `location /[path]/` redirect with `302 /?login_required=[path]`
- [ ] Nginx config has static asset location block
- [ ] `docker-compose.yml` has volume mount for `/srv/[path]`
- [ ] Deployment directory exists: `deployments/[path]/current/`
- [ ] MFE artifacts copied to `deployments/[path]/current/`
- [ ] Tested: direct access to `/[path]/` redirects to login
- [ ] Tested: static assets load correctly (`/[path]/assets/*` → 200)
- [ ] Tested: Shell can load MFE via Module Federation

---

## Registered MFEs

| MFE | Path | Status | Notes |
|-----|------|--------|-------|
| Class (Klassenwiederholung) | `/class/` | ✅ Protected | Also available at `/klassenwiederholung-mfe/` for federation |
| Dashboard | `/dashboard/` | — | Add when available |
| Reporting | `/reporting/` | — | Add when available |
| Administration | `/admin/` | — | Add when available |

---

## Troubleshooting

### MFE returns 404 when accessing `/assets/`

**Symptom:** `http://localhost:8080/[mfe]/assets/file.js` returns 404 even though file exists

**Cause:** Static asset location block is missing or malformed

**Solution:** Verify nginx config has:
```nginx
location ~* ^/[mfe]/.*\.(js|mjs|css|json|png|jpg|svg|woff2?)$ {
    root /srv;
    try_files $uri =404;
}
```

### Direct access doesn't redirect

**Symptom:** `http://localhost:8080/[mfe]/` loads the MFE instead of redirecting

**Cause:** Location block missing or incorrect return code

**Solution:** Check config has both:
```nginx
location = /[mfe] {
    return 301 /;
}

location /[mfe]/ {
    return 302 /?login_required=[mfe];
}
```

### Shell can't load MFE via Module Federation

**Symptom:** Shell loads but MFE doesn't appear after login

**Cause:** 
- Deployment directory doesn't exist
- Assets not copied
- Module Federation remoteEntry URL incorrect

**Solution:**
1. Verify files exist: `ls deployments/[mfe]/current/`
2. Check Shell's Module Federation config points to correct URL
3. Check Nginx logs: `docker compose logs nginx`

---

## Security Notes

### Why This Approach?

- **Stateless protection** — No token validation needed at Nginx level
- **Simple & maintainable** — Uses only Nginx redirects
- **Shell handles auth** — Leverages existing authentication system
- **Works with Module Federation** — Preserves Shell's ability to load MFEs internally
- **No code changes** — MFE applications don't need modification

### Limitations

- Relies on Shell's authentication (no additional enforcement at MFE level)
- Static assets remain accessible (intentional — Shell needs them for Module Federation)
- If someone has Shell's internal URLs, they could bypass this (by accessing via Shell internally)

### Future Enhancements

For Phase 4+ deployments with stricter requirements:

1. **Token-based auth** — Add JWT token validation at Nginx level
2. **Role-based access** — Different MFEs for different roles (via Shell routing)
3. **HTTPS + TLS** — Add certificate validation
4. **Rate limiting** — Prevent brute-force login attempts
5. **Audit logging** — Track who accessed what and when

---

## Related Documentation

- [../README.md](../README.md) — Main deployment guide
- [../docker-compose.yml](../docker-compose.yml) — Docker Compose configuration
- [../nginx/nginx.conf](../nginx/nginx.conf) — Nginx configuration
- Shell Repository — Contains authentication logic
