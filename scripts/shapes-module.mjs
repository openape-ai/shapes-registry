// The checks use the same @openape/shapes parser and matcher as apes, Pods and
// the IdP. Until a release with presentation support is published, point
// SHAPES_MODULE at a build of the OpenApe monorepo:
//   pnpm --filter @openape/shapes... build   (in the monorepo)
//   SHAPES_MODULE=/path/to/openape-monorepo/packages/shapes/dist/index.js
import { pathToFileURL } from 'node:url'

export async function loadShapes() {
  const path = process.env.SHAPES_MODULE
  if (!path) {
    console.error('SHAPES_MODULE is not set: build @openape/shapes in the OpenApe monorepo and set SHAPES_MODULE to packages/shapes/dist/index.js')
    process.exit(2)
  }
  const shapes = await import(pathToFileURL(path).href)
  for (const name of ['loadAdapter', 'resolveCommand', 'semanticAdapterDigest']) {
    if (typeof shapes[name] !== 'function') {
      console.error(`SHAPES_MODULE ${path} does not export ${name}; it predates issue 1473`)
      process.exit(2)
    }
  }
  return shapes
}
