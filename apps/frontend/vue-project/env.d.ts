interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_MAP_KEY?: string
  readonly BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}