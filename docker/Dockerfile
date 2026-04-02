FROM node:25.8-alpine3.23 AS deps
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

FROM node:25.8-alpine3.23 AS builder
WORKDIR /app

RUN npm install -g pnpm

COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm run build

FROM node:25.8-alpine3.23 AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/app/data ./app/data

EXPOSE 3000

ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]