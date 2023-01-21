import adapter from "@sveltejs/adapter-static"
import { vitePreprocess } from "@sveltejs/kit/vite"

const config = {
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: null,
      precompress: false,
      strict: true
    }),
    files: {
      assets: "src/static"
    }
  },
  preprocess: [vitePreprocess()]
}

export default config
