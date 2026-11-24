
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy Shell to path expected by nginx.conf
COPY deployments/shell/current/ /srv/shell/

# Copy MFEs to paths expected by nginx.conf
COPY deployments/class/current/ /srv/class/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
