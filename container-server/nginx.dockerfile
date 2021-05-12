FROM nginx:latest
#COPY /public /var/www/public
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80 443
ENTRYPOINT ["nginx"]
#extra param to the entrypoint
CMD ["-g", "daemon off;"]