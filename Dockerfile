FROM node:22-alpine AS base

# Set environment variables
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable corepack
RUN corepack enable
WORKDIR /app


###################
# First Stage: Install dependencies
###################
FROM base AS deps
# RUN echo "http://uk.alpinelinux.org/alpine/alpine/v3.19/main" > /etc/apk/repositories
# RUN echo "http://uk.alpinelinux.org/alpine/alpine/v3.19/community" > /etc/apk/repositories
# RUN echo "http://mirror.leaseweb.com/alpine/" > /etc/apk/repositories
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile


###################
# Second Stage: Build
###################
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate prisma client and build application
RUN pnpm exec prisma generate
RUN pnpm run build


###################
# Third Stage: Copy build artifact
###################
FROM base AS runner
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "dist/main.js"]
