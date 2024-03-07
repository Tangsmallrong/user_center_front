FROM nginx

WORKDIR /usr/share/nginx/html/
USER root

# 把本地 nginx 的配置复制到系统 nginx 目录中
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist  /usr/share/nginx/html/

# 就是个注释, 显式的告诉开发人员占用的端口
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
