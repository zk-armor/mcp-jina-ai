# ---- Base Stage ----
FROM node:20-slim AS base
WORKDIR /usr/src/app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# ---- Dependencies Stage ----
FROM base AS deps
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod --frozen-lockfile

# ---- Build Stage ----
FROM base AS build
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN pnpm build

# ---- Production Stage ----
FROM base
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY package.json .

# Set up the command to run the server
CMD ["node", "dist/index.js"]