FROM php:8.5-fpm-alpine

WORKDIR /var/www/html

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip \
    opcache

RUN apk add --no-cache bash git

COPY --from=node:24-alpine /usr/local/bin/node /usr/local/bin/
COPY --from=node:24-alpine /usr/local/lib/node_modules /usr/local/lib/node_modules
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm \
    && ln -s /usr/local/lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

COPY . .

RUN chown -R www-data:www-data /var/www/html

EXPOSE 9000 5173

CMD ["php-fpm"]
