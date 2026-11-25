FROM node:22-alpine AS config
WORKDIR /config
COPY mfes.json nginx.conf.template generate-config.js ./
RUN node generate-config.js /config/default.conf

FROM nginx:alpine
COPY --from=config /config/default.conf /etc/nginx/conf.d/default.conf
RUN nginx -t

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
