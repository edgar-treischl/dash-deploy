FROM node:22-alpine AS config
WORKDIR /config
COPY nginx/mfes.json nginx/nginx.conf.template nginx/generate-config.js ./
RUN node generate-config.js /config/default.conf

FROM nginx:alpine

COPY --from=config /config/default.conf /etc/nginx/conf.d/default.conf

# Copy Shell to path expected by nginx.conf
COPY deployments/shell/current/ /srv/shell/

# Copy MFEs to paths expected by nginx.conf
COPY deployments/class/current/ /srv/class/
COPY deployments/academy/current/ /srv/academy/


RUN nginx -t

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
