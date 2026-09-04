FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM deps AS builder
WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# 👇 Ajout de la clé Carto pour la compilation
ARG NEXT_PUBLIC_CARTO_API_KEY
ENV NEXT_PUBLIC_CARTO_API_KEY=$NEXT_PUBLIC_CARTO_API_KEY

COPY . .

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER nextjs

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
EXPOSE 3000

CMD ["node", "server.js"]